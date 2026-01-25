import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize services
const resend = new Resend(process.env.RESEND_API_KEY);
const sql = neon(process.env.DATABASE_URL!);

// Load email template
const emailTemplate = readFileSync(
  join(process.cwd(), 'api', 'email-templates', 'confirmation.html'),
  'utf-8'
);

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      email,
      phoneNumber,
      country,
      serviceType,
      preferredDate,
      preferredTime,
      message
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !serviceType || !preferredDate || !preferredTime) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        received: req.body 
      });
    }

    console.log('📝 Processing booking for:', fullName);

    // 1. INSERT INTO DATABASE
    const result = await sql`
      INSERT INTO booking_sessions (
        full_name,
        email,
        phone_number,
        country,
        service_type,
        preferred_date,
        preferred_time,
        message,
        status,
        created_at
      ) VALUES (
        ${fullName},
        ${email},
        ${phoneNumber},
        ${country || 'Not specified'},
        ${serviceType},
        ${preferredDate},
        ${preferredTime},
        ${message || ''},
        'pending',
        NOW()
      )
      RETURNING id
    `;

    const bookingId = result[0].id;
    console.log('✅ Booking saved to database. ID:', bookingId);

    // 2. FORMAT DATE FOR EMAIL
    const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // 3. GENERATE CUSTOMER EMAIL
    const customerEmailHTML = emailTemplate
      .replace(/{{customerName}}/g, fullName)
      .replace(/{{serviceType}}/g, serviceType)
      .replace(/{{date}}/g, formattedDate)
      .replace(/{{time}}/g, preferredTime)
      .replace(/{{phoneNumber}}/g, process.env.WHATSAPP_NUMBER || '+216 29 373 579');

    // 4. SEND EMAIL TO CUSTOMER
    console.log('📧 Sending confirmation email to:', email);
    
    const customerEmail = await resend.emails.send({
      from: 'Golden Call Consulting <bookings@goldencall.digital>',
      to: email,
      subject: '✅ Your Session is Confirmed - Golden Call Consulting',
      html: customerEmailHTML
    });

    console.log('✅ Customer email sent. ID:', customerEmail.id);

    // 5. SEND NOTIFICATION TO ADMIN
    console.log('📧 Sending notification to admin...');

    const adminEmail = await resend.emails.send({
      from: 'Golden Call Notifications <notifications@goldencall.digital>',
      to: process.env.ADMIN_EMAIL || 'golden_call@outlook.com',
      subject: `🔔 New Booking: ${fullName} - ${serviceType}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1B9BD8; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1B9BD8; }
            .value { color: #555; }
            .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🔔 New Session Booking</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Customer Name:</span>
                <span class="value">${fullName}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value">${email}</span>
              </div>
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value">${phoneNumber}</span>
              </div>
              <div class="field">
                <span class="label">Country:</span>
                <span class="value">${country || 'Not specified'}</span>
              </div>
              <div class="field">
                <span class="label">Service:</span>
                <span class="value">${serviceType}</span>
              </div>
              <div class="field">
                <span class="label">Date:</span>
                <span class="value">${formattedDate}</span>
              </div>
              <div class="field">
                <span class="label">Time:</span>
                <span class="value">${preferredTime} (Tunisia Time)</span>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <span class="value">${message || 'No message provided'}</span>
              </div>
              <div class="field">
                <span class="label">Booking ID:</span>
                <span class="value">#${bookingId}</span>
              </div>
            </div>
            <div class="footer">
              <p>Check your Neon database to manage this booking.</p>
              <p>Golden Call Consulting</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    console.log('✅ Admin notification sent. ID:', adminEmail.id);

    // 6. RETURN SUCCESS
    return res.status(200).json({
      success: true,
      bookingId: bookingId,
      message: 'Booking confirmed and emails sent!',
      customerEmailId: customerEmail.id,
      adminEmailId: adminEmail.id
    });

  } catch (error: any) {
    console.error('❌ Booking error:', error);
    
    return res.status(500).json({
      error: 'Failed to process booking',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
