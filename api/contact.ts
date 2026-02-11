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

function buildEmailHtml(data: ContactPayload): string {
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

function row(label: string, value?: string): string {
    if (!value) return '';
    return `
    <tr>
      <td style="padding: 10px 12px; border-bottom: 1px solid #E4E4E7; font-weight: 600; color: #3F3F46; width: 120px; vertical-align: top; font-size: 14px;">${label}</td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #E4E4E7; color: #18181B; font-size: 14px;">${value}</td>
    </tr>
  `;
}

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

        await transporter.sendMail({
            from: `"RR Labs Website" <${gmailUser}>`,
            to: gmailUser,
            replyTo: data.email || gmailUser,
            subject: isPartial
                ? `🟡 Partial Lead — ${identifier}`
                : `🟢 New Lead — ${identifier}${budgetTag}`,
            html: buildEmailHtml(data),
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Email send error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
    }
}
