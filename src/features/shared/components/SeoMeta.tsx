import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CaseStudy } from '../../case-studies/types';

interface SeoMetaProps {
    title: string;
    description: string;
    url?: string;
    image?: string;
    caseStudy?: CaseStudy; // If provided, injects ClaimReview schema
}

export const SeoMeta: React.FC<SeoMetaProps> = ({ title, description, url = 'https://rrlabs.com', image = 'https://rrlabs.com/og-image.png', caseStudy }) => {

    // Schema Builder Logic for FR15 (ClaimReview JSON-LD)
    const generateClaimReviewSchema = (cs: CaseStudy) => {
        if (!cs.isVerified || !cs.claimReview) return null;

        const schema = {
            "@context": "https://schema.org",
            "@type": "ClaimReview",
            "claimReviewed": cs.claimReview.claimReviewed,
            "itemReviewed": {
                "@type": "CreativeWork",
                "name": cs.claimReview.itemReviewed.name,
                "datePublished": cs.claimReview.itemReviewed.datePublished,
                "author": {
                    "@type": cs.claimReview.itemReviewed.author.type,
                    "name": cs.claimReview.itemReviewed.author.name,
                    "url": cs.claimReview.itemReviewed.author.url
                }
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": cs.claimReview.reviewRating.ratingValue,
                "bestRating": cs.claimReview.reviewRating.bestRating,
                "alternateName": cs.claimReview.reviewRating.alternateName
            },
            "author": {
                "@type": cs.claimReview.author.type,
                "name": cs.claimReview.author.name
            }
        };

        return JSON.stringify(schema);
    };

    return (
        <Helmet>
            <title>{title} | RR Labs</title>
            <meta name="description" content={description} />

            {/* Open Graph Tags for Social Previews (Story 4.4) */}
            <meta property="og:title" content={`${title} | RR Labs`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${title} | RR Labs`} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Dynamic ClaimReview injection (Story 4.2) */}
            {caseStudy && caseStudy.isVerified && caseStudy.claimReview && (
                <script type="application/ld+json">
                    {generateClaimReviewSchema(caseStudy)}
                </script>
            )}
        </Helmet>
    );
};
