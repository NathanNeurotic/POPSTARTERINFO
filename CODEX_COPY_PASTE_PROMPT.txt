You are Codex working in a repository that contains a seed pack for rebuilding the best available POPStarter documentation site.

Your job:
1. Read every file in this repository/zip before changing anything.
2. Research POPStarter much more deeply than the seed pack.
3. Recover and preserve dead/scattered documentation.
4. Build a complete static documentation site.
5. Do not hallucinate. Every factual claim must be source-backed or marked unverified.

Context:
POPStarter is a PS2 homebrew launcher for Sony's PS2 POPS PS1 emulator. The old ShaolinAssassin Bitbucket documentation is partly dead, and the information is scattered across PSX-Place, ElOtroLado, Retro-Jogos, Archive.org, ASSEMblergames archives, PS2-Home, MetaGames, CDRInfo, regional mirrors, GitHub side projects, and user-tested workflows.

Hard legal/safety rule:
Do NOT include, download into the repo, redistribute, or directly link to copyrighted Sony binaries such as:
- POPS.ELF
- POPS.PAK
- POPS_IOX.PAK
- IOPRP252.IMG
- PS1 BIOS files
It is allowed to document that users must supply legally obtained copies and where to place them.

Start with these seed files:
- docs/SOURCE_INVENTORY.md
- docs/MASTER_KNOWLEDGE_DRAFT.md
- docs/COMMAND_REFERENCE_DRAFT.md
- docs/STORAGE_MATRIX_DRAFT.md
- docs/IGR_EXIT_REFERENCE.md
- docs/PATCHES_AND_FIXES_DRAFT.md
- docs/RESEARCH_GAPS_AND_VERIFICATION.md
- docs/SITE_SPECIFICATION.md
- data/known_sources.yaml
- data/popstarter_commands.seed.json
- data/storage_matrix.seed.json
- source_notes/user_uploaded_notes_raw.md
- source_notes/assistant_research_notes.md
- media/discord_popstarter_test_screenshot.png

Primary research targets:
1. PSX-Place POPStarter thread
   - https://www.psx-place.com/threads/popstarter.19139/
   - Scrape or manually inspect all pages.
   - Prioritize posts by krHACKen, TnA, El_isra, BloodRaynare, jolek, Peppe90, hugopocked, Ripto.
   - Capture package attachment names and thread updates.
   - Do not download proprietary binaries into the repo.

2. ShaolinAssassin Bitbucket wiki
   - https://bitbucket.org/ShaolinAssassin/popstarter-documentation-stuff/wiki/Home
   - It may be dead/404.
   - Use Web Archive and mirrors.
   - Important pages: hdd-mode, usb-mode, smb-mode, compatibility, automated-fixes, vmc, hotkeys, cheat-engine, special-cheats, igr, igr-textures, swap-disc, ps1-cd-mode, irx-loader, bios-osd-handlers, debug-mode, ule-khn, advanced-settings, timeline, changelog, apps-last-version, multi-disc.

3. Archive.org backup
   - https://archive.org/details/backup-popstarter-documentation-stuff-wiki-from-2017-and-2020
   - Download/extract text/HTML/markdown if available.
   - Preserve raw files under research/raw/archive_org_shaolin_wiki/.
   - Diff 2017 vs 2020 docs if both exist.
   - Use newest version for the main manual, but document important deltas.

4. Retro-Jogos mirror
   - https://www.retro-jogos.com/PS2/pops/index.html
   - https://www.retro-jogos.com/PS2/pops/home.html
   - Crawl /PS2/pops/ if possible.
   - This mirror preserves the table of contents and may preserve translated pages.

5. ElOtroLado / El_Patas thread
   - mention-only source; no public outbound link
   - Fully capture the first post.
   - Preserve Spanish original snippets and translate into English.
   - Extract version list, install layouts, CHEATS.TXT syntax, commands, IGR list, troubleshooting.

6. Modern side projects
   - BDM Assault: https://github.com/israpps/BDMAssault
   - POPSLoader by El_isra: https://www.psx-place.com/resources/popsloader.1396/
   - POPSLoader fork for MMCE/MX4SIO/USB/APAHDD: https://www.psx-place.com/resources/fork-popsloader-for-mmce-mx4sio-usb-and-apahdd.1665/
   - Hugopocked fixes: https://www.psx-place.com/threads/hugopocked-fixes-for-popstarter.39750/

