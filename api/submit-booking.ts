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
      email, 
      phoneNumber, 
      country, 
      serviceType, 
      preferredDate, 
      preferredTime, 
      message 
    } = body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !serviceType || !preferredDate) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert into database
    await sql`
      INSERT INTO booking_sessions (
        full_name, 
        email, 
        phone_number, 
        country, 
        service_type, 
        preferred_date, 
        preferred_time, 
        message
      )
      VALUES (
        ${fullName}, 
        ${email}, 
        ${phoneNumber}, 
        ${country}, 
        ${serviceType}, 
        ${preferredDate}, 
        ${preferredTime}, 
        ${message || ''}
      );
    `;

    return new Response(JSON.stringify({ success: true, message: 'Booking submitted successfully' }), {
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