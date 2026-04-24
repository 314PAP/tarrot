# Implementace Crowleyho výkladových metod (Spreads)

Tento plán popisuje návrh rozšíření logiky a uživatelského rozhraní aplikace pro Crowleyho metody věštění nalezené v Knize Thothově, včetně komplexního 15-ti kartového výkladu.

## Nalezené výklady z Knihy Thothovy

Na základě hloubkové analýzy textu (sekce *VLASTNOSTI TAROTU: JEHO UŽITÍ V DIVINAČNÍM UMĚNÍ*) jsem identifikoval pět fází komplexního rituálu, který Aleister Crowley používá (známý také jako *The Opening of the Key* - OOTK). 

Dále se chystám implementovat i 15-ti kartový výklad, který jste zmiňoval a který je klíčovým tradičním výkladem (zlatého úsvitu / Golden Dawn).

### Seznam výkladů k implementaci:

1.  **15-ti kartový výklad (The 15-Card Spread)**
    *   Tradiční Golden Dawn výklad, který používal Crowley.
    *   Karty se vykládají ve skupinách po třech do specifického rozložení (Minulost, Současnost, Budoucnost, Skrytý vliv, Výsledek).
2.  **První operace (Rozpoložení tazatele)**
    *   Vyhledání signifikátoru ve 4 hromádkách zastupujících písmena J-H-V-H.
    *   Hodnotí primární téma otázky (práce, láska, problémy, peníze) a základní příběh.
3.  **Druhá operace (Rozvíjení otázky - Astrologické domy)**
    *   Rozložení do 12 hromádek představujících 12 astrologických domů.
4.  **Třetí operace (Další rozvíjení - Zodiak)**
    *   Rozložení do 12 hromádek podle znamení zodiaku.
5.  **Čtvrtá operace (Předposlední aspekty - 36 dekanátů)**
    *   Tvoření kruhu z 36 karet kolem signifikátoru.
6.  **Pátá operace (Konečný výsledek - Strom života)**
    *   Rozdělení karet do 10 hromádek představujících Sefiroty na Stromu Života.

> [!NOTE]
> U operací OOTK hraje velkou roli ruční vybírání, "čtení v okolí signifikátoru" (Counting & Pairing). Pro webovou aplikaci navrhuji zpočátku vizualizovat rozložení karet a automaticky najít signifikátor.

## Proposed Changes

### Logika výkladů (Logic)

#### [NEW] `src/logic/spreads/types.ts`
Definice TypeScript rozhraní pro výklady (Spreads), typy pozic pro karty (např. jméno pozice, význam pozice, koordinační umístění pro UI grid).

#### [NEW] `src/logic/spreads/fifteenCard.ts`
Implementace logiky pro 15-ti kartový výklad. Funkce vezme zamíchaný balíček a vrátí strukturovaný objekt s 15 pozicemi a příslušnými kartami.

#### [NEW] `src/logic/spreads/operations.ts`
Strukturální příprava pro 5 operací. Vygeneruje stav rozložení (např. 12 hromádek pro druhou operaci) tak, aby to UI mohlo správně vizualizovat.

#### [NEW] `src/logic/spreads/index.ts`
Export všech metod výkladů tak, aby k nim hooks měly snadný přístup.

### Uživatelské rozhraní (UI)

#### [MODIFY] `src/pages/Reading.tsx` (případně vytvoření, pokud ještě neexistuje)
Hlavní stránka pro "Výklad". 
- Přidání výběru typu výkladu (15 karet vs. Operace 1-5).
- Tlačítko pro volbu signifikátoru (případně ho zvolit automaticky / náhodně na základě uživatele).

#### [NEW] `src/components/SpreadLayout.tsx`
Univerzální UI komponenta schopná přijmout definici výkladu (koordináty gridu) a vykreslit karty. U 15-ti kartového výkladu použijeme CSS Grid pro zobrazení centrální karty, kříže a rohových shluků.

#### [MODIFY] `src/hooks/useDeck.ts`
Rozšíření funkce `drawCard` nebo přidání metody `dealSpread`, která dokáže vytáhnout potřebný počet karet pro vybraný spread.

---

## Open Questions

> [!IMPORTANT]
> 1. Chcete, abychom se nyní soustředili **primárně na vytvoření UI a logiky pro 15-ti kartový výklad**, nebo mám připravit UI rovnou pro obrovské rituály (Pět operací), které budou extrémně náročné na zobrazení kvůli velikosti balíčku?
> 2. Přejete si možnost interaktivního "tahání" karet do pozic, nebo se po kliknutí na tlačítko "Vylož" rozloží rovnou celý spread se zakrytými kartami, které se postupně odhalují kliknutím?

## Verification Plan

### Manual Verification
1. Vyberu výklad "15 karet", kliknu na generovat.
2. Ověřím, že UI správně vykreslí 15 pozic a umístění na mobilu umožňuje scrollování a nebo swipe.
3. Překliknu na detail karty a ověřím, že obsahuje Crowleyho extrahovaná data z `src/data/thothTarot.ts`.
