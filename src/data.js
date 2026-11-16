/* ===== OBSAH TRENAŽÉRU =====
   Každá otázka (topic) má:
   id, num, group, title, zadani[], osnova[], key[], sections[], quiz[], cards[]
   Položka seznamu může být text, nebo {t:"...", add:1} = doplněno (není ve školních podkladech).
   Sekce: h (nadpis), add (celá doplněná), text, pairs, list, steps (+order:1 = kvíz na pořadí),
          flow {branches:[[...]], join:[...]}, temps [[co, teplota, čas]], faults [[vada, příčina]],
          products [{n, d, list, steps}]
   Kvíz: ["mc", otázka, správně, [špatně...], vysvětlení?] | ["tf", tvrzení, true/false, vysvětlení?]
*/

const GROUPS = [
  { id: "sleh", name: "Šlehané hmoty", short: "Šlehané" },
  { id: "tren", name: "Třené hmoty", short: "Třené" },
  { id: "testa", name: "Tuková a perníková těsta", short: "Těsta" },
  { id: "jadr", name: "Jádrové hmoty", short: "Jádrové" }
];

const ZZK = "Část mléka dáme s cukrem vařit. Do zbytku mléka rozmícháme krémový prášek a žloutky, směs vlijeme do vařícího mléka a za stálého míchání vaříme, až škrob zmazovatí. Hotový ZŽK nalijeme na plech a necháme vystydnout.";

