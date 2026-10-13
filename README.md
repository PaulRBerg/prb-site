# PRB Site

PRB's personal site and blog.

## Presentations

The eight decks imported from [prberg](https://github.com/PaulRBerg/prberg) are linked from
[`/speaking`](https://prberg.vercel.app/speaking). Their original `/presentations/<slug>/` URLs,
`index.html` entry points, and slide hashes remain compatible.

Editable sources live in `slides/`. The six HTML decks share an Astro layout and bundled Reveal.js
runtime, with their original themes and media in `public/presentations/<slug>/`. The CCE and
Frontiers 2026 decks retain their Slidev Markdown, Vue components, and assets.

`just dev` and `just build` first build both Slidev decks into ignored
`public/presentations/<slug>/` directories. `na run build:slides` rebuilds just those decks. Astro
then builds the site and Reveal pages; no vendored Reveal tree or deck-specific package installation
is needed.

The Slidev builds set their own HTML base URLs so images also work on slashless legacy links. The
`floating-vue` override retains the API expected by Slidev's syntax-tooltip integration.

## Inspiration

- [Dario Amodei](https://darioamodei.com/)
- [Gwern](https://gwern.net/)
- [Max Desalle](https://maxdesalle.com/)
- [Peter Steinberger](https://steipete.me/)
