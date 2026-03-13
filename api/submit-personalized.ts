import { sql } from '@vercel/postgres';

export const config = {
    runtime: 'edge',
};

export default async function handler(request: Request) {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const body = await request.json();
        const {
            fullName,
            whatsapp,
            email,
            objective,
            hoursPerWeek
        } = body;

        // Validate required fields
        if (!fullName || !whatsapp || !email || !objective || !hoursPerWeek) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Insert into database
        await sql`
      INSERT INTO personalized_offers (
        full_name, 
        whatsapp, 
        email, 
        objective, 
        hours_per_week
      )
      VALUES (
        ${fullName}, 
        ${whatsapp}, 
        ${email}, 
        ${objective}, 
        ${hoursPerWeek}
      );
    `;

        return new Response(JSON.stringify({ success: true, message: 'Personalized offer request submitted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error: any) {
        console.error('Database Error:', error);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
