import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const adminToken = process.env.ADMIN_TOKEN || 'fallback-admin-secret';
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
        return res.status(401).json({ error: 'Unauthorized Admin Access' });
    }

    try {
        const { studentId, teacherId } = req.body;

        if (!studentId || !teacherId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            return res.status(500).json({ error: 'Database configuration error' });
        }
        
        const sql = neon(databaseUrl);
        
        await sql`
            UPDATE free_sessions 
            SET teacher_id = ${teacherId}
            WHERE id = ${studentId}
        `;

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Admin reassign error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
