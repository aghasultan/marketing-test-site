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
2.  **Apply Wizard:** Multi-step qualification form with state management.
3.  **Performance:** Optimized for Core Web Vitals (LCP/CLS) to support Ad Quality Scores.
4.  **Tracking:** Architecture ready for Meta CAPI & Google Offline Conversions.

## 📂 Project Structure

| Path | Purpose |
| :--- | :--- |
| `src/pages/` | Main route views (`Home`, `Scale`, `Apply`) |
| `src/components/` | Reusable UI components (Bento grid, Wizard) |
| `src/content/` | Markdown content for the Blog |
| `legacy_reference/` | Archived Jekyll site (Do not edit) |

## 🛠 Local Development

```bash
git clone [https://github.com/aghasultan/marketing-test-site.git](https://github.com/aghasultan/marketing-test-site.git)
cd marketing-test-site
npm install
npm run dev

Live Demo: https://marketing-test-site.vercel.app/
