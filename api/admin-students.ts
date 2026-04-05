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
        
        const students = await sql`
            SELECT id, first_name, last_name, email, session_date, session_time, status, teacher_id
            FROM free_sessions 
            ORDER BY created_at DESC
        `;

        const teachers = await sql`
            SELECT id, name FROM teachers
        `;

        return res.status(200).json({ success: true, students, teachers });
    } catch (err) {
        console.error('Fetch admin students error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
