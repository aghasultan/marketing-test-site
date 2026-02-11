import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

interface ContactPayload {
  fullName?: string;
  email?: string;
  company?: string;
  budget?: string;
  services?: string[];
  message?: string;
  partial?: boolean;
  fieldsInteracted?: string[];
  timeOnPage?: number;
}

const SERVICE_LABELS: Record<string, string> = {
  meta: 'Meta Ads (Facebook & Instagram)',
  google: 'Google Ads (Search & Display)',
  tiktok: 'TikTok Ads',
  seo: 'SEO (Organic Growth)',
  'full-stack': 'Full-Stack Growth (All Channels)',
};

// ─── Internal Notification Email ────────────────────────────────────────────
function buildNotificationHtml(data: ContactPayload): string {
  const isPartial = data.partial;
  const services = (data.services || []).map(s => SERVICE_LABELS[s] || s).join(', ');
  const timeMinutes = data.timeOnPage ? Math.round(data.timeOnPage / 1000 / 60 * 10) / 10 : 0;

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: ${isPartial ? '#FEF3C7' : '#D1FAE5'}; padding: 16px 20px; border-radius: 12px; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 20px; color: ${isPartial ? '#92400E' : '#065F46'};">
          ${isPartial ? '🟡 Partial Lead — Form Abandoned' : '🟢 New Lead Submission'}
        </h1>
        ${isPartial ? `<p style="margin: 4px 0 0; font-size: 13px; color: #78716C;">User left after interacting with: ${(data.fieldsInteracted || []).join(', ')} (${timeMinutes} min on page)</p>` : ''}
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        ${row('Name', data.fullName)}
        ${row('Email', data.email)}
        ${row('Company', data.company)}
        ${row('Budget', data.budget)}
        ${row('Services', services)}
        ${row('Message', data.message)}
      </table>

      <div style="margin-top: 20px; padding: 12px 16px; background: #F4F4F5; border-radius: 8px; font-size: 12px; color: #71717A;">
        Sent from RR Labs Contact Form • ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
      </div>
    </div>
  `;
}

// ─── Auto-Responder Email to the Lead ───────────────────────────────────────
function buildAutoReplyHtml(data: ContactPayload): string {
  const firstName = (data.fullName || 'there').split(' ')[0];
  const services = (data.services || []).map(s => SERVICE_LABELS[s] || s).join(', ');

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #059669, #10B981); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: white; font-weight: 700;">RR Labs</h1>
        <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Performance Marketing Intelligence</p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 24px; background: #ffffff; border-left: 1px solid #E4E4E7; border-right: 1px solid #E4E4E7;">
        <h2 style="margin: 0 0 8px; font-size: 22px; color: #18181B;">Thanks for reaching out, ${firstName}!</h2>
        <p style="color: #52525B; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
          We've received your inquiry${services ? ` about <strong>${services}</strong>` : ''} and our growth team is already on it.
        </p>

        <!-- What Happens Next -->
        <div style="background: #F9FAFB; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 16px; font-size: 16px; color: #18181B;">What Happens Next</h3>
          
          <div style="display: flex; margin-bottom: 16px;">
            <div style="min-width: 32px; height: 32px; background: #D1FAE5; border-radius: 50%; text-align: center; line-height: 32px; font-weight: 700; color: #065F46; font-size: 14px; margin-right: 12px;">1</div>
            <div>
              <div style="font-weight: 600; color: #18181B; font-size: 14px;">Brief Review (Today)</div>
              <div style="color: #71717A; font-size: 13px;">Our team reviews your business profile and goals</div>
            </div>
          </div>

          <div style="display: flex; margin-bottom: 16px;">
            <div style="min-width: 32px; height: 32px; background: #D1FAE5; border-radius: 50%; text-align: center; line-height: 32px; font-weight: 700; color: #065F46; font-size: 14px; margin-right: 12px;">2</div>
            <div>
              <div style="font-weight: 600; color: #18181B; font-size: 14px;">Strategy Call (Within 24h)</div>
              <div style="color: #71717A; font-size: 13px;">We'll reach out to schedule a free strategy session</div>
            </div>
          </div>

          <div style="display: flex;">
            <div style="min-width: 32px; height: 32px; background: #D1FAE5; border-radius: 50%; text-align: center; line-height: 32px; font-weight: 700; color: #065F46; font-size: 14px; margin-right: 12px;">3</div>
            <div>
              <div style="font-weight: 600; color: #18181B; font-size: 14px;">Custom Growth Plan</div>
              <div style="color: #71717A; font-size: 13px;">Receive a tailored roadmap with projections and next steps</div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div style="text-align: center; margin-bottom: 24px;">
          <p style="color: #52525B; font-size: 14px; margin-bottom: 12px;">In the meantime, check out our proven results:</p>
          <a href="https://marketing-test-site.vercel.app/results" style="display: inline-block; background: #059669; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">View Our Case Studies →</a>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding: 20px 24px; background: #F4F4F5; border-radius: 0 0 12px 12px; text-align: center; border: 1px solid #E4E4E7; border-top: none;">
        <p style="margin: 0; color: #71717A; font-size: 12px;">
          RR Labs — Performance Marketing Intelligence<br/>
          This email was sent because you submitted an inquiry on our website.
        </p>
      </div>
    </div>
  `;
}

