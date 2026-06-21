# Research Gaps and Verification Checklist

## Must verify by package inspection

- `POPSTARTER_MC-Network.zip`
  - Confirm exact filenames.
  - Confirm required MC paths.
  - Confirm `.DAT` vs `.DAY`.
  - Confirm `poweroff.irx` vs `poweroff.irc`.
  - Confirm whether filenames are case-sensitive.

- `POPSTARTER_MC-Network_BDM.7z`
  - Confirm BDM module names and exact placement.
  - Compare to BDM Assault README.

- `POPStarter_20190605.7z`
  - Preserve original folder tree.
  - Extract readmes, changelog, Misc Stuff, wLE_kHn, CUE2POPS, POPS2CUE if included.
  - Do not publish Sony binaries.

## Must verify by archive/source scraping

- ShaolinAssassin Bitbucket wiki pages:
  - `special-cheats`
  - `cheat-engine`
  - `igr`
  - `igr-textures`
  - `multi-disc`
  - `debug-mode`
  - `advanced-settings`
  - `irx-loader`
  - `bios-osd-handlers`
  - `apps-last-version`
  - `changelog`

- Archive.org item:
  - `backup-popstarter-documentation-stuff-wiki-from-2017-and-2020`
  - Download all files.
  - Diff 2017 vs 2020 pages.
  - Prefer newest page, but preserve deltas.

- PSX-Place POPStarter thread:
  - pages 1-19
  - extract posts by krHACKen, TnA, El_isra, BloodRaynare, jolek, Peppe90, hugopocked, Ripto
  - tag anecdotal reports separately from confirmed maintainer statements

- ElOtroLado first post:
  - capture fully
  - translate command descriptions
  - keep original Spanish for citations
  - check page edits and version list

## Verification status labels

- `verified-primary`
- `verified-cross-source`
- `verified-package-inspection`
- `verified-hardware-user`
- `unverified-single-source`
- `stale-or-dead-link`
- `conflicting`
- `do-not-publish-yet`
