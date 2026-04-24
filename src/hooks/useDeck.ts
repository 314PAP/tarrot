import { useState, useCallback } from 'react';
import { thothTarotDeck, type TarotCard } from '../data/thothTarot';
import type { Spread, SpreadPosition } from '../logic/spreads';
import { shuffleDeck } from '../utils/tarotLogic';

export const useDeck = () => {
  const [deck, setDeck] = useState<TarotCard[]>(thothTarotDeck);
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  const [activeSpread, setActiveSpread] = useState<SpreadPosition[] | null>(null);

  const shuffle = useCallback(() => {
    setDeck(shuffleDeck([...thothTarotDeck]));
    setDrawnCards([]);
    setActiveSpread(null);
  }, []);

  const drawCard = useCallback(() => {
    if (deck.length === 0) return null;
    const newDeck = [...deck];
    const card = newDeck.pop();
    if (card) {
      setDeck(newDeck);
      setDrawnCards(prev => [...prev, card]);
      return card;
    }
    return null;
  }, [deck]);

  const dealSpread = useCallback((spread: Spread) => {
    const freshDeck = shuffleDeck([...thothTarotDeck]);
    const dealtPositions = spread.deal(freshDeck);
    setActiveSpread(dealtPositions);
    // Všechny použité karty nastavíme jako tažené a vyjmeme z balíčku
    const drawn = dealtPositions.map(p => p.card).filter(Boolean) as TarotCard[];
    setDrawnCards(drawn);
    // Zbylé karty by zůstaly v balíčku, ale pro jednoduchost teď
    // můžeme nechat zbytek karet v setDeck, nebo deck zcela nepoužívat.
    const remainingDeck = freshDeck.slice(drawn.length);
    setDeck(remainingDeck);
    
    return dealtPositions;
  }, []);

  const autoRoll = useCallback(() => {
    const randomDeck = shuffleDeck([...thothTarotDeck]);
    return randomDeck[0];
  }, []);

  return {
    deck,
    drawnCards,
    activeSpread,
    setActiveSpread,
    shuffle,
    drawCard,
    dealSpread,
    autoRoll,
  };
};
