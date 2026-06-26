import pypdf

pdf_path = "/Users/nicholaselia/Desktop/Clients/GTI_2026/Instructions/SureCage_Instructions.pdf"

try:
    reader = pypdf.PdfReader(pdf_path)
    print(f"Total pages: {len(reader.pages)}")
    print("\n--- PAGE 1 TEXT ---")
    print(reader.pages[0].extract_text()[:1000])
except Exception as e:
    print(f"Error reading PDF: {e}")
