export interface EmailPayload {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

export interface EmailService {
    send: (payload: EmailPayload) => Promise<boolean>;
}

class MockEmailService implements EmailService {
    async send(payload: EmailPayload): Promise<boolean> {
        console.groupCollapsed(`📧 Mock Email Service: ${payload.subject}`);
        console.log(`To: ${payload.to}`);
        console.log('--- HTML Content ---');
        console.log(payload.html);
        console.groupEnd();

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return true;
    }
}

// Singleton instance
export const emailService = new MockEmailService();

import { WizardData } from '@/features/apply-wizard/types';

// Business Logic Wrappers
export const sendLeadNotification = async (data: WizardData & { outcome?: string }) => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@riffatlabs.com';

    await emailService.send({
        to: adminEmail,
        subject: `New Lead: ${data.firstName || 'Unknown'} - ${data.companyName}`,
        html: `
            <h1>New Lead Application</h1>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.companyName}</p>
            <p><strong>Revenue:</strong> $${data.monthlyRevenue}/mo</p>
        `
    });

    // Send confirmation to user
    // Send confirmation to user based on outcome
    if (data.email) {
        if (data.outcome === 'partner_network') {
            // Partner Referral Flow
            await emailService.send({
                to: data.email,
                subject: 'RR Labs - Partner Network Introduction',
                html: `
                    <h1>Thanks for your interest</h1>
                    <p>Hi ${data.firstName},</p>
                    <p>Thanks for sharing your details. Based on your current revenue stage, we believe you would get the best results from one of our certified agency partners.</p>
                    <p>We will review your profile and make an introduction if we find a good match.</p>
                    <br>
                    <p>Best,</p>
                    <p>Agha Sultan</p>
                `
            });
        } else {
            // Qualified Lead Flow
            await emailService.send({
                to: data.email,
                subject: 'Audit Request Received - Next Steps',
                html: `
                    <h1>Application Received</h1>
                    <p>Hi ${data.firstName},</p>
                    <p>Thanks for applying to work with RR Labs. Your revenue profile matches our ideal client criteria.</p>
                    <p>I am personally reviewing your audit request. Expect a personalized video breakdown of your ad account potential within 24 hours.</p>
                    <br>
                    <p>In the meantime, feel free to allowlist this email address.</p>
                    <br>
                    <p>Best,</p>
                    <p>Agha Sultan</p>
                `
            });
        }
    }
};
