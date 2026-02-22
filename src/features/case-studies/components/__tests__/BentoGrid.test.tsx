/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { BentoGrid } from '../BentoGrid';
import { mockCaseStudies } from '../../data/mockCaseStudies';

// Mock Framer Motion to bypass layout animation context issues in jsdom
vi.mock('framer-motion', async () => {
    const actual = await vi.importActual('framer-motion');
    return {
        ...actual as any,
        motion: {
            div: ({ children, className, ...props }: any) => (
                <div className={className} data-testid="motion-div" {...props}>
                    {children}
                </div>
            )
        },
        AnimatePresence: ({ children }: any) => <>{children}</>
    };
});

// Mock react-router-dom Link since CaseStudyCard uses it
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual as any,
        Link: ({ children, to, className }: any) => (
            <a href={to} className={className} data-testid="mock-link">
                {children}
            </a>
        )
    };
});

describe('BentoGrid component', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders the correct number of case studies', () => {
        const testStudies = mockCaseStudies.slice(0, 3);
        render(<BentoGrid studies={testStudies} />);

        // The first card should span 2 columns based on BentoGrid logic
        // But we just verify they all rendered
        expect(screen.getAllByTestId('motion-div').length).toBeGreaterThanOrEqual(3);
    });

    it('renders the bento layout appropriately for the first item', () => {
        render(<BentoGrid studies={mockCaseStudies} />);
        const motionDivs = screen.getAllByTestId('motion-div');
        // The wrapper is the first motion-div, then the children
        const firstItem = motionDivs[1];

        expect(firstItem).toHaveClass('md:col-span-2');
        expect(firstItem).toHaveClass('lg:col-span-2');
    });

    it('renders empty when no studies provided', () => {
        render(<BentoGrid studies={[]} />);
        const motionDivs = screen.getAllByTestId('motion-div');
        // Only the wrapper div
        expect(motionDivs.length).toBe(1);
    });
});
