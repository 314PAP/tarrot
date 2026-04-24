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

      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md">
        {dailyCard && (
          <div className="flex flex-col items-center">
            <Card
              card={dailyCard}
              isFlipped={isFlipped}
              onClick={() => setIsFlipped(!isFlipped)}
              className="mb-6"
            />

            {isFlipped && (
              <div className="w-full max-w-sm px-4 mb-6">
                <div className="bg-mystic-800/60 backdrop-blur-md border border-mystic-700/50 rounded-xl p-4 shadow-xl">
                  <h3 className="text-gold-400 font-serif mb-2 text-lg border-b border-mystic-700/50 pb-2">
                    {dailyCard.name}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed text-justify">
                    {dailyCard.meaning}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleNewCard}
              className="flex items-center gap-2 px-6 py-3 bg-gold-600 hover:bg-gold-500 text-mystic-950 font-bold rounded-xl font-serif text-lg shadow-lg shadow-gold-500/20 transition-all mb-8"
            >
              <Sparkles className="w-5 h-5" />
              Tah Karu
            </button>
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
