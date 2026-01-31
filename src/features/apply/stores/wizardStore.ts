import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { WizardState } from '../types';

export const useWizardStore = create<WizardState>()(
    persist(
        (set) => ({
            currentStep: 0, // Start at step 0
            totalSteps: 5, // Default/Placeholder, dynamic logic might be needed if steps vary by branch
            formData: {},
            history: [],
            direction: 0,

            setStep: (step) =>
                set((state) => {
                    // Push current step to history before moving
                    const direction = step > state.currentStep ? 1 : -1;
                    return {
                        currentStep: step,
                        history: [...state.history, state.currentStep],
                        direction: direction,
                    };
                }),

            updateFormData: (data) =>
                set((state) => ({
                    formData: { ...state.formData, ...data },
                })),

            goBack: () =>
                set((state) => {
                    if (state.history.length === 0) {
                        // Can't go back further
                        return {};
                    }
                    const previousStep = state.history[state.history.length - 1];
                    const newHistory = state.history.slice(0, -1);
                    return {
                        currentStep: previousStep,
                        history: newHistory,
                        direction: -1
                    };
                }),

            resetWizard: () =>
                set({
                    currentStep: 0,
                    formData: {},
                    history: [],
                    direction: 0
                }),
        }),
        {
            name: 'wizard-storage', // unique name
            storage: createJSONStorage(() => {
                // Robust wrapper for localStorage to avoid binding/context issues
                return {
                    getItem: (name: string) => {
                        if (typeof window !== 'undefined' && window.localStorage) {
                            return window.localStorage.getItem(name);
                        }
                        return null;
                    },
                    setItem: (name: string, value: string) => {
                        if (typeof window !== 'undefined' && window.localStorage) {
                            window.localStorage.setItem(name, value);
                        }
                    },
                    removeItem: (name: string) => {
                        if (typeof window !== 'undefined' && window.localStorage) {
                            window.localStorage.removeItem(name);
                        }
                    },
                };
            }),
            // Optional: partialize to exclude history if desired, but requirement says "resume state", so history is good.
        }
    )
);
