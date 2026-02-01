
import { WizardData } from '@/features/wizard/context/WizardContext';

export interface CrmLead {
    email: string; // Primary Key
    firstName?: string;
    lastName?: string; // We only have 'name' in wizard, will fallback or split
    website?: string;
    monthlyRevenue?: number;
    goals?: string; // Semicolon separated
    status: 'New' | 'Qualified' | 'Partner_Referral' | 'Disqualified';
    source: string;
    createdAt: string;
    customFields: {
        revenue_range?: string;
        outcome?: string;
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
    // Simple name splitting logic
    const nameParts = (data.name || '').trim().split(' ');
    const firstName = nameParts[0] || 'Unknown';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    return {
        email: data.email || 'no-email@example.com',
        firstName,
        lastName,
        website: data.website,
        monthlyRevenue: data.revenue,
        goals: data.goals?.join('; '),
        status: 'New', // Default, maybe update based on outcome
        source: 'Website Wizard',
        createdAt: new Date().toISOString(),
        customFields: {
            revenue_range: data.revenueRange,
            outcome: data.outcome
        }
    };
};

// Business Logic Wrapper
export const syncWizardLead = async (wizardData: WizardData & { outcome?: string }) => {
    const lead = mapWizardToCrm(wizardData);

    // Enrich status based on outcome
    if (wizardData.outcome === 'partner_network') {
        lead.status = 'Partner_Referral';
    } else if (wizardData.outcome === 'qualified_lead') {
        lead.status = 'Qualified';
    }

    return await crmService.syncLead(lead);
};
