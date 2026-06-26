from bs4 import BeautifulSoup
import urllib.parse

file_path = "/Users/nicholaselia/.gemini/antigravity/brain/b3eab0f5-7ff7-475b-a955-38773939fe9f/.system_generated/steps/445/content.md"

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

collections = []
for a in soup.find_all('a', href=True):
    href = a['href']
    if '/collections/' in href:
        # Get path part
        path = urllib.parse.urlparse(href).path
        text = a.get_text(strip=True)
        collections.append((path, text))

# Remove duplicates and format
unique_collections = sorted(list(set(collections)))

print(f"Found {len(unique_collections)} collection links:")
for path, text in unique_collections:
    if path != '/collections':
        print(f" - Link: {path} | Text: {text}")
