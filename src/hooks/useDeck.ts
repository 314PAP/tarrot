import { useState, useCallback } from 'react';
import { thothTarotDeck, type TarotCard } from '../data/thothTarot';
import { shuffleDeck } from '../utils/tarotLogic';

export const useDeck = () => {
  const [deck, setDeck] = useState<TarotCard[]>(thothTarotDeck);
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);

  const shuffle = useCallback(() => {
    setDeck(shuffleDeck([...thothTarotDeck]));
    setDrawnCards([]);
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

  const autoRoll = useCallback(() => {
    const randomDeck = shuffleDeck([...thothTarotDeck]);
    return randomDeck[0];
  }, []);

  return {
    deck,
    drawnCards,
    shuffle,
    drawCard,
    autoRoll,
  };
};
