import React, { useEffect, useState } from 'react';
import type { TarotCard } from '../data/thothTarot';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  card?: TarotCard;
  isFlipped?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ card, isFlipped = false, onClick, className, style }) => {
  const [internalFlipped, setInternalFlipped] = useState(isFlipped);

  useEffect(() => {
    if (!onClick) {
      setInternalFlipped(isFlipped);
    }
  }, [isFlipped, onClick]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!card) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onClick) {
        onClick();
      } else {
        setInternalFlipped((value) => !value);
      }
    }
  };

  const currentFlipped = onClick ? isFlipped : internalFlipped;

  const handleActivate = () => {
    if (!card) return;
    if (onClick) {
      onClick();
    } else {
      setInternalFlipped((value) => !value);
    }
  };

  const subtitle = card
    ? card.type === 'Major'
      ? 'Velká arkána'
      : card.type === 'Court'
        ? `Dvorní karta • ${card.suit}`
        : `${card.suit} • ${card.number ?? ''}`.trim()
    : 'Prázdná pozice';

  return (
    <div
      className={cn(
        'w-32 h-48 sm:w-40 sm:h-60 mx-auto select-none',
        card && 'cursor-pointer',
        !card && 'opacity-70',
        className,
      )}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      role={card ? 'button' : undefined}
      tabIndex={card ? 0 : undefined}
      style={style}
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border-2 border-gold-500 bg-[linear-gradient(180deg,#0f172a_0%,#111827_52%,#1e293b_100%)] p-3 shadow-[0_18px_35px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute inset-[6px] rounded-lg border border-gold-400/30" />
        {card ? (
          currentFlipped ? (
            <>
              <div className="relative z-10 text-center">
                <div className="text-[10px] uppercase tracking-[0.24em] text-gold-300/70">
                  {subtitle}
                </div>
                <h3 className="mt-2 font-serif text-sm leading-tight text-gold-100 sm:text-base">
                  {card.name}
                </h3>
              </div>
              <div className="relative z-10 mt-3 flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-gold-500/20 bg-[radial-gradient(circle_at_center,#3f2d03_0%,#1a2332_38%,#0f172a_100%)] px-3">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.name}
                    className="h-full w-full object-cover opacity-90"
                  />
                ) : (
                  <div className="text-5xl text-gold-400/80 sm:text-6xl">✡</div>
                )}
              </div>
              <div className="relative z-10 mt-3 text-center">
                <p className="text-[10px] leading-snug text-gray-300 sm:text-xs">
                  {card.keywords.slice(0, 3).join(' • ')}
                </p>
              </div>
            </>
          ) : (
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
              <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold-300/60">
                Thoth Tarot
              </div>
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/5 sm:h-28 sm:w-28">
                <div className="text-5xl leading-none text-gold-400 sm:text-6xl">✡</div>
              </div>
              <div className="mt-4 font-serif text-sm text-gold-100">
                Zakrytá karta
              </div>
              <div className="mt-2 text-xs text-gold-200/70">
                Klikněte pro odhalení
              </div>
            </div>
          )
        ) : (
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <div className="text-4xl text-gold-500/60">✡</div>
            <div className="mt-3 font-serif text-sm text-gray-300">Prázdná karta</div>
          </div>
        )}
      </div>
    </div>
  );
};
