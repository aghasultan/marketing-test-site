/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ResultsSection } from '../ResultsSection';
import { mockCaseStudies } from '../../data/mockCaseStudies';

// Mock dependencies
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    return {
        ...actual as any,
        motion: {
            div: ({ children, className }: any) => <div className={className}>{children}</div>
        },
        AnimatePresence: ({ children }: any) => <>{children}</>
    };
});

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual as any,
        Link: ({ children, to, className }: any) => (
            <a href={to} className={className}>{children}</a>
        )
    };
});

describe('ResultsSection component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders the core layout and filter bar', () => {
        render(<ResultsSection />);
        expect(screen.getByText('Verified Growth Outcomes')).toBeInTheDocument();
        expect(screen.getByText('Industry')).toBeInTheDocument();
        expect(screen.getByText('Ad Spend Scale')).toBeInTheDocument();
    });

    it('filters case studies when industry is selected', () => {
        render(<ResultsSection />);
        // Initial state should show all mocks
        const initialResultText = `${mockCaseStudies.length} Results`;
        expect(screen.getByText(initialResultText)).toBeInTheDocument();

        // Click SaaS filter
        const saasBtn = screen.getByRole('button', { name: 'SaaS' });
        fireEvent.click(saasBtn);

        // Count saas mocks
        const saasCount = mockCaseStudies.filter(s => s.industry === 'SaaS').length;
        expect(screen.getByText(`${saasCount} Result${saasCount !== 1 ? 's' : ''}`)).toBeInTheDocument();
    });

    it('displays the empty state when filters eliminate all options', () => {
        render(<ResultsSection />);

        // This relies on the fact we probably don't have a specific esoteric combo
        // We'll force an empty state by mocking the data or making a contradictory selection.
        // Actually, just click SaaS, then click an AdSpend range we know isn't SaaS to trigger it.
        const saasBtn = screen.getByRole('button', { name: 'SaaS' });
        fireEvent.click(saasBtn);

        const lowSpendBtn = screen.getByRole('button', { name: '$10k - $50k/mo' }); // Uses the exact dynamic text from mockCaseStudies 
        fireEvent.click(lowSpendBtn);

        // Check if empty state renders
        expect(screen.getByText(/We don't have a published study matching those precise criteria/i)).toBeInTheDocument();

        // Check clear button works
        const clearBtn = screen.getByText('Clear all filters');
        fireEvent.click(clearBtn);

        const resetResultText = `${mockCaseStudies.length} Results`;
        expect(screen.getByText(resetResultText)).toBeInTheDocument();
    });
});
