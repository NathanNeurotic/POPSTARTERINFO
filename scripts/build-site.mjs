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
  researchGaps: await loadJson("researchGaps.json")
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
  const cards = data.storageLayouts
    .map((layout) => `<article class="layout-card" data-backend="${esc(layout.storageBackend)}" data-launcher="${esc(layout.launcherFrontend)}" data-confidence="${esc(layout.confidence)}" data-search="${esc([layout.name, layout.storageBackend, layout.launcherFrontend, layout.filesystem, layout.warnings.join(" ")].join(" ").toLowerCase())}">
      <div class="card-head">
        <h3>${esc(layout.name)}</h3>
        <div>${badge(layout.confidence, layout.confidence)} ${badge(layout.verificationStatus)}</div>
      </div>
      <dl class="compact">
        <dt>Backend</dt><dd>${esc(layout.storageBackend)}</dd>
        <dt>Launcher</dt><dd>${esc(layout.launcherFrontend)}</dd>
        <dt>Filesystem</dt><dd>${esc(layout.filesystem)}</dd>
      </dl>
      <h4>Required files</h4>${list(layout.requiredFiles)}
      <h4>Exact paths</h4>${codeBlock(layout.exactPaths)}
${layout.sampleConfig ? `      <h4>Sample config</h4>${codeBlock(layout.sampleConfig)}` : ""}
      <h4>Warnings</h4>${list(layout.warnings)}
      <p class="sources">${sourceLinks(layout.sourceIds)}</p>
    </article>`)
    .join("");

  return `<section class="tool-panel">
    <div class="filters" data-filter-cards="storage-grid">
      <label>Search <input type="search" data-search placeholder="backend, launcher, file"></label>
      <label>Backend <select data-filter="backend"><option value="">All</option>${backends.map((backend) => `<option>${esc(backend)}</option>`).join("")}</select></label>
      <label>Launcher <select data-filter="launcher"><option value="">All</option>${launchers.map((launcher) => `<option>${esc(launcher)}</option>`).join("")}</select></label>
      <label>Confidence <select data-filter="confidence"><option value="">All</option><option>high</option><option>medium</option><option>low</option></select></label>
    </div>
    <div class="grid layouts" id="storage-grid">${cards}</div>
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
  return `<div class="issue-list">${data.knownIssues.map((issue) => `<article class="issue">
    <h3>${esc(issue.title)}</h3>
    <p><strong>Symptom:</strong> ${esc(issue.symptom)}</p>
    <p><strong>Likely causes:</strong></p>${list(issue.likelyCauses)}
    <p><strong>Mitigation:</strong> ${esc(issue.mitigation)}</p>
    <p>${badge(issue.confidence, issue.confidence)} ${badge(issue.verificationStatus)}</p>
    <p class="sources">${sourceLinks(issue.sourceIds)}</p>
  </article>`).join("")}</div>`;
}

function sourceArchive() {
  return `<div class="grid sources-grid">${data.sources.map((source) => `<article class="source-card">
    <h3>${isLinkableUrl(source.url) ? `<a href="${esc(source.url)}" target="_blank" rel="noreferrer">${esc(source.title)}</a>` : esc(sourceLabel(source))}</h3>
    <p>${esc(source.notes)}</p>
    <p>${badge(source.type)} ${badge(source.status)} ${badge(source.reliability)}</p>
  </article>`).join("")}</div>`;
}

function archiveIndex() {
  return `<section class="tool-panel">
    <div class="filters" data-filter-cards="archive-grid">
      <label>Search <input type="search" data-search placeholder="source file, notes, raw text"></label>
    </div>
    <div class="grid sources-grid" id="archive-grid">
      ${archiveEntries.map((entry) => `<article class="source-card" data-search="${esc(`${entry.title} ${entry.sourcePath} ${entry.raw.slice(0, 3000)}`.toLowerCase())}">
        <h3><a href="${esc(entry.href)}">${esc(entry.title)}</a></h3>
        <p><code>${esc(entry.sourcePath)}</code></p>
        <p>${esc(entry.raw.replace(/\s+/g, " ").slice(0, 220))}${entry.raw.length > 220 ? "..." : ""}</p>
      </article>`).join("")}
    </div>
  </section>`;
}

function dataBrowser() {
  return `<section class="tool-panel">
    <div class="filters" data-filter-cards="data-grid">
      <label>Search <input type="search" data-search placeholder="commands, sources, layouts"></label>
    </div>
    <div class="grid sources-grid" id="data-grid">
      ${dataEntries.map((entry) => `<article class="source-card" data-search="${esc(`${entry.title} ${entry.sourcePath} ${entry.raw.slice(0, 3000)}`.toLowerCase())}">
        <h3><a href="${esc(entry.href)}">${esc(entry.title)}</a></h3>
        <p><code>${esc(entry.sourcePath)}</code></p>
        <p>${badge(`${entry.raw.split("\n").length} lines`)}</p>
      </article>`).join("")}
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
  return `<div class="glossary">${data.glossary.map((item) => `<article>
    <h3>${esc(item.term)}</h3>
    <p>${esc(item.definition)}</p>
    <p class="sources">${sourceLinks(item.sourceIds)}</p>
  </article>`).join("")}</div>`;
}

function hotkeys() {
  return `<div class="table-wrap"><table><thead><tr><th>Combo</th><th>Behavior</th><th>Scope</th><th>Status</th></tr></thead><tbody>${data.hotkeys.map((item) => `<tr><td><code>${esc(item.combo)}</code></td><td>${esc(item.behavior)}</td><td>${esc(item.scope)}</td><td>${badge(item.verificationStatus)}</td></tr>`).join("")}</tbody></table></div>`;
}

function researchGaps() {
  return `<div class="issue-list">${data.researchGaps.map((gap) => `<article class="issue">
    <h3>${esc(gap.title)}</h3>
    <p>${esc(gap.whyItMatters)}</p>
    <p><strong>Next step:</strong> ${esc(gap.nextStep)}</p>
    <p>${badge(gap.status)}</p>
  </article>`).join("")}</div>`;
}

const dynamicBlocks = {
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
  researchGaps
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

function renderPage(page) {
  const nav = allPages
    .filter((item) => !item.noNav)
    .map((item) => `<a ${item.slug === page.slug ? "aria-current=\"page\"" : ""} href="${slugToHref(item.slug)}">${esc(item.nav || item.title)}</a>`)
    .join("");
  const blockHtml = (page.blocks || []).map((block) => {
    if (typeof block === "string") return block;
    if (block.dynamic) return dynamicBlocks[block.dynamic]();
    return "";
  }).join("\n");

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
<body>
  <header class="topbar">
    <a class="brand" href="index.html"><span>POPStarter</span><small>Preservation Docs</small></a>
    <div class="top-actions">
      <a class="top-link" href="archive.html">Archive</a>
      <a class="top-link" href="data-browser.html">Data</a>
      <a class="top-link" href="search.html">Search page</a>
      <label class="site-search">Search <input id="global-search" type="search" placeholder="commands, storage, fixes"></label>
    </div>
  </header>
  <div class="shell">
    <nav class="sidebar">${nav}</nav>
    <main>
      <section class="hero">
        <h1>${esc(page.title)}</h1>
        <p>${esc(page.description || "")}</p>
      </section>
      ${blockHtml}
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
  return [...pageRows, ...commandRows, ...storageRows, ...patchRows, ...issueRows, ...sourceRows, ...glossaryRows];
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
