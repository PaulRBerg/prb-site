# prb-site

Personal website built with Astro and Bun. Slidev decks under `slides/` build into the git-ignored
`public/presentations/`.

## Checks

Run `just full-write` and then `just full-check` after every change, before committing. Do not wait
until the end of a task. Each commit must leave `just full-check` passing.

- `just full-check` runs `astro check`, oxfmt, Prettier, and oxlint.
- `just full-write` applies the oxfmt, Prettier, and oxlint fixes.

## Formatting

- oxfmt formats TS, JS, and JSON. Its `ignorePatterns` live in `.oxfmtrc.json`.
- Prettier formats `.astro` and `.md` files. Keep `.prettierrc.mjs` in sync with `.oxfmtrc.json`.
- `.prettierignore` excludes the Slidev entrypoints (`slides/*/slides.md`). Prettier turns their
  `---` slide separators into prose, which breaks the deck.
