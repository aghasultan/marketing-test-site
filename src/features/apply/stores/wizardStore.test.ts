// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from 'vitest';
import { useWizardStore } from './wizardStore';

// Manual Mock for consistent testing
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true // Ensure it can be written
});

describe('useWizardStore', () => {
    beforeEach(() => {
        useWizardStore.getState().resetWizard();
        localStorageMock.clear();
    });

    it('initializes with default state', () => {
        const state = useWizardStore.getState();
        expect(state.currentStep).toBe(0);
        expect(state.formData).toEqual({});
        expect(state.history).toEqual([]);
    });

    it('updates form data', () => {
        useWizardStore.getState().updateFormData({ serviceType: 'paid-advertising' });
        expect(useWizardStore.getState().formData.serviceType).toBe('paid-advertising');
    });

    it('updates form data partially (merges)', () => {
        useWizardStore.getState().updateFormData({ serviceType: 'paid-advertising' });
        useWizardStore.getState().updateFormData({ monthlyBudget: '10k-50k' });

        expect(useWizardStore.getState().formData).toEqual({
            serviceType: 'paid-advertising',
            monthlyBudget: '10k-50k'
        });
    });

    it('navigates to specific step and pushes to history', () => {
        // Start at 0
        useWizardStore.getState().setStep(1);

        expect(useWizardStore.getState().currentStep).toBe(1);
        expect(useWizardStore.getState().history).toEqual([0]);

        useWizardStore.getState().setStep(2);
        expect(useWizardStore.getState().currentStep).toBe(2);
        expect(useWizardStore.getState().history).toEqual([0, 1]);
    });

    it('goes back using history', () => {
        useWizardStore.getState().setStep(1); // history: [0]
        useWizardStore.getState().setStep(5); // history: [0, 1] (Simulate jumping)

        useWizardStore.getState().goBack();

        expect(useWizardStore.getState().currentStep).toBe(1); // Should pop 5, current becomes 1
        expect(useWizardStore.getState().history).toEqual([0]);
    });

    it('goes back acts safe if history empty', () => {
        useWizardStore.getState().goBack();
        expect(useWizardStore.getState().currentStep).toBe(0);
    });

    it('persists data to localStorage', () => {
        useWizardStore.getState().updateFormData({ email: 'test@example.com' });
        // Since persistence is async/middleware, we might need to check how zustand/persist behaves.
        // Usually it writes synchronously to sync storage like localStorage.

        const stored = localStorageMock.getItem('wizard-storage');
        expect(stored).toBeTruthy();
        if (stored) {
            const parsed = JSON.parse(stored);
            expect(parsed.state.formData.email).toBe('test@example.com');
        }
    });

    it('resetWizard clears all state', () => {
        useWizardStore.getState().updateFormData({ serviceType: 'data-analytics' });
        useWizardStore.getState().setStep(2);

        useWizardStore.getState().resetWizard();

        const state = useWizardStore.getState();
        expect(state.currentStep).toBe(0);
        expect(state.formData).toEqual({});
        expect(state.history).toEqual([]);
    });
});
