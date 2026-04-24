import React from 'react';
import { SpreadPosition } from '../logic/spreads';
import { CardAnimation } from './CardAnimation';

interface SpreadLayoutProps {
  positions: SpreadPosition[];
  onCardClick: (positionId: string) => void;
  layoutType?: 'grid' | 'flex'; // Zda chceme CSS Grid pro 15 karet nebo flex pro OOTK operace
}

export const SpreadLayout: React.FC<SpreadLayoutProps> = ({ 
  positions, 
  onCardClick,
  layoutType = 'grid'
}) => {
  if (layoutType === 'grid') {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 overflow-x-auto">
        <div 
          className="min-w-[600px] grid gap-4 p-4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(5, auto)',
            gridTemplateAreas: `
              ". top-left-1 . top-right-1 ."
              ". top-left-2 . top-right-2 ."
              "center-1 top-left-3 center-2 top-right-3 center-3"
              ". bottom-left-1 . bottom-right-1 ."
              ". bottom-left-2 . bottom-right-2 ."
              ". bottom-left-3 . bottom-right-3 ."
            `
          }}
        >
          {positions.map((pos) => (
            <div 
              key={pos.id} 
              className="flex flex-col items-center justify-center relative cursor-pointer"
              style={{ gridArea: pos.gridArea }}
              onClick={() => onCardClick(pos.id)}
            >
              <div className="text-xs text-stone-400 font-serif text-center mb-1 max-w-[100px] truncate">
                {pos.label}
              </div>
              <div className="w-24 h-40">
                {pos.card ? (
                  <CardAnimation card={pos.card} isHidden={pos.isHidden} />
                ) : (
                  <div className="w-full h-full rounded-xl border border-stone-700 bg-stone-900/50 flex items-center justify-center">
                    <span className="text-stone-600 font-serif text-sm">Prázdné</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback pro OOTK nebo jednoduché lineární výklady
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center w-full max-w-4xl mx-auto p-4">
      {positions.map((pos) => (
        <div 
          key={pos.id} 
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onCardClick(pos.id)}
        >
          <div className="text-sm text-stone-400 font-serif mb-2 text-center">
            {pos.label}
          </div>
          <div className="w-24 h-40">
            {pos.card ? (
              <CardAnimation card={pos.card} isHidden={pos.isHidden} />
            ) : (
              <div className="w-full h-full rounded-xl border border-stone-700 bg-stone-900/50" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
