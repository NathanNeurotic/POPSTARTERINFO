# POPStarter Master Knowledge Draft

## Definition

POPStarter is a launcher that allows PS1 games to be played on a PS2 in combination with Sony's PS2 POPS emulator, known as POPS or `SLBB-00001`.

Important legal boundary:
- POPStarter rev13 does not include the Sony emulator or Sony libraries.
- Documentation and site must not redistribute or link directly to Sony binaries such as `POPS.ELF`, `POPS.PAK`, `POPS_IOX.PAK`, or `IOPRP252.IMG`.
- It is acceptable to document where the user must place legally obtained files.

## Final known version

Final public beta:
- `r13 Beta 2019/06/05`
- Compiled with USB drivers dated 2019-01-14.
- One or more broken commands were fixed; sources mention `$IGR5` may have been fixed in this last beta.

## Feature set to document

- Internal HDD support
- USB support
- SMB support
- CDDA support
- Virtual Memory Cards / VMC
- In-Game Reset / IGR
- Hotkeys
- Cheat engine
- Special commands via `CHEATS.TXT`
- Automatic PAL/NTSC fixes
- 480p mode, with compatibility warning
- HDTV/component display workaround via `$HDTVFIX`
- Widescreen / ultra-widescreen / eyefinity hacks
- Multi-disc support via `DISCS.TXT`
- Shared VMC across discs via `VMCDIR.TXT`
- IRX loading
- BIOS/OSD handlers
- Debug mode
- uLE_kHn / wLE_kHn launcher
- POPSLoader modern launcher
- BDM Assault exFAT USB driver substitution
- Hugopocked game fixes

## Documentation principle

The rebuilt site must not just copy old docs. It should be:

1. Source-preserving
   - Store original excerpts and URLs.
   - Keep original-language snippets where useful.
   - Add English explanation.

2. Workflow-oriented
   - A user should choose:
     - storage backend
     - launcher frontend
     - whether they need BDM/exFAT
     - whether they need multi-disc/shared VMC
     - whether they need IGR/exit behavior
   - Then receive a precise layout.

3. Reference-grade
   - Separate command table.
   - Separate patch table.
   - Separate source inventory.
   - Separate troubleshooting matrix.

4. Confidence-tagged
   - High = multiple sources or primary author/source confirms.
   - Medium = one strong source or user-tested but not independently confirmed.
   - Low = scattered forum memory, dead-link reference, or single anecdotal report.

## High-priority research gaps

- Exact "disable ELF loader" patch/command/file name.
- Exact contents of `POPSTARTER_MC-Network.zip`.
- Exact contents of `POPSTARTER_MC-Network_BDM.7z`.
- Whether `poweroff.irc` in user notes is typo for `poweroff.irx`.
- Full `PATCH_X.BIN` mapping.
- Full `TROJAN_X.BIN` mapping.
- Full compatibility mode mapping.
- Full hotkey list.
- Full debug mode behavior and how to create reproducible reports.
- Old ASSEMblergames posts around page 118, page 123, and post IDs referenced from PSX-Place.
- Whether Retro-Jogos has mirrored individual pages under predictable slugs.
- Whether Archive.org item contains markdown/html for 2017 and 2020 snapshots.
