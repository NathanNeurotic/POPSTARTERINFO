More information I have - some of the links are likely dead though:
# **Official POPStarter Pages :** (download link omitted)
** * [ShaolinAssassin](https://bitbucket.org/ShaolinAssassin/popstarter-documentation-stuff/wiki/Home)'s Official Guide.** **  * [krHACKen](https://www.psx-place.com/threads/popstarter.19139/)'s release thread. **
**Official POPSLoader Page :** (download link omitted)
* https://www.psx-place.com/resources/popsloader.1396/
**BDM Assault (Adding exFAT compatibility to POPStarter) :** (download link omitted)
* https://github.com/israpps/BDMAssault
**Latest wLE_kHn (20200810) :** (download link omitted)
**HugoPocked POPStarter Fixes :**
* https://www.psx-place.com/threads/hugopocked-fixes-for-popstarter.39750/

# USB Mass Storage File Structures Confirmed Working For POPS Setups on all forks and versions of OPL.#
*(Open PS2 Loader Daily Build Tenth Anniversary Edition, Grimdoomer, official 1.1.0, and official 1.2.0 betas)*
 *(`fat32 w/32kb clusters` or `exfat w/32kb clusters & BDMAssault`)*

**OPL ALL VERSIONS APPS PAGE Setup of "Soul Blade" for Example:**
`mass:/POPS/SLUS_002.40.Soul Blade.VCD` - *Converted from bin/cue PS1 backup*
`mass:/POPS/SLUS_002.40.Soul Blade/` **<-** *Hugopocked Fixes placed here if Available (Per Game VMC Folder).*
`mass:/POPS/POPS_IOX.PAK`
`mass:/APPS/PS1_Soul Blade/XX.SLUS_002.40.Soul Blade.ELF` - *Renamed `POPSTARTER.ELF` file*
`mass:/APPS/PS1_Soul Blade/title.cfg` - *Created with Notepad and saved as* **title.cfg** **__not__ ~~.txt~~**
`title.cfg` reads: ```title=[PS1] Soul Blade
boot=XX.SLUS_002.40.Soul Blade.ELF```
**OPL DailyBuild Tenth Anniversary Edition PS1 PAGE Setup of "Soul Blade" for Example:**
`mass:/POPS/POPSTARTER.ELF`
`mass:/POPS/SLUS_002.40.Soul Blade.VCD` - *Converted from bin/cue PS1 backup*
`mass:/POPS/SLUS_002.40.Soul Blade/` - *Hugopocked Fixes & VMC folder per game*
`mass:/POPS/POPS_IOX.PAK`

**Hugopocked POPSTARTER Fixes Setup:**
`mass:/POPS/VCD File Name/` *Hugopocked Fixes & VMC folder per game, change "VCD File Name" to the corresponding VCD file name.*
*For example, if `123.VCD` then `mass:/POPS/123/`*

**BDM Assault/exFAT Compatibility Enabler for USB Mass Storage Devices Setup:**
*(case sensitive files reminder)*
*These are <@757101115384004698>'s *BDMA Modules *and are renamed* `usbd_bd_assault.irx` *and* `bdm_assault.irx` *files.*
`mc?:/POPSTARTER/usbd.irx`
`mc?:/POPSTARTER/usbhdfsd.irx`
`mc?:/SYS-CONF/USBD.IRX`
`mc?:/SYS-CONF/USBHDFSD.IRX`

**wLE_kHn VCD POPStarter Launcher Capable USB Setup with Soul Blade for Example:**
*(It is recommended to not have the game ID in the .VCD filename, for a better listing of your games when using wLE_kHn.)*
`mass:/POPS/POPS_IOX.PAK`
`mass:/POPS/Soul Blade.VCD` - *Converted from bin/cue PS1 Backup*
`mass:/POPS/Soul Blade/` *Hugopocked Fixes & VMC folder per game*
`mass:/POPS/POPSTARTER.ELF`
`mass:/APPS/APP_wLE_kHn_20200810/wLE_kHn_20200810.ELF`
`mass:/APPS/APP_wLE_kHn_20200810/title.cfg` - *Created with Notepad and saved as* **title.cfg** **__not__ ~~.txt~~**
`title.cfg` is created with notepad and reads: ```title=wLE_kHn_20200810 VCD Launcher
boot=wLE_kHn_20200810.ELF``` 
**POPSLoader APP USB Setup:**
*It is recommended to not have the game ID in the .VCD filename, for a better listing of your games when using POPSLoader.*
`mass:/POPS/POPS_IOX.PAK`
`mass:/POPS/POPSTARTER.ELF`
`mass:/POPS/Soul Blade.VCD`
`mass:/POPS/Soul Blade/` *Hugopocked Fixes & VMC folder per game*
`mass:/APPS/PS1_POPSLDR/POPSLOADER.ELF`
`mass:/APPS/PS1_POPSLDR/` **<-** *POPSLoader Files*
`mass:/APPS/PS1_POPSLDR/title.cfg` - *Created with Notepad and saved as* **title.cfg** **__not__ ~~.txt~~**
`title.cfg` reads: ```title=[PS1] !POPSLOADER
boot=POPSLOADER.ELF```

# APA HDD MULTi-DISC AND UNIFIED VIRTUAL MEMORY CARD SETUP EXAMPLE 

`hdd0:/__.POPS/Final Fantasy VII D1.VCD`
`hdd0:/__.POPS/Final Fantasy VII D2.VCD`
`hdd0:/__.POPS/Final Fantasy VII D3.VCD`

__**DISCS.TXT**__ *contains:*
```Final Fantasy VII D1.VCD
Final Fantasy VII D2.VCD
Final Fantasy VII D3.VCD``` **Placed in:** 
``hdd0:/__common/POPS/Final Fantasy VII D1/``
and 
``hdd0:/__common/POPS/Final Fantasy VII D2/``
and 
``hdd0:/__common/POPS/Final Fantasy VII D3/``

---------------------------------------------------------------

__**VMCDIR.TXT**__ *contains:*
```Final Fantasy VII D1.VCD``` **Placed in: **
``hdd0:/__common/POPS/Final Fantasy VII D2/``
and
``hdd0:/__common/POPS/Final Fantasy VII D3/``


Source and additional information:
* https://bitbucket.org/ShaolinAssassin/popstarter-documentation-stuff/wiki/multi-disc

# SATA/IDE HDD/SSD Internal Storage File Structures 

**PFS-APA Internal File System for OPL ALL VERSIONS *APPS PAGE* Setup of "Soul Blade" for Example:**
* `hdd:/__.POPS/SLUS_002.40.Soul Blade.VCD` - *Converted from bin/cue PS1 backup*
* `hdd:/__common/POPS/IOPRP252.IMG`
* `hdd:/__common/POPS/POPS.ELF`
* `hdd:/__common/POPS/POPSTARTER.ELF`
* `hdd:/+OPL/APPS/Soul Blade/SLUS_002.40.Soul Blade.ELF` - *Renamed POPSTARTER.ELF file*
* `hdd:/+OPL/APPS/Soul Blade/title.cfg` - *Created with Notepad and saved as* **title.cfg** **__not__ ~~.txt~~**
* `title.cfg` is created with notepad and reads:
```title=[PS1]Soul Blade
boot=SLUS_002.40.Soul Blade.ELF```

**EXFAT & APA-Jail Internal File System for OPL APPS PAGE Setup of "Soul Blade" for Example:**
* `POPS does not support Internal EXFAT Storage`
* If you have `APA-JAIL` you can do the following:
* `exfat:hdd:APPS/Soul Blade/SLUS_002.4.0.Soul Blade.ELF`
* `exfat:hdd:APPS/Soul Blade/title.cfg` and reads:
```title=Soul Blade
boot=SLUS_002.4.0.Soul Blade.ELF```
 * `apa:hdd:/__.POPS/SLUS_002.4.0.Soul Blade.VCD`
* `apa:hdd:/__common/POPS/IOPRP252.IMG`
* `apa:hdd:/__common/POPS/POPS.ELF`
* `apa:hdd:/__common/POPS/POPSTARTER.ELF`
* `apa:hdd:/__common/POPS/POPS_IOX.PAK`

**OPL DB *PS1 PAGE* Setup of "Soul Blade" for Example:**
* `hdd:/__.POPS/SLUS_002.40.Soul Blade.VCD` - *Converted from bin/cue PS1 backup*
* `hdd:/__common/POPS/IOPRP252.IMG`
* `hdd:/__common/POPS/POPS.ELF`
* `hdd:/__common/POPS/POPSTARTER.ELF`
* `hdd:/__common/POPS/POPS_IOX.PAK`

**Hugopocked POPSTARTER Fixes Setup of "Soul Blade" for Example:**
* `hdd:/__common/POPS/SLUS_002.40.Soul Blade/-HugopockedSoulBladeFixesGoHere-`

**wLE_kHn VCD Launcher Setup with Soul Blade for Example:**
* `mc0:/BOOT/BOOT.ELF` - *Renamed wLE_kHn_20200810.ELF file*
* `hdd:/__.POPS/SLUS_002.40.Soul Blade.VCD` - *Converted from bin/cue PS1 backup*
* `hdd:/__common/POPS/IOPRP252.IMG`
* `hdd:/__common/POPS/POPS.ELF`
* `hdd:/__common/POPS/POPSTARTER.ELF`
* `hdd:/__common/POPS/POPS_IOX.PAK`
* `hdd:/+OPL/APPS/wLE_kHn_20200810/wLE_kHn_20200810.ELF`
* ``hdd:/+OPL/APPS/wLE_kHn_20200810/title.cfg`` - *Created with Notepad and saved as* **title.cfg** **__not__ ~~.txt~~**
* ``title.cfg`` is created with notepad and reads:
```title=wLE_kHn_20200810 VCD Launcher
boot=wLE_kHn_20200810.ELF```


# Hugopocked Fixes
`Sometimes he will take requests via contact.`
* <@693490733595754547> 
* https://www.paypal.com/paypalme/hugopocked
* https://www.psx-place.com/threads/hugopocked-fixes-for-popstarter.39750/
* https://www.facebook.com/hugoernesto.rodriguez.5
* https://www.youtube.com/@hugopocked6695

# SMB Ethernet Storage File Structures Confirmed Working For POPS Setups on latest Grimdoomer, DB, and Official Betas versions of OPL 

**REQUIRED MC FILES for SMB:**
``mc?:/POPSTARTER/IPCONFIG.DAY``
``mc?:/POPSTARTER/SMBCONFIG.DAY``
``mc?:/POPSTARTER/poweroff.irc``
``mc?:/POPSTARTER/ps2dev9.irx``
``mc?:/POPSTARTER/ps2ip.irx``
``mc?:/POPSTARTER/ps2smap.irx``
``mc?:/POPSTARTER/smbman.irx``
``mc?:/POPSTARTER/SMSUTILS.irx``
``mc?:/POPSTARTER/usbd.irx`` - BDMA driver for exfat compatibility
``mc?:/POPSTARTER/usbhdfsd.irx`` - BDMA driver for exfat compatibility

**OPL ALL VERSIONS APPS PAGE Setup of "Soul Blade" for Example:**
``smb:/POPS/SLUS_002.40.Soul Blade.VCD`` - *Converted from bin/cue PS1 backup*
``smb:/POPS/POPS_IOX.PAK``
``smb:/POPS/POPSTARTER.ELF``
``smb:/APPS/Soul Blade/SB.SLUS_002.40.Soul Blade.ELF`` - *Renamed POPSTARTER.ELF file*
``smb:/APPS/Soul Blade/title.cfg`` - *Created with Notepad and saved as* **title.cfg** **__not__ ~~.txt~~**
``title.cfg`` is created with notepad and reads: ```title=[PS1]Soul Blade
boot=SB.SLUS_002.40.Soul Blade.ELF```
**OPL DB PS1 PAGE Setup of "Soul Blade" for Example:**
``smb:/POPS/POPSTARTER.ELF``
``smb:/POPS/SLUS_002.40.Soul Blade.VCD`` - *Converted from bin/cue PS1 backup*
``smb:/POPS/POPS_IOX.PAK``

**Hugopocked POPSTARTER Fixes Setup of "Soul Blade" for Example:**
``smb:/POPS/SLUS_002.40.Soul Blade/Hugopocked Soul Blade fixes go here``

# SATA/IDE HDD/SSD Internal Storage File Structures # 
**PFS-APA Internal File System for OPL ALL VERSIONS *APPS PAGE* Setup of "Soul Blade" for Example:**
``hdd:/__.POPS/SLUS_002.40.Soul Blade.VCD`` - *Converted from bin/cue PS1 backup*
``hdd:/__common/POPS/IOPRP252.IMG``
``hdd:/__common/POPS/POPS.ELF``
``hdd:/__common/POPS/POPSTARTER.ELF``
``hdd:/+OPL/APPS/Soul Blade/SLUS_002.40.Soul Blade.ELF`` - *Renamed POPSTARTER.ELF file*
``hdd:/+OPL/APPS/Soul Blade/title.cfg`` - *Created with Notepad and saved as* **title.cfg** **__not__ ~~.txt~~**
``title.cfg`` is created with notepad and reads: ```title=[PS1]Soul Blade
boot=SLUS_002.40.Soul Blade.ELF```
**EXFAT Internal File System for OPL GRIMDOOMER VERSION APPS PAGE Setup of "Soul Blade" for Example:**
``POPStarter does not support Internal EXFAT Storage``

**OPL DB *PS1 PAGE* Setup of "Soul Blade" for Example:**
``hdd:/__.POPS/SLUS_002.40.Soul Blade.VCD`` - *Converted from bin/cue PS1 backup*
``hdd:/__common/POPS/IOPRP252.IMG``
``hdd:/__common/POPS/POPS.ELF``
``hdd:/__common/POPS/POPSTARTER.ELF``
``hdd:/__common/POPS/POPS_IOX.PAK``

**Hugopocked POPSTARTER Fixes Setup of "Soul Blade" for Example:**
``hdd:/__common/POPS/SLUS_002.40.Soul Blade/-HugopockedSoulBladeFixesGoHere-``

**wLE_kHn VCD Launcher Setup with Soul Blade for Example:**
``mc0:/BOOT/BOOT.ELF`` - *Renamed wLE_kHn_20200810.ELF file*
``hdd:/__.POPS/SLUS_002.40.Soul Blade.VCD`` - *Converted from bin/cue PS1 backup*
``hdd:/__common/POPS/IOPRP252.IMG``
``hdd:/__common/POPS/POPS.ELF``
``hdd:/__common/POPS/POPSTARTER.ELF``
``hdd:/__common/POPS/POPS_IOX.PAK``
``hdd:/+OPL/APPS/wLE_kHn_20200810/wLE_kHn_20200810.ELF``
``hdd:/+OPL/APPS/wLE_kHn_20200810/title.cfg`` - *Created with Notepad and saved as* **title.cfg** **__not__ ~~.txt~~**
``title.cfg`` is created with notepad and reads: ```title=wLE_kHn_20200810 VCD Launcher
boot=wLE_kHn_20200810.ELF```

# iHDD/iSSD APA PFS MULTi-DISC EXAMPLE 
* https://bitbucket.org/ShaolinAssassin/popstarter-documentation-stuff/wiki/multi-disc

__**FILES USED FOR EXAMPLE**__:
* Final Fantasty VII D1.VCD
* Final Fantasy VII D2.VCD
* FInal Fantasy VII D3.VCD
* DISCS.TXT
* VMCDIR.TXT

__**DISCS.TXT**__ *contains:*
```Final Fantasy VII D1.VCD
Final Fantasy VII D2.VCD
Final Fantasy VII D3.VCD``` **Placed in:** 
``hdd0:/__common/POPS/Final Fantasy VII D1/`` and 
``hdd0:/__common/POPS/Final Fantasy VII D2/`` and 
``hdd0:/__common/POPS/Final Fantasy VII D3/``

---------------------------------------------------------------

__**VMCDIR.TXT**__ *contains:*
```Final Fantasy VII D1.VCD``` **Placed in: **
``hdd0:/__common/POPS/Final Fantasy VII D2/`` and
``hdd0:/__common/POPS/Final Fantasy VII D3/``

---------------------------------------------------------------
# USB MULTi-DISC EXAMPLE 

__**DISCS.TXT**__ *contains:*
```Final Fantasy VII D1.VCD
Final Fantasy VII D2.VCD
Final Fantasy VII D3.VCD``` **Placed in:** 
``mass:/POPS/Final Fantasy VII D1/`` and 
``mass:/POPS/Final Fantasy VII D2/`` and 
``mass:/POPS/Final Fantasy VII D3/``

---------------------------------------------------------------

__**VMCDIR.TXT**__ *contains:*
```Final Fantasy VII D1.VCD``` **Placed in: **
``mass:/POPS/Final Fantasy VII D2/`` and
``mass:/POPS/Final Fantasy VII D3/``

---------------------------------------------------------------

**Official POPStarter Pages :** (download link omitted)
* https://bitbucket.org/ShaolinAssassin/popstarter-documentation-stuff/wiki/Home
* https://www.psx-place.com/threads/popstarter.19139/
**Official POPSLoader Page :** (download link omitted)
* https://www.psx-place.com/resources/popsloader.1396/
**BDM Assault (Adding exFAT compatibility to POPStarter) :**
* https://github.com/israpps/BDMAssault
**Latest wLE_kHn (20200810) :** 
* wLE_kHn Discord download link omitted
**HugoPocked POPStarter Fixes :**
* https://www.youtube.com/@hugopocked6695
* https://www.psx-place.com/threads/hugopocked-fixes-for-popstarter.39750/
# USB Mass Storage File Structures Confirmed Working For POPS Setups on all forks and versions of OPL.#
*(Open PS2 Loader Daily Build Tenth Anniversary Edition, Grimdoomer, official 1.1.0, and official 1.2.0 betas)*
 *(`fat32 w/32kb clusters` or `exfat w/32kb clusters & BDMAssault`)*

**OPL ALL VERSIONS APPS PAGE Setup of "Soul Blade" for Example:**
`mass:/POPS/SLUS_002.40.Soul Blade.VCD` - *Converted from bin/cue PS1 backup*
`mass:/POPS/SLUS_002.40.Soul Blade/` **<-** *Hugopocked Fixes placed here if Available (Per Game VMC Folder).*
`mass:/POPS/POPS_IOX.PAK`
`mass:/APPS/PS1_Soul Blade/XX.SLUS_002.40.Soul Blade.ELF` - *Renamed `POPSTARTER.ELF` file*
`mass:/APPS/PS1_Soul Blade/title.cfg` - *Created with Notepad and saved as* **title.cfg** **__not__ ~~.txt~~**
`title.cfg` reads: ```title=[PS1] Soul Blade
boot=XX.SLUS_002.40.Soul Blade.ELF```
**OPL DailyBuild Tenth Anniversary Edition PS1 PAGE Setup of "Soul Blade" for Example:**
`mass:/POPS/POPSTARTER.ELF`
`mass:/POPS/SLUS_002.40.Soul Blade.VCD` - *Converted from bin/cue PS1 backup*
`mass:/POPS/SLUS_002.40.Soul Blade/` - *Hugopocked Fixes & VMC folder per game*
`mass:/POPS/POPS_IOX.PAK`

**Hugopocked POPSTARTER Fixes Setup:**
`mass:/POPS/VCD File Name/` *Hugopocked Fixes & VMC folder per game, change "VCD File Name" to the corresponding VCD file name.*
*For example, if `123.VCD` then `mass:/POPS/123/`*

**BDM Assault/exFAT Compatibility Enabler for USB Mass Storage Devices Setup:**
*(case sensitive files reminder)*
*These are <@757101115384004698>'s *BDMA Modules *and are renamed* `usbd_bd_assault.irx` *and* `bdm_assault.irx` *files.*
`mc?:/POPSTARTER/usbd.irx`
`mc?:/POPSTARTER/usbhdfsd.irx`
`mc?:/SYS-CONF/USBD.IRX`
`mc?:/SYS-CONF/USBHDFSD.IRX`

**wLE_kHn VCD POPStarter Launcher Capable USB Setup with Soul Blade for Example:**
*(It is recommended to not have the game ID in the .VCD filename, for a better listing of your games when using wLE_kHn.)*
`mass:/POPS/POPS_IOX.PAK`
`mass:/POPS/Soul Blade.VCD` - *Converted from bin/cue PS1 Backup*
`mass:/POPS/Soul Blade/` *Hugopocked Fixes & VMC folder per game*
`mass:/POPS/POPSTARTER.ELF`
`mass:/APPS/APP_wLE_kHn_20200810/wLE_kHn_20200810.ELF`
`mass:/APPS/APP_wLE_kHn_20200810/title.cfg` - *Created with Notepad and saved as* **title.cfg** **__not__ ~~.txt~~**
`title.cfg` is created with notepad and reads: ```title=wLE_kHn_20200810 VCD Launcher
boot=wLE_kHn_20200810.ELF``` 
**POPSLoader APP USB Setup:**
*It is recommended to not have the game ID in the .VCD filename, for a better listing of your games when using POPSLoader.*
`mass:/POPS/POPS_IOX.PAK`
`mass:/POPS/POPSTARTER.ELF`
`mass:/POPS/Soul Blade.VCD`
`mass:/POPS/Soul Blade/` *Hugopocked Fixes & VMC folder per game*
`mass:/APPS/PS1_POPSLDR/POPSLOADER.ELF`
`mass:/APPS/PS1_POPSLDR/` **<-** *POPSLoader Files*
`mass:/APPS/PS1_POPSLDR/title.cfg` - *Created with Notepad and saved as* **title.cfg** **__not__ ~~.txt~~**
`title.cfg` reads: ```title=[PS1] !POPSLOADER
boot=POPSLOADER.ELF```

I'm also keeping the release thread https://www.psx-place.com/threads/19139/ 's first post "updated" with links to side projects. Today was POPSLoader release day, added it. The release thread is a bit rough to read and clusterfuckish, but at least it's not as kilometric as the original ASSEMblergames thread was^^.
