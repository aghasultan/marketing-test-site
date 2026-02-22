# Story 4.5: Asset Optimization & Lazy Loading

## Metadata
- **Epic**: Epic 4
- **Title**: Asset Optimization & Lazy Loading
- **Role**: End User
- **Goal**: Ensure the website loads instantaneously using lazy loading and asset optimizations to pass the tight web-vitals benchmarks.

## Acceptance Criteria
- [ ] Images that appear under the fold need to be completely `loading="lazy"` or dynamically handled.
- [ ] Case study detailed blocks, graphs, code blocks should not impact the main Initial JS payload.
- [ ] LCP must comfortably sit under `0.8` seconds (NFR1), bundle size < `100KB` gzipped (NFR3).

## Tasks
- [ ] Apply `React.lazy` to `results-engine` inner blocks and heavily dynamic graphs or `MDX` imported blocks inside Case Study displays.
- [ ] Make sure Hero `img` are eager loaded, but case study internal cover images are lazy.

## Testing Strategy
- Perform tests examining code-splitting on chunk sizes (`npm run build`).
- Verify there are multiple small JS bundles instead of a monolithic single module.
