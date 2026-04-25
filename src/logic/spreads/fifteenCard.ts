import type { Spread } from './types';
import type { TarotCard } from '../../data/thothTarot';

export const fifteenCardSpread: Spread = {
  id: 'fifteen-card',
  name: '15-ti kartový výklad',
  description: 'Komplexní tradiční výklad (Golden Dawn / Crowley), který analyzuje situaci z více úhlů pohledu (Současnost, Osud, Alternativy, Výsledek).',
  positions: [
    { id: '1', label: 'Tazatel 1', description: 'Současná situace - aspekt 1' },
    { id: '2', label: 'Tazatel 2', description: 'Současná situace - aspekt 2' },
    { id: '3', label: 'Tazatel 3', description: 'Současná situace - aspekt 3' },
    { id: '4', label: 'Osud 1', description: 'Směřování - aspekt 1' },
    { id: '5', label: 'Osud 2', description: 'Směřování - aspekt 2' },
    { id: '6', label: 'Osud 3', description: 'Směřování - aspekt 3' },
    { id: '7', label: 'Minulost 1', description: 'Alternativa/Minulost - aspekt 1' },
    { id: '8', label: 'Minulost 2', description: 'Alternativa/Minulost - aspekt 2' },
    { id: '9', label: 'Minulost 3', description: 'Alternativa/Minulost - aspekt 3' },
    { id: '10', label: 'Odchází 1', description: 'Podvědomí/Co odchází - aspekt 1' },
    { id: '11', label: 'Odchází 2', description: 'Podvědomí/Co odchází - aspekt 2' },
    { id: '12', label: 'Odchází 3', description: 'Podvědomí/Co odchází - aspekt 3' },
    { id: '13', label: 'Budoucnost 1', description: 'Výsledek/Budoucnost - aspekt 1' },
    { id: '14', label: 'Budoucnost 2', description: 'Výsledek/Budoucnost - aspekt 2' },
    { id: '15', label: 'Budoucnost 3', description: 'Výsledek/Budoucnost - aspekt 3' }
  ],
  deal: (deck: TarotCard[]) => {
    if (deck.length < 15) {
      throw new Error('Not enough cards in deck for 15-card spread.');
    }

    const positionLabels = [
      'Tazatel 1', 'Tazatel 2', 'Tazatel 3',
      'Osud 1', 'Osud 2', 'Osud 3',
      'Minulost 1', 'Minulost 2', 'Minulost 3',
      'Odchází 1', 'Odchází 2', 'Odchází 3',
      'Budoucnost 1', 'Budoucnost 2', 'Budoucnost 3'
    ];

    return positionLabels.map((label, index) => ({
      id: `${index + 1}`,
      label,
      card: deck[index],
      isHidden: false
    }));
  }
};
