# POPStarter Source Inventory Seed

Generated: 2026-06-21 14:01 UTC

This is a seed inventory for Codex or another research agent. It is not complete; it captures the sources and findings gathered so far.

## Primary / high-value sources

### krHACKen PSX-Place POPStarter release thread
- Title observed: `PS2 - POPStarter 2019/06/05`
- Current URL: `https://www.psx-place.com/threads/popstarter.19139/`
- Importance:
  - Official release thread.
  - Defines POPStarter as a launcher for Sony's PS2 POPS emulator.
  - Warns not to redistribute Sony POPS binaries.
  - Links compatibility lists, IGR info, side projects, tools, translated threads.
  - As of the observed page, first post links: wLE_kHn, POPStarter Game Installer for OPL, POPSY-X, PSXVCD, BDMAssault, MMCEMAN for POPStarter, POPSLoader.
  - Observed attachments include:
    - `POPSTARTER_MC-Network.zip`
    - `POPStarter_20190605.7z`
    - `POPSTARTER_MC-Network_BDM.7z`
    - `wLE_kHn_20200810.7z`
    - `MX4SIO for POPStarter.7z`
    - `MMCEMAN for POPStarter.7z`
- Notes:
  - The first post appeared last edited Jan 12, 2026 during research.
  - The thread is at least 19 pages; Codex should scrape/capture all pages if allowed.

### ShaolinAssassin Bitbucket POPStarter documentation
- Original main URL:
  - `https://bitbucket.org/ShaolinAssassin/popstarter-documentation-stuff/wiki/Home`
- Important specific wiki pages from the old table of contents:
  - `hdd-mode`
  - `usb-mode`
  - `smb-mode`
  - `compatibility`
  - `automated-fixes`
  - `vmc`
  - `hotkeys`
  - `cheat-engine`
  - `special-cheats`
  - `igr`
  - `swap-disc`
  - `ps1-cd-mode`
  - `irx-loader`
  - `bios-osd-handlers`
  - `debug-mode`
  - `ule-khn`
  - `advanced-settings`
  - `timeline`
  - `changelog`
  - `apps-last-version`
  - `multi-disc`
- Status:
  - Often 404/dead from Bitbucket.
  - Must use Web Archive and mirrors.

### Archive.org backup of ShaolinAssassin wiki
- URL observed via PSX-Place:
  - `https://archive.org/details/backup-popstarter-documentation-stuff-wiki-from-2017-and-2020`
- Importance:
  - A PSX-Place user/developer reported uploading personal datahoard backups of the wiki.
- Task:
  - Download metadata/files from archive.org.
  - Extract all pages and preserve them under `research/raw/archive_org_shaolin_wiki/`.

### Retro-Jogos POPStarter guide mirror
- Main index:
  - `https://www.retro-jogos.com/PS2/pops/index.html`
- Home:
  - `https://www.retro-jogos.com/PS2/pops/home.html`
- Importance:
  - Preserves a Portuguese "Official POPStarter Guide" table of contents.
  - States documentation was originally by krHACKen and updated by ShaolinAssassin.
  - States content was updated with Rev13 Beta 05/06/2019.
  - Exposes the old wiki structure even where Bitbucket pages are dead.
- Task:
  - Crawl the `/PS2/pops/` directory if indexable.
  - If individual pages are not discoverable, use the table of contents slugs and Web Archive.

### ElOtroLado POPS/POPStarter thread by El_Patas
- URL:
  - mention-only source; no public outbound link
- Importance:
  - Long-running Spanish scene documentation.
  - Observed first post edited many times, last edit visible as 2026-06-07 during research.
  - Includes:
    - version list
    - final beta changelog
    - install tutorials
    - command list
    - CHEATS.TXT behavior
    - IGR command list
    - troubleshooting
- Task:
  - Scrape/capture the first post fully.
  - Translate into English with source line preservation.
  - Do not lose Spanish original.

### POPSLoader by El_isra
- URL:
  - `https://www.psx-place.com/resources/popsloader.1396/`
- Importance:
  - Modern standalone POPStarter launcher.
  - Based on Enceladus, scripted in Lua.
  - Initial release supports USB/internal HDD; SMB was planned at that time.
  - Contains `PATCH_5.BIN` for custom POPStarter IGR textures.
  - Project is marked officially abandoned by its author.
- Task:
  - Capture resource page, updates tab, discussion thread if available.

### POPSLoader fork by Ripto / NathanNeurotic
- URL:
  - `https://www.psx-place.com/resources/fork-popsloader-for-mmce-mx4sio-usb-and-apahdd.1665/`
- Importance:
  - Modern fork supporting MMCE, MX4SIO, USB, APAHDD.
  - Contains current setup notes:
    - mc0 required for settings and BDMA.
    - BDMA required for all devices except HDD.
    - Supported POPSTARTER.ELF paths include MC, USB, MX4SIO, MMCE, etc.
    - HDD VCDs use `hdd:/__.POPS/<Title>.VCD`; art under `hdd:/__common/POPS/ART/<Title>.png`.
  - Observed note that BETA-10 fixed HDD launch handoff and BOOT.ELF exit behavior.
- Task:
  - Treat as modern extension/fork documentation, not original POPStarter core docs.

### BDM Assault
- URL:
  - `https://github.com/israpps/BDMAssault`
- Importance:
  - Brings exFAT USB support to old closed-source homebrew that can load external USB drivers, including POPStarter.
  - POPStarter placement:
    - `bdm_assault.irx` -> `mc?:/POPSTARTER/usbd.irx`
    - `usbd_bd_assault.irx` -> `mc?:/POPSTARTER/usbhdfsd.irx`
- Task:
  - Capture README and releases.
  - Clarify that this is USB driver substitution, not native internal exFAT POPS support.

### Hugopocked POPStarter fixes
- URL:
  - `https://www.psx-place.com/threads/hugopocked-fixes-for-popstarter.39750/`
- Importance:
  - Game-specific fixes for POPStarter compatibility.
  - Thread states it is not for emulator installation support; it is for patch/fix installation.
  - Patch placement belongs in the per-game VMC/game folder matching the VCD basename.
- Task:
  - Capture current patch list, outdated patch pack links, newer single-game fixes, passwords, installation notes.
  - Mark external download links as volatile.

### Related sources to mine
- PS2-Home POPStarter IGR tutorials
- MetaGames French POPStarter thread:
  - `https://www.metagames-eu.com/forums/playstation-2/popstarter-revision-13-a-134569.html`
- CDRInfo Polish thread:
  - `https://forum.cdrinfo.pl/f106/ps2-popstarter-95894/`
- PS2Home Portuguese thread:
  - `https://ps2home.forumeiro.com/t27-popstarter-emulador-de-ps1-para-ps2`
- A9VG Chinese thread via Web Archive:
  - `https://web.archive.org/web/20250428034525/https://bbs.a9vg.com/thread-4240514-1-1.html`
- AssemblerGames backup:
  - search Web Archive for `assemblergames.com/threads/ps2-pops-stuff-popstarter.45347/`
- PS2-home thread for IGR:
  - Search `POPStarter In-Game-Reset Trojans and Patches`
- GitHub:
  - `https://github.com/israpps/BDMAssault`
  - `https://github.com/ps2homebrew/Open-PS2-Loader`
  - `https://github.com/NathanNeurotic/POPSLoader` if available/public
