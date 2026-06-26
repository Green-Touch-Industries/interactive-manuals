import re

file_path = "/Users/nicholaselia/Desktop/Clients/GTI_2026/Antigravity Work/collections_rebuild_guide.md"

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Find headers starting with ###
collections = re.findall(r'### ([^\n]+)', text)

print(f"Shopify Collections found in checklist:")
for i, col in enumerate(collections):
    # print collection and count of list items inside it
    # find section content
    pattern = r'### ' + re.escape(col) + r'(.*?)(?=### |---|\Z)'
    section = re.search(pattern, text, re.DOTALL)
    count = 0
    if section:
        count = len(re.findall(r'- \[ \]', section.group(1)))
    print(f" {i+1}. {col} ({count} items)")
