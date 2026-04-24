import React, { useState } from 'react';
import { useDeck } from '../hooks/useDeck';
import { SpreadLayout } from '../components/SpreadLayout';
import { availableSpreads } from '../logic/spreads';
import type { Spread } from '../logic/spreads';
import { Sparkles, Layers, Grid, List } from 'lucide-react';

export const Reading: React.FC = () => {
  const { activeSpread, setActiveSpread, dealSpread } = useDeck();
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
  const [isDealing, setIsDealing] = useState(false);

  const startReading = (spread: Spread) => {
    setSelectedSpread(spread);
    setActiveSpread(null);
  };

  const handleDeal = () => {
    if (!selectedSpread) return;
    setIsDealing(true);
    setTimeout(() => {
      dealSpread(selectedSpread);
      setIsDealing(false);
    }, 600);
  };

  const handleCardClick = (positionId: string) => {
    if (!activeSpread) return;
    setActiveSpread(prev => {
      if (!prev) return prev;
      return prev.map(pos =>
        pos.id === positionId ? { ...pos, isHidden: false } : pos
      );
    });
  };

  const getIconForSpread = (id: string) => {
    switch (id) {
      case 'single': return <Sparkles className="w-10 h-10 text-gold-400 mb-3" />;
      case 'three-card': return <Layers className="w-10 h-10 text-gold-400 mb-3" />;
      case 'celtic-cross': return <List className="w-10 h-10 text-gold-400 mb-3" />;
      case 'fifteen-card': return <Grid className="w-10 h-10 text-gold-400 mb-3" />;
      default: return <List className="w-10 h-10 text-gold-400 mb-3" />;
    }
  };

  if (!selectedSpread) {
    return (
      <div className="flex flex-col items-center min-h-[70vh] py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-gold-500 mb-3">Vyberte si výklad</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Soustřeďte se na svou otázku. Vyberte typ výkladu, který nejlépe odpovídá vaší situaci.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl px-4">
          {availableSpreads.map((spread) => (
            <button
              key={spread.id}
              onClick={() => startReading(spread)}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-mystic-800/60 backdrop-blur-md border border-mystic-700/50 hover:border-gold-500/50 hover:bg-mystic-800/80 transition-all"
            >
              {getIconForSpread(spread.id)}
              <h2 className="text-xl font-serif text-gold-500 mb-2">{spread.name}</h2>
              <p className="text-gray-400 text-sm">{spread.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mb-6 flex items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-serif text-gold-500 mb-1">
            {selectedSpread.name}
          </h1>
          <p className="text-gray-400 text-sm">Soustřeďte se na svou otázku a vyložte karty.</p>
        </div>
        <button
          onClick={() => {
            setSelectedSpread(null);
            setActiveSpread(null);
          }}
          className="px-4 py-2 text-sm text-gray-300 hover:text-gold-500 transition-colors"
        >
          Zpět
        </button>
      </div>

      {!activeSpread ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <button
            onClick={handleDeal}
            disabled={isDealing}
            className="px-8 py-4 bg-gold-600 hover:bg-gold-500 text-mystic-950 font-bold rounded-xl font-serif text-lg shadow-lg shadow-gold-500/20 disabled:opacity-50 transition-all"
          >
            {isDealing ? 'Míchám...' : 'Vyložit karty'}
          </button>
        </div>
      ) : (
        <SpreadLayout
          positions={activeSpread}
          onCardClick={handleCardClick}
          layoutType={selectedSpread.id.startsWith('ootk') ? 'flex' : 'grid'}
        />
      )}
    </div>
  );
};
