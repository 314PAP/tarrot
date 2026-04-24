#!/usr/bin/env python3
import os
import re
import json

chunks_dir = "/Users/pipap/projects/antigravity/tarrot/docs/chunks"
files = sorted(os.listdir(chunks_dir))

# All minor arcana card names we want to extract
# All minor arcana card names as they appear in the text
hole_cards = [
    "Eso Holí", "Dvojka Holí", "Trojka Holí", "Čtyřka Holí", "Pětka Holí", "Šestka Holí", "Sedmička Holí",
    "Osmička Holí", "Devítka Holí", "Desítka Holí",
    "Rytíř Holí", "Královna Holí", "Princ Holí", "Princezna Holí"
]
pohary_cards = [
    "Eso Pohárů", "Dvojka Pohárů", "Trojka Pohárů", "Čtyřka Pohárů", "Pětka Pohárů", "Šestka Pohárů", "Sedmička Pohárů",
    "Osmička Pohárů", "Devítka Pohárů", "Desítka Pohárů",
    "Rytíř Pohárů", "Královna Pohárů", "Princ Pohárů", "Princezna Pohárů"
]
mece_cards = [
    "Eso Mečů", "Dvojka Mečů", "Trojka Mečů", "Čtyřka Mečů", "Pětka Mečů", "Šestka Mečů", "Sedmička Mečů",
    "Osmička Mečů", "Devítka Mečů", "Desítka Mečů",
    "Rytíř Mečů", "Královna Mečů", "Princ Mečů", "Princezna Mečů"
]
disky_cards = [
    "Eso Disků", "Dvojka Disků", "Trojka Disků", "Čtyřka Disků", "Pětka Disků", "Šestka Disků", "Sedmička Disků",
    "Osmička Disků", "Devítka Disků", "Desítka Disků",
    "Rytíř Disků", "Královna Disků", "Princ Disků", "Princezna Disků"
]

all_targets = hole_cards + pohary_cards + mece_cards + disky_cards

# Pattern to match card heading at start of line (after stripping)
card_set = set(all_targets)

data = {}

def process_chunks():
    # Read all content, split into paragraphs (separated by blank lines)
    all_paragraphs = []
    for fname in files:
        fpath = os.path.join(chunks_dir, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
            # Split into paragraphs: one or more blank lines separate paragraphs
            paragraphs = re.split(r'\n\s*\n', content)
            all_paragraphs.extend([p.strip() for p in paragraphs if p.strip()])
    
    # For each card, find paragraphs containing it
    for cname in card_set:
        matches = []
        for para in all_paragraphs:
            if cname in para:
                matches.append(para)
        if matches:
            # Take the first matching paragraph (most likely the main description)
            data[cname] = matches[0]
        else:
            data[cname] = None

process_chunks()
print(json.dumps(data, ensure_ascii=False, indent=2))
