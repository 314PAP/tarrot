import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDeck } from '../hooks/useDeck';
import { Card } from '../components/Card';
import type { TarotCard } from '../data/thothTarot';
import { Sparkles, Book, Navigation } from 'lucide-react';

export const Home: React.FC = () => {
  const { autoRoll } = useDeck();
  const [dailyCard, setDailyCard] = useState<TarotCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Initial draw
    if (!dailyCard) {
      setDailyCard(autoRoll());
      // Delay flipping slightly so it feels like a draw
      setTimeout(() => setIsFlipped(true), 600);
    }
  }, []);

  const handleDragEnd = async (_e: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    // If swiped far enough or fast enough
    if (Math.abs(offset) > 100 || Math.abs(velocity) > 500) {
      const direction = offset > 0 ? 1 : -1;
      
      // Animate card flying away
      await controls.start({
        x: direction * 500,
        opacity: 0,
        transition: { duration: 0.3 }
      });
      
      // Reset position instantly
      controls.set({ x: 0, opacity: 0, scale: 0.8 });
      setIsFlipped(false);
      
      // Draw new card
      setDailyCard(autoRoll());
      
      // Animate new card in
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4 }
      });
      
      // Flip it
      setIsFlipped(true);
    } else {
      // Return to center
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  const handleManualDraw = async () => {
      // Simulate swipe left
      await controls.start({
        x: -500,
        opacity: 0,
        transition: { duration: 0.3 }
      });
      
      controls.set({ x: 0, opacity: 0, scale: 0.8 });
      setIsFlipped(false);
      setDailyCard(autoRoll());
      
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4 }
      });
      setIsFlipped(true);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] w-full max-w-md mx-auto pt-4 pb-24 px-4 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-serif text-gold-500 mb-2 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
          Thoth Tarot
        </h1>
        <p className="text-sm text-gray-400 font-serif">
          Zeptejte se. Táhněte. Poznávejte.
        </p>
      </motion.div>

      {/* Main Card Area - Tinder like */}
      <div className="flex-grow w-full flex flex-col items-center justify-center relative min-h-[500px]">
        <div className="absolute top-0 text-center w-full z-0 opacity-50 flex items-center justify-center gap-2">
           <Navigation className="w-4 h-4" />
           <span className="text-xs text-gray-400 uppercase tracking-widest">Swipe pro novou kartu</span>
        </div>
        
        <AnimatePresence>
          {dailyCard && (
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              animate={controls}
              className="z-10 cursor-grab active:cursor-grabbing flex flex-col items-center w-full mt-8"
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                card={dailyCard} 
                isFlipped={isFlipped} 
                onClick={() => setIsFlipped(!isFlipped)} 
                className="mb-6 shadow-2xl touch-none" 
              />
              
              {/* Detailed Description below card when flipped */}
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isFlipped ? 1 : 0, height: isFlipped ? 'auto' : 0 }}
                className="w-full px-2 text-center overflow-hidden"
              >
                <div className="glass-panel p-4 rounded-xl mt-2 max-h-[180px] overflow-y-auto text-left shadow-inner custom-scrollbar">
                    <h3 className="text-gold-400 font-serif mb-2 text-lg border-b border-mystic-700/50 pb-2">{dailyCard.name}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed text-justify">
                        {dailyCard.meaning}
                    </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Action Bar (Mobile App Style) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 w-full glass-panel border-t border-mystic-700/50 p-4 flex justify-around items-center z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.4)] pb-safe"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <button 
            onClick={handleManualDraw}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gold-400 transition-colors w-20"
        >
            <div className="p-2 bg-mystic-900 rounded-full border border-mystic-700">
               <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider">Tah</span>
        </button>

        <Link to="/reading" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gold-400 transition-colors -mt-8 relative z-10 w-24">
            <div className="p-4 bg-gradient-to-br from-mystic-700 to-mystic-900 rounded-full border-2 border-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.4)] group hover:scale-105 transition-transform">
                <Sparkles className="w-7 h-7 text-gold-400 group-hover:text-gold-300" />
            </div>
            <span className="text-[11px] uppercase font-bold tracking-wider mt-1 text-gold-500">Výklad</span>
        </Link>

        <Link to="/encyclopedia" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gold-400 transition-colors w-20">
            <div className="p-2 bg-mystic-900 rounded-full border border-mystic-700">
                <Book className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider">Atlas</span>
        </Link>
      </motion.div>
    </div>
  );
};
