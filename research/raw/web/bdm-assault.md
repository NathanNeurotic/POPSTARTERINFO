# Source Notes: BDM Assault

URL: https://github.com/israpps/BDMAssault

Checked: 2026-06-21

## Captured Observations

- BDM Assault describes itself as bringing exFAT USB support to old closed-source PS2 homebrew that can load external USB drivers, including POPStarter.
- POPStarter placement:
  - `bdm_assault.irx` as `mc?:/POPSTARTER/usbd.irx`
  - `usbd_bd_assault.irx` as `mc?:/POPSTARTER/usbhdfsd.irx`
- FreeMcBoot placement is separate and uses `mc?:/SYS-CONF/USBD.IRX` and `mc?:/SYS-CONF/USBHDFSD.IRX`.

## Site Decision

Document BDM Assault as USB driver substitution. Do not describe it as native internal exFAT support for POPStarter core.
