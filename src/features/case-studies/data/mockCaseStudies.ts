import { CaseStudy } from '../types';

export const mockCaseStudies: CaseStudy[] = [
    {
        id: "cs-001",
        title: "Scaling B2B SaaS ARR from $2M to $10M in 14 Months",
        clientName: "CloudOps Security",
        industry: "SaaS",
        adSpendRange: "$50k - $100k/mo",
        excerpt: "CloudOps needed to penetrate the enterprise security market. We deployed a highly targeted ABM strategy combined with intent-data-driven search campaigns.",
        metrics: [
            { label: "ARR Growth", value: "5x" },
            { label: "CAC Reduction", value: "40%" },
            { label: "Enterprise Deals", value: "24" }
        ],
        isVerified: true,
        slug: "cloudops-security-scale",
        claimReview: {
            claimReviewed: "Scaled B2B SaaS ARR from $2M to $10M in 14 Months",
            itemReviewed: {
                name: "CloudOps Security Financial Statements Q3 2024",
                datePublished: "2024-10-01",
                author: {
                    name: "CloudOps Security Board of Directors",
                    type: "Organization",
                    url: "https://example.com/cloudops-securities/investors"
                }
            },
            reviewRating: {
                ratingValue: "1",
                bestRating: "1",
                alternateName: "Verified Metric"
            },
            author: {
                name: "Riffat Labs Audit Team",
                type: "Organization"
            }
        }
    },
    {
        id: "cs-002",
        title: "DTC Apparel Brand Hits $10M Run Rate Objectively",
        clientName: "FitWear Athletics",
        industry: "E-Commerce",
        adSpendRange: "$100k+/mo",
        excerpt: "By transitioning FitWear off standard Advantage+ shopping and onto our custom multi-touch predictable funnel, ROAS stabilized instantly.",
        metrics: [
            { label: "Monthly Revenue", value: "$850k" },
            { label: "Blended ROAS", value: "3.4x" },
            { label: "New Cust.", value: "4,200" }
        ],
        isVerified: true,
        slug: "fitwear-dtc-10m",
        claimReview: {
            claimReviewed: "$10M Run Rate Achieved with 3.4x Blended ROAS",
            itemReviewed: {
                name: "FitWear Shopify Analytics Export",
                datePublished: "2025-01-15",
                author: {
                    name: "FitWear Analytics Engine",
                    type: "SoftwareApplication",
                    url: "https://example.com"
                }
            },
            reviewRating: {
                ratingValue: "1",
                bestRating: "1",
                alternateName: "Verified Metric"
            },
            author: {
                name: "Riffat Labs Audit Team",
                type: "Organization"
            }
        }
    },
    {
        id: "cs-003",
        title: "Local Healthcare Clinics Triple Lead Flow",
        clientName: "Apex Dental Surge",
        industry: "Healthcare",
        adSpendRange: "$10k - $50k/mo",
        excerpt: "We localized Meta campaigns and optimized Google Maps search results to dominate the 15-mile radius around all three Apex Dental locations.",
        metrics: [
            { label: "Cost Per Lead", value: "$45" },
            { label: "New Patients", value: "315" },
            { label: "Lead Vol", value: "+300%" }
        ],
        isVerified: false,
        slug: "apex-dental-lead-flow"
    },
    {
        id: "cs-004",
        title: "FinTech App Drops Customer Acquisition Cost by 65%",
        clientName: "SpendWise App",
        industry: "Finance",
        adSpendRange: "$50k - $100k/mo",
        excerpt: "SpendWise's user acquisition stalled. We completely rebuilt their creative engine, deploying 40+ variations per week on TikTok and Reels.",
        metrics: [
            { label: "Installs", value: "120k" },
            { label: "CPA Reduction", value: "65%" },
            { label: "Retention", value: "+18%" }
        ],
        isVerified: true,
        slug: "spendwise-fintech-cpa",
        claimReview: {
            claimReviewed: "65% CPA Reduction for 120k Net New Installs",
            itemReviewed: {
                name: "SpendWise AppsFlyer Dashboard",
                datePublished: "2024-11-20",
                author: {
                    name: "AppsFlyer Systems",
                    type: "SoftwareApplication",
                    url: "https://example.com"
                }
            },
            reviewRating: {
                ratingValue: "1",
                bestRating: "1",
                alternateName: "Verified Metric"
            },
            author: {
                name: "Riffat Labs Audit Team",
                type: "Organization"
            }
        }
    },
    {
        id: "cs-005",
        title: "B2B Manufacturing Firm Generates $4M Pipeline",
        clientName: "SteelTech Industries",
        industry: "Manufacturing",
        adSpendRange: "$10k - $50k/mo",
        excerpt: "We translated complex industrial capabilities into a compelling LinkedIn Lead Gen funnel, targeting procurement officers explicitly.",
        metrics: [
            { label: "Pipe Gen", value: "$4.1M" },
            { label: "Closed Won", value: "$850k" },
            { label: "Lead to Opp", value: "22%" }
        ],
        isVerified: false,
        slug: "steeltech-manufacturing-pipeline"
    }
];
