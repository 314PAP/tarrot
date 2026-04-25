import React, { useState, useEffect } from 'react';
import { useDeck } from '../hooks/useDeck';
import { SpreadLayout } from '../components/SpreadLayout';
import { availableSpreads } from '../logic/spreads';
import type { Spread, SpreadPosition } from '../logic/spreads';
import { Sparkles, Layers, Grid, List, X } from 'lucide-react';

export const Reading: React.FC = () => {
  try {
    const { activeSpread, setActiveSpread, dealSpread } = useDeck();
    const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
    const [isDealing, setIsDealing] = useState(false);
    const [summaryModalOpen, setSummaryModalOpen] = useState(false);

    console.log('[READING DEBUG] selectedSpread:', selectedSpread?.name, 'activeSpread:', activeSpread?.length);
    console.log('[READING DEBUG] availableSpreads:', availableSpreads?.length);

  const startReading = (spread: Spread) => {
    setSelectedSpread(spread);
    setActiveSpread(null);
  };

  const handleDeal = () => {
    if (!selectedSpread) return;
    setIsDealing(true);
    try {
      const positions = dealSpread(selectedSpread);
      console.log('[DEBUG] dealSpread returned:', positions);
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

   // 1. Stručný význam karty (1-2 věty)
   const getShortCardMeaning = (card: any): string => {
     if (!card) return '';

     const suitCz = card.suit === 'Wands' ? 'Holí' :
                    card.suit === 'Cups' ? 'Pohárů' :
                    card.suit === 'Swords' ? 'Mečů' :
                    card.suit === 'Disks' ? 'Disku' : card.suit;

     // Major Arcana: klíčová slova + první věta z meaning
     if (card.type === 'Major') {
       const keywordsPart = card.keywords && card.keywords.length >= 2
         ? `${card.keywords[0]}, ${card.keywords[1]}`
         : (card.keywords?.[0] || '');
       const shortDesc = (card.meaning?.split('.')[0] || '') + '.';
       return keywordsPart ? `${keywordsPart}. ${shortDesc}` : shortDesc;
     }

     // Court cards: typ (Princezna/Princ/Královna/Rytíř) a suit
     if (card.type === 'Court') {
       const rankMap: Record<string, string> = {
         'Princess': 'Princezna',
         'Prince': 'Princ',
         'Queen': 'Královna',
         'Knight': 'Rytíř'
       };
       const rankKey = ['Princess', 'Prince', 'Queen', 'Knight'].find(k => card.name.includes(k));
       const rankName = rankKey ? rankMap[rankKey] : card.name.split(' ')[0];
       return `${rankName} ${suitCz}`;
     }

     // Minor Arcana: číslo + suit + klíčové slovo
     if (card.type === 'Minor' && card.number !== undefined) {
       const keyword = card.keywords?.[0] || '';
       return `${card.number} ${suitCz}${keyword ? ' – ' + keyword : ''}`;
     }

     // Fallback: první věta z meaning
     return (card.meaning?.split('.')[0] || '') + '.';
   };

   // 2. Skupina pozice pro Keltský kříž
   const getPositionGroup = (positionId: string, positionLabel: string): string => {
     const label = positionLabel.toLowerCase();
     if (label === 'základ') return 'základ_situace';
     if (label === 'minulost') return 'minulý_kontext';
     if (['tazatel', 'postoj', 'naděje a obavy'].includes(label)) return 'vnitřní_rozměr';
     if (['překážka', 'vnější vlivy'].includes(label)) return 'konfrontace_a_vlivy';
     if (label === 'cíl') return 'směr_a_cíl';
     if (label === 'budoucnost') return 'budoucí_vývoj';
     if (label === 'výsledek') return 'konečný_výsledek';
     return 'single';
   };

   // 3. Název skupiny
   const getGroupLabel = (group: string): string => {
     const labels: Record<string, string> = {
       'základ_situace': 'Základ situace',
       'minulý_kontext': 'Minulý kontext',
       'vnitřní_rozměr': 'Vnitřní rozměr',
       'konfrontace_a_vlivy': 'Konfrontace a vlivy',
       'směr_a_cíl': 'Směr a cíl',
       'budoucí_vývoj': 'Budoucí vývoj',
       'konečný_výsledek': 'Konečný výsledek'
     };
     return labels[group] || '';
   };

   // 4. Dynamické přechodové věty mezi skupinami
   const getTransitionSentence = (prevGroup: string, nextGroup: string, prevCardName: string, nextCardName: string): string => {
     const transitions: Record<string, Record<string, string>> = {
       'základ_situace': {
         'konfrontace_a_vlivy': `Tento základ je konfrontován s ${nextCardName}.`,
         'minulý_kontext': `Základní situace je formována minulostí, která se projevuje skrze ${nextCardName}.`,
         'vnitřní_rozměr': `Základní energie se proměňuje ve vnitřní rozměr, kde vystupuje ${nextCardName}.`
       },
       'minulý_kontext': {
         'vnitřní_rozměr': `Minulost přináší důsledky, které se nyní projevují v ${nextCardName}.`,
         'konfrontace_a_vlivy': `Z minula vyrostlé okolnosti se konfrontují s ${nextCardName}.`,
         'budoucí_vývoj': `V širším kontextu se ukazuje, že ${nextCardName} bude hrát klíčovou roli.`
       },
       'vnitřní_rozměr': {
         'konfrontace_a_vlivy': `Vnitřní stav tazatele se setkává s překážkou ${nextCardName}.`,
         'směr_a_cíl': `Z tohoto vnitřního povědomí vychází cíl ztělesněný ${nextCardName}.`,
         'budoucí_vývoj': `Aktuální postoj a naděje ukazují, že ${nextCardName} bude významný.`
       },
       'konfrontace_a_vlivy': {
         'směr_a_cíl': `Překážky a vlivy směřují k cíli ztělesněnému ${nextCardName}.`,
         'budoucí_vývoj': `Konfrontace s vnějším světem otevřela cestu k ${nextCardName}.`,
         'vnitřní_rozměr': `Vnější tlaky také ovlivňují vnitřní pocity zobrazené ${nextCardName}.`
       },
       'směr_a_cíl': {
         'budoucí_vývoj': `Cíl, ke kterému směřujete, povede k ${nextCardName}.`,
         'vnitřní_rozměr': `Směr, který zvolujete, reflektuje vaše vnitřní pocity zobrazené ${nextCardName}.`,
         'konečný_výsledek': `Vaše aspirace vedly konečně k ${nextCardName}.`
       },
       'budoucí_vývoj': {
         'konečný_výsledek': `Budoucí vývoj přinese konečný výsledek ztělesněný ${nextCardName}.`,
         'vnitřní_rozměr': `Budoucí události budou ovlivněny vnitřními pocity zobrazenými ${nextCardName}.`
       }
     };

     const possibleTransitions = transitions[prevGroup];
     if (possibleTransitions) {
       const direct = possibleTransitions[nextGroup];
       if (direct) return direct;
       // Fallback na první dostupnou přechodovou větu
       const firstKey = Object.keys(possibleTransitions)[0];
       if (firstKey) return possibleTransitions[firstKey];
     }

     // Výchozí přechodová věta
     const groupNames: Record<string, string> = {
       'základ_situace': 'základní situace',
       'minulý_kontext': 'minulost',
       'vnitřní_rozměr': 'vnitřní rozměr',
       'konfrontace_a_vlivy': 'konfrontaci a vlivy',
       'směr_a_cíl': 'cíl',
       'budoucí_vývoj': 'budoucí vývoj',
       'konečný_výsledek': 'konečný výsledek'
     };
     const prevName = groupNames[prevGroup] || prevGroup.replace('_', ' ');
     const nextName = groupNames[nextGroup] || nextGroup.replace('_', ' ');
     return `Tato karta vede k ${nextName}, kde vystupuje ${nextCardName}.`;
    };

    // 5. Syntéza výkladu
   const buildSynthesis = (groupedCards: Record<string, any[]>): string => {
     const importantCards = [
       groupedCards['základ_situace']?.[0],
       groupedCards['konečný_výsledek']?.[0],
       groupedCards['vnitřní_rozměr']?.[0]
     ].filter(Boolean);

     const keywords = importantCards.flatMap((item: any) => {
       const card = item.card;
       return card?.keywords?.slice(0, 2) || [];
     });

     if (keywords.length === 0) {
       return '**Syntéza výkladu:** Hlavní téma vaší situace se promenuje skrze zobrazené karty. Celkově výklad ukazuje důležitost pochopení současného okamžiku a přijetí příštích změn.';
     }

     const uniqueKeywords = [...new Set(keywords)];
     const synthesisText = `Hlavním tématem je ${uniqueKeywords.slice(0, 3).join(', ')}. Klíčové je zaměřit se na ${uniqueKeywords[1] || 'vnitřní poznání'}. Celkově výklad ukazuje, že aktuální zkušenost je nezbytná pro váš růst.`;

     return `**Syntéza výkladu:** ${synthesisText}`;
   };

   // === NOVÁ IMPLEMENTACE buildReadingStory() ===
   const buildReadingStory = () => {
     if (!selectedSpread || visibleCards.length === 0) return '';

     // Pro non-Celtic Cross: jednoduchý výpis všech karet bez seskupování
     if (selectedSpread.id !== 'celtic-cross') {
       return visibleCards
         .map((pos) => {
           const cardData = getCardSummary(pos);
           if (!cardData) return '';
           const shortMeaning = getShortCardMeaning(pos.card);
           return `${pos.label}: ${cardData.cardName} – ${shortMeaning}.`;
         })
         .join('\n');
     }

     // Pro Keltský kříž: seskupení do logických celků
     const groups: Record<string, any[]> = {};
     visibleCards.forEach((pos) => {
       const group = getPositionGroup(pos.id, pos.label);
       if (!groups[group]) groups[group] = [];
       groups[group].push(pos);
     });

     const groupOrder = [
       'základ_situace',
       'minulý_kontext',
       'vnitřní_rozměr',
       'konfrontace_a_vlivy',
       'směr_a_cíl',
       'budoucí_vývoj',
       'konečný_výsledek'
     ];

     const storyParts: string[] = [];

     groupOrder.forEach((groupKey, groupIndex) => {
       const cardsInGroup = groups[groupKey];
       if (!cardsInGroup || cardsInGroup.length === 0) return;

       const groupLabel = getGroupLabel(groupKey);
       storyParts.push(`${groupLabel}:`);

       cardsInGroup.forEach((pos, cardIndex) => {
         const cardData = getCardSummary(pos);
         if (!cardData) return;
         const shortMeaning = getShortCardMeaning(pos.card);
         storyParts.push(`${pos.label}: ${cardData.cardName} – ${shortMeaning}.`);
       });

       // Přidat přechodovou větu mezi skupinami (kromě poslední skupiny)
       const nextGroupKey = groupOrder[groupIndex + 1];
       if (nextGroupKey && groups[nextGroupKey] && groups[nextGroupKey].length > 0) {
         const currentLastCard = cardsInGroup[cardsInGroup.length - 1];
         const nextFirstCard = groups[nextGroupKey][0];
         const transition = getTransitionSentence(
           groupKey,
           nextGroupKey,
           currentLastCard.card?.name || '',
           nextFirstCard.card?.name || ''
         );
         storyParts.push(transition);
       }

       storyParts.push(''); // prázdný řádek mezi skupinami
     });

     // Přidat syntézu
     storyParts.push(buildSynthesis(groups));

     return storyParts.filter(Boolean).join('\n');
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
