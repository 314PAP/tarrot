import React from 'react';
import type { SpreadPosition } from '../logic/spreads';
import { Card } from './Card';

interface SpreadLayoutProps {
  positions: SpreadPosition[];
  onCardClick: (positionId: string) => void;
  layoutType?: 'grid' | 'flex';
}

 export const SpreadLayout: React.FC<SpreadLayoutProps> = ({
   positions,
   onCardClick
 }) => {
   return (
     <div className="flex flex-wrap gap-6 justify-center p-4 md:p-6 w-auto">
       {positions.map((pos) => (
         <div
           key={pos.id}
           className="flex flex-col items-center cursor-pointer flex-shrink-0"
           onClick={() => onCardClick(pos.id)}
         >
           <div className="text-sm text-gold-400 font-serif text-center mb-2 px-2">
             {pos.label}
           </div>
            <div className="w-[40%] sm:w-32 md:w-48">
              {pos.card ? (
                <Card
                  card={pos.card}
                  isFlipped={!pos.isHidden}
                  onClick={() => onCardClick(pos.id)}
                  className="w-full aspect-[2/3]"
                />
              ) : (
                <div className="w-full aspect-[2/3] rounded-xl border border-gold-500/30 bg-mystic-900/50 flex items-center justify-center">
                  <span className="text-mystic-600 font-serif text-xs">Prázdné</span>
                </div>
              )}
            </div>
         </div>
       ))}
     </div>
   );
 };
