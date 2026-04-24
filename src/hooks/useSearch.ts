import { useState, useMemo } from 'react';
import { thothTarotDeck, type TarotCard } from '../data/thothTarot';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [suitFilter, setSuitFilter] = useState<string>('All');

  const filteredCards = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return thothTarotDeck.filter((card: TarotCard) => {
      const searchableText = [
        card.name,
        card.meaning,
        card.description ?? '',
        ...card.keywords,
      ]
        .join(' ')
        .toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
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
