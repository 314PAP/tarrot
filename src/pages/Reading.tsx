import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDeck } from '../hooks/useDeck';
import { SpreadLayout } from '../components/SpreadLayout';
import { availableSpreads, Spread } from '../logic/spreads';
import { Sparkles, Layers, Grid, List } from 'lucide-react';

export const Reading: React.FC = () => {
  const { activeSpread, setActiveSpread, dealSpread } = useDeck();
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
  const [isDealing, setIsDealing] = useState(false);

  const startReading = (spread: Spread) => {
    setSelectedSpread(spread);
    setActiveSpread(null); // Reset active spread
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
      case 'single': return <Sparkles className="w-12 h-12 text-gold-400 mb-4" />;
      case 'three-card': return <Layers className="w-12 h-12 text-gold-400 mb-4" />;
      case 'fifteen-card': return <Grid className="w-12 h-12 text-gold-400 mb-4" />;
      default: return <List className="w-12 h-12 text-gold-400 mb-4" />;
    }
  };

  if (!selectedSpread) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-4xl mx-auto py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif text-gold-500 mb-4">Vyberte si výklad</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Soustřeďte se na svou otázku. Vyberte si typ výkladu, který nejlépe odpovídá vaší situaci, a nechte karty promluvit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4">
          {availableSpreads.map((spread, i) => (
            <motion.button
              key={spread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startReading(spread)}
              className="flex flex-col items-center text-center p-8 rounded-2xl glass-panel hover:bg-mystic-800/80 hover:border-gold-500/50 transition-all cursor-pointer text-left"
            >
              {getIconForSpread(spread.id)}
              <h2 className="text-2xl font-serif text-gold-500 mb-2">{spread.name}</h2>
              <p className="text-gray-400 text-sm">{spread.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="mb-8 flex items-center justify-between px-4">
        <div>
          <h1 className="text-3xl font-serif text-gold-500 mb-2">
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
          Zpět na výběr
        </button>
      </div>

      {!activeSpread ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
           <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDeal}
            disabled={isDealing}
            className="px-8 py-4 bg-gold-600 hover:bg-gold-500 text-mystic-950 font-bold rounded-xl font-serif text-xl shadow-lg shadow-gold-500/20 disabled:opacity-50 transition-all"
          >
            {isDealing ? 'Míchám...' : 'Vyložit karty'}
          </motion.button>
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
