import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const databaseUrl = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_jG3btdpiA4JV@ep-old-rice-aefwp2n2-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
        const sql = neon(databaseUrl);
        
        await sql`
            CREATE TABLE IF NOT EXISTS lessons (
                id SERIAL PRIMARY KEY,
                teacher_id INTEGER REFERENCES teachers(id),
                student_id INTEGER REFERENCES free_sessions(id),
                course_name TEXT NOT NULL,
                price NUMERIC DEFAULT 10.0,
                attendance TEXT DEFAULT 'present' CHECK (attendance IN ('present', 'absent')),
                lesson_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `;
        
        await sql`
            CREATE INDEX IF NOT EXISTS idx_lessons_teacher ON lessons(teacher_id);
        `;

        return res.status(200).json({ success: true, message: 'Lessons table created successfully.' });
    } catch (err) {
        console.error('Fetch lessons initialization error:', err);
        return res.status(500).json({ error: 'Internal server error', details: err });
    }
}