const TOPICS = [
/* ---------------------------------------------------------------- 1 */
{
  id: "1", num: 1, group: "sleh",
  title: "Šlehané hmoty s rychlošlehacím přípravkem",
  zadani: [
    "Charakterizujte hmoty s RŠ přípravkem, vyjmenujte výhody a nevýhody použití RŠ přípravku",
    "Popište postup výroby hmoty",
    "Uveďte výrobky z hmot s RŠ přípravkem"
  ],
  osnova: [
    "Rychlošlehací (RŠ) pasta je emulgační látka – s vejci vytváří objemné, pevné a stálé pěny",
    "Všechny suroviny se šlehají najednou (kromě tuku), jen 3–5 minut místo 30",
    "Výhody: rychlost, hygiena, stabilní hmota (vydrží až 2 hodiny), vláčnější a déle čerstvé korpusy",
    "Nevýhody: hmota je řidší (nejde stříkat), pečení trvá o něco déle, korpusy mají menší objem",
    "Pasta obsahuje cukr a glukózový sirup, emulgátory, modifikované škroby a konzervanty",
    "Výrobky: všechno kromě buflerů a cukrářských piškotů"
  ],
  key: ["šlehání 3–5 min (místo 30 min)", "hmota vydrží 2 hodiny", "tuk až na konec"],
  sections: [
    { h: "Charakteristika", list: [
      "Do šlehané hmoty se přidává RYCHLOŠLEHACÍ PASTA",
      "RŠ pasta je emulgační látka, která má s vejci a ostatními surovinami vysoké šlehací schopnosti",
      "Vytváří objemné, pevné a stálé pěny",
      "Díky ní se může změnit technologie šlehaných i třených hmot"
    ]},
    { h: "Co pasta obsahuje", pairs: [
      ["Cukr a glukózový sirup", "lepší šlehatelnost, jemná sladkost"],
      ["Emulgátory", "umožňují napěnění a stabilizaci"],
      ["Modifikované škroby", "vážou vodu a zpevňují strukturu"],
      ["Konzervační látky", "korpus tolik neplesniví"]
    ]},
    { h: "Výhody", list: [
      "Všechny suroviny se šlehají najednou, kromě tuku",
      "Odpadá nahřívání hmoty při šlehání",
      "Odpadá rozdělování bílků a žloutků a šlehání zvlášť",
      "Doba šlehání se zkracuje ze 30 minut na 3–5 minut",
      "Odpadá ruční smíchávání pěn s moukou",
      "Lepší hygiena práce, hmota je lépe promíchaná",
      "Hmota je stabilnější, snese větší namáhání při dávkování a tvarování",
      "Hmota se nemusí hned péct – může stát až 2 hodiny",
      "Korpusy jsou vláčnější, mají drobné stejnoměrné póry a pomaleji vysychají",
      "Pasta obsahuje konzervační látky, korpus tolik neplesniví"
    ]},
    { h: "Nevýhody", list: [
      "Hmota je řidší, nedá se tvarovat přes sáček (buflery)",
      "Doba pečení se nepatrně prodlužuje",
      "Korpusy mají nepatrně menší objem"
    ]},
    { h: "Technologický postup", order: 1, steps: [
      "Příprava surovin – navážíme vejce (nebo melanž), cukr, mouku, případně vodu",
      "Přidání RŠ pasty – nejčastěji k vejcím a ostatním surovinám ještě před šleháním",
      "Promíchání – krátce při nižších otáčkách, aby se suroviny spojily a mouka neprášila",
      "Šlehání – při vyšších otáčkách do požadovaného objemu, světlé barvy a stabilní konzistence",
      "Dokončení – olej nebo rozpuštěný tuk přidáme až na závěr a krátce zapracujeme"
    ]},
    { h: "Pozor", text: "Přesné pořadí surovin, množství pasty, rychlost a doba šlehání se u jednotlivých past liší. Vždy se řídíme doporučením výrobce." },
    { h: "Vady", faults: [
      ["Světlé tečky na upečeném korpusu", "použili jsme cukr krystal, nestihl se rozpustit"],
      ["Korpus se drobí nebo hmota vytéká z tvořítek", "přešlehaná hmota"],
      ["Vysušený nebo spálený korpus", "dlouhá doba pečení"]
    ]},
    { h: "Výrobky", list: [
      "Kromě buflerů a cukrářských piškotů cokoliv – dortové korpusy, kapslové a roládové pláty, řezy"
    ]},
    { h: "Příklad výrobku – dortový korpus s RŠ pastou", add: 1, steps: [
      "Do kotle dáme vejce, cukr, prosátou mouku, vodu a RŠ pastu podle receptury",
      "Krátce promícháme na nízké otáčky, pak 3–5 minut šleháme na vysoké otáčky",
      "Na závěr krátce zapracujeme olej",
      "Hmotu nalijeme do vymazané a vysypané formy (nebo ráfku s papírem)",
      "Pečeme cca 180 °C podle výšky korpusu, po vychladnutí prokrojíme a plníme krémem"
    ]}
  ],
  quiz: [
    ["mc", "Jak dlouho se šlehá hmota s RŠ pastou?", "3–5 minut", ["30 minut", "10–15 minut", "1 minutu"]],
    ["mc", "Kterou surovinu NEšleháme spolu s ostatními, ale přidáme ji až na konec?", "tuk (olej, rozpuštěný tuk)", ["mouku", "vejce", "cukr"]],
    ["mc", "Jak dlouho může hmota s RŠ pastou stát před pečením?", "až 2 hodiny", ["nesmí stát vůbec", "maximálně 10 minut", "24 hodin"]],
    ["mc", "Které výrobky z hmoty s RŠ pastou NEvyrobíme?", "buflery a cukrářské piškoty", ["dortové korpusy", "roládové pláty", "kapslové korpusy na řezy"], "Hmota je řidší, takže se nedá stříkat sáčkem."],
    ["mc", "Co v RŠ pastě umožňuje napěnění a stabilizaci?", "emulgátory", ["glukózový sirup", "konzervanty", "barviva"]],
    ["mc", "Proč korpus s RŠ pastou tolik neplesniví?", "pasta obsahuje konzervační látky", ["je víc propečený", "neobsahuje vejce", "obsahuje víc mouky"]],
    ["tf", "Hmota s RŠ pastou je hustá, takže se dobře stříká sáčkem.", false, "Je řidší – přes sáček se tvarovat nedá."],
    ["tf", "Při použití RŠ pasty odpadá oddělování bílků a žloutků.", true],
    ["tf", "Korpusy s RŠ pastou mají nepatrně menší objem.", true],
    ["tf", "Při použití RŠ pasty se hmota musí nahřívat na 45 °C.", false, "Nahřívání odpadá – to je jedna z výhod."]
  ],
  cards: [
    ["Co je rychlošlehací pasta?", "Emulgační látka, která s vejci vytváří objemné, pevné a stálé pěny."],
    ["Výhody RŠ pasty (aspoň 4)", "šlehá se vše najednou · bez nahřívání · bez oddělování bílků · 3–5 min místo 30 · hmota vydrží 2 h · vláčnější korpusy"],
    ["Nevýhody RŠ pasty", "řidší hmota (nejde stříkat) · delší pečení · menší objem"],
    ["Co obsahuje RŠ pasta?", "cukr a glukózový sirup, emulgátory, modifikované škroby, konzervanty"],
    ["Čím se řídíme u množství pasty a doby šlehání?", "Doporučením výrobce konkrétní pasty."],
    ["Které výrobky z RŠ hmoty nejdou?", "Buflery a cukrářské piškoty – hmota je moc řídká na stříkání."]
  ]
},
/* ---------------------------------------------------------------- 2 */
{
  id: "2", num: 2, group: "sleh",
  title: "Nahřívaná šlehaná hmota – dortové a kapslové korpusy",
  zadani: [
    "Popište výrobu dortových a kapslových korpusů z NŠH",
    "Uveďte tvarování a pečení dortových a kapslových korpusů",
    "Vyjmenujte a charakterizujte druhy výrobků z dortových a kapslových korpusů"
  ],
  osnova: [
    "NŠH = celá vejce (nebo melanž) s cukrem nahříváme na 45 °C a šleháme do studena",
    "Výhoda: neoddělujeme bílky a žloutky. Nevýhoda: hmota je řídká, nejde stříkat",
    "Proč 45 °C: klesne povrchové napětí → lepší šlehatelnost; nad 45 °C bílkoviny denaturují",
    "Dortové korpusy: vyšší vrstva ve formách nebo ráfcích, po vychladnutí se prokrajují na pláty",
    "Kapslové korpusy: nižší vrstva v kapslích nebo na plechu, krájí se a spojují náplní na řezy",
    "Výrobky: dorty, řezy (punčový řez), rolády"
  ],
  key: ["nahřátí na 45 °C", "nad 45 °C = vaječina", "šlehat do studena"],
  sections: [
    { h: "Dortové a kapslové korpusy", pairs: [
      ["Dortové korpusy", "Hmota se dávkuje do kulatých forem nebo ráfků ve vyšší vrstvě. Vznikne vyšší korpus, který se po vychladnutí prokrajuje na několik plátů a plní krémem nebo náplní."],
      ["Kapslové korpusy", "Hmota se roztírá do kapslí (nízké obdélníkové formy či ráfky) nebo na plech. Vznikají nižší korpusy, které se krájí a spojují náplní na řezy."]
    ]},
    { h: "Charakteristika", list: [
      "Z celých vajec (nebo čerstvé či zmrazené melanže), cukru, hladké pšeničné mouky, tuku a přísad (jádroviny, kakao)",
      "Výhoda: jednoduchá příprava – šleháme celá vejce, bílky od žloutků neoddělujeme",
      "Nevýhoda: hmota je poměrně řídká, nejde tvarovat stříkáním",
      "Z NŠH vyrábíme roládové pláty, korpusy na řezy a dorty"
    ]},
    { h: "Suroviny", pairs: [
      ["Vejce", "slepičí, převážně čerstvá, jde i melanž"],
      ["Cukr", "řepný; granulace ovlivňuje pěnu – hrubý krystal se špatně rozpouští, moučka se rozpouští moc rychle"],
      ["Mouka", "pšeničná hladká, před zamícháním prosejeme (provzdušnění, nečistoty)"],
      ["Chuťové přísady", "citropasta (CP), vanilinový cukr (VC), kakao, jádroviny – ovlivní jen chuť a vůni"],
      ["Voda", "pitná, ovlivňuje hustotu hmoty"],
      ["Tuk", "olej – udržuje korpus vláčný"]
    ]},
    { h: "Technologický postup", order: 1, steps: [
      "Vejce promícháme s cukrem a za stálého míchání nahříváme na 45 °C",
      "Nahřátou hmotu přelijeme do kotle a vyšleháme do studena (nebo nahříváme a šleháme současně)",
      "Přidáme vodu a citropastu, šleháme a nakonec přidáme olej",
      "Vyšlehanou hmotu opatrně smícháme s prosátou moukou"
    ]},
    { h: "Proč se nahřívá na 45 °C", list: [
      "Nahřátím klesne povrchové napětí, které je vysoké kvůli žloutkovému tuku → zlepší se šlehatelnost",
      "Nad 45 °C by bílkoviny začaly denaturovat (vznikla by vaječina)"
    ]},
    { h: "Tvarování a pečení", list: [
      "Dortové: hmotu dávkujeme do vymazaných a vysypaných forem nebo do ráfků, ve vyšší vrstvě",
      { t: "Dortové korpusy pečeme při nižší teplotě déle (zhruba 180–190 °C, 30–40 min podle výšky)", add: 1 },
      "Kapslové: hmotu rovnoměrně roztíráme do kapslí nebo na plech s papírem v nízké vrstvě",
      "Kapslové a plátové korpusy pečeme krátce při vysoké teplotě (např. plát 220 °C asi 6 minut)",
      { t: "Po upečení korpusy necháme vychladnout, neklademe je na sebe horké", add: 1 }
    ]},
    { h: "Vady kapslových plátů", faults: [
      ["Pláty jsou příliš propečené", "dlouhá doba pečení nebo nestejnoměrně rozetřená hmota"],
      ["Pláty jsou tvrdé", "nízká teplota pečení, dlouhé míchání nebo dlouhé roztírání hmoty"],
      ["Vrchní kůrka plátu se odtrhává", "horké pláty byly položené na sebe"]
    ]},
    { h: "Výrobky", products: [
      { n: "Punčový řez", d: "Řezy potažené na horní ploše a bocích fondánovou polevou. Na řezu se střídají vrstvy žlutého a růžového korpusu, marmelády a polevy. Chuť a vůně je punčová.", steps: [
        "Upečeme pláty z NŠH, do jednoho přidáme červené a žluté potravinářské barvivo",
        "Uvaříme cukrový rozvar na nit, necháme vychladnout a přidáme rumový výtažek, kyselinu citronovou, punčové aroma a citronový výtažek",
        "Jeden plát namažeme marmeládou a vložíme do kapslového tvořítka, přiklopíme druhý – oba pláty namočíme v teplém rozvaru",
        "Zatížíme deskou a dáme vychladit",
        "Další den potřeme vrch marmeládou a potáhneme fondánovou polevou (nebo polevou z bílé čokolády) a přestříkáme tmavou CKP"
      ]},
      { n: "Dort podle vlastního výběru", d: "U zkoušky si vyber dort, který jsi sama dělala. Popiš korpus (z jaké hmoty), náplň nebo krém, jak dort skládáš a jak ho dozdobíš." },
      { n: "Druhy výrobků", add: 1, list: [
        "Dorty – vyšší korpus prokrojený na pláty, plněný krémem (máslovým, šlehačkovým, ovocným)",
        "Řezy – kapslové pláty spojené náplní, nakrájené na obdélníky (punčový řez, ovocné řezy)",
        "Rolády – tenký plát potřený náplní a stočený"
      ]}
    ]}
  ],
  quiz: [
    ["mc", "Na kolik °C se nahřívají vejce s cukrem u NŠH?", "45 °C", ["30 °C", "60 °C", "75 °C"]],
    ["mc", "Co se stane, když nahřátá směs přesáhne 45 °C?", "bílkoviny začnou denaturovat (vznikne vaječina)", ["hmota se lépe ušlehá", "cukr zkaramelizuje", "nic, je to v pořádku"]],
    ["mc", "Proč se vaječná směs u NŠH nahřívá?", "klesne povrchové napětí a zlepší se šlehatelnost", ["aby se zničily bakterie", "aby byl korpus tmavší", "aby se rozpustila mouka"]],
    ["mc", "Proč se do šlehaných hmot nehodí hrubý cukr krystal?", "špatně se rozpouští", ["rozpouští se moc rychle", "je moc sladký", "zbarví korpus dohněda"]],
    ["mc", "Jaký je hlavní rozdíl mezi dortovým a kapslovým korpusem?", "dortový je vyšší (forma, ráfek), kapslový nižší (kapsle, plech) na řezy", ["dortový je z jiné hmoty", "kapslový se peče déle", "dortový se nesmí prokrajovat"]],
    ["mc", "Čím je potažen punčový řez?", "fondánovou polevou", ["šlehačkou", "marcipánem", "jen moučkovým cukrem"]],
    ["mc", "Čím se namáčejí pláty punčového řezu?", "teplým cukrovým rozvarem s rumem a punčovým aroma", ["mlékem", "studenou kávou", "čistým rumem"]],
    ["mc", "Proč se do NŠH přidává olej?", "udržuje korpus vláčný", ["aby hmota zhoustla", "zvětšuje objem", "aby korpus zhnědl"]],
    ["tf", "U NŠH šleháme celá vejce, bílky a žloutky neoddělujeme.", true],
    ["tf", "Hmota z NŠH je hustá a dobře se stříká sáčkem.", false, "Je poměrně řídká, stříkat nejde."]
  ],
  cards: [
    ["Jak se připravuje NŠH?", "Celá vejce s cukrem nahřejeme na 45 °C, vyšleháme do studena, přidáme vodu, CP, olej a nakonec opatrně prosátou mouku."],
    ["Proč nahříváme na 45 °C?", "Klesne povrchové napětí (žloutkový tuk) → lepší šlehatelnost. Výš ne – bílkoviny by denaturovaly."],
    ["Dortový × kapslový korpus", "Dortový: vyšší, forma/ráfek, prokrajuje se na pláty. Kapslový: nižší, kapsle/plech, krájí se na řezy."],
    ["Výhoda a nevýhoda NŠH", "Výhoda: neoddělujeme bílky. Nevýhoda: řídká hmota, nejde stříkat."],
    ["Punčový řez – vrstvy", "žlutý a růžový korpus namočený v punčovém rozvaru, marmeláda, fondánová poleva, přestříknuto CKP"],
    ["Proč proséváme mouku?", "Provzdušnění a odstranění nečistot."]
  ]
},
/* ---------------------------------------------------------------- 3 */
{
  id: "3", num: 3, group: "sleh",
  title: "Zvláštní (speciální) šlehané hmoty",
  zadani: [
    "Vyjmenujte druhy ZŠH",
    "Popište postup výroby sněhové hmoty, její tvarování a pečení",
    "Uveďte druhy výrobků ze ZŠH"
  ],
  osnova: [
    "Bílkové nebo žloutkové hmoty s velkým podílem cukru, bez mouky nebo s minimem mouky",
    "Jsou křehké a dlouho trvanlivé (když nenavlhnou)",
    "Druhy: sněhová (pusinky), bezé (štafetky), na vaničky (rakvičky), na laskonky",
    "Sněhová hmota: bílky + cukr (část jako rozvar), stříkáme trubičkou, pečeme 150 °C a dosoušíme 130 °C",
    "Nejčastější vada: řídká hmota – nečisté nebo přešlehané bílky",
    "Výrobky: pusinky, věnečky, štafetky, laskonky, vaničky se šlehačkou"
  ],
  key: ["sněhová 150 → 130 °C", "laskonky 100 → 60 °C", "rozvar 115 °C", "vaničky 180–190 → 120 °C, 45–50 min"],
  sections: [
    { h: "Charakteristika a druhy", list: [
      "Bílkové nebo žloutkové hmoty s větším obsahem cukru, bez mouky nebo s minimálním množstvím",
      "Jsou křehké, mají delší trvanlivost",
      "Sněhová hmota – pusinky",
      "Bezé hmota – štafetky",
      "Hmota na vaničky – rakvičky",
      "Hmota na laskonky"
    ]},
    { h: "Sněhová hmota (pusinky)", text: "Suroviny: bílky, cukr krupice, cukr moučka, vanilin, voda, případně barvivo.",
      flow: { branches: [["bílky + 1/3 cukru krupice", "šlehání"], ["2/3 cukru krupice + voda", "vaření rozvaru"]],
              join: ["došlehání (přilijeme rozvar)", "došlehání s vanilinovým cukrem", "zamíchání cukru moučky", "tvarování", "pečení"] },
      list: [
        "Tvarujeme stříkáním hladkou nebo řezanou trubičkou na pečicí papír",
        "Pečeme zpočátku na 150 °C, dosoušíme na 130 °C",
        "Po dosažení objemu dosoušíme při otevřených tazích / dvířkách",
        "Výrobky: polomáčené, přestříkané CKP, sypané zdobením, pusinky (rozetky), věnečky – jakékoliv tvary",
        "Když nenavlhnou, vydrží dlouho. Hodí se do čajového pečiva nebo jako ozdoba na dorty a řezy"
      ],
      faults: [["Řídká, roztékavá sněhová hmota", "nečisté bílky, přešlehané bílky, málo svařený rozvar (napravit jen částečně – přidat cukr nebo škrob a stříkat malé tvary)"]]
    },
    { h: "Bezé hmota (štafetky)",
      list: [
        "Obsahuje méně cukru než sněhová hmota",
        "Bílky ušleháme s cukrem v pevný sníh a přidáme strouhané jádroviny (kokos) a hladkou mouku",
        "Tvarujeme roztíráním – rychle, protože hmota řídne",
        "Před pečením pláty lehce posypeme moučkovým cukrem – zabrání rychlému úniku páry, pláty jsou vyšší a mají na povrchu krustu"
      ],
      flow: { branches: [["cukr krupice + bílky", "šlehání"], ["jádroviny", "strouhání"], ["mouka hladká", "prosátí"]],
              join: ["ruční zamíchání", "roztírání", "posypání cukrem moučkou", "pečení"] },
      faults: [
        ["Řídká, málo objemná bezé hmota", "nečisté bílky, přešlehané bílky"],
        ["Nízké bezé pláty", "nedokonalé poprášení plátů moučkovým cukrem"],
        ["Zkaramelizované puchýře na plátech", "silný poprašek cukru, vysoká teplota pečení"],
        ["Zvlhlé bezé pláty", "byly na sebe poskládané teplé"],
        ["Bezé korpusy se lámou", "vysoká teplota na začátku pečení"]
      ]
    },
    { h: "Výrobky z bezé – štafetky", products: [
      { n: "Štafetky", d: "Krátké válečky světle hnědé barvy plněné máslovým krémem s kávovou příchutí, okraje máčené v CKP.", steps: [
        "Na vychladlý plát bezé hmoty stejnoměrně rozetřeme kávový krém",
        "Plát rozkrojíme na 3 pásy a každý stočíme jako roládu",
        "Nakrájíme na válečky dlouhé 4 cm (6 cm)",
        "Oba konce válečku namočíme v CKP"
      ]},
      { n: "Kávový krém", steps: [
        "Uvaříme ZŽK a necháme vystydnout",
        "ZŽK vyšleháme s máslem, Herou a instantní kávou"
      ]},
      { n: "CKP (cukrářská kakaová poleva)", d: "Čokoládové čočky rozpustíme a naředíme ZPT." }
    ]},
    { h: "Laskonky", text: "Dva oválky z hmoty na laskonky spojené máslovým kokosovým krémem.",
      flow: { branches: [["bílky + 1/3 cukru krupice", "šlehání"], ["2/3 cukru krupice + voda", "vaření na 115 °C"], ["jádroviny", "strouhání"], ["cukr moučka", "prosátí"]],
              join: ["šlehání (přilijeme rozvar)", "zamíchání jádrovin s cukrem moučkou", "tvarování", "pečení"] },
      steps: [
        "Na plech s pečicí fólií roztíráme hmotu hladkým nožem přes šablonu, šablonu sundáme",
        "Pečeme na 100 °C a dosoušíme na 60 °C",
        "Uvaříme ZŽK a necháme vystydnout",
        "Kokosová pasta: cukr krystal zkaramelizujeme, přisypeme strouhaný kokos, promícháme, dáme na vymazaný plech, necháme vychladnout a pomeleme na jemný prášek",
        "Vychladlý ZŽK šleháme a postupně přidáváme máslo a Heru, do hladkého krému zašleháme kokosovou pastu",
        "Dva vychladlé oválky spojíme kokosovým krémem a povrch jemně přestříkneme CKP"
      ]
    },
    { h: "Hmota na vaničky (rakvičky)",
      list: [
        "Suroviny: žloutky, malé množství bílků (celá vejce), cukr moučka, vanilinový cukr; na vymazání formiček ZPT",
        "Žloutky, cukr a celá vejce vyšleháme do hustší pěny, před došleháním přidáme vanilinový cukr",
        "Hmotu stříkáme sáčkem s hladkou trubičkou asi do poloviny vymazaných formiček",
        "Plech dáme do pece ihned, aby hmota neoschla a nepopraskala",
        "Pečeme 180–190 °C, jakmile hmota zvětší objem, snížíme na 120 °C a dosoušíme; celkem 45–50 minut",
        "Uvnitř vaniček se tvoří dutina – vytváří ji vnitřní pára",
        "Vaničky jsou hygroskopické → skladujeme v suchu",
        "Plní se šlehačkovou náplní → určeny k rychlé spotřebě"
      ],
      faults: [
        ["Vaničky nejdou vyklápět", "nerozpuštěný cukr se přilepil ke dnu formičky"],
        ["Vaničky jsou na povrchu drobivé", "příliš hustá hmota"],
        ["Vaničky se snadno lámou", "příliš vyšlehaná hmota, hodně bílků"],
        ["Popraskané vaničky", "hmota ve formičkách před pečením zaschla"]
      ]
    }
  ],
  quiz: [
    ["mc", "Které hmoty patří mezi zvláštní šlehané hmoty?", "sněhová, bezé, na vaničky, na laskonky", ["terstská a sachrová", "hmota na buflery a s olejem", "linecká a vaflová"]],
    ["mc", "Jak se peče sněhová hmota (pusinky)?", "začínáme na 150 °C, dosoušíme na 130 °C", ["220 °C asi 6 minut", "100 °C a dosoušíme na 60 °C", "180–190 °C a pak 120 °C"]],
    ["mc", "Jak se pečou laskonky?", "100 °C, dosoušíme na 60 °C", ["150 °C, dosoušíme na 130 °C", "200 °C asi 10 minut", "175 °C"]],
    ["mc", "Proč se bezé pláty před pečením posypou moučkovým cukrem?", "zabrání rychlému úniku páry – pláty jsou vyšší a mají krustu", ["aby byly sladší", "aby se nepřilepily k papíru", "aby zhnědly"]],
    ["mc", "Čím jsou plněné štafetky?", "máslovým krémem s kávovou příchutí", ["šlehačkou", "marmeládou", "kokosovým krémem"]],
    ["mc", "Čím se plní vaničky (rakvičky)?", "šlehačkovou náplní", ["kávovým krémem", "marmeládou", "kokosovým krémem"]],
    ["mc", "Na jakou teplotu se vaří rozvar u laskonek?", "115 °C", ["45 °C", "100 °C", "150 °C"]],
    ["mc", "Co vytváří dutinu uvnitř vaniček?", "vnitřní pára", ["kypřicí prášek", "droždí", "vyšlehaný tuk"]],
    ["mc", "Jak se tvaruje bezé hmota?", "roztíráním (rychle, protože řídne)", ["stříkáním řezanou trubičkou", "vykrajováním", "do forem"]],
    ["tf", "Vaničky jsou hygroskopické, proto se skladují v suchu.", true],
    ["tf", "Bezé hmota obsahuje víc cukru než sněhová hmota.", false, "Bezé obsahuje méně cukru."],
    ["tf", "Pusinky dosoušíme při otevřených tazích nebo dvířkách.", true]
  ],
  cards: [
    ["Druhy zvláštních šlehaných hmot", "sněhová (pusinky), bezé (štafetky), na vaničky (rakvičky), na laskonky"],
    ["Sněhová hmota – suroviny", "bílky, cukr krupice, cukr moučka, vanilin, voda, případně barvivo"],
    ["Sněhová hmota – tvarování a pečení", "stříkáme hladkou nebo řezanou trubičkou; 150 °C, dosoušíme 130 °C při otevřených tazích"],
    ["Štafetky – co to je?", "válečky z bezé plátu s kávovým máslovým krémem, konce máčené v CKP, délka 4 (6) cm"],
    ["Laskonky – pečení", "100 °C, dosoušíme 60 °C"],
    ["Kokosová pasta – postup", "zkaramelizovat cukr krystal, přidat kokos, vychladit na vymazaném plechu, pomlít na prášek"],
    ["Vaničky – pečení", "180–190 °C, pak 120 °C dosoušet, celkem 45–50 min"],
    ["Jak se vaří ZŽK?", "Část mléka s cukrem vařit, do zbytku rozmíchat krémový prášek a žloutky, vlít do vařícího mléka a vařit, až škrob zmazovatí."]
  ]
},
/* ---------------------------------------------------------------- 4 */
{
  id: "4", num: 4, group: "sleh",
  title: "Těžké šlehané hmoty",
  zadani: [
    "Charakterizujte těžké šlehané hmoty",
    "Vyjmenujte druhy těžkých šlehaných hmot",
    "Uveďte výrobky z těžkých šlehaných hmot"
  ],
  osnova: [
    "Připravují se studenou cestou, žloutky a bílky se šlehají odděleně",
    "Vysoký podíl tuku (až 25 %) → korpusy zůstávají déle vláčné",
    "Korpusy jsou méně pórovité, pevné, pružné, s drobnými póry, na řezu hladké",
    "Druhy: terstská hmota (bílá, mandlová) a sachrová hmota (kakaová)",
    "Výrobky: Sachrův dort, ořechové kostky",
    "Vady: sražený tuk, nízký korpus s vysokým nebo popraskaným středem"
  ],
  key: ["tuk až 25 %", "terstská 200 °C", "sachr 190–200 °C", "plát na kostky 220–230 °C, 10 min"],
  sections: [
    { h: "Charakteristika", list: [
      "Připravuje se studenou cestou",
      "Obsahuje vysoký podíl tuku – až 25 %",
      "Žloutky a bílky se šlehají odděleně",
      "Pro náročnou přípravu se vyrábí málo",
      "Korpusy si déle udrží vláčnost než ostatní šlehané korpusy (díky tuku)",
      "Jsou méně pórovité, pevné, pružné, s drobnými póry, na řezu hladké",
      "Čím víc cukru a tuku, tím déle se musí péct"
    ]},
    { h: "Druhy a suroviny", pairs: [
      ["Druhy", "TERSTSKÁ + SACHROVÁ hmota"],
      ["Suroviny", "pšeničná mouka hladká i hrubá, cukr krupice, vejce (do terstské jen bílky), margarín, olej, vanilinový cukr, citropasta, jádroviny (terstská), kakao (sachr)"]
    ]},
    { h: "Terstská hmota", text: "Korpus má téměř bílou barvu, je vláčný, středně pórovitý, s jemnou mandlovou chutí.", order: 1, steps: [
      "2/3 bílků šleháme a postupně přidáváme cukr krupici – vyšleháme pevný sníh",
      "V druhém kotli smícháme tuk, cukr moučku, citropastu a vanilinový cukr, přišleháme zbylou 1/3 bílků a přimícháme jemně mleté mandle",
      "Obě hmoty spojíme a přimícháme prosátou hladkou mouku",
      "Pečeme při 200 °C",
      "Ještě teplý korpus poprášíme moukou a obrátíme na plech s čistým papírem"
    ]},
    { h: "Sachrová hmota", text: "Silně kakaová barva, korpusy jsou pórovité, kypré a vláčné. Je opakem terstské hmoty.", order: 1, steps: [
      "Tuk a polovinu cukru našleháme, opatrně přidáváme žloutky",
      "Z bílků a druhé poloviny cukru ušleháme sníh",
      "Smícháme prosáté mouky (hladkou a hrubou) a kakao",
      "Všechny tři směsi – žloutkovou, bílkovou a moučnou – opatrně promícháme",
      "Ihned dávkujeme do forem a pečeme na 190–200 °C",
      "Upečený korpus poprášíme moukou a otočíme na plech s čistým papírem"
    ]},
    { h: "Vady", faults: [
      ["Sražený tuk v těžké šlehané hmotě", "rychlé přilití tuku do žloutků nebo rozdílná teplota surovin"],
      ["Korpus je nízký, střed vysoký, popřípadě popraskaný", "rychlé pečení při vysoké teplotě"]
    ]},
    { h: "Výrobky", products: [
      { n: "Sachrův dort", d: "Původní čokoládový dort s meruňkovou marmeládou a čokoládovou polevou. Jmenuje se podle svého tvůrce a je to jedna z nejznámějších specialit Vídně." },
      { n: "Ořechové kostky", d: "Na řezu: terstský, piškotový, piškotový, terstský korpus spojené ořechovou náplní; horní terstský korpus potažený CKP.", steps: [
        "Upečeme plát z terstské hmoty – 10 minut na 220–230 °C",
        "Upečeme korpus z lehké šlehané hmoty (piškotový)",
        "Krém: uvaříme ZŽK, vychladíme, vyšleháme a přidáme mleté jádroviny a ZPT",
        "Korpusy spojíme 3 vrstvami krému v pořadí terstský – piškotový – piškotový – terstský",
        "Vrchní korpus potáhneme CKP"
      ]}
    ]}
  ],
  quiz: [
    ["mc", "Které hmoty patří mezi těžké šlehané hmoty?", "terstská a sachrová", ["sněhová a bezé", "hmota na buflery", "linecká a vaflová"]],
    ["mc", "Kolik tuku může těžká šlehaná hmota obsahovat?", "až 25 %", ["do 5 %", "až 50 %", "žádný"]],
    ["mc", "Která hmota má téměř bílou barvu a mandlovou chuť?", "terstská", ["sachrová", "bezé", "vaflová"]],
    ["mc", "Jaká vejce se dávají do terstské hmoty?", "jen bílky", ["jen žloutky", "celá vejce", "melanž"]],
    ["mc", "Odkud pochází Sachrův dort?", "z Vídně", ["z Prahy", "z Paříže", "z Budapešti"]],
    ["mc", "V jakém pořadí jdou korpusy v ořechových kostkách?", "terstský – piškotový – piškotový – terstský", ["piškotový – terstský – terstský – piškotový", "terstský – terstský – piškotový – piškotový", "sachr – piškotový – sachr"]],
    ["mc", "Co děláme s upečeným korpusem z těžké šlehané hmoty?", "teplý poprášíme moukou a obrátíme na plech s čistým papírem", ["hned ho prokrojíme", "namočíme v rozvaru", "necháme ho ve formě do druhého dne"]],
    ["mc", "Proč zůstávají korpusy z TŠH déle vláčné?", "mají vysoký obsah tuku", ["obsahují RŠ pastu", "pečou se krátce", "neobsahují mouku"]],
    ["tf", "Čím víc cukru a tuku hmota má, tím kratší dobu se peče.", false, "Naopak – potřebuje péct déle."],
    ["tf", "U těžkých šlehaných hmot se žloutky a bílky šlehají odděleně.", true]
  ],
  cards: [
    ["Těžké šlehané hmoty – charakteristika", "studená cesta, odděleně šlehané žloutky a bílky, tuk až 25 %, korpusy déle vláčné, drobné póry"],
    ["Druhy těžkých šlehaných hmot", "terstská a sachrová"],
    ["Terstská hmota – vzhled", "téměř bílá, vláčná, středně pórovitá, jemně mandlová"],
    ["Sachrová hmota – vzhled", "silně kakaová, pórovitá, kyprá, vláčná"],
    ["Ořechové kostky – vrstvy", "terstský, piškotový, piškotový, terstský + ořechový krém, navrchu CKP"],
    ["Sachrův dort", "čokoládový dort s meruňkovou marmeládou a čokoládovou polevou, Vídeň"]
  ]
},
/* ---------------------------------------------------------------- 22 */
{
  id: "22", num: 22, group: "sleh",
  title: "Nahřívaná šlehaná hmota – plátové korpusy",
  zadani: [
    "Popište výrobu plátových korpusů z NŠH",
    "Uveďte způsoby tvarování a pečení plátových korpusů",
    "Vyjmenujte a charakterizujte druhy výrobků z plátových korpusů"
  ],
  osnova: [
    "Stejná NŠH jako u otázky 2: celá vejce s cukrem nahřejeme na 45 °C a vyšleháme",
    "Výhoda: neoddělujeme bílky. Nevýhoda: řídká hmota, nejde stříkat",
    "Plátové korpusy roztíráme rovnoměrně v tenké vrstvě na plech s pečicím papírem",
    "Pečeme krátce při vysoké teplotě – např. 220 °C asi 6 minut",
    "Používají se hlavně na rolády (kokosová roláda)",
    "Vady: přepečené pláty, tvrdé pláty, odtržená vrchní kůrka"
  ],
  key: ["nahřátí na 45 °C", "plát 220 °C ~6 min", "horké pláty nedávat na sebe"],
  sections: [
    { h: "Charakteristika", list: [
      "Z celých vajec (nebo melanže), cukru, hladké pšeničné mouky, tuku a přísad (jádroviny, kakao)",
      "Výhoda: šleháme celá vejce, bílky od žloutků neoddělujeme",
      "Nevýhoda: hmota je poměrně řídká, nejde tvarovat stříkáním",
      "Plátové korpusy používáme hlavně na rolády"
    ]},
    { h: "Suroviny", pairs: [
      ["Vejce", "slepičí, převážně čerstvá, jde i melanž"],
      ["Cukr", "řepný; hrubý krystal se špatně rozpouští, moučka se rozpouští moc rychle"],
      ["Mouka", "pšeničná hladká, prosátá"],
      ["Chuťové přísady", "CP, VC, kakao, jádroviny – jen chuť a vůně"],
      ["Voda", "ovlivňuje hustotu hmoty"],
      ["Tuk", "olej – vláčnost korpusu"]
    ]},
    { h: "Výroba a pečení plátu", order: 1, steps: [
      "Vejce s cukrem nahřejeme na 45 °C a šleháme",
      "Přidáme vodu a citropastu, dál šleháme a přidáme olej",
      "Vyšlehanou hmotu opatrně smícháme s prosátou moukou",
      "Hmotu rovnoměrně rozetřeme na plech s pečicím papírem",
      "Pečeme v předehřáté troubě na 220 °C asi 6 minut",
      "Necháme vychladnout a stáhneme pečicí papír"
    ]},
    { h: "Vady plátových korpusů", faults: [
      ["Pláty jsou příliš propečené", "dlouhá doba pečení nebo nestejnoměrně rozetřená hmota"],
      ["Pláty jsou tvrdé", "nízká teplota pečení, dlouhé míchání nebo dlouhé roztírání hmoty"],
      ["Vrchní kůrka plátu se odtrhává", "horké pláty byly položené na sebe"]
    ]},
    { h: "Výrobky", products: [
      { n: "Kokosová roláda", steps: [
        "Upečeme plát z NŠH (220 °C, asi 6 minut), vychladíme a stáhneme papír",
        "Uvaříme ZŽK a necháme vystydnout",
        "Kokosová pasta: zkaramelizujeme cukr krystal, přisypeme kokos, vychladíme na vymazaném plechu a pomeleme",
        "Vychladlý ZŽK šleháme, přidáváme máslo a Heru a nakonec zašleháme kokosovou pastu",
        "Korpus potřeme marmeládou a rozetřeme krém (část necháme na dohotovení)",
        "Roládu zatočíme, pomažeme krémem a obalíme strouhaným kokosem",
        "Dáme vychladit do boxu"
      ]},
      { n: "Další rolády", add: 1, list: [
        "Piškotová roláda s marmeládou",
        "Kakaová roláda (kakao v hmotě) s krémem",
        "Ořechová roláda s ořechovým krémem"
      ]}
    ]}
  ],
  quiz: [
    ["mc", "Na co se plátové korpusy z NŠH používají hlavně?", "na rolády", ["na dorty", "na buflery", "na pusinky"]],
    ["mc", "Jak se peče plát na kokosovou roládu?", "220 °C asi 6 minut", ["150 °C asi 30 minut", "180 °C asi 40 minut", "100 °C a dosoušíme na 60 °C"]],
    ["mc", "Čím obalíme hotovou kokosovou roládu?", "strouhaným kokosem", ["moučkovým cukrem", "CKP", "mletými ořechy"]],
    ["mc", "Čím potřeme korpus kokosové rolády ještě před krémem?", "marmeládou", ["rozvarem", "CKP", "šlehačkou"]],
    ["mc", "Jak se plátový korpus tvaruje?", "rovnoměrně se rozetře na plech s papírem", ["stříká se řezanou trubičkou", "dávkuje se do vysoké formy", "vykrajuje se"]],
    ["tf", "Horké pláty můžeme klidně skládat na sebe.", false, "Vrchní kůrka by se odtrhávala."],
    ["tf", "Kokosová pasta se dělá ze zkaramelizovaného cukru a kokosu.", true]
  ],
  cards: [
    ["Plátové korpusy z NŠH – na co?", "hlavně na rolády"],
    ["Tvarování a pečení plátu", "rovnoměrně rozetřít na plech s papírem, 220 °C asi 6 minut"],
    ["Kokosová roláda – postup v kostce", "plát NŠH → marmeláda → kokosový krém (ZŽK + máslo + Hera + kokosová pasta) → zatočit → pomazat krémem → obalit kokosem → vychladit"]
  ]
},
/* ---------------------------------------------------------------- 24 */
{
  id: "24", num: 24, group: "sleh",
  title: "Lehká šlehaná hmota",
  zadani: [
    "Charakterizujte LŠH",
    "Uveďte druhy LŠH a popište jejich postup",
    "Popište výrobky z LŠH"
  ],
  osnova: [
    "Základem je pěna – šlehací metlou vháníme vzduch do vajec, bílků nebo žloutků; čím pevnější pěna, tím lepší korpus",
    "Studená cesta, žloutky a bílky se šlehají odděleně, cukr zpevňuje pěnu",
    "Po upečení velmi pórovité a lehce stravitelné",
    "Druhy: hmota na buflery (bez tuku, stříká se) a LŠH s olejem (dortové korpusy)",
    "Pečení: stříkané výrobky 160–200 °C, 20–25 min při pootevřené peci; dortový korpus 200 °C asi 35 min",
    "Nejčastější vada: ŘÍDNUTÍ hmoty",
    "Výrobky: buflery (špičky, indiánky, modelované brambory, pražské koule), dortové korpusy, cukrářské piškoty"
  ],
  key: ["žloutky + 1/3 cukru, bílky + 2/3 cukru", "stříkané 160–200 °C, 20–25 min", "korpus 200 °C ~35 min", "bílkoviny koagulují 75–85 °C", "škrob → dextrin 100 °C"],
  sections: [
    { h: "Charakteristika", list: [
      "Základem je pěna, která vzniká vháněním vzduchu šlehací metlou do vajec, bílků nebo žloutků",
      "Čím objemnější a pevnější pěna, tím kvalitnější korpus",
      "Při šlehání se přidává cukr, aby byla pěna pevná",
      "Připravuje se studenou cestou, žloutky a bílky se šlehají odděleně",
      "Po upečení velmi pórovité, lehce stravitelné",
      "Může obsahovat přidaný tuk",
      "Používá se na dortové korpusy, buflery a cukrářské piškoty"
    ]},
    { h: "Druhy LŠH", pairs: [
      ["Hmota na buflery", "vejce, cukr, mouka; bez tuku; odděleně šlehané bílky a žloutky; velmi lehká a pórovitá; tvaruje se sáčkem"],
      ["LŠH s přídavkem oleje", "vejce, cukr, mouka + trochu oleje; olej zapracujeme opatrně, aby hmota neztratila objem; korpus je vláčnější a méně vysychá; hlavně dortové korpusy"]
    ]},
    { h: "Suroviny", pairs: [
      ["Vejce", "slepičí, převážně čerstvá, jdou i mražená"],
      ["Cukr", "řepný; hrubý krystal se špatně rozpouští, moučka moc rychle"],
      ["Mouka", "pšeničná hladká, někdy směs hladké a hrubé; prosejeme"],
      ["Škrob", "někdy nahradí část mouky – pšeničný nebo kukuřičný"],
      ["Chuťové přísady", "CP, VC, kakao, jádroviny – jen chuť a vůně"],
      ["Voda", "ovlivňuje hustotu hmoty"]
    ]},
    { h: "Technologické schéma LŠH",
      flow: { branches: [["žloutky + 1/3 cukru", "vypěnění", "řídká pěna"], ["bílky + 2/3 cukru", "šlehání", "tuhá pěna (sníh)"], ["mouka + přísady", "prosátí", "směs"]],
              join: ["spojení pěn → vaječná hmota", "rychlé promíchání s moukou", "lehká šlehaná hmota"] },
      order: 1, steps: [
        "Žloutky s 1/3 cukru vypěníme do řídké pěny",
        "Bílky s 2/3 cukru vyšleháme do tuhé pěny (sníh)",
        "Mouku prosejeme a smícháme s přísadami",
        "Obě pěny spojíme ve vaječnou hmotu",
        "Rychle vmícháme moučnou směs"
      ]
    },
    { h: "Buflery", list: [
      "Polotovary pro další výrobky – špičky, indiánky, modelované brambory, pražské koule",
      "Hmotu na buflery (bez tuku) připravíme podle schématu",
      "Tvarujeme sáčkem s hladkou trubičkou na plech s papírem",
      "Pečeme při pootevřené peci na 160–200 °C asi 20–25 minut"
    ], faults: [
      ["Buflery jsou malé a popraskané", "rychlé zapečení"],
      ["Buflery jsou velké a potrhané", "hodně vody v hmotě"],
      ["Buflery jsou zapadlé a nízké", "hodně páry v peci nebo předčasné otevírání pece"],
      ["Buflery jsou nízké a málo klenuté", "řídká hmota"]
    ]},
    { h: "Pečení LŠH", list: [
      "Nastříkané výrobky: při pootevřené peci, 160–200 °C, asi 20–25 minut",
      "Dortové korpusy: 200 °C asi 35 minut (podle výšky)",
      "Při pečení se odpařuje voda, pára se rozpíná a zvětšuje objem hmoty",
      "Při 75–85 °C koagulují (srážejí se) bílkoviny",
      "Při 100 °C se škrob mění na dextrin"
    ]},
    { h: "Nejčastější vada: ŘÍDNUTÍ", text: "Příčiny řídnutí lehké šlehané hmoty:", list: [
      "Nedostatečná čistota surovin, nástrojů a zařízení",
      "Přešlehání bílků",
      "Násilné míchání hmoty",
      "Dlouhá doba tvarování"
    ]},
    { h: "Dortový korpus – postup", add: 1, steps: [
      "Žloutky s 1/3 cukru vypěníme",
      "Bílky s 2/3 cukru vyšleháme do tuhého sněhu",
      "Pěny spojíme a rychle, zlehka vmícháme prosátou mouku (případně se škrobem)",
      "Nakonec opatrně zapracujeme olej, aby hmota neztratila objem",
      "Dávkujeme do formy s papírem nebo vymazané a vysypané",
      "Pečeme na 200 °C asi 35 minut",
      "Necháme vychladnout (ideálně odležet do druhého dne), pak prokrojíme na pláty"
    ]}
  ],
  quiz: [
    ["mc", "Co je základem lehké šlehané hmoty?", "pěna – vzduch vehnaný do vajec, bílků nebo žloutků", ["tuk utřený s cukrem", "cukerný rozvar", "jádroviny"]],
    ["mc", "Pro jaké výrobky jsou buflery polotovarem?", "špičky, indiánky, modelované brambory, pražské koule", ["štafetky a laskonky", "bábovky a muffiny", "perníky"]],
    ["mc", "Jak se pečou nastříkané výrobky z LŠH?", "při pootevřené peci, 160–200 °C, 20–25 minut", ["220 °C asi 6 minut", "150 °C a dosoušet na 130 °C", "100 °C a dosoušet na 60 °C"]],
    ["mc", "Při jaké teplotě koagulují bílkoviny?", "75–85 °C", ["45 °C", "100 °C", "130 °C"]],
    ["mc", "Co se děje se škrobem při 100 °C?", "mění se na dextrin", ["mazovatí", "karamelizuje", "koaguluje"]],
    ["mc", "Jaká je nejčastější vada LŠH?", "řídnutí hmoty", ["sražený tuk", "spaření", "krystalizace cukru"]],
    ["mc", "Jak se dělí cukr mezi žloutky a bílky?", "žloutky 1/3, bílky 2/3", ["žloutky 2/3, bílky 1/3", "napůl", "všechen cukr do bílků"]],
    ["mc", "Co dělá olej v LŠH?", "korpus je vláčnější a méně vysychá", ["zvětší objem pěny", "zrychlí pečení", "zpevní sníh"]],
    ["tf", "Hmota na buflery obsahuje olej.", false, "Hmota na buflery je bez přidaného tuku."],
    ["tf", "Část mouky v LŠH může nahradit škrob.", true]
  ],
  cards: [
    ["LŠH – charakteristika", "pěna z vajec, studená cesta, odděleně šlehané žloutky a bílky, velmi pórovité, lehce stravitelné"],
    ["Druhy LŠH", "hmota na buflery (bez tuku) a LŠH s přídavkem oleje (dortové korpusy)"],
    ["Buflery – k čemu?", "polotovary pro špičky, indiánky, modelované brambory, pražské koule"],
    ["Pečení LŠH", "stříkané 160–200 °C 20–25 min pootevřená pec; dortový korpus 200 °C ~35 min"],
    ["Co se děje při pečení LŠH?", "voda se odpařuje a pára zvětšuje objem; 75–85 °C koagulace bílkovin; 100 °C škrob → dextrin"],
    ["Příčiny řídnutí LŠH", "nečistota, přešlehané bílky, násilné míchání, dlouhé tvarování"]
  ]
},
/* ---------------------------------------------------------------- 5 */
{
  id: "5", num: 5, group: "tren",
  title: "Třená hmota",
  zadani: [
    "Charakterizujte třenou hmotu a technologický postup",
    "Způsoby tvarování a pečení",
    "Výrobky"
  ],
  osnova: [
    "Šleháme tekuté suroviny (pěna), třeme suroviny tužší konzistence (tuk s cukrem, žloutky)",
    "Víc tuku → výrobky zůstávají déle vláčné; jsou neplněné a pečou se ve formách",
    "Postup: změklý tuk (26 °C) třeme s cukrem do pěny, přiléváme vejce, ručně vmícháme mouku s kypřidlem",
    "Všechny suroviny mají mít 25 °C, jinak se hmota srazí",
    "Formy vymažeme a vysypeme, pečeme 180 °C → 200 °C, 40–60 minut",
    "Vady zpravidla nelze napravit",
    "Výrobky: bábovka, muffiny, biskupský chlebíček"
  ],
  key: ["tuk 26 °C", "suroviny 25 °C", "180 → 200 °C", "40–60 min", "bábovka vydrží 6 dní"],
  sections: [
    { h: "Šlehání × tření", pairs: [
      ["Šlehání", "tekuté suroviny – vytváříme pěny (vháníme co nejvíc vzduchu)"],
      ["Tření", "suroviny tužší konzistence – tuk s cukrem, žloutky"],
      ["Společné", "vháníme vzduch, ten se uzavírá v tuku nebo bílku a hmota zvětšuje objem"]
    ]},
    { h: "Charakteristika", list: [
      "Vyšší podíl tuku → výrobky déle vláčné než šlehané",
      "Výrobky jsou neplněné",
      "Dávkují se a pečou ve formách",
      "Bábovky, muffiny, biskupský chlebíček"
    ]},
    { h: "Suroviny", pairs: [
      ["Tuk", "margarín, máslo – změklý (26 °C)"],
      ["Cukr", "moučkový, prosejeme"],
      ["Vejce", "celá nebo žloutky podle receptury"],
      ["Mouka", "hladká pšeničná, prosejeme a smícháme s kypřicím práškem"],
      ["Proslazené ovoce", "nasekáme a obalíme v mouce, aby neklesalo ke dnu formy"],
      ["Rozinky", "přebereme, propereme, necháme oschnout (můžeme máčet v rumu)"],
      ["Jádroviny", "nasekáme nebo nastrouháme"],
      ["Kakao", "prosejeme"]
    ]},
    { h: "Technologický postup", order: 1, steps: [
      "Mírně nahřátý tuk třeme s cukrem do pěny",
      "Pomalu přiléváme žloutky (vejce) – suroviny musí mít stejnou teplotu (25 °C), jinak se hmota srazí",
      "U některých výrobků přidáme roztok mléka nebo sníh",
      "Ručně vmícháme směs mouky s kypřidlem a přísady",
      "Dávkujeme do vymazaných a vysypaných forem",
      "Pečeme 180 °C, pak zvýšíme na 200 °C"
    ]},
    { h: "Technologické schéma",
      flow: { branches: [["tuk + žloutky + 2/3 cukru", "mírné zahřátí", "tření"], ["bílky + 1/3 cukru", "tuhý sníh"], ["mouka + kypřicí prášek", "prosévání"], ["přísady", "sekání, strouhání"], ["roztok mléka"]],
              join: ["dokonalé promíchání", "tvarování", "pečení"] } },
    { h: "Tvarování a pečení", list: [
      "Dávkujeme do bábovkových, chlebíčkových a jiných forem",
      "Formu předem vymažeme tukem a vysypeme moukou",
      "Vložíme do vyhřáté pece na 180 °C; když hmota nabude po celé ploše, zvýšíme na 200 °C",
      "Doba pečení podle velikosti: 40–60 minut"
    ]},
    { h: "Výhody třených hmot", list: [
      "Rychlá výroba, malé nároky na dohotovení",
      "Dobrá kvalita",
      "Různé chuťové přísady",
      "Různorodé formy",
      "Delší trvanlivost než výrobky ze šlehaných hmot"
    ]},
    { h: "Vady (zpravidla nelze napravit)", faults: [
      ["Sražený korpus", "nedopečený výrobek, nárazy během pečení"],
      ["Popraskaná vrchní kůrka", "vysoká počáteční teplota pečení"],
      ["Málo pórovitý výrobek", "nedostatečně vypěněný tuk s cukrem"],
      ["Deformace při vyklápění", "nedostatečně vymazaná a vysypaná forma"],
      ["Hmota při pečení vytéká z formy", "nadměrné dávkování, předávkované kypřidlo"]
    ]},
    { h: "Výrobky", products: [
      { n: "Bábovka třená", d: "Dozlatova upečená, posypaná moučkovým cukrem (nebo s polevou). Na řezu jemně pórovitá, vaječně žlutá, nedrolivá, vláčná. Chuť jemná, citronová a vanilková. Trvanlivost 6 dní.", steps: [
        "Nahřátý tuk třeme s cukrem",
        "Za stálého šlehání přiléváme roztok vajec a mléka (25 °C)",
        "Přidáme vanilinový cukr a citropastu",
        "Mouku smícháme s kukuřičným škrobem, kypřidlem a rozinkami a ručně zlehka zamícháme",
        "Nalijeme do vymazané a vysypané formy",
        "Pečeme na 180 °C, dopékáme na 200 °C asi 40 minut",
        "Vychladlou vyklopíme, pocukrujeme, případně potáhneme polevou"
      ]},
      { n: "Biskupský chlebíček", d: "Suroviny: hladká mouka, cukr moučka, margarín, vejce, rozinky, kandované ovoce, jádroviny, prdopeč, CKP.", steps: [
        "Tuk třeme s cukrem, přidáme vejce a došleháme",
        "Zlehka zamícháme prosátou mouku s kypřidlem a ostatní přísady",
        "Pečeme v srnčím hřbetu asi na 180 °C",
        "Po vychladnutí vyklopíme, pocukrujeme nebo polijeme CKP"
      ]}
    ]}
  ],
  quiz: [
    ["mc", "Jaký je rozdíl mezi šleháním a třením?", "šleháme tekuté suroviny, třeme tužší (tuk s cukrem)", ["šleháme ručně, třeme strojem", "tření je rychlejší šlehání", "není mezi nimi rozdíl"]],
    ["mc", "Jakou teplotu má mít změklý tuk do třené hmoty?", "26 °C", ["10 °C", "45 °C", "60 °C"]],
    ["mc", "Proč musí mít suroviny třené hmoty stejnou teplotu (25 °C)?", "aby se hmota nesrazila", ["aby se rychleji upekla", "aby byla tmavší", "aby se nemusela prosívat mouka"]],
    ["mc", "Jak se peče třená hmota?", "180 °C, pak zvýšíme na 200 °C, 40–60 min", ["220 °C asi 6 minut", "150 °C a dosoušíme na 130 °C", "100 °C celou dobu"]],
    ["mc", "Proč obalujeme proslazené ovoce v mouce?", "aby neklesalo ke dnu formy", ["aby bylo sladší", "aby se neslepilo s cukrem", "aby nezměklo"]],
    ["mc", "V jaké formě se peče biskupský chlebíček?", "v srnčím hřbetu", ["v bábovkové formě", "v kapsli", "na plechu"]],
    ["mc", "Jakou trvanlivost má třená bábovka?", "6 dní", ["1 den", "2 týdny", "3 měsíce"]],
    ["mc", "Které výrobky jsou z třené hmoty?", "bábovka, muffiny, biskupský chlebíček", ["štafetky a laskonky", "rolády", "vanilkové rohlíčky"]],
    ["tf", "Vady třených hmot se dají snadno napravit.", false, "Zpravidla je napravit nelze."],
    ["tf", "Výrobky z třené hmoty jsou déle vláčné než ze šlehané, protože mají víc tuku.", true]
  ],
  cards: [
    ["Šlehání × tření", "Šleháme tekuté suroviny (pěny). Třeme tužší suroviny – tuk s cukrem, žloutky."],
    ["Třená hmota – postup", "tuk (26 °C) třít s cukrem do pěny → přilévat vejce (25 °C) → ručně vmíchat mouku s kypřidlem → forma → pečení"],
    ["Třená hmota – pečení", "180 °C, po nabytí zvýšit na 200 °C, 40–60 min"],
    ["Výhody třených hmot", "rychlá výroba, málo dohotovení, dobrá kvalita, různé přísady i formy, delší trvanlivost"],
    ["Bábovka – charakteristika", "zlatá, pocukrovaná, jemně pórovitá, vaječně žlutá, vláčná, trvanlivost 6 dní"],
    ["Biskupský chlebíček – forma a dohotovení", "srnčí hřbet; pocukrovat nebo polít CKP"]
  ]
},
/* ---------------------------------------------------------------- 6 */
{
  id: "6", num: 6, group: "tren",
  title: "Třené linecké těsto",
  zadani: [
    "Charakterizujte třené linecké těsto",
    "Popište výběr a úpravu surovin a technologický postup",
    "Uveďte výrobky a jejich dohotovení"
  ],
  osnova: [
    "Stejnorodé, kašovité, světle béžové až nažloutlé těsto s vyšším podílem tuku",
    "Tvarujeme sáčkem s trubičkou (hladkou i řezanou) – hned, protože postupně tuhne",
    "Postup: tuk s moučkovým cukrem vyšleháme, přidáme žloutky, ZŽK a citropastu, nakonec ručně mouku",
    "Optimální teplota 22–25 °C; přehřátý tuk = spaření těsta (nejde napravit)",
    "Pečeme na plechu s papírem na 175 °C",
    "Výrobky: věnečky, růžičky, margaretky, rohlíčky; plníme marmeládou, potahujeme CKP"
  ],
  key: ["22–25 °C", "pečení 175 °C", "kakao/jádroviny = ubrat mouku"],
  sections: [
    { h: "Charakteristika", list: [
      "Stejnorodé, kašovité",
      "Světle béžové až nažloutlé",
      "Vyšší podíl tuku, tvarujeme sáčkem a trubičkou (hladkou i řezanou)",
      "Na trvanlivé korpusy a čajové pečivo",
      "Zpravidla plníme ovocnými náplněmi",
      "Obtížně se zpracovává – postupně tuhne a špatně se tvaruje"
    ]},
    { h: "Výběr a úprava surovin", pairs: [
      ["Mouka", "hladká pšeničná, prosejeme, teplota 22–25 °C"],
      ["Cukr", "moučkový, prosejeme"],
      ["Tuky", "margarín, máslo – pokojová teplota"],
      ["Vejce", "převážně žloutky, pokojová teplota; jde i melanž"],
      ["Přísady", "ZŽK, vanilkový cukr, citropasta nebo citronové aroma, kakao, jemně mleté jádroviny, skořice"]
    ]},
    { h: "Technologický postup", order: 1, steps: [
      "V kotli nahřejeme tuk a vyšleháme ho s prosátým moučkovým cukrem",
      "Přidáme žloutky, hladký ZŽK a citropastu a došleháme do polotuhé hladké konzistence",
      "Nakonec ručně a zlehka vmícháme prosátou mouku stejné teploty",
      "Hotové těsto ihned tvarujeme řezanou trubičkou",
      "Pečeme na plechu s papírem na 175 °C"
    ]},
    { h: "Důležité", list: [
      "Tuk nesmíme přehřát – hrozí spaření",
      "Optimální teplota je 22–25 °C",
      "Když přidáme kakao nebo jádroviny, ubereme stejné množství mouky, aby těsto nebylo tuhé",
      "Přísady smícháme s moukou"
    ]},
    { h: "Vady", faults: [
      ["Spaření třeného lineckého těsta", "příliš nahřátý tuk, studená mouka, práce v chladném prostředí, přešlehaný tuk – nelze odstranit (spařené těsto můžeme po částech přidat do pevných tukových těst)"],
      ["Křehké a drobivé korpusy", "přepečené, vysušené v troubě"]
    ]},
    { h: "Dohotovení", list: ["Plníme marmeládou", "Potahujeme CKP (cukrářská kakaová poleva)"] },
    { h: "Výrobky", products: [
      { n: "Třené věnečky", steps: [
        "Na plech stříkáme řezanou trubičkou věnečky",
        "Po vychladnutí polovinu naplníme a druhou polovinou přiklopíme",
        "Necháme v lednici nejdéle do druhého dne",
        "Potáhneme CKP, případně dozdobíme kokosem"
      ]},
      { n: "Růžičky", steps: [
        "Na plech stříkáme růžičky, za syrova navrch dáme alginát",
        "Pečeme 180 °C",
        "Po vychladnutí spojujeme marmeládou"
      ]},
      { n: "Margaretky", steps: [
        "Z lineckého těsta pár minut zapečeme kolečka",
        "Vytáhneme z pece a navrch řezanou trubičkou stříkáme věnečky z třeného lineckého",
        "Po upečení pocukrujeme a vnitřek věnečků naplníme marmeládou"
      ]},
      { n: "Rohlíčky (banánky, tyčinky)", add: 1, steps: [
        "Řezanou trubičkou stříkáme tvar rohlíčků, banánků nebo tyčinek",
        "Pečeme 175 °C dosvětla",
        "Po vychladnutí spojujeme po dvou marmeládou",
        "Konce máčíme v CKP"
      ]}
    ]}
  ],
  quiz: [
    ["mc", "Jaká je optimální teplota při práci s třeným lineckým těstem?", "22–25 °C", ["10–12 °C", "45 °C", "30–35 °C"]],
    ["mc", "Při jaké teplotě se peče třené linecké?", "175 °C", ["220 °C", "130 °C", "100 °C"]],
    ["mc", "Co uděláme, když do těsta přidáme kakao nebo jádroviny?", "ubereme stejné množství mouky", ["přidáme víc tuku", "přidáme vodu", "nic"]],
    ["mc", "Co se dá udělat se spařeným třeným lineckým těstem?", "po částech ho přidat do pevných tukových těst", ["znovu ho vyšlehat", "přidat studený tuk a opravit", "upéct dvakrát déle"]],
    ["mc", "Jakou trubičkou se třené linecké tvaruje nejčastěji?", "řezanou", ["žádnou, vykrajuje se", "jen hladkou", "roztírá se přes šablonu"]],
    ["mc", "Jak se dělají margaretky?", "zapečená kolečka z lineckého + věneček z třeného lineckého, uprostřed marmeláda", ["dva věnečky spojené krémem", "kornoutek plněný krémem", "rohlíček obalený v cukru"]],
    ["mc", "Co dáváme navrch růžiček ještě za syrova?", "alginát", ["CKP", "kokos", "mandle"]],
    ["tf", "Třené linecké těsto se snadno zpracovává a dlouho drží konzistenci.", false, "Postupně tuhne a špatně se tvaruje – musí se zpracovat hned."],
    ["tf", "Spaření těsta způsobí příliš nahřátý tuk nebo studená mouka.", true]
  ],
  cards: [
    ["Třené linecké – charakteristika", "stejnorodé, kašovité, světle béžové, víc tuku, tvaruje se sáčkem, postupně tuhne"],
    ["Třené linecké – postup", "tuk + moučkový cukr vyšlehat → žloutky, ZŽK, citropasta → ručně mouka → ihned stříkat → 175 °C"],
    ["Spaření těsta – příčiny", "přehřátý tuk, studená mouka, chladné prostředí, přešlehaný tuk"],
    ["Výrobky z třeného lineckého", "věnečky, růžičky, margaretky, rohlíčky (banánky, tyčinky)"]
  ]
},
/* ---------------------------------------------------------------- 7 */
{
  id: "7", num: 7, group: "testa",
  title: "Pevná tuková těsta",
  zadani: [
    "Charakterizujte pevná tuková těsta a jejich rozdělení",
    "Popište suroviny a přípravu lineckého a vaflového těsta",
    "Uveďte výrobky a vady"
  ],
  osnova: [
    "Trvanlivá těsta s velkým množstvím tuku; po odležení elastická, po upečení velmi křehká",
    "Druhy: linecká, vaflová, křehká (vyfouklé), skořicová",
    "Linecké: mouka : tuk : cukr = 3 : 2 : 1, všechny suroviny pokojové teploty",
    "Vaflové: mouka : tuk : cukr : jádroviny = 2 : 2 : 1 : 1, víc tuku díky oleji v jádrovinách",
    "Linecké pečeme 180–200 °C 10–15 min; vaflové 190–220 °C 10–20 min",
    "Hlavní vada: spaření (tání tuku) – nelze napravit",
    "Výrobky: linecké koláčky, košíčky, linecký koláč; vanilkové rohlíčky"
  ],
  key: ["linecké 3 : 2 : 1", "vaflové 2 : 2 : 1 : 1", "linecké 180–200 °C, 10–15 min", "koláčky 190 °C, 6–8 min", "rohlíčky 200 °C, 12 min"],
  sections: [
    { h: "Charakteristika a rozdělení", list: [
      "Mají trvanlivý charakter",
      "Obsahují větší množství tuku (ovlivňuje konzistenci)",
      "Po odležení jsou elastická, po upečení velmi křehká",
      "Druhy: linecká, vaflová, křehká (vyfouklé), skořicová"
    ]},
    { h: "Suroviny", pairs: [
      ["Mouka", "pšeničná hladká"],
      ["Tuk", "margarín, máslo"],
      ["Cukr", "moučka"],
      ["Vejce", "žloutky = křehkost korpusů (občas celé vejce)"],
      ["Kypřidla", "prdopeč, jedlá soda"],
      ["Jádroviny", "mandle, vlašské ořechy, arašídy, lískové ořechy, kokos"],
      ["Dochucovadla", "citropasta, citronová kůra, ovocné pasty, vanilka, skořice, kakao"]
    ]},
    { h: "Vady pevných tukových těst", faults: [
      ["Spaření těsta – těsto praská", "tání tuku, dlouhé ruční zpracovávání"],
      ["Výrobek je tvrdý, chutná po syrové mouce", "hodně mouky, přepečený nebo nedopečený výrobek, špatné skladování"]
    ]},
    { h: "Linecké těsto", list: [
      "Světle žluté (bez skvrn a teček), stejnorodé, delší trvanlivost, dobře se vyvaluje",
      "Suroviny: hladká mouka, moučkový cukr, pevný tuk (nakrájený nebo nastrouhaný), žloutky, citropasta, vanilin, případně kakao",
      "Poměr mouka : tuk : cukr = 3 : 2 : 1",
      "Všechny suroviny mají mít stejnou (pokojovou) teplotu"
    ]},
    { h: "Linecké těsto – příprava a pečení", order: 1, steps: [
      "Prosejeme mouku, uděláme důlek a přidáme prosátý cukr",
      "V důlku spojíme vejce, strouhaný tuk, cukr a citropastu",
      "Postupně přibíráme mouku",
      "Nelepivé těsto necháme odležet",
      "Tvarujeme – vypichujeme, vymačkáváme do forem nebo pečeme celé pláty",
      "Pečeme 180–200 °C 10–15 minut (do růžova)",
      "Necháme 5 minut vychladnout, aby ztuhly a nedeformovaly se"
    ]},
    { h: "Linecké – dohotovení, výrobky, vady", list: [
      "Plníme marmeládou nebo máslovými krémy, potahujeme CKP, sypeme moučkovým cukrem nebo jádrovinami",
      "Výrobky: linecké koláčky, košíčky s ořechovou náplní nebo s ovocem, řezy, linecký mřížkový koláč",
      "Vady (nelze napravit): spaření – tuk taje, mouka ho pohltí a těsto ztratí elastičnost",
      "Při vyvalování praská, při pečení z něj vytéká tuk, výrobky nedrží tvar (nízké a tvrdé)"
    ]},
    { h: "Linecké koláčky", products: [
      { n: "Linecké koláčky", d: "Trvanlivější výrobek doplněný ovocnou náplní – kolečka, kytičky, srdíčka, čtyřlístky.", steps: [
        "Vyválíme plát a vykrajujeme tvary – polovinu plných, polovinu s vykrojeným středem",
        "Pečeme 190 °C 6–8 minut",
        "Necháme zchladnout",
        "Marmeládu natřeme jen na plné tvary",
        "Přiklopíme tvary s vykrojeným středem (už posypané cukrem)"
      ]}
    ]},
    { h: "Vaflové těsto", list: [
      "Světle šedé s kousky jádrovin, chuť a vůně po jádrovinách",
      "Podobá se lineckému, ale má víc tuku – o olej obsažený v jádrovinách (výrobky jsou křehčí)",
      "Suroviny: hladká mouka, margarín, cukr moučka, mleté jádroviny, vejce, vanilin, mletá skořice",
      "Poměr mouka : tuk : cukr : jádroviny = 2 : 2 : 1 : 1",
      "Příprava: nakrájený tuk spojíme s vejci a moučkovým cukrem, přidáme jádroviny a mouku, rychle vypracujeme (v chladu), necháme odležet v lednici",
      "Tvarujeme vykrajováním nebo ručně",
      "Pečeme 190–220 °C podle výrobku, 10–20 minut",
      "Dohotovení: obalujeme v moučkovém cukru nebo potahujeme polevou",
      "Vada: spaření těsta"
    ]},
    { h: "Vanilkové rohlíčky", products: [
      { n: "Vanilkové rohlíčky", d: "Trvanlivější výrobek s chutí a vůní pražených jádrovin, po upečení křehký.", steps: [
        "Vaflové těsto rozdělíme na dílky a tvarujeme rohlíčky",
        "Pečeme asi 12 minut při 200 °C",
        "Ještě vlažné obalujeme ve směsi moučkového a vanilinového cukru"
      ]}
    ]}
  ],
  quiz: [
    ["mc", "Jaký je poměr mouka : tuk : cukr u lineckého těsta?", "3 : 2 : 1", ["2 : 2 : 1", "1 : 2 : 3", "3 : 1 : 2"]],
    ["mc", "Jaký je poměr mouka : tuk : cukr : jádroviny u vaflového těsta?", "2 : 2 : 1 : 1", ["3 : 2 : 1 : 1", "1 : 1 : 1 : 1", "2 : 1 : 2 : 1"]],
    ["mc", "Proč má vaflové těsto víc tuku než linecké?", "o olej obsažený v jádrovinách", ["dává se do něj olej", "používá se máslo místo margarínu", "obsahuje víc žloutků"]],
    ["mc", "Co dodávají žloutky pevným tukovým těstům?", "křehkost korpusů", ["tmavou barvu", "objem", "tvrdost"]],
    ["mc", "Co je spaření těsta?", "tání tuku – těsto praská a ztrácí elastičnost", ["připálení na plechu", "krystalizace cukru", "kvašení těsta"]],
    ["mc", "Jak se pečou linecké koláčky?", "190 °C 6–8 minut", ["220 °C 6 minut", "175 °C 20 minut", "150 °C 15 minut"]],
    ["mc", "Kdy obalujeme vanilkové rohlíčky v cukru?", "ještě vlažné", ["úplně vychladlé druhý den", "před pečením", "horké hned z pece"]],
    ["mc", "Jakou barvu má vaflové těsto?", "světle šedou s kousky jádrovin", ["světle žlutou bez teček", "kakaově hnědou", "bílou"]],
    ["mc", "Které těsto NEpatří mezi pevná tuková těsta?", "třené linecké", ["linecké", "vaflové", "skořicové"]],
    ["tf", "Po upečení necháme linecké výrobky 5 minut vychladnout, aby ztuhly a nedeformovaly se.", true],
    ["tf", "Vady lineckého těsta se dají snadno napravit.", false, "Tyto vady napravit nelze."]
  ],
  cards: [
    ["Pevná tuková těsta – charakteristika", "trvanlivá, hodně tuku, po odležení elastická, po upečení křehká"],
    ["Druhy pevných tukových těst", "linecká, vaflová, křehká (vyfouklé), skořicová"],
    ["Linecké těsto – poměr", "mouka : tuk : cukr = 3 : 2 : 1"],
    ["Vaflové těsto – poměr", "mouka : tuk : cukr : jádroviny = 2 : 2 : 1 : 1"],
    ["Linecké – příprava", "mouka s důlkem, do důlku vejce, strouhaný tuk, cukr, CP → přibírat mouku → odležet"],
    ["Vanilkové rohlíčky", "vaflové těsto, 200 °C ~12 min, vlažné obalit v moučkovém a vanilinovém cukru"]
  ]
},
/* ---------------------------------------------------------------- 13 */
{
  id: "13", num: 13, group: "testa",
  title: "Perníkové (medové) těsto",
  zadani: [
    "Charakterizujte medové těsto a jeho suroviny",
    "Popište výrobu medového těsta, tvarování a pečení",
    "Uveďte vady a konečnou úpravu výrobků"
  ],
  osnova: [
    "Jedno z nejstarších sladkých pečiv v českých zemích; první perníkáři – „cáletníci“ – v Praze u Staroměstského náměstí",
    "Cukr je ve formě rozvaru (70–75 %) – bez inverze by krystalizoval a těsto by ztvrdlo",
    "Inverze = štěpení cukru na glukózu a fruktózu pomocí kyseliny; kyselinu pak neutralizujeme jedlou sodou",
    "Postup: rozvar → inverze → neutralizace → med, džem → vejce, mouka, koření, kypřidlo → odležení 2–5 dní",
    "Plát 5–10 mm, před pečením potřeme vejcem; malé tvary 200 °C 7 minut",
    "Zdobíme bílkovou polevou, CKP, plníme ovocnými náplněmi"
  ],
  key: ["rozvar 70–75 %", "var 112,5 °C", "med 70–80 % invertního cukru", "odležení 2–5 dní", "plát 5–10 mm"],
  sections: [
    { h: "Historie", text: "Výrobky z medového (perníkového) těsta patří mezi nejstarší sladké pečivo v českých zemích. První perníkáři se nazývali „cáletníci“ a usazovali se v Praze okolo Staroměstského náměstí." },
    { h: "Suroviny", pairs: [
      ["Mouka", "pšeničná hladká se střední tažností, pružností a pevností lepku; někdy i žitná – lepší aroma, vláčnost, méně vysychá (korpusy nižší s malými póry)"],
      ["Cukr", "jako cukerný rozvar 70–75 %; po přidání mouky by krystalizoval → tvrdé těsto → nutná INVERZE"],
      ["Kyselina", "citronová, vinná – provádí inverzi"],
      ["Hydrogenuhličitan sodný", "neutralizuje kyselinu (jinak by invertní cukr narušovala)"],
      ["Včelí med", "původně jediné sladidlo; 70–80 % invertního cukru; nejlepší tmavý (zbarví těsto)"],
      ["Koření", "skořice, hřebíček, fenykl, muškátový květ, koriandr, nové koření, kardamon, anýz – jemně mleté, nejlépe hotová „Směs koření do perníku“"],
      ["Kypřidla", "dříve žádná, dnes jedlá soda a amonium (čpavek)"],
      ["Tuk", "jen v některých recepturách (rozpuštěné máslo, margarín)"],
      ["Džem", "chuť a vláčnost"],
      ["Vejce", "celá, případně navíc žloutky"]
    ]},
    { h: "Inverze cukru", text: "Inverze je štěpení cukru na fruktózu a glukózu. Roztok po inverzi už nekrystalizuje, je vláčný a sirupovitý. V praxi se provádí kyselinou." },
    { h: "Výroba medového těsta", order: 1, steps: [
      "Z části vody a cukru připravíme rozvar",
      "Přidáme kyselinu a provedeme inverzi (do citronově žluté barvy)",
      "Přidáme jedlou sodu – kyselinu neutralizujeme",
      "Do teplého rozvaru přidáme med a džem",
      "Do hladké směsi přidáme vejce, mouku, koření a kypřidlo",
      "Důkladně promícháme a necháme odležet 2–5 dní"
    ]},
    { h: "Výrobní schéma",
      flow: { branches: [["cukr krupice + voda", "var na 112,5 °C", "+ kyselina → inverze", "+ NaHCO₃ → neutralizace"], ["tavený cukr", "kulér (barvivo)"], ["med, džem, vejce"], ["mouka + koření", "několikanásobné prosátí"]],
              join: ["zamíchání", "důkladné promíchání", "odležení"] } },
    { h: "Proč odležení", text: "Při odležení se všechny suroviny dokonale prolnou. Správné odležení ovlivní vzhled, strukturu i chuť perníku – nejlépe 2–5 dní." },
    { h: "Vyvalování a tvarování", list: [
      "Na pláty je lepší vyvalovací stroj, u menších dávek váleček",
      "Plát má mít 5–10 mm",
      "Tvary vypichujeme nebo řežeme",
      "Pokládáme na vymazaný plech nebo pečicí papír, ometeme přebytečnou mouku",
      "Před pečením potíráme rozmíchaným vejcem"
    ]},
    { h: "Pečení", temps: [
      ["Malé tvary", "200 °C", "7 min"],
      ["Střední tvary", "180 °C", "18 min"],
      ["Velké tvary", "170–180 °C", "19–20 min"],
      ["Pláty", "170–180 °C", "10 min"]
    ]},
    { h: "Vady", faults: [
      ["Nízký perníkový korpus", "málo kypřidla"],
      ["Perník se rychle zvedne a rychle klesne", "hodně kypřidla, nízká teplota v peci"],
      ["Rozpékání perníku", "řídké nebo zkvašené těsto"],
      ["Puchýře na povrchu perníku", "špatně rozpuštěné kypřidlo, neodleželé těsto, vysoká teplota, potírání našlehaným vejcem"]
    ]},
    { h: "Konečná úprava", list: [
      "Plníme a spojujeme ovocnými náplněmi",
      "Zdobíme citrusovou kůrou, kandovaným ovocem, ořechy",
      "Potahujeme a zdobíme bílkovou polevou, CKP, potravinářskými barvivy"
    ]}
  ],
  quiz: [
    ["mc", "Co je inverze cukru?", "štěpení cukru na glukózu a fruktózu", ["rozpuštění cukru ve vodě", "zkaramelizování cukru", "krystalizace cukru"]],
    ["mc", "Čím se inverze cukru v praxi provádí?", "kyselinou (citronovou, vinnou)", ["jedlou sodou", "medem", "vařením bez přísad"]],
    ["mc", "Proč se kyselina po inverzi neutralizuje?", "při delším působení by invertní cukr narušovala", ["aby těsto bylo kyselejší", "aby se těsto rychleji upeklo", "aby se zvýšil objem"]],
    ["mc", "Čím neutralizujeme kyselinu?", "hydrogenuhličitanem sodným (jedlou sodou)", ["octem", "medem", "amoniem"]],
    ["mc", "Jak dlouho má medové těsto odležet?", "2–5 dní", ["30 minut", "2–5 hodin", "2 týdny"]],
    ["mc", "Kdo byli „cáletníci“?", "první perníkáři v Praze", ["cukráři z Vídně", "pekaři chleba", "obchodníci s medem"]],
    ["mc", "Kolik invertního cukru obsahuje med?", "70–80 %", ["10–20 %", "40–50 %", "100 %"]],
    ["mc", "Jaký med je do perníku nejlepší?", "tmavý – zbarví těsto", ["světlý pastovaný", "akátový", "na druhu nezáleží"]],
    ["mc", "Jak vysoký má být plát perníkového těsta?", "5–10 mm", ["1–2 mm", "15–20 mm", "3 cm"]],
    ["mc", "Co dělá žitná mouka v perníku?", "zlepší aroma a vláčnost, méně vysychá", ["zvětší objem", "zesvětlí těsto", "zrychlí odležení"]],
    ["mc", "Jak se pečou malé perníkové tvary?", "200 °C 7 minut", ["170 °C 20 minut", "150 °C 30 minut", "220 °C 2 minuty"]],
    ["mc", "Jaká kypřidla se dnes dávají do perníku?", "jedlá soda a amonium", ["droždí", "jen kypřicí prášek", "žádná"]],
    ["tf", "Před pečením perníky potíráme rozmíchaným vejcem.", true],
    ["tf", "Inverzní cukerný roztok snadno krystalizuje.", false, "Naopak – po inverzi už nekrystalizuje, je vláčný a sirupovitý."]
  ],
  cards: [
    ["Co je inverze cukru a proč se dělá?", "Štěpení cukru na glukózu a fruktózu kyselinou. Jinak by rozvar po přidání mouky krystalizoval a těsto by ztvrdlo."],
    ["Výroba medového těsta (kroky)", "rozvar → kyselina (inverze) → jedlá soda (neutralizace) → med, džem → vejce, mouka, koření, kypřidlo → odležení 2–5 dní"],
    ["Cáletníci", "první perníkáři, Praha u Staroměstského náměstí"],
    ["Koření do perníku", "skořice, hřebíček, fenykl, muškátový květ, koriandr, nové koření, kardamon, anýz"],
    ["Pečení perníku", "malé 200 °C 7 min · střední 180 °C 18 min · velké 170–180 °C 19–20 min · pláty 170–180 °C 10 min"],
    ["Co je kulér?", "barvivo z taveného (zkaramelizovaného) cukru – zbarví těsto"]
  ]
},
/* ---------------------------------------------------------------- 9 */
{
  id: "9", num: 9, group: "jadr",
  title: "Jádrové hmoty",
  zadani: [
    "Charakterizujte jádrové hmoty a jejich rozdělení",
    "Popište suroviny a přípravu jádrovin",
    "Popište výrobu výrobků z jádrových hmot"
  ],
  osnova: [
    "Základem jsou jádroviny (ořechy, mandle, arašídy, kokos) + bílky + cukr",
    "Výrobky: na povrchu křehké, uvnitř vláčné, mírně klenuté, zlatohnědé, jemně popraskané",
    "Druhy: kornoutky, kokosky, marokánky, makronky, pařížské rohlíčky",
    "Kokosky: sníh nahřát na 60 °C, pečeme 160 °C 7 min a dopékáme 130 °C 13 min",
    "Makronky: sníh + mandlová mouka, nechat zaschnout, 150 °C 12–15 min",
    "Marokánky: uvaříme hustou směs, pečeme 220 °C 15 min, spodek CKP s vlnovkou",
    "Použití: zákusky, čajové pečivo, kombinace s jinými těsty"
  ],
  key: ["kokosky 60 °C → 160 °C 7 min → 130 °C 13 min", "kornoutky 180 °C 7–10 min", "pař. rohlíčky 140 → 160 °C", "marokánky 220 °C 15 min", "makronky 150 °C 12–15 min"],
  sections: [
    { h: "Charakteristika", list: [
      "Základem jsou JÁDROVINY",
      "Výrobky jsou na povrchu křehké, uvnitř vláčné, mírně klenuté, zlatohnědé, s jemně popraskaným povrchem",
      "Použití: kusové cukrářské výrobky (zákusky), čajové pečivo, kombinace s jinými cukrářskými těsty"
    ]},
    { h: "Rozdělení", list: [
      "Hmota na jádrové / ovocné kornoutky",
      "Hmota na kokosky",
      "Hmota na marokánky",
      "Hmota na makronky (mandlová mouka)",
      "Hmota na pařížské rohlíčky"
    ]},
    { h: "Suroviny a příprava jádrovin", list: [
      "Cukr krupice, jádroviny (vlašské a lískové ořechy, arašídy, kokos), bílky, pšeničná mouka hladká",
      "Jádroviny: odstraníme skořápky a slupky, můžeme opražit"
    ]},
    { h: "Kokosky", order: 1, steps: [
      "Bílky s cukrem šleháme do pevného sněhu a nahřejeme na 60 °C",
      "Přidáme jemně umletý kokos a marmeládu a promícháme",
      "Vychladlou hmotu stříkáme na plech s pečicím papírem a necháme zaschnout",
      "Pečeme 160 °C 7 minut, dopékáme 130 °C 13 minut"
    ], products: [
      { n: "Kokoska na lineckém kolečku", steps: [
        "Z plátu lineckého těsta vypícháme kolečka a upečeme",
        "Po obvodu kolečka nastříkáme kakaový máslový krém",
        "Doprostřed dáme jahodový džem a přiložíme vychladlou kokosku",
        "Po ztuhnutí výrobek zespodu namáčíme v CKP"
      ]},
      { n: "Kakaový máslový krém", add: 1, d: "Vychladlý ZŽK vyšleháme s máslem (a Herou) a přidáme kakao." }
    ]},
    { h: "Jádrové kornoutky", steps: [
      "Bílky šleháme a postupně přidáváme cukr – pevný sníh",
      "Opatrně vmícháme hladkou mouku s jemně strouhanými jádrovinami (arašídy, vlašské ořechy)",
      "Roztíráme přes šablonu na vymazané a vysypané plechy",
      "Pečeme 180 °C 7–10 minut",
      "Za horka stáčíme na dřevěné kužely do tvaru kornoutků"
    ], products: [
      { n: "Ovocný krém do kornoutků", steps: [
        "Bílky smícháme s ovocným protlakem a ušleháme pěnu",
        "Přidáme asi 1/3 cukru a důkladně vyšleháme",
        "Pomalu přiléváme cukrový rozvar (115 °C)",
        "Zpomalíme, obarvíme barvivem, přidáme kyselinu citronovou a došleháme",
        "Kornoutky plníme vlažným krémem, po ztuhnutí potáhneme kraje a viditelnou náplň CKP"
      ]}
    ]},
    { h: "Pařížské rohlíčky", steps: [
      "Polovinu bílků smícháme s cukrem, sójovým pudrem, mletými arašídy a citropastou a pomeleme v mlýnku",
      "Ve šlehači mícháme lopatou a postupně přidáváme druhou polovinu bílků",
      "Hmotu necháme odležet v lednici asi 24 hodin",
      "Na papír narýsujeme 6 cm linky, hmotu doředíme vodou a stříkáme hladkou trubičkou č. 10",
      "Necháme půl hodiny oschnout",
      "Pečeme 140 °C 10 minut a dopékáme 160 °C dalších 10 minut"
    ]},
    { h: "Marokánky a florentýnky", steps: [
      "Cukr, hrubě sekané arašídy, proslazenou pomerančovou kůru, proslazené ovoce, margarín, mléko a škrobový sirup uvaříme na hustou směs",
      "Zamícháme prosátou hladkou mouku",
      "Po prochladnutí nanášíme hromádky na fólii a prsty tvarujeme tenké placičky (nebo druhý den válíme prameny, krájíme a mačkáme kuličky)",
      "Pečeme 220 °C 15 minut, před dopečením upravíme tvar hranou tvořítka",
      "Za tepla sundáme z plechu",
      "Spodek potřeme CKP a rýhovanou kartou uděláme vlnovku"
    ], note: "Florentýnky jsou obdobou marokánek – místo toho se dělají ze smetany, medu, másla, mandlí, cukru a pomerančové kůry." },
    { h: "Makronky", text: "Dva korpusy – navrchu křupavé, uvnitř mírně vlhké, rozplývající se na jazyku – spojené nejčastěji máslovým krémem. Barví se potravinářskými barvivy. Suroviny: jemně mleté mandle, cukr moučka, cukr krupice, bílky, barvivo.", steps: [
      "Vyšleháme sníh a nakonec vmícháme jemnou mandlovou mouku",
      "Hmotu dáme do sáčku s hladkou trubičkou a stříkáme kroužky 3–4 cm na papír nebo silikonovou podložku",
      "Poklepeme plechem o stůl, aby vyprchal vzduch",
      "Necháme zaschnout 30–60 minut, povrch má být suchý na dotek",
      "Pečeme 150 °C (horkovzduch 130–140 °C) 12–15 minut",
      "Necháme vychladnout a teprve pak sundáme z plechu"
    ]}
  ],
  quiz: [
    ["mc", "Co je základem jádrových hmot?", "jádroviny (ořechy, mandle, arašídy, kokos)", ["tuk utřený s cukrem", "medový rozvar", "celá vejce nahřátá na 45 °C"]],
    ["mc", "Na kolik °C nahříváme sníh u kokosek?", "60 °C", ["45 °C", "100 °C", "115 °C"]],
    ["mc", "Jak se pečou kokosky?", "160 °C 7 min, dopékáme 130 °C 13 min", ["220 °C 15 min", "100 °C a dosoušíme na 60 °C", "180 °C 7–10 min"]],
    ["mc", "Jak získají jádrové kornoutky svůj tvar?", "za horka se stáčejí na dřevěné kužely", ["pečou se v kornoutkových formách", "stříkají se sáčkem", "vykrajují se"]],
    ["mc", "Proč po nastříkání makronek poklepeme plechem o stůl?", "aby vyprchal vzduch", ["aby se rozlily do placky", "aby se nepřilepily", "aby rychleji zaschly"]],
    ["mc", "Jaké mají být makronky?", "navrchu křupavé, uvnitř mírně vlhké", ["tvrdé a suché skrz naskrz", "měkké jako piškot", "křehké a drobivé"]],
    ["mc", "Čím se liší florentýnky od marokánek?", "smetana, med, máslo, mandle a pomerančová kůra", ["pečou se při 100 °C", "obsahují kakao", "jsou z lineckého těsta"]],
    ["mc", "Jak dlouho odleží hmota na pařížské rohlíčky?", "asi 24 hodin v lednici", ["2–5 dní", "30 minut", "vůbec"]],
    ["mc", "Jak se upravuje spodek marokánek?", "CKP a rýhovanou kartou vlnovka", ["obalí se v cukru", "namočí se v rozvaru", "posype se kokosem"]],
    ["mc", "Jak se pečou marokánky?", "220 °C 15 minut", ["150 °C 12–15 minut", "140 °C a pak 160 °C", "100 °C celou noc"]],
    ["tf", "Makronky sundáváme z plechu hned teplé.", false, "Nejdřív je necháme vychladnout."],
    ["tf", "Jádroviny zbavíme skořápek a slupek a můžeme je opražit.", true]
  ],
  cards: [
    ["Jádrové hmoty – druhy", "kornoutky, kokosky, marokánky, makronky, pařížské rohlíčky"],
    ["Jádrové výrobky – vzhled", "navrchu křehké, uvnitř vláčné, mírně klenuté, zlatohnědé, jemně popraskané"],
    ["Kokosky – postup", "sníh s cukrem nahřát na 60 °C → kokos + marmeláda → stříkat → zaschnout → 160 °C 7 min, 130 °C 13 min"],
    ["Makronky – postup", "sníh + mandlová mouka → stříkat 3–4 cm → poklepat → zaschnout 30–60 min → 150 °C 12–15 min"],
    ["Marokánky – postup", "uvařit cukr, arašídy, kůru, ovoce, tuk, mléko, sirup → mouka → placičky → 220 °C 15 min → spodek CKP s vlnovkou"],
    ["Pařížské rohlíčky – pečení", "odležet 24 h, oschnout 30 min, 140 °C 10 min + 160 °C 10 min"]
  ]
}
];

