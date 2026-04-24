import type { Spread } from './types';
import type { TarotCard } from '../../data/thothTarot';

// Toto je pouze strukturální příprava pro velké OOTK (Opening of the Key) operace.
// Plná implementace vyžaduje komplexní interakci pro výběr signifikátoru, přesouvání a počítání karet.
// Zde je definujeme jen jako prázdné nebo základní spread modely.

export const firstOperationSpread: Spread = {
  id: 'ootk-op1',
  name: 'OOTK: První operace (Rozpoložení)',
  description: 'Tazatel a zaměření otázky (rozdělení do 4 hromádek IHVH).',
  positions: [],
  deal: (deck: TarotCard[]) => {
    // V první operaci by se mělo rozdělit 78 karet do 4 hromádek
    // Pro jednoduché UI zobrazení bychom vytvořili 4 "pozice" představující hromádky
    return [
      { id: '1', label: 'Yod (Práce/Oheň)', card: deck[0], gridArea: 'pile-1', isHidden: true },
      { id: '2', label: 'He (Láska/Voda)', card: deck[1], gridArea: 'pile-2', isHidden: true },
      { id: '3', label: 'Vau (Ztráty/Vzduch)', card: deck[2], gridArea: 'pile-3', isHidden: true },
      { id: '4', label: 'He final (Peníze/Země)', card: deck[3], gridArea: 'pile-4', isHidden: true },
    ];
  }
};
