import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '@/lib/seo-config';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article';
    noindex?: boolean;
    useTemplate?: boolean;
    schema?: object | string;
    canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title,
    description = SEO_CONFIG.description,
    image = SEO_CONFIG.defaultImage,
    type = 'website',
    noindex = false,
    useTemplate = true,
    schema,
    canonical
}) => {
    const finalTitle = title
        ? (useTemplate ? SEO_CONFIG.titleTemplate.replace('%s', title) : title)
        : SEO_CONFIG.defaultTitle;

    // Ensure absolute URL for image if it's a relative path
    const imageUrl = image.startsWith('http')
        ? image
        : `${SEO_CONFIG.siteUrl}${image}`;

    const canonicalUrl = canonical || window.location.href;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{finalTitle}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content="Riffat Labs" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />

            {/* Canonical */}
            <link rel="canonical" href={canonicalUrl} />

            {/* JSON-LD Schema */}
            {schema && (
                <script type="application/ld+json">
                    {typeof schema === 'string'
                        ? schema.replace(/</g, '\\u003c')
                        : JSON.stringify(schema).replace(/</g, '\\u003c')
                    }
                </script>
            )}
        </Helmet>
    );
};
