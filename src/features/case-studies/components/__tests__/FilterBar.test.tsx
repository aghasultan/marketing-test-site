/**
 * @vitest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { FilterBar } from '../FilterBar';

describe('FilterBar component', () => {
    afterEach(() => {
        cleanup();
    });

    const industries = ['SaaS', 'E-commerce', 'Healthcare'];
    const spendRanges = ['$10k-$50k', '$50k+'];

    it('renders all filter categories and options', () => {
        render(
            <FilterBar
                industries={industries}
                spendRanges={spendRanges}
                activeIndustry={null}
                activeSpend={null}
                onIndustryChange={vi.fn()}
                onSpendChange={vi.fn()}
                resultCount={5}
            />
        );

        expect(screen.getByText('Industry')).toBeInTheDocument();
        expect(screen.getByText('Ad Spend Scale')).toBeInTheDocument();
        expect(screen.getByText('5 Results')).toBeInTheDocument();

        industries.forEach(ind => {
            expect(screen.getByText(ind)).toBeInTheDocument();
        });
        spendRanges.forEach(range => {
            expect(screen.getByText(range)).toBeInTheDocument();
        });
    });

    it('calls onIndustryChange when an industry is clicked', () => {
        const onIndustryChange = vi.fn();
        render(
            <FilterBar
                industries={industries}
                spendRanges={spendRanges}
                activeIndustry={null}
                activeSpend={null}
                onIndustryChange={onIndustryChange}
                onSpendChange={vi.fn()}
                resultCount={5}
            />
        );

        const saasBtn = screen.getByRole('button', { name: 'SaaS' });
        fireEvent.click(saasBtn);
        expect(onIndustryChange).toHaveBeenCalledWith('SaaS');

        const allBtn = screen.getAllByRole('button', { name: 'All' })[0];
        fireEvent.click(allBtn);
        expect(onIndustryChange).toHaveBeenCalledWith(null);
    });

    it('calls onSpendChange when a spend range is clicked', () => {
        const onSpendChange = vi.fn();
        render(
            <FilterBar
                industries={industries}
                spendRanges={spendRanges}
                activeIndustry={null}
                activeSpend={null}
                onIndustryChange={vi.fn()}
                onSpendChange={onSpendChange}
                resultCount={5}
            />
        );

        const highSpendBtn = screen.getByRole('button', { name: '$50k+' });
        fireEvent.click(highSpendBtn);
        expect(onSpendChange).toHaveBeenCalledWith('$50k+');

        const allSizeBtn = screen.getByRole('button', { name: 'All Sizes' });
        fireEvent.click(allSizeBtn);
        expect(onSpendChange).toHaveBeenCalledWith(null);
    });
});
