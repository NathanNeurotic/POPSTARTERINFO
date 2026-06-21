import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "src", "data");

const files = [
  "sources.json",
  "commands.json",
  "storageLayouts.json",
  "patches.json",
  "knownIssues.json",
  "glossary.json",
  "hotkeys.json",
  "researchGaps.json",
  "configBytes.json",
  "compatibilityMap.json",
  "downloadInventory.json",
  "wikiCoverage.json",
  "historyTimeline.json"
];

async function loadJson(file) {
  const raw = await readFile(path.join(dataDir, file), "utf8");
  return JSON.parse(raw);
}

function requireFields(item, fields, label, errors) {
  for (const field of fields) {
    if (item[field] === undefined || item[field] === null || item[field] === "") {
      errors.push(`${label} missing ${field}: ${item.id || item.command || item.name || item.term || JSON.stringify(item)}`);
    }
  }
}

const errors = [];
const loaded = Object.fromEntries(await Promise.all(files.map(async (file) => [file, await loadJson(file)])));

const sourceIds = new Set();
for (const source of loaded["sources.json"]) {
  requireFields(source, ["id", "title", "url", "type", "status", "reliability"], "source", errors);
  if (sourceIds.has(source.id)) errors.push(`duplicate source id: ${source.id}`);
  sourceIds.add(source.id);
}

for (const command of loaded["commands.json"]) {
  requireFields(command, ["command", "category", "scope", "placement", "effect", "notes", "conflicts", "sourceIds", "confidence", "verificationStatus"], "command", errors);
  if (!Array.isArray(command.sourceIds) || command.sourceIds.length === 0) {
    errors.push(`command ${command.command} has no source ids`);
  }
  for (const sourceId of command.sourceIds) {
    if (!sourceIds.has(sourceId)) errors.push(`command ${command.command} references unknown source ${sourceId}`);
  }
}

for (const layout of loaded["storageLayouts.json"]) {
  requireFields(layout, ["id", "name", "storageBackend", "launcherFrontend", "filesystem", "requiredFiles", "exactPaths", "warnings", "sourceIds", "confidence", "verificationStatus"], "storage layout", errors);
}

for (const patch of loaded["patches.json"]) {
  requireFields(patch, ["id", "file", "type", "placement", "effect", "conflicts", "sourceIds", "confidence", "verificationStatus"], "patch", errors);
}

for (const issue of loaded["knownIssues.json"]) {
  requireFields(issue, ["id", "title", "symptom", "likelyCauses", "mitigation", "sourceIds", "confidence", "verificationStatus"], "known issue", errors);
}

for (const gap of loaded["researchGaps.json"]) {
  requireFields(gap, ["id", "title", "whyItMatters", "nextStep", "status"], "research gap", errors);
}

for (const row of loaded["configBytes.json"]) {
  requireFields(row, ["offset", "default", "name", "values", "aliases", "notes", "sourceIds", "confidence", "verificationStatus"], "config byte", errors);
}

for (const row of loaded["compatibilityMap.json"]) {
  requireFields(row, ["behavior", "notes", "sourceIds", "confidence", "verificationStatus"], "compatibility map", errors);
}

for (const row of loaded["downloadInventory.json"]) {
  requireFields(row, ["name", "status", "role", "safeReference", "notes", "sourceIds"], "download inventory", errors);
}

for (const row of loaded["wikiCoverage.json"]) {
  requireFields(row, ["slug", "title", "category", "status"], "wiki coverage", errors);
}

for (const row of loaded["historyTimeline.json"]) {
  requireFields(row, ["date", "label", "summary", "impact", "sourceIds"], "history timeline", errors);
}

if (errors.length) {
  console.error("Site data validation failed:");
  for (const error of errors) console.error(` - ${error}`);
  process.exit(1);
}

console.log(`OK: ${files.length} data files, ${sourceIds.size} sources`);
