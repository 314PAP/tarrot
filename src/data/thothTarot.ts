export type Suit = 'Major Arcana' | 'Wands' | 'Cups' | 'Swords' | 'Disks';
export type CardType = 'Major' | 'Minor' | 'Court';

export interface TarotCard {
  id: string;
  name: string;
  number?: number;
  suit: Suit;
  type: CardType;
  keywords: string[];
  meaning: string;
  image: string;
}

const majorsData = [
  { name: 'The Fool', number: 0, keywords: ['Původní potenciál', 'Inocence', 'Chaos', 'Začátek'], meaning: 'Blázen (The Fool) v Crowleyho tarotu představuje čistý, neprojevený potenciál a počátek cesty. Je to božský androgyn, duch etheru, který vstupuje do hmoty. Spojován s písmenem Alef a elementem Vzduchu, ztělesňuje tvořivý chaos, svobodu od omezení a obrovskou sílu čisté nevinnosti. V běžném výkladu značí nový začátek, skok do neznáma, originalitu nebo nekonvenční přístup. Karta nabádá, abychom se oprostili od starých vzorců a s důvěrou následovali svou intuici, i když to ostatním může připadat pošetilé.' },
  { name: 'The Magus', number: 1, keywords: ['Komunikace', 'Vůle', 'Zručnost', 'Merkur'], meaning: 'Mág (The Magus) zosobňuje rtuťovitou, dynamickou energii (Merkur) a vědomou vůli zaměřenou na tvorbu. Je to posel bohů, žonglér s nástroji elementů (hůl, pohár, meč, disk), iluzionista a komunikátor. Crowley zdůrazňuje jeho roli jako Toho, kdo přenáší Slovo (Logos) a dává strukturu chaosu. Ve výkladu karta ukazuje na vysokou inteligenci, schopnost komunikace, zručnost, flexibilitu a magickou moc přetvářet realitu podle vlastního záměru. Nabádá k využití veškerého intelektuálního potenciálu a dovedností pro dosažení cíle.' },
  { name: 'The Priestess', number: 2, keywords: ['Intuice', 'Skryté vědění', 'Měsíc'], meaning: 'Velekněžka (The Priestess) je spojena s energií Měsíce, představuje bránu k nevědomí, mysteria, čistou intuici a receptivitu. V thóthově tarotu je to Isis, tkající závoj iluzí, za kterým se skrývá nejvyšší Pravda. Zosobňuje nevinnost na nejvyšší duchovní úrovni, klidnou vodní hladinu odrážející světlo, a tiché, vnitřní vědění. Při výkladu naznačuje, že odpověď nenajdeme skrze logiku, ale nasloucháním svému vnitřnímu hlasu a snům. Je to karta skrytého potenciálu, tajných informací, trpělivosti a ženské polarity v její neprojevené formě.' },
  { name: 'The Empress', number: 3, keywords: ['Láska', 'Krása', 'Plodnost', 'Venuše'], meaning: 'Císařovna (The Empress), ovládaná Venuší, ztělesňuje kosmickou Matku, bezpodmínečnou lásku, tvořivou plodnost a krásu. Je to síla přírody, Alchymická sůl, zrození, výživa a růst ve všech podobách. Karta ukazuje dokonalou harmonii mezi tělem a duší. Ve výkladu přináší období hojnosti, prosperity, tvořivosti a zrození něčeho nového – ať už projektu, vztahu nebo myšlenky. Značí smyslnost, péči o druhé, lásku k přírodě a radost ze života.' },
  { name: 'The Emperor', number: 4, keywords: ['Moc', 'Struktura', 'Autorita', 'Beran'], meaning: 'Císař (The Emperor) pod vládou Berana (ohnivá energie) reprezentuje pevnou strukturu, autoritu, řád, moc a otcovský princip (Alchymická Sýra). Je hybnou silou za zákonem a řízením, která stabilizuje a dává tvar výtvorům Císařovny. Přináší logiku a rozumovou vládu. Ve výkladu znamená stabilitu, kontrolu, upevnění pozice, schopnost vést a organizovat, ale zároveň varuje před přílišnou tvrdostí, dogmatismem nebo tyranií. Karta vybízí k převzetí zodpovědnosti a zavedení pořádku.' },
  { name: 'The Hierophant', number: 5, keywords: ['Vnitřní naslouchání', 'Zjevení', 'Býk'], meaning: 'Velekněz (The Hierophant), spjatý se znamením Býka, je odvěkým vykladačem mystérií, průvodcem, který propojuje makrokosmos s mikrokosmem. V Crowleyho pojetí je nositelem staré Aeonské moudrosti a zasvětitelem, který odhaluje skrytá učení těm, kdo jsou připraveni naslouchat. Ve výkladu znamená duchovního učitele, hledání hlubšího smyslu, osvícení, vnitřní autoritu nebo učení z tradice. Často odkazuje na proces vnitřního zjevení nebo sjednocení zdánlivých protikladů přes vyšší poznání.' },
  { name: 'The Lovers', number: 6, keywords: ['Rozhodnutí', 'Inspirace', 'Blíženci'], meaning: 'Zamilovaní (The Lovers) v Thoth tarotu (Blíženci) přesahují jednoduchý koncept romantické lásky. Karta zobrazuje alchymickou svatbu – sjednocení protikladů (černá a bílá, vědomí a nevědomí) prostřednictvím hluboké volby duše. Představuje analýzu, inspiraci, setkání, ale i nutnost zásadního rozhodnutí, po kterém už není cesty zpět. Ve výkladu hovoří o partnerství, silné přitažlivosti, důležitých životních křižovatkách, dilematech, a potřebě integrovat odlišné části osobnosti pro dosažení vyššího uvědomění.' },
  { name: 'The Chariot', number: 7, keywords: ['Triumf', 'Pohyb', 'Rak'], meaning: 'Vůz (The Chariot), ovládaný Rakem, symbolizuje vůli duše přebývající v posvátném grálu, obklopeném nebeskými strážci. Značí triumf, sebekázeň, spojení sil pod jednotným vedením, dynamický pohyb vpřed, nezastavitelnou sílu a vítězství nad překážkami. V běžném výkladu karta hlásí cestu (fyzickou či duchovní), překonání těžkostí skrze zaměřenou vůli, ambice a kontrolu nad vlastními instinkty. Cíle je dosaženo díky vytrvalosti a správnému nasměrování energie.' },
  { name: 'Adjustment', number: 8, keywords: ['Rovnováha', 'Spravedlnost', 'Karma', 'Váhy'], meaning: 'Vyrovnání (Adjustment), dříve Spravedlnost (Váhy), u Crowleyho znamená neustálý a dynamický proces balancování v pohybu – kosmická karma a příčina-následek. Ženská postava na špičkách meče vyvažuje polaritu vesmíru, kde každá akce vyvolá reakci. Karta ve výkladu označuje nutnost objektivity, jasnosti, spravedlnosti a karmického vyrovnání situace. Znamená, že věci jsou přesně takové, jaké mají z karmického hlediska být, a vybízí nás ke srovnání našich vnitřních vah a vyvážení našeho myšlení.' },
  { name: 'The Hermit', number: 9, keywords: ['Vnitřní světlo', 'Moudrost', 'Panna'], meaning: 'Poustevník (The Hermit), zástupce Panny, symbolizuje zralou moudrost a vnitřní světlo. Nese lucernu ukrývající Slunce a představuje hlubokou introspekci, cestu do vlastního nitra a hledání skryté pravdy, kterou nenajdeme v hlučném světě. V ruce drží hůl tvořivé energie a po jeho boku je trojhlavý pes Kerberos – hlídač podsvětí. Výklad naznačuje potřebu samoty, meditace, ústupu z vnějšího světa pro načerpání síly a zjevení osobní duchovní moudrosti, pochopení sebe sama z hloubky a nalezení vlastního vůdčího světla.' },
  { name: 'Fortune', number: 10, keywords: ['Změna', 'Osud', 'Karma', 'Jupiter'], meaning: 'Kolo štěstí (Fortune) pod záštitou Jupitera reprezentuje nekonečný cyklus změn, osudu a expanze. Tři figurky (Sfinga, Hermanubis a Týfón) rotují na kruhu, čímž naznačují vzestup, zachování a úpadek jako přirozené fáze všeho dění. Nic není trvalé, vše je v pohybu. Ve výkladu znamená šťastný obrat, náhlou změnu událostí, příležitost k růstu, prvek nečekaného nebo pochopení cyklické podstaty našeho života. Ukazuje, že bychom měli využít hybnosti momentu ve svůj prospěch.' },
  { name: 'Lust', number: 11, keywords: ['Vášeň', 'Vitalita', 'Odrazivost', 'Lev'], meaning: 'Chtíč (Lust) / Síla, náležící Lvu, zobrazuje Bohyni Babalon jedoucí na Sedmihlavé šelmě, což představuje extatické spojení pudové zvířecí síly s božskou extází a vůlí. Nejde o ovládnutí šelmy, ale o splynutí s ní, absolutní vášeň pro život a radostnou, divokou tvořivost. Ve výkladu přináší tato karta obrovský příliv energie, odvahu, charisma, smyslnost a vitalitu. Je to pobídka k překonání strachu a k prožití života plnými doušky, přijetí vlastní pudové stránky s láskou a silou.' },
  { name: 'The Hanged Man', number: 12, keywords: ['Odevzdání', 'Oběť', 'Voda'], meaning: 'Viselec (The Hanged Man), karta vodního elementu, představuje oběť ega, uvěznění a hluboké, radikální odevzdání se vesmíru nebo vyššímu principu. Figura visí nohama nahoru, připoutána k Ankhu (kříži života), ve vodách nevědomí, což naznačuje nový úhel pohledu a pasivitu. Ve výkladu ukazuje na situaci, ve které jsme "zaseknuti", staré vzorce chování již nefungují a vynucená pauza si žádá vzdání se kontroly. Oběť je nevyhnutelná pro zisk vyššího, duchovnějšího pohledu na věc.' },
  { name: 'Death', number: 13, keywords: ['Transformace', 'Konec', 'Štír'], meaning: 'Smrt (Death), spojena se Štírem, je v Thoth tarotu kartou mocné, nezvratné transformace. Kostlivec kosí staré formy, zatímco v dolní části karty už klíčí nové bubliny života; je to proces alchymického rozkladu pro novou syntézu (Putrefactio). Tato karta téměř nikdy neznamená fyzickou smrt, nýbrž smrt starého já, konec jednoho cyklu a nutnost odhodit to, co nám již neslouží. Ve výkladu znamená hlubokou změnu, uvolnění, konec závislosti a uvolnění prostoru pro něco zcela nového a životaschopnějšího.' },
  { name: 'Art', number: 14, keywords: ['Alchymie', 'Sloučení', 'Střelec'], meaning: 'Umění (Art) – Crowleyho verze Mírnosti, příslušející Střelci. Je to karta alchymistického sloučení ohně a vody (V.I.T.R.I.O.L.), ztělesnění sjednocení všech protikladů v jeden dokonalý, harmonický celek. Postava je nyní jedním Androgynním celkem (výsledek svatby z karty Milenci). Ve výkladu značí tvořivý proces, rovnováhu skrze integraci, nalezení střední cesty, uměleckou nebo duchovní tvorbu, a hlubokou, vitální proměnu uvnitř nás, kdy z konfliktu vzniká zcela nová kvalita.' },
  { name: 'The Devil', number: 15, keywords: ['Materialismus', 'Pokušení', 'Kozoroh'], meaning: 'Ďábel (The Devil) zastoupený Kozorohem představuje nezřízenou pozemskou a materiální sílu, sexuální energii (Pan), temnotu jako protipól světla a posedlost hmotou. V Thoth tarotu je to úsměvný a mocný Bůh tvořivé hrubé energie. Ve výkladu varuje před připoutaností, závislostmi, dogmatismem, manipulací nebo slepou posedlostí konvencemi a strachem. Zároveň však ukazuje, že veškerá fyzická touha a hmotná realita může být využita pro povznesení duše, pokud není popírána, ale naopak uvědoměna a uvolněna.' },
  { name: 'The Tower', number: 16, keywords: ['Zničení iluzí', 'Náhlá změna', 'Mars'], meaning: 'Věž (The Tower) pod vlivem Marsu znamená mocnou a mnohdy drastickou destrukci všeho falešného, nefunkčního a zastaralého. Oko Šivovo otevírá a ničí starý Aeon, padající figury ztratily své dřívější jistoty. Ve výkladu karta ukazuje na otřesy, šoky, nečekané události, zbourání ega či nefunkčních vztahů a iluzí. Přes bolestivost tohoto procesu je pád Věže nesmírně osvobozující – nabízí možnost postavit nový život na pravdivějších, pevnějších základech, zbavených předchozích lží.' },
  { name: 'The Star', number: 17, keywords: ['Naděje', 'Inspirace', 'Vodnář'], meaning: 'Hvězda (The Star) přináší energii Vodnáře; je zosobněním hvězdné bohyně Nuit, která vlévá do univerza naději, inspiraci a čistou duchovní esenci. Představuje vnitřní jasnost, kosmický klid, hlubokou víru a pochopení vesmírného řádu po bouři z Věže. Ve výkladu znamená uzdravení, vizi budoucnosti, splnění nadějí, sebedůvěru a inspirativní vedení. Jste na správné cestě a vesmír vás podporuje. Naslouchejte své vizi a následujte svou hvězdu s optimismem.' },
  { name: 'The Moon', number: 18, keywords: ['Iluze', 'Podvědomí', 'Ryby'], meaning: 'Měsíc (The Moon) (Ryby) je kartou temné noci duše, oblasti iluzí, strachu z neznáma, halucinací a hlubokého podvědomí plného stínů. Brána je hlídána dvěma bohy (Anubis), mezi kterými vede úzká, snová stezka skrze vody s posvátným skarabem nesoucím nové slunce. Výklad varuje před klamem, sebeklamem, iracionálními obavami a skrytými nepřáteli. Je nutné zachovat odvahu, čelit našim nejhlubším fobiím a probojovat se skrze temnotu, iluze a noční můry až ke skutečnému světlu poznání.' },
  { name: 'The Sun', number: 19, keywords: ['Znovuzrození', 'Slunce', 'Osvícení'], meaning: 'Slunce (The Sun) je samotným zdrojem života, extatickým a čistým světlem, vědomím bez hranic. Karta zobrazuje dvě tančící děti nového Eonu před Sluncem a horou, obklopené znameními zvěrokruhu. Znamená jas, pravdu, vitalitu, absolutní radost, optimismus, slávu a tvořivé uvolnění ze všech omezení. V jakémkoli výkladu je to obrovské „ANO“; přináší osvícení, vyjasnění situace, životní sílu, zdraví a dosažení plného rozkvětu, dětinskou radost a nevinnou svobodu.' },
  { name: 'The Aeon', number: 20, keywords: ['Nový věk', 'Rozhodnutí', 'Oheň'], meaning: 'Aeon (The Aeon), Crowleyho verze Soudu zosobňující element Ohně a Ducha. Zobrazuje vznik nového Věku Hora, božského dítěte. Bůh Hadit a bohyně Nuit vytvářejí prostor pro nové lidstvo; staré zaniklo a nastupuje absolutně nová perspektiva. Ve výkladu se jedná o zúčtování, konečné rozhodnutí s dalekosáhlými následky, přelomovou životní změnu nebo objevení vlastního Pravého Já (Pravé Vůle). Staré způsoby už neplatí a vy jste voláni k novému poslání.' },
  { name: 'The Universe', number: 21, keywords: ['Dokončení', 'Celistvost', 'Saturn'], meaning: 'Vesmír (The Universe), klasický Svět, pod vládou Saturnu a elementu Země. Představuje dokonalé dokončení Velkého Díla, manifestaci, celistvost a absolutní harmonii hmotného a duchovního bytí. Panna tančí se souhvězdím, hlídána čtyřmi bytostmi elementů v rozích kosmu. Ve výkladu znamená dovršení dlouhé cesty, dosažení ultimátního cíle, odměnu za vytrvalost a spojení s veškerenstvem. Označuje plnou seberealizaci a zemi jako stabilní základnu, ze které můžeme opět vykročit k Bláznovi.' }
];

