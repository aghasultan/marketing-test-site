import { useQueryClient } from '@tanstack/react-query';
import { parseAuditHtml, type AuditParseResults } from '../utils/parser';

export interface AuditResultData extends AuditParseResults {
    url: string;
    ttfbMs: number;
}

interface AuditResponse {
    success: boolean;
    data: {
        html: string;
        headers: Record<string, string>;
        statusCode: number;
        url: string;
    };
    message?: string;
}

export const useAudit = () => {
    const queryClient = useQueryClient();

    const mutateAsync = async (url: string): Promise<AuditResultData> => {
        return queryClient.fetchQuery({
            queryKey: ['audit', url],
            staleTime: 1000 * 60 * 5, // Cache for 5 minutes
            queryFn: async () => {
                const startTime = performance.now();

                const response = await fetch('/api/audit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url }),
                });

                const data: AuditResponse = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Audit proxy failed.');
                }

                const rttMs = performance.now() - startTime;

                // Parse HTML string client side
                const parsedResults = parseAuditHtml(data.data.html);

                return {
                    url,
                    ttfbMs: rttMs,
                    pixelFound: parsedResults.pixelFound,
                    seoTitleFound: parsedResults.seoTitleFound,
                    seoDescriptionFound: parsedResults.seoDescriptionFound,
                };
            }
        });
    };

    return { mutateAsync };
};
