import React, { useState, useCallback } from 'react';
import { useDeck } from '../hooks/useDeck';
import { SpreadLayout } from '../components/SpreadLayout';
import { availableSpreads } from '../logic/spreads';
import type { Spread, SpreadPosition } from '../logic/spreads';
import { Sparkles, Layers, Grid, List, X, Wand2, RefreshCw } from 'lucide-react';
import { generateAIReading, type CardForReading } from '../services/aiReading';

// ─── Konfigurace API ────────────────────────────────────────────────────────
const AI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || (
  typeof process !== 'undefined' ? process.env.OPENAI_API_KEY : ''
) || '';
const AI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL ||
  'https://www.genspark.ai/api/llm_proxy/v1';

// ─── Typy stavů AI výkladu ──────────────────────────────────────────────────
type AIState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'done'; narrative: string; isAI: boolean }
  | { status: 'error'; fallback: string };

export const Reading: React.FC = () => {
  try {
    const { activeSpread, setActiveSpread, dealSpread } = useDeck();
    const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
    const [isDealing, setIsDealing] = useState(false);
    const [summaryModalOpen, setSummaryModalOpen] = useState(false);
    const [aiState, setAiState] = useState<AIState>({ status: 'idle' });

  // ─── Pomocné funkce ─────────────────────────────────────────────────────

  const startReading = (spread: Spread) => {
    setSelectedSpread(spread);
    setActiveSpread(null);
    setAiState({ status: 'idle' });
  };

  const handleDeal = () => {
    if (!selectedSpread) return;
    setIsDealing(true);
    setAiState({ status: 'idle' });
    try {
      const positions = dealSpread(selectedSpread);
      setActiveSpread(positions);
    } catch (error) {
      console.error('[ERROR] dealSpread failed:', error);
    } finally {
      setIsDealing(false);
    }
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

  // ─── Stručný statický popis karty (1–2 věty) ──────────────────────────
  const getShortCardMeaning = (card: any): string => {
    if (!card) return '';
    const suitCz = card.suit === 'Wands' ? 'Holí' :
                   card.suit === 'Cups' ? 'Pohárů' :
                   card.suit === 'Swords' ? 'Mečů' :
                   card.suit === 'Disks' ? 'Disku' : card.suit;
    if (card.type === 'Major') {
      const keywordsPart = card.keywords?.slice(0, 2).join(', ') || '';
      const shortDesc = (card.meaning?.split('.')[0] || '') + '.';
      return keywordsPart ? `${keywordsPart}. ${shortDesc}` : shortDesc;
    }
    if (card.type === 'Court') {
      const rankMap: Record<string, string> = {
        Princess: 'Princezna', Prince: 'Princ', Queen: 'Královna', Knight: 'Rytíř',
      };
      const rankKey = ['Princess', 'Prince', 'Queen', 'Knight'].find(k => card.name.includes(k));
      const rankName = rankKey ? rankMap[rankKey] : card.name.split(' ')[0];
      return `${rankName} ${suitCz}`;
    }
    if (card.type === 'Minor' && card.number !== undefined) {
      const keyword = card.keywords?.[0] || '';
      return `${card.number} ${suitCz}${keyword ? ' – ' + keyword : ''}`;
    }
    return (card.meaning?.split('.')[0] || '') + '.';
  };

  // ─── Statický fallback narativ (původní logika, zjednodušená) ──────────
  const buildStaticNarrative = (): string => {
    if (!selectedSpread || visibleCards.length === 0) return '';

    return visibleCards
      .map((pos) => {
        const cardData = getCardSummary(pos);
        if (!cardData) return '';
        const shortMeaning = getShortCardMeaning(pos.card);
        return `${pos.label} — ${cardData.cardName}: ${shortMeaning}`;
      })
      .join('\n');
  };

  // ─── Příprava dat pro AI ────────────────────────────────────────────────
  const buildCardsForAI = (): CardForReading[] => {
    return visibleCards.map((pos) => ({
      position: pos.label,
      positionDescription: pos.description,
      cardName: pos.card?.name ?? '',
      keywords: pos.card?.keywords ?? [],
      meaning: pos.card?.meaning ?? '',
    }));
  };

  // ─── Spuštění AI výkladu ────────────────────────────────────────────────
  const handleGenerateAI = useCallback(async () => {
    if (!selectedSpread || visibleCards.length === 0) return;
    setAiState({ status: 'loading' });

    const cards = buildCardsForAI();

    // Zkusíme proměnnou prostředí, pak fallback na hardcoded URL ze seznamu
    const apiKey = AI_API_KEY ||
      (typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_OPENAI_API_KEY : '') ||
      '';

    // Pokud nemáme API klíč, přečteme ho ze YAML přes server-side env (Vite dev)
    // V produkci musí být VITE_OPENAI_API_KEY nastaven v prostředí
    const effectiveApiKey = apiKey || 
      // Přímý fallback na Genspark token dostupný v dev prostředí
      (typeof import.meta !== 'undefined' ? (import.meta as any).env?.OPENAI_API_KEY : '') ||
      '';

    const result = await generateAIReading(
      {
        spreadName: selectedSpread.name,
        spreadDescription: selectedSpread.description,
        cards,
      },
      effectiveApiKey,
      AI_BASE_URL
    );

    if (result) {
      setAiState({ status: 'done', narrative: result.narrative, isAI: true });
    } else {
      // Fallback na statický narativ
      const fallback = buildStaticNarrative();
      setAiState({ status: 'error', fallback });
    }
  }, [selectedSpread, visibleCards]);

  // ─── Otevření modalu + automatické spuštění AI ──────────────────────────
  const handleOpenSummary = () => {
    setSummaryModalOpen(true);
    // Spustíme AI výklad automaticky při otevření (pokud ještě nebyl)
    if (aiState.status === 'idle' && visibleCards.length > 0) {
      handleGenerateAI();
    }
  };

  // ─── Ikony pro typy spreadů ─────────────────────────────────────────────
  const getIconForSpread = (id: string) => {
    switch (id) {
      case 'single': return <Sparkles className="w-10 h-10 text-gold-400 mb-3" />;
      case 'three-card': return <Layers className="w-10 h-10 text-gold-400 mb-3" />;
      case 'celtic-cross': return <List className="w-10 h-10 text-gold-400 mb-3" />;
      case 'fifteen-card': return <Grid className="w-10 h-10 text-gold-400 mb-3" />;
      default: return <List className="w-10 h-10 text-gold-400 mb-3" />;
    }
  };

  // ─── Výběr spreadu ─────────────────────────────────────────────────────
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

  // ─── Hlavní stránka výkladu ─────────────────────────────────────────────
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
            setAiState({ status: 'idle' });
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
              onClick={handleOpenSummary}
              disabled={visibleCards.length === 0}
              className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-mystic-900 font-bold rounded-xl font-serif text-lg shadow-lg shadow-gold-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Zobrazit celkový souhrn ({visibleCards.length})
            </button>
          </div>
        </>
      )}

      {/* ─── Summary Modal ─────────────────────────────────────────────────── */}
      {summaryModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mystic-900/90 backdrop-blur-sm"
          onClick={() => setSummaryModalOpen(false)}
        >
          <div
            className="bg-mystic-800 border border-gold-500/30 rounded-2xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hlavička modalu */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif text-gold-400">Celkový souhrn výkladu</h2>
              <button
                onClick={() => setSummaryModalOpen(false)}
                className="text-gray-400 hover:text-gold-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {visibleCards.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Zatím nebyly vyloženy žádné karty.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* ── Jednotlivé karty (timeline) ─────────────────────────────── */}
                <div className="max-w-none space-y-5">
                  {visibleCards.map((pos, index) => {
                    const cardData = getCardSummary(pos);
                    if (!cardData) return null;
                    return (
                      <div
                        key={pos.id}
                        className="relative pl-6 border-l-2 border-gold-500/50 mb-4 pb-4"
                      >
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

                {/* ── AI Narativní výklad ──────────────────────────────────────── */}
                <div className="rounded-2xl border border-gold-500/30 bg-mystic-900/50 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Wand2 className="w-5 h-5 text-gold-400" />
                      <h3 className="font-serif text-xl text-gold-300">Výklad karet</h3>
                    </div>
                    {/* Tlačítko pro regeneraci */}
                    {(aiState.status === 'done' || aiState.status === 'error') && (
                      <button
                        onClick={handleGenerateAI}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gold-400 transition-colors px-2 py-1 rounded-lg hover:bg-mystic-700/50"
                        title="Vygenerovat nový výklad"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Nový výklad
                      </button>
                    )}
                  </div>

                  {/* Stavy AI výkladu */}
                  {aiState.status === 'idle' && (
                    <div className="text-center py-6">
                      <button
                        onClick={handleGenerateAI}
                        className="flex items-center gap-2 mx-auto px-5 py-2.5 bg-gold-500/20 hover:bg-gold-500/30 border border-gold-500/40 text-gold-300 rounded-xl font-serif transition-all"
                      >
                        <Wand2 className="w-4 h-4" />
                        Vyložit příběh karet
                      </button>
                    </div>
                  )}

                  {aiState.status === 'loading' && (
                    <div className="flex flex-col items-center py-8 gap-4">
                      {/* Animovaná mystická ikonka */}
                      <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-2 border-gold-500/30 animate-ping" />
                        <div className="absolute inset-0 rounded-full border-2 border-gold-400/60 animate-spin" style={{ animationDuration: '3s' }} />
                        <Wand2 className="absolute inset-0 m-auto w-5 h-5 text-gold-400" />
                      </div>
                      <p className="text-gold-400/70 font-serif text-sm animate-pulse">
                        Thothova moudrost promlouvá…
                      </p>
                    </div>
                  )}

                  {aiState.status === 'done' && (
                    <div>
                      <p className="text-gray-200 leading-relaxed whitespace-pre-line text-[0.97rem]">
                        {aiState.narrative}
                      </p>
                      {aiState.isAI && (
                        <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
                          <Wand2 className="w-3 h-3" />
                          <span>Vygenerováno AI na základě Crowleyho Thoth tarotu</span>
                        </div>
                      )}
                    </div>
                  )}

                  {aiState.status === 'error' && (
                    <div>
                      <div className="mb-3 text-xs text-amber-400/70 flex items-center gap-1.5">
                        <span>⚠</span>
                        <span>AI výklad není dostupný — zobrazuji základní přehled karet.</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line text-[0.95rem] font-mono text-sm">
                        {aiState.fallback}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
  } catch (error) {
    console.error('[ERROR] Reading component failed:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-8">
        <h1 className="text-2xl font-serif text-red-500 mb-4">Chyba v komponentě</h1>
        <p className="text-gray-400">{String(error)}</p>
      </div>
    );
  }
};
