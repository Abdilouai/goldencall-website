import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const databaseUrl = process.env.DATABASE_URL;
        if (!databaseUrl) {
            console.error('DATABASE_URL is not set');
            return res.status(500).json({ error: 'Database configuration error' });
        }

        const sql = neon(databaseUrl);

        const { fullName, phone, method, planName, amount, message, receiptBase64, receiptFilename } = req.body;

        // Validate required fields
        if (!fullName || !phone || !method || !planName || !amount) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const validMethods = ['bank', 'd17'];
        if (!validMethods.includes(method)) {
            return res.status(400).json({ error: 'Invalid payment method' });
        }

        // Insert payment submission into Neon DB
        const result = await sql`
            INSERT INTO payment_submissions (
                full_name,
                phone,
                payment_method,
                plan_name,
                amount,
                receipt_filename,
                receipt_data,
                message,
                status
            ) VALUES (
                ${fullName},
                ${phone},
                ${method},
                ${planName},
                ${parseFloat(amount)},
                ${receiptFilename || null},
                ${receiptBase64 || null},
                ${message || null},
                'pending'
            )
            RETURNING id
        `;

        const insertedId = result[0]?.id;

        return res.status(200).json({ success: true, id: insertedId });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
