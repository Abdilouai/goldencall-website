import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const adminToken = process.env.ADMIN_TOKEN || 'fallback-admin-secret';
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
        return res.status(401).json({ error: 'Unauthorized Admin Access' });
    }

    try {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            return res.status(500).json({ error: 'Database configuration error' });
        }
        
        const sql = neon(databaseUrl);
        
        // Fetch all lessons along with teacher name and student name
        const lessons = await sql`
            SELECT l.id, l.teacher_id, t.name as teacher_name, 
                   l.student_id, f.first_name, f.last_name, 
                   l.course_name, l.price, l.attendance, l.lesson_date, l.created_at
            FROM lessons l
            JOIN teachers t ON l.teacher_id = t.id
            LEFT JOIN free_sessions f ON l.student_id = f.id
            ORDER BY l.lesson_date DESC, l.created_at DESC
        `;

        return res.status(200).json({ success: true, lessons });
    } catch (err) {
        console.error('Fetch admin lessons error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
