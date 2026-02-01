
import { WizardState } from "../context/WizardContext";

const STORAGE_KEY = 'riffat-labs-wizard-state';

export const saveState = (state: WizardState) => {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem(STORAGE_KEY, serialized);
    } catch (err) {
        console.warn('Failed to save wizard state', err);
    }
};

export const loadState = (): WizardState | undefined => {
    try {
        const serialized = localStorage.getItem(STORAGE_KEY);
        if (!serialized) return undefined;
        return JSON.parse(serialized) as WizardState;
    } catch (err) {
        console.warn('Failed to load wizard state', err);
        return undefined;
    }
};

export const clearState = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
        console.warn('Failed to clear wizard state', err);
    }
};
