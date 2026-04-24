import type { Spread } from './types';
import type { TarotCard } from '../../data/thothTarot';

export const celticCrossSpread: Spread = {
  id: 'celtic-cross',
  name: 'Keltský kříž',
  description: 'Tradiční 10-ti kartový výklad pro hloubkovou analýzu situace. Poskytuje komplexní pohled na všechny aspekty problému.',
  positions: [
    { id: '1', label: 'Tazatel', description: 'Vyjadřuje podstatu tazatele nebo jeho postoj k situaci' },
    { id: '2', label: 'Překážka', description: 'Co brání tazateli v dosažení cíle' },
    { id: '3', label: 'Základ', description: 'Základní příčina nebo kořen situace' },
    { id: '4', label: 'Minulost', description: 'Nedávná minulost ovlivňující současnost' },
    { id: '5', label: 'Cíl', description: 'Kam tazatel směřuje, čeho chce dosáhnout' },
    { id: '6', label: 'Budoucnost', description: 'Co se stane v blízké budoucnosti' },
    { id: '7', label: 'Postoj tazatele', description: 'Jak tazatel vnímá situaci' },
    { id: '8', label: 'Vnější vlivy', description: 'Vlivy okolí nebo jiných lidí' },
    { id: '9', label: 'Naděje a obavy', description: 'Tazatelovy vnitřní pocity' },
    { id: '10', label: 'Výsledek', description: 'Konečný výsledek situace' }
  ],
  deal: (deck: TarotCard[]) => {
    if (deck.length < 10) {
      throw new Error('Not enough cards in deck for Celtic Cross spread.');
    }

    return [
      { id: '1', label: 'Tazatel', card: deck[0], isHidden: true },
      { id: '2', label: 'Překážka', card: deck[1], isHidden: true },
      { id: '3', label: 'Základ', card: deck[2], isHidden: true },
      { id: '4', label: 'Minulost', card: deck[3], isHidden: true },
      { id: '5', label: 'Cíl', card: deck[4], isHidden: true },
      { id: '6', label: 'Budoucnost', card: deck[5], isHidden: true },
      { id: '7', label: 'Postoj tazatele', card: deck[6], isHidden: true },
      { id: '8', label: 'Vnější vlivy', card: deck[7], isHidden: true },
      { id: '9', label: 'Naděje a obavy', card: deck[8], isHidden: true },
      { id: '10', label: 'Výsledek', card: deck[9], isHidden: true }
    ];
  }
};
