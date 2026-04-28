/**
 * AI Reading Service
 * Generuje souvislý narativní výklad tarotového spreadu pomocí OpenAI API.
 * API klíč je načítán z proměnné prostředí VITE_OPENAI_API_KEY (pro Vite)
 * nebo z import.meta.env (pro browser bundle).
 */

export interface CardForReading {
  position: string;
  positionDescription?: string;
  cardName: string;
  keywords: string[];
  meaning: string;
}

export interface AIReadingRequest {
  spreadName: string;
  spreadDescription: string;
  cards: CardForReading[];
}

export interface AIReadingResult {
  narrative: string;
  isAI: true;
}

export interface StaticReadingResult {
  narrative: string;
  isAI: false;
}

export type ReadingResult = AIReadingResult | StaticReadingResult;

/**
 * Sestaví systémový prompt pro AI tarotistku v Crowleyho stylu.
 */
function buildSystemPrompt(): string {
  return `Jsi zkušená tarotistka specializující se na Thothův tarot Aleistera Crowleyho. 
Mluvíš česky, ve druhé osobě singular (oslovuješ "tebe" / "tvůj"), tónem moudrého průvodce — ne věštce, ale někoho, kdo pomáhá tazateli pochopit síly kolem něj.

Tvůj styl:
- Piš plynulý, literární text bez odrážek a nadpisů uvnitř narativu
- Propoj karty do jediného koherentního příběhu — ne seznam, ale tok
- Používej poetický, ale srozumitelný jazyk
- Vyhni se klišé jako "karty říkají", "tarot ukazuje" — buď přímý
- Délka: 4–7 odstavců, každý 2–4 věty
- Zakončení: shrnutí jako výzva nebo otevřená otázka pro tazatele`;
}

/**
 * Sestaví uživatelský prompt ze spreadu a karet.
 */
function buildUserPrompt(request: AIReadingRequest): string {
  const cardLines = request.cards
    .map((c, i) => {
      const kwPart = c.keywords.slice(0, 3).join(', ');
      const meaning = c.meaning.split('.')[0]; // První věta
      return `${i + 1}. **${c.position}** → ${c.cardName} (klíčová slova: ${kwPart})\n   Význam: ${meaning}.${c.positionDescription ? `\n   Kontext pozice: ${c.positionDescription}` : ''}`;
    })
    .join('\n\n');

  return `Výklad: ${request.spreadName}
${request.spreadDescription}

Vyložené karty:
${cardLines}

Napiš souvislý narativní výklad tohoto spreadu jako zkušená tarotistka. Propoj všechny karty do jednoho plynulého příběhu — jak na sebe navazují, co společně sdělují, kam vedou.`;
}

/**
 * Zavolá OpenAI API a vrátí narativní výklad.
 * Pokud API selže, vrátí null (volající pak použije fallback).
 */
export async function generateAIReading(
  request: AIReadingRequest,
  apiKey: string,
  baseUrl: string
): Promise<AIReadingResult | null> {
  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5-mini',
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: buildUserPrompt(request) },
        ],
        temperature: 0.85,
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      console.error('[AI Reading] API error:', response.status, await response.text());
      return null;
    }

    const data = await response.json();
    const narrative = data?.choices?.[0]?.message?.content?.trim();

    if (!narrative) {
      console.error('[AI Reading] Empty response from API');
      return null;
    }

    return { narrative, isAI: true };
  } catch (err) {
    console.error('[AI Reading] Fetch failed:', err);
    return null;
  }
}
