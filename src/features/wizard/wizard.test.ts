
import { describe, it, expect } from 'vitest';
import { wizardReducer, WIZARD_STEPS } from './context/WizardContext';

describe('Wizard State Machine', () => {
    const initialState = {
        currentStep: WIZARD_STEPS[0],
        stepIndex: 0,
        data: {},
        isSubmitting: false,
    };

    it('should initialize correctly', () => {
        expect(initialState.currentStep).toBe('WELCOME');
        expect(initialState.stepIndex).toBe(0);
    });

    it('should transition to next step on NEXT_STEP', () => {
        const newState = wizardReducer(initialState, { type: 'NEXT_STEP' });
        expect(newState.currentStep).toBe('REVENUE');
        expect(newState.stepIndex).toBe(1);
    });

    it('should not go past the last step', () => {
        const lastStepState = {
            ...initialState,
            stepIndex: WIZARD_STEPS.length - 1,
            currentStep: WIZARD_STEPS[WIZARD_STEPS.length - 1],
        };
        const newState = wizardReducer(lastStepState, { type: 'NEXT_STEP' });
        expect(newState.stepIndex).toBe(lastStepState.stepIndex); // Should stay same
    });

    it('should transition to previous step on PREV_STEP', () => {
        const secondStepState = {
            ...initialState,
            stepIndex: 1,
            currentStep: WIZARD_STEPS[1],
        };
        const newState = wizardReducer(secondStepState, { type: 'PREV_STEP' });
        expect(newState.currentStep).toBe('WELCOME');
        expect(newState.stepIndex).toBe(0);
    });

    it('should update data on SET_DATA', () => {
        const newState = wizardReducer(initialState, {
            type: 'SET_DATA',
            payload: { website: 'example.com' }
        });
        expect(newState.data.website).toBe('example.com');
    });

    it('should merge data updates safely', () => {
        const stateWithData = {
            ...initialState,
            data: { website: 'example.com' }
        };
        const newState = wizardReducer(stateWithData, {
            type: 'SET_DATA',
            payload: { revenueRange: '10k-50k' }
        });
        expect(newState.data.website).toBe('example.com');
        expect(newState.data.revenueRange).toBe('10k-50k');
    });
});
