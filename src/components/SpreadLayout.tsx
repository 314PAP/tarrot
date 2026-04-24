import React from 'react';
import type { SpreadPosition } from '../logic/spreads';
import { Card } from './Card';

interface SpreadLayoutProps {
  positions: SpreadPosition[];
  onCardClick: (positionId: string) => void;
}

export const SpreadLayout: React.FC<SpreadLayoutProps> = ({
  positions,
  onCardClick
}) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center p-4">
      {positions.map((pos) => (
        <div
          key={pos.id}
          className="flex flex-col items-center gap-2"
        >
          <div className="text-sm text-gold-400 font-serif text-center mb-2">
            {pos.label}
          </div>
          <Card
            card={pos.card}
            isFlipped={!pos.isHidden}
            onClick={() => onCardClick(pos.id)}
          />
          {pos.description ? (
            <p className="max-w-40 text-center text-xs text-gray-400">
              {pos.description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
};
