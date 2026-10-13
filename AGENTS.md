# prb-site

Personal website built with Astro and Bun. Slidev decks under `slides/` build into the git-ignored
`public/presentations/`.

Invoke package scripts and local binaries with `bun run <script|bin>`, not `na`.

## Checks

Run `just full-write` and then `just full-check` after every change, before committing. Do not wait
until the end of a task. Each commit must leave `just full-check` passing.

- `just full-check` runs `astro check`, oxfmt, Prettier, and oxlint.
- `just full-write` applies the oxfmt, Prettier, and oxlint fixes.

## Formatting

- oxfmt formats TS, JS, and JSON. Its `ignorePatterns` live in `.oxfmtrc.json`.
- Prettier formats `.astro`, `.md`, and `.mdx` files. Keep `.prettierrc.mjs` in sync with
  `.oxfmtrc.json`.
- `.prettierignore` excludes the Slidev entrypoints (`slides/*/slides.md`). Prettier turns their
  `---` slide separators into prose, which breaks the deck.

## Blog Link Previews

Use `.mdx` for posts that import `src/components/LinkPreview.astro`. Render standalone links with
`<LinkPreview href="https://example.com" />`. Metadata is fetched at build time. Unavailable pages
fall back to ordinary links. Run `node --test src/utils/linkPreview.test.ts` after changing metadata
parsing or fetching.

## Blog Illustrations

For `public/post/autonomy-trifecta/`, keep a consistent, predominantly white theme with soft pastel
colors. Add a small X logo and `@PaulRBerg` in the bottom-right corner of every image.
