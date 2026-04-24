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
  onCardClick,
  layoutType = 'grid'
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onCardClick(pos.id)}
        >
          <div className="text-sm text-gold-400 font-serif text-center mb-2">
            {pos.label}
          </div>
          <div className="w-[45%] sm:w-32 aspect-[2/3]">
            {pos.card ? (
              <Card
                card={pos.card}
                isFlipped={!pos.isHidden}
                onClick={() => onCardClick(pos.id)}
              />
            ) : (
              <div className="w-full h-full rounded-lg border border-mystic-700 bg-mystic-900/50 flex items-center justify-center">
                <span className="text-mystic-600 font-serif text-xs">Prázdné</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
