import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDeck } from '../hooks/useDeck';
import { Card } from '../components/Card';
import type { TarotCard } from '../data/thothTarot';
import { Sparkles, Book } from 'lucide-react';

export const Home: React.FC = () => {
  const { autoRoll } = useDeck();
  const [dailyCard, setDailyCard] = useState<TarotCard | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const handleRoll = () => {
    setIsRolling(true);
    // Fake rolling delay
    setTimeout(() => {
      setDailyCard(autoRoll());
      setIsRolling(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-serif text-gold-500 mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
          Crowleyho Thoth Tarot
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-serif leading-relaxed">
          Ponořte se do mystického světa Aleistera Crowleyho a Lady Friedy Harris.
          Objevte archetypální síly a získejte vhled do svých otázek.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center items-center">
        {/* Daily Card Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center glass-panel p-8 rounded-2xl w-full md:w-1/2 min-h-[450px]"
        >
          <h2 className="text-2xl font-serif text-gold-400 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> Karta dne
          </h2>
          
          <div className="flex-grow flex flex-col items-center justify-center w-full">
            {dailyCard ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <Card card={dailyCard} isFlipped={true} className="mb-6" />
                <p className="text-center text-sm text-gray-300 mt-4">{dailyCard.meaning}</p>
              </motion.div>
            ) : (
              <button 
                onClick={handleRoll}
                disabled={isRolling}
                className="w-full max-w-[200px] aspect-[2/3] border-2 border-dashed border-gold-500/50 rounded-xl flex flex-col items-center justify-center text-gold-500/70 hover:text-gold-400 hover:border-gold-400 hover:bg-mystic-800/50 transition-all cursor-pointer group disabled:opacity-50 disabled:cursor-wait"
              >
                <span className="font-serif text-lg mb-2">{isRolling ? 'Míchání...' : 'Vytáhnout kartu'}</span>
                <Sparkles className={`w-6 h-6 ${isRolling ? 'animate-spin' : 'group-hover:scale-125 transition-transform'}`} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Action Cards */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col gap-6 w-full md:w-1/2"
        >
          <Link to="/reading" className="group">
            <div className="glass-panel p-8 rounded-2xl hover:bg-mystic-800/80 hover:border-gold-500/50 transition-all duration-300 h-full flex flex-col justify-center">
              <h2 className="text-2xl font-serif text-gold-400 mb-3 flex items-center gap-3">
                <Sparkles className="w-6 h-6 group-hover:text-gold-300" />
                Nový Výklad
              </h2>
              <p className="text-gray-400">
                Vyberte si typ výkladu a nechte karty, aby vám odhalily odpovědi na vaše otázky.
              </p>
            </div>
          </Link>

          <Link to="/encyclopedia" className="group">
            <div className="glass-panel p-8 rounded-2xl hover:bg-mystic-800/80 hover:border-gold-500/50 transition-all duration-300 h-full flex flex-col justify-center">
              <h2 className="text-2xl font-serif text-gold-400 mb-3 flex items-center gap-3">
                <Book className="w-6 h-6 group-hover:text-gold-300" />
                Encyklopedie
              </h2>
              <p className="text-gray-400">
                Prostudujte si významy jednotlivých karet, jejich symboliku a astrologické souvislosti.
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
