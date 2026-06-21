import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const errors = [];

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function collect(dir, predicate) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collect(full, predicate));
    } else if (predicate(full)) {
      files.push(full);
    }
  }
  return files;
}

if (!(await exists(dist))) {
  errors.push("dist/ does not exist; run npm run build first");
} else {
  const required = [
    "index.html",
    "search.html",
    "archive.html",
    "data-browser.html",
    "404.html",
    "sitemap.xml",
    "robots.txt",
    ".nojekyll",
    "assets/styles.css",
    "assets/client.js",
    "search-index.json"
  ];

  for (const rel of required) {
    if (!(await exists(path.join(dist, rel)))) errors.push(`missing ${rel}`);
  }

  const htmlFiles = await collect(dist, (file) => file.endsWith(".html"));
  if (htmlFiles.length < 30) {
    errors.push(`expected at least 30 generated HTML pages, found ${htmlFiles.length}`);
  }

  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const rel = path.relative(dist, file).replace(/\\/g, "/");
    if (html.includes("undefined")) errors.push(`${rel} contains undefined`);
    if (html.includes("[object Object]")) errors.push(`${rel} contains [object Object]`);
    if (!html.includes("id=\"search-data\"")) errors.push(`${rel} missing embedded search data`);
    if (!html.includes("assets/styles.css")) errors.push(`${rel} missing stylesheet`);

    const hrefs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
    for (const href of hrefs) {
      if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
      if (href.startsWith("data:")) continue;
      const target = href.split("#")[0].split("?")[0];
      if (!target || target === "opensearch.xml") continue;
      const resolved = path.resolve(path.dirname(file), target);
      if (!resolved.startsWith(dist)) {
        errors.push(`${rel} links outside dist: ${href}`);
      } else if (!(await exists(resolved))) {
        errors.push(`${rel} has missing local link: ${href}`);
      }
    }
  }

  const index = JSON.parse(await readFile(path.join(dist, "search-index.json"), "utf8"));
  const types = new Set(index.map((item) => item.type));
  for (const type of ["page", "archive", "data", "command", "storage", "patch", "issue", "source", "glossary"]) {
    if (!types.has(type)) errors.push(`search index missing type ${type}`);
  }
}

if (errors.length) {
  console.error("Generated site validation failed:");
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}

console.log("OK: generated site is complete and internally linked");
