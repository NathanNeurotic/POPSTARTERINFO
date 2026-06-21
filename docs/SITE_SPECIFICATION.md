# Site Build Specification for Codex

## Goal

Build the most complete public POPStarter documentation site available.

The site should act as:
- recovered documentation archive
- practical install guide
- command reference
- storage/launcher matrix
- troubleshooting guide
- source provenance database

## Recommended stack

Use Astro + Starlight unless there is a strong reason not to.

Why:
- static output works well on GitHub Pages
- Markdown/MDX-first
- built-in docs nav
- easy search via Pagefind
- easy data-driven tables via JSON
- low runtime complexity

## Site sections

1. Home
   - What POPStarter is
   - Legal/safety note
   - Quick links

2. Quick Start
   - Choose storage backend
   - Choose launcher
   - Required files checklist
   - Common beginner mistakes

3. Storage Matrix
   - USB FAT32
   - USB exFAT via BDM Assault
   - APA HDD
   - APA-Jail hybrid
   - SMB
   - POPSLoader devices: USB, HDD, MX4SIO, MMCE

4. Launcher Matrix
   - Renamed POPSTARTER.ELF
   - wLE_kHn
   - OPL Apps page
   - OPL DB / PS1 page
   - POPSLoader
   - HDDOSD/KELF

5. Command Reference
   - Filterable table from `data/popstarter_commands.seed.json`
   - Group by category
   - Include confidence/source tags

6. IGR and Exit
   - `$IGR0`-`$IGR5`
   - `$NOIGR`
   - disable ELF loader
   - BOOT.ELF compatibility
   - wLE/OPL return behavior

7. Patches and Fixes
   - PATCH_X.BIN
   - TROJAN_X.BIN
   - Hugopocked fixes
   - placement rules

8. Multi-disc and VMC
   - `DISCS.TXT`
   - `VMCDIR.TXT`
   - shared VMC examples
   - per-device layouts

9. Troubleshooting
   - black screen
   - no PS logo
   - returns to Browser
   - VCD not found
   - CHEATS ignored
   - broken video on HDTV/component
   - USB not detected
   - SMB auth failure
   - OPL Auto conflict
   - HDD partition ordering and size

10. Source Archive
   - all primary sources
   - dead links
   - archive links
   - mirror status
   - source confidence notes

11. Research Log
   - what was recovered
   - what is missing
   - competing claims/conflicts

## Data files

Create or refine:

```txt
src/data/sources.json
src/data/commands.json
src/data/storageLayouts.json
src/data/patches.json
src/data/knownIssues.json
src/data/glossary.json
```

## Required UI features

- Search
- Table filters
  - command category
  - storage backend
  - launcher
  - confidence
  - source
- Copy buttons for file trees/config snippets
- "Verified" / "Needs verification" badges
- Clear warning boxes for:
  - Sony binaries not included
  - internal exFAT unsupported by POPStarter core
  - `$HDTVFIX` not universal
  - `$480p` low compatibility
  - SMBv1 security caveat
  - typo-prone filenames

## Deployment

- Build static site.
- Configure for GitHub Pages.
- Use relative/base path support if repository is not root.
- Include `npm run build`.
- Include `npm run lint` if practical.
- Include `npm run check-links` if practical.
