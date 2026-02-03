import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { load } from 'cheerio';

const MAX_TIMEOUT = 8000; // 8 seconds
const USER_AGENT = 'RiffatLabs-AuditBot/1.0 (+https://riffatlabs.com)';

export default async function handler(request: VercelRequest, response: VercelResponse) {
    // CORS Headers
    const origin = request.headers.origin || '*';
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', origin); // In prod, whitelist specific domains
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    response.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS (Preflight)
    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    // Only allow POST
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    const { url } = request.body;
    if (!url || typeof url !== 'string') {
        return response.status(400).json({ error: 'Missing or invalid URL' });
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), MAX_TIMEOUT);

        const { data, headers: responseHeaders, status } = await axios.get(url, {
            headers: { 'User-Agent': USER_AGENT },
            timeout: MAX_TIMEOUT,
            // @ts-expect-error - signal is valid in newer axios but types might lag or conflict
            signal: controller.signal,
            maxContentLength: 5 * 1024 * 1024, // Limit to 5MB
        });

        const html = typeof data === 'string' ? data : String(data);

        clearTimeout(timeout);

        // Initial parsing to verify we got HTML
        const $ = load(html);
        const title = $('title').text() || '';
        const description = $('meta[name="description"]').attr('content') || '';

        // We return the raw HTML (or parts of it) for the client-side analysis service to process deeply,
        // OR we return structured data if we move analysis here later. 
        // For Story 2.1, we focus on just getting the data.
        return response.status(200).json({
            success: true,
            url,
            status,
            headers: responseHeaders,
            html: html.substring(0, 500000), // Return first 500KB to be safe with Vercel limits
            meta: {
                title,
                description,
            }
        });

    } catch (error: unknown) {
        // Manual type guard
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isAxiosError = (err: any): boolean => {
            return err && typeof err === 'object' && 'isAxiosError' in err;
        };

        if (isAxiosError(error)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const axiosErr = error as any;
            if (axiosErr.code === 'ECONNABORTED' || axiosErr.name === 'AbortError') {
                return response.status(504).json({ error: 'Target URL timed out' });
            }
            return response.status(502).json({
                error: 'Failed to fetch target URL',
                details: axiosErr.message
            });
        }

        const err = error as Error;
        return response.status(502).json({
            error: 'Failed to fetch target URL',
            details: err.message
        });
    }
}
