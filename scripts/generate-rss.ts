
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.resolve('src/content/blog');
const PUBLIC_DIR = path.resolve('public');
const SITE_URL = 'https://aghasultan.com';

async function generateRSS() {
    console.log('Generating RSS feed...');

    // 1. Read all blog posts
    const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
    const posts = files.map(filename => {
        const filePath = path.join(BLOG_DIR, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        return {
            title: data.title,
            description: data.description,
            date: new Date(data.date),
            slug: filename.replace('.md', ''),
            category: data.category,
            content: content
        };
    }).sort((a, b) => b.date.getTime() - a.date.getTime());

    // 2. Build XML
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
    <title>Digital Garden | Agha Sultan Naseer</title>
    <link>${SITE_URL}</link>
    <description>Field notes on Meta Ads, Google performance, and full-funnel tracking.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts.map(post => `
    <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${SITE_URL}/blog/${post.slug}</link>
        <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
        <pubDate>${post.date.toUTCString()}</pubDate>
        <description><![CDATA[${post.description}]]></description>
        <category>${post.category}</category>
    </item>
    `).join('')}
</channel>
</rss>`;

    // 3. Write to public/rss.xml
    fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), xml);
    console.log(`RSS feed generated with ${posts.length} posts at public/rss.xml`);
}

generateRSS();
