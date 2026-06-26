import re

file_path = "/Users/nicholaselia/Desktop/Clients/GTI_2026/Antigravity Work/collections_rebuild_guide.md"

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

target_collections = [
    "XTREME PRO: ARMORED SERIES",
    "CLASSIC SERIES: UTILITY GEAR",
    "MOUNTING SOLUTIONS",
    "TRAILER ESSENTIALS"
]

for col in target_collections:
    print(f"\n=================== {col} ===================")
    # Find matching ### header
    # Escape any special regex chars
    col_escaped = re.escape(col)
    pattern = r'### ' + col_escaped + r'\s*\(\d+ items\)\s*\n(.*?)(?=\n### |---|\Z)'
    match = re.search(pattern, text, re.DOTALL)
    if match:
        content = match.group(1).strip()
        items = re.findall(r'- \[ \] \*\*([^*]+)\*\* \(SKU: `([^`]+)`', content)
        for name, sku in items:
            print(f" - {name} (SKU: {sku})")
    else:
        print("Collection section not found.")