/* ===== ZKRATKY A POJMY ===== */
const GLOSSARY = [
  ["ZŽK", "základní žloutkový krém"],
  ["CKP", "cukrářská kakaová poleva"],
  ["ZPT", "ztužený pokrmový tuk"],
  ["PšMHl", "pšeničná mouka hladká"],
  ["NŠH", "nahřívaná šlehaná hmota"],
  ["LŠH", "lehká šlehaná hmota"],
  ["TŠH", "těžká šlehaná hmota"],
  ["ZŠH", "zvláštní (speciální) šlehaná hmota"],
  ["RŠ", "rychlošlehací (pasta, přípravek)"],
  ["CP", "citropasta"],
  ["VC", "vanilinový cukr"],
  ["PTT", "pevná tuková těsta"],
  ["NaHCO₃", "hydrogenuhličitan sodný = jedlá soda"],
  ["Prdopeč", "kypřicí prášek do pečiva"],
  ["Amonium", "kypřidlo (hydrogenuhličitan amonný, „čpavek“) – hlavně do perníku"],
  ["Melanž", "vaječná směs bez skořápek (čerstvá nebo zmrazená)"],
  ["Inverze cukru", "štěpení cukru na glukózu a fruktózu (kyselinou) – roztok pak nekrystalizuje"],
  ["Koagulace", "srážení bílkovin teplem (75–85 °C)"],
  ["Denaturace", "nevratná změna bílkovin (např. nad 45 °C u NŠH vznikne vaječina)"],
  ["Dextrin", "vzniká ze škrobu při 100 °C během pečení"],
  ["Mazovatění škrobu", "škrob ve vařící tekutině nabobtná a zahustí ji (např. ZŽK)"],
  ["Emulgátor", "látka, která pomáhá napěnění a stabilizaci (např. v RŠ pastě)"],
  ["Hygroskopický", "přitahuje vlhkost ze vzduchu (vaničky, pusinky) – skladovat v suchu"],
  ["Kulér", "barvivo z taveného cukru"],
  ["Rozvar", "cukr svařený s vodou"],
  ["Spaření těsta", "tuk roztaje, mouka ho pohltí – těsto praská a ztrácí elastičnost"],
  ["Kapsle", "nízká obdélníková forma nebo ráfek na pláty pro řezy"],
  ["Ráfek", "obruč bez dna na pečení nebo skládání dortů"],
  ["Srnčí hřbet", "podlouhlá žlábkovitá forma (biskupský chlebíček)"],
  ["Buflery", "stříkané polotovary z LŠH (na špičky, indiánky, pražské koule)"]
];

