#!/usr/bin/env python3
import os
from pypdf import PdfReader

pdf_path = "/Users/pipap/projects/antigravity/tarrot/docs/Kniha_Thothova.pdf"
output_dir = "/Users/pipap/projects/antigravity/tarrot/docs/chunks"

os.makedirs(output_dir, exist_ok=True)

reader = PdfReader(pdf_path)
num_pages = len(reader.pages)

pages_per_chunk = 10

for i in range(0, num_pages, pages_per_chunk):
    chunk_text = ""
    end = min(i + pages_per_chunk, num_pages)
    for j in range(i, end):
        page = reader.pages[j]
        text = page.extract_text()
        chunk_text += f"--- Page {j+1} ---\n{text}\n\n"

    chunk_file = os.path.join(output_dir, f"chunk_{i//pages_per_chunk + 1:03d}.txt")
    with open(chunk_file, "w", encoding="utf-8") as f:
        f.write(chunk_text)

print(f"Created {len(range(0, num_pages, pages_per_chunk))} chunks from {num_pages} pages.")