Build the site:
- Use Astro + Starlight unless a better static-docs stack is clearly justified.
- It must build as a static site suitable for GitHub Pages.
- Include local search if practical, preferably Pagefind.
- Data-driven pages should use JSON/YAML data under src/data.

Required site sections:
1. Home
2. Quick Start
3. Storage Matrix
4. Launcher Matrix
5. Command Reference
6. IGR and Exit Behavior
7. Patches and Fixes
8. Multi-disc and VMC
9. Video / Display
10. SMB / Network
11. Debugging
12. Troubleshooting
13. Source Archive
14. Research Log
15. Glossary

Required structured data:
Create or refine these:
- src/data/sources.json
- src/data/commands.json
- src/data/storageLayouts.json
- src/data/patches.json
- src/data/knownIssues.json
- src/data/glossary.json
- src/data/hotkeys.json
- src/data/researchGaps.json

Each command entry must include:
- command
- category
- scope
- placement
- effect
- notes
- conflicts
- source ids
- confidence
- verification status

Each storage layout must include:
- storage backend
- launcher frontend
- filesystem
- required files
- optional files
- exact paths
- sample config
- warnings
- source ids
- confidence
- verification status

Every documentation page must:
- include citations/source links
- label unverified claims
- avoid pretending dead-link info is confirmed
- separate original POPStarter core from modern side-project/fork behavior

Special priority: solve and document these:
1. Exact "disable ELF loader" artifact
   - Is it a PATCH_#.BIN, TROJAN_#.BIN, command, or another file?
   - Exact filename?
   - Placement?
   - Effects?
   - Source evidence?
   - Difference from $NOIGR?

2. Full PATCH_X.BIN map
   - Mode/function
   - Placement
   - Equivalent CHEATS.TXT command if any
   - Conflicts

3. Full TROJAN_X.BIN map
   - Game/fix content
   - Changelog
   - Placement

4. Full CHEATS.TXT command table
   - Include all commands from ElOtroLado, Shaolin wiki, PSX-Place posts, and package docs.
   - Include $HDTVFIX, $480p, $IGR0-$IGR5, $NOIGR, $SAFEMODE, $SMOOTH, $NOPAL, $FAKELC, $COMPATIBILITY_0x##, $USBDELAY_#, $FORCEPAL, $XPOS, $YPOS, $DWSTRETCH, $DWCROP, $SCANLINES, $CODECACHE_ADDON_0, $CACHE1, $SUBCDSTATUS, $MUTE_VAB, $WIDESCREEN, $ULTRA_WIDESCREEN, $EYEFINITY, $MUTE_CDDA, $UNDO_MUTE_CDDA, $NOVMC0, $NOVMC1, $UNDO_GAME_FIXES, $D2LS, $D2LS_ALT.
   - Add any missing ones found in archived docs.

5. Validate filename typos
   - Confirm SMB config filenames are SMBCONFIG.DAT and IPCONFIG.DAT, not .DAY.
   - Confirm whether poweroff file is poweroff.irx, not poweroff.irc.
   - Confirm case sensitivity rules.

6. Preserve user-tested modern workflows
   - The seed includes user notes with working USB/HDD/SMB/POPSLoader/wLE_kHn layouts.
   - Treat these as user-tested operational notes, then cross-check against public sources.
   - Do not delete them just because old docs do not mention modern OPL forks.

Deliverables:
- A working static docs site.
- A research/raw/ folder with non-proprietary captured source excerpts or archived markdown/html.
- A research/SOURCE_AUDIT.md explaining each source, status, and reliability.
- A research/CONFLICTS.md listing conflicting claims and final decisions.
- A research/MISSING.md listing still-unrecovered items.
- Updated data JSON files.
- README.md with setup/build/deploy instructions.
- Ensure `npm install`, `npm run build`, and any checks work.

Quality bar:
We are competing with another AI research/build attempt. The output should be more complete, better sourced, more cautious, and more useful. It should not just be a pretty website. It must be a durable preservation-grade documentation project.

Begin by creating a short implementation plan in `research/IMPLEMENTATION_PLAN.md`, then execute it.