/* ===== TABULKA TEPLOT ===== */
const TEMPS = [
  ["1", "RŠ hmota – šlehání", "—", "3–5 min"],
  ["2", "NŠH – nahřátí vajec s cukrem", "45 °C", "—"],
  ["22", "Plát na roládu (NŠH)", "220 °C", "~6 min"],
  ["3", "Sněhová hmota (pusinky)", "150 → 130 °C", "dosoušet"],
  ["3", "Laskonky – rozvar", "115 °C", "—"],
  ["3", "Laskonky – pečení", "100 → 60 °C", "dosoušet"],
  ["3", "Vaničky (rakvičky)", "180–190 → 120 °C", "45–50 min"],
  ["4", "Terstská hmota", "200 °C", "—"],
  ["4", "Terstský plát na ořechové kostky", "220–230 °C", "10 min"],
  ["4", "Sachrová hmota", "190–200 °C", "—"],
  ["24", "LŠH – stříkané (buflery), pootevřená pec", "160–200 °C", "20–25 min"],
  ["24", "LŠH – dortový korpus", "200 °C", "~35 min"],
  ["5", "Třená hmota (bábovka)", "180 → 200 °C", "40–60 min"],
  ["6", "Třené linecké", "175 °C", "—"],
  ["7", "Linecké těsto", "180–200 °C", "10–15 min"],
  ["7", "Linecké koláčky", "190 °C", "6–8 min"],
  ["7", "Vaflové těsto", "190–220 °C", "10–20 min"],
  ["7", "Vanilkové rohlíčky", "200 °C", "~12 min"],
  ["13", "Perník – rozvar", "112,5 °C", "—"],
  ["13", "Perník – malé tvary", "200 °C", "7 min"],
  ["13", "Perník – střední tvary", "180 °C", "18 min"],
  ["13", "Perník – velké tvary", "170–180 °C", "19–20 min"],
  ["13", "Perník – pláty", "170–180 °C", "10 min"],
  ["9", "Kokosky – nahřátí sněhu", "60 °C", "—"],
  ["9", "Kokosky – pečení", "160 → 130 °C", "7 + 13 min"],
  ["9", "Jádrové kornoutky", "180 °C", "7–10 min"],
  ["9", "Pařížské rohlíčky", "140 → 160 °C", "10 + 10 min"],
  ["9", "Marokánky", "220 °C", "15 min"],
  ["9", "Makronky", "150 °C (horkovzduch 130–140)", "12–15 min"]
];

