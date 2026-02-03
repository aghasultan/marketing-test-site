# Riffat Labs (Marketing Site)

This repo hosts the official website for **Riffat Labs**, a high-performance performance marketing agency led by **Agha Sultan Naseer**.

The site is a Single Page Application (SPA) built to demonstrate the very ad tracking and conversion technologies we implement for clients (CAPI, Server-Side Tracking, Profit Scaling).

## 🚀 Tech Stack

- **Core:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Framer Motion
- **Architecture:** SPA with Client-Side Routing (`react-router-dom`)
- **Deployment:** Vercel (Root domain)
- **Content:** Markdown-based blog (Headless architecture)

## ⚡️ Key Features

1.  **ROI Calculator:** Interactive tool for estimating ad spend upside.
2.  **Smart Wizard:** Multi-step qualification form with logic branching (replacing basic Apply form).
3.  **Audit Scanner:** "No-Click" audit engine detecting Meta Pixels and SEO tags.
4.  **Performance:** Optimized for Core Web Vitals (LCP/CLS) using lazy loading and asset optimization.

## 📂 Project Structure

| Path | Purpose |
| :--- | :--- |
| `src/pages/` | Main route views (`Home`, `Scale`, `AuditPage`, `Apply`) |
| `src/components/` | Reusable UI components (Bento grid, Wizard) |
| `src/content/` | Markdown content for Blog and Case Studies |
| `src/features/` | Complex domains (Wizard Logic, Audit Service, Results) |

## 🛠 Local Development

```bash
git clone https://github.com/aghasultan/marketing-test-site.git
cd marketing-test-site
npm install
npm run dev
```

## 📝 Operating Procedures

### How to Edit Content
- **Blog Posts:** Add new `.md` files to `src/content/blog/`. Frontmatter determines URL and sorting.
- **Case Studies:** Edit `src/content/case-studies/`. Note: These populate the `ResultsGrid`.
- **Sitemap/RSS:** Run `npm run build` locally to test generation, or rely on Vercel build pipeline.

### How to Run Tests
We use Playwright for end-to-end reliability.

```bash
npm run test
```

### Deployment
Push to `main` triggers a Vercel deployment.
See `docs/deployment-guide.md` for full configuration details.
