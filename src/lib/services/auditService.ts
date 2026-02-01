
export interface AuditCheck {
    id: 'pixel' | 'seo' | 'speed';
    label: string;
    status: 'pass' | 'fail' | 'loading' | 'error';
    score: number; // 0-100
    message: string;
    details?: string;
}

export interface AuditResult {
    url: string;
    timestamp: string;
    checks: AuditCheck[];
    overallScore: number;
}

export interface ProxyResponse {
    success: boolean;
    url: string;
    status: number;
    html: string;
    headers: Record<string, string>;
    meta: {
        title: string;
        description: string;
    };
}

/**
 * Checks for Meta Pixel in HTML
 */
export const checkMetaPixel = (html: string): AuditCheck => {
    // Common patterns for Meta Pixel
    const pixelPatterns = [
        /fbq\(['"]init['"]/,
        /connect\.facebook\.net\/en_US\/fbevents\.js/,
        /https:\/\/connect\.facebook\.net\/signals\/config/,
        /_fbq/
    ];

    const hasPixel = pixelPatterns.some(pattern => pattern.test(html));

    return {
        id: 'pixel',
        label: 'Meta Pixel',
        status: hasPixel ? 'pass' : 'fail',
        score: hasPixel ? 100 : 0,
        message: hasPixel ? 'Pixel detected.' : 'No Meta Pixel found.',
        details: hasPixel ? 'Ad tracking is active.' : 'You are missing retargeting data.'
    };
};

/**
 * Checks SEO Basics
 */
export const checkSEO = (_html: string, meta: { title: string; description: string }): AuditCheck => {
    const { title, description } = meta;
    const titleLength = title.length;
    const descLength = description.length;

    const hasTitle = titleLength > 0;
    const hasDesc = descLength > 0;
    const goodTitle = titleLength >= 10 && titleLength <= 60;

    let status: 'pass' | 'fail' = 'fail';
    let message = 'Missing core tags.';
    let score = 0;

    if (hasTitle && hasDesc) {
        if (goodTitle) {
            status = 'pass';
            score = 100;
            message = 'SEO tags are healthy.';
        } else {
            status = 'fail'; // Strict fail for bad length to encourage fix
            score = 50;
            message = `Title is ${titleLength < 10 ? 'too short' : 'too long'}.`;
        }
    } else if (hasTitle) {
        message = 'Missing meta description.';
        score = 30;
    }

    return {
        id: 'seo',
        label: 'SEO Basics',
        status,
        score,
        message,
        details: `Title: ${titleLength} chars. Description: ${hasDesc ? 'Present' : 'Missing'}.`
    };
};

/**
 * Checks Response Time (Speed)
 */
export const checkPerformance = (startTime: number, endTime: number): AuditCheck => {
    const duration = endTime - startTime; // milliseconds
    const isFast = duration < 1000; // < 1.0s

    return {
        id: 'speed',
        label: 'Response Speed',
        status: isFast ? 'pass' : 'fail',
        score: isFast ? 100 : Math.max(0, 100 - ((duration - 1000) / 100)),
        message: isFast ? 'Server responded quickly.' : 'Server response is slow.',
        details: `${duration.toFixed(0)}ms TTFB (approx).`
    };
};

/**
 * Main Analysis Service
 */
export const analyzeUrl = async (url: string): Promise<AuditResult> => {
    const startTime = performance.now();

    try {
        const response = await fetch('/api/audit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const endTime = performance.now();
        const data: ProxyResponse = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(`Audit failed: ${response.statusText}`);
        }

        const pixelCheck = checkMetaPixel(data.html);
        const seoCheck = checkSEO(data.html, data.meta);
        const speedCheck = checkPerformance(startTime, endTime);

        const checks = [pixelCheck, seoCheck, speedCheck];
        const overallScore = Math.round(checks.reduce((acc, c) => acc + c.score, 0) / checks.length);

        return {
            url,
            timestamp: new Date().toISOString(),
            checks,
            overallScore
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Analysis failed:', error);
        // Return a failed result structure instead of throwing, so UI can show "Failed"
        return {
            url,
            timestamp: new Date().toISOString(),
            overallScore: 0,
            checks: [
                { id: 'pixel', label: 'Meta Pixel', status: 'error', score: 0, message: 'Check failed' },
                { id: 'seo', label: 'SEO Basics', status: 'error', score: 0, message: 'Check failed' },
                { id: 'speed', label: 'Response Speed', status: 'error', score: 0, message: 'Check failed' }
            ]
        };
    }
};
