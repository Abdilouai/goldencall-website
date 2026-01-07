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

    // 2️⃣ Send confirmation email
    const { error } = await resend.emails.send({
      from: "Golden Call <bookings@goldencall.digital>",
      to: email,
      subject: "Your Golden Call Session is Confirmed!",
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
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #1A8FD8; padding: 20px; text-align: center;">
                      <img src="https://goldencall.digital/goldencall_logo.png" alt="Golden Call Logo" style="max-width: 200px; height: auto;">
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Your Session is Confirmed!</h1>
                      <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                        Hi ${fullName},<br><br>
                        Thank you for booking with Golden Call Consulting! We're excited to help you with your ${serviceType}.
                      </p>
                      <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f9f9f9; border-radius: 4px; margin-bottom: 20px;">
                        <tr>
                          <td style="font-weight: bold; color: #333333;">Booking ID:</td>
                          <td>${bookingId}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: bold; color: #333333;">Service:</td>
                          <td>${serviceType}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: bold; color: #333333;">Preferred Date:</td>
                          <td>${preferredDate}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: bold; color: #333333;">Preferred Time (GMT+1):</td>
                          <td>${preferredTime}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: bold; color: #333333;">Phone:</td>
                          <td>${phoneNumber}</td>
                        </tr>
                        <tr>
                          <td style="font-weight: bold; color: #333333;">Country:</td>
                          <td>${country ?? "Not specified"}</td>
                        </tr>
                        ${message ? `
                        <tr>
                          <td style="font-weight: bold; color: #333333;">Your Message:</td>
                          <td>${message}</td>
                        </tr>
                        ` : ''}
                      </table>
                      <p style="color: #666666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
                        We'll review your request and send a final confirmation with preparation materials within 24 hours. Please check your WhatsApp regularly for the Zoom/Meet link and updates.
                      </p>
                      <p style="color: #666666; font-size: 16px; line-height: 1.5;">
                        Best regards,<br>
                        The Golden Call Team
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background-color
