import { TarotCard } from '../../data/thothTarot';

export interface SpreadPosition {
  id: string; // Unikátní identifikátor pozice
  label: string; // Název (např. "Minulost")
  description?: string; // Popis toho, co pozice znamená
  gridArea?: string; // CSS grid-area pro rozložení
  card?: TarotCard; // Natažená karta (pokud již byla tažena)
  isReversed?: boolean; // Zda je karta obrácená (Crowley to typicky nepoužívá, ale pro úplnost)
  isHidden?: boolean; // Zda je karta ještě zakrytá
}

export interface Spread {
  id: string;
  name: string;
  description: string;
  positions: SpreadPosition[];
  deal: (deck: TarotCard[]) => SpreadPosition[]; // Funkce, která vrátí pozice s přiřazenými kartami
}
