export const pages = [
  {
    slug: "index",
    title: "POPStarter Documentation",
    nav: "Home",
    description: "A source-backed preservation manual for POPStarter setup, commands, storage layouts, IGR behavior, fixes, and unresolved research gaps.",
    blocks: [
      `<section class="callout legal">
        <h2>Legal boundary</h2>
        <p>Do not add Sony POPS emulator binaries, BIOS files, decrypted libraries, or proprietary package mirrors to this repository. The documentation may describe required user-supplied files and paths, but it must not redistribute them.</p>
      </section>`,
      `<section class="home-grid">
        <a class="action-card" href="quick-start.html"><strong>Start a setup</strong><span>Choose storage, launcher, and required files.</span></a>
        <a class="action-card" href="command-reference.html"><strong>Find a command</strong><span>Filter CHEATS.TXT directives by category and confidence.</span></a>
        <a class="action-card" href="search.html"><strong>Search everything</strong><span>Search guide pages, source notes, research files, JSON data, and archive pages.</span></a>
        <a class="action-card" href="archive.html"><strong>Read the archive</strong><span>Open every local seed file, prompt, draft, and raw source capture as a page.</span></a>
        <a class="action-card" href="storage-matrix.html"><strong>Compare layouts</strong><span>USB, HDD, SMB, BDM, POPSLoader, and fork workflows.</span></a>
        <a class="action-card" href="research-log.html"><strong>Audit the evidence</strong><span>See what is verified, conflicting, and still missing.</span></a>
        <a class="action-card" href="data-browser.html"><strong>Browse data</strong><span>Inspect the JSON that powers commands, layouts, sources, fixes, and gaps.</span></a>
      </section>`,
      `<section>
        <h2>Current strongest findings</h2>
        <ul class="checklist">
          <li><strong>Final public beta:</strong> r13 Beta 2019/06/05 is repeatedly identified as the final POPStarter build in the seed, Retro-Jogos mirror, and ElOtroLado first post.</li>
          <li><strong>Loader-disable artifact:</strong> krHACKen identifies <code>PATCH_9.BIN</code> in the POPS folder as the workaround for the bugged ELF loader, but this conflicts with seed notes that associate <code>PATCH_9.BIN</code> with <code>$NOPAL</code>.</li>
          <li><strong>SMB typo correction:</strong> ElOtroLado shows <code>IPCONFIG.DAT</code>, <code>SMBCONFIG.DAT</code>, and <code>poweroff.irx</code>; the user notes' <code>.DAY</code> and <code>.irc</code> strings should be treated as typos unless package inspection disproves it.</li>
          <li><strong>Modern workflow boundary:</strong> POPSLoader, BDM Assault, MX4SIO/MMCE support, and fork-specific BOOT.ELF behavior are documented as modern side-project behavior, not original POPStarter core behavior.</li>
        </ul>
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
        <p>POPStarter setup fails most often when a user mixes files from two launcher models. Decide whether you are launching a per-game renamed ELF, browsing VCDs through wLE_kHn, using POPSLoader, or using a modern OPL fork PS1 page. Then copy only the paths required for that route.</p>
      </section>`,
      `<section class="steps">
        <article><h3>1. Select storage</h3><p>USB is easiest but slow and fragmentation-sensitive. Internal APA HDD is fast but path-sensitive. SMB needs network modules and legacy share behavior. exFAT USB requires BDM Assault driver substitution.</p></article>
        <article><h3>2. Select launcher</h3><p>Original-style workflows use renamed POPSTARTER.ELF files. wLE_kHn and POPSLoader reduce per-game ELF clutter. Modern forks add convenience but must be labeled as fork behavior.</p></article>
        <article><h3>3. Place game support files</h3><p>Put CHEATS.TXT, DISCS.TXT, VMCDIR.TXT, and game fixes in the per-game folder that matches the VCD basename unless a source says otherwise.</p></article>
        <article><h3>4. Add only legal binaries</h3><p>The user must supply legally obtained POPS files. This repository does not include them and should not link directly to them.</p></article>
      </section>`,
      { dynamic: "storageMatrix" }
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
        <article><h2>Renamed POPSTARTER.ELF</h2><p>The classic route renames POPSTARTER.ELF per game so the launcher and VCD basename line up. This works across USB/HDD/SMB with backend-specific paths.</p></article>
        <article><h2>wLE_kHn</h2><p>wLE_kHn launches VCDs directly and can avoid a per-game ELF farm. ElOtroLado documents it as a modified uLE/wLE workflow.</p></article>
        <article><h2>OPL Apps</h2><p>OPL Apps can launch renamed POPStarter ELFs, but HDD launches may hang if other OPL devices are set to Auto.</p></article>
        <article><h2>POPSLoader</h2><p>El_isra's POPSLoader is a Lua/Enceladus standalone launcher. The fork extends this model for USB, HDD, MX4SIO, MMCE, and BDMA.</p></article>
      </section>`,
      `<section><h2>Rule of thumb</h2><p>Use the launcher matrix to avoid mixing a fork-only convenience path into an original POPStarter setup. When in doubt, cite the launcher source next to the path.</p></section>`
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
      { dynamic: "patchTable" }
    ]
  },
  {
    slug: "multi-disc-vmc",
    title: "Multi-disc and VMC",
    description: "DISCS.TXT and VMCDIR.TXT examples for shared disc sets and memory cards.",
    blocks: [
      `<section>
        <h2>Multi-disc pattern</h2>
        <p>For a multi-disc game, place <code>DISCS.TXT</code> in each disc's per-game folder and list every VCD filename, one per line.</p>
        <pre><code>Final Fantasy VII D1.VCD
Final Fantasy VII D2.VCD
Final Fantasy VII D3.VCD</code></pre>
      </section>`,
      `<section>
        <h2>Shared VMC pattern</h2>
        <p>To make later discs use disc 1's VMC folder, place <code>VMCDIR.TXT</code> in later-disc folders and point it at the first disc VCD.</p>
        <pre><code>Final Fantasy VII D1.VCD</code></pre>
      </section>`,
      `<section class="callout"><h2>Evidence status</h2><p>The user notes preserve working USB and HDD examples, with the old Bitbucket multi-disc page named as the source to recover. Treat the examples as user-tested until the archived page is extracted.</p></section>`
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
      `<section class="compare">
        <article><h3>Geometry</h3><p><code>$XPOS</code>, <code>$YPOS</code>, <code>$DWSTRETCH</code>, and <code>$DWCROP</code> tune image placement. Do not combine them with <code>$480p</code> until verified for the game/display.</p></article>
        <article><h3>Widescreen</h3><p><code>$WIDESCREEN</code>, <code>$ULTRA_WIDESCREEN</code>, and <code>$EYEFINITY</code> affect 3D projection. They do not repair HUDs, menus, fonts, or 2D backgrounds.</p></article>
        <article><h3>Smoothing</h3><p><code>$SMOOTH</code> enables texture smoothing by default. Runtime hotkeys are preserved from the seed but still need old-wiki confirmation.</p></article>
      </section>`
    ]
  },
  {
    slug: "smb-network",
    title: "SMB / Network",
    description: "SMB folder layout, config filenames, debug mode, port/auth notes, and legacy security caveats.",
    blocks: [
      `<section class="callout">
        <h2>Confirmed filename corrections</h2>
        <p>ElOtroLado's first post shows <code>IPCONFIG.DAT</code>, <code>SMBCONFIG.DAT</code>, and <code>poweroff.irx</code>. Treat <code>.DAY</code> and <code>poweroff.irc</code> from user notes as likely typos unless package inspection proves otherwise.</p>
      </section>`,
      `<section>
        <h2>SMBCONFIG.DAT examples</h2>
        <pre><code>192.168.0.254 POPSTARTER
192.168.0.254:139 POPSTARTER</code></pre>
        <p>Lines 2 and 3 may hold username and password when authentication is used; leaving them blank indicates guest/anonymous access in the ElOtroLado instructions.</p>
      </section>`,
      `<section class="callout warning"><h2>Security note</h2><p>SMB1/guest-style setups can be risky on a normal network. Use a dedicated isolated share or VLAN where practical, and avoid exposing legacy shares beyond the PS2 use case.</p></section>`
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
      `<section class="callout"><h2>Current debug evidence</h2><p>The local Discord screenshot says classic <code>00</code> POPSTARTER.ELF showed a black wait screen until PS logo/game startup, while a POPSLoader/debug <code>FF</code> build showed log details until PS logo/game startup. The same screenshot says debug is required for SMB use in that user's workflow. Treat this as user-tested evidence pending source recovery.</p></section>`
    ]
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    description: "Known symptoms, likely causes, and source-tagged mitigations.",
    blocks: [
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
