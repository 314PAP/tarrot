import type { Spread } from './types';
import type { TarotCard } from '../../data/thothTarot';

export const singleCardSpread: Spread = {
  id: 'single',
  name: 'Karta dne',
  description: 'Jednoduchý výklad pro denní inspiraci a vhled do aktuální situace.',
  positions: [
    { id: '1', label: 'Karta dne', description: 'Poselství pro dnešní den' }
  ],
  deal: (deck: TarotCard[]) => {
    return [
      { id: '1', label: 'Karta dne', card: deck[0], isHidden: false }
    ];
  }
};

export const threeCardSpread: Spread = {
  id: 'three-card',
  name: '3 Karty: Vývoj',
  description: 'Tradiční výklad (Minulost, Přítomnost, Budoucnost) pro pochopení kontextu a vývoje situace.',
  positions: [
    { id: '1', label: 'Minulost', description: 'Co ovlivnilo současnou situaci' },
    { id: '2', label: 'Přítomnost', description: 'Aktuální stav věcí' },
    { id: '3', label: 'Budoucnost', description: 'Kam se situace vyvíjí' }
  ],
  deal: (deck: TarotCard[]) => {
    return [
      { id: '1', label: 'Minulost', card: deck[0], isHidden: false },
      { id: '2', label: 'Přítomnost', card: deck[1], isHidden: false },
      { id: '3', label: 'Budoucnost', card: deck[2], isHidden: false },
    ];
  }
};
