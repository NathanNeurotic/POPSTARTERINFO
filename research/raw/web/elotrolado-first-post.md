# Source Notes: ElOtroLado First Post

URL: mention-only source; no public outbound link

Checked: 2026-06-21

## Captured Observations

- First post was visible as edited 379 times, last on 2026-06-07.
- It identifies r13 Beta 2019/06/05 as final.
- It lists final beta notes, including USB drivers dated 2019-01-14 and likely `$IGR5` fix.
- It documents HDD setup with `hdd0:/__.POPS/` for VCDs and `hdd0:/__common/POPS/` for common POPS files.
- It warns that `__.POPS` spelling and case matter.
- It documents SMB config filenames as `IPCONFIG.DAT` and `SMBCONFIG.DAT`.
- It shows `poweroff.irx` in the memory-card POPSTARTER network module file tree.
- It says SMB debug text cannot be disabled in SMB mode because it is forced to show connection/error status.
- It warns OPL network Auto mode can cause HDD POPStarter Apps launch black-screen hangs.
- SMB direct-launch route:
  - Share a PC/NAS folder named `POPSTARTER`.
  - Keep VCDs under `POPSTARTER/POPS/`.
  - Rename per-game launchers with the `SB.` prefix, for example `SB.Medievil.ELF`.
  - Copy the network module/config folder to `mc?:/POPSTARTER/`.
- SMB OPL Apps route:
  - Share a PC/NAS folder named `PS2SMB`.
  - Use `PS2SMB/POPS`, `PS2SMB/APPS`, and `PS2SMB/ART`.
  - Put `SB.`-prefixed renamed POPStarter ELFs in `APPS`.
  - `conf_apps.cfg` examples use `smb:/APPS/SB.<Game>.ELF`, with a note that newer OPL betas may require `smb0:`.
- `SMBCONFIG.DAT` examples:
  - `192.168.0.254 POPSTARTER`
  - `192.168.0.254:139 POPSTARTER`
  - optional username/password lines for authenticated shares.
- `IPCONFIG.DAT` example format is one line with PS2 IP, subnet mask, and gateway/router IP.
- SMB VMC files are created on the PC/NAS share, so the share must be writable.

## Site Decision

The site uses `.DAT` and `poweroff.irx` as confirmed filenames, while marking user-note `.DAY` and `.irc` strings as likely typos.
