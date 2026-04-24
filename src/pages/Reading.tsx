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
    const name = pos.card.name;
    const baseName = name.replace(/^Eso /, '').replace(/\d+ /, '').trim();
    const czMap: Record<string, string> = {
      'The Fool': 'Blázen', 'The Magus': 'Kejklíř', 'The Priestess': 'Velekněžka',
      'The Empress': 'Císařovna', 'The Emperor': 'Císař', 'The Hierophant': 'Velekněz',
      'The Lovers': 'Milenci', 'The Chariot': 'Vůz', 'Adjustment': 'Vyrovnání',
      'The Hermit': 'Poustevník', 'Fortune': 'Kolo štěstí', 'Lust': 'Chtíč',
      'The Hanged Man': 'Viselec', 'Death': 'Smrt', 'Art': 'Umění',
      'The Devil': 'Ďábel', 'The Tower': 'Věž', 'The Star': 'Hvězda',
      'The Moon': 'Měsíc', 'The Sun': 'Slunce', 'The Aeon': 'Aeon',
      'The Universe': 'Vesmír'
    };
    const suitMap: Record<string, string> = {
      'Wands': 'Holí', 'Cups': 'Pohárů', 'Swords': 'Mečů', 'Disks': 'Disku'
    };
    const courtMap: Record<string, string> = {
      'Princess': 'Princezna', 'Prince': 'Princ', 'Queen': 'Královna', 'Knight': 'Rytíř'
    };
    let czName = name;
    if (pos.card.type === 'Major') {
      czName = czMap[baseName] || name;
    } else if (pos.card.type === 'Minor') {
      const num = name.match(/^\d+/)?.[0] || '';
      const s = suitMap[baseName] || baseName;
      czName = `${num} ${s}`;
    } else if (pos.card.type === 'Court') {
      const rank = courtMap[baseName] || baseName;
      const s = suitMap[pos.card.suit] || pos.card.suit;
      czName = `${rank} ${s}`;
    }
    return { position: pos.label, czName, meaning: pos.card.meaning };
  };

  const getVisibleCards = () => {
    if (!activeSpread) return [];
    return activeSpread.filter(p => p.card && !p.isHidden);
  };

  const visibleCards = getVisibleCards();

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
            className="px-8 py-4 bg-gold-600 hover:bg-gold-500 text-mystic-950 font-bold rounded-xl font-serif text-lg shadow-lg shadow-gold-500/20 disabled:opacity-50 transition-all"
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
              className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-mystic-950 font-bold rounded-xl font-serif text-lg shadow-lg shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Tato výkladová cesta odhaluje příběh vaší situace skrze jazyk karet. 
                    Každá karta nese v sobě moudrost, a jejich spojení tvoří 
                    ucelený portrét vašeho aktuálního životního okamžiku.
                  </p>
                  
                  {visibleCards.map((pos, index) => {
                    const cardData = getCardSummary(pos);
                    if (!cardData) return null;
                    
                    return (
                      <div key={pos.id} className="relative pl-6 border-l-2 border-gold-500/50 mb-4 pb-4">
                        <div className="absolute -left-3 top-0 w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center">
                          <span className="text-mystic-950 text-xs font-bold">{index + 1}</span>
                        </div>
                        <div className="mb-2">
                          <span className="text-gold-400/70 text-sm font-semibold uppercase tracking-wider">
                            {cardData.position}
                          </span>
                        </div>
                        <h3 className="text-xl font-serif text-gold-300 mb-3">
                          {cardData.czName}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {cardData.meaning}
                        </p>
                      </div>
                    );
                  })}

                  <div className="mt-8 pt-6 border-t border-gold-500/30">
                    <p className="text-base text-gray-400 italic">
                      Tento příběh karet odráží vaši současnou cestu. Přečtěte si významy 
                      opakovaně a dovolte, aby se vám jejich hluboká moudrost 
                      vnitřně projevila.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
