import React, { useState } from 'react';
import { useDeck } from '../hooks/useDeck';
import { SpreadLayout } from '../components/SpreadLayout';
import { availableSpreads } from '../logic/spreads';
import type { Spread, SpreadPosition } from '../logic/spreads';
import { Sparkles, Layers, Grid, List, X } from 'lucide-react';

export const Reading: React.FC = () => {
  const { activeSpread, setActiveSpread, dealSpread } = useDeck();
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
  const [isDealing, setIsDealing] = useState(false);
  const [summaryModalOpen, setSummaryModalOpen] = useState(false);

  const startReading = (spread: Spread) => {
    setSelectedSpread(spread);
    setActiveSpread(null);
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

  const getCardSummary = (pos: SpreadPosition) => {
    if (!pos.card) return null;
    return {
      position: pos.label,
      positionDescription: pos.description,
      cardName: pos.card.name,
      meaning: pos.card.meaning,
      description: pos.card.description,
    };
  };

  const getVisibleCards = () => {
    if (!activeSpread) return [];
    return activeSpread.filter(p => p.card && !p.isHidden);
  };

  const visibleCards = getVisibleCards();

  const buildReadingStory = () => {
    if (!selectedSpread || visibleCards.length === 0) return '';

    return visibleCards
      .map((pos) => {
        const cardData = getCardSummary(pos);
        if (!cardData) return '';

        const parts = [
          `Na pozici ${cardData.position.toLowerCase()} se objevuje karta ${cardData.cardName}.`,
          cardData.positionDescription ? `Tato pozice se vztahuje k tématu: ${cardData.positionDescription}.` : '',
          cardData.meaning,
          cardData.description ?? '',
        ].filter(Boolean);

        return parts.join(' ');
      })
      .join('\n\n');
  };

  const getIconForSpread = (id: string) => {
    switch (id) {
      case 'single': return <Sparkles className="w-10 h-10 text-gold-400 mb-3" />;
      case 'three-card': return <Layers className="w-10 h-10 text-gold-400 mb-3" />;
      case 'celtic-cross': return <List className="w-10 h-10 text-gold-400 mb-3" />;
      case 'fifteen-card': return <Grid className="w-10 h-10 text-gold-400 mb-3" />;
      default: return <List className="w-10 h-10 text-gold-400 mb-3" />;
    }
  };

  if (!selectedSpread) {
    return (
      <div className="flex flex-col items-center min-h-[70vh] py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-gold-500 mb-3">Vyberte si výklad</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Soustřeďte se na svou otázku. Vyberte typ výkladu, který nejlépe odpovídá vaší situaci.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl px-4">
          {availableSpreads.map((spread) => (
            <button
              key={spread.id}
              onClick={() => startReading(spread)}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-mystic-800/60 backdrop-blur-md border border-mystic-700/50 hover:border-gold-500/50 hover:bg-mystic-800/80 transition-all"
            >
              {getIconForSpread(spread.id)}
              <h2 className="text-xl font-serif text-gold-500 mb-2">{spread.name}</h2>
              <p className="text-gray-400 text-sm">{spread.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mb-6 flex items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-serif text-gold-500 mb-1">
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
          Zpět
        </button>
      </div>

      {!activeSpread ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <button
            onClick={handleDeal}
            disabled={isDealing}
            className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-mystic-900 font-bold rounded-xl font-serif text-lg shadow-lg shadow-gold-500/20 disabled:opacity-50 transition-all"
          >
            {isDealing ? 'Míchám...' : 'Vyložit karty'}
          </button>
        </div>
      ) : (
        <>
          <SpreadLayout
            positions={activeSpread}
            onCardClick={handleCardClick}
          />
          <div className="flex justify-center mt-6 px-4">
            <button
              onClick={() => setSummaryModalOpen(true)}
              disabled={visibleCards.length === 0}
              className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-mystic-900 font-bold rounded-xl font-serif text-lg shadow-lg shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Zobrazit celkový souhrn ({visibleCards.length})
            </button>
          </div>
        </>
      )}

      {/* Summary Modal */}
      {summaryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mystic-900/90 backdrop-blur-sm" onClick={() => setSummaryModalOpen(false)}>
          <div className="bg-mystic-800 border border-gold-500/30 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-[0_0_30px_rgba(0,0,0,0.5)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-gold-400">Celkový souhrn výkladu</h2>
              <button onClick={() => setSummaryModalOpen(false)} className="text-gray-400 hover:text-gold-400 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            {visibleCards.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Zatím nebyly vyloženy žádné karty.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-2xl border border-gold-500/20 bg-mystic-900/40 p-5">
                  <h3 className="mb-3 font-serif text-xl text-gold-300">Příběh výkladu</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedSpread
                      ? `${selectedSpread.description} Každá odkrytá karta přidává další vrstvu do společného obrazu vaší situace. Níže najdete jak jednotlivé významy, tak souvislé vyprávění, které z nich vzniká.`
                      : 'Každá odkrytá karta přidává další vrstvu do společného obrazu vaší situace.'}
                  </p>
                </div>

                <div className="max-w-none space-y-5">
                  {visibleCards.map((pos, index) => {
                    const cardData = getCardSummary(pos);
                    if (!cardData) return null;
                    
                    return (
                      <div key={pos.id} className="relative pl-6 border-l-2 border-gold-500/50 mb-4 pb-4">
                        <div className="absolute -left-3 top-0 w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center">
                          <span className="text-mystic-900 text-xs font-bold">{index + 1}</span>
                        </div>
                        <div className="mb-2">
                          <span className="text-gold-400/70 text-sm font-semibold uppercase tracking-wider">
                            {cardData.position}
                          </span>
                        </div>
                        {cardData.positionDescription ? (
                          <p className="mb-3 text-sm text-gray-400">
                            {cardData.positionDescription}
                          </p>
                        ) : null}
                        <h3 className="text-xl font-serif text-gold-300 mb-3">
                          {cardData.cardName}
                        </h3>
                        <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                          {cardData.meaning}
                        </p>
                        {cardData.description ? (
                          <p className="mt-4 text-gray-400 leading-relaxed whitespace-pre-line">
                            {cardData.description}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-2xl border border-gold-500/20 bg-mystic-900/40 p-5">
                  <h3 className="mb-3 font-serif text-xl text-gold-300">Souvislý narativ</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {buildReadingStory()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
