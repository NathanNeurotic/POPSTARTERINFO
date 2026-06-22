export const pages = [
  {
    slug: "index",
    title: "POPStarter Documentation",
    nav: "Home",
    description: "Recovered, source-backed POPStarter setup and reference material for PS1-on-PS2 workflows: storage layouts, commands, patches, IGR, VMCs, SMB, and fork boundaries.",
    blocks: [
      { dynamic: "homeStats" },
      `<section class="decision-panel">
        <h2>Start Here</h2>
        <p>Pick the storage backend and launcher first. The folder names, support files, VMC location, and troubleshooting path all depend on that choice.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Reader goal</th><th>Start with</th><th>First files to verify</th><th>Do not mix it with</th></tr></thead>
          <tbody>
            <tr><td>First working setup on USB</td><td><a href="usb-storage.html">USB Setup</a></td><td><code>mass:/POPS/POPS_IOX.PAK</code>, one <code>.VCD</code>, matching support folder, renamed <code>XX.</code> ELF or launcher path.</td><td>HDD <code>__common/POPS</code> support folders.</td></tr>
            <tr><td>Fast internal HDD library</td><td><a href="internal-hdd.html">Internal HDD Setup</a></td><td><code>hdd0:/__.POPS</code> for VCDs and <code>hdd0:/__common/POPS</code> for POPS/support files.</td><td>Legacy per-game <code>PP.</code> partitions unless doing HDDOSD/KELF.</td></tr>
            <tr><td>Network library over SMB</td><td><a href="smb-network.html">SMB / Network</a></td><td><code>SB.</code> launcher, writable share, <code>IPCONFIG.DAT</code>, <code>SMBCONFIG.DAT</code>, and <code>mc?:/POPSTARTER</code> modules.</td><td>USB <code>XX.</code> prefixes or read-only shares.</td></tr>
            <tr><td>Commands, fixes, video, IGR, VMC</td><td><a href="reference-tables.html">Reference Tables</a></td><td>Exact <code>CHEATS.TXT</code> path, config-byte/build version, and per-game support folder.</td><td>Global preset packs copied to every game.</td></tr>
            <tr><td>Verify old files and source claims</td><td><a href="archive-provenance.html">Archive &amp; Provenance</a></td><td>Filename, hash/source label, build ID offsets, and package role.</td><td>Binary mirror links or unidentified repacks.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      { dynamic: "manualLedger" },
      `<section class="architecture-panel">
        <h2>POPStarter, POPS, and POPSLoader are not the same thing</h2>
        <p class="lead">Most bad setup instructions blur three separate layers. This site keeps them split so a reader knows whether a rule belongs to original POPStarter, Sony's POPS emulator payload, or a modern launcher/fork workflow.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Layer</th><th>What it owns</th><th>Documentation rule</th></tr></thead>
          <tbody>
            <tr><td>POPStarter</td><td>Launcher and patch layer: mount target <code>.VCD</code>, read support folders, apply commands/fixes, handle IGR files, then hand execution to POPS.</td><td>Document storage prefixes, <code>CHEATS.TXT</code>, VMC, patches, TROJAN files, and handler placement here.</td></tr>
            <tr><td>POPS</td><td>Sony's PS1-on-PS2 emulator payload.</td><td>Identify by filename, role, build data, and hash/source reference only. Do not host or link proprietary binaries.</td></tr>
            <tr><td>POPSLoader</td><td>Separate Lua/Enceladus launcher lineage and modern fork workflows.</td><td>Keep BDMA, MX4SIO, MMCE, art paths, and fork exit-menu behavior labeled as launcher/fork behavior.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Reference anchors</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Anchor</th><th>Current site stance</th><th>Where to inspect</th></tr></thead>
          <tbody>
            <tr><td>Final public beta</td><td>r13 Beta 2019/06/05 is the normal documentation baseline.</td><td><a href="version-integrity.html">Version and Integrity</a></td></tr>
            <tr><td><code>PATCH_9.BIN</code> conflict</td><td>Maintainer post says loader-disable workaround; seed notes also preserve <code>$NOPAL</code> association. The conflict is retained instead of flattened.</td><td><a href="patches-fixes.html">Patches and Fixes</a></td></tr>
            <tr><td>SMB typo correction</td><td>Use <code>IPCONFIG.DAT</code>, <code>SMBCONFIG.DAT</code>, and <code>poweroff.irx</code>; old <code>.DAY</code>/<code>.irc</code> strings are raw-note conflicts.</td><td><a href="smb-network.html">SMB / Network</a></td></tr>
            <tr><td>Modern workflow boundary</td><td>POPSLoader, BDM Assault, MX4SIO/MMCE, BDMA, and fork art/exit behavior are not stock POPStarter core.</td><td><a href="popsloader-guide.html">POPSLoader Guide</a></td></tr>
            <tr><td>Preservation boundary</td><td>No Sony POPS emulator binaries, BIOS files, decrypted libraries, proprietary package mirrors, or direct binary download links are included.</td><td><a href="download-inventory.html">Safe Archive Inventory</a></td></tr>
          </tbody>
        </table></div>
      </section>`
    ]
  },
  {
    slug: "setup-paths",
    title: "Setup Paths",
    nav: "Setup Paths",
    description: "The manual chapter for boot flow, launcher selection, minimal files, memory-card folders, and first-boot verification.",
    blocks: [
      `<section class="callout">
        <h2>Read this before copying files</h2>
        <p>POPStarter setup is path-sensitive. A correct file in the wrong folder is effectively missing, and a correct launcher prefix for one backend can select the wrong mode on another backend.</p>
      </section>`,
      `<section>
        <h2>Boot flow</h2>
        <pre><code>Frontend or ELF browser
  -> renamed POPSTARTER.ELF or POPSTARTER.KELF
    -> resolve storage backend from prefix/path
      -> locate VCD
        -> locate per-game support folder
          -> apply CHEATS.TXT / PATCH / TROJAN / handlers
            -> hand execution to POPS</code></pre>
      </section>`,
      `<section>
        <h2>Minimal path checklist</h2>
        <ol>
          <li>Choose one storage backend: USB, internal HDD, or SMB.</li>
          <li>Choose one launcher model: renamed ELF, OPL Apps, OPL DB/PS1 page, wLE_kHn, POPSLoader, or HDDOSD/KELF.</li>
          <li>Keep the VCD basename, renamed ELF, and support folder aligned for that model.</li>
          <li>Put common POPS files only in the backend-specific common folder.</li>
          <li>Put game-specific commands, VMCs, patches, and handlers in the per-game support folder.</li>
        </ol>
      </section>`,
      `<section>
        <h2>First boot verification</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Checkpoint</th><th>What to inspect</th><th>Where to go next</th></tr></thead>
          <tbody>
            <tr><td>Frontend sees entry</td><td><code>title.cfg</code>, app folder, renamed ELF, OPL path prefix.</td><td><a href="launcher-matrix.html">Launcher Matrix</a></td></tr>
            <tr><td>POPStarter starts</td><td>Correct backend prefix/path, required POPS support files, VCD basename.</td><td><a href="storage-overview.html">Storage Backends</a></td></tr>
            <tr><td>Game reaches PS logo</td><td>POPS payload identifiers, config bytes, compatibility mode, display commands.</td><td><a href="reference-tables.html">Reference Tables</a></td></tr>
            <tr><td>Save or IGR fails</td><td>VMC folder, share write permission, IGR command, BOOT.ELF exit chain.</td><td><a href="troubleshooting.html">Troubleshooting</a></td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Memory-card folders</h2>
        <p>SMB modules and many driver overrides are loaded from <code>mc0:/POPSTARTER/</code> with <code>mc1:/POPSTARTER/</code> fallback in later builds. Do not confuse this memory-card folder with a PC/NAS share named <code>POPSTARTER</code>.</p>
      </section>`
    ]
  },
  {
    slug: "toolchain-utilities",
    title: "Toolchain and Utilities",
    nav: "Toolchain",
    description: "Recovered utility workflows for VCD conversion, CUE2POPS, POPStarter batchers, PFSSHELL, RadHostClient, and VMC/PMC save movement.",
    blocks: [
      `<section class="callout">
        <h2>Tools are workflow glue, not bundled content</h2>
        <p>The recovered wiki has many utility pages. This site documents what each tool is for and what checks matter, without hosting binaries or turning old download pages into a mirror.</p>
      </section>`,
      `<section>
        <h2>VCD conversion checklist</h2>
        <ol>
          <li>Dump the PS1 disc as BIN+CUE first. POPS expects VCD images, not normal ISO images.</li>
          <li>Confirm the BIN is a raw <code>MODE2/2352</code> image and the CUE is a plain ASCII cuesheet.</li>
          <li>Use CUE2POPS to convert the CUE/BIN pair into a <code>.VCD</code>.</li>
          <li>Keep the final <code>.VCD</code> extension uppercase in documented examples.</li>
          <li>Use the VCD basename as the anchor for the renamed ELF and per-game support folder.</li>
        </ol>
        <pre><code>Game.cue + Game.bin
  -> CUE2POPS
    -> Game.VCD
      -> mass:/POPS/Game.VCD
      -> mass:/POPS/Game/CHEATS.TXT</code></pre>
      </section>`,
      `<section>
        <h2>CUE2POPS and batch conversion</h2>
        <p>The recovered changelog material names CUE2POPS 2.3 as a standalone conversion line with fixes around input-file overwrite behavior, workdir BIN handling, and output-path generation. The practical documentation rule is to keep the CUE, BIN, converter, and any bulk script in a predictable folder and inspect the generated VCD names before copying them to the PS2 backend.</p>
        <p>Bulk conversion is useful, but it multiplies naming mistakes. After a bulk run, check every VCD basename against the launcher/support-folder scheme you intend to use.</p>
      </section>`,
      `<section>
        <h2>POPStarter batchers</h2>
        <p>The old batcher pages describe small PC tools that create renamed POPStarter launchers in bulk. They are convenience tools for making many <code>XX.</code>, <code>SB.</code>, or HDD-style launchers from VCD names; they do not change POPStarter's storage rules.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Use case</th><th>Safe documentation stance</th></tr></thead>
          <tbody>
            <tr><td>Create many USB launchers.</td><td>Explain that output ELFs must still match <code>mass:/POPS/&lt;basename&gt;.VCD</code>.</td></tr>
            <tr><td>Create many SMB launchers.</td><td>Require the <code>SB.</code> prefix and matching share paths.</td></tr>
            <tr><td>Create many HDD launchers.</td><td>Keep HDD frontend rules separate from legacy HDDOSD/KELF installs.</td></tr>
            <tr><td>Old batcher download pages.</td><td>Record version names and role only; do not host executable mirrors.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>PFSSHELL transfer path</h2>
        <p>PFSSHELL is an old PC-side path for copying VCDs to a locally attached PS2 HDD. The recovered page's useful core is the command sequence, not the old download link.</p>
        <pre><code>device hddX:
mount __.POPS
put NAMEOFYOURVCD.VCD
umount
exit</code></pre>
        <p>Use the correct HDD index for <code>hddX:</code>, verify the drive status before writing, and mount the modern <code>__.POPS</code> VCD partition rather than an OPL game partition.</p>
      </section>`,
      `<section>
        <h2>RadHostClient transfer path</h2>
        <p>RadHostClient plus uLaunchELF provides a network copy route: configure the PS2 network settings in uLE, connect the PC client to the PS2 IP, browse <code>host:/</code> from uLE, then copy VCDs into <code>__.POPS</code>. This is a transfer workflow only; it does not make POPStarter itself a network launcher.</p>
      </section>`,
      `<section>
        <h2>PMC and VMC movement</h2>
        <p>The recovered wiki has both directions: PS1 memory-card saves into POPStarter VMCs, and POPStarter VMC saves back toward a physical PS1 memory card workflow. Keep these pages as save-conversion appendices. They do not mean POPStarter can save directly to a physical PS1 memory card during play.</p>
      </section>`
    ]
  },
  {
    slug: "advanced-launch-modes",
    title: "Advanced Launch Modes",
    nav: "Advanced Modes",
    description: "PS1 CD mode, HDDOSD/KELF, legacy partition installs, uLE_kHn boundaries, and other non-default POPStarter launch routes.",
    blocks: [
      `<section class="callout warning">
        <h2>Advanced means special-case</h2>
        <p>These routes are preserved because they exist in the recovered wiki, not because they should replace the normal USB/HDD/SMB quick starts. Treat them as compatibility, preservation, or legacy-install material.</p>
      </section>`,
      `<section>
        <h2>PS1 CD mode</h2>
        <p>PS1 CD mode is described as a native POPS feature that can boot games from the CDVD drive. It is explicitly not the recommended everyday path, and swap-trick use is called out as especially risky. The mode is selected by launching a renamed POPStarter ELF whose name does not collide with an existing VCD or partition.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>ELF name</th><th>VMC location behavior</th></tr></thead>
          <tbody>
            <tr><td><code>GAME.ELF</code></td><td>HDD-style save folder under <code>__common/POPS/GAME/</code>.</td></tr>
            <tr><td><code>XX.GAME.ELF</code></td><td>USB-style save folder under <code>mass:/POPS/GAME/</code>.</td></tr>
            <tr><td><code>SB.GAME.ELF</code></td><td>SMB-style save folder under the share's <code>POPS/GAME/</code>.</td></tr>
            <tr><td><code>PS1CD.ELF</code> or similar generic name</td><td>All discs launched through that generic name share the same VMC folder.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>HDDOSD and POPSTARTER.KELF</h2>
        <p>The recovered HDDOSD page documents <code>POPSTARTER.KELF</code> for Browser 2.00 / HDDOSD presentation. It uses the older "one game equals one partition" route, not the shared modern <code>__.POPS</code> partition.</p>
        <ul class="checklist">
          <li>Use a parent partition named like <code>PP.&lt;Game&gt;</code> for visible HDDOSD installs.</li>
          <li>The game image inside that partition is typically <code>IMAGE0.VCD</code>.</li>
          <li>HDDOSD metadata, icons, and bootability are separate from POPStarter's core game-compatibility behavior.</li>
          <li>Do not present KELF/HDDOSD installation as the simple HDD setup. Modern OPL-style HDD workflows use <code>__.POPS</code> and <code>__common/POPS</code>.</li>
        </ul>
      </section>`,
      `<section>
        <h2>Legacy partition installs</h2>
        <p>Legacy HDD installs can use <code>PP.</code> visible partitions or hidden <code>__.</code> partitions. These are distinct from the shared <code>__.POPS</code> VCD partition. If a source says <code>IMAGE0.VCD</code>, assume a per-game partition route until proven otherwise.</p>
      </section>`,
      `<section>
        <h2>uLE_kHn and direct browsing</h2>
        <p>uLE_kHn belongs to the "browse and launch VCDs directly" family. It is useful for avoiding a per-game renamed ELF farm, and it appears in several modern workflows, but it is still a frontend/launcher choice. Per-game support folders, VMC routing, and command files remain POPStarter rules.</p>
      </section>`,
      `<section class="callout">
        <h2>Default recommendation</h2>
        <p>Use normal USB, HDD, SMB, or POPSLoader fork workflows for regular libraries. Reach for PS1 CD mode, HDDOSD/KELF, and legacy per-game partitions only when preserving or testing those specific historical routes.</p>
      </section>`
    ]
  },
  {
    slug: "storage-overview",
    title: "Storage Backends",
    nav: "Storage Overview",
    description: "The manual chapter for choosing USB, HDD, SMB, or BDM/exFAT and understanding backend-specific path rules.",
    blocks: [
      `<section>
        <h2>Backend comparison</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Backend</th><th>Best use</th><th>Main paths</th><th>Main trap</th></tr></thead>
          <tbody>
            <tr><td><a href="usb-storage.html">USB</a></td><td>Simple first setup and portable testing.</td><td><code>mass:/POPS</code>, <code>mass:/POPS0..9</code></td><td>Fragmentation, slow USB bus, split-folder support files.</td></tr>
            <tr><td><a href="internal-hdd.html">HDD</a></td><td>Best performance and stable local library.</td><td><code>hdd0:/__.POPS</code>, <code>hdd0:/__common/POPS</code></td><td>Creating <code>+__.POPS</code> or putting support folders beside VCDs.</td></tr>
            <tr><td><a href="smb-network.html">SMB</a></td><td>Network library with easy file management.</td><td>Share root <code>POPS/</code>, <code>mc?:/POPSTARTER/</code></td><td>Read-only shares, missing modules, wrong <code>SB.</code> prefix.</td></tr>
            <tr><td><a href="bdm-exfat.html">BDM/exFAT</a></td><td>USB exFAT through driver substitution.</td><td><code>mc?:/POPSTARTER/usbd.irx</code>, <code>usbhdfsd.irx</code></td><td>Assuming it adds internal HDD exFAT support.</td></tr>
            <tr><td><a href="advanced-launch-modes.html">Advanced modes</a></td><td>Special and legacy launch paths.</td><td>PS1 CD mode, <code>POPSTARTER.KELF</code>, <code>PP.</code> partitions</td><td>Treating historical or risky routes as the default setup.</td></tr>
            <tr><td><a href="popsloader-guide.html">POPSLoader</a></td><td>Modern launcher and fork workflows.</td><td><code>POPSLOADER.ELF</code>, <code>POPSLDR/</code>, fork device paths</td><td>Mixing fork-only behavior with original POPStarter core rules.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section class="callout warning">
        <h2>Do not mix backend rules</h2>
        <p><code>XX.</code> belongs to classic USB renamed-ELF launch. <code>SB.</code> selects SMB mode. Modern HDD VCDs belong in <code>__.POPS</code>, while legacy partition installs use <code>IMAGE0.VCD</code> inside <code>PP.&lt;Game&gt;</code> or <code>__.&lt;Game&gt;</code>.</p>
      </section>`,
      { dynamic: "storageMatrix" }
    ]
  },
  {
    slug: "reference-tables",
    title: "Reference Tables",
    nav: "Reference Tables",
    description: "The manual chapter that routes readers to commands, config bytes, compatibility aliases, patches, IGR, video, VMC, and troubleshooting references.",
    blocks: [
      `<section>
        <h2>Reference map</h2>
        <div class="chapter-table">
          <a href="command-reference.html"><span>3.1</span><strong>Commands</strong><em><code>CHEATS.TXT</code> directives, raw code forms, scope, conflicts, and source confidence.</em></a>
          <a href="cheat-engine.html"><span>3.2</span><strong>Cheat Engine</strong><em>Raw codes, <code>$SAFEMODE</code>, C0/master-code behavior, LibCrypt, file-case traps.</em></a>
          <a href="config-table.html"><span>3.3</span><strong>Config Bytes</strong><em>Recovered <code>$410-$42F</code> r13 byte table with defaults and aliases.</em></a>
          <a href="compatibility-map.html"><span>3.4</span><strong>PATCH / TROJAN Map</strong><em>Crosswalk command aliases, standalone files, and config-byte equivalents.</em></a>
          <a href="compatibility-deep-dive.html"><span>3.5</span><strong>Compatibility Deep Dive</strong><em>Rates, mode stacking, per-game examples, Hugopocked and TROJAN_7 boundaries.</em></a>
          <a href="igr-exit.html"><span>3.6</span><strong>IGR and Exit</strong><em>Combos, no-popup exits, <code>BOOT.ELF</code> chain, and loader-disable conflict.</em></a>
          <a href="multi-disc-vmc.html"><span>3.7</span><strong>Multi-disc and VMC</strong><em><code>DISCS.TXT</code>, <code>VMCDIR.TXT</code>, shared saves, support folders.</em></a>
          <a href="vmc-handlers.html"><span>3.8</span><strong>VMC and Handlers</strong><em>VMC control, BIOS/OSD handlers, IGR textures, POPS folder priority, handler placement.</em></a>
          <a href="device-irx-modules.html"><span>3.9</span><strong>Device and IRX Modules</strong><em>IRX loader, DS3 modules, special devices, module ordering, and scope boundaries.</em></a>
          <a href="display-code-appendix.html"><span>3.10</span><strong>Display and Code Appendix</strong><em>Widescreen, smooth, scanlines, D2LS, PS1 RAW and PS2 RAW code archives.</em></a>
          <a href="video-display.html"><span>3.11</span><strong>Video / Display</strong><em>480p, HDTVFIX, geometry, scanlines, smoothing, widescreen.</em></a>
          <a href="troubleshooting.html"><span>3.12</span><strong>Troubleshooting</strong><em>Known symptoms, likely causes, and source-tagged mitigations.</em></a>
          <a href="faq-known-bugs.html"><span>3.13</span><strong>FAQ and Known Bugs</strong><em>Fast answers for black screens, exFAT, saves, multitap, legal files, and final build identity.</em></a>
        </div>
      </section>`,
      `<section class="callout">
        <h2>Use tables as evidence, not as global presets</h2>
        <p>The command and config tables explain what a switch does. They do not imply every switch should be applied globally. Start from a clean boot, then add the smallest per-game change that matches the symptom.</p>
      </section>`
    ]
  },
  {
    slug: "archive-provenance",
    title: "Archive & Provenance",
    nav: "Archive Overview",
    description: "The manual chapter for package identity, hashes, recovered wiki scope, source confidence, and preservation boundaries.",
    blocks: [
      `<section>
        <h2>What belongs in the public archive</h2>
        <p>This site preserves instructions, source notes, hashes, package identities, and source confidence. It does not mirror Sony POPS emulator binaries, BIOS files, proprietary libraries, or direct binary download links.</p>
      </section>`,
      `<section>
        <h2>Archive map</h2>
        <div class="chapter-table">
          <a href="thread-study.html"><span>4.1</span><strong>Thread Study</strong><em>Maintainer-confirmed findings, thread-derived corrections, and low-confidence material intentionally dropped.</em></a>
          <a href="poc2-history.html"><span>4.2</span><strong>POC2 History</strong><em>How the leaked POPS-00001 era led to POPStarter, and what not to revive.</em></a>
          <a href="version-integrity.html"><span>4.3</span><strong>Version and Integrity</strong><em>Hex offsets, build IDs, final build, old package warnings, and tampered-bundle caution.</em></a>
          <a href="download-inventory.html"><span>4.4</span><strong>Safe Inventory</strong><em>Recovered package names, roles, statuses, and safe hashes.</em></a>
          <a href="history-provenance.html"><span>4.5</span><strong>History</strong><em>Build timeline, feature introductions, and final r13 boundary.</em></a>
          <a href="wiki-coverage.html"><span>4.6</span><strong>Wiki Coverage</strong><em>63 recovered ShaolinAssassin wiki page slugs grouped by topic.</em></a>
          <a href="source-archive.html"><span>4.7</span><strong>Sources</strong><em>Public and local evidence records with reliability labels.</em></a>
          <a href="credits.html"><span>4.8</span><strong>Credits</strong><em>People, projects, mirrors, fix authors, and recovery contributors named by role.</em></a>
          <a href="archive.html"><span>4.9</span><strong>Local Archive</strong><em>Rendered seed notes, research files, raw captures, and drafts.</em></a>
        </div>
      </section>`,
      `<section class="callout legal">
        <h2>Preservation boundary</h2>
        <p>Required POPS files may be identified by filename, MD5/SHA-style identifier, package role, or source-reference name only. Public pages should not turn into a download index.</p>
      </section>`
    ]
  },
  {
    slug: "quick-start",
    title: "Quick Start",
    description: "Pick a storage backend and launcher, then follow a source-tagged file layout.",
    blocks: [
      `<section>
        <h2>Choose the route first</h2>
        <p>POPStarter setup fails most often when files from different launcher models are mixed together. Pick one row from this decision guide, then copy the file tree for that exact row. Do not combine an OPL DB/PS1-page layout with a per-game OPL Apps <code>title.cfg</code> layout unless the guide explicitly says that workflow uses both.</p>
      </section>`,
      `<section class="steps">
        <article><h3>1. Storage</h3><p><strong>USB</strong> is easiest, but slow and fragmentation-sensitive. <strong>Internal APA HDD</strong> is fast, but paths are strict. <strong>SMB</strong> is convenient once working, but needs memory-card network modules and a writable legacy share. <strong>USB exFAT</strong> needs BDM Assault driver substitution.</p></article>
        <article><h3>2. Launcher</h3><p><strong>OPL Apps</strong> launches renamed POPStarter ELFs and needs a <code>title.cfg</code>. <strong>OPL DB/PS1 page</strong> uses fork-specific POPStarter discovery paths. <strong>wLE_kHn</strong> browses VCDs directly. <strong>POPSLoader</strong> is a separate Lua/Enceladus launcher and has its own folder requirements.</p></article>
        <article><h3>3. Basename</h3><p>The VCD basename is the anchor for per-game support folders. If the game image is <code>SLUS_002.40.Soul Blade.VCD</code>, the USB support folder is <code>mass:/POPS/SLUS_002.40.Soul Blade/</code>; the HDD support folder is usually <code>hdd:/__common/POPS/SLUS_002.40.Soul Blade/</code>.</p></article>
        <article><h3>4. Legal files</h3><p>The guide can document where required POPS files go, but this repository must not include Sony emulator binaries, BIOS files, decrypted libraries, or package mirrors that redistribute proprietary material.</p></article>
      </section>`,
      `<section>
        <h2>Fast choice table</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>If you want...</th><th>Use this page</th><th>Copy this workflow</th><th>Main trap</th></tr></thead>
          <tbody>
            <tr><td>Simple USB launch from OPL Apps</td><td><a href="usb-storage.html">USB Setup</a></td><td>USB - OPL Apps per-game renamed ELF</td><td><code>title.cfg</code> saved as <code>title.cfg.txt</code>, or <code>boot=</code> not matching the renamed ELF.</td></tr>
            <tr><td>Cleaner USB game list without per-game app folders</td><td><a href="usb-storage.html">USB Setup</a></td><td>wLE_kHn or POPSLoader</td><td>Leaving the launcher files outside their expected APPS folder.</td></tr>
            <tr><td>Fast internal HDD setup</td><td><a href="internal-hdd.html">Internal HDD Setup</a></td><td>APA HDD - OPL Apps or OPL DB/PS1 page</td><td>Misspelling <code>__.POPS</code> or putting fixes under the wrong common folder.</td></tr>
            <tr><td>Network share setup</td><td><a href="smb-network.html">SMB / Network</a></td><td>SMB direct <code>SB.</code> launcher or OPL Apps over SMB</td><td>Confusing the PC share folder with <code>mc?:/POPSTARTER</code>, or using the wrong <code>smb:</code>/<code>smb0:</code> prefix.</td></tr>
            <tr><td>USB exFAT instead of FAT32</td><td><a href="bdm-exfat.html">BDM / exFAT</a></td><td>BDM Assault driver replacement</td><td>Thinking this adds internal HDD exFAT support to POPStarter core. It does not.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Universal setup checks</h2>
        <ul class="checklist">
          <li>Keep <code>.VCD</code> uppercase in examples unless your chosen launcher explicitly tolerates otherwise.</li>
          <li>Save <code>title.cfg</code>, <code>CHEATS.TXT</code>, <code>DISCS.TXT</code>, and <code>VMCDIR.TXT</code> as plain text with the exact extension shown.</li>
          <li>Per-game fix/VMC folders match the VCD basename without the <code>.VCD</code> extension.</li>
          <li>OPL Apps <code>boot=</code> must match the renamed ELF filename in the same app folder.</li>
          <li>For SMB, publish <code>IPCONFIG.DAT</code>, <code>SMBCONFIG.DAT</code>, and <code>poweroff.irx</code>; the <code>.DAY</code>/<code>.irc</code> spellings in the raw notes are kept as a conflict, not as the recommended setup.</li>
        </ul>
      </section>`,
      { dynamic: "storageMatrix" }
    ]
  },
  {
    slug: "usb-storage",
    title: "USB Setup",
    nav: "USB",
    description: "USB mass-storage POPStarter workflows for OPL Apps, OPL DB/PS1 page, wLE_kHn, POPSLoader, Hugopocked fixes, and BDM Assault exFAT.",
    blocks: [
      `<section class="callout">
        <h2>USB is the easiest path, not the fastest path</h2>
        <p>The local notes say these USB structures were confirmed working across OPL Daily/Tenth, Grimdoomer, official 1.1.0, and official 1.2.0 beta style workflows. USB remains limited by the PS2 USB bus and by fragmentation, so do not use USB stutter as proof that a game is incompatible until HDD or SMB has been considered.</p>
      </section>`,
      `<section>
        <h2>OPL Apps page: per-game renamed ELF</h2>
        <p>This workflow creates one app entry per PS1 game. The renamed ELF launches POPStarter; the VCD and support folder live under <code>mass:/POPS/</code>.</p>
        <pre><code>mass:/POPS/SLUS_002.40.Soul Blade.VCD
mass:/POPS/SLUS_002.40.Soul Blade/
mass:/POPS/SLUS_002.40.Soul Blade/CHEATS.TXT
mass:/POPS/SLUS_002.40.Soul Blade/SLOT0.VMC
mass:/POPS/SLUS_002.40.Soul Blade/SLOT1.VMC
mass:/POPS/POPS_IOX.PAK
mass:/APPS/PS1_Soul Blade/XX.SLUS_002.40.Soul Blade.ELF
mass:/APPS/PS1_Soul Blade/title.cfg</code></pre>
        <pre><code>title=[PS1] Soul Blade
boot=XX.SLUS_002.40.Soul Blade.ELF</code></pre>
        <p>The <code>boot=</code> value is only the ELF filename, not the full path. The file must be saved as <code>title.cfg</code>, not <code>title.cfg.txt</code>.</p>
      </section>`,
      `<section>
        <h2>OPL DB / Tenth PS1 page</h2>
        <p>This is a modern OPL/fork workflow. It avoids per-game APPS folders by keeping <code>POPSTARTER.ELF</code> directly in <code>mass:/POPS/</code> with the VCDs.</p>
        <pre><code>mass:/POPS/POPSTARTER.ELF
mass:/POPS/SLUS_002.40.Soul Blade.VCD
mass:/POPS/SLUS_002.40.Soul Blade/
mass:/POPS/POPS_IOX.PAK</code></pre>
        <p>Label this as OPL DB/PS1-page behavior. Older original POPStarter docs will not necessarily describe it because the frontend behavior came later.</p>
      </section>`,
      `<section>
        <h2>wLE_kHn VCD launcher</h2>
        <p>wLE_kHn is useful when you want to browse VCDs instead of creating one renamed ELF per game. The raw notes recommend omitting game IDs from VCD filenames for a cleaner wLE_kHn list.</p>
        <pre><code>mass:/POPS/POPS_IOX.PAK
mass:/POPS/POPSTARTER.ELF
mass:/POPS/Soul Blade.VCD
mass:/POPS/Soul Blade/
mass:/APPS/APP_wLE_kHn_20200810/wLE_kHn_20200810.ELF
mass:/APPS/APP_wLE_kHn_20200810/title.cfg</code></pre>
        <pre><code>title=wLE_kHn_20200810 VCD Launcher
boot=wLE_kHn_20200810.ELF</code></pre>
      </section>`,
      `<section>
        <h2>POPSLoader app on USB</h2>
        <p>POPSLoader is a separate launcher by El_isra, not original POPStarter core behavior. Its <code>POPSLDR</code> folder must stay beside <code>POPSLOADER.ELF</code>.</p>
        <pre><code>mass:/POPS/POPS_IOX.PAK
mass:/POPS/POPSTARTER.ELF
mass:/POPS/Soul Blade.VCD
mass:/POPS/Soul Blade/
mass:/APPS/PS1_POPSLDR/POPSLOADER.ELF
mass:/APPS/PS1_POPSLDR/POPSLDR/
mass:/APPS/PS1_POPSLDR/title.cfg</code></pre>
        <pre><code>title=[PS1] !POPSLOADER
boot=POPSLOADER.ELF</code></pre>
      </section>`,
      `<section>
        <h2>POPS0 through POPS9 split folders</h2>
        <p>Original POPStarter can scan <code>mass:/POPS</code> and then <code>mass:/POPS0</code> through <code>mass:/POPS9</code>. Use this to split large USB libraries, but do not assume every support file is inherited from the main folder.</p>
        <pre><code>mass:/POPS/POPS_IOX.PAK
mass:/POPS/IGR_BG.TM2
mass:/POPS0/Crash Bandicoot.VCD
mass:/POPS0/Crash Bandicoot/CHEATS.TXT
mass:/POPS1/Soul Blade.VCD
mass:/POPS1/Soul Blade/CHEATS.TXT</code></pre>
        <p><code>POPS_IOX.PAK</code> and IGR texture files stay in the main <code>POPS</code> folder. Handler or patch files such as <code>BIOS.BIN</code>, <code>PATCH_#.BIN</code>, <code>TROJAN_#.BIN</code>, and <code>VMCDIR.TXT</code> must be copied into the specific <code>POPS#</code> folder that needs them.</p>
      </section>`,
      `<section>
        <h2>Hugopocked fixes on USB</h2>
        <p>Place game-specific fixes in the folder matching the VCD basename. If the VCD is <code>123.VCD</code>, the support folder is <code>mass:/POPS/123/</code>. If the VCD is <code>SLUS_002.40.Soul Blade.VCD</code>, the support folder is <code>mass:/POPS/SLUS_002.40.Soul Blade/</code>.</p>
      </section>`,
      `<section>
        <h2>USB exFAT with BDM Assault</h2>
        <p>For exFAT USB, use BDM Assault as driver substitution. The two BDM modules are renamed into the names POPStarter expects:</p>
        <pre><code>bdm_assault.irx -> mc?:/POPSTARTER/usbd.irx
usbd_bd_assault.irx -> mc?:/POPSTARTER/usbhdfsd.irx</code></pre>
        <p>FreeMcBoot workflows may also use <code>mc?:/SYS-CONF/USBD.IRX</code> and <code>mc?:/SYS-CONF/USBHDFSD.IRX</code>, but that is a separate placement from POPStarter's own memory-card folder.</p>
      </section>`
    ]
  },
  {
    slug: "internal-hdd",
    title: "Internal HDD Setup",
    nav: "HDD",
    description: "Internal APA/PFS POPStarter setup for OPL Apps, OPL DB/PS1 page, wLE_kHn, multi-disc, Hugopocked fixes, and APA-Jail boundaries.",
    blocks: [
      `<section class="callout">
        <h2>The spelling matters</h2>
        <p>Internal HDD setups revolve around two locations: <code>hdd:/__.POPS/</code> for VCDs and <code>hdd:/__common/POPS/</code> for common POPS files and per-game support folders. The dot in <code>__.POPS</code> is part of the name.</p>
      </section>`,
      `<section>
        <h2>OPL Apps page: per-game renamed ELF</h2>
        <p>This mirrors the USB OPL Apps model, but the game image and POPS files are on APA/PFS paths while the visible app entry is under <code>+OPL/APPS</code>.</p>
        <pre><code>hdd:/__.POPS/SLUS_002.40.Soul Blade.VCD
hdd:/__common/POPS/IOPRP252.IMG
hdd:/__common/POPS/POPS.ELF
hdd:/__common/POPS/POPSTARTER.ELF
hdd:/__common/POPS/SLUS_002.40.Soul Blade/
hdd:/+OPL/APPS/Soul Blade/SLUS_002.40.Soul Blade.ELF
hdd:/+OPL/APPS/Soul Blade/title.cfg</code></pre>
        <pre><code>title=[PS1] Soul Blade
boot=SLUS_002.40.Soul Blade.ELF</code></pre>
        <p>ElOtroLado and PSX-Place support discussion warn that OPL network/BDM/SMB Auto start modes can hang HDD POPStarter Apps launch. Set unused devices to Manual or Disabled when troubleshooting a black screen with the HDD LED stuck.</p>
      </section>`,
      `<section>
        <h2>OPL DB / PS1 page</h2>
        <p>This modern OPL/fork path keeps the launcher files in <code>__common/POPS</code> and VCDs in <code>__.POPS</code>.</p>
        <pre><code>hdd:/__.POPS/SLUS_002.40.Soul Blade.VCD
hdd:/__common/POPS/IOPRP252.IMG
hdd:/__common/POPS/POPS.ELF
hdd:/__common/POPS/POPSTARTER.ELF
hdd:/__common/POPS/POPS_IOX.PAK</code></pre>
        <p>The local Discord screenshot records <code>hdd0:/__common/POPS/POPSTARTER.ELF</code> as a working POPStarter path in that user's test. Keep it as user-tested evidence, not as a replacement for every frontend's own path rules.</p>
      </section>`,
      `<section>
        <h2>wLE_kHn on HDD</h2>
        <p>wLE_kHn can be installed as a BOOT.ELF target and/or launched through OPL Apps while VCDs remain under <code>__.POPS</code>.</p>
        <pre><code>mc0:/BOOT/BOOT.ELF
hdd:/__.POPS/SLUS_002.40.Soul Blade.VCD
hdd:/__common/POPS/IOPRP252.IMG
hdd:/__common/POPS/POPS.ELF
hdd:/__common/POPS/POPSTARTER.ELF
hdd:/__common/POPS/POPS_IOX.PAK
hdd:/+OPL/APPS/wLE_kHn_20200810/wLE_kHn_20200810.ELF
hdd:/+OPL/APPS/wLE_kHn_20200810/title.cfg</code></pre>
      </section>`,
      `<section>
        <h2>Hugopocked fixes on HDD</h2>
        <p>Use the per-game support folder under <code>__common/POPS</code>, not <code>__.POPS</code>:</p>
        <pre><code>hdd:/__common/POPS/SLUS_002.40.Soul Blade/</code></pre>
      </section>`,
      `<section class="callout warning">
        <h2>Internal exFAT boundary</h2>
        <p>The raw notes are explicit: POPStarter core does not support internal exFAT storage for the POPS/VCD side. APA-Jail can be used as a hybrid app-side convenience, but the POPS data remains on APA/PFS paths.</p>
      </section>`,
      `<section>
        <h2>Modern split HDD folders</h2>
        <p>The modern HDD launch type keeps VCDs in <code>__.POPS</code> or <code>__.POPS0</code> through <code>__.POPS9</code>, while common emulator files and per-game support folders stay in <code>__common/POPS</code>.</p>
        <pre><code>hdd0:/__.POPS/Soul Blade.VCD
hdd0:/__.POPS0/Crash Bandicoot.VCD
hdd0:/__common/POPS/POPS.ELF
hdd0:/__common/POPS/IOPRP252.IMG
hdd0:/__common/POPS/Soul Blade/CHEATS.TXT</code></pre>
        <p>Do not create <code>+__.POPS</code>. The leading plus belongs to normal OPL app/game partitions, not this POPStarter VCD location.</p>
      </section>`,
      `<section>
        <h2>Legacy partition-installed games</h2>
        <p>Older HDDOSD/PSBBN-style setups can install each game into its own partition. In those workflows every game image inside the partition is named <code>IMAGE0.VCD</code>; the partition name carries the game identity.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Mode</th><th>Partition</th><th>Image path</th><th>What it means</th></tr></thead>
          <tbody>
            <tr><td>Visible HDDOSD</td><td><code>PP.&lt;Game&gt;</code></td><td><code>hdd0:/PP.&lt;Game&gt;/IMAGE0.VCD</code></td><td>Visible partition-install route, commonly paired with <code>POPSTARTER.KELF</code> or HDDOSD metadata.</td></tr>
            <tr><td>Hidden alternate</td><td><code>__.&lt;Game&gt;</code></td><td><code>hdd0:/__.&lt;Game&gt;/IMAGE0.VCD</code></td><td>Hidden per-game partition route, distinct from the shared <code>__.POPS</code> folder.</td></tr>
          </tbody>
        </table></div>
        <pre><code>BOOT2 = pfs:/IMAGE0.VCD
VER = 1.00
VMODE = NTSC</code></pre>
      </section>`,
      `<section>
        <h2>APA-Jail hybrid example</h2>
        <pre><code>exfat:hdd:APPS/Soul Blade/SLUS_002.40.Soul Blade.ELF
exfat:hdd:APPS/Soul Blade/title.cfg
apa:hdd:/__.POPS/SLUS_002.40.Soul Blade.VCD
apa:hdd:/__common/POPS/IOPRP252.IMG
apa:hdd:/__common/POPS/POPS.ELF
apa:hdd:/__common/POPS/POPSTARTER.ELF
apa:hdd:/__common/POPS/POPS_IOX.PAK</code></pre>
      </section>`
    ]
  },
  {
    slug: "bdm-exfat",
    title: "BDM / exFAT",
    nav: "BDM / exFAT",
    description: "How BDM Assault adds exFAT USB support to POPStarter through driver substitution, and what it does not change.",
    blocks: [
      `<section class="callout">
        <h2>BDM Assault is driver substitution</h2>
        <p>BDM Assault gives exFAT USB support to older closed-source PS2 homebrew that can load external USB drivers. For POPStarter, that means replacing the USB driver filenames POPStarter looks for on memory card. It is not native POPStarter exFAT support, and it is not internal HDD exFAT support.</p>
      </section>`,
      `<section>
        <h2>POPStarter placement</h2>
        <pre><code>bdm_assault.irx -> mc?:/POPSTARTER/usbd.irx
usbd_bd_assault.irx -> mc?:/POPSTARTER/usbhdfsd.irx</code></pre>
        <p>The destination names are lower-case in the POPStarter folder because POPStarter is looking for those external driver names.</p>
      </section>`,
      `<section>
        <h2>FreeMcBoot placement</h2>
        <pre><code>bdm_assault.irx -> mc?:/SYS-CONF/USBD.IRX
usbd_bd_assault.irx -> mc?:/SYS-CONF/USBHDFSD.IRX</code></pre>
        <p>This helps FreeMcBoot-side USB behavior. It does not replace the POPStarter-specific placement above when POPStarter needs its own external USB drivers.</p>
      </section>`,
      `<section>
        <h2>Practical checks</h2>
        <ul>
          <li>Use the BDM files from the BDM Assault project; do not rename unrelated USB drivers and expect exFAT to work.</li>
          <li>Keep the normal POPStarter USB layout after the driver substitution: VCDs and support folders still live under <code>mass:/POPS/</code>.</li>
          <li>For POPSLoader fork non-HDD devices, the fork notes say BDMA is required and only one BDMA mode can be active at once.</li>
          <li>If FAT32 works and exFAT does not, debug the BDM module placement before changing the POPStarter game layout.</li>
        </ul>
      </section>`
    ]
  },
  {
    slug: "storage-matrix",
    title: "Storage Matrix",
    description: "Filter storage and launcher layouts by backend, launcher, and evidence strength.",
    blocks: [
      `<section class="callout">
        <h2>Read before copying paths</h2>
        <p>Paths here intentionally preserve source status. User-tested modern workflows are useful, but older core POPStarter documentation may not mention OPL DB, MMCE, MX4SIO, or POPSLoader fork behavior.</p>
      </section>`,
      { dynamic: "storageMatrix" }
    ]
  },
  {
    slug: "popsloader-guide",
    title: "POPSLoader Guide",
    nav: "POPSLoader",
    description: "A boundary-focused guide to POPSLoader, the modern fork, device modes, BDMA, art paths, and what must not be attributed to stock POPStarter.",
    blocks: [
      `<section class="callout">
        <h2>Not stock POPStarter</h2>
        <p>POPSLoader is a separate launcher line. It can make a POPStarter library easier to browse, and modern forks add device support that stock POPStarter never had, but its folder rules and settings should not be presented as original POPStarter core behavior.</p>
      </section>`,
      `<section>
        <h2>Original POPSLoader</h2>
        <p>El_isra's POPSLoader is described as a Lua/Enceladus launcher for POPStarter. Its practical rule is simple: keep <code>POPSLOADER.ELF</code> and the <code>POPSLDR/</code> folder together. If that folder is missing or moved, the launcher may boot but lose its resources, list handling, or expected UI files.</p>
        <pre><code>mass:/APPS/PS1_POPSLDR/POPSLOADER.ELF
mass:/APPS/PS1_POPSLDR/POPSLDR/
mass:/APPS/PS1_POPSLDR/title.cfg</code></pre>
      </section>`,
      `<section>
        <h2>Modern fork boundary</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Capability</th><th>Where it belongs</th><th>Do not confuse it with</th></tr></thead>
          <tbody>
            <tr><td>MX4SIO / MMCE / expanded USB device flow</td><td>POPSLoader fork behavior.</td><td>Original POPStarter storage support.</td></tr>
            <tr><td>BDMA mode selection</td><td>Fork setting for non-HDD devices; only one active BDMA mode should be selected.</td><td>Native exFAT support inside POPStarter core.</td></tr>
            <tr><td>APAHDD support and HDD launch fixes</td><td>Fork release behavior and hardware-tested notes.</td><td>The older POPStarter HDDOSD/KELF install route.</td></tr>
            <tr><td>Triangle exit-menu shortcut</td><td>POPSLoader fork exit menu behavior.</td><td>Stock POPStarter IGR menu commands.</td></tr>
            <tr><td>Art paths and UI resources</td><td>Fork/launcher presentation layer.</td><td>POPStarter compatibility, VMC, or POPS emulator behavior.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Device-mode checklist</h2>
        <ol>
          <li>Confirm the fork expects <code>mc0</code> for the current setup before moving support files to <code>mc1</code>.</li>
          <li>For USB, MX4SIO, or MMCE paths, enable BDMA only for the device family you are actually using.</li>
          <li>Keep <code>POPSTARTER.ELF</code> on a path the fork documents for the selected backend.</li>
          <li>Keep VCDs in the backend's normal POPS location: USB-style <code>POPS/</code> for removable devices or HDD <code>__.POPS</code> for APA/PFS.</li>
          <li>If games vanish from the fork UI, debug the launcher device setting before rewriting POPStarter game folders.</li>
        </ol>
      </section>`,
      `<section class="callout warning">
        <h2>Documentation rule</h2>
        <p>If a setup step names POPSLoader, BDMA, MX4SIO, MMCE, fork art, or fork exit-menu behavior, label it as launcher/fork behavior. If a setup step names <code>CHEATS.TXT</code>, <code>PATCH_#.BIN</code>, <code>TROJAN_#.BIN</code>, <code>DISCS.TXT</code>, <code>VMCDIR.TXT</code>, or POPStarter's storage prefixes, it may belong to POPStarter core.</p>
      </section>`
    ]
  },
  {
    slug: "launcher-matrix",
    title: "Launcher Matrix",
    description: "Understand which launcher model owns which file layout.",
    blocks: [
      `<section class="compare">
        <article><h2>Renamed POPSTARTER.ELF</h2><p>The classic model makes a copy of <code>POPSTARTER.ELF</code> per game and renames it for the target backend. USB examples use prefixes such as <code>XX.</code>; SMB uses <code>SB.</code>; HDD examples often use the game ID/title directly. The renamed ELF and the VCD/support folder must agree with the launcher model.</p></article>
        <article><h2>OPL Apps</h2><p>OPL Apps is a frontend for launching an ELF, not a POPStarter storage mode by itself. Each app entry needs a folder, a renamed ELF, and a <code>title.cfg</code> whose <code>boot=</code> line exactly matches that ELF filename. HDD launches may hang if unused OPL devices are set to Auto.</p></article>
        <article><h2>OPL DB / PS1 page</h2><p>Modern OPL forks can expose PS1 games without one APPS entry per title. These workflows use discovery paths such as <code>mass:/POPS/POPSTARTER.ELF</code> or <code>hdd:/__common/POPS/POPSTARTER.ELF</code>. Label them as fork/frontend behavior, not original POPStarter core documentation.</p></article>
        <article><h2>wLE_kHn</h2><p>wLE_kHn launches VCDs directly and can avoid a per-game ELF farm. The raw notes recommend cleaner VCD names without game IDs for nicer browsing. It still needs the normal POPS files and per-game support folders for the chosen backend.</p></article>
        <article><h2>POPSLoader</h2><p>El_isra's POPSLoader is a Lua/Enceladus standalone launcher. Its <code>POPSLDR</code> folder must stay beside <code>POPSLOADER.ELF</code>. The Ripto/NathanNeurotic fork extends this model for USB, HDD, MX4SIO, MMCE, and BDMA, with fork-specific settings and art paths.</p></article>
        <article><h2>HDDOSD / KELF</h2><p>Recovered wiki material describes <code>POPSTARTER.KELF</code> for Browser 2.00 / HDDOSD installs. This is a legacy per-game-partition route with <code>PP.</code> partitions and <code>IMAGE0.VCD</code>, not the modern shared <code>__.POPS</code> HDD workflow.</p></article>
      </section>`,
      `<section>
        <h2>Launcher selection rules</h2>
        <ul class="checklist">
          <li>If the route has a <code>title.cfg</code>, verify <code>boot=</code> before changing any POPStarter files.</li>
          <li>If the route uses OPL DB/PS1 page behavior, do not invent APPS folders unless that frontend also supports them.</li>
          <li>If the route uses SMB, the renamed ELF must use the <code>SB.</code> prefix and the memory-card network module folder must exist.</li>
          <li>If the route uses POPSLoader or the POPSLoader fork, keep those paths separate from original POPStarter core claims.</li>
          <li>If a guide says "works on all OPL versions" in the raw notes, keep it as user-tested evidence and still preserve source confidence labels.</li>
        </ul>
      </section>`
    ]
  },
  {
    slug: "device-irx-modules",
    title: "Device and IRX Modules",
    nav: "Device / IRX",
    description: "Recovered IRX loader behavior, MODULE_0.IRX through MODULE_9.IRX placement, DS3 modules, and special-device experiments.",
    blocks: [
      `<section class="callout warning">
        <h2>Experimental module loading is not a universal fix</h2>
        <p>The recovered wiki has useful pages for IRX loading, DualShock 3 modules, and special PlayStation devices. These are advanced compatibility tools. They should not be copied into every install or used as a replacement for normal POPStarter storage setup.</p>
      </section>`,
      `<section>
        <h2>IRX loader rule</h2>
        <p>POPStarter can load up to ten IOP modules after the IOP reset, alongside the POPS IOPRP environment. The module filenames are fixed: <code>MODULE_0.IRX</code> through <code>MODULE_9.IRX</code>.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Rule</th><th>What it means</th><th>Common mistake</th></tr></thead>
          <tbody>
            <tr><td>Fixed names</td><td>Use <code>MODULE_0.IRX</code>, <code>MODULE_1.IRX</code>, and so on.</td><td>Leaving source names such as <code>USBD.IRX</code> when the loader expects numbered names.</td></tr>
            <tr><td>POPS folder placement</td><td>Put modules in the backend's POPS folder, not in a VMC or per-game save folder.</td><td>Putting modules beside <code>CHEATS.TXT</code> and wondering why they never load.</td></tr>
            <tr><td>Order matters</td><td>Lower module numbers load first. Dependency modules should come before modules that use them.</td><td>Loading a pad, SIO, or device module before its dependency.</td></tr>
            <tr><td>Build behavior matters</td><td>Old WIP/RIP/prototype builds may have different loader bugs or module expectations.</td><td>Debugging a module recipe on the wrong POPStarter build.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Placement examples</h2>
        <pre><code>USB:
mass:/POPS/MODULE_0.IRX
mass:/POPS/MODULE_1.IRX
mass:/POPS/MODULE_2.IRX

HDD common folder:
hdd0:/__common/POPS/MODULE_0.IRX
hdd0:/__common/POPS/MODULE_1.IRX

SMB share:
POPS/MODULE_0.IRX
POPS/MODULE_1.IRX</code></pre>
        <p>If a USB setup uses split folders such as <code>POPS0</code> through <code>POPS9</code>, verify which POPS folder the launcher is actually using before assuming modules in <code>POPS/</code> are inherited.</p>
      </section>`,
      `<section>
        <h2>DualShock 3 notes</h2>
        <p>The recovered DS3 page attributes the modules to belek666 and describes them as working with WIP 06 beta-era and RIP 06 builds, while warning that prototypes are affected by an IRX-loader bug. That makes DS3 support a build-sensitive experiment, not a final-r13 default promise.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Numbered module</th><th>Recovered role</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><code>MODULE_1.IRX</code></td><td><code>USBD.IRX</code></td><td>USB dependency module for the DS3 setup.</td></tr>
            <tr><td><code>MODULE_2.IRX</code></td><td><code>usb_pademu.irx</code> or <code>bt_pademu.irx</code></td><td>Pad emulation module; use the USB or Bluetooth variant that matches the setup.</td></tr>
            <tr><td><code>CHEATS.TXT</code></td><td><code>$D2LS</code> when needed</td><td>The page ties analog/digital behavior to <code>PS+Select</code> and a per-game <code>$D2LS</code> command.</td></tr>
          </tbody>
        </table></div>
        <p>Do not put DS3 modules into the game's VMC folder. The DS3 page is explicit that ready modules go in the POPS folder.</p>
      </section>`,
      `<section>
        <h2>Special-device experiment flow</h2>
        <p>The recovered special-device tutorial is an AKuHAK-style experiment for unusual PS1 peripherals. The pattern is to borrow matching modules from a PS2 title that supports the device, then test module order under POPStarter.</p>
        <ol>
          <li>Find a PS2 game that supports the target special device.</li>
          <li>Extract its <code>SIO2MAN.IRX</code> and rename it to <code>MODULE_0.IRX</code>.</li>
          <li>Extract the device-specific IRX modules and number them as <code>MODULE_1.IRX</code>, <code>MODULE_2.IRX</code>, and onward.</li>
          <li>Put the numbered modules in the POPS folder for the backend being tested.</li>
          <li>Test one module order at a time and record the exact build, game, device, and source title.</li>
        </ol>
        <p>This is intentionally not a guaranteed recipe. Module origin, version, load order, and game behavior all matter.</p>
      </section>`,
      `<section class="callout">
        <h2>Driver myth boundary</h2>
        <p>IRX loading can help with specific input or special-device experiments. It does not mean random HDD, USB, or SMB drivers can be dropped into <code>__common/POPS</code> to create a new storage backend. Storage support still follows the backend rules in <a href="storage-overview.html">Storage Backends</a>.</p>
      </section>`
    ]
  },
  {
    slug: "display-code-appendix",
    title: "Display and Code Appendix",
    nav: "Display / Codes",
    description: "Recovered widescreen, scanline, smoothing, D2LS, and large PS1 RAW / PS2 RAW code archive handling notes.",
    blocks: [
      `<section class="callout">
        <h2>Appendix, not a preset pack</h2>
        <p>The recovered wiki includes visual-option pages and very large raw-code archives. This page preserves how to reason about them without dumping giant code lists into the public manual or implying that one global display/code preset fits every game.</p>
      </section>`,
      `<section>
        <h2>Widescreen family</h2>
        <p><code>$WIDESCREEN</code>, <code>$ULTRA_WIDESCREEN</code>, and <code>$EYEFINITY</code> are geometry/projection hacks. They can widen 3D scenes, but they do not repair 2D backgrounds, menus, fonts, HUD elements, prerendered screens, or every camera assumption a game makes.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Command</th><th>Intended shape</th><th>Do not expect</th></tr></thead>
          <tbody>
            <tr><td><code>$WIDESCREEN</code></td><td>16:9-style GTE/FOV adjustment.</td><td>Automatic HUD, text, menu, or 2D background correction.</td></tr>
            <tr><td><code>$ULTRA_WIDESCREEN</code></td><td>Wider projection variant; older docs may contain spelling drift.</td><td>Proof that a given game is safe without testing.</td></tr>
            <tr><td><code>$EYEFINITY</code></td><td>Extreme multi-display-style projection experiment.</td><td>A practical default for normal CRT, HDMI, or component setups.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Smoothing and scanlines</h2>
        <div class="compare">
          <article><h3><code>$SMOOTH</code></h3><p>Enables POPS texture smoothing behavior. It is a visual preference and can make some 2D art look less crisp.</p></article>
          <article><h3><code>$SCANLINES</code></h3><p>Adds a scanline effect. Treat it as a display/aesthetic setting, not as a compatibility fix.</p></article>
          <article><h3>Screenshot pages</h3><p>The old wiki preserved visual comparison pages. They are useful for understanding the effect, but the public site does not need to mirror every screenshot to document the command.</p></article>
        </div>
      </section>`,
      `<section>
        <h2>D2LS and digital-mode behavior</h2>
        <p><code>$D2LS</code> means left stick as D-pad. The recovered D2LS page ties the code family to PS2 Controller Remapper output and to games or controllers that need digital-style input behavior.</p>
        <ul class="checklist">
          <li>Use <code>$D2LS</code> per game, not globally.</li>
          <li>Try <code>$D2LS_ALT</code> only when the normal command does not behave correctly for that title/controller path.</li>
          <li>For DS3 module experiments, keep <code>$D2LS</code> in the game's <code>CHEATS.TXT</code> and the IRX modules in the POPS folder.</li>
          <li>If a game already expects analog behavior, forcing digital mapping can create new input bugs.</li>
        </ul>
      </section>`,
      `<section>
        <h2>PS1 RAW and PS2 RAW code archives</h2>
        <p>The recovered wiki includes huge PS1 RAW and PS2 RAW code archives. They are valuable as an index, but copying them wholesale into every page would make the manual worse: too large to search usefully, too easy to misapply, and too detached from game revision/region context.</p>
        <ol>
          <li>Identify the exact game ID, region, and disc revision before using a code.</li>
          <li>Prefer a PS2 RAW code that is already documented for POPStarter/POPS when one exists.</li>
          <li>Treat PS1 RAW codes as source material that may need conversion, master-code handling, or timing changes.</li>
          <li>Use <code>$SAFEMODE</code> when applying raw cheat/code lines in <code>CHEATS.TXT</code>.</li>
          <li>Test one code group at a time so a bad code does not get mistaken for a bad VCD or bad storage setup.</li>
          <li>Record the source archive, code title, game ID, and observed result in any compatibility note.</li>
        </ol>
      </section>`,
      `<section class="callout warning">
        <h2>Code archive rule</h2>
        <p>Raw codes are not compatibility modes. A wrong raw code can boot to black screen, corrupt runtime state, or hide the actual issue. Keep the <a href="cheat-engine.html">Cheat Engine</a> page as the operating manual and use this appendix as archive guidance.</p>
      </section>`
    ]
  },
  {
    slug: "version-integrity",
    title: "Version and Integrity",
    nav: "Version / Integrity",
    description: "Build identification offsets, final-build boundary, old RIP/WIP caveats, hash discipline, and tampered-bundle warnings.",
    blocks: [
      `<section class="callout">
        <h2>Verify the build before debugging</h2>
        <p>Many POPStarter contradictions come from mixing old RIP/WIP/prototype behavior with final r13 instructions. Before debugging commands, IGR, IRX modules, or config bytes, identify the exact launcher build.</p>
      </section>`,
      `<section>
        <h2>Hex identification</h2>
        <p>The recovered version page says the build identity can be checked directly in <code>POPSTARTER.ELF</code> with a hex editor. This is a verification method, not a download instruction.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Where to inspect</th><th>Meaning</th><th>How to use it</th></tr></thead>
          <tbody>
            <tr><td>Offset <code>$59</code></td><td>Build date area.</td><td>Check whether the visible date matches the package/build being documented.</td></tr>
            <tr><td>Starting at <code>$5E</code></td><td>Build ID area.</td><td>Compare against source notes before applying build-specific fixes.</td></tr>
            <tr><td>Final public baseline</td><td>Rev 13 Beta 2019/06/05.</td><td>Use this as the normal documentation target unless intentionally testing old behavior.</td></tr>
            <tr><td>Old beta/prototype IDs</td><td>Some old beta ranges share IDs; many prototypes use different markers.</td><td>Do not collapse old build labels into final r13 behavior without proof.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Final build boundary</h2>
        <ul class="checklist">
          <li>Final public build: r13 Beta 2019/06/05.</li>
          <li>Recovered history says the final build includes the Jan 14 2019 USB driver line.</li>
          <li>Recovered history also says <code>$IGR5</code> was likely fixed in this final public beta.</li>
          <li>Normal docs should target the final build unless a page is explicitly about WIP/RIP/prototype behavior.</li>
        </ul>
      </section>`,
      `<section>
        <h2>Old package caveats</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Package family</th><th>Why it still matters</th><th>Documentation stance</th></tr></thead>
          <tbody>
            <tr><td>RIP builds</td><td>Old public packages and module experiments may reference them.</td><td>Label as old and build-specific; do not present as preferred setup.</td></tr>
            <tr><td>WIP / OBT builds</td><td>Some features, bytes, and module-loader notes changed over time.</td><td>Useful for history and experiments only when the source names that build.</td></tr>
            <tr><td>Prototypes</td><td>May expose behavior that was broken, changed, or never meant for normal users.</td><td>Archive context, not user-facing default instructions.</td></tr>
            <tr><td>Modern fix packs</td><td>Can post-date final r13 and add compatibility layers.</td><td>Document as external fixes, not as changes inside the final ELF.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Tampered-bundle warning</h2>
        <p>The recovered warning pages are useful because they teach an integrity lesson: avoid modified repacks that remove credits, alter logos, obscure provenance, or make aggressive claims about "fixed" builds without hashes and source labels. The public site does not need to repeat personal drama to keep users safe.</p>
        <p>Use hashes, build IDs, filenames, package role, and source labels. If a package cannot be identified, treat it as unknown even if it has a familiar filename.</p>
      </section>`,
      `<section>
        <h2>Verification checklist</h2>
        <ol>
          <li>Record the exact filename and package label.</li>
          <li>Record any available SHA or hash identifier.</li>
          <li>Check the build date area near offset <code>$59</code>.</li>
          <li>Check the build ID area starting around <code>$5E</code>.</li>
          <li>Classify the file as final r13, old RIP/WIP, prototype, fix pack, or unknown.</li>
          <li>Only then apply build-specific command, config-byte, IRX, or IGR advice.</li>
        </ol>
      </section>`,
      `<section class="callout legal">
        <h2>Preservation boundary</h2>
        <p>This site can preserve package names, roles, source labels, and hashes. It must not host proprietary POPS files or add direct binary download links.</p>
      </section>`
    ]
  },
  {
    slug: "faq-known-bugs",
    title: "FAQ and Known Bugs",
    nav: "FAQ",
    description: "Fast answers for common POPStarter setup questions, known limitations, legal boundaries, and source-backed failure modes.",
    blocks: [
      `<section class="callout">
        <h2>Use this page as a triage front door</h2>
        <p>If the setup fails, start here before applying random commands. Most failures are path, prefix, file-case, share-permission, or old-build problems rather than true game incompatibility.</p>
      </section>`,
      `<section>
        <h2>Questions and answers</h2>
        <div class="issue-list">
        <article class="issue"><h3>Why is my game a black screen?</h3><p>Separate boot black screens from IGR exit black screens. A HDD Apps launch with the HDD LED stuck often points to OPL devices left on Auto. A black screen after IGR usually points to the <code>BOOT.ELF</code> exit chain or the loader-disable <code>PATCH_9.BIN</code> issue.</p></article>
        <article class="issue"><h3>How do I force PAL or fix 50/60 Hz?</h3><p>Use <code>$FORCEPAL</code>, <code>$NOPAL</code>, and <code>$YPOS_##</code> only for a specific region/display symptom. Do not globally add display commands just because a list mentions them.</p></article>
        <article class="issue"><h3>Does POPStarter support exFAT?</h3><p>Stock POPStarter does not add internal HDD exFAT support. USB exFAT requires BDM Assault-style driver substitution or a modern launcher path that explicitly documents BDMA behavior.</p></article>
        <article class="issue"><h3>My cheats do nothing. Why?</h3><p>Check uppercase <code>CHEATS.TXT</code>, the exact per-game support folder, and raw-code timing. Raw GameShark/Action Replay-style codes generally need <code>$SAFEMODE</code>; POPStarter special commands do not.</p></article>
        <article class="issue"><h3>My USB drive is not detected.</h3><p>Config byte <code>$413</code> affects POPStarter USB access delay before the device is reached. The <code>$USBDELAY_#</code> command affects POPS streaming behavior later. They solve different classes of problems.</p></article>
        <article class="issue"><h3>Saves disappear after reboot.</h3><p>Confirm <code>SLOT0.VMC</code> and <code>SLOT1.VMC</code> are being created in the expected per-game folder. On SMB, write permission is required. On multi-disc sets, later discs usually need <code>VMCDIR.TXT</code> pointing back to disc 1.</p></article>
        <article class="issue"><h3>Does it support physical PS1 memory cards?</h3><p>No. The recovered FAQ material treats POPS saving as VMC-based; physical PS1 memory-card saving is not the route to debug.</p></article>
        <article class="issue"><h3>Does it support multitap?</h3><p>The recovered FAQ material says no: only the first two controllers are recognized.</p></article>
        <article class="issue"><h3>Which buttons open IGR?</h3><p>Use <code>$IGR0</code>, <code>$IGR1</code>, or <code>$IGR2</code> for menu IGR, and <code>$IGR3</code>, <code>$IGR4</code>, or <code>$IGR5</code> for no-popup direct close. The OPL-like macro is <code>L1+L2+R1+R2+Start+Select</code>.</p></article>
        <article class="issue"><h3>What is the latest canonical POPStarter build?</h3><p>Use r13 Beta 2019/06/05 as the final public build unless you are deliberately testing older WIP/RIP behavior. Old instructions can describe pre-final byte meanings and broken commands.</p></article>
        <article class="issue"><h3>Does widescreen work?</h3><p>Widescreen commands are GTE/FOV hacks. They do not repair HUDs, fonts, menus, 2D backgrounds, or every game. Treat them as per-game experiments.</p></article>
        <article class="issue"><h3>Where are the emulator binaries?</h3><p>Not here. This site may identify proprietary POPS files by filename, role, and hash-style verification, but it must not host or link Sony emulator binaries or package mirrors.</p></article>
        </div>
      </section>`
    ]
  },
  {
    slug: "cheat-engine",
    title: "Cheat Engine",
    nav: "Cheat Engine",
    description: "How CHEATS.TXT, special commands, raw PS1 codes, SAFEMODE, LibCrypt workarounds, and command timing fit together.",
    blocks: [
      `<section class="callout">
        <h2>CHEATS.TXT is a per-game control file</h2>
        <p>Put <code>CHEATS.TXT</code> in the support folder matching the VCD basename. On case-sensitive paths, <code>CHEATS.txt</code> or <code>cheats.txt</code> can silently fail.</p>
      </section>`,
      `<section>
        <h2>Two different things live in the same file</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Line type</th><th>What it controls</th><th>Timing rule</th></tr></thead>
          <tbody>
            <tr><td>POPStarter special command</td><td><code>$SMOOTH</code>, <code>$HDTVFIX</code>, <code>$IGR5</code>, <code>$COMPATIBILITY_0x04</code>, and similar directives.</td><td>Handled by POPStarter; no raw-code master command is required.</td></tr>
            <tr><td>Raw PS1 cheat code</td><td>GameShark/Action Replay-style memory writes and converted PS1 codes.</td><td>Usually start the file with <code>$SAFEMODE</code> so codes are delayed until the game is ready.</td></tr>
            <tr><td>C0/master-code line</td><td>External master-code behavior from old cheat ecosystems.</td><td>Keep source-specific; wrong master-code assumptions can prevent boot or hide the real issue.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Recommended file anatomy</h2>
        <pre><code>$SAFEMODE
$IGR5
$SMOOTH
$COMPATIBILITY_0x04

# raw PS1 code lines below, only when needed
# $address value</code></pre>
        <p>Comments are shown here for readability. If a source-specific parser is suspected to reject comments, keep the real file to command/code lines only.</p>
      </section>`,
      `<section>
        <h2>LibCrypt ladder</h2>
        <ol>
          <li>First check whether the final r13 build already includes a built-in fix for that game/disc ID.</li>
          <li>If a LibCrypt-sensitive disc still freezes, try <code>$FAKELC</code>.</li>
          <li>Only use an explicit raw LibCrypt code block when the target disc revision is documented. Wrong anti-protection codes can break a good image.</li>
        </ol>
        <p>The recovered corpus calls out Jackie Chan Stuntmaster <code>SCES-01444</code> as a useful example: it has built-in LibCrypt coverage, but some disc batches may still require fallback handling.</p>
      </section>`,
      `<section>
        <h2>Common cheat-engine failures</h2>
        <ul class="checklist">
          <li><strong>Wrong folder:</strong> support folder includes <code>.VCD</code> or uses a display title instead of the VCD basename.</li>
          <li><strong>Wrong case:</strong> <code>CHEATS.TXT</code> is not uppercase.</li>
          <li><strong>No <code>$SAFEMODE</code>:</strong> raw codes run before the game is ready.</li>
          <li><strong>Global thinking:</strong> display or compatibility commands are copied to every game instead of applied to one symptom.</li>
          <li><strong>Mode stacking:</strong> <code>0x01</code>, <code>0x02</code>, <code>0x03</code>, and <code>0x05</code> should not be stacked with each other.</li>
        </ul>
      </section>`,
      { dynamic: "commandReference" }
    ]
  },
  {
    slug: "compatibility-deep-dive",
    title: "Compatibility Deep Dive",
    nav: "Compatibility Deep Dive",
    description: "Compatibility rates, mode stacking, per-game examples, Hugopocked fixes, TROJAN_7, LibCrypt coverage, and fix provenance.",
    blocks: [
      `<section class="callout">
        <h2>Compatibility is not one switch</h2>
        <p>POPStarter compatibility can come from automatic built-in fixes, <code>CHEATS.TXT</code> commands, forced config bytes, standalone <code>PATCH_#.BIN</code> files, <code>TROJAN_#.BIN</code> files, or per-game community fix packs. Record which layer you changed before testing.</p>
      </section>`,
      `<section>
        <h2>2016 compatibility snapshot</h2>
        <p>The recovered 2017 wiki snapshot preserved compatibility-rate figures dated 2016-04-21. Treat them as a historical benchmark, not a current guarantee.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Backend / region</th><th>Playable rate</th><th>Count</th></tr></thead>
          <tbody>
            <tr><td>HDD PAL</td><td>78%</td><td>343 / 438</td></tr>
            <tr><td>HDD NTSC</td><td>75%</td><td>165 / 219</td></tr>
            <tr><td>USB PAL</td><td>79%</td><td>298 / 377</td></tr>
            <tr><td>USB NTSC</td><td>83%</td><td>211 / 252</td></tr>
            <tr><td>SMB PAL</td><td>76%</td><td>133 / 174</td></tr>
            <tr><td>SMB NTSC</td><td>80%</td><td>92 / 114</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Mode stacking rule</h2>
        <p>Modes <code>0x01</code>, <code>0x02</code>, <code>0x03</code>, and <code>0x05</code> touch CD-status behavior and should not be combined with each other. Modes <code>0x04</code>, <code>0x06</code>, and <code>0x07</code> are more likely to combine safely, but still test per title.</p>
        <p>Tekken 3 is preserved in the corpus as a useful example for combining <code>0x06</code> and <code>0x04</code>. That does not mean every game should receive that pair.</p>
      </section>`,
      `<section>
        <h2>Hugopocked versus TROJAN_7</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Fix family</th><th>Scope</th><th>Placement</th><th>Trap</th></tr></thead>
          <tbody>
            <tr><td>Hugopocked per-game fixes</td><td>Specific games and revisions.</td><td>Per-game support folder matching the VCD basename.</td><td>Using the fix as a universal patch.</td></tr>
            <tr><td><code>TROJAN_7.BIN</code> cumulative fix pack</td><td>Global POPStarter-side cumulative line after the final r13 build.</td><td>POPS folder, pending package verification for exact public recipe.</td><td>Stacking it with a per-game Hugopocked fix for the same game can add crashes.</td></tr>
            <tr><td><code>PATCH_#.BIN</code> compatibility files</td><td>Mode or behavior-specific patch layer.</td><td>POPS folder or support path as documented by the package.</td><td>Filename/header mismatches and number collisions.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Per-game datapoints to preserve</h2>
        <ul class="checklist">
          <li><strong>Crash Bash:</strong> treat as title-specific. The corpus preserves several eras of fixes and warns against expecting one universal mode.</li>
          <li><strong>Tekken 3:</strong> mode <code>0x06</code> plus <code>0x04</code> is a useful community example of allowed stacking.</li>
          <li><strong>Jackie Chan Stuntmaster PAL:</strong> built-in LibCrypt coverage exists for <code>SCES-01444</code>, but disc-batch differences may still require <code>$FAKELC</code> or explicit codes.</li>
          <li><strong>Tomb Raider 1/2 CDDA desync:</strong> recorded as an emulation limitation; do not misdiagnose it as a layout problem.</li>
          <li><strong>Spyro 2/3, Gran Turismo 2, Dino Crisis, Parasite Eve II:</strong> old snapshots name them as difficult or historically problematic. Re-test before publishing current absolute claims.</li>
        </ul>
      </section>`,
      { dynamic: "compatibilityMap" }
    ]
  },
  {
    slug: "vmc-handlers",
    title: "VMC and Handler Files",
    nav: "VMC / Handlers",
    description: "Virtual memory cards, shared VMC routing, BIOS/OSD handlers, IGR textures, handler precedence, and support-file placement.",
    blocks: [
      `<section class="callout">
        <h2>Handlers follow the support-folder rule</h2>
        <p>VMC files, <code>VMCDIR.TXT</code>, <code>BIOS.BIN</code>, <code>OSD.BIN</code>, patch files, and many handler assets belong where POPStarter will look for the current backend and game. The wrong folder can look exactly like an incompatible game.</p>
      </section>`,
      `<section>
        <h2>Virtual memory card basics</h2>
        <ul class="checklist">
          <li><code>SLOT0.VMC</code> and <code>SLOT1.VMC</code> are the normal per-game VMC files.</li>
          <li><code>$NOVMC0</code> and <code>$NOVMC1</code> can disable individual virtual slots when a game or test requires that behavior.</li>
          <li>SMB shares must be writable because POPStarter creates and updates VMC files over the network.</li>
          <li>For multi-disc games, use <code>VMCDIR.TXT</code> in later-disc folders to point saves back to disc 1's VMC folder.</li>
        </ul>
      </section>`,
      `<section>
        <h2>POPS folder priority</h2>
        <p>USB split folders and HDD common folders are easy to misread. <code>POPS_IOX.PAK</code> and IGR textures can live in the main POPS folder, while per-game handlers and compatibility files often need to be copied into the specific folder being launched from.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Backend</th><th>VCD location</th><th>Typical support/handler location</th></tr></thead>
          <tbody>
            <tr><td>USB</td><td><code>mass:/POPS</code> or <code>mass:/POPS0..9</code></td><td><code>mass:/POPS#/&lt;VCD basename&gt;/</code> for per-game files.</td></tr>
            <tr><td>HDD</td><td><code>hdd0:/__.POPS</code></td><td><code>hdd0:/__common/POPS/&lt;VCD basename&gt;/</code>.</td></tr>
            <tr><td>SMB</td><td>Share <code>POPS/</code></td><td>Share <code>POPS/&lt;VCD basename&gt;/</code>.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>BIOS and OSD handlers</h2>
        <p>The recovered wiki coverage separates BIOS handler and OSD handler behavior. Keep those files as explicit per-game experiments, not global defaults. If both handler names appear in a source, preserve the source-specific priority note instead of guessing.</p>
        <p>The recovered VMC/handler notes flag <code>OSD.BIN</code> and <code>BIOS.BIN</code> precedence as important enough to track. This site keeps it as a handler topic until package-level inspection confirms every edge case.</p>
      </section>`,
      `<section>
        <h2>IGR textures</h2>
        <p>IGR texture loading is part of the later POPStarter line. Texture files such as <code>IGR_BG.TM2</code> belong to presentation, not compatibility. POPSLoader packages can also include similarly named texture patch artifacts, so keep texture files separate from compatibility <code>PATCH_#.BIN</code> meaning.</p>
      </section>`,
      `<section class="callout warning">
        <h2>Do not merge support-file families</h2>
        <p><code>PATCH_5.BIN</code> as a compatibility mode, POPSLoader IGR texture resources, VMC routing files, and BIOS/OSD handlers are different families. Similar filenames do not prove similar behavior.</p>
      </section>`
    ]
  },
  {
    slug: "thread-study",
    title: "Community Thread Study",
    nav: "Thread Study",
    description: "High-value PSX-Place thread findings, maintainer-confirmed corrections, driver myths, dropped noise, and next research priorities.",
    blocks: [
      `<section class="callout">
        <h2>Why the thread matters</h2>
        <p>The recovered wiki is essential, but the PSX-Place release/support thread contains maintainer corrections that never fit neatly into old static pages. This page turns those thread findings into actionable documentation without treating every forum claim as equal.</p>
      </section>`,
      `<section>
        <h2>Evidence tiers</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Tier</th><th>Use</th><th>Examples</th></tr></thead>
          <tbody>
            <tr><td>Tier 0</td><td>Maintainer-confirmed behavior.</td><td>krHACKen posts about <code>PATCH_9.BIN</code>, IGR exit chain, config offsets, driver myths.</td></tr>
            <tr><td>Tier 1</td><td>Recovered wiki or package evidence.</td><td>ShaolinAssassin wiki pages, mirrored command tables, package readmes.</td></tr>
            <tr><td>Tier 2</td><td>Community-tested recipes.</td><td>OPL Apps layouts, specific game fixes, fork hardware testing.</td></tr>
            <tr><td>Dropped</td><td>Noise, off-topic advice, or unverifiable claims.</td><td>Generic PS3 advice, vague "community hacks fix everything" claims, unanswered file folklore.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Highest-value corrections</h2>
        <ul class="checklist">
          <li><strong><code>CHEATS.TXT</code> uppercase:</strong> a silent failure source behind many "cheat does not work" reports.</li>
          <li><strong><code>$IGR5</code> and exit black screens:</strong> no-popup exit is separate from the bugged <code>BOOT.ELF</code> chain.</li>
          <li><strong><code>PATCH_9.BIN</code> collision:</strong> stock <code>$NOPAL</code> mapping and later loader-disable artifact must be documented as a conflict until package inspection resolves filenames.</li>
          <li><strong>Merged multi-disc images:</strong> can break game-ID or disc-specific fixes; keep disc identities and per-game folders explicit.</li>
          <li><strong>Hugopocked versus <code>TROJAN_7.BIN</code>:</strong> per-game fixes and global cumulative fix packs should not be stacked blindly.</li>
        </ul>
      </section>`,
      `<section>
        <h2>Driver myths corrected</h2>
        <p>Thread evidence says dropping external HDD drivers into <code>__common/POPS</code> does not magically fix HDD mode. Renamed USB modules are not a generic HDD solution, and some modules belong to boot/MBR or EE-side flows rather than POPStarter's runtime loader. Keep driver-substitution claims tied to the exact backend that documents them.</p>
      </section>`,
      `<section>
        <h2>Dropped or parked material</h2>
        <ul>
          <li>Off-topic console advice that does not improve POPStarter documentation.</li>
          <li>Unanswered questions such as whether an old wrapper file is still needed, unless package inspection can turn it into a real finding.</li>
          <li>Low-confidence "probably" hardware claims without a source, test, or exact trigger.</li>
          <li>Old RIP-build gossip beyond the practical rule: prefer the final 2019 r13 beta.</li>
        </ul>
      </section>`
    ]
  },
  {
    slug: "poc2-history",
    title: "POC2 and POPS-00001 History",
    nav: "POC2 History",
    description: "Historical context for the leaked POPS-00001 era, early HDD partition workflows, and why modern documentation should avoid reviving risky old packages.",
    blocks: [
      `<section class="callout warning">
        <h2>Historical context, not an install recipe</h2>
        <p>The POC2 / POPS-00001 era explains where POPStarter came from. It is not a recommendation to redistribute old packages, use unsafe repacks, or revive proprietary emulator bundles.</p>
      </section>`,
      `<section>
        <h2>Short chronology</h2>
        <ol>
          <li>Sony's POPS emulator existed as part of the PS2 ecosystem and later became the base around which community launchers were studied.</li>
          <li>Early POC2 material circulated with instructions around HDD partitions and edited game dumps.</li>
          <li>Community bundles then appeared under POPS-00001-style naming, often mixed with hex-edited or unsafe repacks.</li>
          <li>POPStarter evolved as a launcher and patch layer so users did not have to keep relying on those crude early workflows.</li>
          <li>The final public POPStarter line is r13 Beta 2019/06/05, with later fix-pack/community work documented separately.</li>
        </ol>
      </section>`,
      `<section>
        <h2>What changed from the early era</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Early POC2-style concern</th><th>Modern documentation stance</th></tr></thead>
          <tbody>
            <tr><td>Per-game HDD partitions and edited images.</td><td>Document legacy <code>PP.</code> and <code>__.</code> partition routes, but prefer clear modern <code>__.POPS</code> / <code>__common/POPS</code> recipes where supported.</td></tr>
            <tr><td>Bundled proprietary emulator files.</td><td>Do not mirror or link binaries. Identify required files by role and verification hash only.</td></tr>
            <tr><td>Risky repacks and old RIP/WIP confusion.</td><td>Use final r13 build identity as the public baseline and label old behavior by date/build.</td></tr>
            <tr><td>Scattered compatibility folklore.</td><td>Separate built-in fixes, commands, patches, TROJAN files, and per-game community fixes.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Why this matters</h2>
        <p>Many wrong guides mix early POPS-00001 assumptions with final POPStarter behavior. That is how old config-byte meanings, pre-final IGR behavior, unsafe package references, and broken HDD recipes keep resurfacing. Historical material belongs in provenance, not in the default quick-start path.</p>
      </section>`,
      { dynamic: "historyTimeline" }
    ]
  },
  {
    slug: "credits",
    title: "Credits",
    nav: "Credits",
    description: "People, projects, mirrors, and recovery sources that make the preserved POPStarter documentation usable.",
    blocks: [
      `<section class="callout">
        <h2>Preservation needs attribution</h2>
        <p>This site is a synthesis of recovered documentation, maintainer posts, community testing, local notes, and modern launcher/fork material. Credits are grouped by contribution area rather than treated as download endorsements.</p>
      </section>`,
      `<section class="compare">
        <article><h2>Original documentation</h2><p>ShaolinAssassin preserved and organized a large body of POPStarter wiki material. krHACKen authored POPStarter and many of the authoritative technical explanations behind the command, config, patch, and IGR behavior.</p></article>
        <article><h2>Regional guides and mirrors</h2><p>El_Patas and other regional guide authors kept long-form setup knowledge alive. Retro-Jogos and archive captures preserve important wiki-era pages when original hosts are gone or inconsistent.</p></article>
        <article><h2>Compatibility work</h2><p>Hugopocked, krHACKen fix-pack notes, and title-specific community testing preserve the practical game-fix layer. These sources are valuable precisely because they are per-game, not universal magic patches.</p></article>
        <article><h2>Modern launchers and devices</h2><p>El_isra's POPSLoader, Ripto/NathanNeurotic fork work, BDM Assault, wLE_kHn, OPL fork behavior, and hardware testers expanded practical launch options beyond the old wiki's original scope.</p></article>
        <article><h2>Current archive work</h2><p>The local research pack, uploaded notes, source inventories, and validation scripts keep the public site searchable while respecting binary and link boundaries.</p></article>
      </section>`,
      `<section class="callout legal">
        <h2>Credit is not redistribution</h2>
        <p>Naming a project or source does not mean this site can host proprietary packages or link unsafe mirrors. The public archive stays focused on instructions, hashes, provenance, and safe source labels.</p>
      </section>`
    ]
  },
  {
    slug: "command-reference",
    title: "Command Reference",
    description: "CHEATS.TXT directives with placement, effects, conflicts, confidence, and source links.",
    blocks: [
      `<section class="callout">
        <h2>Placement</h2>
        <p>Commands belong in the per-game <code>CHEATS.TXT</code> unless a package or archived page says otherwise. Raw cheat codes generally use <code>$SAFEMODE</code>; POPStarter special directives do not require it.</p>
      </section>`,
      { dynamic: "commandReference" }
    ]
  },
  {
    slug: "config-table",
    title: "Config Table",
    description: "Recovered r13 POPSTARTER.ELF/.KELF config bytes from $410 through $42F with defaults, aliases, and risk notes.",
    blocks: [
      `<section class="callout warning">
        <h2>Patch bytes only when you mean it</h2>
        <p>The final r13 ELF/KELF stores a contiguous 32-byte config table from <code>$410</code> through <code>$42F</code>. Back up the original 32 bytes before direct hex edits. Prefer <code>CHEATS.TXT</code> commands for per-game behavior when a command exists.</p>
      </section>`,
      `<section class="compare">
        <article><h3><code>$412</code></h3><p>In r13 this is <code>$HDTVFIX</code> / SetGsCrt behavior, not the old function skipper from pre-Beta-13 builds.</p></article>
        <article><h3><code>$413</code></h3><p>USB device access delay. This is the byte to adjust when a slow USB device is not detected.</p></article>
        <article><h3><code>$USBDELAY_#</code></h3><p>A CHEATS.TXT command that patches POPS streaming behavior. It does not replace <code>$413</code>.</p></article>
        <article><h3><code>$42A</code></h3><p>Multi-valued PAL/480p byte: <code>00</code> disables PAL patching, <code>01</code> auto-PALs, <code>02</code> forces 480p.</p></article>
      </section>`,
      { dynamic: "configTable" }
    ]
  },
  {
    slug: "compatibility-map",
    title: "Compatibility Map",
    description: "Cross-reference POPStarter CHEATS.TXT commands, PATCH files, TROJAN files, and config-byte equivalents.",
    blocks: [
      `<section class="callout">
        <h2>One behavior can have several faces</h2>
        <p>POPStarter's history mixes text commands, standalone patch files, TROJAN files, and direct config-byte edits. This table keeps the aliases together and calls out filename collisions such as stock <code>PATCH_9.BIN</code> for <code>$NOPAL</code> versus the later loader-disable workaround that reused the same filename.</p>
      </section>`,
      `<section class="callout warning">
        <h2>Compatibility-mode stacking rule</h2>
        <p>Recovered notes say modes <code>0x01</code>, <code>0x02</code>, <code>0x03</code>, and <code>0x05</code> touch CD status and should not be combined. Modes <code>0x04</code>, <code>0x06</code>, and <code>0x07</code> combine more safely, but still test per title.</p>
      </section>`,
      { dynamic: "compatibilityMap" }
    ]
  },
  {
    slug: "igr-exit",
    title: "IGR and Exit Behavior",
    description: "Separate IGR commands, $NOIGR, and the loader-disable PATCH_9.BIN workaround.",
    blocks: [
      `<section class="callout warning">
        <h2>Do not merge these concepts</h2>
        <p><code>$NOIGR</code> disables POPStarter's IGR menu. <code>$IGR0</code> through <code>$IGR5</code> choose button combos and menu/no-menu behavior. <code>PATCH_9.BIN</code>, according to krHACKen's PSX-Place page 4 post, disables the bugged ELF loader so exit does not chain into an incompatible <code>BOOT.ELF</code>.</p>
      </section>`,
      `<section class="compare">
        <article><h3>Menu IGR</h3><p><code>$IGR0</code>, <code>$IGR1</code>, and <code>$IGR2</code> open the IGR menu. Their standalone equivalents are <code>TROJAN_0.BIN</code> through <code>TROJAN_2.BIN</code>.</p></article>
        <article><h3>No-popup exit</h3><p><code>$IGR3</code>, <code>$IGR4</code>, and <code>$IGR5</code> terminate POPS directly. <code>$IGR5</code> is the OPL-like macro: <code>L1+L2+R1+R2+Start+Select</code>.</p></article>
        <article><h3>Exit chain</h3><p>With r13's default <code>$424=0x01</code>, IGR quit tries <code>mc0:/BOOT/BOOT.ELF</code>, then <code>mc1:/BOOT/BOOT.ELF</code>, then Browser/OSDSYS.</p></article>
        <article><h3>No path override</h3><p>Recovered notes do not show a supported config or command to redirect the BOOT.ELF chain to USB, HDD, or another path.</p></article>
      </section>`,
      { dynamic: "hotkeys" },
      `<section>
        <h2>IGR texture and handler layer</h2>
        <p>IGR is not only a button combo. Later POPStarter builds also load IGR texture resources and handler files. Keep texture files and compatibility files separate: an IGR background texture does not mean the same thing as a numbered compatibility patch.</p>
        <p>For more support-file placement rules, see <a href="vmc-handlers.html">VMC and Handler Files</a>.</p>
      </section>`,
      `<section>
        <h2>Failure signatures</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Symptom</th><th>Likely layer</th><th>Next check</th></tr></thead>
          <tbody>
            <tr><td>IGR menu appears, YES exits to black screen.</td><td><code>BOOT.ELF</code> exit chain or internal ELF loader.</td><td>Try <code>$IGR5</code>, loader-disable patch, or a different/repacked <code>BOOT.ELF</code>.</td></tr>
            <tr><td>No IGR menu at all.</td><td>Command, combo, or disabled IGR.</td><td>Check <code>$NOIGR</code> and whether the selected <code>$IGR#</code> command matches the combo being pressed.</td></tr>
            <tr><td>Exit drops to Browser instead of OPL.</td><td>Expected fallback when the loader path is disabled or no compatible <code>BOOT.ELF</code> is found.</td><td>Do not treat Browser fallback as proof the game failed.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Practical exit recipe</h2>
        <p>For OPL-like no-popup exit, put <code>$IGR5</code> in the game's <code>CHEATS.TXT</code>. If the exit still black-screens because POPStarter chains into an incompatible <code>BOOT.ELF</code>, use the loader-disable patch or replace/recompress the BOOT.ELF target. The patch may exit to the PS2 Browser rather than back to OPL.</p>
      </section>`
    ]
  },
  {
    slug: "patches-fixes",
    title: "Patches and Fixes",
    description: "PATCH_X.BIN, TROJAN_X.BIN, POPSLoader textures, and Hugopocked game fixes.",
    blocks: [
      `<section class="callout warning">
        <h2>PATCH_9.BIN conflict</h2>
        <p>This site deliberately lists two claims for <code>PATCH_9.BIN</code>: a high-confidence maintainer post says it disables the bugged ELF loader, while seed/ElOtroLado-derived notes associate it with <code>$NOPAL</code>. Full package/archive recovery is required before collapsing that conflict.</p>
      </section>`,
      `<section>
        <h2>Where fixes normally go</h2>
        <p>Per-game fixes belong in the same folder POPStarter uses for VMC/support files. That folder is based on the VCD basename, not the launcher display title.</p>
        <div class="table-wrap"><table>
          <thead><tr><th>Backend</th><th>Per-game support/fix folder</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td>USB</td><td><code>mass:/POPS/&lt;VCD basename&gt;/</code></td><td><code>mass:/POPS/SLUS_002.40.Soul Blade/</code></td></tr>
            <tr><td>HDD</td><td><code>hdd:/__common/POPS/&lt;VCD basename&gt;/</code></td><td><code>hdd:/__common/POPS/SLUS_002.40.Soul Blade/</code></td></tr>
            <tr><td>SMB</td><td><code>smb:/POPS/&lt;VCD basename&gt;/</code> or the equivalent share path</td><td><code>PS2SMB/POPS/SLUS_002.40.Soul Blade/</code></td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>How to read this table</h2>
        <p><code>PATCH_X.BIN</code> and <code>TROJAN_X.BIN</code> are not fully recovered yet. The table preserves what is known, what conflicts, and what still needs package inspection. Do not use a low-confidence row as a universal install instruction.</p>
      </section>`,
      `<section>
        <h2>Hugopocked fix placement</h2>
        <p>Hugopocked-style fixes are per-game material. Put them in the game's support folder, not in a global folder, unless the package explicitly says otherwise. The support folder is based on the VCD basename, which is why merged or renamed images can break fix lookup.</p>
      </section>`,
      `<section class="callout warning">
        <h2>TROJAN_7 is a different scope</h2>
        <p>The recovered thread study treats <code>TROJAN_7.BIN</code> as a cumulative/global fix-pack line that post-dates the final r13 launcher. Do not stack it blindly with per-game Hugopocked fixes for the same title. If both are mentioned for a game, preserve the source and test each layer separately.</p>
      </section>`,
      `<section>
        <h2>Filename and header discipline</h2>
        <p>Thread evidence says POPStarter validates the number inside a patch/trojan header against the filename. A renamed file with mismatched internal identity is not a harmless cosmetic change; it can fail to load or produce misleading results.</p>
      </section>`,
      { dynamic: "patchTable" }
    ]
  },
  {
    slug: "multi-disc-vmc",
    title: "Multi-disc and VMC",
    description: "DISCS.TXT and VMCDIR.TXT examples for shared disc sets and memory cards.",
    blocks: [
      `<section>
        <h2>What DISCS.TXT does</h2>
        <p><code>DISCS.TXT</code> tells POPStarter which VCDs belong to the same multi-disc set. Place it in each disc's per-game support folder and list every disc filename exactly as it appears in the VCD storage folder.</p>
        <pre><code>Final Fantasy VII D1.VCD
Final Fantasy VII D2.VCD
Final Fantasy VII D3.VCD</code></pre>
      </section>`,
      `<section>
        <h2>What VMCDIR.TXT does</h2>
        <p><code>VMCDIR.TXT</code> points later discs at the VMC folder for disc 1, so saves stay unified across the set. Put <code>VMCDIR.TXT</code> in later-disc support folders, not in the first-disc folder unless a source-specific recipe says otherwise.</p>
        <pre><code>Final Fantasy VII D1.VCD</code></pre>
      </section>`,
      `<section>
        <h2>Why merged multi-disc images are risky</h2>
        <p>Thread-study notes flag merged multi-disc images as a source of broken per-game or per-disc fixes. POPStarter support folders, fix lookup, and VMC routing are based on filenames and disc identity. Keeping separate VCDs with exact names gives <code>DISCS.TXT</code> and <code>VMCDIR.TXT</code> something reliable to reference.</p>
      </section>`,
      `<section>
        <h2>USB example</h2>
        <pre><code>mass:/POPS/Final Fantasy VII D1.VCD
mass:/POPS/Final Fantasy VII D2.VCD
mass:/POPS/Final Fantasy VII D3.VCD
mass:/POPS/Final Fantasy VII D1/DISCS.TXT
mass:/POPS/Final Fantasy VII D2/DISCS.TXT
mass:/POPS/Final Fantasy VII D3/DISCS.TXT
mass:/POPS/Final Fantasy VII D2/VMCDIR.TXT
mass:/POPS/Final Fantasy VII D3/VMCDIR.TXT</code></pre>
      </section>`,
      `<section>
        <h2>HDD example</h2>
        <pre><code>hdd0:/__.POPS/Final Fantasy VII D1.VCD
hdd0:/__.POPS/Final Fantasy VII D2.VCD
hdd0:/__.POPS/Final Fantasy VII D3.VCD
hdd0:/__common/POPS/Final Fantasy VII D1/DISCS.TXT
hdd0:/__common/POPS/Final Fantasy VII D2/DISCS.TXT
hdd0:/__common/POPS/Final Fantasy VII D3/DISCS.TXT
hdd0:/__common/POPS/Final Fantasy VII D2/VMCDIR.TXT
hdd0:/__common/POPS/Final Fantasy VII D3/VMCDIR.TXT</code></pre>
      </section>`,
      `<section>
        <h2>VMC and handler checklist</h2>
        <ul class="checklist">
          <li>Each disc support folder should have the same <code>DISCS.TXT</code> list unless a source-specific recipe says otherwise.</li>
          <li>Later-disc folders use <code>VMCDIR.TXT</code> to point back to the first disc's VMC folder.</li>
          <li>Per-game patches or handlers still belong to the relevant disc/game support folder.</li>
          <li>For USB split folders, do not assume handler files in <code>mass:/POPS</code> are inherited by <code>POPS0</code> through <code>POPS9</code>.</li>
          <li>For HDD, VCDs live in <code>__.POPS</code>, while support files live under <code>__common/POPS</code>.</li>
        </ul>
      </section>`,
      `<section class="callout"><h2>Evidence status</h2><p>The user notes preserve working USB and HDD examples, with the old Bitbucket multi-disc page named as the source to recover. Treat the examples as user-tested until the archived page is extracted. The support-folder rule is still valuable because it matches the broader POPStarter basename pattern.</p></section>`
    ]
  },
  {
    slug: "video-display",
    title: "Video / Display",
    description: "Output modes, screen positioning, 480p, HDTVFIX, smoothing, scanlines, and widescreen caveats.",
    blocks: [
      `<section>
        <h2>Do not apply display hacks globally</h2>
        <p><code>$HDTVFIX</code> can make modern displays accept output that would otherwise be 240p/288p, but it can also be the reason a CRT/component setup unexpectedly shows interlaced video. <code>$480p</code> is explicitly low-compatibility in the seed and mirrored guide.</p>
      </section>`,
      `<section>
        <h2>Recommended order of operations</h2>
        <ol>
          <li>Start with no display commands and confirm whether the game reaches the PS logo and in-game output.</li>
          <li>Use <code>$NOPAL</code> or <code>$FORCEPAL</code> only for a region/video problem, then recenter with <code>$YPOS_##</code> if needed.</li>
          <li>Use <code>$HDTVFIX</code> only when the display cannot handle the default 240p/288p style output.</li>
          <li>Use <code>$480p</code> as a last experiment because it is low-compatibility and conflicts with geometry commands.</li>
        </ol>
      </section>`,
      `<section class="compare">
        <article><h3>Geometry</h3><p><code>$XPOS</code>, <code>$YPOS</code>, <code>$DWSTRETCH</code>, and <code>$DWCROP</code> tune image placement. Do not combine them with <code>$480p</code> until verified for the game/display.</p></article>
        <article><h3>Widescreen</h3><p><code>$WIDESCREEN</code>, <code>$ULTRA_WIDESCREEN</code>, and <code>$EYEFINITY</code> affect 3D projection. They do not repair HUDs, menus, fonts, or 2D backgrounds.</p></article>
        <article><h3>Smoothing</h3><p><code>$SMOOTH</code> enables texture smoothing by default. Runtime hotkeys are preserved from the seed but still need old-wiki confirmation.</p></article>
        <article><h3>Scanlines</h3><p><code>$SCANLINES</code> is listed in the command data but still needs better display examples. Treat it as a per-display preference, not a compatibility fix.</p></article>
        <article><h3>CD/video hangs</h3><p><code>$CACHE1</code> and <code>$SUBCDSTATUS</code> are more about CD/status behavior than display calibration. Use them for specific hangs, not for geometry or HDTV problems.</p></article>
      </section>`,
      `<section class="callout warning">
        <h2>Symptom shortcut</h2>
        <p>If a game unexpectedly appears in 480i/576i, check for accidental <code>$HDTVFIX</code> in <code>CHEATS.TXT</code> before blaming the display or the console.</p>
      </section>`
    ]
  },
  {
    slug: "smb-network",
    title: "SMB / Network",
    description: "Full SMB setup for POPStarter: direct SB-prefixed launchers, OPL Apps launch, config file formats, memory-card modules, VMC writes, debug text, and common failure modes.",
    blocks: [
      `<section class="callout">
        <h2>What SMB mode actually is</h2>
        <p>POPStarter SMB mode loads the VCD and per-game support folder from a network share, while the network stack and config files live on a PS2 memory card. ElOtroLado documents two SMB launch patterns: execute an <code>SB.</code>-prefixed renamed POPStarter ELF from the PS2 side, or use OPL's Apps menu as a frontend that launches an <code>SB.</code>-prefixed ELF from the SMB share.</p>
        <p><strong>Source basis:</strong> ElOtroLado first post, SMB tutorial section edited through 2026-06-07, plus the local user-tested SMB notes. This source is mentioned for provenance but not linked from the public site.</p>
      </section>`,
      `<section>
        <h2>Route A: direct POPStarter SMB launcher</h2>
        <p>Use this when the renamed ELF is launched from somewhere on the PS2 side, such as memory card, USB, HDD app launcher, or another ELF browser, while the game data is on the SMB share.</p>
        <ol>
          <li>On the PC/NAS, copy the package's <code>POPSTARTER</code> folder and share that folder itself over SMB. The share name should be <code>POPSTARTER</code> unless you intentionally change <code>SMBCONFIG.DAT</code>.</li>
          <li>Inside that shared <code>POPSTARTER</code> folder, keep a <code>POPS</code> folder. Put VCDs there.</li>
          <li>Rename <code>POPSTARTER.ELF</code> for each game using the SMB prefix <code>SB.</code>. Example: <code>Medievil.VCD</code> pairs with <code>SB.Medievil.ELF</code>.</li>
          <li>Put the <code>SB.</code>-prefixed ELF somewhere the PS2 can execute it. ElOtroLado says the renamed ELF files are copied to the PS2 and launched from there.</li>
          <li>Edit <code>IPCONFIG.DAT</code> and <code>SMBCONFIG.DAT</code> in the package's memory-card module folder, then copy the entire module-side <code>POPSTARTER</code> folder to <code>mc0:/POPSTARTER</code> or <code>mc1:/POPSTARTER</code>.</li>
        </ol>
        <h3>Direct share layout</h3>
        <pre><code>POPSTARTER/
+-- POPS/
    |-- POPS_IOX.PAK
    |-- Medievil.VCD
    +-- Medievil/
        |-- CHEATS.TXT
        |-- SLOT0.VMC
        +-- SLOT1.VMC</code></pre>
        <p>ElOtroLado says VMCs are created automatically on the computer/NAS inside <code>POPS/&lt;game name&gt;/</code>. Because of that, write permission on the share is not optional.</p>
      </section>`,
      `<section>
        <h2>Route B: OPL Apps over SMB</h2>
        <p>Use this when OPL is the frontend. In this mode ElOtroLado changes the share example to <code>PS2SMB</code>, because that is also the normal OPL SMB share name. POPStarter still needs the network module folder on memory card.</p>
        <ol>
          <li>Create and share a PC/NAS folder named <code>PS2SMB</code>.</li>
          <li>Inside <code>PS2SMB</code>, create <code>POPS</code>, <code>APPS</code>, and <code>ART</code>.</li>
          <li>Put VCDs in <code>POPS</code>.</li>
          <li>Put <code>SB.</code>-prefixed renamed POPStarter ELFs in <code>APPS</code>.</li>
          <li>Edit <code>SMBCONFIG.DAT</code> so line 1 points at the <code>PS2SMB</code> share.</li>
          <li>Create <code>mc0:/OPL/conf_apps.cfg</code> and point each visible app entry at the SMB ELF.</li>
        </ol>
        <h3>OPL Apps share layout</h3>
        <pre><code>PS2SMB/
|-- POPS/
|   |-- POPS_IOX.PAK
|   +-- Crash Bandicoot.VCD
|-- APPS/
|   +-- SB.Crash Bandicoot.ELF
+-- ART/
    +-- SB.Crash Bandicoot.ELF_COV.jpg</code></pre>
        <h3>conf_apps.cfg examples</h3>
        <pre><code>Crash Bandicoot=smb:/APPS/SB.Crash Bandicoot.ELF
Crash Bandicoot=smb0:/APPS/SB.Crash Bandicoot.ELF</code></pre>
        <p>ElOtroLado notes that some later OPL betas reportedly require <code>smb0:</code> instead of <code>smb:</code>. The game name on the left is the menu label. The path on the right must match the renamed ELF exactly, including spaces and case, and there must be no trailing spaces at line ends.</p>
      </section>`,
      `<section>
        <h2>Memory card POPSTARTER folder</h2>
        <p>The network modules and config files are copied as a complete <code>POPSTARTER</code> folder from the package's memory-card network module folder to <code>mc0:/POPSTARTER</code> or <code>mc1:/POPSTARTER</code>. This is separate from the PC/NAS share named <code>POPSTARTER</code> in the direct launcher route.</p>
        <pre><code>mc0:/POPSTARTER/
|-- icon.sys
|-- IPCONFIG.DAT
|-- netpops.ico
|-- popstarter.icn
|-- poweroff.irx
|-- ps2dev9.irx
|-- ps2ip.irx
|-- ps2smap.irx
|-- SMBCONFIG.DAT
|-- smbman.irx
+-- smsutils.irx</code></pre>
        <p><strong>Filename correction:</strong> use <code>IPCONFIG.DAT</code>, <code>SMBCONFIG.DAT</code>, and <code>poweroff.irx</code>. Treat <code>.DAY</code> and <code>poweroff.irc</code> from older/user notes as typos unless package inspection proves otherwise.</p>
      </section>`,
      `<section>
        <h2>IPCONFIG.DAT</h2>
        <p>One line, three values: PS2 IP, subnet mask, gateway/router IP.</p>
        <pre><code>192.168.0.13 255.255.255.0 192.168.0.46</code></pre>
        <dl class="compact">
          <dt>192.168.0.13</dt><dd>Static IP address assigned to the PS2.</dd>
          <dt>255.255.255.0</dt><dd>Subnet mask. ElOtroLado says this usually does not need to change.</dd>
          <dt>192.168.0.46</dt><dd>Default gateway, normally your router IP.</dd>
        </dl>
        <p>Use an address in the same subnet as the SMB host and avoid an IP already used by another device.</p>
      </section>`,
      `<section>
        <h2>SMBCONFIG.DAT</h2>
        <p>Line 1 contains host IP and share name. Optional lines 2 and 3 contain username and password if the share requires authentication.</p>
        <h3>Guest/anonymous share</h3>
        <pre><code>192.168.0.254 POPSTARTER</code></pre>
        <h3>Guest/anonymous share on port 139</h3>
        <pre><code>192.168.0.254:139 POPSTARTER</code></pre>
        <h3>Authenticated share</h3>
        <pre><code>192.168.0.254 PS2SMB
myuser
mypassword</code></pre>
        <p>Leave lines 2 and 3 blank for guest access. If you use OPL Apps with a <code>PS2SMB</code> share, line 1 must use <code>PS2SMB</code>, not <code>POPSTARTER</code>.</p>
      </section>`,
      `<section>
        <h2>Required host/share behavior</h2>
        <ul>
          <li>The PC or NAS must accept the access mode you configured: guest/anonymous or username/password.</li>
          <li>Port <code>445</code> must be reachable unless you specify another port such as <code>:139</code>.</li>
          <li>The share must allow writes, because VMC files are created and updated over SMB.</li>
          <li>The share name in <code>SMBCONFIG.DAT</code> must exactly match the folder being shared.</li>
          <li>SMB1/legacy guest behavior can be unsafe on a normal network; isolate the share or use a dedicated network where practical.</li>
        </ul>
      </section>`,
      `<section>
        <h2>Where support files go</h2>
        <p>ElOtroLado says IGR files, <code>CHEATS.TXT</code>, and <code>BIOS.BIN</code> for SMB go under the share's <code>POPSTARTER\\POPS</code> path. For per-game files, keep following POPStarter's basename rule: the per-game folder should match the VCD basename.</p>
        <pre><code>POPSTARTER/POPS/Medievil.VCD
POPSTARTER/POPS/Medievil/CHEATS.TXT
POPSTARTER/POPS/Medievil/SLOT0.VMC
POPSTARTER/POPS/Medievil/SLOT1.VMC</code></pre>
      </section>`,
      `<section class="callout">
        <h2>SMB does not require a special debug-only build</h2>
        <p>Recovered notes identify SMB as normal POPStarter functionality, not a secret debug-build feature. The confusing part is that SMB startup/status text is forced so you can see whether network connection, authentication, or share access failed. That visible text is separate from the <code>$410</code> classic/debug byte label used for normal boots.</p>
      </section>`,
      `<section>
        <h2>Debug text is forced in SMB mode</h2>
        <p>Unlike other modes, the SMB mode debug/status text is expected. ElOtroLado says it cannot be disabled because it is forced so users can see whether the connection was established or where it failed. Do not treat visible SMB debug text as proof that you are using a wrong POPStarter build by itself.</p>
      </section>`,
      `<section>
        <h2>SMB troubleshooting checklist</h2>
        <div class="issue-list">
          <article class="issue"><h3>Black screen before network connection</h3><p>Check that the renamed ELF uses the <code>SB.</code> prefix for SMB and that the ELF/VCD names match after the prefix is removed.</p></article>
          <article class="issue"><h3>Connection error or timeout</h3><p>Check <code>IPCONFIG.DAT</code>, host IP, subnet, gateway, firewall, and whether port <code>445</code> or configured <code>:139</code> is reachable.</p></article>
          <article class="issue"><h3>Share opens but saves fail</h3><p>Enable write permission on the share. POPStarter creates <code>SLOT0.VMC</code> and <code>SLOT1.VMC</code> over SMB.</p></article>
          <article class="issue"><h3>OPL Apps entry does nothing</h3><p>Try <code>smb0:</code> instead of <code>smb:</code> on newer OPL betas, remove trailing spaces in <code>conf_apps.cfg</code>, and confirm the path matches <code>SB.&lt;Game&gt;.ELF</code> exactly.</p></article>
          <article class="issue"><h3>Config ignored</h3><p>Confirm the files are named <code>IPCONFIG.DAT</code> and <code>SMBCONFIG.DAT</code>, not <code>.DAY</code>, and that the module folder is copied as <code>mc?:/POPSTARTER/</code>.</p></article>
        </div>
      </section>`,
      `<section class="callout warning">
        <h2>Do not mix up the two POPSTARTER folders</h2>
        <p>In the direct route, <code>POPSTARTER</code> is also the SMB share folder on the PC/NAS. Separately, <code>mc?:/POPSTARTER</code> is the memory-card module/config folder. They are not interchangeable.</p>
      </section>`
    ]
  },
  {
    slug: "debugging",
    title: "Debugging",
    description: "Debug builds, SMB debug text, support reports, and source-preserving reproduction notes.",
    blocks: [
      `<section>
        <h2>What to capture</h2>
        <ul>
          <li>Storage backend and launcher frontend.</li>
          <li>Exact VCD basename and matching folder/ELF names.</li>
          <li>Full file tree around <code>POPS</code>, <code>__.POPS</code>, <code>__common/POPS</code>, or SMB share root.</li>
          <li>CHEATS.TXT, DISCS.TXT, VMCDIR.TXT contents if present.</li>
          <li>Whether the launch reaches PS logo, black screen, Browser, or a debug log.</li>
        </ul>
      </section>`,
      `<section>
        <h2>Minimal support report template</h2>
        <pre><code>Storage:
Launcher:
OPL/fork version:
POPStarter build:
VCD filename:
Renamed ELF filename:
Support folder path:
CHEATS.TXT:
DISCS.TXT / VMCDIR.TXT:
Last visible screen:
For SMB: IPCONFIG.DAT, SMBCONFIG.DAT, host OS/NAS, share name, port, auth mode, write permission</code></pre>
      </section>`,
      `<section class="callout"><h2>Current debug evidence</h2><p>The local Discord screenshot says classic <code>00</code> POPSTARTER.ELF showed a black wait screen until PS logo/game startup, while a POPSLoader/debug <code>FF</code> build showed log details until PS logo/game startup. ElOtroLado says SMB mode forces debug/status text so users can see whether the connection was established or where it failed. Treat the screenshot as user-tested evidence pending source recovery.</p></section>`
    ]
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    description: "Known symptoms, likely causes, and source-tagged mitigations.",
    blocks: [
      `<section class="callout">
        <h2>Start with the path, not the command list</h2>
        <p>Most POPStarter failures in the local notes are layout failures: wrong folder, wrong prefix, wrong <code>boot=</code>, wrong share name, wrong <code>__.POPS</code> spelling, or support files placed under the VCD folder instead of the per-game folder. Only tune commands after the file tree is known-good.</p>
      </section>`,
      `<section>
        <h2>First split the symptom</h2>
        <div class="table-wrap"><table>
          <thead><tr><th>Symptom</th><th>Do first</th><th>Do not do first</th></tr></thead>
          <tbody>
            <tr><td>Black screen launching HDD from OPL Apps with HDD LED stuck.</td><td>Set unused OPL devices such as network/BDM/SMB to Manual or Disabled.</td><td>Start stacking compatibility modes.</td></tr>
            <tr><td>Black screen after choosing IGR exit.</td><td>Check <code>$IGR5</code>, <code>BOOT.ELF</code>, and the loader-disable path.</td><td>Rewrite storage folders.</td></tr>
            <tr><td>USB not detected.</td><td>Check drive format/fragmentation and config byte <code>$413</code>.</td><td>Use <code>$USBDELAY_#</code> as a device-detection fix.</td></tr>
            <tr><td>Game boots but cheats/fixes do nothing.</td><td>Check uppercase filenames and basename support folder.</td><td>Assume the compatibility command is wrong.</td></tr>
            <tr><td>SMB boots but saves fail.</td><td>Check share write permission and per-game folder creation.</td><td>Change POPStarter build first.</td></tr>
          </tbody>
        </table></div>
      </section>`,
      `<section>
        <h2>Game-specific lore is not a preset pack</h2>
        <p>Some reference examples are valuable because they demonstrate a rule, not because they should be copied globally. Tekken 3 shows that <code>0x06</code> and <code>0x04</code> can combine. Crash Bash shows why title-specific fix threads matter. Tomb Raider CDDA desync shows that some issues are POPS emulation limits rather than POPStarter setup errors.</p>
      </section>`,
      `<section class="callout">
        <h2>When in doubt, make a support report</h2>
        <p>A useful report includes exact storage backend, frontend, POPStarter build, VCD basename, renamed ELF, support folder path, <code>CHEATS.TXT</code>, <code>DISCS.TXT</code>, <code>VMCDIR.TXT</code>, last visible screen, and for SMB the two config files plus auth/write-permission details.</p>
      </section>`,
      { dynamic: "issueList" }
    ]
  },
  {
    slug: "source-archive",
    title: "Source Archive",
    description: "Source inventory with status and reliability tags.",
    blocks: [
      `<section class="callout"><h2>Local archive pages</h2><p>The source inventory below lists public and local evidence. The full local seed files and research notes are rendered separately in the <a href="archive.html">Local Source Archive</a>.</p></section>`,
      { dynamic: "sourceArchive" }
    ]
  },
  {
    slug: "download-inventory",
    title: "Safe Archive Inventory",
    nav: "Inventory",
    description: "Recovered package names, roles, statuses, and hashes without public binary or proprietary download links.",
    blocks: [
      `<section class="callout legal">
        <h2>No binary mirrors here</h2>
        <p>This page records package identity, role, recovery status, and hashes where they help verification. It intentionally omits direct POPS binary links, proprietary mirrors, and excluded tools.</p>
      </section>`,
      { dynamic: "downloadInventory" }
    ]
  },
  {
    slug: "history-provenance",
    title: "History and Provenance",
    nav: "History",
    description: "Build-history landmarks that explain final r13 behavior, config-byte changes, IGR behavior, SMB support, and recovered wiki scope.",
    blocks: [
      `<section class="callout">
        <h2>Why the dates matter</h2>
        <p>POPStarter instructions drift because old WIP/Beta behavior is often repeated as if it applies to the final 2019 r13 build. This timeline keeps the major behavior changes attached to dates and build labels.</p>
      </section>`,
      `<section>
        <h2>Historical layers</h2>
        <div class="chapter-table">
          <a href="poc2-history.html"><span>H1</span><strong>POC2 / POPS-00001 era</strong><em>Early leak-era context, legacy HDD workflows, and why unsafe old packages are not install instructions.</em></a>
          <a href="thread-study.html"><span>H2</span><strong>PSX-Place thread study</strong><em>Maintainer posts, driver myths, dropped noise, and high-value corrections.</em></a>
          <a href="download-inventory.html"><span>H3</span><strong>Safe package inventory</strong><em>Names, roles, statuses, and hashes without binary links.</em></a>
        </div>
      </section>`,
      `<section>
        <h2>Build-boundary rules</h2>
        <ul class="checklist">
          <li>Old POC2/POPS-00001 notes belong in history unless a modern final-build recipe explicitly reuses them.</li>
          <li>Pre-Beta-13 config-byte meanings should not be applied to final r13 without a date/build label.</li>
          <li>Final r13 Beta 2019/06/05 is the public baseline for normal documentation.</li>
          <li>Fix packs and Hugopocked per-game updates that post-date final r13 are documented as external fix layers, not as part of the original ELF.</li>
        </ul>
      </section>`,
      { dynamic: "historyTimeline" }
    ]
  },
  {
    slug: "wiki-coverage",
    title: "Recovered Wiki Coverage",
    nav: "Wiki Coverage",
    description: "Index of the 63 recovered ShaolinAssassin wiki page slugs now tracked as source coverage.",
    blocks: [
      `<section class="callout">
        <h2>Coverage map, not a dump</h2>
        <p>The recovered reference covers 63 wiki pages. This page indexes that scope so follow-up work can expand specific topics without losing the overall map.</p>
      </section>`,
      { dynamic: "wikiCoverage" }
    ]
  },
  {
    slug: "research-log",
    title: "Research Log",
    description: "Resolved items, conflicts, and missing recovery work.",
    blocks: [
      `<section>
        <h2>Resolved in this pass</h2>
        <ul>
          <li>Confirmed current PSX-Place release thread attachment names and legal warning.</li>
          <li>Confirmed loader-disable artifact as <code>PATCH_9.BIN</code> in the POPS folder from krHACKen's page 4 post.</li>
          <li>Confirmed SMB filenames <code>IPCONFIG.DAT</code>, <code>SMBCONFIG.DAT</code>, and <code>poweroff.irx</code> from ElOtroLado.</li>
          <li>Confirmed BDM Assault POPStarter IRX rename paths from the GitHub README.</li>
          <li>Confirmed POPSLoader and POPSLoader fork behavior as side-project/fork-specific documentation.</li>
        </ul>
      </section>`,
      { dynamic: "researchGaps" }
    ]
  },
  {
    slug: "glossary",
    title: "Glossary",
    description: "POPStarter terms with source links.",
    blocks: [
      { dynamic: "glossary" }
    ]
  }
];
