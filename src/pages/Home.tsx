import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeck } from '../hooks/useDeck';
import { Card } from '../components/Card';
import type { TarotCard } from '../data/thothTarot';
import { Book, Feather, Sigma, Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const { autoRoll } = useDeck();
  const [dailyCard, setDailyCard] = useState<TarotCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const card = autoRoll();
    setDailyCard(card);
    const timeoutId = window.setTimeout(() => setIsFlipped(true), 350);
    return () => window.clearTimeout(timeoutId);
  }, [autoRoll]);

  const handleNewCard = () => {
    setIsFlipped(false);
    window.setTimeout(() => {
      setDailyCard(autoRoll());
      setIsFlipped(true);
    }, 220);
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <section className="rounded-[2rem] border border-gold-500/20 bg-mystic-800/55 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <div className="mb-6 flex items-center gap-3 text-gold-400/80">
            <Sigma className="h-8 w-8" />
            <Feather className="h-6 w-6" />
          </div>

          <h1 className="mb-5 text-3xl font-serif text-gold-500 sm:text-5xl">
            Thothův Tarot
          </h1>

          <div className="space-y-4 font-serif leading-relaxed text-gray-300">
            <p className="text-lg">
              Vstupte do světa Crowleyho symboliky a magie, kde se tarot nestává
              jen nástrojem předpovědi, ale mapou vědomí, rituálu a vnitřní
              proměny.
            </p>
            <p>
              Thothův systém propojuje kabalistický Strom života, astrologii,
              alchymii i thelémskou filosofii do jediného, mimořádně bohatého
              jazyka obrazů. Každá karta je branou mezi archetypem, živlem a
              konkrétní životní zkušeností.
            </p>
            <p className="text-gray-400">
              Tady nejde o rychlou odpověď bez hloubky. Každý výklad skládá
              příběh, v němž se potkává intuice s disciplínou, mystérium s
              významem a osobní otázka s širším řádem Thothovy tradice.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/reading"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-gold-500 px-8 py-4 text-lg font-bold tracking-wide text-slate-950 shadow-xl transition-all hover:bg-gold-400"
            >
              <Sparkles className="h-5 w-5" />
              ZAČÍT VÝKLAD
            </Link>
            <Link
              to="/encyclopedia"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-gold-500/40 px-8 py-4 text-lg font-semibold text-gold-300 transition-colors hover:bg-gold-500/10"
            >
              <Book className="h-5 w-5" />
              PROZKOUMAT KARTY
            </Link>
          </div>
        </section>

        <aside className="rounded-[2rem] border border-gold-500/20 bg-mystic-900/55 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <div className="mb-5 text-center">
            <div className="text-sm uppercase tracking-[0.3em] text-gold-400/70">
              Karta dne
            </div>
            <h2 className="mt-2 font-serif text-2xl text-gold-300">
              Denní vhled
            </h2>
          </div>

          <div className="flex flex-col items-center">
            {dailyCard ? (
              <>
                <Card
                  card={dailyCard}
                  isFlipped={isFlipped}
                  onClick={() => setIsFlipped((value) => !value)}
                />
                {isFlipped ? (
                  <div className="mt-5 w-full rounded-2xl border border-gold-500/20 bg-mystic-800/70 p-4">
                    <h3 className="font-serif text-xl text-gold-300">
                      {dailyCard.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-300">
                      {dailyCard.meaning}
                    </p>
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={handleNewCard}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/40 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gold-300 transition-colors hover:bg-gold-500/10"
                >
                  <Sparkles className="h-4 w-4" />
                  Táhnout novou kartu
                </button>
              </>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
};
