// @vitest-environment happy-dom
import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuditHero } from '../AuditHero';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('AuditHero with Caching', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        // Reset query client for each test so cache is clear
        queryClient = new QueryClient();
        vi.resetAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    const renderWithClient = (ui: React.ReactElement) => {
        return render(
            <QueryClientProvider client={queryClient}>
                {ui}
            </QueryClientProvider>
        );
    };

    it('renders the input field and submit button', () => {
        renderWithClient(<AuditHero />);
        const input = screen.getByPlaceholderText(/Enter your website URL/i);
        const button = screen.getByRole('button', { name: /scan now/i });
        expect(input).toBeDefined();
        expect(button).toBeDefined();
    });

    it('submits valid url, fetches, caches, and transitions to result card', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: {
                    html: '<title>Test</title><meta name="description" content="test"><script>fbq("init", "123");</script>'
                }
            })
        });

        renderWithClient(<AuditHero />);

        const input = screen.getByPlaceholderText(/Enter your website URL/i);
        const button = screen.getByRole('button', { name: /scan now/i });

        await userEvent.type(input, 'example.com');
        fireEvent.click(button);

        // Assert scanning state
        expect(screen.getByText(/scanning/i)).toBeDefined();

        // Assert fetch was called with correct url
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith('/api/audit', expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ url: 'https://example.com' })
            }));
        });

        // Assert Result Card Appears
        await waitFor(() => {
            expect(screen.getByText(/Audit Complete/i)).toBeDefined();
            expect(screen.getByText('https://example.com')).toBeDefined();
        });

        // Test Caching: Click new audit, try again, expect no second fetch!
        const resetBtn = screen.getByText(/New Audit/i);
        fireEvent.click(resetBtn);

        // Wait to show input again
        await waitFor(async () => {
            const retryInput = screen.getByPlaceholderText(/Enter your website URL/i);
            expect(retryInput).toBeDefined();
            // Input retains old value: "https://example.com"
        });

        // Scan again using the EXACT SAME URL so it hits the cache
        fireEvent.click(screen.getByRole('button', { name: /scan now/i }));

        // Wait to show result again
        await waitFor(() => {
            expect(screen.getByText(/Audit Complete/i)).toBeDefined();
        });

        // Expect fetch to STILL ONLY BE CALLED ONCE
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('shows error message if proxy fails', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Rate limit exceeded' })
        });

        renderWithClient(<AuditHero />);

        const input = screen.getByPlaceholderText(/Enter your website URL/i);
        const button = screen.getByRole('button', { name: /scan now/i });

        await userEvent.type(input, 'https://example.com');
        await userEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(/Rate limit exceeded/i)).toBeDefined();
        });
    });
});
