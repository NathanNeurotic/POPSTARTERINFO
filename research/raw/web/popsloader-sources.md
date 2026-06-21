# Source Notes: POPSLoader and POPSLoader Fork

URLs:

- https://www.psx-place.com/resources/popsloader.1396/
- https://www.psx-place.com/resources/fork-popsloader-for-mmce-mx4sio-usb-and-apahdd.1665/

Checked: 2026-06-21

## Captured Observations

### El_isra POPSLoader

- Resource title: `POPSLoader v1.0.0 - rev5`.
- Described as a standalone POPStarter launcher based on Enceladus and scripted in Lua.
- Initial release supports USB and internal HDD.
- The POPSLDR folder must stay next to the POPSLoader ELF.
- Package includes `PATCH_5.BIN` for custom POPStarter IGR textures matching the stock POPSLoader UI.
- The project is marked officially abandoned by its author.

### Ripto/NathanNeurotic Fork

- Resource title: `[FORK] POPSLoader for MMCE, MX4SIO, USB, and APAHDD BETA-10`.
- mc0 is required for settings and BDMA.
- BDMA is required for all non-HDD devices and only one BDMA mode can be active at a time.
- POPSTARTER.ELF can be placed at paths such as `mc0:/POPSTARTER/POPSTARTER.ELF`, `mass:/POPS/POPSTARTER.ELF`, `mx4sio:/POPS/POPSTARTER.ELF`, or `mmce:/POPS/POPSTARTER.ELF`.
- HDD VCDs use `hdd:/__.POPS/<Title>.VCD`.
- HDD art uses `hdd:/__common/POPS/ART/<Title>.png`.
- BETA-10 reports fixed HDD launch and restored BOOT.ELF exit after real hardware testing.

## Site Decision

These pages are authoritative for POPSLoader behavior, but not for original POPStarter core behavior.
