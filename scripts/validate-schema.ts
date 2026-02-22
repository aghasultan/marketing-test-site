import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Zod Schema enforcing ClaimReview specifications (FR16)
const claimReviewValidator = z.object({
    claimReviewed: z.string().min(5),
    itemReviewed: z.object({
        name: z.string().min(1),
        datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD format"),
        author: z.object({
            name: z.string().min(1),
            type: z.enum(["Organization", "SoftwareApplication"]),
            url: z.string().url()
        })
    }),
    reviewRating: z.object({
        ratingValue: z.string().min(1),
        bestRating: z.string().min(1),
        alternateName: z.string().min(1)
    }),
    author: z.object({
        name: z.string().min(1),
        type: z.enum(["Organization", "Person"])
    })
});

// Frontmatter schema mapping
const FrontmatterValidator = z.object({
    id: z.string(),
    title: z.string(),
    isVerified: z.boolean(),
    claimReview: claimReviewValidator.optional()
}).superRefine((data, ctx) => {
    if (data.isVerified && !data.claimReview) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "If 'isVerified' is true, a valid 'claimReview' object MUST be provided."
        });
    }
});

async function validateSchemas() {
    const contentDir = path.resolve(__dirname, '../src/content/case-studies');
    const files = fs.readdirSync(contentDir);
    let hasErrors = false;

    console.log('🔍 Executing Build-Time Schema Validation...');

    files.filter(f => f.endsWith('.md')).forEach(file => {
        const rawContent = fs.readFileSync(path.join(contentDir, file), 'utf-8');
        const { data } = matter(rawContent);

        const result = FrontmatterValidator.safeParse(data);

        if (!result.success) {
            hasErrors = true;
            console.error(`\n❌ Validation Failed: ${file}`);
            result.error.errors.forEach(err => {
                console.error(`  - Field [${err.path.join('.')}] - ${err.message}`);
            });
        } else {
            console.log(`✅ Passed: ${file}`);
        }
    });

    if (hasErrors) {
        console.error('\n🚨 Build failed due to ClaimReview Schema Validation errors! Fix the markdown frontmatters to satisfy Google Rich Snippet standards.');
        process.exit(1);
    } else {
        console.log('\n🚀 All schemas validated perfectly.');
    }
}

validateSchemas();
