# Source Notes: PSX-Place IGR / Loader Disable

URLs:

- https://www.psx-place.com/threads/popstarter.19139/page-4
- https://www.psx-place.com/threads/popstarter.19139/page-15

Checked: 2026-06-21

## Captured Observations

- Page 4, post #64: krHACKen tells Peppe90 to try attached `PATCH_9.BIN` in the POPS folder.
- The stated purpose is to disable the bugged ELF loader and allow IGR to exit normally.
- Page 15, post #285: krHACKen recommends `$IGR5` in `CHEATS.TXT` for OPL-like IGR with no popup.
- The same page explains black-screen exit as likely incompatible `BOOT.ELF` and suggests disabling POPStarter's ELF loader or recompressing/replacing `BOOT.ELF`.
- BloodRaynare clarifies that users can still launch POPStarter from OPL; the risky part is IGR-ing back into the incompatible target.
- A user later reports that placing "that bin" in the POPS folder avoids the black-screen freeze but exits to the PS2 Browser instead of OPL.

## Site Decision

The site treats `PATCH_9.BIN` as the high-confidence loader-disable artifact, but keeps the `$NOPAL`/`PATCH_9.BIN` seed mapping as a conflict pending archive/package recovery.
