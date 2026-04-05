import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            return res.status(500).json({ error: 'Database configuration error' });
        }
        
        const sql = neon(databaseUrl);
        // Generate a true, secure bcrypt hash for 'password123' natively on the server
        const hash = await bcrypt.hash('password123', 10);
        
        // Update all teachers with the guaranteed correct hash
        await sql`UPDATE teachers SET password_hash = ${hash}`;
        
        return res.status(200).json({ 
            success: true, 
            message: 'Successfully generated authentic bcrypt hash for password123 and applied it to all teachers. You can log in now!',
            sample_hash: hash
        });
    } catch (err) {
        console.error('Password fix error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
