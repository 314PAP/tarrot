import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDeck } from '../hooks/useDeck';
import { Card } from '../components/Card';
import type { TarotCard } from '../data/thothTarot';
import { Book, Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const { autoRoll } = useDeck();
  const [dailyCard, setDailyCard] = useState<TarotCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const card = autoRoll();
    setDailyCard(card);
    setTimeout(() => setIsFlipped(true), 600);
  }, []);

  const handleNewCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setDailyCard(autoRoll());
      setTimeout(() => setIsFlipped(true), 100);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-200px)] py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif text-gold-500 mb-2">
          Thoth Tarot
        </h1>
        <p className="text-sm text-gray-400 font-serif">
          Zeptejte se. Táhněte. Poznávejte.
        </p>
      </div>

       <div className="flex-grow flex items-center justify-center w-full">
        {dailyCard && (
          <div className="w-full max-w-4xl px-4">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              <div className="flex-shrink-0">
                <Card
                  card={dailyCard}
                  isFlipped={isFlipped}
                  onClick={() => setIsFlipped(!isFlipped)}
                  style={{ '--card-max-h': '45vh' } as any}
                  className="w-auto" 
                />
              </div>

              {isFlipped && (
                <div className="w-full lg:flex-1">
                  <div className="bg-mystic-800/60 backdrop-blur-md border border-mystic-700/50 rounded-xl p-6 shadow-xl">
                    <h3 className="text-gold-400 font-serif mb-3 text-xl lg:text-2xl border-b border-mystic-700/50 pb-3">
                      {dailyCard.name}
                    </h3>
                    <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                      {dailyCard.meaning}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleNewCard}
                className="flex items-center gap-2 px-6 py-3 bg-gold-600 hover:bg-gold-500 text-mystic-950 font-bold rounded-xl font-serif text-lg shadow-lg shadow-gold-500/20 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Tah Karu
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-8 mt-auto pt-8">
        <Link
          to="/reading"
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors"
        >
          <div className="p-3 bg-mystic-800 rounded-full border border-mystic-700 hover:border-gold-500 transition-colors">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase font-bold tracking-wider">Výklad</span>
        </Link>

        <Link
          to="/encyclopedia"
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors"
        >
          <div className="p-3 bg-mystic-800 rounded-full border border-mystic-700 hover:border-gold-500 transition-colors">
            <Book className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase font-bold tracking-wider">Atlas</span>
        </Link>
      </div>
    </div>
  );
};
