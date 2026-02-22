export interface ClaimReviewSchema {
    claimReviewed: string;
    itemReviewed: {
        name: string;
        datePublished: string;
        author: {
            name: string;
            type: string;
            url: string;
        };
    };
    reviewRating: {
        ratingValue: string;
        bestRating: string;
        alternateName?: string;
    };
    author: {
        name: string;
        type: string;
    };
}

export interface Metric {
    label: string;
    value: string;
    description?: string;
}

export interface CaseStudy {
    id: string;
    title: string;
    clientName: string;
    industry: string;
    adSpendRange: string;
    excerpt: string;
    metrics: Metric[];
    isVerified: boolean;
    claimReview?: ClaimReviewSchema;
    featuredImage?: string;
    slug: string;
    markdownContent?: string;
}

export interface FilterState {
    industry: string | null;
    adSpendRange: string | null;
}
