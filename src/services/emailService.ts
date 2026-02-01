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

import { WizardData } from '@/features/wizard/context/WizardContext';

// Business Logic Wrappers
export const sendLeadNotification = async (leadData: WizardData & { outcome?: string }) => {
    const adminEmail = 'admin@riffatlabs.com'; // TODO: Env var

    await emailService.send({
        to: adminEmail,
        subject: `New Lead: ${leadData.name || 'Unknown'} - ${leadData.revenueRange}`,
        html: `
            <h1>New Lead Application</h1>
            <p><strong>Name:</strong> ${leadData.name}</p>
            <p><strong>Email:</strong> ${leadData.email}</p>
            <p><strong>Website:</strong> ${leadData.website}</p>
            <p><strong>Revenue:</strong> ${leadData.revenueRange}</p>
            <p><strong>Goals:</strong> ${leadData.goals?.join(', ')}</p>
        `
    });

    // Send confirmation to user
    if (leadData.email) {
        await emailService.send({
            to: leadData.email,
            subject: 'We received your application - Riffat Labs',
            html: `
                <h1>Application Received</h1>
                <p>Hi ${leadData.name},</p>
                <p>Thanks for applying to work with Riffat Labs. We've received your details and are reviewing your audit request.</p>
                <p>We'll get back to you within 24 hours.</p>
                <br>
                <p>Best,</p>
                <p>Agha Sultan</p>
            `
        });
    }
};
