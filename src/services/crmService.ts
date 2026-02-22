import { WizardData } from '@/features/apply-wizard/types';

export interface CrmLead {
    email: string; // Primary Key
    firstName?: string;
    lastName?: string;
    website?: string;
    monthlyRevenue?: number;
    goals?: string; // Semicolon separated
    status: 'New' | 'Qualified' | 'Partner_Referral' | 'Disqualified';
    source: string;
    createdAt: string;
    customFields: {
        revenue_range?: string;
        outcome?: string;
        consentGiven?: boolean;
        consentTimestamp?: string;
    }
}

export interface CrmService {
    syncLead: (lead: CrmLead) => Promise<{ id: string; success: boolean }>;
}

class MockCrmService implements CrmService {
    async syncLead(lead: CrmLead): Promise<{ id: string; success: boolean }> {
        console.groupCollapsed(`💼 Mock CRM Sync: ${lead.email}`);
        console.log('--- Payload ---');
        console.table(lead);
        console.groupEnd();

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));

        return {
            id: `lead_${Math.random().toString(36).substr(2, 9)}`,
            success: true
        };
    }
}

// Singleton
export const crmService = new MockCrmService();

// Helper to map Wizard Data to CRM Data
export const mapWizardToCrm = (data: WizardData & { outcome?: string }): CrmLead => {
    return {
        email: data.email || 'no-email@example.com',
        firstName: data.firstName || 'Unknown',
        lastName: data.lastName || '',
        website: data.companyName || '',
        monthlyRevenue: data.monthlyRevenue,
        goals: '',
        status: 'New', // Default, maybe update based on outcome
        source: 'Website Wizard',
        createdAt: new Date().toISOString(),
        customFields: {
            revenue_range: data.monthlyRevenue ? `$${data.monthlyRevenue}` : '',
            outcome: data.outcome,
            consentGiven: data.consentGiven,
            consentTimestamp: data.consentGiven ? new Date().toISOString() : undefined,
        }
    };
};

// Business Logic Wrapper
export const syncWizardLead = async (wizardData: WizardData & { outcome?: string; consentGiven?: boolean }) => {
    const lead = mapWizardToCrm(wizardData);

    // Enrich status based on outcome
    if (wizardData.outcome === 'partner_network') {
        lead.status = 'Partner_Referral';
    } else if (wizardData.outcome === 'qualified_lead') {
        lead.status = 'Qualified';
    }

    return await crmService.syncLead(lead);
};
