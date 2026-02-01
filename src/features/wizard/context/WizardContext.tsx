
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
    revenueRange?: string; // e.g. "0-10k", "10k-50k", "50k+"
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

export const WizardProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(wizardReducer, initialState);

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
