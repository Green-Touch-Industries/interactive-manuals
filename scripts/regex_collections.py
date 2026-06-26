import re

file_path = "/Users/nicholaselia/.gemini/antigravity/brain/b3eab0f5-7ff7-475b-a955-38773939fe9f/.system_generated/steps/445/content.md"

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Find all matches of /collections/something
matches = re.findall(r'/collections/[a-zA-Z0-9_\-]+', text)
unique_matches = sorted(list(set(matches)))

print(f"Regex matches: {len(unique_matches)}")
for match in unique_matches:
    print(f" - {match}")
