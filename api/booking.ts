export const runtime = "nodejs";

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Check env vars first
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: "Database configuration is missing" });
  }
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Email service configuration is missing" });
  }

  // Initialize inside handler
  const sql = neon(process.env.DATABASE_URL);
  const resend = new Resend(process.env.RESEND_API_KEY);

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

    if (!fullName || !email || !phoneNumber || !serviceType || !preferredDate || !preferredTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1️⃣ Save booking
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
      )
      VALUES (
        ${fullName},
        ${email},
        ${phoneNumber},
        ${country ?? "Not specified"},
        ${serviceType},
        ${preferredDate},
        ${preferredTime},
        ${message ?? ""},
        'pending',
        NOW()
      )
      RETURNING id
    `;

    const bookingId = result[0].id;

    // Format date nicely
    const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // 2️⃣ Send confirmation email to customer
    await resend.emails.send({
      from: "Golden Call <bookings@goldencall.digital>",
      to: email,
      subject: "✅ Your Golden Call Session is Confirmed!",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1B9BD8 0%, #1580b8 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-family: 'Poppins', sans-serif;">
                        ✨ Golden Call Consulting
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h1 style="color: #3d3d3d; font-size: 28px; margin: 0 0 20px 0; font-weight: 600;">
                        Session Confirmed! ✓
                      </h1>
                      
                      <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        Dear <strong>${fullName}</strong>,
                      </p>
                      
                      <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                        We're excited to confirm your upcoming session with Golden Call Consulting. Your commitment to excellence is the first step toward achieving your goals!
                      </p>
                      
                      <!-- Session Details Box -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-left: 4px solid #1B9BD8; border-radius: 5px; margin-bottom: 30px;">
                        <tr>
                          <td style="padding: 25px;">
                            <h2 style="color: #1B9BD8; font-size: 20px; margin: 0 0 20px 0; font-weight: 600;">
                              📅 Session Details
                            </h2>
                            
                            <table width="100%" cellpadding="8" cellspacing="0">
                              <tr>
                                <td style="color: #3d3d3d; font-size: 15px; font-weight: 600; width: 40%;">Booking ID:</td>
                                <td style="color: #555555; font-size: 15px;">#${bookingId}</td>
                              </tr>
                              <tr>
                                <td style="color: #3d3d3d; font-size: 15px; font-weight: 600;">Service Type:</td>
                                <td style="color: #555555; font-size: 15px;">${serviceType}</td>
                              </tr>
                              <tr>
                                <td style="color: #3d3d3d; font-size: 15px; font-weight: 600;">Date:</td>
                                <td style="color: #555555; font-size: 15px;">${formattedDate}</td>
                              </tr>
                              <tr>
                                <td style="color: #3d3d3d; font-size: 15px; font-weight: 600;">Time:</td>
                                <td style="color: #555555; font-size: 15px;">${preferredTime} (Tunisia Time - GMT+1)</td>
                              </tr>
                              <tr>
                                <td style="color: #3d3d3d; font-size: 15px; font-weight: 600;">Phone:</td>
                                <td style="color: #555555; font-size: 15px;">${phoneNumber}</td>
                              </tr>
                              <tr>
                                <td style="color: #3d3d3d; font-size: 15px; font-weight: 600;">Location/Link:</td>
                                <td style="color: #555555; font-size: 15px;">WhatsApp Call: ${process.env.WHATSAPP_NUMBER}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Important Notes -->
                      <div style="background-color: #fff8e6; border-left: 4px solid #ffc107; border-radius: 5px; padding: 20px; margin-bottom: 30px;">
                        <h3 style="color: #3d3d3d; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
                          📌 Important Notes
                        </h3>
                        <ul style="color: #555555; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                          <li>Please be available 5 minutes before the scheduled time</li>
                          <li>Ensure you have WhatsApp installed and working</li>
                          <li>Prepare any questions or topics you'd like to discuss</li>
                          <li>Contact us if you need to reschedule at least 24 hours in advance</li>
                        </ul>
                      </div>
                      
                      <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                        We'll call you on WhatsApp at the scheduled time. If you have any questions before then, please don't hesitate to reach out!
                      </p>
                      
                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 10px 0 30px 0;">
                            <a href="https://goldencall.digital/" style="background-color: #1B9BD8; color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 5px; font-size: 16px; font-weight: 600; display: inline-block; box-shadow: 0 3px 6px rgba(27, 155, 216, 0.3);">
                              Visit Our Website
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0;">
                        We look forward to helping you achieve your goals!
                      </p>
                      
                      <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 20px 0 0 0;">
                        Best regards,<br>
                        <strong style="color: #1B9BD8;">The Golden Call Team</strong>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #3d3d3d; padding: 30px; text-align: center;">
                      <p style="color: #ffffff; font-size: 14px; margin: 0 0 10px 0;">
                        <strong>Golden Call Consulting</strong>
                      </p>
                      <p style="color: #cccccc; font-size: 13px; margin: 0 0 15px 0;">
                        Cabin Crew & IELTS Coaching | Tunisia
                      </p>
                      <p style="color: #cccccc; font-size: 13px; margin: 0 0 5px 0;">
                        📧 golden_call@outlook.com | 📱 +216 29 373 579
                      </p>
                      <p style="color: #cccccc; font-size: 13px; margin: 0 0 15px 0;">
                        🌐 <a href="https://goldencall.digital/" style="color: #1B9BD8; text-decoration: none;">goldencall.digital</a>
                      </p>
                      <p style="color: #999999; font-size: 12px; margin: 0;">
                        © 2025 Golden Call Consulting. All rights reserved.
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    });

    // 3️⃣ Send admin notification
    await resend.emails.send({
      from: "Golden Call Notifications <notifications@goldencall.digital>",
      to: process.env.ADMIN_EMAIL || "golden_call@outlook.com",
      subject: `🔔 New Booking: ${fullName} - ${serviceType}`,
      html: `
        <h2>New Session Booking</h2>
        <p><strong>Booking ID:</strong> #${bookingId}</p>
        <p><strong>Customer:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Country:</strong> ${country || 'Not specified'}</p>
        <p><strong>Service:</strong> ${serviceType}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${preferredTime}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        <hr>
        <p>Check your Neon database to manage this booking.</p>
      `
    });

    return res.status(200).json({
      success: true,
      bookingId
    });

  } catch (err: any) {
    console.error("Booking failed:", err);
    return res.status(500).json({ 
      error: "Internal Server Error",
      details: err.message 
    });
  }
}
