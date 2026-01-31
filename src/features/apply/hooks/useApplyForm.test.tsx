// @vitest-environment happy-dom
import { renderHook, act } from '@testing-library/react';
import { useApplyForm } from './useApplyForm';
import { useWizardStore } from '../stores/wizardStore';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Manual Mock for consistent testing across files
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
    writable: true
});

describe('useApplyForm', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        useWizardStore.getState().resetWizard();
        localStorageMock.clear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('initializes form with store data', () => {
        // Pre-populate store
        useWizardStore.getState().updateFormData({ name: 'John Doe' });

        const { result } = renderHook(() => useApplyForm());

        expect(result.current.getValues('name')).toBe('John Doe');
    });

    it('updates store on form change', async () => {
        const { result } = renderHook(() => useApplyForm());

        // Change value in form
        await act(async () => {
            result.current.setValue('email', 'john@example.com');
            vi.advanceTimersByTime(1000); // 500ms debounce
        });

        // Verify store update (auto-save)
        expect(useWizardStore.getState().formData.email).toBe('john@example.com');
    });
});
