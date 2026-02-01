---
story_id: "5-2-content-authority-engine"
epic_id: "epic-5"
title: "Content Authority Engine (Advanced Blog)"
description: "Implement advanced discovery features for the blog including real-time search, category filtering, related posts, and RSS generation to maximize organic engagement."
status: "in-progress"
assigned_to: "dev-agent"
---

## Tasks

- [ ] **Data Layer Enhancement**: Update `useBlog` hook to support client-side fuzzy search and category filtering.
- [ ] **UI Component - Search**: Implement `BlogSearch` component with real-time filtering.
- [ ] **UI Component - Categories**: Implement `CategoryFilter` component with active state toggling.
- [ ] **UI Component - Related Posts**: Create `RelatedPosts` component that finds 3 posts with matching tags.
- [ ] **RSS Generator**: Create a build script `scripts/generate-rss.ts` to output `public/rss.xml`.
- [ ] **Integration**: Assemble the new components into `BlogIndex.tsx` and `BlogPost.tsx`.

## Technical Notes
- Use `fuse.js` or simple string matching for search (depending on complexity).
- Related posts logic: Score = (matching tags * 2) + (same category * 1).
- RSS feed must be strictly valid XML to pass validators.
