import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const bodySchema = z.object({
    url: z.string().url('Invalid URL format. Must include http:// or https://'),
});

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    // CORS Headers for safety
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS
    if (request.method === 'OPTIONS') {
        return response.status(200).end();
    }

    // Enforce POST
    if (request.method !== 'POST') {
        return response.status(405).json({
            error: 'Method Not Allowed',
            message: 'Only POST requests are accepted at this endpoint.',
        });
    }

    try {
        // 1. Validate Input (Task 1)
        const { url } = bodySchema.parse(request.body || {});

        // 2. Fetch target URL (Task 2)
        const targetResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (compatible; RiffatLabsAuditBot/1.0; +https://riffatlabs.com)',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            },
            // Reasonable timeout to avoid hanging lambdas (Vercel max is usually 10s for hobby)
            signal: AbortSignal.timeout(8000),
        });

        if (!targetResponse.ok) {
            return response.status(502).json({
                error: 'Bad Gateway',
                message: `Target server responded with status: ${targetResponse.status} ${targetResponse.statusText}`,
            });
        }

        const html = await targetResponse.text();

        // Extract headers of interest
        const headers: Record<string, string> = {};
        targetResponse.headers.forEach((value, key) => {
            headers[key] = value;
        });

        // Return the successful response
        return response.status(200).json({
            success: true,
            data: {
                url,
                html,
                headers,
                statusCode: targetResponse.status,
            },
        });

    } catch (error) {
        console.error('Audit proxy error:', error);

        // Handle Zod Validation Errors
        if (error instanceof z.ZodError) {
            return response.status(400).json({
                error: 'Bad Request',
                message: 'Invalid request payload',
                details: error.errors,
            });
        }

        // Handle Fetch Timeouts (DOMException 'TimeoutError')
        if (error instanceof Error && error.name === 'TimeoutError') {
            return response.status(504).json({
                error: 'Gateway Timeout',
                message: 'The target server took too long to respond.',
            });
        }

        return response.status(500).json({
            error: 'Internal Server Error',
            message: error instanceof Error ? error.message : 'An unexpected error occurred.',
        });
    }
}