const NUMBERS = [
  ["Linecké těsto", "mouka : tuk : cukr = 3 : 2 : 1"],
  ["Vaflové těsto", "mouka : tuk : cukr : jádroviny = 2 : 2 : 1 : 1"],
  ["LŠH – cukr", "1/3 do žloutků, 2/3 do bílků"],
  ["Sněhová hmota, laskonky – cukr", "1/3 do bílků, 2/3 na rozvar"],
  ["Terstská hmota – bílky", "2/3 na sníh, 1/3 do tukové části"],
  ["Těžká šlehaná hmota", "tuk až 25 %"],
  ["Třená hmota", "tuk 26 °C, všechny suroviny 25 °C"],
  ["Třené linecké", "22–25 °C"],
  ["Perník", "rozvar 70–75 %, med 70–80 % invertního cukru, odležení 2–5 dní, plát 5–10 mm"],
  ["Pečení obecně", "bílkoviny koagulují 75–85 °C, škrob → dextrin při 100 °C"],
  ["RŠ pasta", "šlehání 3–5 min místo 30, hmota vydrží 2 h"],
  ["Bábovka", "trvanlivost 6 dní"]
];

const RECIPES = [
  ["ZŽK – základní žloutkový krém", ZZK],
  ["CKP – cukrářská kakaová poleva", "Čokoládové čočky rozpustíme a naředíme ZPT."],
  ["Kokosová pasta", "Cukr krystal necháme zkaramelizovat, přisypeme strouhaný kokos, promícháme, přendáme na vymazaný plech, necháme vychladnout a pomeleme na jemný prášek."],
  ["Kokosový krém (laskonky, kokosová roláda)", "Vychladlý ZŽK šleháme, postupně přidáváme máslo a Heru, nakonec zašleháme kokosovou pastu."],
  ["Kávový krém (štafetky)", "ZŽK vyšleháme s máslem, Herou a instantní kávou."],
  ["Ořechový krém (ořechové kostky)", "Vyšlehaný ZŽK + mleté jádroviny + ZPT."],
  ["Punčový rozvar", "Cukrový rozvar na nit, vychladit, přidat rumový výtažek, kyselinu citronovou, punčové aroma a citronový výtažek."]
];

