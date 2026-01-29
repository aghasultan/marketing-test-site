export interface AuditResult {
    score: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    analysis: {
        headlines: string;
        descriptions: string;
        keywords: string;
    };
    recommendations: string[];
}

export const mockAnalyzeUrl = async (url: string): Promise<AuditResult> => {
    console.log(`Analyzing URL: ${url}`);

    // Simulate network delay (1.5s - 3.5s)
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 2000));

    // Mock logic: return a fixed result for now
    return {
        score: 72,
        grade: 'C',
        analysis: {
            headlines: "Good use of emotional triggers, but lacks specific benefits.",
            descriptions: "Descriptions are too generic. Missing call to action.",
            keywords: "Targeting broad keywords. High competition, low intent."
        },
        recommendations: [
            "Include numbers in headlines (e.g., '3 ways to...')",
            "Add a clear CTA in the first 90 characters of the description",
            "Refine keyword targeting to long-tail variations"
        ]
    };
};
