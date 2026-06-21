# POPStarter Patches and Fixes Draft

## Patch taxonomy

POPStarter documentation appears to involve several kinds of external/injected files:

- `PATCH_X.BIN`
  - Compatibility modes and visual/IGR texture patches.
  - Example: `$NOPAL` is described as equivalent to `PATCH_9.BIN` in ElOtroLado docs.
  - POPSLoader package contains `PATCH_5.BIN` for custom IGR textures matching its UI.

- `TROJAN_X.BIN`
  - Late/additional fix bundles.
  - ElOtroLado mentions `TROJAN_7.BIN` created on 2020-04-02 with fixes from krHACKen and Hugopocked.
  - Placement described there: copy into the game folder where VMCs live.
  - Needs full changelog extraction.

- Hugopocked fixes
  - Game-specific patches.
  - Place in the per-game folder matching the VCD basename:
    - USB: `mass:/POPS/<VCD basename>/`
    - HDD: `hdd:/__common/POPS/<VCD basename>/`
    - SMB: `smb:/POPS/<VCD basename>/`
  - Verify exact file types per game.

- Loader-disable / IGR workaround patch
  - Referenced by krHACKen as "disable the ELF loader".
  - Exact artifact name not yet verified.
  - This is a priority research gap.

## Needed table

Codex should build a table with:

| File | Type | Placement | Effect | Conflicts | Source | Confidence |
|---|---|---|---|---|---|---|

## Known examples to verify

- `PATCH_5.BIN`
  - POPSLoader IGR textures.
- `PATCH_9.BIN`
  - Equivalent to `$NOPAL`.
- `TROJAN_7.BIN`
  - Cumulative fixes from krHACKen/Hugopocked.
- Hugopocked dated pack:
  - `Hugopocked_POPStarter_Fixes_(2023-08-11).rar`
  - Password observed: `hugopocked`
- Tekken 3 improved fix dated 2024-01-31.
