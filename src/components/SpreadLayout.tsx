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
  if (!positions || positions.length === 0) {
    return (
      <div className="flex justify-center p-4">
        <p className="text-gray-400">Chyba: Žádné pozice pro výklad.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center p-4">
      {positions.map((pos) => {
        // Zajistíme, aby se karta vždy zobrazila, když existuje
        const cardExists = !!pos.card;
        return (
          <div
            key={pos.id}
            className="flex flex-col items-center gap-2"
          >
            <div className="text-sm text-gold-400 font-serif text-center mb-2">
              {pos.label}
            </div>
            <Card
              card={pos.card}
              isFlipped={cardExists && !pos.isHidden}
              onClick={() => onCardClick(pos.id)}
            />
            {pos.description ? (
              <p className="max-w-40 text-center text-xs text-gray-400">
                {pos.description}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
