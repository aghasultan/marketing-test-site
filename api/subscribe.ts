import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

interface SubscribePayload {
  email: string;
}

// ─── Notification Email to Admin ────────────────────────────────────────────
function buildAdminNotificationHtml(email: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #E0E7FF; padding: 16px 20px; border-radius: 12px; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 20px; color: #3730A3;">
          📬 New Newsletter Subscriber
        </h1>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #E4E4E7; font-weight: 600; color: #3F3F46; width: 120px;">Email</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #E4E4E7; color: #18181B;">${email}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 12px 16px; background: #F4F4F5; border-radius: 8px; font-size: 12px; color: #71717A;">
        Sent from RR Labs Newsletter Form • ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
      </div>
    </div>
  `;
}

// ─── Welcome Email to Subscriber ────────────────────────────────────────────
function buildWelcomeHtml(): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #059669, #10B981); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: white; font-weight: 700;">RR Labs</h1>
        <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Performance Marketing Intelligence</p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 24px; background: #ffffff; border-left: 1px solid #E4E4E7; border-right: 1px solid #E4E4E7;">
        <h2 style="margin: 0 0 8px; font-size: 22px; color: #18181B;">You're on the list!</h2>
        <p style="color: #52525B; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
          Thanks for subscribing to the RR Labs newsletter. You'll strictly receive high-signal insights on performance marketing, ad tracking, and conversion optimization.
        </p>

        <p style="color: #52525B; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
          No fluff. No spam. Just verify-first strategies.
        </p>

        <!-- CTA -->
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="https://marketing-test-site.vercel.app/blog" style="display: inline-block; background: #059669; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">Read Latest Articles →</a>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding: 20px 24px; background: #F4F4F5; border-radius: 0 0 12px 12px; text-align: center; border: 1px solid #E4E4E7; border-top: none;">
        <p style="margin: 0; color: #71717A; font-size: 12px;">
          RR Labs — Performance Marketing Intelligence<br/>
          You received this email because you subscribed on our website.
        </p>
      </div>
    </div>
  `;
}

// ─── Google Sheets Logger ───────────────────────────────────────────────────
async function logToGoogleSheets(email: string): Promise<void> {
  const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
  if (!sheetsUrl) return;

  const payload = JSON.stringify({
    timestamp: new Date().toISOString(),
    type: 'Newsletter',
    email: email,
    source: 'Footer'
  });

  try {
    await fetch(sheetsUrl, {
      method: 'POST',
      body: payload,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      redirect: 'follow',
    });
  } catch (err) {
    console.error('Google Sheets logging failed:', err);
  }
}

// ─── Main Handler ───────────────────────────────────────────────────────────
// ─── Main Handler ───────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS - Stricter for production
  const allowedOrigins = [
    'https://riffatlabs.com',
    'https://marketing-test-site.vercel.app',
    'http://localhost:5173' // For local dev
  ];
  const origin = req.headers.origin || '';

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body as SubscribePayload;

  // Stricter Email Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error('Missing email configuration');
    return res.status(500).json({ error: 'Configuration error' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const mailOptionsAdmin = {
      from: `"RR Labs Bot" <${gmailUser}>`,
      to: gmailUser,
      subject: `📬 New Subscriber: ${email}`,
      html: buildAdminNotificationHtml(email),
    };

    const mailOptionsWelcome = {
      from: `"RR Labs" <${gmailUser}>`,
      to: email,
      subject: `Welcome to RR Labs Intelligence`,
      html: buildWelcomeHtml(),
    };

    // Parallel Execution for Performance using Promise.allSettled
    // We prioritize the Welcome Email and Admin Alert, but logging is secondary.
    const results = await Promise.allSettled([
      transporter.sendMail(mailOptionsAdmin),
      transporter.sendMail(mailOptionsWelcome),
      logToGoogleSheets(email)
    ]);

    // Check if critical emails failed
    const adminEmailResult = results[0];
    const welcomeEmailResult = results[1];

    if (adminEmailResult.status === 'rejected') {
      console.error('Failed to send admin alert:', adminEmailResult.reason);
    }
    if (welcomeEmailResult.status === 'rejected') {
      console.error('Failed to send welcome email:', welcomeEmailResult.reason);
      // If welcome email fails, we might want to alert the user, but for now we'll return 200 
      // as long as the subscription logic "attempted" to run.
      // In a strict world, we might return 500 here.
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Subscribe critical error:', error);
    return res.status(500).json({ error: 'Failed to process subscription' });
  }
}
