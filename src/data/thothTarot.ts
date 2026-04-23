export type Suit = 'Major Arcana' | 'Wands' | 'Cups' | 'Swords' | 'Disks';
export type CardType = 'Major' | 'Minor' | 'Court';

export interface TarotCard {
  id: string;
  name: string;
  number?: number;
  suit: Suit;
  type: CardType;
  keywords: string[];
  meaning: string;
  image: string;
}

const majorsData = [
  { name: 'The Fool', number: 0, keywords: ['Původní potenciál', 'Inocence', 'Chaos', 'Začátek'] },
  { name: 'The Magus', number: 1, keywords: ['Komunikace', 'Vůle', 'Zručnost', 'Merkur'] },
  { name: 'The Priestess', number: 2, keywords: ['Intuice', 'Skryté vědění', 'Měsíc'] },
  { name: 'The Empress', number: 3, keywords: ['Láska', 'Krása', 'Plodnost', 'Venuše'] },
  { name: 'The Emperor', number: 4, keywords: ['Moc', 'Struktura', 'Autorita', 'Beran'] },
  { name: 'The Hierophant', number: 5, keywords: ['Vnitřní naslouchání', 'Zjevení', 'Býk'] },
  { name: 'The Lovers', number: 6, keywords: ['Rozhodnutí', 'Inspirace', 'Blíženci'] },
  { name: 'The Chariot', number: 7, keywords: ['Triumf', 'Pohyb', 'Rak'] },
  { name: 'Adjustment', number: 8, keywords: ['Rovnováha', 'Spravedlnost', 'Karma', 'Váhy'] },
  { name: 'The Hermit', number: 9, keywords: ['Vnitřní světlo', 'Moudrost', 'Panna'] },
  { name: 'Fortune', number: 10, keywords: ['Změna', 'Osud', 'Karma', 'Jupiter'] },
  { name: 'Lust', number: 11, keywords: ['Vášeň', 'Vitalita', 'Odrazivost', 'Lev'] },
  { name: 'The Hanged Man', number: 12, keywords: ['Odevzdání', 'Oběť', 'Voda'] },
  { name: 'Death', number: 13, keywords: ['Transformace', 'Konec', 'Štír'] },
  { name: 'Art', number: 14, keywords: ['Alchymie', 'Sloučení', 'Střelec'] },
  { name: 'The Devil', number: 15, keywords: ['Materialismus', 'Pokušení', 'Kozoroh'] },
  { name: 'The Tower', number: 16, keywords: ['Zničení iluzí', 'Náhlá změna', 'Mars'] },
  { name: 'The Star', number: 17, keywords: ['Naděje', 'Inspirace', 'Vodnář'] },
  { name: 'The Moon', number: 18, keywords: ['Iluze', 'Podvědomí', 'Ryby'] },
  { name: 'The Sun', number: 19, keywords: ['Znovuzrození', 'Slunce', 'Osvícení'] },
  { name: 'The Aeon', number: 20, keywords: ['Nový věk', 'Rozhodnutí', 'Oheň'] },
  { name: 'The Universe', number: 21, keywords: ['Dokončení', 'Celistvost', 'Saturn'] }
];

const suits: Suit[] = ['Wands', 'Cups', 'Swords', 'Disks'];
const courtRanks = ['Princess', 'Prince', 'Queen', 'Knight'];
const minorNumbers = [
  { num: 2, names: ['Dominion', 'Love', 'Peace', 'Change'] },
  { num: 3, names: ['Virtue', 'Abundance', 'Sorrow', 'Works'] },
  { num: 4, names: ['Completion', 'Luxury', 'Truce', 'Power'] },
  { num: 5, names: ['Strife', 'Disappointment', 'Defeat', 'Worry'] },
  { num: 6, names: ['Victory', 'Pleasure', 'Science', 'Success'] },
  { num: 7, names: ['Valour', 'Debauch', 'Futility', 'Failure'] },
  { num: 8, names: ['Swiftness', 'Indolence', 'Interference', 'Prudence'] },
  { num: 9, names: ['Strength', 'Happiness', 'Cruelty', 'Gain'] },
  { num: 10, names: ['Oppression', 'Satiety', 'Ruin', 'Wealth'] }
];

const generateDeck = (): TarotCard[] => {
  const deck: TarotCard[] = [];

  // Major Arcana
  majorsData.forEach((card) => {
    deck.push({
      id: `major-${card.number}`,
      name: card.name,
      number: card.number,
      suit: 'Major Arcana',
      type: 'Major',
      keywords: card.keywords,
      meaning: `Karta ${card.name} symbolizuje archetypální energii Thoth tarotu. Je spojena s následujícími koncepty: ${card.keywords.join(', ')}.`,
      image: `https://placehold.co/400x600/1a0b2e/d4af37?text=${card.name.replace(' ', '+')}`
    });
  });

  // Minor Arcana (Aces to 10s & Courts)
  suits.forEach((suit, suitIndex) => {
    // Ace
    deck.push({
      id: `minor-${suit}-1`,
      name: `Ace of ${suit}`,
      number: 1,
      suit: suit,
      type: 'Minor',
      keywords: ['Esence', 'Zárodek', suit === 'Wands' ? 'Oheň' : suit === 'Cups' ? 'Voda' : suit === 'Swords' ? 'Vzduch' : 'Země'],
      meaning: `Eso ${suit} reprezentuje čistý elementární potenciál této barvy.`,
      image: `https://placehold.co/400x600/1a0b2e/e6c253?text=Ace+of+${suit}`
    });

    // 2-10
    minorNumbers.forEach(item => {
      const cardName = `${item.names[suitIndex]} (${item.num} of ${suit})`;
      deck.push({
        id: `minor-${suit}-${item.num}`,
        name: cardName,
        number: item.num,
        suit: suit,
        type: 'Minor',
        keywords: [item.names[suitIndex], 'Vývoj', 'Dynamika'],
        meaning: `Karta ${item.names[suitIndex]} (${item.num} ${suit}) zkoumá specifický aspekt elementu.`,
        image: `https://placehold.co/400x600/1a0b2e/e6c253?text=${item.names[suitIndex]}`
      });
    });

    // Courts
    courtRanks.forEach(rank => {
      deck.push({
        id: `court-${suit}-${rank}`,
        name: `${rank} of ${suit}`,
        suit: suit,
        type: 'Court',
        keywords: [rank, 'Osobnost', 'Aspekt elementu'],
        meaning: `Dvorní karta ${rank} ${suit} ztělesňuje konkrétní charakter a způsob exprese daného elementu.`,
        image: `https://placehold.co/400x600/1a0b2e/e6c253?text=${rank}+of+${suit}`
      });
    });
  });

  return deck;
};

export const thothTarotDeck = generateDeck();
