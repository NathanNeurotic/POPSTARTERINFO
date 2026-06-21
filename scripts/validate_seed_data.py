#!/usr/bin/env python3
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
commands = json.loads((root / "data" / "popstarter_commands.seed.json").read_text(encoding="utf-8"))
storage = json.loads((root / "data" / "storage_matrix.seed.json").read_text(encoding="utf-8"))

errors = []
seen = set()
for c in commands:
    for field in ["command", "category", "effect", "confidence", "sources"]:
        if field not in c or not c[field]:
            errors.append(f"Command missing {field}: {c}")
    if c["command"] in seen:
        errors.append(f"Duplicate command: {c['command']}")
    seen.add(c["command"])

for layout in storage.get("layouts", []):
    for field in ["name", "device", "files", "source"]:
        if field not in layout or not layout[field]:
            errors.append(f"Storage layout missing {field}: {layout.get('name', layout)}")

if errors:
    print("Validation failed:")
    for e in errors:
        print(" -", e)
    raise SystemExit(1)

print(f"OK: {len(commands)} commands, {len(storage.get('layouts', []))} storage layouts")
