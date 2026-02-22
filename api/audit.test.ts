/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import handler from './audit';

// Mock dependencies
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Audit Proxy API Handler', () => {
    let mockReq: Partial<VercelRequest>;
    let mockRes: Partial<VercelResponse>;
    let statusMock: ReturnType<typeof vi.fn>;
    let jsonMock: ReturnType<typeof vi.fn>;
    let endMock: ReturnType<typeof vi.fn>;
    let setHeaderMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        statusMock = vi.fn().mockReturnThis();
        jsonMock = vi.fn();
        endMock = vi.fn();
        setHeaderMock = vi.fn();

        mockReq = {
            method: 'POST',
            body: { url: 'https://example.com' },
            headers: { 'x-forwarded-for': '127.0.0.1' },
            socket: { remoteAddress: '127.0.0.1' } as any,
        };

        mockRes = {
            status: statusMock as any,
            json: jsonMock as any,
            end: endMock as any,
            setHeader: setHeaderMock as any,
        };

        vi.clearAllMocks();
    });

    it('rejects non-POST methods', async () => {
        mockReq.method = 'GET';
        await handler(mockReq as VercelRequest, mockRes as VercelResponse);

        expect(statusMock).toHaveBeenCalledWith(405);
        expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ error: 'Method Not Allowed' }));
    });

    it('handles OPTIONS requested for CORS', async () => {
        mockReq.method = 'OPTIONS';
        await handler(mockReq as VercelRequest, mockRes as VercelResponse);

        expect(statusMock).toHaveBeenCalledWith(200);
        expect(endMock).toHaveBeenCalled();
    });

    it('returns 400 for missing or invalid url', async () => {
        mockReq.body = { url: 'not-a-valid-url' };
        await handler(mockReq as VercelRequest, mockRes as VercelResponse);

        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ error: 'Bad Request' }));
    });

    it('returns 502 if target fetch fails', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found',
            text: async () => 'Not Found HTML',
            headers: new Map(),
        });

        await handler(mockReq as VercelRequest, mockRes as VercelResponse);

        expect(mockFetch).toHaveBeenCalledWith('https://example.com', expect.any(Object));
        expect(statusMock).toHaveBeenCalledWith(502);
        expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ error: 'Bad Gateway' }));
    });

    it('returns 200 and successful fetch payload', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            statusText: 'OK',
            text: async () => '<html><body>Success</body></html>',
            headers: new Map([['content-type', 'text/html']]),
        });

        await handler(mockReq as VercelRequest, mockRes as VercelResponse);

        expect(mockFetch).toHaveBeenCalledWith('https://example.com', expect.any(Object));
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            data: expect.objectContaining({
                html: '<html><body>Success</body></html>',
                url: 'https://example.com',
                statusCode: 200,
            }),
        }));
    });
});
