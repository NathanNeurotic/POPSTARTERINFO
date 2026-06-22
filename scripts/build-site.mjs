import { mkdir, readFile, readdir, rm, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { pages } from "../src/content/pages.mjs";

const root = process.cwd();
const srcDir = path.join(root, "src");
const dataDir = path.join(srcDir, "data");
const distDir = path.join(root, "dist");

async function loadJson(name) {
  return JSON.parse(await readFile(path.join(dataDir, name), "utf8"));
}

const data = {
  sources: await loadJson("sources.json"),
  commands: await loadJson("commands.json"),
  storageLayouts: await loadJson("storageLayouts.json"),
  patches: await loadJson("patches.json"),
  knownIssues: await loadJson("knownIssues.json"),
  glossary: await loadJson("glossary.json"),
  hotkeys: await loadJson("hotkeys.json"),
  researchGaps: await loadJson("researchGaps.json"),
  configBytes: await loadJson("configBytes.json"),
  compatibilityMap: await loadJson("compatibilityMap.json"),
  downloadInventory: await loadJson("downloadInventory.json"),
  wikiCoverage: await loadJson("wikiCoverage.json"),
  historyTimeline: await loadJson("historyTimeline.json")
};

const sourceById = new Map(data.sources.map((source) => [source.id, source]));
const generatedAt = new Date().toISOString().slice(0, 10);

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugToHref(slug) {
  return slug === "index" ? "index.html" : `${slug}.html`;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/\\/g, "/")
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function badge(value, kind = "") {
  return `<span class="badge ${kind}">${esc(value)}</span>`;
}

function isLinkableUrl(url) {
  return Boolean(url && !String(url).startsWith("mention-only:") && !String(url).startsWith("no-public-link:"));
}

function sourceLabel(source) {
  const url = String(source.url || "");
  if (url.startsWith("mention-only:")) return `${source.title} (mention only)`;
  if (url.startsWith("no-public-link:")) return `${source.title} (link omitted)`;
  return source.title;
}

function sourceLinks(ids) {
  return ids
    .map((id) => {
      const source = sourceById.get(id);
      if (!source) return badge(`missing:${id}`, "risk");
      if (!isLinkableUrl(source.url)) return `<span class="source-chip">${esc(sourceLabel(source))}</span>`;
      return `<a class="source-chip" href="${esc(source.url)}" target="_blank" rel="noreferrer">${esc(source.title)}</a>`;
    })
    .join(" ");
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function codeBlock(lines) {
  const text = Array.isArray(lines) ? lines.join("\n") : String(lines);
  return `<pre><code>${esc(text)}</code></pre>`;
}

function compactList(items) {
  return Array.isArray(items) && items.length
    ? `<ul class="compact-list">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
    : "None recorded";
}

function pageLink(slug, label) {
  return `<a href="${slugToHref(slug)}">${esc(label)}</a>`;
}

function inlineMarkdown(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
      if (/discord\.com\/channels/i.test(url)) return `${label} (download link omitted)`;
      if (/elotrolado\.net/i.test(url)) return `${label} (source mention only)`;
      return `<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`;
    });
}

function sanitizePublicText(text) {
  return String(text)
    .replace(/\[([^\]]+)\]\(https?:\/\/(?:www\.)?elotrolado\.net[^)]*\)/gi, "$1 (source mention only)")
    .replace(/https?:\/\/(?:www\.)?elotrolado\.net\/\S+/gi, "ElOtroLado source mention only")
    .replace(/\[([^\]]+)\]\(https?:\/\/discord\.com\/channels\/[^)]*\)/gi, "$1 (download link omitted)")
    .replace(/https?:\/\/discord\.com\/channels\/\S+/gi, "Discord download link omitted");
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let paragraph = [];
  let list = [];
  let inCode = false;
  let code = [];

  function flushParagraph() {
    if (paragraph.length) {
      out.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }

  function flushList() {
    if (list.length) {
      out.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      list = [];
    }
  }

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        out.push(codeBlock(code));
        code = [];
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = Math.min(heading[1].length + 1, 5);
      out.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    const bullet = line.match(/^\s*[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
      continue;
    }
    paragraph.push(line.trim());
  }
  flushParagraph();
  flushList();
  if (inCode) out.push(codeBlock(code));
  return out.join("\n");
}

async function collectFiles(dir, predicate, baseDir = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(full, predicate, baseDir));
    } else if (predicate(full)) {
      files.push({
        absolutePath: full,
        relativePath: path.relative(root, full).replace(/\\/g, "/"),
        relativeToBase: path.relative(baseDir, full).replace(/\\/g, "/")
      });
    }
  }
  return files;
}

const archiveSourceFiles = [
  ...(await collectFiles(path.join(root, "docs"), (file) => /\.(md|txt)$/i.test(file))),
  ...(await collectFiles(path.join(root, "source_notes"), (file) => /\.(md|txt)$/i.test(file))),
  ...(await collectFiles(path.join(root, "research"), (file) => /\.(md|txt)$/i.test(file))),
  { absolutePath: path.join(root, "README.md"), relativePath: "README.md", relativeToBase: "README.md" },
  { absolutePath: path.join(root, "CODEX_COPY_PASTE_PROMPT.md"), relativePath: "CODEX_COPY_PASTE_PROMPT.md", relativeToBase: "CODEX_COPY_PASTE_PROMPT.md" },
  { absolutePath: path.join(root, "CODEX_COPY_PASTE_PROMPT.txt"), relativePath: "CODEX_COPY_PASTE_PROMPT.txt", relativeToBase: "CODEX_COPY_PASTE_PROMPT.txt" }
];

const archiveEntries = [];
const archiveSlugCounts = new Map();
function uniqueArchiveSlug(baseSlug) {
  const count = archiveSlugCounts.get(baseSlug) || 0;
  archiveSlugCounts.set(baseSlug, count + 1);
  return count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
}

for (const file of archiveSourceFiles) {
  const raw = sanitizePublicText(await readFile(file.absolutePath, "utf8"));
  const title = file.relativePath.replace(/_/g, " ");
  const slug = uniqueArchiveSlug(`archive-${slugify(file.relativePath)}`);
  archiveEntries.push({
    title,
    slug,
    href: `${slug}.html`,
    sourcePath: file.relativePath,
    raw,
    html: renderMarkdown(raw)
  });
}

const dataEntries = [];
for (const name of Object.keys(data)) {
  const raw = JSON.stringify(data[name], null, 2);
  dataEntries.push({
    title: `Data: ${name}`,
    slug: `data-${slugify(name)}`,
    href: `data-${slugify(name)}.html`,
    sourcePath: `src/data/${name}.json`,
    raw,
    html: codeBlock(raw)
  });
}

function commandReference() {
  const categories = [...new Set(data.commands.map((command) => command.category))].sort();
  const statuses = [...new Set(data.commands.map((command) => command.verificationStatus))].sort();
  const rows = data.commands
    .map((command) => `<tr data-category="${esc(command.category)}" data-confidence="${esc(command.confidence)}" data-status="${esc(command.verificationStatus)}" data-search="${esc([command.command, command.effect, command.notes, command.category].join(" ").toLowerCase())}">
      <td><code>${esc(command.command)}</code></td>
      <td>${esc(command.category)}</td>
      <td>${esc(command.placement)}</td>
      <td>${esc(command.effect)}</td>
      <td>${esc(command.notes)}</td>
      <td>${command.conflicts.length ? list(command.conflicts) : "None recorded"}</td>
      <td>${badge(command.confidence, command.confidence)} ${badge(command.verificationStatus)}</td>
      <td>${sourceLinks(command.sourceIds)}</td>
    </tr>`)
    .join("");

  return `<section class="tool-panel">
    <div class="filters" data-filter-table="commands-table">
      <label>Search <input type="search" data-search placeholder="command, effect, source"></label>
      <label>Category <select data-filter="category"><option value="">All</option>${categories.map((category) => `<option>${esc(category)}</option>`).join("")}</select></label>
      <label>Confidence <select data-filter="confidence"><option value="">All</option><option>high</option><option>medium</option><option>low</option></select></label>
      <label>Status <select data-filter="status"><option value="">All</option>${statuses.map((status) => `<option>${esc(status)}</option>`).join("")}</select></label>
    </div>
    <div class="table-wrap">
      <table id="commands-table">
        <thead><tr><th>Command</th><th>Category</th><th>Placement</th><th>Effect</th><th>Notes</th><th>Conflicts</th><th>Status</th><th>Sources</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </section>`;
}

function storageMatrix() {
  const backends = [...new Set(data.storageLayouts.map((layout) => layout.storageBackend))].sort();
  const launchers = [...new Set(data.storageLayouts.map((layout) => layout.launcherFrontend))].sort();
  const rows = data.storageLayouts
    .map((layout) => `<tr data-backend="${esc(layout.storageBackend)}" data-launcher="${esc(layout.launcherFrontend)}" data-confidence="${esc(layout.confidence)}" data-search="${esc([layout.name, layout.storageBackend, layout.launcherFrontend, layout.filesystem, layout.warnings.join(" "), layout.exactPaths.join(" ")].join(" ").toLowerCase())}">
      <td><strong>${esc(layout.name)}</strong><br>${badge(layout.confidence, layout.confidence)} ${badge(layout.verificationStatus)}</td>
      <td>${esc(layout.storageBackend)}</td>
      <td>${esc(layout.launcherFrontend)}</td>
      <td>${esc(layout.filesystem)}</td>
      <td>${compactList(layout.requiredFiles)}</td>
      <td><pre class="inline-pre"><code>${esc(layout.exactPaths.join("\n"))}</code></pre>${layout.sampleConfig ? `<h4>Sample config</h4><pre class="inline-pre"><code>${esc(layout.sampleConfig)}</code></pre>` : ""}</td>
      <td>${compactList(layout.warnings)}</td>
      <td>${sourceLinks(layout.sourceIds)}</td>
    </tr>`)
    .join("");

  return `<section class="tool-panel">
    <div class="filters" data-filter-table="storage-matrix-table">
      <label>Search <input type="search" data-search placeholder="backend, launcher, file"></label>
      <label>Backend <select data-filter="backend"><option value="">All</option>${backends.map((backend) => `<option>${esc(backend)}</option>`).join("")}</select></label>
      <label>Launcher <select data-filter="launcher"><option value="">All</option>${launchers.map((launcher) => `<option>${esc(launcher)}</option>`).join("")}</select></label>
      <label>Confidence <select data-filter="confidence"><option value="">All</option><option>high</option><option>medium</option><option>low</option></select></label>
    </div>
    <div class="table-wrap">
      <table id="storage-matrix-table" class="wide-table">
        <thead><tr><th>Workflow</th><th>Backend</th><th>Launcher</th><th>Filesystem</th><th>Required files</th><th>Exact paths / config</th><th>Warnings</th><th>Sources</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </section>`;
}

function patchTable() {
  const rows = data.patches.map((patch) => `<tr>
    <td><code>${esc(patch.file)}</code></td>
    <td>${esc(patch.type)}</td>
    <td>${esc(patch.placement)}</td>
    <td>${esc(patch.effect)}</td>
    <td>${patch.conflicts.length ? list(patch.conflicts) : "None recorded"}</td>
    <td>${badge(patch.confidence, patch.confidence)} ${badge(patch.verificationStatus)}</td>
    <td>${sourceLinks(patch.sourceIds)}</td>
  </tr>`).join("");
  return `<div class="table-wrap"><table><thead><tr><th>File</th><th>Type</th><th>Placement</th><th>Effect</th><th>Conflicts</th><th>Status</th><th>Sources</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function issueList() {
  const rows = data.knownIssues.map((issue) => `<tr>
    <td><strong>${esc(issue.title)}</strong><br>${badge(issue.confidence, issue.confidence)} ${badge(issue.verificationStatus)}</td>
    <td>${esc(issue.symptom)}</td>
    <td>${compactList(issue.likelyCauses)}</td>
    <td>${esc(issue.mitigation)}</td>
    <td>${sourceLinks(issue.sourceIds)}</td>
  </tr>`).join("");
  return `<div class="table-wrap"><table><thead><tr><th>Issue</th><th>Symptom</th><th>Likely causes</th><th>Mitigation</th><th>Sources</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function sourceArchive() {
  const rows = data.sources.map((source) => `<tr>
    <td>${isLinkableUrl(source.url) ? `<a href="${esc(source.url)}" target="_blank" rel="noreferrer">${esc(source.title)}</a>` : esc(sourceLabel(source))}</td>
    <td>${badge(source.type)} ${badge(source.status)} ${badge(source.reliability)}</td>
    <td>${esc(source.notes)}</td>
  </tr>`).join("");
  return `<div class="table-wrap"><table><thead><tr><th>Source</th><th>Status</th><th>Notes</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function archiveIndex() {
  return `<section class="tool-panel">
    <div class="filters" data-filter-table="archive-table">
      <label>Search <input type="search" data-search placeholder="source file, notes, raw text"></label>
    </div>
    <div class="table-wrap">
      <table id="archive-table">
        <thead><tr><th>Rendered file</th><th>Source path</th><th>Preview</th></tr></thead>
        <tbody>${archiveEntries.map((entry) => `<tr data-search="${esc(`${entry.title} ${entry.sourcePath} ${entry.raw.slice(0, 3000)}`.toLowerCase())}">
          <td><a href="${esc(entry.href)}">${esc(entry.title)}</a></td>
          <td><code>${esc(entry.sourcePath)}</code></td>
          <td>${esc(entry.raw.replace(/\s+/g, " ").slice(0, 260))}${entry.raw.length > 260 ? "..." : ""}</td>
        </tr>`).join("")}</tbody>
      </table>
    </div>
  </section>`;
}

function dataBrowser() {
  return `<section class="tool-panel">
    <div class="filters" data-filter-table="data-table">
      <label>Search <input type="search" data-search placeholder="commands, sources, layouts"></label>
    </div>
    <div class="table-wrap">
      <table id="data-table">
        <thead><tr><th>Data file</th><th>Source path</th><th>Size</th></tr></thead>
        <tbody>${dataEntries.map((entry) => `<tr data-search="${esc(`${entry.title} ${entry.sourcePath} ${entry.raw.slice(0, 3000)}`.toLowerCase())}">
          <td><a href="${esc(entry.href)}">${esc(entry.title)}</a></td>
          <td><code>${esc(entry.sourcePath)}</code></td>
          <td>${badge(`${entry.raw.split("\n").length} lines`)}</td>
        </tr>`).join("")}</tbody>
      </table>
    </div>
  </section>`;
}

function searchPage() {
  return `<section class="search-page">
    <label class="big-search">Search everything <input id="page-search" type="search" placeholder="PATCH_9.BIN, SMBCONFIG.DAT, $HDTVFIX, POPSLoader"></label>
    <div id="page-search-results" class="page-search-results"></div>
  </section>`;
}

function glossary() {
  return `<div class="table-wrap"><table><thead><tr><th>Term</th><th>Definition</th><th>Sources</th></tr></thead><tbody>${data.glossary.map((item) => `<tr>
    <td><strong>${esc(item.term)}</strong></td>
    <td>${esc(item.definition)}</td>
    <td>${sourceLinks(item.sourceIds)}</td>
  </tr>`).join("")}</tbody></table></div>`;
}

function hotkeys() {
  return `<div class="table-wrap"><table><thead><tr><th>Combo</th><th>Behavior</th><th>Scope</th><th>Status</th></tr></thead><tbody>${data.hotkeys.map((item) => `<tr><td><code>${esc(item.combo)}</code></td><td>${esc(item.behavior)}</td><td>${esc(item.scope)}</td><td>${badge(item.verificationStatus)}</td></tr>`).join("")}</tbody></table></div>`;
}

function researchGaps() {
  return `<div class="table-wrap"><table><thead><tr><th>Gap</th><th>Why it matters</th><th>Next step</th><th>Status</th></tr></thead><tbody>${data.researchGaps.map((gap) => `<tr>
    <td><strong>${esc(gap.title)}</strong></td>
    <td>${esc(gap.whyItMatters)}</td>
    <td>${esc(gap.nextStep)}</td>
    <td>${badge(gap.status)}</td>
  </tr>`).join("")}</tbody></table></div>`;
}

function homeStats() {
  return `<section class="home-stats" aria-label="Recovered documentation summary">
    <p><strong>${allPages.length}</strong> searchable pages</p>
    <p><strong>${data.commands.length}</strong> command/code records</p>
    <p><strong>${data.configBytes.length}</strong> config-byte records</p>
    <p><strong>${data.wikiCoverage.length}</strong> recovered wiki pages indexed</p>
  </section>`;
}

function manualLedger() {
  const pagesBySlug = new Map(allPages.filter((item) => !item.noNav).map((item) => [item.slug, item]));
  const rows = navGroups.flatMap((group) => group.slugs.map((slug, index) => {
    const page = pagesBySlug.get(slug);
    if (!page) return "";
    return `<tr>
      <td><code>${esc(group.label.split(" ")[0])}.${index + 1}</code></td>
      <td><a href="${slugToHref(page.slug)}">${esc(page.nav || page.title)}</a></td>
      <td>${esc(group.label.replace(/^\d+\s*/, ""))}</td>
      <td>${esc(page.description || "")}</td>
    </tr>`;
  })).join("");
  return `<section>
    <h2>Complete Manual Ledger</h2>
    <p>This is the public reading order. It is intentionally table-first so new users can scan the whole manual before choosing a path.</p>
    <div class="table-wrap"><table><thead><tr><th>Order</th><th>Page</th><th>Section</th><th>Purpose</th></tr></thead><tbody>${rows}</tbody></table></div>
  </section>`;
}

function configTable() {
  const rows = data.configBytes.map((row) => `<tr>
    <td><code>${esc(row.offset)}</code></td>
    <td>${esc(row.default)}</td>
    <td>${esc(row.name)}</td>
    <td>${list(row.values)}</td>
    <td>${row.aliases.length ? list(row.aliases) : "None recorded"}</td>
    <td>${esc(row.notes)}</td>
    <td>${badge(row.confidence, row.confidence)} ${badge(row.verificationStatus)}</td>
    <td>${sourceLinks(row.sourceIds)}</td>
  </tr>`).join("");
  return `<div class="table-wrap"><table><thead><tr><th>Offset</th><th>Default</th><th>Setting</th><th>Values</th><th>Aliases</th><th>Notes</th><th>Status</th><th>Sources</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function compatibilityMap() {
  const rows = data.compatibilityMap.map((row) => `<tr>
    <td>${esc(row.behavior)}</td>
    <td>${row.cheatsCommand ? `<code>${esc(row.cheatsCommand)}</code>` : "None"}</td>
    <td>${row.patchFile ? `<code>${esc(row.patchFile)}</code>` : "None"}</td>
    <td>${row.trojanFile ? `<code>${esc(row.trojanFile)}</code>` : "None"}</td>
    <td>${row.configBytes ? `<code>${esc(row.configBytes)}</code>` : "None"}</td>
    <td>${esc(row.notes)}</td>
    <td>${badge(row.confidence, row.confidence)} ${badge(row.verificationStatus)}</td>
    <td>${sourceLinks(row.sourceIds)}</td>
  </tr>`).join("");
  return `<div class="table-wrap"><table><thead><tr><th>Behavior</th><th>CHEATS.TXT</th><th>PATCH</th><th>TROJAN</th><th>Config bytes</th><th>Notes</th><th>Status</th><th>Sources</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function downloadInventory() {
  const statuses = [...new Set(data.downloadInventory.map((item) => item.status))].sort();
  const rows = data.downloadInventory.map((item) => `<tr data-status="${esc(item.status)}" data-search="${esc([item.name, item.status, item.role, item.safeReference, item.notes].join(" ").toLowerCase())}">
    <td><code>${esc(item.name)}</code></td>
    <td>${badge(item.status)}</td>
    <td>${esc(item.role)}</td>
    <td>${esc(item.safeReference)}</td>
    <td>${esc(item.notes)}</td>
    <td>${sourceLinks(item.sourceIds)}</td>
  </tr>`).join("");
  return `<section class="tool-panel">
    <div class="filters" data-filter-table="download-inventory-table">
      <label>Search <input type="search" data-search placeholder="package, hash, role"></label>
      <label>Status <select data-filter="status"><option value="">All</option>${statuses.map((status) => `<option>${esc(status)}</option>`).join("")}</select></label>
    </div>
    <div class="table-wrap"><table id="download-inventory-table"><thead><tr><th>Name</th><th>Status</th><th>Role</th><th>Safe reference</th><th>Notes</th><th>Sources</th></tr></thead><tbody>${rows}</tbody></table></div>
  </section>`;
}

function wikiCoverage() {
  const categories = [...new Set(data.wikiCoverage.map((item) => item.category))].sort();
  const coverageMap = {
    "apps-last-version": ["toolchain-utilities", "App/tool inventory"],
    "automated": ["compatibility-map", "Automated patch/code behavior"],
    "bios-osd-handlers": ["vmc-handlers", "BIOS/OSD handler placement"],
    "cheat-engine": ["cheat-engine", "CHEATS.TXT and raw-code rules"],
    "chronology": ["history-provenance", "Timeline and build chronology"],
    "compatibility": ["compatibility-deep-dive", "Compatibility rates and caveats"],
    "configuration-table": ["config-table", "Config byte table"],
    "cue2pops-and-toolbox-changelogs": ["toolchain-utilities", "CUE2POPS/toolbox workflow"],
    "d2ls": ["display-code-appendix", "D2LS input mapping"],
    "debug-mode": ["debugging", "Debug and support-report behavior"],
    "ds34": ["device-irx-modules", "DS3/DS4 module notes"],
    "faqs": ["faq-known-bugs", "FAQ triage"],
    "game-compatibility": ["compatibility-deep-dive", "Game-specific compatibility"],
    "general-note": ["setup-paths", "General setup rules"],
    "hdd-mode": ["internal-hdd", "Internal HDD setup"],
    "help": ["quick-start", "Beginner route selection"],
    "history": ["history-provenance", "History overview"],
    "home": ["index", "Homepage manual ledger"],
    "hotkeys": ["igr-exit", "Hotkeys and IGR behavior"],
    "igr": ["igr-exit", "IGR command and exit chain"],
    "igr-textures": ["vmc-handlers", "IGR texture/resource layer"],
    "index": ["index", "Homepage manual ledger"],
    "irx-loader": ["device-irx-modules", "IRX loader rule"],
    "known-bugs": ["faq-known-bugs", "Known bug triage"],
    "multi-disc": ["multi-disc-vmc", "DISCS.TXT and VMCDIR.TXT"],
    "pfsshell": ["toolchain-utilities", "PFSSHELL transfer path"],
    "pmc-to-vmc": ["toolchain-utilities", "Save conversion appendix"],
    "poc2-pops-00001-era": ["poc2-history", "POC2 history"],
    "popstarter-batcher": ["toolchain-utilities", "Batcher role"],
    "popstarter-changelog": ["history-provenance", "Changelog/timeline"],
    "popstarter-hddosd": ["advanced-launch-modes", "HDDOSD/KELF route"],
    "popstarter10": ["history-provenance", "Old build history"],
    "popstarter11": ["history-provenance", "Old build history"],
    "popstarter12": ["history-provenance", "Old build history"],
    "popstarter9": ["history-provenance", "Old build history"],
    "popstarter-batcher-2": ["toolchain-utilities", "Batcher 2 role"],
    "proto": ["version-integrity", "Prototype caution"],
    "ps1-codes-in-ps1-raw-format": ["display-code-appendix", "RAW code archive handling"],
    "ps1-codes-in-ps2-raw-format": ["display-code-appendix", "RAW code archive handling"],
    "ps1-special-devices": ["device-irx-modules", "Special-device IRX flow"],
    "ps1-widescreen-codes": ["display-code-appendix", "Widescreen code caveats"],
    "ps1-buttons": ["device-irx-modules", "Input/device behavior"],
    "ps1cd-mode": ["advanced-launch-modes", "PS1 CD mode"],
    "quickstart-hdd": ["internal-hdd", "HDD quick start"],
    "quickstart-smb": ["smb-network", "SMB quick start"],
    "quickstart-usb": ["usb-storage", "USB quick start"],
    "radhostclient": ["toolchain-utilities", "RadHostClient transfer path"],
    "related-stuff": ["toolchain-utilities", "Related tools"],
    "rip-off": ["version-integrity", "Tampered-bundle warning"],
    "scanlines": ["display-code-appendix", "Scanline visual option"],
    "smb-mode": ["smb-network", "SMB mode"],
    "smooth": ["display-code-appendix", "Smooth visual option"],
    "special-cheats": ["cheat-engine", "Special commands"],
    "timeline": ["history-provenance", "Timeline"],
    "toolbox-commands": ["toolchain-utilities", "Toolbox commands"],
    "troubleshooting-games": ["troubleshooting", "Troubleshooting"],
    "ule-khn": ["advanced-launch-modes", "uLE_kHn launch route"],
    "usb-mode": ["usb-storage", "USB mode"],
    "vcd": ["toolchain-utilities", "VCD conversion"],
    "version": ["version-integrity", "Build ID and version checks"],
    "vmc": ["vmc-handlers", "VMC behavior"],
    "vmc-to-pmc": ["toolchain-utilities", "Save conversion appendix"],
    "widescreen": ["display-code-appendix", "Widescreen command caveats"]
  };
  const rows = data.wikiCoverage.map((item) => {
    const target = coverageMap[item.slug];
    const covered = Boolean(target);
    return `<tr data-category="${esc(item.category)}" data-coverage="${covered ? "covered" : "indexed"}" data-search="${esc([item.slug, item.title, item.category, item.status, target?.join(" ")].join(" ").toLowerCase())}">
      <td><strong>${esc(item.title)}</strong><br><code>${esc(item.slug)}</code></td>
      <td>${badge(item.category)} ${badge(item.status)}</td>
      <td>${covered ? `${pageLink(target[0], allPages.find((page) => page.slug === target[0])?.title || target[0])}<br><span class="muted">${esc(target[1])}</span>` : `<span class="muted">Indexed only; needs dedicated expansion</span>`}</td>
    </tr>`;
  }).join("");
  return `<section class="tool-panel">
    <div class="filters" data-filter-table="wiki-coverage-table">
      <label>Search <input type="search" data-search placeholder="wiki page, topic, slug"></label>
      <label>Category <select data-filter="category"><option value="">All</option>${categories.map((category) => `<option>${esc(category)}</option>`).join("")}</select></label>
      <label>Coverage <select data-filter="coverage"><option value="">All</option><option value="covered">Covered</option><option value="indexed">Indexed only</option></select></label>
    </div>
    <div class="table-wrap">
      <table id="wiki-coverage-table">
        <thead><tr><th>Recovered wiki page</th><th>Source category/status</th><th>Where this site covers it</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </section>`;
}

function historyTimeline() {
  return `<div class="table-wrap"><table><thead><tr><th>Date / label</th><th>Summary</th><th>Why it matters</th><th>Sources</th></tr></thead><tbody>${data.historyTimeline.map((item) => `<tr>
    <td><time>${esc(item.date)}</time><br><strong>${esc(item.label)}</strong></td>
    <td>${esc(item.summary)}</td>
    <td>${esc(item.impact)}</td>
    <td>${sourceLinks(item.sourceIds)}</td>
  </tr>`).join("")}</tbody></table></div>`;
}

const dynamicBlocks = {
  homeStats,
  manualLedger,
  commandReference,
  storageMatrix,
  patchTable,
  issueList,
  sourceArchive,
  archiveIndex,
  dataBrowser,
  searchPage,
  glossary,
  hotkeys,
  researchGaps,
  configTable,
  compatibilityMap,
  downloadInventory,
  wikiCoverage,
  historyTimeline
};

const generatedPages = [
  {
    slug: "search",
    title: "Search",
    nav: "Search",
    description: "Search every guide page, structured data entry, source note, research file, and archived seed document.",
    blocks: [{ dynamic: "searchPage" }]
  },
  {
    slug: "archive",
    title: "Local Source Archive",
    nav: "Archive",
    description: "All local seed docs, research notes, raw source captures, prompts, and project README rendered as searchable pages.",
    blocks: [{ dynamic: "archiveIndex" }]
  },
  {
    slug: "data-browser",
    title: "Data Browser",
    nav: "Data",
    description: "Structured JSON powering the command reference, storage matrix, fixes, issues, sources, glossary, and research gaps.",
    blocks: [{ dynamic: "dataBrowser" }]
  },
  ...archiveEntries.map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    nav: "",
    description: `Rendered local archive file: ${entry.sourcePath}`,
    blocks: [
      `<section class="callout"><h2>Source file</h2><p><code>${esc(entry.sourcePath)}</code></p></section>`,
      `<article class="archive-doc">${entry.html}</article>`
    ],
    noNav: true,
    searchType: "archive",
    searchText: entry.raw
  })),
  ...dataEntries.map((entry) => ({
    slug: entry.slug,
    title: entry.title,
    nav: "",
    description: `Rendered structured data file: ${entry.sourcePath}`,
    blocks: [
      `<section class="callout"><h2>Source file</h2><p><code>${esc(entry.sourcePath)}</code></p></section>`,
      `<article class="archive-doc">${entry.html}</article>`
    ],
    noNav: true,
    searchType: "data",
    searchText: entry.raw
  }))
];

const allPages = [...pages, ...generatedPages];

const navGroups = [
  { label: "0 Start Here", slugs: ["index", "quick-start"] },
  { label: "1 Setup Paths", slugs: ["setup-paths", "launcher-matrix", "toolchain-utilities"] },
  { label: "2 Storage Backends", slugs: ["storage-overview", "usb-storage", "internal-hdd", "smb-network", "bdm-exfat", "advanced-launch-modes", "popsloader-guide", "storage-matrix"] },
  { label: "3 Reference Tables", slugs: ["reference-tables", "command-reference", "cheat-engine", "config-table", "compatibility-map", "compatibility-deep-dive", "patches-fixes", "igr-exit", "multi-disc-vmc", "vmc-handlers", "device-irx-modules", "display-code-appendix", "video-display", "debugging", "troubleshooting", "faq-known-bugs"] },
  { label: "4 Archive & Provenance", slugs: ["archive-provenance", "thread-study", "poc2-history", "version-integrity", "download-inventory", "history-provenance", "wiki-coverage", "source-archive", "research-log", "credits"] },
  { label: "Appendices", slugs: ["glossary", "search", "archive", "data-browser"] }
];

function sidebarNav(page) {
  const pagesBySlug = new Map(allPages.filter((item) => !item.noNav).map((item) => [item.slug, item]));
  const grouped = new Set(navGroups.flatMap((group) => group.slugs));
  const groups = navGroups
    .map((group) => {
      const links = group.slugs
        .map((slug) => pagesBySlug.get(slug))
        .filter(Boolean)
        .map((item) => `<a ${item.slug === page.slug ? "aria-current=\"page\"" : ""} href="${slugToHref(item.slug)}">${esc(item.nav || item.title)}</a>`)
        .join("");
      return links ? `<div class="nav-group"><div class="nav-heading">${esc(group.label)}</div>${links}</div>` : "";
    })
    .join("");
  const extras = [...pagesBySlug.values()].filter((item) => !grouped.has(item.slug));
  if (!extras.length) return groups;
  return `${groups}<div class="nav-group"><div class="nav-heading">Other</div>${extras.map((item) => `<a ${item.slug === page.slug ? "aria-current=\"page\"" : ""} href="${slugToHref(item.slug)}">${esc(item.nav || item.title)}</a>`).join("")}</div>`;
}

function headingAnchor(value, used) {
  const base = slugify(value) || "section";
  const count = used.get(base) || 0;
  used.set(base, count + 1);
  return count ? `${base}-${count + 1}` : base;
}

function anchorHeadings(html) {
  const headings = [];
  const used = new Map();
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (match, level, inner) => {
    if (/<a\s/i.test(inner) || /\sid="/i.test(match)) return match;
    const plain = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!plain) return match;
    const id = headingAnchor(plain, used);
    headings.push({ id, level: Number(level), text: plain });
    return `<h${level} id="${esc(id)}">${inner}<a class="heading-anchor" href="#${esc(id)}" aria-label="Link to ${esc(plain)}">#</a></h${level}>`;
  });
  return { html: out, headings };
}

function pageContents(headings) {
  const items = headings.filter((heading) => heading.level === 2).slice(0, 14);
  if (!items.length) return `<p class="toc-empty">No section headings.</p>`;
  return items.map((heading) => `<a href="#${esc(heading.id)}">${esc(heading.text)}</a>`).join("");
}

function renderPage(page) {
  const nav = sidebarNav(page);
  const bodyClass = page.slug === "index" ? "home-page" : "content-page";
  const blockHtml = (page.blocks || []).map((block) => {
    if (typeof block === "string") return block;
    if (block.dynamic) return dynamicBlocks[block.dynamic]();
    return "";
  }).join("\n");
  const anchored = anchorHeadings(blockHtml);
  const heroActions = page.slug === "index"
    ? `<div class="hero-actions">
        <a class="button-link primary" href="quick-start.html">Start with Quick Start</a>
        <a class="button-link" href="setup-paths.html">Read the manual</a>
      </div>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)} - POPStarter Docs</title>
  <meta name="description" content="${esc(page.description || "POPStarter preservation documentation")}">
  <meta name="generator" content="POPStarter zero-dependency static generator">
  <link rel="stylesheet" href="assets/styles.css">
  <link rel="search" type="application/opensearchdescription+xml" href="opensearch.xml" title="POPStarter Docs">
</head>
<body class="${bodyClass}">
  <header class="topbar">
    <a class="brand" href="index.html"><span class="brand-mark">P1</span><span class="brand-copy"><strong>POPStarter Docs</strong><small>Recovered preservation manual</small></span></a>
    <div class="top-actions">
      <a class="top-link" href="setup-paths.html">Setup</a>
      <a class="top-link" href="storage-overview.html">Storage</a>
      <a class="top-link" href="reference-tables.html">Reference</a>
      <a class="top-link" href="archive-provenance.html">Archive</a>
      <label class="site-search"><span>Search</span><input id="global-search" type="search" placeholder="SMBCONFIG.DAT, PATCH_9.BIN, VMC"></label>
    </div>
  </header>
  <div class="shell">
    <nav class="sidebar">${nav}</nav>
    <main>
      <section class="hero">
        <div class="hero-copy">
          <h1>${esc(page.title)}</h1>
          <p>${esc(page.description || "")}</p>${heroActions ? `\n          ${heroActions}` : ""}
        </div>
      </section>
      <div class="content-layout">
        <article class="article-content">${anchored.html}</article>
        <aside class="page-toc" aria-label="On this page">
          <strong>On this page</strong>
          ${pageContents(anchored.headings)}
        </aside>
      </div>
    </main>
  </div>
  <footer class="site-footer">
    <p>Generated ${esc(generatedAt)} from local seed docs, source notes, research files, and structured data. No Sony POPS binaries are included.</p>
  </footer>
  <script type="application/json" id="search-data">${JSON.stringify(searchIndex()).replaceAll("<", "\\u003c")}</script>
  <script src="assets/client.js"></script>
</body>
</html>`;
}

function textFromHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function searchIndex() {
  const pageRows = allPages.map((page) => ({
    title: page.title,
    href: slugToHref(page.slug),
    type: page.searchType || (page.noNav ? "archive" : "page"),
    text: `${page.description || ""} ${page.searchText || ""} ${textFromHtml((page.blocks || []).filter((block) => typeof block === "string").join(" "))}`
  }));
  const commandRows = data.commands.map((command) => ({
    title: command.command,
    href: "command-reference.html",
    type: "command",
    text: `${command.category} ${command.effect} ${command.notes}`
  }));
  const storageRows = data.storageLayouts.map((layout) => ({
    title: layout.name,
    href: "storage-matrix.html",
    type: "storage",
    text: `${layout.storageBackend} ${layout.launcherFrontend} ${layout.filesystem} ${layout.exactPaths.join(" ")}`
  }));
  const patchRows = data.patches.map((patch) => ({
    title: patch.file,
    href: "patches-fixes.html",
    type: "patch",
    text: `${patch.type} ${patch.placement} ${patch.effect} ${patch.conflicts.join(" ")}`
  }));
  const configRows = data.configBytes.map((row) => ({
    title: row.offset,
    href: "config-table.html",
    type: "config",
    text: `${row.name} ${row.default} ${row.values.join(" ")} ${row.aliases.join(" ")} ${row.notes}`
  }));
  const compatibilityRows = data.compatibilityMap.map((row) => ({
    title: row.behavior,
    href: "compatibility-map.html",
    type: "compatibility",
    text: `${row.cheatsCommand} ${row.patchFile} ${row.trojanFile} ${row.configBytes} ${row.notes}`
  }));
  const inventoryRows = data.downloadInventory.map((item) => ({
    title: item.name,
    href: "download-inventory.html",
    type: "inventory",
    text: `${item.status} ${item.role} ${item.safeReference} ${item.notes}`
  }));
  const wikiRows = data.wikiCoverage.map((item) => ({
    title: item.title,
    href: "wiki-coverage.html",
    type: "wiki",
    text: `${item.slug} ${item.category} ${item.status}`
  }));
  const timelineRows = data.historyTimeline.map((item) => ({
    title: `${item.date} ${item.label}`,
    href: "history-provenance.html",
    type: "history",
    text: `${item.summary} ${item.impact}`
  }));
  const issueRows = data.knownIssues.map((issue) => ({
    title: issue.title,
    href: "troubleshooting.html",
    type: "issue",
    text: `${issue.symptom} ${issue.likelyCauses.join(" ")} ${issue.mitigation}`
  }));
  const sourceRows = data.sources.map((source) => ({
    title: source.title,
    href: "source-archive.html",
    type: "source",
    text: `${isLinkableUrl(source.url) ? source.url : sourceLabel(source)} ${source.type} ${source.status} ${source.reliability} ${source.notes}`
  }));
  const glossaryRows = data.glossary.map((item) => ({
    title: item.term,
    href: "glossary.html",
    type: "glossary",
    text: item.definition
  }));
  return [...pageRows, ...commandRows, ...storageRows, ...patchRows, ...configRows, ...compatibilityRows, ...inventoryRows, ...wikiRows, ...timelineRows, ...issueRows, ...sourceRows, ...glossaryRows];
}

await rm(distDir, { recursive: true, force: true });
await mkdir(path.join(distDir, "assets"), { recursive: true });
await mkdir(path.join(distDir, "evidence"), { recursive: true });

for (const page of allPages) {
  await writeFile(path.join(distDir, slugToHref(page.slug)), renderPage(page), "utf8");
}

await copyFile(path.join(srcDir, "styles.css"), path.join(distDir, "assets", "styles.css"));
await copyFile(path.join(srcDir, "client.js"), path.join(distDir, "assets", "client.js"));
await writeFile(path.join(distDir, "evidence", "user_uploaded_notes_raw.md"), sanitizePublicText(await readFile(path.join(root, "source_notes", "user_uploaded_notes_raw.md"), "utf8")), "utf8");
await writeFile(path.join(distDir, "evidence", "assistant_research_notes.md"), sanitizePublicText(await readFile(path.join(root, "source_notes", "assistant_research_notes.md"), "utf8")), "utf8");
await copyFile(path.join(root, "media", "discord_popstarter_test_screenshot.png"), path.join(distDir, "evidence", "discord_popstarter_test_screenshot.png"));
await writeFile(path.join(distDir, "search-index.json"), JSON.stringify(searchIndex(), null, 2), "utf8");
await writeFile(path.join(distDir, ".nojekyll"), "", "utf8");
await writeFile(path.join(distDir, "404.html"), renderPage({
  slug: "404",
  title: "Not Found",
  description: "The requested page was not found. Use search or the archive to find the recovered POPStarter material.",
  blocks: [
    `<section class="callout"><h2>Try search</h2><p>The full local seed pack is indexed. Start with the search page, source archive, or data browser.</p><p><a class="button-link" href="search.html">Open search</a></p></section>`
  ],
  noNav: true
}), "utf8");
await writeFile(path.join(distDir, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: sitemap.xml\n", "utf8");
await writeFile(path.join(distDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => `  <url><loc>${esc(slugToHref(page.slug))}</loc></url>`).join("\n")}
</urlset>
`, "utf8");
await writeFile(path.join(distDir, "opensearch.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>POPStarter Docs</ShortName>
  <Description>Search POPStarter preservation documentation</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Url type="text/html" template="search.html?q={searchTerms}"/>
</OpenSearchDescription>
`, "utf8");

console.log(`Built ${allPages.length} pages into ${path.relative(root, distDir)}`);
