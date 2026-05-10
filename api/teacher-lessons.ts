import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    
    // In a real app we'd decode JWT, but for this demo token is just the teacher ID
    const teacherId = parseInt(token);

    if (isNaN(teacherId)) {
        return res.status(401).json({ error: 'Invalid Token' });
    }

    try {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            return res.status(500).json({ error: 'Database configuration error' });
        }
        
        const sql = neon(databaseUrl);
        
        if (req.method === 'GET') {
            const lessons = await sql`
                SELECT l.id, l.teacher_id, l.student_id, f.first_name, f.last_name, 
                       l.course_name, l.price, l.attendance, l.lesson_date, l.created_at
                FROM lessons l
                LEFT JOIN free_sessions f ON l.student_id = f.id
                WHERE l.teacher_id = ${teacherId}
                ORDER BY l.lesson_date DESC, l.created_at DESC
            `;

            return res.status(200).json({ success: true, lessons });
        } 
        else if (req.method === 'POST') {
            const { studentId, courseName, lessonDate, attendance } = req.body;

            if (!studentId || !courseName || !lessonDate || !attendance) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const newLesson = await sql`
                INSERT INTO lessons (teacher_id, student_id, course_name, attendance, lesson_date, price)
                VALUES (${teacherId}, ${studentId}, ${courseName}, ${attendance}, ${lessonDate}, 10.0)
                RETURNING *
            `;

            return res.status(201).json({ success: true, lesson: newLesson[0] });
        } 
        else {
            return res.status(405).json({ error: 'Method not allowed' });
        }

    } catch (err) {
        console.error('Fetch teacher lessons error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
