# POPStarter Command Reference Draft

Generated from the research seed. Verify each command against primary/archived sources before publishing as final.

| Command | Category | Effect | Notes | Confidence |
|---|---|---|---|---|
| `$SAFEMODE` | Cheat engine | Delays activation of raw GameShark/Action Replay style cheat codes until after game startup. | Recommended when using raw cheat codes; not required for special POPStarter commands such as $SMOOTH or $NOPAL. | high |
| `$SMOOTH` | Video/texture | Enables texture smoothing by default. | Runtime hotkeys: Select+L1+R2 enables; Select+L2+R1 disables. Equivalent raw code observed: $S0003390 00000001. | high |
| `$NOPAL` | Region/video | Disables automatic PAL patch; used to force PAL games into NTSC/240p behavior. | Often requires $YPOS_## such as $YPOS_10 to recenter PAL games after NTSC conversion. | high |
| `$FAKELC` | LibCrypt | Loads a null LibCrypt value into COP0 register. | Mentioned for games with broken LibCrypt behavior, e.g. some Jackie Chan discs. | high |
| `$COMPATIBILITY_0x##` | Compatibility | Enables compatibility modes as an alternative to PATCH_X.BIN files. | Example: $COMPATIBILITY_0x01 activates Mode 1. | high |
| `$USBDELAY_#` | USB | Sets startup delay for USB device initialization. | Increase by 2–3 seconds for devices that work elsewhere but fail in POPStarter. | high |
| `$FORCEPAL` | Region/video | Forces PAL patch and BIOS region behavior for VCDs missing valid PAL license text in boot sector. | POPS runs in PAL mode and BIOS region code is patched to Europe. | high |
| `$XPOS_####` | Video geometry | Moves horizontal screen position. | Default observed: 640. Increase moves image left; decrease moves image right. | high |
| `$YPOS_##` | Video geometry | Moves vertical screen position. | Common PAL-to-NTSC centering example: $YPOS_10. | high |
| `$DWSTRETCH_####` | Video geometry | Horizontally stretches display. | Default observed: 2559. | high |
| `$DWCROP_####` | Video geometry | Reduces/expands display width area. | Max observed: 2560. Decrease to adjust image right. | high |
| `$HDTVFIX` | Video/output | Activates SetGsCrt hack for modern HDTV/component-display issues. | Uses 480i for NTSC or 576i for PAL; helps displays that do not handle 240p/288p. Avoid as a default on CRT/composite because it can cause interlace flicker/problems. | high |
| `$480p` | Video/output | Forces 480p video mode. | Low compatibility. Not compatible with $XPOS, $YPOS, $DWSTRETCH, or $DWCROP. | high |
| `$SCANLINES` | Video/filter | Enables scanline generator. | Needs testing/visual examples. | medium |
| `$CODECACHE_ADDON_0` | Recompiler/cache | Recompiler/code-cache related option for slowdowns or random hangs. | Do not use globally; can make many games fail. | high |
| `$CACHE1` | CD/cache | Sets POPS buffer to 1 sector instead of 16. | May help some videos that hang. | high |
| `$SUBCDSTATUS` | CD/status | Probably related to game hangs and CDROM timeouts; variant of compatibility Mode 5. | Needs primary old-wiki confirmation. | medium |
| `$MUTE_VAB` | Audio | Mutes VAB/VAG/VB+VH based music/SFX. | Can diagnose crashes caused by old game SFX/audio behavior. | high |
| `$WIDESCREEN` | Video/widescreen | Enables GTE widescreen hack; changes apparent aspect/FOV. | Does not fix HUDs, fonts, menus, 2D backgrounds, or render correction. Not compatible with every game. | high |
| `$ULTRA_WIDESCREEN` | Video/widescreen | Like $WIDESCREEN but with wider FOV. | Non-standard aspect. Same 2D/HUD caveats as $WIDESCREEN. | high |
| `$EYEFINITY` | Video/widescreen | Like $WIDESCREEN but with 3x16:9 style aspect. | Same 2D/HUD caveats as $WIDESCREEN. | high |
| `$MUTE_CDDA` | Audio/CDDA | Mutes/disables CDDA audio tracks. | Applied automatically for physical PS1 CDROM mode according to ElOtroLado. | high |
| `$UNDO_MUTE_CDDA` | Audio/CDDA | Re-enables CDDA audio. | Counteracts $MUTE_CDDA behavior. | high |
| `$NOVMC0` | VMC | Disables VMC0; uses only VMC1. | Confirm interaction with physical cards and per-game VMC naming. | high |
| `$NOVMC1` | VMC | Disables VMC1; uses only VMC0. | Confirm interaction with physical cards and per-game VMC naming. | high |
| `$UNDO_GAME_FIXES` | Compatibility/fixes | Disables built-in game fixes integrated in POPStarter. | May not fully restore original broken behavior for games whose issues were fixed by core POPS patches or later changes. | high |
| `$D2LS` | Controller/input | Forces left analog stick to digital D-pad behavior for games without analog support. | Leaves controller in digital behavior according to Spanish source. | high |
| `$D2LS_ALT` | Controller/input | Alternative to $D2LS for games where $D2LS does not work. | Leaves controller in analog behavior according to Spanish source. | high |
| `$IGR0` | IGR | L1+L2+R1+R2+X+Down opens IGR menu. | Opens menu. | high |
| `$IGR1` | IGR | Start+Select opens IGR menu. | Opens menu. | high |
| `$IGR2` | IGR | L1+L2+R1+R2+Start+Select opens IGR menu. | Opens menu. | high |
| `$IGR3` | IGR | L1+L2+R1+R2+X+Down closes POPS without IGR menu. | Direct close/no menu. | high |
| `$IGR4` | IGR | Start+Select closes POPS without IGR menu. | Direct close/no menu. | high |
| `$IGR5` | IGR | L1+L2+R1+R2+Start+Select closes POPS without IGR menu. | krHACKen described this as OPL-like IGR with no popup. Last beta likely fixed this command. | high |
| `$NOIGR` | IGR | Disables IGR menu. | Do not confuse with the separate 'disable ELF loader' workaround used to prevent POPStarter exit from chaining into BOOT.ELF. | high |
