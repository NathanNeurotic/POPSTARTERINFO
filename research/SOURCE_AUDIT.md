# POPStarter Source Audit

Generated: 2026-06-21

## Summary

This audit tracks which sources were used, what each source is reliable for, and where claims remain unresolved. No Sony POPS binaries, BIOS files, or proprietary packages were downloaded or stored.

## High-Reliability Sources

### PSX-Place POPStarter Release Thread

- URL: https://www.psx-place.com/threads/popstarter.19139/
- Status: live, checked 2026-06-21
- Reliability: high for official POPStarter release-thread statements by krHACKen.
- Used for:
  - POPStarter definition and legal boundary.
  - Final package attachment names.
  - Side-project links and regional-documentation links.
  - IGR texture/source pointers.
- Notes:
  - The first post was visible as last edited Jan 12, 2026.
  - The thread has 19 pages.

### PSX-Place POPStarter Page 4

- URL: https://www.psx-place.com/threads/popstarter.19139/page-4
- Status: live, checked 2026-06-21
- Reliability: high for the loader-disable artifact.
- Used for:
  - krHACKen's statement that attached `PATCH_9.BIN` placed in the POPS folder should disable the bugged ELF loader.
  - Confirmation that the patch was related to POPStarter IGR/BOOT.ELF black-screen exit.

### PSX-Place POPStarter Page 15

- URL: https://www.psx-place.com/threads/popstarter.19139/page-15
- Status: live, checked 2026-06-21
- Reliability: high for modern support discussion by krHACKen and BloodRaynare.
- Used for:
  - `$IGR5` as OPL-like no-popup IGR.
  - BOOT.ELF incompatibility explanation.
  - Difference between using OPL to launch POPStarter and IGR-ing back into OPL.
  - Accidental `$HDTVFIX` troubleshooting.
  - OPL Apps/HDD Auto-mode hang report and OPL-bug classification.

### ElOtroLado First Post

- URL: mention-only source; no public outbound link
- Status: live, checked 2026-06-21
- Reliability: high for Spanish long-form operational guide, but still secondary to package inspection for exact bundled file trees.
- Used for:
  - Version list and final beta notes.
  - HDD, USB, SMB setup layouts.
  - `IPCONFIG.DAT`, `SMBCONFIG.DAT`, `poweroff.irx`.
  - SMB config line examples and guest/auth behavior.
  - OPL network Auto warning for HDD Apps launch.
  - VCD conversion and uppercase extension warning.

### BDM Assault GitHub README

- URL: https://github.com/israpps/BDMAssault
- Status: live, checked 2026-06-21
- Reliability: high for BDM Assault behavior and IRX placement.
- Used for:
  - `bdm_assault.irx -> mc?:/POPSTARTER/usbd.irx`
  - `usbd_bd_assault.irx -> mc?:/POPSTARTER/usbhdfsd.irx`
  - Clarifying that exFAT USB support is driver substitution, not native POPStarter internal exFAT support.

## Medium-Reliability Sources

### Retro-Jogos POPStarter Mirror

- URLs:
  - https://www.retro-jogos.com/PS2/pops/index.html
  - https://www.retro-jogos.com/PS2/pops/home.html
- Status: live, checked 2026-06-21
- Reliability: medium.
- Used for:
  - Old wiki table of contents.
  - Rev13 Beta 2019-06-05 mirror note.
  - Feature list and `$IGR5` likely-fixed note.
- Caveat:
  - It is a mirror/translation and should not override direct maintainer/package evidence.

### POPSLoader by El_isra

- URL: https://www.psx-place.com/resources/popsloader.1396/
- Status: live, checked 2026-06-21
- Reliability: high for POPSLoader, not for original POPStarter core.
- Used for:
  - Lua/Enceladus basis.
  - Initial USB/internal HDD support.
  - POPSLDR folder placement next to POPSLoader ELF.
  - `PATCH_5.BIN` custom IGR textures.
  - Project abandoned status.

### Ripto/NathanNeurotic POPSLoader Fork

- URL: https://www.psx-place.com/resources/fork-popsloader-for-mmce-mx4sio-usb-and-apahdd.1665/
- Status: live, checked 2026-06-21
- Reliability: high for that fork, not for original POPStarter core.
- Used for:
  - mc0 requirement for settings and BDMA.
  - BDMA required for non-HDD devices.
  - Supported POPSTARTER.ELF paths.
  - HDD and art paths.
  - BETA-10 HDD launch and BOOT.ELF exit fixes.

### Hugopocked Fixes Thread

- URL: https://www.psx-place.com/threads/hugopocked-fixes-for-popstarter.39750/
- Status: live, checked 2026-06-21
- Reliability: medium-high for patch/fix discussion.
- Used for:
  - Fix thread scope.
  - SPU/GTE/GPU fix categories.
  - Need to avoid treating external downloads as stable/permanent.

## Local Evidence

### User Uploaded Notes

- Path: `source_notes/user_uploaded_notes_raw.md`
- Reliability: medium.
- Used for:
  - Modern OPL/POPSLoader/wLE_kHn/BDM workflows and examples.
  - User-tested path patterns.
  - Multi-disc and shared VMC examples.
- Caveat:
  - `.DAY` and `poweroff.irc` appear to be typos when compared to ElOtroLado.

### Discord Screenshot

- Path: `media/discord_popstarter_test_screenshot.png`
- Reliability: medium.
- Used for:
  - User-tested `hdd0:/__common/POPS/POPSTARTER.ELF` POPStarter path.
  - Debug/classic POPSTARTER behavior observation.
- Caveat:
  - Treat as a test report, not a general rule until independently verified.

## Sources Still Needed

- Archive.org 2017/2020 ShaolinAssassin wiki backup.
- Package file-tree inspection for legal POPStarter-side packages.
- Full PSX-Place thread scrape across all 19 pages.
- Archived ASSEMblergames posts.
- Regional thread extraction for MetaGames, CDRInfo, PS2Home, and A9VG.