/* ===== ANGLIČTINA ===== */
const EN_VOCAB = [
  { g: "Suroviny – Ingredients", w: [
    ["mouka", "flour"], ["hladká mouka", "plain flour"], ["cukr", "sugar"], ["moučkový cukr", "icing sugar"], ["cukr krupice", "caster sugar"],
    ["vejce", "egg"], ["žloutek", "egg yolk"], ["bílek", "egg white"], ["máslo", "butter"], ["margarín", "margarine"], ["olej", "oil"],
    ["mléko", "milk"], ["smetana", "cream"], ["šlehačka", "whipped cream"], ["med", "honey"], ["kakao", "cocoa"], ["čokoláda", "chocolate"],
    ["ořechy", "nuts"], ["mandle", "almonds"], ["lískové ořechy", "hazelnuts"], ["vlašské ořechy", "walnuts"], ["kokos", "coconut"],
    ["rozinky", "raisins"], ["marmeláda, džem", "jam"], ["skořice", "cinnamon"], ["vanilka", "vanilla"], ["kypřicí prášek", "baking powder"],
    ["jedlá soda", "baking soda"], ["droždí", "yeast"], ["sůl", "salt"], ["citronová kůra", "lemon zest"], ["koření", "spices"]
  ]},
  { g: "Nástroje – Tools", w: [
    ["trouba, pec", "oven"], ["plech", "baking tray"], ["dortová forma", "cake tin"], ["bábovková forma", "bundt tin"], ["mísa", "bowl"],
    ["metla", "whisk"], ["šlehač, robot", "mixer"], ["váleček", "rolling pin"], ["vykrajovátko", "cookie cutter"], ["cukrářský sáček", "piping bag"],
    ["trubička (špička)", "nozzle"], ["pečicí papír", "baking paper"], ["síto", "sieve"], ["stěrka", "spatula"], ["váha", "scales"]
  ]},
  { g: "Postupy – Verbs", w: [
    ["péct", "to bake"], ["šlehat", "to whip / to whisk"], ["míchat", "to mix / to stir"], ["třít tuk s cukrem", "to cream butter and sugar"],
    ["prosít", "to sift"], ["rozpustit", "to melt"], ["nahřát", "to warm up"], ["vychladit", "to cool down"], ["vyválet", "to roll out"],
    ["vykrojit", "to cut out"], ["stříkat (sáčkem)", "to pipe"], ["plnit", "to fill"], ["potáhnout polevou", "to glaze / to coat"],
    ["ozdobit", "to decorate"], ["posypat", "to sprinkle"], ["krájet", "to slice"], ["vmíchat", "to fold in"], ["vážit", "to weigh"]
  ]},
  { g: "Výrobky a popis – Products", w: [
    ["dort", "cake"], ["řez", "slice"], ["roláda", "Swiss roll"], ["zákusek", "dessert / pastry"], ["korpus", "sponge base"],
    ["piškot", "sponge cake"], ["krém", "cream / buttercream"], ["poleva", "icing / glaze"], ["náplň", "filling"], ["vrstva", "layer"],
    ["pusinky", "meringues"], ["perník", "gingerbread"], ["bábovka", "bundt cake"], ["čajové pečivo", "biscuits / cookies"],
    ["sladký", "sweet"], ["křehký", "crumbly / crispy"], ["vláčný", "moist / soft"], ["nadýchaný", "fluffy / light"], ["křupavý", "crunchy"],
    ["krémový", "creamy"], ["ovocný", "fruity"], ["lahodný", "delicious"]
  ]}
];