const suits: Suit[] = ['Wands', 'Cups', 'Swords', 'Disks'];
const courtRanks = ['Princess', 'Prince', 'Queen', 'Knight'];
const minorNumbers = [
  { num: 2, names: ['Dominion (Nadvláda)', 'Love (Láska)', 'Peace (Mír)', 'Change (Změna)'] },
  { num: 3, names: ['Virtue (Ctnost)', 'Abundance (Hojnost)', 'Sorrow (Žal)', 'Works (Dílo)'] },
  { num: 4, names: ['Completion (Dokončení)', 'Luxury (Luxus)', 'Truce (Příměří)', 'Power (Moc)'] },
  { num: 5, names: ['Strife (Spor)', 'Disappointment (Zklamání)', 'Defeat (Porážka)', 'Worry (Obavy)'] },
  { num: 6, names: ['Victory (Vítězství)', 'Pleasure (Potěšení)', 'Science (Věda)', 'Success (Úspěch)'] },
  { num: 7, names: ['Valour (Odvaha)', 'Debauch (Nezřízenost)', 'Futility (Marnost)', 'Failure (Selhání)'] },
  { num: 8, names: ['Swiftness (Rychlost)', 'Indolence (Lenost)', 'Interference (Zásah)', 'Prudence (Rozvážnost)'] },
  { num: 9, names: ['Strength (Síla)', 'Happiness (Štěstí)', 'Cruelty (Krutost)', 'Gain (Zisk)'] },
  { num: 10, names: ['Oppression (Útlak)', 'Satiety (Přesycení)', 'Ruin (Zkáza)', 'Wealth (Bohatství)'] }
];

