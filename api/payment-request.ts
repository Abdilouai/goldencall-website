import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// NOTE: For multipart/form-data handling in production, you would use
// a library like 'formidable' or 'busboy'. This endpoint expects
// the client to send JSON with a base64-encoded receipt image.
// For a full multipart implementation, install 'formidable'.

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        const { fullName, phone, method, planName, amount, receiptBase64, receiptFilename } = req.body;

        // Validate required fields
        if (!fullName || !phone || !method || !planName || !amount) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const validMethods = ['bank', 'd17', 'poste'];
        if (!validMethods.includes(method)) {
            return res.status(400).json({ error: 'Invalid payment method' });
        }

        let receiptUrl = null;

        // Upload receipt image if provided
        if (receiptBase64 && receiptFilename) {
            const buffer = Buffer.from(receiptBase64, 'base64');
            const fileName = `${Date.now()}-${receiptFilename}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('payment-receipts')
                .upload(fileName, buffer, {
                    contentType: 'image/jpeg',
                    upsert: false,
                });

            if (uploadError) {
                console.error('Upload error:', uploadError);
                return res.status(500).json({ error: 'Failed to upload receipt' });
            }

            const { data: urlData } = supabase.storage
                .from('payment-receipts')
                .getPublicUrl(fileName);

            receiptUrl = urlData.publicUrl;
        }

        // Insert payment request
        const { data, error } = await supabase
            .from('payment_requests')
            .insert([
                {
                    full_name: fullName,
                    phone,
                    payment_method: method,
                    plan_name: planName,
                    amount: parseFloat(amount),
                    receipt_url: receiptUrl,
                    status: 'pending',
                },
            ])
            .select('id')
            .single();

        if (error) {
            console.error('DB error:', error);
            return res.status(500).json({ error: 'Failed to save payment request' });
        }

        return res.status(200).json({ success: true, requestId: data.id });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
