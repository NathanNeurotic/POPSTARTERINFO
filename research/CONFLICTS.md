# POPStarter Conflicts and Decisions

Generated: 2026-06-21

## PATCH_9.BIN Meaning

### Claims

- PSX-Place page 4: krHACKen says attached `PATCH_9.BIN`, placed in the POPS folder, should disable the bugged ELF loader and let IGR exit normally.
- Seed/ElOtroLado-derived notes: `$NOPAL` is described as equivalent to `PATCH_9.BIN`.

### Decision

Document both claims as conflicting. The maintainer post is high-confidence for the loader-disable workaround. The `$NOPAL` equivalence stays visible but lower-confidence until archived wiki/package inspection explains whether there are different patch generations, contexts, or a mistaken seed mapping.

## `$NOIGR` vs Loader Disable

### Claims

- `$NOIGR` disables IGR menu behavior.
- Loader-disable prevents POPStarter from chaining into `BOOT.ELF` on exit.

### Decision

Keep them separate everywhere. Do not describe `$NOIGR` as a BOOT.ELF black-screen fix.

## SMB Filenames

### Claims

- User notes list `IPCONFIG.DAY`, `SMBCONFIG.DAY`, and `poweroff.irc`.
- ElOtroLado lists `IPCONFIG.DAT`, `SMBCONFIG.DAT`, and `poweroff.irx`.

### Decision

Publish `.DAT` and `poweroff.irx` as the documented paths. Keep the user-note spellings as likely typos and list package inspection as a remaining verification step.

## Internal exFAT

### Claims

- User workflows mention exFAT/APA-Jail hybrid behavior.
- Core POPStarter does not support internal exFAT for the POPS/VCD side.

### Decision

Document APA-Jail as a hybrid app-side launcher convenience only. Keep POPS files and VCDs on APA/PFS paths.

## Modern Fork Device Support

### Claims

- Modern POPSLoader fork supports USB, MX4SIO, MMCE, and APAHDD workflows.
- Original POPStarter documentation predates much of this.

### Decision

Preserve the modern workflows, but label them as POPSLoader/fork behavior. Do not rewrite original POPStarter core documentation around fork-only assumptions.
