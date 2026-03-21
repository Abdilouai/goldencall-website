import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            return res.status(500).json({ error: 'Database configuration error' });
        }
        const sql = neon(databaseUrl);

        const {
            firstName,
            lastName,
            email,
            phone,
            country,
            city,
            contactMethod,
            interestReason,
            studyMethod,
            sessionDate,
            sessionTime
        } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !phone || !sessionDate || !sessionTime) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if slot is taken
        const existing = await sql`
            SELECT id FROM free_sessions 
            WHERE session_date = ${sessionDate} AND session_time = ${sessionTime} AND status != 'cancelled'
        `;

        if (existing.length > 0) {
            return res.status(400).json({ error: 'This time slot is already booked.' });
        }

        const result = await sql`
            INSERT INTO free_sessions (
                first_name, last_name, email, phone, country, city, 
                contact_method, interest_reason, study_method, session_date, session_time, status
            ) VALUES (
                ${firstName}, ${lastName}, ${email}, ${phone}, ${country || ''}, ${city || ''},
                ${contactMethod || ''}, ${interestReason || ''}, ${studyMethod || ''}, 
                ${sessionDate}, ${sessionTime}, 'pending'
            )
            RETURNING id
        `;

        return res.status(200).json({ success: true, id: result[0]?.id });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
