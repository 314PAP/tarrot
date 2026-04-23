import { useState, useMemo } from 'react';
import { thothTarotDeck, type TarotCard } from '../data/thothTarot';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [suitFilter, setSuitFilter] = useState<string>('All');

  const filteredCards = useMemo(() => {
    return thothTarotDeck.filter((card: TarotCard) => {
      const matchesQuery = card.name.toLowerCase().includes(query.toLowerCase()) || 
                           card.keywords.some(kw => kw.toLowerCase().includes(query.toLowerCase()));
      const matchesSuit = suitFilter === 'All' || card.suit === suitFilter || card.type === suitFilter;
      
      return matchesQuery && matchesSuit;
    });
  }, [query, suitFilter]);

  return {
    query,
    setQuery,
    suitFilter,
    setSuitFilter,
    filteredCards,
  };
};
