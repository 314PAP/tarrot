import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDeck } from '../hooks/useDeck';
import { SpreadLayout } from '../components/SpreadLayout';
import { type SpreadType } from '../utils/tarotLogic';
import type { TarotCard } from '../data/thothTarot';
import { Sparkles, Layers } from 'lucide-react';

export const Reading: React.FC = () => {
  const { drawCard, shuffle } = useDeck();
  const [spreadType, setSpreadType] = useState<SpreadType | null>(null);
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const startReading = (type: SpreadType) => {
    shuffle(); // Reset and shuffle deck
    setSpreadType(type);
    setDrawnCards([]);
  };

  const handleDraw = () => {
    setIsDrawing(true);
    setTimeout(() => {
      const card = drawCard();
      if (card) {
        setDrawnCards(prev => [...prev, card]);
      }
      setIsDrawing(false);
    }, 600);
  };

  if (!spreadType) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => startReading('single')}
            className="flex flex-col items-center text-center p-8 rounded-2xl glass-panel hover:bg-mystic-800/80 hover:border-gold-500/50 transition-all cursor-pointer text-left"
          >
            <Sparkles className="w-12 h-12 text-gold-400 mb-4" />
            <h2 className="text-2xl font-serif text-gold-500 mb-2">1 Karta: Odpověď</h2>
            <p className="text-gray-400">Rychlá odpověď na konkrétní otázku nebo poselství pro daný okamžik.</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => startReading('three-card')}
            className="flex flex-col items-center text-center p-8 rounded-2xl glass-panel hover:bg-mystic-800/80 hover:border-gold-500/50 transition-all cursor-pointer text-left"
          >
            <Layers className="w-12 h-12 text-gold-400 mb-4" />
            <h2 className="text-2xl font-serif text-gold-500 mb-2">3 Karty: Vývoj</h2>
            <p className="text-gray-400">Tradiční výklad (Minulost, Přítomnost, Budoucnost) pro pochopení kontextu a vývoje situace.</p>
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-gold-500 mb-2">
            {spreadType === 'single' ? 'Výklad na 1 Kartu' : 'Výklad na 3 Karty'}
          </h1>
          <p className="text-gray-400 text-sm">Soustřeďte se na svou otázku před každým tahem.</p>
        </div>
        <button 
          onClick={() => setSpreadType(null)}
          className="px-4 py-2 text-sm text-gray-300 hover:text-gold-500 transition-colors"
        >
          Zpět na výběr
        </button>
      </div>

      <SpreadLayout 
        type={spreadType} 
        cards={drawnCards} 
        onDraw={handleDraw} 
        isDrawing={isDrawing} 
      />
    </div>
  );
};
