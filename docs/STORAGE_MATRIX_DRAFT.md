# POPStarter Storage and Launcher Matrix Draft

This is a seed matrix. It merges user-tested layout notes with public-source findings. Verify filenames against actual packages before publishing.

## USB - OPL Apps page per-game renamed ELF

- Device: USB mass storage
- Filesystem: FAT32 32K/64K clusters or exFAT via BDM Assault
- Source: User uploaded notes; verify with OPL version behavior

### Files

```txt
mass:/POPS/<Game>.VCD
mass:/POPS/<Game>/
mass:/POPS/POPS_IOX.PAK
mass:/APPS/<AppFolder>/<Prefix>.<Game>.ELF
mass:/APPS/<AppFolder>/title.cfg
```

### title.cfg example

```ini
title=[PS1] Soul Blade
boot=XX.SLUS_002.40.Soul Blade.ELF
```

## USB - POPSLoader app

- Device: USB mass storage
- Filesystem: FAT32 or exFAT via BDM Assault
- Source: User uploaded notes; PSX-Place POPSLoader resource

### Files

```txt
mass:/POPS/POPS_IOX.PAK
mass:/POPS/POPSTARTER.ELF
mass:/POPS/<Game>.VCD
mass:/POPS/<Game>/
mass:/APPS/PS1_POPSLDR/POPSLOADER.ELF
mass:/APPS/PS1_POPSLDR/title.cfg
```

### title.cfg example

```ini
title=[PS1] !POPSLOADER
boot=POPSLOADER.ELF
```

## USB - wLE_kHn VCD launcher

- Device: USB mass storage
- Filesystem: FAT32 or exFAT via BDM Assault
- Source: User uploaded notes; ElOtroLado wLE_kHn section

### Files

```txt
mass:/POPS/POPS_IOX.PAK
mass:/POPS/POPSTARTER.ELF
mass:/POPS/<Game>.VCD
mass:/POPS/<Game>/
mass:/APPS/APP_wLE_kHn_20200810/wLE_kHn_20200810.ELF
mass:/APPS/APP_wLE_kHn_20200810/title.cfg
```

## APA HDD - OPL Apps page per-game renamed ELF

- Device: Internal APA HDD/SSD
- Filesystem: PFS/APA
- Source: User uploaded notes; ElOtroLado HDD install tutorial

### Files

```txt
hdd:/__.POPS/<Game>.VCD
hdd:/__common/POPS/IOPRP252.IMG
hdd:/__common/POPS/POPS.ELF
hdd:/__common/POPS/POPSTARTER.ELF
hdd:/+OPL/APPS/<Game>/<Game>.ELF
hdd:/+OPL/APPS/<Game>/title.cfg
```

## APA HDD - OPL DB / PS1 page

- Device: Internal APA HDD/SSD
- Filesystem: PFS/APA
- Source: User uploaded notes; verify against DB/Tenth Anniversary OPL fork

### Files

```txt
hdd:/__.POPS/<Game>.VCD
hdd:/__common/POPS/IOPRP252.IMG
hdd:/__common/POPS/POPS.ELF
hdd:/__common/POPS/POPSTARTER.ELF
hdd:/__common/POPS/POPS_IOX.PAK
```

## SMB - OPL Apps page per-game renamed ELF

- Device: SMB network share
- Filesystem: Host filesystem
- Source: User uploaded notes; PSX-Place SMB example

### Files

```txt
smb:/POPS/<Game>.VCD
smb:/POPS/POPS_IOX.PAK
smb:/POPS/POPSTARTER.ELF
smb:/APPS/<Game>/<Game>.ELF
smb:/APPS/<Game>/title.cfg
mc?:/POPSTARTER/IPCONFIG.DAT
mc?:/POPSTARTER/SMBCONFIG.DAT
mc?:/POPSTARTER/ps2dev9.irx
mc?:/POPSTARTER/ps2ip.irx
mc?:/POPSTARTER/ps2smap.irx
mc?:/POPSTARTER/smbman.irx
mc?:/POPSTARTER/SMSUTILS.irx
```

### Warnings

- User-uploaded notes used .DAY extensions, but PSX-Place examples show .DAT. Treat .DAY as probable typo until package is inspected.
- User-uploaded notes used poweroff.irc. Verify actual filename in MC-Network package before publishing.

## BDM Assault for POPStarter USB exFAT

- Device: Memory card driver override
- Filesystem: exFAT USB via BDM Assault
- Source: BDMAssault README

### Files

```txt
bdm_assault.irx -> mc?:/POPSTARTER/usbd.irx
usbd_bd_assault.irx -> mc?:/POPSTARTER/usbhdfsd.irx
```

