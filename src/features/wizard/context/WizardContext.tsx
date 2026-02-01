
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// --- Types ---

export type WizardStep =
    | 'WELCOME'
    | 'REVENUE'
    | 'GOALS'
    | 'CONTACT'
    | 'COMPLETED';

export const WIZARD_STEPS: WizardStep[] = [
    'WELCOME',
    'REVENUE',
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

interface WizardState {
    currentStep: WizardStep;
    stepIndex: number;
    data: WizardData;
    isSubmitting: boolean;
}

// --- Reducer ---

const initialState: WizardState = {
    currentStep: 'WELCOME',
    stepIndex: 0,
    data: {},
    isSubmitting: false,
};

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
    switch (action.type) {
        case 'NEXT_STEP': {
            const nextIndex = state.stepIndex + 1;
            if (nextIndex >= WIZARD_STEPS.length) return state;
            return {
                ...state,
                stepIndex: nextIndex,
                currentStep: WIZARD_STEPS[nextIndex],
            };
        }
        case 'PREV_STEP': {
            const prevIndex = state.stepIndex - 1;
            if (prevIndex < 0) return state;
            return {
                ...state,
                stepIndex: prevIndex,
                currentStep: WIZARD_STEPS[prevIndex],
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
