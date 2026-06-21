# Assistant Research Notes

## Key observed facts from web research

- PSX-Place POPStarter first post defines POPStarter as a launcher for PS1 games in combination with Sony's PS2 POPS emulator.
- PSX-Place warns not to post direct links to POPS binaries such as `POPS.ELF`, `POPS.PAK`, `POPS_IOX.PAK`, and `IOPRP252.IMG`.
- The release thread links to compatibility lists, IGR info, wLE_kHn, POPStarter Game Installer, POPSY-X, PSXVCD, BDMAssault, MMCEMAN, POPSLoader, cheat-code resources, and regional threads.
- The release thread exposes attachments for core packages and network/BDM modules.
- Retro-Jogos mirror preserves the old table of contents and should be used to reconstruct the lost Bitbucket wiki.
- Retro-Jogos home page states final release is 2019/06/05 and mentions `$IGR5` likely fixed in the last build.
- ElOtroLado preserves a usable Spanish command list and installation guide.
- BDM Assault README confirms exact IRX rename paths for POPStarter:
  - `bdm_assault.irx` -> `mc?:/POPSTARTER/usbd.irx`
  - `usbd_bd_assault.irx` -> `mc?:/POPSTARTER/usbhdfsd.irx`
- PSX-Place POPSLoader page says the original El_isra POPSLoader is Lua/Enceladus based, supports USB/internal HDD, and includes `PATCH_5.BIN` for custom IGR textures.
- PSX-Place Hugopocked thread states it is for patch/fix installation info, not general POPStarter emulator installation support.
- PSX-Place page 15 contains critical IGR discussion:
  - `$IGR5` gives OPL-like IGR with no popup.
  - Black-screen exit can be due to incompatible `BOOT.ELF`.
  - Workaround is to disable POPStarter's ELF loader or use/recompress a compatible BOOT.ELF.
  - This is separate from `$NOIGR`.

## User-provided operational knowledge to preserve

- Device layouts for:
  - USB OPL Apps
  - USB OPL DB/Tenth PS1 page
  - USB wLE_kHn
  - USB POPSLoader
  - APA HDD OPL Apps
  - APA HDD OPL DB PS1 page
  - SMB OPL Apps
  - SMB OPL DB PS1 page
- BDMAssault / exFAT setup with `usbd.irx` and `usbhdfsd.irx`.
- Hugopocked fixes go in the per-game folder matching VCD basename.
- Multi-disc with `DISCS.TXT`.
- Shared VMC with `VMCDIR.TXT`.
- Internal exFAT is not supported by POPStarter core.
- APA-Jail hybrid can place app-side launcher pieces in exFAT but POPS files/VCDs still target APA paths.
- Recent hardware/user test: `hdd0:/__common/POPS/POPSTARTER.ELF` works as POPStarter path; no separate POPSTARTER folder on MC needed for that HDD-path launch scenario.
- Debug vs classic POPStarter observation:
  - old/classic `00` POPSTARTER.ELF: black waiting screen until PS logo/startup.
  - POPSLoader/debug `FF` POPSTARTER.ELF: full log details until PS logo/startup.
  - Both worked in that user test.