function row(label: string, value?: string): string {
  if (!value) return '';
  return `
    <tr>
      <td style="padding: 10px 12px; border-bottom: 1px solid #E4E4E7; font-weight: 600; color: #3F3F46; width: 120px; vertical-align: top; font-size: 14px;">${label}</td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #E4E4E7; color: #18181B; font-size: 14px;">${value}</td>
    </tr>
  `;
}

// ─── Google Sheets CRM Logger ───────────────────────────────────────────────
async function logToGoogleSheets(data: ContactPayload): Promise<void> {
  const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
  if (!sheetsUrl) {
    console.log('GOOGLE_SHEETS_URL not configured, skipping');
    return;
  }

  const payload = JSON.stringify({
    timestamp: new Date().toISOString(),
    type: data.partial ? 'Partial' : 'Full',
    name: data.fullName || '',
    email: data.email || '',
    company: data.company || '',
    budget: data.budget || '',
    services: (data.services || []).map(s => SERVICE_LABELS[s] || s).join(', '),
    message: data.message || '',
    fieldsInteracted: (data.fieldsInteracted || []).join(', '),
    timeOnPage: data.timeOnPage ? `${Math.round(data.timeOnPage / 1000)}s` : '',
  });

  try {
    // Use text/plain to avoid CORS preflight and handle Apps Script redirect
    const res = await fetch(sheetsUrl, {
      method: 'POST',
      body: payload,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      redirect: 'follow',
    });
    console.log('Google Sheets log status:', res.status);
  } catch (err) {
    console.error('Google Sheets logging failed:', err);
  }
}

// ─── Main Handler ───────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const data = req.body as ContactPayload;

  // Basic validation — need at least one identifying field
  if (!data.email && !data.fullName) {
    return res.status(400).json({ error: 'At least name or email required' });
  }

  // Check env vars
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const isPartial = data.partial === true;
    const identifier = data.fullName || data.email || 'Unknown';
    const budgetTag = data.budget ? ` (${data.budget})` : '';

    // 1. Send notification email to you
    await transporter.sendMail({
      from: `"RR Labs Website" <${gmailUser}>`,
      to: gmailUser,
      replyTo: data.email || gmailUser,
      subject: isPartial
        ? `🟡 Partial Lead — ${identifier}`
        : `🟢 New Lead — ${identifier}${budgetTag}`,
      html: buildNotificationHtml(data),
    });

    // 2. Send auto-reply to the lead (only for full submissions with valid email)
    if (!isPartial && data.email) {
      const firstName = (data.fullName || 'there').split(' ')[0];
      await transporter.sendMail({
        from: `"RR Labs" <${gmailUser}>`,
        to: data.email,
        subject: `Thanks for reaching out, ${firstName}! — RR Labs`,
        html: buildAutoReplyHtml(data),
      });
    }

    // 3. Log to Google Sheets
    await logToGoogleSheets(data);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
