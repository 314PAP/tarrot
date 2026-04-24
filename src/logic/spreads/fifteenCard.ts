import type { Spread } from './types';
import type { TarotCard } from '../../data/thothTarot';

export const fifteenCardSpread: Spread = {
  id: 'fifteen-card',
  name: '15-ti kartový výklad',
  description: 'Komplexní tradiční výklad (Golden Dawn / Crowley), který analyzuje situaci z více úhlů pohledu (Současnost, Osud, Alternativy, Výsledek).',
  positions: [], // Bude naplněno dynamicky nebo definováno v deal()
  deal: (deck: TarotCard[]) => {
    if (deck.length < 15) {
      throw new Error('Not enough cards in deck for 15-card spread.');
    }

    const positionsDef = [
      { id: '1', label: 'Tazatel / Situace 1', gridArea: 'center-1' },
      { id: '2', label: 'Tazatel / Situace 2', gridArea: 'center-2' },
      { id: '3', label: 'Tazatel / Situace 3', gridArea: 'center-3' },
      
      { id: '4', label: 'Osud / Směřování 1', gridArea: 'top-right-1' },
      { id: '8', label: 'Osud / Směřování 2', gridArea: 'top-right-2' },
      { id: '12', label: 'Osud / Směřování 3', gridArea: 'top-right-3' },
      
      { id: '5', label: 'Alternativa / Minulost 1', gridArea: 'top-left-1' },
      { id: '9', label: 'Alternativa / Minulost 2', gridArea: 'top-left-2' },
      { id: '13', label: 'Alternativa / Minulost 3', gridArea: 'top-left-3' },
      
      { id: '6', label: 'Podvědomí / Co odchází 1', gridArea: 'bottom-left-1' },
      { id: '10', label: 'Podvědomí / Co odchází 2', gridArea: 'bottom-left-2' },
      { id: '14', label: 'Podvědomí / Co odchází 3', gridArea: 'bottom-left-3' },
      
      { id: '7', label: 'Výsledek / Budoucnost 1', gridArea: 'bottom-right-1' },
      { id: '11', label: 'Výsledek / Budoucnost 2', gridArea: 'bottom-right-2' },
      { id: '15', label: 'Výsledek / Budoucnost 3', gridArea: 'bottom-right-3' },
    ];

    return positionsDef.map((pos, index) => ({
      ...pos,
      card: deck[index], // Přiřadíme první 15 karet ze zamíchaného balíčku
      isHidden: true, // Karty jsou zpočátku zakryté
    }));
  }
};
