// @vitest-environment happy-dom
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { StepIndicator } from './StepIndicator';

afterEach(() => {
    cleanup();
});

describe('StepIndicator', () => {
    it('renders correct step text for first step', () => {
        render(<StepIndicator currentStep={0} totalSteps={5} />);

        const stepText = screen.getByTestId('step-text');
        expect(stepText.textContent).toBe('Step 1 of 5');
    });

    it('renders correct step text for middle step', () => {
        render(<StepIndicator currentStep={2} totalSteps={5} />);

        const stepText = screen.getByTestId('step-text');
        expect(stepText.textContent).toBe('Step 3 of 5');
    });

    it('calculates progress percentage correctly', () => {
        render(<StepIndicator currentStep={0} totalSteps={5} />);
        expect(screen.getByTestId('progress-text').textContent).toContain('20% Completed');
    });

    it('calculates progress percentage correctly for middle', () => {
        render(<StepIndicator currentStep={2} totalSteps={5} />);
        expect(screen.getByTestId('progress-text').textContent).toContain('60% Completed');
    });
});
