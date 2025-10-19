import { NextResponse } from "next/server";
import { Resend } from "resend";

// Make sure API key exists
const API_KEY = process.env.RESEND_API_KEY;
if (!API_KEY) {
  console.warn(
    "Warning: RESEND_API_KEY environment variable is not set. Emails will not work."
  );
}

const resend = API_KEY ? new Resend(API_KEY) : null;

export async function POST(req: Request) {
  try {
    if (!resend) {
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    const { name, email, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim().substring(0, 100);
    const sanitizedEmail = email.trim().substring(0, 100);
    const sanitizedMessage = message.trim().substring(0, 1000);

    const result = await resend.emails.send({
      from: "onboarding@resend.dev", // replace with your verified sender
      to: "temprary526@gmail.com",   // replace with your target recipient
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #555; margin-bottom: 5px;">Name:</h3>
              <p style="background-color: #f8f9fa; padding: 10px; border-radius: 5px; margin: 0; border-left: 4px solid #007bff;">
                ${sanitizedName}
              </p>
            </div>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #555; margin-bottom: 5px;">Email:</h3>
              <p style="background-color: #f8f9fa; padding: 10px; border-radius: 5px; margin: 0; border-left: 4px solid #28a745;">
                ${sanitizedEmail}
              </p>
            </div>
            <div style="margin-bottom: 20px;">
              <h3 style="color: #555; margin-bottom: 5px;">Message:</h3>
              <p style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 0; border-left: 4px solid #ffc107; white-space: pre-wrap; line-height: 1.6;">
                ${sanitizedMessage}
              </p>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px;">
              <p>This message was sent from your portfolio contact form.</p>
              <p>Reply directly to this email to respond to ${sanitizedName}.</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, messageId: result.data?.id });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