const EN_PHRASES = [
  ["My product is …", "Můj výrobek je …"],
  ["It is made from …", "Je vyrobený z …"],
  ["First, I … Then I … After that, I … Finally, I …", "Nejdřív … Potom … Pak … Nakonec …"],
  ["I bake it at 180 degrees for 40 minutes.", "Peču ho na 180 stupňů 40 minut."],
  ["It is filled with … and decorated with …", "Je plněný … a ozdobený …"],
  ["It tastes sweet and …", "Chutná sladce a …"],
  ["It is soft / crunchy / fluffy.", "Je vláčný / křupavý / nadýchaný."],
  ["It is suitable for birthdays, weddings, Christmas.", "Hodí se na narozeniny, svatby, Vánoce."],
  ["I chose this product because …", "Vybrala jsem si tento výrobek, protože …"],
  ["You should store it in the fridge / in a dry place.", "Měl by se skladovat v lednici / v suchu."]
];

const EN_SAMPLES = [
  { n: "Bundt cake – Bábovka", en: "My product is a bundt cake. It is made from butter, sugar, eggs, milk, flour, baking powder and raisins. First, I cream the butter with the sugar. Then I slowly add the eggs and the milk. After that, I fold in the flour with the baking powder. I pour the batter into a greased tin and bake it at 180 degrees, then at 200 degrees, for about 40 minutes. Finally, I dust it with icing sugar. It is soft, moist and sweet.",
    cz: "Můj výrobek je bábovka. Je z másla, cukru, vajec, mléka, mouky, kypřicího prášku a rozinek. Nejdřív utřu máslo s cukrem. Pak pomalu přidám vejce a mléko. Potom vmíchám mouku s kypřicím práškem. Těsto naliju do vymazané formy a peču na 180 °C, pak na 200 °C asi 40 minut. Nakonec ji posypu moučkovým cukrem. Je vláčná, jemná a sladká." },
  { n: "Sachertorte – Sachrův dort", en: "My product is the Sachertorte. It is a famous chocolate cake from Vienna. The sponge is made from butter, sugar, eggs, flour and cocoa. I whip the egg whites separately. I bake it at 190 degrees. Then I fill it with apricot jam and coat it with chocolate glaze. It is rich and chocolatey.",
    cz: "Můj výrobek je Sachrův dort. Je to slavný čokoládový dort z Vídně. Korpus je z másla, cukru, vajec, mouky a kakaa. Bílky šlehám zvlášť. Peču na 190 °C. Pak ho plním meruňkovou marmeládou a potáhnu čokoládovou polevou. Je výrazně čokoládový." },
  { n: "Gingerbread – Perník", en: "My product is gingerbread. It is made from flour, sugar, honey, eggs, spices and baking soda. The dough must rest for two to five days. Then I roll it out and cut out shapes. I brush them with egg and bake small shapes at 200 degrees for 7 minutes. Finally, I decorate them with royal icing. It is a traditional Czech Christmas product.",
    cz: "Můj výrobek je perník. Je z mouky, cukru, medu, vajec, koření a jedlé sody. Těsto musí 2–5 dní odležet. Pak ho vyválím a vykrojím tvary. Potřu je vejcem a malé tvary peču na 200 °C 7 minut. Nakonec je ozdobím bílkovou polevou. Je to tradiční české vánoční pečivo." },
  { n: "Laskonky", en: "My product is called Laskonky. They are two oval meringue shells with nuts or coconut. I bake them at 100 degrees and then dry them at 60 degrees. I fill them with coconut buttercream and decorate the top with chocolate. They are crunchy outside and creamy inside.",
    cz: "Můj výrobek se jmenuje laskonky. Jsou to dva oválky ze sněhové hmoty s ořechy nebo kokosem. Peču je na 100 °C a dosouším na 60 °C. Plním je kokosovým máslovým krémem a navrch dám čokoládu. Zvenku jsou křupavé a uvnitř krémové." },
  { n: "Birthday cake – Narozeninový dort", en: "My product is a birthday cake. The sponge base is made from eggs, sugar, flour and a little oil. I bake it at 200 degrees for about 35 minutes. When it is cool, I slice it into three layers. I fill the layers with vanilla buttercream and fresh fruit. Finally, I cover the cake with cream and decorate it with chocolate and fruit. It is light, fluffy and fruity.",
    cz: "Můj výrobek je narozeninový dort. Korpus je z vajec, cukru, mouky a trochy oleje. Peču ho na 200 °C asi 35 minut. Po vychladnutí ho prokrojím na tři vrstvy. Plním je vanilkovým máslovým krémem a čerstvým ovocem. Nakonec dort potáhnu krémem a ozdobím čokoládou a ovocem. Je lehký, nadýchaný a ovocný." }
];
