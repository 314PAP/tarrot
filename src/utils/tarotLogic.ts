import type { TarotCard } from '../data/thothTarot';

/**
 * Fisher-Yates shuffle algorithm to randomize the deck
 */
export const shuffleDeck = (deck: TarotCard[]): TarotCard[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

export type SpreadType = 'single' | 'three-card';

export interface SpreadPosition {
  name: string;
  meaning: string;
}

export const spreads: Record<SpreadType, SpreadPosition[]> = {
  'single': [
    { name: 'Karta dne / Odpověď', meaning: 'Hlavní energie, odpověď na vaši otázku.' }
  ],
  'three-card': [
    { name: 'Minulost', meaning: 'Co vás přivedlo do této situace, vlivy z minulosti.' },
    { name: 'Přítomnost', meaning: 'Současný stav, hlavní téma, jaké síly působí teď.' },
    { name: 'Budoucnost', meaning: 'Pravděpodobný vývoj situace, pokud se nic nezmění.' }
  ]
};
