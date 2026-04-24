import type { Spread } from './types';
import type { TarotCard } from '../../data/thothTarot';

export const singleCardSpread: Spread = {
  id: 'single',
  name: '1 Karta: Odpověď',
  description: 'Rychlá odpověď na konkrétní otázku nebo poselství pro daný okamžik.',
  positions: [],
  deal: (deck: TarotCard[]) => {
    return [
      { id: '1', label: 'Odpověď', card: deck[0], gridArea: 'center-2', isHidden: true }
    ];
  }
};

export const threeCardSpread: Spread = {
  id: 'three-card',
  name: '3 Karty: Vývoj',
  description: 'Tradiční výklad (Minulost, Přítomnost, Budoucnost) pro pochopení kontextu a vývoje situace.',
  positions: [],
  deal: (deck: TarotCard[]) => {
    return [
      { id: '1', label: 'Minulost', card: deck[0], gridArea: 'center-1', isHidden: true },
      { id: '2', label: 'Přítomnost', card: deck[1], gridArea: 'center-2', isHidden: true },
      { id: '3', label: 'Budoucnost', card: deck[2], gridArea: 'center-3', isHidden: true },
    ];
  }
};
