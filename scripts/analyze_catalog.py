import json
import csv
import os

# Paths
catalog_path = "/Users/nicholaselia/Desktop/Clients/GTI_2026/Antigravity Work/green_touch_catalog.json"
instructions_dir = "/Users/nicholaselia/Desktop/Clients/GTI_2026/Instructions"

# List instructions files
instruction_files = []
for file in os.listdir(instructions_dir):
    if file.lower().endswith(('.pdf', '.png', '.jpg', '.jpeg', '.webp')) and not file.startswith('.'):
        instruction_files.append(file)

print(f"Found {len(instruction_files)} instruction files in local folder.")

# Load catalog
try:
    with open(catalog_path, 'r') as f:
        catalog = json.load(f)
except Exception as e:
    catalog = []
    print(f"Error loading catalog: {e}")

print(f"Loaded {len(catalog)} catalog entries.")

# Analyze products
categorized_products = {
    "Xtreme Pro Series": [],
    "Classic Series": [],
    "Mounting Solutions": [],
    "Trailer Essentials": [],
    "Other/Uncategorized": []
}

# Simple rules to categorize based on title, SKU, or description
for prod in catalog:
    title = prod.get("BaseTitle", "")
    handle = prod.get("Handle", "")
    
    # Skip Scratch and Dent
    if "scratch and dent" in title.lower() or "snd" in handle.lower():
        continue
    
    # Skip obvious maintenance
    if any(m in title.lower() for m in ["replacement", "maintenance", "grease", "lube", "key", "lock", "screw", "bolt", "bracket only", "spring", "strap only"]):
        continue

    # Attempt to categorize
    category = "Other/Uncategorized"
    
    # Rule matching
    title_lower = title.lower()
    sku = ""
    if prod.get("Variants"):
        sku = prod["Variants"][0].get("SKU", "")
    
    # Xtreme Pro Series
    # Includes XA102, XB103, XC104, BPS100, SPC21, etc.
    if "xtreme pro" in title_lower or any(k in sku for k in ["XA102", "XB103", "XC104", "BPS100", "SPC21"]):
        category = "Xtreme Pro Series"
    # Classic Series
    # Includes QA101, LA011, LB012, XE106, XF107, etc.
    elif "classic series" in title_lower or any(k in sku for k in ["QA101", "LA011", "LB012", "XE106", "XF107"]):
        category = "Classic Series"
    # Mounting Solutions
    # e.g., Stake pocket mount, engine support kit, rails, etc.
    elif any(k in title_lower for k in ["mount", "pocket", "support kit", "brackets", "clamp"]) or any(k in sku for k in ["EI086", "ESK100", "CX115"]):
        category = "Mounting Solutions"
    # Trailer Essentials
    # e.g. SureCage, Fuel Cages, Fastrap, organizer, tools, etc.
    elif any(k in title_lower for k in ["cage", "fastrap", "organizer", "tie-down", "trimmer line", "essential"]) or any(k in sku for k in ["WC001", "SPC20"]):
        category = "Trailer Essentials"
        
    # Check if this product has instructions
    # Cross reference with files
    matched_instructions = []
    # Search title/sku keywords in instruction filenames
    for file in instruction_files:
        file_lower = file.lower()
        # Look for SKU matches
        sku_clean = sku.replace("-", "").lower()
        if len(sku_clean) > 3 and sku_clean in file_lower.replace("_", "").replace("-", ""):
            matched_instructions.append(file)
            continue
        # Look for handle keyword matches
        for part in handle.split("-"):
            if len(part) > 3 and part in file_lower:
                matched_instructions.append(file)
                break
                
    prod_info = {
        "title": title,
        "handle": handle,
        "sku": sku,
        "instructions": list(set(matched_instructions))
    }
    
    categorized_products[category].append(prod_info)

# Output results
for cat, prods in categorized_products.items():
    print(f"\n================ {cat} ({len(prods)} products) ================")
    # Print the ones that have instructions first, then some others
    with_inst = [p for p in prods if p["instructions"]]
    without_inst = [p for p in prods if not p["instructions"]]
    
    print(f"Products WITH instructions ({len(with_inst)}):")
    for p in with_inst:
        print(f" - {p['title']} (SKU: {p['sku']}) -> Files: {p['instructions']}")
    
    print(f"Products WITHOUT instructions ({len(without_inst)} - sample of 5):")
    for p in without_inst[:5]:
        print(f" - {p['title']} (SKU: {p['sku']})")
