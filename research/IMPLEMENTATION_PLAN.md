# POPStarter Documentation Site Implementation Plan

Generated: 2026-06-21

## Scope

Build a preservation-grade static POPStarter documentation site from the local seed pack plus live source checks. The site must remain legally safe: no Sony POPS binaries, BIOS files, proprietary packages, or direct redistribution links are stored in the repo.

## Implementation Steps

1. Preserve source provenance.
   - Convert `data/known_sources.yaml` into structured `src/data/sources.json`.
   - Record source reliability, live/dead/archive status, and current research notes.
   - Keep user-tested Discord/screenshot notes as user-tested evidence, not universal fact.

2. Create structured reference data.
   - Expand command, storage, patch, hotkey, known issue, glossary, and research-gap JSON files under `src/data/`.
   - Add source ids, confidence, verification status, conflicts, placement, and cautions.

3. Resolve high-priority findings where sources allow.
   - Document the loader-disable artifact as `PATCH_9.BIN` placed in the POPS folder based on krHACKen's PSX-Place page 4 post.
   - Mark the `PATCH_9.BIN` conflict because the seed/ElOtroLado-derived notes also associate `PATCH_9.BIN` with `$NOPAL`.
   - Confirm SMB config filenames as `IPCONFIG.DAT` and `SMBCONFIG.DAT`, and `poweroff.irx`, from the ElOtroLado first post.

4. Build the site.
   - Use a zero-dependency Node static generator instead of Astro/Starlight for this pack so `npm install` is trivial/offline and the build remains reproducible in a sealed workspace.
   - Generate static HTML/CSS/JS into `dist/`.
   - Include search, data filters, copy buttons, confidence/status badges, and source-backed pages.

5. Add research deliverables.
   - `research/SOURCE_AUDIT.md`
   - `research/CONFLICTS.md`
   - `research/MISSING.md`
   - `research/raw/web/*.md` source-note captures with short excerpts/summaries only.

6. Verify.
   - Run seed validation.
   - Run site data validation.
   - Run `npm install`.
   - Run `npm run build`.
   - Run generated-output checks.

## Known Limits

- Full PSX-Place thread scraping, package inspection, and Archive.org ZIP extraction remain partially unresolved in this pass.
- No proprietary packages are downloaded or stored.
- Hardware behavior is labelled by evidence level, especially for POPSLoader and OPL/fork workflows.
