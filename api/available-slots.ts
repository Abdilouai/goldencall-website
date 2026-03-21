import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            return res.status(500).json({ error: 'Database configuration error' });
        }
        const sql = neon(databaseUrl);
        const { date } = req.query;

        if (!date || typeof date !== 'string') {
            return res.status(400).json({ error: 'Date is required' });
        }

        const bookedSlots = await sql`
            SELECT session_time FROM free_sessions 
            WHERE session_date = ${date} AND status != 'cancelled'
        `;

        const slots = bookedSlots.map(row => row.session_time);
        return res.status(200).json({ bookedSlots: slots });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
