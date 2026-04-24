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
  // For complex spreads (Celtic Cross, 15-card), use flex-wrap with smaller cards
  const isComplexSpread = positions.length >= 10;

  if (isComplexSpread || layoutType === 'flex') {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex flex-wrap gap-4 justify-center items-start">
          {positions.map((pos) => (
            <div
              key={pos.id}
              className="flex flex-col items-center cursor-pointer w-20 sm:w-24"
              onClick={() => onCardClick(pos.id)}
            >
              <div className="text-xs text-gold-400 font-serif text-center mb-2 h-8 flex items-center justify-center">
                {pos.label}
              </div>
              <div className="w-full aspect-[2/3]">
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
      </div>
    );
  }

  // For simpler spreads (1-3 cards), use grid layout with larger cards
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
        {positions.map((pos) => (
          <div
            key={pos.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onCardClick(pos.id)}
          >
            <div className="text-sm text-gold-400 font-serif text-center mb-3">
              {pos.label}
            </div>
            <div className="w-32 h-52 sm:w-40 sm:h-64">
              {pos.card ? (
                <Card
                  card={pos.card}
                  isFlipped={!pos.isHidden}
                  onClick={() => onCardClick(pos.id)}
                />
              ) : (
                <div className="w-full h-full rounded-xl border border-mystic-700 bg-mystic-900/50 flex items-center justify-center">
                  <span className="text-mystic-600 font-serif text-sm">Prázdné</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
