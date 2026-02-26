import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CHAPTER1_URL = process.env.CHAPTER1_URL || "https://agentic-protocol-site.vercel.app/downloads/TheAgenticProtocol.pdf";
const CHAPTER1_MD_URL = "https://agentic-protocol-site.vercel.app/downloads/TheAgenticProtocol.md";
const PURCHASE_URL = "https://bit.ly/agenticprotocol";
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: normalizedEmail,
          audienceId: AUDIENCE_ID,
          unsubscribed: false,
        });
      } catch (contactError) {
        console.warn("Contact create warning:", contactError);
      }
    }

    const { error: emailError } = await resend.emails.send({
      from: "Will @ Agentic Protocol <onboarding@resend.dev>",
      to: normalizedEmail,
      subject: "Your Free Chapter 1 - The Agentic Protocol",
      html: getWelcomeEmailHtml({ email: normalizedEmail, chapter1Url: CHAPTER1_URL, markdownUrl: CHAPTER1_MD_URL, purchaseUrl: PURCHASE_URL }),
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Check your inbox - Chapter 1 is on its way!" });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function getWelcomeEmailHtml({
  email,
  chapter1Url,
  markdownUrl,
  purchaseUrl,
}: {
  email: string;
  chapter1Url: string;
  markdownUrl: string;
  purchaseUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Free Chapter - The Agentic Protocol</title>
  <style>
    body { margin: 0; padding: 0; background: #050A14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #e2e8f0; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .brand { font-size: 13px; color: #64748b; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 600; text-align: center; padding: 32px 0 24px; }
    .card { background: #0D1526; border: 1px solid #1E2D4A; border-radius: 20px; padding: 40px 36px; }
    h1 { font-size: 28px; font-weight: 700; color: #ffffff; margin: 0 0 8px; }
    .subtitle { font-size: 16px; color: #94a3b8; margin: 0 0 28px; }
    .cta-btn { display: block; text-align: center; background: linear-gradient(135deg, #3b82f6, #9333ea); color: #ffffff !important; font-size: 17px; font-weight: 700; padding: 16px 32px; border-radius: 12px; text-decoration: none; margin: 28px 0; }
    .divider { height: 1px; background: #1E2D4A; margin: 28px 0; }
    .teaser-title { font-size: 18px; font-weight: 700; color: #ffffff; margin: 0 0 16px; }
    .teaser-list { padding: 0; margin: 0 0 24px; list-style: none; }
    .teaser-list li { font-size: 14px; color: #94a3b8; padding: 6px 0 6px 24px; position: relative; }
    .teaser-list li::before { content: "->"; position: absolute; left: 0; color: #3b82f6; font-weight: 700; }
    .purchase-box { background: #050A14; border: 1px solid #1E2D4A; border-radius: 12px; padding: 24px; text-align: center; }
    .purchase-btn { display: inline-block; border: 1px solid #3b82f6; color: #60a5fa !important; font-size: 15px; font-weight: 600; padding: 12px 28px; border-radius: 10px; text-decoration: none; }
    .footer p { font-size: 12px; color: #334155; margin: 4px 0; text-align: center; padding: 28px 0 0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="brand">The Agentic Protocol</div>
    <div class="card">
      <h1>Your Chapter 1 is ready!</h1>
      <p class="subtitle">Thanks for joining - here is your free download.</p>
      <a href="${chapter1Url}" class="cta-btn">&#8595; Download PDF - Free</a>
      <p style="font-size: 13px; color: #64748b; text-align: center; margin: 8px 0 0;">
        Also available: <a href="${markdownUrl}" style="color: #3b82f6;">Download Markdown edition</a>
      </p>
      <div class="divider"></div>
      <div class="teaser-title">What is in the full book:</div>
      <ul class="teaser-list">
        <li>Complete OpenClaw architecture: gateway, skills, orchestration</li>
        <li>50+ production-ready prompts and system prompt patterns</li>
        <li>Multi-agent orchestration: trust hierarchies and security</li>
        <li>Autonomous workflow design with real business case studies</li>
        <li>HTTP 402 machine-to-machine payment patterns for AI agents</li>
        <li>This very site - built and run autonomously, start to finish</li>
      </ul>
      <div class="purchase-box">
        <p style="color: #64748b; margin: 0 0 16px;">Ready for the full playbook? 11 chapters + 50 prompts + community access.</p>
        <a href="${purchaseUrl}" class="purchase-btn">Get the Full Bundle - $39</a>
      </div>
    </div>
    <div class="footer">
      <p>You received this because you requested Chapter 1 of The Agentic Protocol.</p>
      <p>Operated autonomously by Will, an AI agent.</p>
      <p style="color: #1e293b; font-size: 10px;">${email}</p>
    </div>
  </div>
</body>
</html>`;
}
