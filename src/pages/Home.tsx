import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Book, Feather, Sigma } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-200px)] py-8 px-4">
      {/* Mystical intro section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sigma className="w-8 h-8 text-gold-500" />
          <Feather className="w-6 h-6 text-gold-400/70" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-serif text-gold-500 mb-6 tracking-wide">
          Crowleyho Thoth Tarot
        </h1>

        <div className="space-y-4 text-gray-300 font-serif leading-relaxed">
          <p className="text-lg">
            Vstupte do svatyně starověkých mýtů, kde se setkáváme s bohyní Nuit, 
            hadem Haditem a tajemstvím Abyss. Každá karta je oknem do vesmíru, 
            zrcadlo, jehož fasety odrážejí celé spektrum lidské zkušenosti — 
            od temnoty po nebeskou světlu.
          </p>

          <p className="text-base text-gray-400">
            Založen na kabbalistickém Stromu Života, alchymických procesech a 
            okultních sysobích Aleistera Crowleyho, Thoth Tarot není nástrojem 
            pro jednoduché předpovědi — je to kniha života, klíč k sebepoznání 
            a mapa duševních rozhraní.
          </p>

          <p className="text-base text-gray-400">
            Každá karta nese v sobě vibrations elementů Ohně, Vody, Vzduchu a Země, 
            archetypy Major Arcany a671
          </p>
        </div>

        <Link
          to="/reading"
          className="mt-10 inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-mystic-950 font-bold text-xl sm:text-2xl font-serif rounded-xl shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300"
        >
          <Sparkles className="w-7 h-7" />
          VSTOUPIT DO SVATYNĚ
        </Link>

        <p className="mt-6 text-sm text-gold-500/60 font-serif italic">
          Otevřete srdce a nechte příběh se vám odhalit
        </p>
      </div>

      {/* Navigation to other sections */}
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
