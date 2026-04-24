import React, { useState } from 'react';
import type { TarotCard } from '../data/thothTarot';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CardAnimation } from './CardAnimation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  card?: TarotCard;
  isFlipped?: boolean;
  onClick?: () => void;
  className?: string;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ card, isFlipped = false, onClick, className, delay = 0 }) => {
  const [flipped, setFlipped] = useState(isFlipped);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setFlipped(!flipped);
    }
  };

  // Pokud je předán onClick (rodič ovládá stav), použij isFlipped, jinak vnitřní stav flipped
  const currentFlipped = onClick ? isFlipped : flipped;

  const cardBack = (
    <div className="w-full h-full rounded-xl border-2 border-gold-500 shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-mystic-800 overflow-hidden flex items-center justify-center">
      <div className="w-[80%] h-[90%] border border-gold-500/50 flex flex-col items-center justify-center relative">
        <div className="w-16 h-16 sm:w-24 sm:h-24 border-2 border-gold-400 rotate-45 flex items-center justify-center">
          <div className="w-full h-full border-2 border-gold-400 -rotate-45 flex items-center justify-center">
             <span className="text-gold-500 font-serif font-bold opacity-50">THOTH</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mystic-700/20 via-transparent to-transparent"></div>
      </div>
    </div>
  );

  const cardFront = (
    <div className="w-full h-full rounded-xl border-2 border-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.5)] bg-mystic-900 overflow-hidden flex flex-col">
      {card ? (
        <>
          <div className="relative flex-grow">
            <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-mystic-900 via-transparent to-transparent opacity-80"></div>
          </div>
          <div className="absolute bottom-0 w-full p-3 sm:p-4 text-center glass-panel">
            <h3 className="text-sm sm:text-base font-serif text-gold-400 mb-1 leading-tight">{card.name}</h3>
            <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wider">{card.keywords.slice(0, 3).join(' • ')}</p>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-500">Prázdná karta</span>
        </div>
      )}
    </div>
  );

  return (
    <div 
      className={cn("relative mx-auto max-w-[300px] rounded-xl border border-yellow-600/30 w-48 h-72 sm:w-64 sm:h-96 cursor-pointer", className)} 
      onClick={handleClick}
    >
      <CardAnimation 
        isFlipped={currentFlipped} 
        delay={delay}
        back={cardBack}
        front={cardFront}
      />
    </div>
  );
};
