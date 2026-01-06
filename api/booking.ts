// api/booking.ts
import { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (req: VercelRequest, res: VercelResponse) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Dynamic imports to avoid build issues
    const { neon } = await import('@neondatabase/serverless');
    const { Resend } = await import('resend');

    const {
      fullName,
      email,
      phoneNumber,
      country,
      serviceType,
      preferredDate,
      preferredTime,
      message,
    } = req.body;

    // Validation
    if (!fullName || !email || !phoneNumber || !serviceType || !preferredDate || !preferredTime) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        received: Object.keys(req.body)
      });
    }

    // Database
    const sql = neon(process.env.DATABASE_URL!);
    
    const result = await sql`
      INSERT INTO booking_sessions (
        full_name, email, phone_number, country,
        service_type, preferred_date, preferred_time,
        message, status, created_at
      ) VALUES (
        ${fullName}, ${email}, ${phoneNumber}, ${country || 'Not specified'},
        ${serviceType}, ${preferredDate}, ${preferredTime},
        ${message || ''}, 'pending', NOW()
      ) RETURNING id
    `;

    const bookingId = result[0].id;

    // Format date
    const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Send emails
    const resend = new Resend(process.env.RESEND_API_KEY!);

    // Customer email
    try {
      await resend.emails.send({
        from: 'Golden Call Consulting <bookings@goldencall.digital>',
        to: email,
        subject: '✅ Session Confirmed - Golden Call',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1A8FD8;">Session Confirmed! ✓</h2>
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Your coaching session has been confirmed.</p>
            <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #1A8FD8; margin: 20px 0;">
              <h3 style="color: #1A8FD8; margin-top: 0;">📅 Session Details</h3>
              <p><strong>Service:</strong> ${serviceType}</p>
              <p><strong>Date:</strong> ${formattedDate}</p>
              <p><strong>Time:</strong> ${preferredTime} (Tunisia Time)</p>
              <p><strong>WhatsApp:</strong> ${process.env.WHATSAPP_NUMBER}</p>
            </div>
            <p>We'll call you on WhatsApp at the scheduled time.</p>
            <p>Best regards,<br><strong style="color: #1A8FD8;">Golden Call Team</strong></p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Customer email failed:', emailErr);
    }

    // Admin notification
    try {
      await resend.emails.send({
        from: 'Golden Call <notifications@goldencall.digital>',
        to: process.env.ADMIN_EMAIL!,
        subject: `🔔 New Booking: ${fullName}`,
        html: `
          <h2>New Booking #${bookingId}</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phoneNumber}</p>
          <p><strong>Country:</strong> ${country || 'Not specified'}</p>
          <p><strong>Service:</strong> ${serviceType}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${preferredTime}</p>
          <p><strong>Message:</strong> ${message || 'None'}</p>
        `,
      });
    } catch (emailErr) {
      console.error('Admin email failed:', emailErr);
    }

    return res.status(200).json({
      success: true,
      bookingId,
      message: 'Booking confirmed successfully!'
    });

  } catch (error: any) {
    console.error('Booking error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export default handler;
