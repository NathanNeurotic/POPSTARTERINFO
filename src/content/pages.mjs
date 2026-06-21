export const pages = [
  {
    slug: "index",
    title: "POPStarter Documentation",
    nav: "Home",
    description: "Recovered, source-backed POPStarter setup and reference material for PS1-on-PS2 workflows: storage layouts, commands, patches, IGR, VMCs, SMB, and fork boundaries.",
    blocks: [
      `<section class="home-stats" aria-label="Recovered documentation summary">
        <article><strong>51</strong><span>searchable pages</span></article>
        <article><strong>35</strong><span>documented commands</span></article>
        <article><strong>7</strong><span>storage layouts</span></article>
        <article><strong>14</strong><span>source records</span></article>
      </section>`,
      `<section class="home-grid">
        <a class="action-card primary" href="quick-start.html"><em>Start here</em><strong>Choose the right workflow</strong><span>Pick storage, launcher, and exact file layout before copying anything.</span></a>
        <a class="action-card" href="usb-storage.html"><em>USB</em><strong>Mass storage setup</strong><span>OPL Apps, OPL DB, wLE_kHn, POPSLoader, Hugopocked fixes, and BDM/exFAT notes.</span></a>
        <a class="action-card" href="internal-hdd.html"><em>HDD</em><strong>APA/PFS internal drive</strong><span><code>__.POPS</code>, <code>__common/POPS</code>, OPL Apps, OPL DB, wLE_kHn, and APA-Jail boundaries.</span></a>
        <a class="action-card" href="smb-network.html"><em>SMB</em><strong>Network launch guide</strong><span>Direct <code>SB.</code> launchers, OPL Apps over SMB, memory-card modules, auth, ports, and VMC writes.</span></a>
        <a class="action-card" href="command-reference.html"><em>Reference</em><strong>Command table</strong><span>Filter <code>CHEATS.TXT</code> directives by category, confidence, and verification status.</span></a>
        <a class="action-card" href="patches-fixes.html"><em>Fixes</em><strong>Patches and TROJANs</strong><span>Compatibility blobs, loader-disable conflicts, display fixes, and per-game folder placement.</span></a>
        <a class="action-card" href="troubleshooting.html"><em>Diagnostics</em><strong>Known failure modes</strong><span>Black screens, wrong folders, <code>title.cfg.txt</code>, SMB auth, VMC writes, and display traps.</span></a>
        <a class="action-card" href="search.html"><em>Search</em><strong>Search the recovered pack</strong><span>Guide pages, source notes, research files, JSON data, and archive pages.</span></a>
      </section>`,
      `<section class="architecture-panel">
        <div class="section-kicker">Architecture map</div>
        <h2>POPStarter, POPS, and POPSLoader are not the same thing</h2>
        <p class="lead">Most bad setup instructions blur three separate layers. This site keeps them split so a reader knows whether a rule belongs to original POPStarter, Sony's POPS emulator payload, or a modern launcher/fork workflow.</p>
        <div class="compare">
          <article>
            <h3>POPStarter</h3>
            <p>krHACKen's launcher and patch layer. It mounts the target <code>.VCD</code>, reads per-game folders, applies commands/fixes, handles IGR support files, then hands execution to POPS.</p>
          </article>
          <article>
            <h3>POPS</h3>
            <p>The PS1-on-PS2 emulator payload. This repository documents expected filenames, paths, and verification identifiers only. It does not host or link proprietary binaries.</p>
          </article>
          <article>
            <h3>POPSLoader</h3>
            <p>A separate modern Lua/Enceladus launcher lineage. Its USB, MMCE, MX4SIO, BDM, and APA-HDD notes are useful, but they are not original POPStarter core behavior.</p>
          </article>
        </div>
      </section>`,
      `<section class="map-strip">
        <article><strong>CHEATS.TXT</strong><span>Plain-text <code>$commands</code> and cheat codes in the per-game folder.</span></article>
        <article><strong>PATCH_#.BIN</strong><span>Compatibility, loader-disable, and display-related binary patches with source conflicts preserved.</span></article>
        <article><strong>DISCS.TXT</strong><span>Multi-disc sets list exact VCD filenames for each disc in the set.</span></article>
        <article><strong>VMCDIR.TXT</strong><span>Later discs can point saves back at the first disc's VMC folder.</span></article>
        <article><strong>IPCONFIG.DAT</strong><span>SMB network identity: PS2 IP, subnet mask, and gateway.</span></article>
        <article><strong>SMBCONFIG.DAT</strong><span>SMB host, share name, and optional username/password.</span></article>
      </section>`,
      `<section class="evidence-grid">
        <article class="callout">
          <h2>Strongest findings</h2>
          <ul class="checklist">
            <li><strong>Final public beta:</strong> r13 Beta 2019/06/05 is repeatedly identified as the final POPStarter build in the seed, Retro-Jogos mirror, and ElOtroLado first-post capture.</li>
            <li><strong>Loader-disable artifact:</strong> krHACKen identifies <code>PATCH_9.BIN</code> in the POPS folder as the workaround for the bugged ELF loader, but seed notes also associate <code>PATCH_9.BIN</code> with <code>$NOPAL</code>.</li>
            <li><strong>SMB typo correction:</strong> <code>IPCONFIG.DAT</code>, <code>SMBCONFIG.DAT</code>, and <code>poweroff.irx</code> are the recommended spellings; <code>.DAY</code> and <code>.irc</code> are kept only as raw-note conflicts.</li>
            <li><strong>Modern workflow boundary:</strong> POPSLoader, BDM Assault, MX4SIO/MMCE support, and fork-specific BOOT.ELF behavior are documented as side-project or fork-specific behavior.</li>
          </ul>
        </article>
        <article class="callout legal">
          <h2>Preservation boundary</h2>
          <p>No Sony POPS emulator binaries, BIOS files, decrypted libraries, proprietary package mirrors, or direct binary download links belong in this repository.</p>
          <p>Required files may be identified by filename, SHA/hash, package role, or source-reference identifier only.</p>
        </article>
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
        <article><h2>HDDOSD / KELF</h2><p>The source inventory names HDDOSD/KELF as a desired launcher section, but this pass does not yet have enough recovered local detail to publish a safe install recipe. Keep it in research gaps until archive/package inspection fills the missing pieces.</p></article>
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
    slug: "igr-exit",
    title: "IGR and Exit Behavior",
    description: "Separate IGR commands, $NOIGR, and the loader-disable PATCH_9.BIN workaround.",
    blocks: [
      `<section class="callout warning">
        <h2>Do not merge these concepts</h2>
        <p><code>$NOIGR</code> disables POPStarter's IGR menu. <code>$IGR0</code> through <code>$IGR5</code> choose button combos and menu/no-menu behavior. <code>PATCH_9.BIN</code>, according to krHACKen's PSX-Place page 4 post, disables the bugged ELF loader so exit does not chain into an incompatible <code>BOOT.ELF</code>.</p>
      </section>`,
      { dynamic: "hotkeys" },
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
└── POPS/
    ├── POPS_IOX.PAK
    ├── Medievil.VCD
    └── Medievil/
        ├── CHEATS.TXT
        ├── SLOT0.VMC
        └── SLOT1.VMC</code></pre>
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
├── POPS/
│   ├── POPS_IOX.PAK
│   └── Crash Bandicoot.VCD
├── APPS/
│   └── SB.Crash Bandicoot.ELF
└── ART/
    └── SB.Crash Bandicoot.ELF_COV.jpg</code></pre>
        <h3>conf_apps.cfg examples</h3>
        <pre><code>Crash Bandicoot=smb:/APPS/SB.Crash Bandicoot.ELF
Crash Bandicoot=smb0:/APPS/SB.Crash Bandicoot.ELF</code></pre>
        <p>ElOtroLado notes that some later OPL betas reportedly require <code>smb0:</code> instead of <code>smb:</code>. The game name on the left is the menu label. The path on the right must match the renamed ELF exactly, including spaces and case, and there must be no trailing spaces at line ends.</p>
      </section>`,
      `<section>
        <h2>Memory card POPSTARTER folder</h2>
        <p>The network modules and config files are copied as a complete <code>POPSTARTER</code> folder from the package's memory-card network module folder to <code>mc0:/POPSTARTER</code> or <code>mc1:/POPSTARTER</code>. This is separate from the PC/NAS share named <code>POPSTARTER</code> in the direct launcher route.</p>
        <pre><code>mc0:/POPSTARTER/
├── icon.sys
├── IPCONFIG.DAT
├── netpops.ico
├── popstarter.icn
├── poweroff.irx
├── ps2dev9.irx
├── ps2ip.irx
├── ps2smap.irx
├── SMBCONFIG.DAT
├── smbman.irx
└── smsutils.irx</code></pre>
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
