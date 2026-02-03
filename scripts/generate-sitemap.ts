
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.resolve('src/content/blog');
const CASE_STUDY_DIR = path.resolve('src/content/case-studies');
const PUBLIC_DIR = path.resolve('public');
const SITE_URL = 'https://riffatlabs.com';

const STATIC_ROUTES = [
    '',
    '/apply',
    '/scale',
    '/services',
    '/audit',
    '/results',
    '/blog'
];

async function generateSitemap() {
    console.log('Generating Sitemap...');

    const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

    // 1. Static Routes
    STATIC_ROUTES.forEach(route => {
        urls.push({
            loc: `${SITE_URL}${route}`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: route === '' ? '1.0' : '0.8'
        });
    });

    // 2. Blog Posts
    if (fs.existsSync(BLOG_DIR)) {
        const blogFiles = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
        blogFiles.forEach(filename => {
            const filePath = path.join(BLOG_DIR, filename);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data } = matter(fileContent);

            // Should verify data.date exists
            const date = data.date ? new Date(data.date).toISOString() : new Date().toISOString();

            urls.push({
                loc: `${SITE_URL}/blog/${filename.replace('.md', '')}`,
                lastmod: date,
                changefreq: 'monthly',
                priority: '0.6'
            });
        });
    }

    // 3. Case Studies (Note: Case studies open in modals usually, but if they have dedicated pages or query params, check router)
    // Looking at router.tsx: there is NO dedicated route for case studies like /case-studies/:slug. 
    // They seem to be displayed in a grid on Home and ResultsGrid.
    // However, if we wanted them to be indexable, we should arguably have a dedicated page or at least list them.
    // The previous analysis showed CaseStudyGrid uses a layout. 
    // Wait, the FR mentions "User can view 'ClaimReview' verification data via a tooltip interaction."
    // And "FR4: User can navigate to the ROI Calculator directly from a relevant Case Study."
    // Does the router support /case-study/:slug? 
    // Router.tsx:
    // path: "results", element: <ResultsGrid />
    // path: "scale", element: <Scale />
    // No dedicated case study route. 
    // The Content Collection exists, but maybe they are just content pieces on the grid.
    // Let's simpler include them if they were pages. But since they aren't in router, I won't include them as URLs to avoid 404s.
    // WAIT! If they are not pages, how can we have "100% of 'Case Study' pages must pass Google's Rich Results Test"?
    // NFR7 says: "100% of "Case Study" pages..."
    // If they are just cards on a grid, the Schema is injected on the list page?
    // Let's re-read the router.

    // Root -> Home, AuditPage, ResultsGrid, Apply, Scale, BlogIndex, BlogPost, DesignSystem.
    // No CaseStudy detail page.

    // So "Case Study pages" might refer to the Results page where they are listed, OR the PRD implies we *should* have had them.
    // But for now, I will NOT add them to Sitemap to avoid errors. 
    // I will only add the static routes and blog posts.

    // ... logic for case studies skipped ...

    // 4. Build XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(url => `
    <url>
        <loc>${url.loc}</loc>
        <lastmod>${url.lastmod}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
    </url>
    `).join('')}
</urlset>`;

    // 5. Write to public/sitemap.xml
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
    console.log(`Sitemap generated with ${urls.length} URLs at public/sitemap.xml`);
}

generateSitemap();
