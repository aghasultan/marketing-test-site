
import { describe, it, expect } from 'vitest';
import { wizardReducer } from './context/WizardContext';
import { WizardState } from './context/WizardContext';

describe('Wizard State Machine', () => {
    const initialState: WizardState = {
        currentStep: 'WELCOME',
        history: ['WELCOME'], // Initial history
        data: {},
        isSubmitting: false,
        isOpen: false
    };

    it('should initialize correctly', () => {
        expect(initialState.currentStep).toBe('WELCOME');
        expect(initialState.history).toHaveLength(1);
    });

    it('should transition to REVENUE on NEXT_STEP from WELCOME', () => {
        const newState = wizardReducer(initialState, { type: 'NEXT_STEP' });
        expect(newState.currentStep).toBe('REVENUE');
        expect(newState.history).toHaveLength(2);
        expect(newState.history).toEqual(['WELCOME', 'REVENUE']);
    });

    it('should branch to PARTNER_REFERRAL if revenue is low', () => {
        const lowRevState: WizardState = {
            ...initialState,
            currentStep: 'REVENUE',
            history: ['WELCOME', 'REVENUE'],
            data: { revenueRange: '0-10k' }
        };
        const newState = wizardReducer(lowRevState, { type: 'NEXT_STEP' });
        expect(newState.currentStep).toBe('PARTNER_REFERRAL');
    });

    it('should branch to GOALS if revenue is high', () => {
        const highRevState: WizardState = {
            ...initialState,
            currentStep: 'REVENUE',
            history: ['WELCOME', 'REVENUE'],
            data: { revenueRange: '50k+' }
        };
        const newState = wizardReducer(highRevState, { type: 'NEXT_STEP' });
        expect(newState.currentStep).toBe('GOALS');
    });

    it('should transition to previous step on PREV_STEP', () => {
        const secondStepState: WizardState = {
            ...initialState,
            currentStep: 'REVENUE',
            history: ['WELCOME', 'REVENUE'],
        };
        const newState = wizardReducer(secondStepState, { type: 'PREV_STEP' });
        expect(newState.currentStep).toBe('WELCOME');
        expect(newState.history).toHaveLength(1);
    });

    it('should update data on SET_DATA', () => {
        const newState = wizardReducer(initialState, {
            type: 'SET_DATA',
            payload: { website: 'example.com' }
        });
        expect(newState.data.website).toBe('example.com');
    });
});
