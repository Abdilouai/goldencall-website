import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'goldencall-super-secret-key-2026';

function verifySimpleToken(token: string) {
    try {
        const [header, body, signature] = token.split('.');
        const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
        
        if (signature !== expectedSignature) {
            return null;
        }

        const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
        if (payload.exp && payload.exp < Date.now()) {
            return null; // Expired
        }
        return payload;
    } catch {
        return null;
    }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const user = verifySimpleToken(token);

        if (!user || !user.id) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            return res.status(500).json({ error: 'Database configuration error' });
        }
        
        const sql = neon(databaseUrl);
        
        // Fetch students assigned to this teacher
        const students = await sql`
            SELECT id, first_name, last_name, email, phone, country, city, contact_method, interest_reason, study_method, session_date, session_time, status, created_at
            FROM free_sessions 
            WHERE teacher_id = ${user.id}
            ORDER BY session_date ASC, session_time ASC
        `;

        return res.status(200).json({ success: true, students });
    } catch (err) {
        console.error('Fetch students error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
