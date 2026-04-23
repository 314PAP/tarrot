import React from 'react';
import { motion } from 'framer-motion';
import type { TarotCard } from '../data/thothTarot';
import { Card } from './Card';
import { spreads, type SpreadType } from '../utils/tarotLogic';

interface SpreadLayoutProps {
  type: SpreadType;
  cards: TarotCard[];
  onDraw: () => void;
  isDrawing: boolean;
}

export const SpreadLayout: React.FC<SpreadLayoutProps> = ({ type, cards, onDraw, isDrawing }) => {
  const spreadPositions = spreads[type];
  const isComplete = cards.length === spreadPositions.length;

  return (
    <div className="flex flex-col items-center w-full min-h-[60vh] py-8">
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-5xl">
        {spreadPositions.map((position, index) => {
          const card = cards[index];
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <h4 className="text-gold-500 font-serif mb-4 text-center h-12 flex flex-col justify-end">
                <span className="block text-lg">{position.name}</span>
              </h4>
              
              <div className="relative">
                {card ? (
                  <Card card={card} isFlipped={true} />
                ) : (
                  <div className="w-48 h-72 sm:w-64 sm:h-96 rounded-xl border-2 border-dashed border-mystic-700 bg-mystic-900/50 flex items-center justify-center">
                    <span className="text-mystic-700 font-serif">Karta {index + 1}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 max-w-[200px] sm:max-w-[250px] text-center">
                <p className="text-xs text-gray-400 italic mb-2">{position.meaning}</p>
                {card && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <p className="text-sm text-gray-200">{card.meaning}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {!isComplete && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDraw}
          disabled={isDrawing}
          className="mt-12 px-8 py-3 bg-mystic-800 border border-gold-500 text-gold-400 font-serif rounded hover:bg-gold-500 hover:text-mystic-900 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDrawing ? 'Míchání...' : `Táhnout kartu (${cards.length + 1}/${spreadPositions.length})`}
        </motion.button>
      )}
      
      {isComplete && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-gold-500 font-serif mb-4">Výklad je kompletní</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-transparent border border-mystic-700 text-gray-300 font-serif hover:border-gold-500 transition-colors"
          >
            Nový výklad
          </button>
        </motion.div>
      )}
    </div>
  );
};
