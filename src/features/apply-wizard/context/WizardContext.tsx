/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { WizardState, WizardAction, WizardStep, WIZARD_STORAGE_KEY } from '../types';

const initialState: WizardState = {
    currentStep: 'BASIC_DETAILS',
    data: {},
    isComplete: false,
    timestamp: Date.now(),
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
    switch (action.type) {
        case 'UPDATE_DATA':
            return {
                ...state,
                data: { ...state.data, ...action.payload }
            };
        case 'NEXT_STEP': {
            const newData = { ...state.data, ...(action.payload || {}) };
            let nextStep: WizardStep = state.currentStep;

            if (state.currentStep === 'BASIC_DETAILS') {
                nextStep = 'BUSINESS_METRICS';
            } else if (state.currentStep === 'BUSINESS_METRICS') {
                // Qualification Logic
                const rev = newData.monthlyRevenue || 0;
                // Annualized Revenue = monthly * 12
                const annualRevenue = rev * 12;

                if (annualRevenue < 1000000) {
                    nextStep = 'DISQUALIFIED';
                } else {
                    nextStep = 'BOOKING';
                }
            }

            return {
                ...state,
                data: newData,
                currentStep: nextStep,
                isComplete: nextStep === 'DISQUALIFIED' || nextStep === 'BOOKING'
            };
        }
        case 'PREV_STEP': {
            let prevStep: WizardStep = state.currentStep;
            if (state.currentStep === 'BUSINESS_METRICS') {
                prevStep = 'BASIC_DETAILS';
            } else if (state.currentStep === 'DISQUALIFIED' || state.currentStep === 'BOOKING') {
                prevStep = 'BUSINESS_METRICS';
            }
            return {
                ...state,
                currentStep: prevStep,
                isComplete: false
            };
        }
        case 'RESET':
            localStorage.removeItem(WIZARD_STORAGE_KEY);
            return initialState;
        default:
            return state;
    }
}

interface WizardContextType {
    state: WizardState;
    dispatch: React.Dispatch<WizardAction>;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize from localStorage if available
    const [state, dispatch] = useReducer(wizardReducer, initialState, (init) => {
        if (typeof window === 'undefined') return init;
        try {
            const saved = localStorage.getItem(WIZARD_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // 24 hours expiration 24 * 60 * 60 * 1000 = 86400000
                if (parsed.timestamp && Date.now() - parsed.timestamp > 86400000) {
                    localStorage.removeItem(WIZARD_STORAGE_KEY);
                    return init;
                }
                return parsed;
            }
        } catch (e) {
            console.error('Failed to parse wizard state from storage', e);
        }
        return init;
    });

    // Auto-save to localStorage on state changes
    useEffect(() => {
        try {
            localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify({ ...state, timestamp: Date.now() }));
        } catch (e) {
            console.error('Failed to save wizard state to storage', e);
        }
    }, [state]);

    return (
        <WizardContext.Provider value={{ state, dispatch }}>
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