const elementMap: Record<string, {name: string, desc: string}> = {
  'Wands': { name: 'Oheň', desc: 'zastupující energii, vůli, vášeň, dynamiku a tvořivý impuls.' },
  'Cups': { name: 'Voda', desc: 'představující emoce, vztahy, intuici, podvědomí a lásku.' },
  'Swords': { name: 'Vzduch', desc: 'symbolizující mysl, intelekt, logiku, komunikaci a konflikty myšlenek.' },
  'Disks': { name: 'Země', desc: 'související s hmotou, financemi, zdravím, praktičností a realizací v reálném světě.' }
};

const courtDescriptions: Record<string, string> = {
  'Knight': 'Rytíř (Knight) ztělesňuje rychlou a silnou ohnivou část svého elementu. Je to dynamická energie, která žene události kupředu s vášní a někdy až nevyzpytatelně.',
  'Queen': 'Královna (Queen) představuje receptivní vodní část elementu. Proměňuje a udržuje jeho energii uvnitř sebe s hlubokým pochopením, trpělivostí a péčí.',
  'Prince': 'Princ (Prince) je vzdušným aspektem. Využívá intelekt k řízení a usměrňování sil svého elementu, spojuje plány s akcí skrze logiku a komunikaci.',
  'Princess': 'Princezna (Princess) je zemitou částí. Ukotvuje energii elementu do hmatatelné reality a dává vzniknout praktickým a dlouhodobým výsledkům.'
};

