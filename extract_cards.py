import json
import re

# Load the existing thothTarot.ts to get the card list
# We'll parse the TypeScript file to extract the card data.
# Since it's a simple export, we can try to evaluate it as JSON? Not exactly.
# Instead, we'll read the file and extract the array.

def parse_thoth_ts(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We know the structure: there's a `majorsData` array and then the minor arcana generation.
    # We'll extract the majorsData array and then generate the minors and courts similarly.
    # But for simplicity, we can just use the existing `thothTarotDeck` by simulating the generation?
    # Alternatively, we can copy the generation logic here.
    
    # Let's just extract the majorsData array by finding the array definition.
    # We'll use a simple regex to find the array for majorsData.
    # This is not robust but works for this specific file.
    
    # Find the line with "const majorsData = ["
    majors_start = content.find('const majorsData = [')
    if majors_start == -1:
        raise ValueError("Could not find majorsData")
    
    # Find the end of the array (the closing bracket and semicolon)
    # We'll look for the next '];' after the start.
    end_search = content.find('];', majors_start)
    if end_search == -1:
        raise ValueError("Could not find end of majorsData")
    
    majors_array_str = content[majors_start:end_search+1]  # includes the '];'
    # Now we need to extract the array content without the variable declaration.
    # We know the array starts after '= [' and ends before '];'
    array_content = content[majors_start+len('const majorsData = ['):end_search]
    
    # Now we can try to parse this as JSON? It's almost JSON but with trailing commas and without quotes on keys.
    # We'll use a more flexible parser: we can use `ast.literal_eval` after converting to Python list representation?
    # Instead, we'll use a simple approach: split by '},' and then parse each object.
    
    # But note: the array might have nested objects and the last element doesn't have a comma.
    # We'll add a closing bracket and try to use `json5` or `demjson`? Not installed.
    
    # Since we are in a controlled environment, we can use `ast.literal_eval` if we convert the keys to strings.
    # Let's try to wrap the array content in brackets and then use `ast.literal_eval` after fixing the keys.
    
    # Alternatively, we can use the existing generation logic to generate the deck and then extract the majors.
    # We'll do that: we'll copy the relevant parts of the generateDeck function.
    
    # Given the complexity, let's change strategy: we'll generate the deck using the same logic as in thothTarot.ts
    # by copying the data definitions.
    
    # We'll define the same data structures as in the file.
    
    # We'll read the file and execute it in a restricted environment? Not safe.
    # Instead, we'll copy the constants and the generateDeck function and run it.
    
    # We'll do:
    #   exec the content in a new dictionary, but we have to be careful.
    
    # Let's try to extract the necessary parts and then run them.
    
    # We'll create a dictionary to hold the definitions.
    local_vars = {}
    try:
        exec(content, {}, local_vars)
    except Exception as e:
        print(f"Error executing the TypeScript file: {e}")
        # Fallback: we'll try to extract the data by parsing the file as text.
        return None
    
    # Now we should have the `thothTarotDeck` in local_vars.
    if 'thothTarotDeck' in local_vars:
        return local_vars['thothTarotDeck']
    else:
        # Try to find the generateDeck function and run it.
        if 'generateDeck' in local_vars:
            deck = local_vars['generateDeck']()
            return deck
        else:
            raise ValueError("Could not find thothTarotDeck or generateDeck")
    

def main():
    # Parse the existing deck
    try:
        deck = parse_thoth_ts('/Users/pipap/projects/antigravity/tarrot/src/data/thothTarot.ts')
    except Exception as e:
        print(f"Failed to parse thothTarot.ts: {e}")
        # We'll try to load the deck by reading the file as text and extracting the array with a more manual method.
        # For now, let's exit.
        return
    
    print(f"Loaded {len(deck)} cards from thothTarot.ts")
    
    # Load the Czech text file
    with open('/Users/pipap/projects/antigravity/tarrot/docs/Kniha_Thothova.txt', 'r', encoding='utf-8') as f:
        czech_text = f.read()
    
    # We'll create a list to hold our extracted data
    extracted_data = []
    
    # For each card in the deck, we'll try to find its description in the Czech text.
    for card in deck:
        # We'll try to search for the card's name in the Czech text.
        # The card has an English name. We'll also try to find a Czech name if we know it.
        # We don't have a mapping, so we'll use the English name and hope it appears.
        # We'll also try the lowercase version.
        name_variants = [
            card['name'],
            card['name'].lower(),
        ]
        # Also, we can try to split the name and take the first word? Not reliable.
        
        found = False
        for variant in name_variants:
            # We'll look for the variant in the text.
            idx = czech_text.find(variant)
            if idx != -1:
                # We found a match. Extract a window of text around it.
                # We'll extract 1000 characters after the match.
                start = max(0, idx - 100)  # include some context before
                end = min(len(czech_text), idx + 1000)
                extracted = czech_text[start:end]
                # Clean up the extracted text: remove extra whitespace, newlines, etc.
                extracted = re.sub(r'\s+', ' ', extracted).strip()
                # We'll store this as the Czech meaning.
                meaning_cz = extracted
                found = True
                break
        
        if not found:
            # If not found, we'll use a placeholder.
            meaning_cz = "Nebylo možné automaticky extrahovat popis. Prosím, doplňte ručně."
            print(f"Warning: Could not find description for card: {card['name']}")
        
        # For now, we'll leave astrology and hebrew as empty strings.
        # We could try to extract them from the extracted text, but we'll skip for simplicity.
        extracted_data.append({
            'id': card['id'],
            'name': card['name'],
            'meaning_cz': meaning_cz,
            'astrology': '',  # TODO: extract from text if possible
            'hebrew': ''      # TODO: extract from text if possible
        })
    
    # Write the extracted data to a JSON file
    output_path = '/Users/pipap/projects/antigravity/tarrot/src/data/cards.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(extracted_data, f, ensure_ascii=False, indent=2)
    
    print(f"Extracted data written to {output_path}")

if __name__ == '__main__':
    main()