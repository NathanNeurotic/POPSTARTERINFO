# POPStarter Documentation Preservation Site

This repository contains a seed pack and a generated static documentation site for POPStarter, the PS2 homebrew launcher used with Sony's PS2 POPS PS1 emulator.

The site is intentionally source-driven. Claims are tagged by confidence and verification status, modern POPSLoader/fork behavior is separated from original POPStarter core behavior, and unresolved conflicts are kept visible.

## Legal Boundary

This repository must not include Sony POPS emulator binaries, BIOS files, decrypted libraries, or proprietary packages. Do not add or link directly to files such as:

- `POPS.ELF`
- `POPS.PAK`
- `POPS_IOX.PAK`
- `IOPRP252.IMG`
- PS1 BIOS files

The documentation may say that users need legally obtained copies and may describe where those files belong.

## Quick Start

```bash
npm install
npm run build
```

Open the generated site at:

```txt
dist/index.html
```

For a local HTTP preview:

```bash
python -m http.server 4173 -d dist
```

Then open:

```txt
http://localhost:4173/
```

## Scripts

```bash
npm run validate:seed
npm run validate:data
npm run validate:site
npm run build
npm run preflight
```

- `validate:seed` checks the original seed JSON under `data/`.
- `validate:data` checks the site data under `src/data/`.
- `validate:site` checks the generated GitHub Pages output under `dist/`.
- `build` renders the static site into `dist/`.
- `preflight` runs all validators and rebuilds the site.

## Project Layout

```txt
src/data/        Structured source, command, storage, patch, issue, glossary, hotkey, and gap data
src/content/     Page definitions used by the static generator
scripts/         Build and validation scripts
research/        Plan, source audit, conflicts, missing items, and source-note captures
docs/            Original seed drafts
data/            Original seed JSON/YAML
source_notes/    User and assistant seed notes
media/           User-provided screenshot evidence
dist/            Generated site output after npm run build
.github/         GitHub Pages deployment workflow
```

## Why Not Astro/Starlight Yet?

The seed asked for Astro + Starlight unless a better static-docs stack was justified. This pass uses a zero-dependency Node generator so the pack builds offline and `npm install` works without the package registry. The generated output is plain static HTML/CSS/JS and is suitable for GitHub Pages. The structured data and page content are organized so a later Astro/Starlight migration can import them cleanly.

## Research Status

Start with:

- `research/SOURCE_AUDIT.md`
- `research/CONFLICTS.md`
- `research/MISSING.md`
- `research/IMPLEMENTATION_PLAN.md`

Key resolved item in this pass: the "disable ELF loader" workaround is documented as `PATCH_9.BIN` placed in the `POPS` folder, based on krHACKen's PSX-Place page 4 post. This remains marked as conflicting because other seed/ElOtroLado-derived notes associate `PATCH_9.BIN` with `$NOPAL`.

## GitHub Pages Deployment

The repository includes `.github/workflows/deploy-pages.yml`.

Recommended repository settings:

1. Open GitHub repository settings.
2. Go to Pages.
3. Set Source to `GitHub Actions`.
4. Push to `main` or run the workflow manually.

The workflow runs `npm ci`, `npm run preflight`, uploads `dist/`, and deploys it with the official Pages action.

The generated `dist/` includes:

- `.nojekyll`
- `404.html`
- `sitemap.xml`
- `robots.txt`
- `opensearch.xml`
- static HTML pages
- `assets/`
- `evidence/`

## Search Coverage

The site search indexes:

- every guide page
- every command, storage layout, patch, issue, source, and glossary entry
- every local seed draft under `docs/`
- local source notes
- research audit files
- raw web capture notes
- the copy/paste prompt
- structured JSON data pages
