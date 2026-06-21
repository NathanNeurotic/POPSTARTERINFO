# Missing and Unrecovered Items

Generated: 2026-06-21

## Highest Priority

1. Extract Archive.org backup `backup-popstarter-documentation-stuff-wiki-from-2017-and-2020`.
2. Inspect legal POPStarter-side package file trees:
   - `POPSTARTER_MC-Network.zip`
   - `POPStarter_20190605.7z`
   - `POPSTARTER_MC-Network_BDM.7z`
3. Recover the full `PATCH_X.BIN` map and resolve the `PATCH_9.BIN` conflict.
4. Recover the full `TROJAN_X.BIN` map.
5. Recover compatibility mode meanings for `$COMPATIBILITY_0x##`.

## Still Needed

- Full hotkey list from the archived `hotkeys` page.
- `debug-mode` page and reproducible support-report template.
- `irx-loader` and `bios-osd-handlers` pages.
- `advanced-settings`, `apps-last-version`, and `changelog` pages.
- Full PSX-Place thread scrape across pages 1-19.
- Regional mirrors/threads:
  - MetaGames French thread.
  - CDRInfo Polish thread.
  - PS2Home Portuguese thread.
  - A9VG Chinese archive.
  - ASSEMblergames archive.
- Package-level confirmation of:
  - case sensitivity by backend.
  - exact BDM network package filenames.
  - all included readmes/changelogs.

## Hardware Verification Needed

- POPSLoader fork paths across USB, MX4SIO, MMCE, and APAHDD.
- OPL Apps launch behavior across official 1.1.0, 1.2.0 betas, Grimdoomer, and Daily/Tenth forks.
- `$HDTVFIX`, `$480p`, geometry commands, and scanlines across CRT/component/HDTV displays.
- Loader-disable `PATCH_9.BIN` behavior across USB, HDD, SMB, wLE_kHn, OPL Apps, and POPSLoader.
