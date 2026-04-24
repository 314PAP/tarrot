import React, { useState, useEffect } from 'react';
import type { TarotCard } from '../data/thothTarot';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


const majorCzechNames: Record<string, string> = {
  'The Fool': 'Blázen',
  'The Magus': 'Kejklíř',
  'The Priestess': 'Velekněžka',
  'The Empress': 'Císařovna',
  'The Emperor': 'Císař',
  'The Hierophant': 'Velekněz',
  'The Lovers': 'Milenci',
  'The Chariot': 'Vůz',
  'Adjustment': 'Vyrovnání',
  'The Hermit': 'Poustevník',
  'Fortune': 'Kolo štěstí',
  'Lust': 'Chtíč',
  'The Hanged Man': 'Viselec',
  'Death': 'Smrt',
  'Art': 'Umění',
  'The Devil': 'Ďábel',
  'The Tower': 'Věž',
  'The Star': 'Hvězda',
  'The Moon': 'Měsíc',
  'The Sun': 'Slunce',
  'The Aeon': 'Aeon',
  'The Universe': 'Vesmír'
};

const suitCzech: Record<string, string> = {
  'Wands': 'Holí',
  'Cups': 'Pohárů',
  'Swords': 'Mečů',
  'Disks': 'Disku'
};

const courtCzech: Record<string, string> = {
  'Princess': 'Princezna',
  'Prince': 'Princ',
  'Queen': 'Královna',
  'Knight': 'Rytíř'
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  card?: TarotCard;
  isFlipped?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ card, isFlipped = false, onClick, className }) => {
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

    const getCardTitle = () => {
    if (!card) return { czName: '', meaning: '' };
    const title = card.name.replace(/^Eso /, '').replace(/\d+ /, '').trim();
    const czName = majorCzechNames[title] || suitCzech[title] || courtCzech[title] || title;
    const fullCzName = card.name.startsWith('Eso') ? `Eso ${czName}` : 
                       /^\d+/.test(card.name) ? `${card.name.match(/\d+/)?.[0]} ${czName}` : 
                       czName;
    return { czName: fullCzName, meaning: card.meaning };
  };

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const titleInfo = getCardTitle();

  const cardFront = (
    <div className="w-full h-full rounded-xl border-2 border-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.5)] bg-mystic-900 overflow-hidden flex flex-col relative group" onMouseEnter={() => !isMobile && setTooltipVisible(true)} onMouseLeave={() => !isMobile && setTooltipVisible(false)} onClick={() => isMobile && setTooltipVisible(!tooltipVisible)}>
      {card ? (
        <>
          <div className="relative flex-grow">
            <img src={card.image} alt={card.name} className="w-full max-h-[45vh] object-contain" />
            <div className="absolute inset-0 bg-gradient-to-t from-mystic-900 via-transparent to-transparent opacity-80"></div>
          </div>
          <div className="absolute bottom-0 w-full p-3 sm:p-4 text-center glass-panel">
            <h3 className="text-sm sm:text-base font-serif text-gold-400 mb-1 leading-tight">{card.name}</h3>
            <p className="text-[10px] sm:text-xs text-gray-300 uppercase tracking-wider">{card.keywords.slice(0, 3).join(' • ')}</p>
          </div>
          {tooltipVisible && titleInfo.czName && (
            <div className="absolute top-2 left-2 bg-mystic-900/95 border border-gold-500/50 rounded-lg p-3 z-10 max-w-xs shadow-lg">
              <div className="text-xs text-gold-400/70 mb-1">Český název</div>
              <div className="text-sm font-serif text-gold-300 mb-2">{titleInfo.czName}</div>
              <div className="text-xs text-gold-400/70 mb-1">Význam</div>
              <div className="text-xs text-gray-300 leading-relaxed">{titleInfo.meaning}</div>
            </div>
          )}
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
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-300"
          style={{
            backfaceVisibility: 'hidden',
            transform: currentFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            opacity: currentFlipped ? 0 : 1,
          }}
        >
          {cardBack}
        </div>
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-300"
          style={{
            backfaceVisibility: 'hidden',
            transform: currentFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
            opacity: currentFlipped ? 1 : 0,
          }}
        >
          {cardFront}
        </div>
      </div>
    </div>
  );
};
