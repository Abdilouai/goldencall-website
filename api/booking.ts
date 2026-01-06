export const runtime = "nodejs";

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { Resend } from "resend";

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
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

    if (!fullName || !email || !phoneNumber || !serviceType || !preferredDate || !preferredTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1ï¸âƒ£ Save booking
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

    // 2ï¸âƒ£ Send confirmation email
    const { error } = await resend.emails.send({
      from: "Golden Call <bookings@goldencall.digital>",
      to: email,
      subject: "Your session is confirmed",
      html: `<p>Hi ${fullName}, your booking is confirmed.</p>`
    });

    if (error) {
      console.error("Email error:", error);
      // IMPORTANT: booking is already saved â†’ DO NOT FAIL HARD
    }

    return res.status(200).json({
      success: true,
      bookingId
    });

  } catch (err: any) {
    console.error("Booking failed:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
