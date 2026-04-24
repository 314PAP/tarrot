import React, { useState } from 'react';
import { useSearch } from '../hooks/useSearch';
import { Card } from '../components/Card';
import { Search, Filter } from 'lucide-react';
import type { TarotCard } from '../data/thothTarot';

export const Encyclopedia: React.FC = () => {
  const { query, setQuery, suitFilter, setSuitFilter, filteredCards } = useSearch();
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);

  const filters = ['All', 'Major', 'Wands', 'Cups', 'Swords', 'Disks'];

  return (
    <div className="py-4 flex flex-col min-h-[80vh]">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-serif text-gold-500 mb-2">Encyklopedie</h1>
          <p className="text-gray-400">Prozkoumejte všech 78 karet Thoth tarotu.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hledat kartu nebo klíčové slovo..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-mystic-800/80 border border-mystic-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={suitFilter}
              onChange={(e) => setSuitFilter(e.target.value)}
              className="w-full sm:w-48 pl-10 pr-8 py-2 bg-mystic-800/80 border border-mystic-700 rounded-lg text-gray-200 appearance-none focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors cursor-pointer"
            >
              {filters.map(filter => (
                <option key={filter} value={filter}>
                  {filter === 'All' ? 'Všechny barvy' : filter === 'Major' ? 'Velká Arkána' : filter}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="flex-grow">
        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredCards.map((card: TarotCard) => (
              <button
                key={card.id}
                type="button"
                className="flex justify-center"
                onClick={() => setSelectedCard(card)}
              >
                <Card card={card} isFlipped={true} />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="w-12 h-12 text-mystic-700 mb-4" />
            <h3 className="text-xl text-gray-300 font-serif">Žádné karty nenalezeny</h3>
            <p className="text-gray-500 mt-2">Zkuste upravit vyhledávání nebo filtry.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mystic-900/90 backdrop-blur-sm" onClick={() => setSelectedCard(null)}>
          <div
            className="bg-mystic-800 border border-gold-500/30 rounded-2xl p-6 max-w-4xl w-full flex flex-col md:flex-row gap-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full md:w-1/2 flex justify-center flex-shrink-0">
              <Card card={selectedCard} isFlipped={true} className="w-64 h-96 md:w-80 md:h-[480px]" />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="mb-2 text-gold-500/70 text-sm tracking-widest uppercase font-semibold">
                {selectedCard.type === 'Major' ? 'Velká Arkána' : `${selectedCard.suit}`}
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-gold-400 mb-6">{selectedCard.name}</h2>

              <div className="mb-6">
                <h3 className="text-lg text-gray-300 mb-2 font-serif border-b border-mystic-700 pb-1">Klíčová slova</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCard.keywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-mystic-700/50 rounded-full text-sm text-gold-100 border border-mystic-600">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg text-gray-300 mb-2 font-serif border-b border-mystic-700 pb-1">Význam</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedCard.meaning}
                </p>
                {selectedCard.description ? (
                  <>
                    <h3 className="text-lg text-gray-300 mt-6 mb-2 font-serif border-b border-mystic-700 pb-1">Popis</h3>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                      {selectedCard.description}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm mt-4 italic">
                    Poznámka: Thoth tarot je hluboce symbolický. Doporučujeme meditovat nad zobrazenými symboly pro hlubší osobní vhled.
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedCard(null)}
                className="mt-8 self-start px-6 py-2 border border-gold-500/50 text-gold-400 rounded hover:bg-gold-500/10 transition-colors"
              >
                Zavřít
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