const generateDeck = (): TarotCard[] => {
  const deck: TarotCard[] = [];

  // Major Arcana
  majorsData.forEach((card) => {
    deck.push({
      id: `major-${card.number}`,
      name: card.name,
      number: card.number,
      suit: 'Major Arcana',
      type: 'Major',
      keywords: card.keywords,
      meaning: card.meaning,
      image: `https://placehold.co/400x600/1a0b2e/d4af37?text=${card.name.replace(' ', '+')}`
    });
  });

  // Minor Arcana (Aces to 10s & Courts)
  suits.forEach((suit, suitIndex) => {
    const el = elementMap[suit];

    // Ace
    deck.push({
      id: `minor-${suit}-1`,
      name: `Ace of ${suit}`,
      number: 1,
      suit: suit,
      type: 'Minor',
      keywords: ['Esence', 'Zárodek', el.name],
      meaning: `Eso ${suit} (Ace of ${suit}) reprezentuje nejčistší a naprosto primární sílu elementu (${el.name}). Je to semínko nebo kořen, ze kterého vyvěrá veškerá energie projevující se jako ${el.desc} Karta symbolizuje ohromný nevyužitý potenciál, nový start v této oblasti života a neomezovanou tvořivou esenci dané barvy, která čeká na svou realizaci.`,
      image: `https://placehold.co/400x600/1a0b2e/e6c253?text=Ace+of+${suit}`
    });

    // 2-10
    minorNumbers.forEach(item => {
      const cardNameKey = item.names[suitIndex];
      const cardNameSplit = cardNameKey.split(' (');
      const baseName = cardNameSplit[0];
      const czechName = cardNameSplit[1].replace(')', '');
      const cardName = `${baseName} (${item.num} of ${suit})`;

      deck.push({
        id: `minor-${suit}-${item.num}`,
        name: cardName,
        number: item.num,
        suit: suit,
        type: 'Minor',
        keywords: [czechName, baseName, el.name],
        meaning: `Karta ${baseName} čili ${czechName} (${item.num} of ${suit}) nese specifické poselství v rámci živlu ${el.name}. Spojuje číslovku sefiry na Stromu života (která dává energii její numerickou vlastnost) se silou elementu, ${el.desc} Tento aspekt se projevuje dynamicky jako ${czechName.toLowerCase()}, což značí vývojovou fázi v dané problematice. Karta radí věnovat pozornost právě těmto aspektům a pracovat s nimi pro nalezení harmonie.`,
        image: `https://placehold.co/400x600/1a0b2e/e6c253?text=${baseName}`
      });
    });

    // Courts
    courtRanks.forEach(rank => {
      deck.push({
        id: `court-${suit}-${rank}`,
        name: `${rank} of ${suit}`,
        suit: suit,
        type: 'Court',
        keywords: [rank, el.name, 'Osobnost'],
        meaning: `${courtDescriptions[rank]} Ve spojení s elementem (${el.name}), který vládne barvě ${suit}, tato karta ukazuje konkrétní archetyp osobnosti, způsob prožívání nebo konkrétní osobu ve vašem okolí, jež tuto vlastnost manifestuje do reality. Její energie je vázána na to, jakým způsobem se ${el.desc}`,
        image: `https://placehold.co/400x600/1a0b2e/e6c253?text=${rank}+of+${suit}`
      });
    });
  });

  return deck;
};

export const thothTarotDeck = generateDeck();
