# POPStarter IGR and Exit Behavior Draft

## Core distinction

Do not merge these into one concept:

1. `$NOIGR`
   - Disables POPStarter's IGR menu behavior.
   - It does not necessarily disable POPStarter's ELF exit loader.

2. `$IGR0` through `$IGR5`
   - Select alternate IGR button combos and menu/no-menu behavior.
   - `$IGR5` is the OPL-like combo: `L1+L2+R1+R2+Start+Select`, closes POPS without the IGR menu.

3. Disable ELF loader / loader-disable patch
   - Prevents POPStarter from chaining into `BOOT.ELF` on exit.
   - This is the workaround krHACKen referenced for black-screen-on-exit when POPStarter tries to launch an incompatible `BOOT.ELF`.
   - Needs exact file/patch identification from the archived ShaolinAssassin `igr` or `igr-textures` pages and from PSX-Place page 15 link target.

## Observed krHACKen advice

On PSX-Place page 15, krHACKen replied to an HDD/OPL Apps user whose POPStarter IGR showed a popup and then black-screened after choosing YES:

- Put `$IGR5` in `CHEATS.TXT` for OPL-like IGR with no popup.
- For black-screen exit, the user's `BOOT.ELF` is probably incompatible with POPStarter.
- Workaround: disable POPStarter's ELF loader so it does not exit to `BOOT.ELF`, or recompress/replace `BOOT.ELF`.

Another user clarified:
- You can still use OPL to launch POPStarter.
- Do not IGR back into that incompatible target.
- Replace `BOOT.ELF` with something like LaunchELF if needed.

## Commands

```txt
$IGR0 = L1+L2+R1+R2+X+Down opens IGR menu
$IGR1 = Start+Select opens IGR menu
$IGR2 = L1+L2+R1+R2+Start+Select opens IGR menu
$IGR3 = L1+L2+R1+R2+X+Down closes POPS without IGR menu
$IGR4 = Start+Select closes POPS without IGR menu
$IGR5 = L1+L2+R1+R2+Start+Select closes POPS without IGR menu
$NOIGR = disables IGR menu
```

## Needed research

- Find the exact "disable ELF loader" artifact name.
- Determine whether it is a `PATCH_#.BIN`, `TROJAN_#.BIN`, or another file.
- Determine placement:
  - global `POPS/`
  - per-game VMC folder
  - MC `POPSTARTER/`
- Determine side effects:
  - exits to PS2 Browser?
  - poweroff?
  - returns to OSD?
  - affects all devices?
- Determine whether it conflicts with POPSLoader's custom IGR textures / `PATCH_5.BIN`.
