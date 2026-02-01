/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// --- Types ---

export type WizardStep =
    | 'WELCOME'
    | 'REVENUE'
    | 'PARTNER_REFERRAL'
    | 'GOALS'
    | 'CONTACT'
    | 'COMPLETED';

export const WIZARD_STEPS: WizardStep[] = [
    'WELCOME',
    'REVENUE',
    'PARTNER_REFERRAL',
    'GOALS',
    'CONTACT',
    'COMPLETED'
];

export interface WizardData {
    website?: string;
    revenue?: number; // Exact monthly revenue
    revenueRange?: string; // Keep for backward compat if needed, or remove. Let's keep for now but derived.
    goals?: string[];
    name?: string;
    email?: string;
}

export type WizardAction =
    | { type: 'NEXT_STEP' }
    | { type: 'PREV_STEP' }
    | { type: 'SET_DATA'; payload: Partial<WizardData> }
    | { type: 'RESET' };

import { getNextStep } from '../logic/routing';

export interface WizardState {
    currentStep: WizardStep;
    // stepIndex: number; // Deprecated in favor of history stack length
    history: WizardStep[];
    data: WizardData;
    isSubmitting: boolean;
}

// --- Reducer ---

const initialState: WizardState = {
    currentStep: 'WELCOME',
    history: ['WELCOME'],
    data: {},
    isSubmitting: false,
};

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
    switch (action.type) {
        case 'NEXT_STEP': {
            const nextStep = getNextStep(state.currentStep, state.data);
            if (nextStep === state.currentStep) return state; // No movement

            return {
                ...state,
                currentStep: nextStep,
                history: [...state.history, nextStep],
            };
        }
        case 'PREV_STEP': {
            if (state.history.length <= 1) return state; // Can't go back from start

            const newHistory = state.history.slice(0, -1);
            const prevStep = newHistory[newHistory.length - 1];

            return {
                ...state,
                history: newHistory,
                currentStep: prevStep,
            };
        }
        case 'SET_DATA': {
            return {
                ...state,
                data: { ...state.data, ...action.payload },
            };
        }
        case 'RESET': {
            return initialState;
        }
        default:
            return state;
    }
}

// --- Context ---

interface WizardContextType extends WizardState {
    dispatch: React.Dispatch<WizardAction>;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

import { useEffect } from 'react';
import { saveState, loadState } from '../logic/persistence';

export const WizardProvider = ({ children }: { children: ReactNode }) => {
    // Lazy init from storage
    const [state, dispatch] = useReducer(wizardReducer, initialState, (defaultState) => {
        // Check if we are in a browser environment
        if (typeof window === 'undefined') return defaultState;

        const saved = loadState();
        if (saved) {
            // Validate basic shape? 
            // For now assume trusted local data.
            return saved;
        }
        return defaultState;
    });

    // Persist on change
    useEffect(() => {
        saveState(state);
    }, [state]);

    // Intercept RESET to clear storage? 
    // Actually, we can just do it in the effect if we detect reset, OR we wrap modify dispatch or reducer.
    // Easeier: Reducer handles in-memory reset. Effect saves that empty state.
    // BUT: We might want null/undefined in storage if reset. 
    // Let's modify the reducer to call clearState? No, 'reducer' should be pure.
    // Best approach: useEffect logic. 

    // NOTE: If state matches initialState, we could clear storage.

    return (
        <WizardContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WizardContext.Provider>
    );
};

export const useWizard = () => {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
};
