// @vitest-environment happy-dom
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { WizardLayout } from './WizardLayout';

afterEach(() => {
    cleanup();
});

describe('WizardLayout', () => {
    const defaultProps = {
        currentStep: 0,
        totalSteps: 5,
        title: 'Test Wizard',
        description: 'Test Description',
        children: <div data-testid="wizard-content">Content</div>
    };

    it('renders title and description', () => {
        render(<WizardLayout {...defaultProps} />);

        expect(screen.getByText('Test Wizard')).toBeTruthy();
        expect(screen.getByText('Test Description')).toBeTruthy();
    });

    it('renders children content', () => {
        render(<WizardLayout {...defaultProps} />);

        expect(screen.getByTestId('wizard-content')).toBeTruthy();
    });

    it('renders step indicator', () => {
        render(<WizardLayout {...defaultProps} />);
        expect(screen.getByTestId('step-indicator')).toBeTruthy();
    });
});
