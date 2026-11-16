/* ===== POMOCNÉ ===== */
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])).replace(/ (°C|%)/g, " $1");
const norm = s => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const uniq = a => Array.from(new Set(a));
const txt = x => typeof x === "string" ? x : x.t;
const isAdd = x => typeof x === "object" && x && x.add;
const T = id => TOPICS.find(t => t.id === id);
const G = id => GROUPS.find(g => g.id === id);
const plural = (n, a, b, c) => n === 1 ? a : (n >= 2 && n <= 4 ? b : c);
const ADDED = '<span class="added" title="Není ve školních podkladech – ověř si to">doplněno</span>';

const ORDERED = GROUPS.flatMap(g => TOPICS.filter(t => t.group === g.id).sort((a, b) => a.num - b.num));

/* ===== ULOŽENÍ ===== */
const KEY = "eliska-trenazer-v1";
function defState() { return { exam: "2027-06-01", status: {}, cards: {}, qok: {}, best: {}, oral: {}, mistakes: {}, notes: {}, general: "", enText: "", history: [], last: null, steps: {}, focus: null, hideGuide: false }; }
function markStep(tid, k) { if (!tid) return; S.steps[tid] = S.steps[tid] || {}; S.steps[tid][k] = 1; save(); }
let S = defState();
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(defState(), JSON.parse(raw)); } catch (e) { }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }

/* ===== OTÁZKY DO KVÍZŮ ===== */
function topicFaults(t) { const f = []; t.sections.forEach(s => (s.faults || []).forEach(x => f.push(x))); return f; }
const ALL_CAUSES = uniq(TOPICS.flatMap(t => topicFaults(t).map(f => f[1])));
const ALLQ = {};
const TQ = {};
TOPICS.forEach(t => {
  const out = [];
  t.quiz.forEach((q, k) => {
    const id = t.id + "-q" + k;
    if (q[0] === "mc") out.push({ id, topic: t.id, type: "mc", q: q[1], correct: q[2], wrong: q[3], why: q[4] });
    else out.push({ id, topic: t.id, type: "tf", q: q[1], v: q[2], why: q[3] });
  });
  const faults = topicFaults(t);
  faults.forEach((f, k) => {
    let pool = uniq(faults.filter(x => x[1] !== f[1]).map(x => x[1]));
    if (pool.length < 3) pool = uniq(pool.concat(shuffle(ALL_CAUSES.filter(c => c !== f[1]))));
    out.push({ id: t.id + "-f" + k, topic: t.id, type: "mc", q: "Jaká je příčina vady: „" + f[0] + "“?", correct: f[1], wrongPool: pool });
  });
  if (faults.length >= 4) out.push({ id: t.id + "-m", topic: t.id, type: "match", q: "Přiřaď ke každé vadě její příčinu", faults });
  t.sections.forEach((s, k) => {
    if (s.order && s.steps && s.steps.length >= 3 && s.steps.length <= 7)
      out.push({ id: t.id + "-o" + k, topic: t.id, type: "order", q: "Seřaď kroky ve správném pořadí – " + s.h, items: s.steps.map(txt) });
  });
  TQ[t.id] = out;
  out.forEach(q => ALLQ[q.id] = q);
});
const GQ = GLOSSARY.map((g, k) => {
  const others = GLOSSARY.filter(x => x !== g).map(x => x[1]);
  return { id: "g-" + k, type: "mc", q: "Co znamená „" + g[0] + "“?", correct: g[1], wrongPool: others };
});
const EN_WORDS = EN_VOCAB.flatMap((grp, gi) => grp.w.map((w, k) => ({ gi, k, cz: w[0], en: w[1] })));
const ENQ = EN_WORDS.map((w, n) => {
  const same = EN_WORDS.filter(x => x.gi === w.gi && x !== w);
  if (n % 2 === 0) return { id: "en-" + w.gi + "-" + w.k, type: "mc", q: "Jak se anglicky řekne „" + w.cz + "“?", correct: w.en, wrongPool: same.map(x => x.en) };
  return { id: "en-" + w.gi + "-" + w.k, type: "mc", q: "Co znamená „" + w.en + "“?", correct: w.cz, wrongPool: same.map(x => x.cz) };
});
GQ.concat(ENQ).forEach(q => ALLQ[q.id] = q);

/* ===== KARTIČKY ===== */
const TC = {};
TOPICS.forEach(t => {
  const c = t.cards.map((x, k) => ({ id: t.id + "-c" + k, topic: t.id, f: x[0], b: x[1] }));
  topicFaults(t).forEach((f, k) => c.push({ id: t.id + "-fc" + k, topic: t.id, f: "Vada: " + f[0], b: "Příčina: " + f[1] }));
  TC[t.id] = c;
});
const GC = GLOSSARY.map((g, k) => ({ id: "gc-" + k, f: g[0], b: g[1] }));
const ENC = EN_WORDS.map(w => ({ id: "enc-" + w.gi + "-" + w.k, f: w.cz, b: w.en }));

/* ===== ROZSAHY ===== */
function scopeName(sc) {
  if (sc === "all") return "Celá látka";
  if (sc === "en") return "Angličtina – slovíčka";
  if (sc === "pojmy") return "Zkratky a pojmy";
  if (sc === "chyby") return "Moje chyby";
  if (sc === "retry") return "Opakování chyb";
  if (sc.startsWith("g:")) return G(sc.slice(2)).name;
  if (sc.startsWith("t:")) { const t = T(sc.slice(2)); return "Otázka " + t.num + " – " + t.title; }
  return sc;
}
function scopeQ(sc) {
  if (sc === "all") return ORDERED.flatMap(t => TQ[t.id]);
  if (sc === "en") return ENQ;
  if (sc === "pojmy") return GQ;
  if (sc === "chyby") return Object.keys(S.mistakes).map(id => ALLQ[id]).filter(Boolean);
  if (sc.startsWith("g:")) return ORDERED.filter(t => t.group === sc.slice(2)).flatMap(t => TQ[t.id]);
  if (sc.startsWith("t:")) return TQ[sc.slice(2)] || [];
  return [];
}
function scopeC(sc) {
  if (sc === "all") return ORDERED.flatMap(t => TC[t.id]);
  if (sc === "en") return ENC;
  if (sc === "pojmy") return GC;
  if (sc.startsWith("g:")) return ORDERED.filter(t => t.group === sc.slice(2)).flatMap(t => TC[t.id]);
  if (sc.startsWith("t:")) return TC[sc.slice(2)] || [];
  return [];
}

/* ===== POKROK ===== */
function topicProgress(t) {
  const cs = TC[t.id], qs = TQ[t.id];
  const cp = cs.filter(c => S.cards[c.id] === 3).length / cs.length;
  const qp = qs.filter(q => S.qok[q.id]).length / qs.length;
  const st = [0, .5, 1][S.status[t.id] || 0];
  return Math.round((cp + qp + st) / 3 * 100);
}
const STATUS = ["Nezačato", "Učím se", "Umím"];
function statusPill(t) {
  const s = S.status[t.id] || 0;
  return '<span class="pill ' + (s === 2 ? "good" : s === 1 ? "warn" : "") + '">' + STATUS[s] + "</span>";
}

/* ===== IKONY A MENU ===== */
const I = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20v-3"/><path d="M8 7h8M8 11h6"/>',
  quiz: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.2-2.5 3.9"/><path d="M12 17.2v.1"/>',
  cards: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
  more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  sheet: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  note: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>'
};
const ico = n => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[n] + "</svg>";
const NAV = [["domu", "Domů", "home"], ["otazky", "Otázky", "book"], ["procvic", "Procvičování", "quiz"], ["poznamky", "Poznámky", "note"]];
const NAV2 = [["navod", "Návod", "more"], ["nastaveni", "Nastavení a záloha", "gear"]];
function navKey(h) {
  if (h.startsWith("otazka-") || h === "anglictina" || h === "tahaky") return "otazky";
  if (["kvizy", "kviz-hra", "karticky", "karticky-hra", "naostro"].includes(h)) return "procvic";
  return h;
}
function renderNav(h) {
  const k = navKey(h);
  const a = n => '<a href="#' + n[0] + '" class="' + (k === n[0] ? "on" : "") + '">' + ico(n[2]) + n[1] + "</a>";
  $("#side").innerHTML = '<div class="brand">Cukrářský trenažér<small>Závěrečné zkoušky · cukrář</small></div>' +
    NAV.map(a).join("") + '<div class="sep"></div>' + NAV2.map(a).join("");
  $("#bottom").innerHTML = NAV.map(n => '<a href="#' + n[0] + '" class="' + (k === n[0] ? "on" : "") + '">' + ico(n[2]) + "<span>" + n[1] + "</span></a>").join("");
}

/* ===== ROUTER ===== */
let TIMER = null;
function stopTimer() { if (TIMER) { clearInterval(TIMER); TIMER = null; } }
const ROUTES = {
  domu: vHome, otazky: vTopics, kvizy: vQuizPick, "kviz-hra": vQuizPlay, karticky: vCardsPick, "karticky-hra": vCardsPlay,
  naostro: vExam, anglictina: vEnglish, tahaky: vCheat, poznamky: vNotes, nastaveni: vSettings, procvic: vPractice, navod: vGuide
};
function route() {
  const h = (location.hash || "#domu").slice(1);
  let fn = ROUTES[h];
  if (!fn && h.startsWith("otazka-")) { const t = T(h.slice(7)); if (t) fn = () => vTopic(t); }
  if (!fn) fn = vHome;
  stopTimer();
  fn();
  renderNav(h);
  window.scrollTo(0, 0);
}
function go(h) { if (location.hash === "#" + h) route(); else location.hash = h; }
const view = html => { $("#view").innerHTML = html; };
function toast(m) {
  const d = document.createElement("div"); d.className = "toast"; d.textContent = m; document.body.appendChild(d);
  setTimeout(() => d.remove(), 2200);
}

/* ===== DOMŮ ===== */
function daysLeft() { const d = new Date(S.exam + "T08:00:00"); return Math.ceil((d - new Date()) / 864e5); }
function fmtDate(s) { try { return new Date(s + "T12:00:00").toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return s; } }
function nextTopic() {
  if (S.focus && T(S.focus) && (S.status[S.focus] || 0) < 2) return T(S.focus);
  return ORDERED.find(t => (S.status[t.id] || 0) < 2) || null;
}
function learnCard() {
  const t = nextTopic();
  if (!t) return `<section class="card stack learn"><p class="eyebrow">Uč se dál</p><h2>Všechny otázky máš označené jako „Umím“!</h2>
    <p class="muted">Teď už jen opakuj ze všeho, ať to nezapomeneš.</p>
    <div class="grid2"><button class="btn primary" data-act="quick">Kvíz ze všeho</button><button class="btn" data-act="cardsall">Kartičky ze všeho</button></div></section>`;
  const st = S.steps[t.id] || {};
  const step = (done, n, title, sub, attrs) => `<${attrs.href ? "a" : "button"} class="stepb ${done ? "done" : ""}" ${attrs.href ? `href="${attrs.href}"` : `data-act="${attrs.act}" data-t="${t.id}"`}>
      <span class="sn">${done ? "✓" : n}</span><span><b>${title}</b><span>${sub}</span></span></${attrs.href ? "a" : "button"}>`;
  return `<section class="card stack learn">
    <p class="eyebrow">Uč se dál</p>
    <div class="row" style="flex-wrap:nowrap"><span class="tnum">${t.num}</span><h2 style="min-width:0">${esc(t.title)}</h2></div>
    <div class="steps3">
      ${step(st.read, 1, "Přečti si látku", "na co se ptají a to nejdůležitější", { href: "#otazka-" + t.id })}
      ${step(st.cards, 2, "Projdi kartičky", TC[t.id].length + " kartiček k téhle otázce", { act: "tcards" })}
      ${step(st.quiz, 3, "Udělej kvíz", "ověř si, že to umíš", { act: "tquiz" })}
    </div>
    <div class="row" style="justify-content:space-between">
      <button class="btn primary" data-act="learned" data-t="${t.id}">Umím ji – další otázka</button>
      <select id="focussel" aria-label="Vybrat jinou otázku" style="width:auto;max-width:100%"><option value="">Vybrat jinou otázku…</option>${ORDERED.map(x => `<option value="${x.id}">${x.num}. ${esc(x.title)}</option>`).join("")}</select>
    </div>
  </section>`;
}
function guideCard() {
  if (S.hideGuide) return "";
  return `<section class="card stack guide">
    <h2>Jak na to</h2>
    <ul class="osnova">
      <li><span><b>Uč se dál</b> (hned pod tímhle) tě provede: přečti si otázku → projdi kartičky → udělej kvíz. Pak klikni „Umím“ a jde se na další.</span></li>
      <li><span><b>Otázky</b> – všechna témata podle čísel ze školy. Je tam i angličtina a taháky (teploty, zkratky).</span></li>
      <li><span><b>Procvičování</b> – kvízy, kartičky a zkouška naostro z jedné otázky, ze skupiny nebo ze všeho.</span></li>
      <li><span><b>Poznámky</b> – tvůj blok. Všechno se ukládá samo.</span></li>
    </ul>
    <div class="row"><button class="btn" data-act="hideguide">Rozumím, schovat</button><a class="btn ghost" href="#navod">Celý návod</a></div>
  </section>`;
}
function vHome() {
  const days = daysLeft();
  const all = ORDERED.map(topicProgress);
  const overall = Math.round(all.reduce((a, b) => a + b, 0) / all.length);
  view(`
    <section class="hello stack" style="gap:6px">
      <h1>Ahoj Eliško!</h1>
      <p class="muted">${days > 0 ? `Do zkoušek ${plural(days, "zbývá", "zbývají", "zbývá")} <b class="num" style="color:var(--accent)">${days} ${plural(days, "den", "dny", "dní")}</b> (${esc(fmtDate(S.exam))}).` : "Hodně štěstí u zkoušek!"} Stačí i 10 minut denně.</p>
    </section>
    ${guideCard()}
    ${learnCard()}
    <section class="card stack">
      <div class="row" style="justify-content:space-between"><h2>Jak ti to jde</h2><span class="pill accent num">${overall} %</span></div>
      ${GROUPS.map(g => {
        const ts = ORDERED.filter(t => t.group === g.id);
        const p = Math.round(ts.reduce((a, t) => a + topicProgress(t), 0) / ts.length);
        const done = ts.filter(t => S.status[t.id] === 2).length;
        return `<div class="grp"><span><b>${esc(g.name)}</b> <span class="small muted">· umíš ${done} z ${ts.length}</span></span><span class="small num muted">${p} %</span><div class="bar"><i style="width:${p}%"></i></div></div>`;
      }).join("")}
    </section>
    ${S.history.length ? `<section class="stack"><h2>Poslední výsledky</h2><div class="card stack" style="gap:8px">${S.history.slice(-4).reverse().map(histRow).join("<hr>")}</div></section>` : ""}
    <div class="row small"><a href="#navod">Návod</a><span class="muted">·</span><a href="#nastaveni">Datum zkoušek a záloha</a></div>
  `);
}
function vGuide() {
  view(`
    <a class="back" href="#domu">← Domů</a>
    <header class="stack" style="gap:6px"><h1>Návod</h1><p class="muted">Kde co najdeš a jak se s tím učit.</p></header>
    <section class="card stack"><h2>Nejjednodušší cesta</h2>
      <ol class="steps body" style="padding:0">
        <li><span>Na <b>Domů</b> je karta <b>Uč se dál</b> s jednou otázkou.</span></li>
        <li><span>Klikni na <b>Přečti si látku</b>. Přečti si, na co se ptají, a „To nejdůležitější“. Celou látku si rozbal, až ji budeš potřebovat.</span></li>
        <li><span>Vrať se a dej <b>Projdi kartičky</b>. Přečti otázku, odpověz si v hlavě, otoč a řekni po pravdě, jestli jsi to věděla.</span></li>
        <li><span>Pak <b>Udělej kvíz</b>.</span></li>
        <li><span>Když to jde, klikni <b>Umím ji – další otázka</b>. Hotové kroky mají fajfku.</span></li>
      </ol></section>
    <section class="card stack"><h2>Co je kde</h2>
      <dl class="pairs">
        <dt>Domů</dt><dd>Uč se dál, kolik toho už umíš, poslední výsledky.</dd>
        <dt>Otázky</dt><dd>Všechna témata podle čísel ze školy. Nahoře je vyhledávání, angličtina a taháky (teploty pečení, poměry, zkratky, krémy).</dd>
        <dt>Stránka otázky</dt><dd>Na co se ptají → to nejdůležitější → čísla k zapamatování → celá látka v rozbalovacích částech → tlačítka na procvičení → tvoje poznámky.</dd>
        <dt>Procvičování</dt><dd><b>Kvíz</b> (možnosti, pravda/nepravda, seřazení postupu, vady), <b>Kartičky</b>, <b>Zkouška naostro</b> (vylosuješ otázku a odpovídáš nahlas) a <b>Moje chyby</b>.</dd>
        <dt>Poznámky</dt><dd>Obecný blok a přehled poznámek u otázek.</dd>
      </dl></section>
    <section class="card stack"><h2>Dobré vědět</h2>
      <ul class="osnova">
        <li><span>Štítek ${ADDED} znamená, že to ve školních podkladech chybělo a je to doplněné. Ověř si to v sešitě.</span></li>
        <li><span>Všechno se ukládá samo, ale jen v tomhle prohlížeči. Mobil a počítač mají pokrok každý zvlášť – přenést ho jde v <a href="#nastaveni">Nastavení</a> přes zálohu.</span></li>
        <li><span>Na mobilu si stránku přidej na plochu (v prohlížeči „Přidat na plochu“) a otevírá se jako aplikace.</span></li>
      </ul></section>
    ${S.hideGuide ? `<button class="btn" data-act="showguide">Zase ukázat „Jak na to“ na Domů</button>` : ""}
  `);
}
function vPractice() {
  const mist = Object.keys(S.mistakes).length;
  view(`
    <header class="stack" style="gap:6px"><h1>Procvičování</h1><p class="muted">Vyber si, jak chceš procvičovat. Potom zvolíš, jestli jednu otázku, skupinu, nebo všechno.</p></header>
    <div class="ptiles">
      <a class="ptile" href="#kvizy"><b>Kvíz</b><span>Otázky s možnostmi, pravda/nepravda, seřazení postupu a přiřazení vad.</span></a>
      <a class="ptile" href="#karticky"><b>Kartičky</b><span>Otázka – otočíš – odpověď. Řekneš si, jestli to umíš.</span></a>
      <a class="ptile" href="#naostro"><b>Zkouška naostro</b><span>Vylosuješ si otázku a odpovídáš nahlas jako před komisí.</span></a>
      <a class="ptile" href="#" data-act="mistakes"><b>Moje chyby</b><span>${mist ? mist + " " + plural(mist, "otázka, která se nepovedla", "otázky, které se nepovedly", "otázek, které se nepovedly") : "Zatím žádné – super."}</span></a>
    </div>
    ${S.history.length ? `<section class="stack"><h2>Poslední výsledky</h2><div class="card stack" style="gap:8px">${S.history.slice(-6).reverse().map(histRow).join("<hr>")}</div></section>` : ""}
  `);
}
function histRow(h) {
  const d = new Date(h.d).toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric" });
  const pct = Math.round(h.sc / h.n * 100);
  return `<div class="row" style="justify-content:space-between"><span><b>${esc(h.s)}</b> <span class="small muted">· ${h.k === "oral" ? "naostro" : "kvíz"} · ${d}</span></span><span class="pill ${pct >= 80 ? "good" : pct >= 50 ? "warn" : ""} num">${pct} %</span></div>`;
}

/* ===== SEZNAM OTÁZEK ===== */
function topicItem(t) {
  const p = topicProgress(t), cs = TC[t.id];
  const known = cs.filter(c => S.cards[c.id] === 3).length;
  return `<a class="titem" href="#otazka-${t.id}"><span class="tnum">${t.num}</span>
    <span style="min-width:0"><span class="tt">${esc(t.title)}</span><br><span class="ts">${known}/${cs.length} kartiček · ${p} % hotovo</span><div class="bar ${p >= 80 ? "good" : ""}"><i style="width:${p}%"></i></div></span>
    ${statusPill(t)}</a>`;
}
function flatText(o, out = []) {
  if (typeof o === "string") out.push(o);
  else if (Array.isArray(o)) o.forEach(x => flatText(x, out));
  else if (o && typeof o === "object") Object.keys(o).forEach(k => { if (!["id", "group", "add", "order"].includes(k)) flatText(o[k], out); });
  return out;
}
const SEARCH = TOPICS.map(t => ({ t, parts: flatText([t.title, t.zadani, t.osnova, t.sections]) }));
function vTopics() {
  view(`
    <header class="stack" style="gap:6px"><h1>Otázky</h1><p class="muted">Seřazené podle témat. Čísla jsou čísla otázek ze školy.</p></header>
    <div class="grid2">
      <a class="ptile small-tile" href="#anglictina"><b>Angličtina</b><span>slovíčka a popis výrobku</span></a>
      <a class="ptile small-tile" href="#tahaky"><b>Taháky</b><span>teploty pečení, poměry, zkratky, krémy</span></a>
    </div>
    <input type="search" id="search" placeholder="Hledat v látce (např. 45 °C, laskonky, inverze)" autocomplete="off">
    <div id="tl" class="stack"></div>
  `);
  renderTopicList("");
}
function renderTopicList(q) {
  const box = $("#tl"); if (!box) return;
  q = q.trim();
  if (!q) {
    box.innerHTML = GROUPS.map(g => `<div class="ghead"><h2>${esc(g.name)}</h2></div><div class="tlist">${ORDERED.filter(t => t.group === g.id).map(topicItem).join("")}</div>`).join("") +
      `<p class="small muted">Další otázky přibudou, až budou podklady.</p>`;
    return;
  }
  const words = norm(q).split(/\s+/).filter(Boolean);
  const hits = SEARCH.map(s => {
    const lines = s.parts.filter(p => { const n = norm(p); return words.every(w => n.includes(w)); });
    return { t: s.t, lines };
  }).filter(h => h.lines.length);
  if (!hits.length) { box.innerHTML = `<p class="muted">Nic jsem nenašel. Zkus jiné slovo.</p>`; return; }
  box.innerHTML = hits.map(h => `<a class="card stack search-hit" href="#otazka-${h.t.id}" style="text-decoration:none;color:inherit;gap:6px">
      <span class="eyebrow">Otázka ${h.t.num}</span><b>${esc(h.t.title)}</b>
      ${h.lines.slice(0, 3).map(l => `<span class="small">${mark(l, words)}</span>`).join("")}
      ${h.lines.length > 3 ? `<span class="small muted">a ${h.lines.length - 3} dalších míst</span>` : ""}</a>`).join("");
}
function mark(line, words) {
  // zvýrazní první výskyt prvního slova (bez ohledu na diakritiku)
  const n = norm(line), w = words[0], i = n.indexOf(w);
  if (i < 0) return esc(line);
  return esc(line.slice(0, i)) + "<mark>" + esc(line.slice(i, i + w.length)) + "</mark>" + esc(line.slice(i + w.length));
}

/* ===== DETAIL OTÁZKY ===== */
const li = x => `<li><span>${esc(txt(x))}${isAdd(x) ? ADDED : ""}</span></li>`;
function renderFlow(f) {
  return `<div class="flow">${f.branches.map(b => `<div class="br">${b.map(x => `<span class="bx">${esc(x)}</span>`).join('<span class="ar">→</span>')}</div>`).join("")}
    <div class="join">${f.join.map(x => `<span class="bx">${esc(x)}</span>`).join('<span class="ar">↓</span>')}</div></div>`;
}
function renderSec(s, open) {
  let h = "";
  if (s.text) h += `<p>${esc(s.text)}</p>`;
  if (s.flow) h += `<p class="eyebrow">Technologické schéma</p>` + renderFlow(s.flow);
  if (s.pairs) h += `<dl class="pairs">${s.pairs.map(p => `<dt>${esc(p[0])}</dt><dd>${esc(p[1])}</dd>`).join("")}</dl>`;
  if (s.list) h += `<ul>${s.list.map(li).join("")}</ul>`;
  if (s.steps) h += `<ol class="steps">${s.steps.map(li).join("")}</ol>`;
  if (s.temps) h += `<div class="tbl"><table><thead><tr><th>Výrobek</th><th>Teplota</th><th>Čas</th></tr></thead><tbody>${s.temps.map(r => `<tr><td>${esc(r[0])}</td><td class="t">${esc(r[1])}</td><td class="t">${esc(r[2])}</td></tr>`).join("")}</tbody></table></div>`;
  if (s.faults) h += `<div class="tbl"><table class="fault"><thead><tr><th>Vada</th><th>Příčina</th></tr></thead><tbody>${s.faults.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join("")}</tbody></table></div>`;
  if (s.products) h += s.products.map(p => `<div class="prod"><h3>${esc(p.n)}${p.add ? ADDED : ""}</h3>${p.d ? `<p>${esc(p.d)}</p>` : ""}${p.list ? `<ul>${p.list.map(li).join("")}</ul>` : ""}${p.steps ? `<ol class="steps">${p.steps.map(li).join("")}</ol>` : ""}</div>`).join("");
  if (s.note) h += `<p class="note">${esc(s.note)}</p>`;
  return `<details class="sec"${open ? " open" : ""}><summary><span>${esc(s.h)}${s.add ? ADDED : ""}</span></summary><div class="body">${h}</div></details>`;
}
function hasAdded(t) { return JSON.stringify(t.sections).includes('"add":1'); }
function vTopic(t) {
  S.last = t.id; markStep(t.id, "read");
  const st = S.status[t.id] || 0;
  const idx = ORDERED.indexOf(t), prev = ORDERED[idx - 1], next = ORDERED[idx + 1];
  view(`
    <a class="back" href="#otazky">← Všechny otázky</a>
    <header class="stack" style="gap:10px">
      <p class="eyebrow">Otázka ${t.num} · ${esc(G(t.group).name)}</p>
      <h1>${esc(t.title)}</h1>
      <div class="seg" role="group" aria-label="Jak to umím">
        ${STATUS.map((n, i) => `<button data-act="status" data-v="${i}" class="${st === i ? "on" : ""} ${i === 2 ? "g" : i === 1 ? "w" : ""}">${n}</button>`).join("")}
      </div>
    </header>
    <div class="zad"><p class="eyebrow">Co se tě zeptají</p><ul>${t.zadani.map(z => `<li>${esc(z)}</li>`).join("")}</ul></div>
    <section class="card stack">
      <div class="row" style="justify-content:space-between"><h2>To nejdůležitější</h2><button class="btn ghost" data-act="toprac">Procvičit ↓</button></div>
      <ul class="osnova">${t.osnova.map(o => `<li><span>${esc(o)}</span></li>`).join("")}</ul>
      <div class="stack" style="gap:8px"><p class="eyebrow">Čísla k zapamatování</p><div class="chips">${t.key.map(k => `<span class="chip">${esc(k)}</span>`).join("")}</div></div>
    </section>
    <div class="row" style="justify-content:space-between"><h2>Celá látka</h2><button class="btn ghost" data-act="expand">Rozbalit vše</button></div>
    ${hasAdded(t) ? `<p class="small muted">Části označené ${ADDED} ve školních podkladech chyběly a doplnil jsem je podle běžné praxe. Ověř si je v sešitě nebo u učitelky.</p>` : ""}
    <div class="stack" style="gap:8px">${t.sections.map(s => renderSec(s)).join("")}</div>
    <section class="card stack" id="prac">
      <h2>Procvič si tuhle otázku</h2>
      <div class="grid2">
        <button class="btn primary" data-act="tquiz" data-t="${t.id}">Kvíz (${TQ[t.id].length} otázek)</button>
        <button class="btn" data-act="tcards" data-t="${t.id}">Kartičky (${TC[t.id].length})</button>
        <button class="btn" data-act="texam" data-t="${t.id}">Zkouška naostro</button>
      </div>
    </section>
    <section class="card stack">
      <h2>Moje poznámky</h2>
      <textarea id="note-t" data-t="${t.id}" placeholder="Co mi říkala učitelka, co si chci zapamatovat, na co se zeptat…">${esc(S.notes[t.id] || "")}</textarea>
      <p class="small muted">Ukládá se samo.</p>
    </section>
    <div class="row" style="justify-content:space-between">
      ${prev ? `<a class="btn" href="#otazka-${prev.id}">← Otázka ${prev.num}</a>` : "<span></span>"}
      ${next ? `<a class="btn" href="#otazka-${next.id}">Otázka ${next.num} →</a>` : ""}
    </div>
  `);
}

/* ===== KVÍZY – VÝBĚR ===== */
let PK = { scope: "all", n: 10 };
function scopeButtons(kind) {
  const count = sc => kind === "q" ? scopeQ(sc).length : scopeC(sc).length;
  const unit = n => kind === "q" ? n + " " + plural(n, "otázka", "otázky", "otázek") : n + " " + plural(n, "kartička", "kartičky", "kartiček");
  const items = [["all", "Celá látka", "všechny otázky dohromady"]]
    .concat(GROUPS.map(g => ["g:" + g.id, g.name, "otázky " + ORDERED.filter(t => t.group === g.id).map(t => t.num).join(", ")]))
    .concat([["en", "Angličtina", "slovíčka k popisu výrobku"], ["pojmy", "Zkratky a pojmy", "ZŽK, CKP, inverze…"]]);
  if (kind === "q") items.push(["chyby", "Moje chyby", "otázky, které se nepovedly"]);
  const isTopic = PK.scope.startsWith("t:");
  return `<div class="scopes">${items.map(i => `<button class="scope ${PK.scope === i[0] ? "on" : ""}" data-act="scope" data-s="${i[0]}"><span><b>${esc(i[1])}</b><span>${esc(i[2])}</span></span><span class="pill num">${unit(count(i[0]))}</span></button>`).join("")}</div>
    <div><label class="lbl" for="tsel">Nebo jen jedna otázka</label>
    <select id="tsel"><option value="">— vyber otázku —</option>${ORDERED.map(t => `<option value="t:${t.id}" ${PK.scope === "t:" + t.id ? "selected" : ""}>${t.num}. ${esc(t.title)}</option>`).join("")}</select></div>
    ${isTopic ? `<p class="small"><span class="pill accent">Vybráno</span> ${esc(scopeName(PK.scope))}</p>` : ""}`;
}
function vQuizPick() {
  if (PK.scope === "chyby" && !Object.keys(S.mistakes).length) PK.scope = "all";
  view(`
    <a class="back" href="#procvic">← Procvičování</a>
    <header class="stack" style="gap:6px"><h1>Kvízy</h1><p class="muted">Výběr z možností, pravda/nepravda, seřazení postupu a přiřazení vad k příčinám.</p></header>
    <section class="stack"><p class="eyebrow">Z čeho</p>${scopeButtons("q")}</section>
    <section class="stack"><p class="eyebrow">Kolik otázek</p>
      <div class="seg">${[[10, "10"], [20, "20"], [0, "Všechny"]].map(n => `<button data-act="qn" data-n="${n[0]}" class="${PK.n === n[0] ? "on" : ""}">${n[1]}</button>`).join("")}</div>
    </section>
    <button class="btn primary block" data-act="startquiz">Spustit kvíz</button>
    ${S.history.length ? `<section class="stack"><h2>Poslední výsledky</h2><div class="card stack" style="gap:8px">${S.history.slice(-6).reverse().map(histRow).join("<hr>")}</div></section>` : ""}
  `);
}

/* ===== KVÍZ – HRA ===== */
let QZ = null;
function prep(q) {
  const p = Object.assign({}, q);
  if (q.type === "mc") {
    const wrong = q.wrong ? q.wrong : shuffle(uniq(q.wrongPool).filter(x => x !== q.correct)).slice(0, 3);
    p.opts = shuffle([q.correct].concat(wrong));
  } else if (q.type === "tf") {
    p.opts = ["Pravda", "Nepravda"]; p.correct = q.v ? "Pravda" : "Nepravda";
  } else if (q.type === "match") {
    p.pairs = shuffle(q.faults).slice(0, 4); p.choices = shuffle(p.pairs.map(x => x[1]));
  } else if (q.type === "order") {
    let s = shuffle(q.items); if (s.join("|") === q.items.join("|")) s = s.slice(1).concat(s[0]);
    p.shuf = s; p.picked = [];
  }
  return p;
}
function startQuiz(scope, n, list) {
  let pool = list || scopeQ(scope);
  if (!pool.length) { toast("Tady zatím nejsou žádné otázky."); return; }
  pool = shuffle(pool);
  if (n) pool = pool.slice(0, n);
  QZ = { scope, title: scopeName(scope), list: pool.map(prep), i: 0, score: 0, done: false, wrong: [] };
  go("kviz-hra");
}
function vQuizPlay() {
  if (!QZ) { go("kvizy"); return; }
  if (QZ.i >= QZ.list.length) return quizResult();
  const q = QZ.list[QZ.i], n = QZ.list.length, t = q.topic && T(q.topic);
  QZ.done = false;
  let body = "";
  if (q.type === "mc" || q.type === "tf") {
    body = `<div class="opts">${q.opts.map((o, i) => `<button class="opt" data-act="ans" data-i="${i}"><span class="k">${q.type === "tf" ? (i ? "N" : "P") : "ABCD"[i]}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
  } else if (q.type === "match") {
    body = `<div class="match">${q.pairs.map((p, i) => `<div class="m"><b>${esc(p[0])}</b><select id="m${i}" aria-label="Příčina"><option value="">— vyber příčinu —</option>${q.choices.map((c, k) => `<option value="${k}">${esc(c)}</option>`).join("")}</select><span class="fix" id="mf${i}" hidden></span></div>`).join("")}</div>
      <button class="btn primary" data-act="checkmatch">Zkontrolovat</button>`;
  } else if (q.type === "order") {
    body = `<p class="small muted">Klepej na kroky v pořadí, jak jdou po sobě.</p><div id="ord"></div>`;
  }
  view(`
    <div class="qtop"><a class="back" href="#kvizy">← Ukončit</a><span class="pill num">${QZ.i + 1} / ${n}</span></div>
    <div class="bar"><i style="width:${QZ.i / n * 100}%"></i></div>
    <div class="card qcard">
      <div class="row"><span class="pill accent">${t ? "Otázka " + t.num : esc(QZ.title)}</span>${q.type === "tf" ? '<span class="pill">Pravda, nebo ne?</span>' : ""}</div>
      <p class="qq">${esc(q.q)}</p>
      ${body}
      <div id="fb"></div>
    </div>
    <button id="next" class="btn primary block" data-act="next" hidden>${QZ.i + 1 < n ? "Další otázka" : "Zobrazit výsledek"}</button>
  `);
  if (q.type === "order") renderOrder();
}
function renderOrder() {
  const q = QZ.list[QZ.i];
  $("#ord").innerHTML = `
    ${q.picked.length ? `<ol class="steps body" style="padding:0;margin-bottom:12px">${q.picked.map(x => `<li><span>${esc(x)}</span></li>`).join("")}</ol>` : ""}
    <div class="opts">${q.shuf.map((x, k) => q.picked.includes(x) ? "" : `<button class="opt" data-act="ord" data-v="${k}"><span class="k">+</span><span>${esc(x)}</span></button>`).join("")}</div>
    ${q.picked.length && !QZ.done ? `<button class="btn ghost" data-act="ordreset" style="margin-top:8px">Začít znovu</button>` : ""}`;
}
function record(ok) {
  const q = QZ.list[QZ.i];
  QZ.done = true;
  if (ok) { QZ.score++; S.qok[q.id] = 1; delete S.mistakes[q.id]; }
  else { delete S.qok[q.id]; S.mistakes[q.id] = (S.mistakes[q.id] || 0) + 1; QZ.wrong.push(q); }
  save();
  $("#next").hidden = false;
}
function feedback(ok, extra) {
  const q = QZ.list[QZ.i];
  const why = q.why ? esc(q.why) : "";
  $("#fb").innerHTML = `<div class="fb ${ok ? "ok" : "no"}">${ok ? "Správně!" : "Tohle nevyšlo."}${extra || why ? `<span>${extra || ""}${extra && why ? " " : ""}${why}</span>` : ""}</div>`;
}
function quizResult() {
  const n = QZ.list.length, sc = QZ.score, pct = Math.round(sc / n * 100);
  if (!QZ.saved) {
    QZ.saved = true;
    S.best[QZ.scope] = Math.max(S.best[QZ.scope] || 0, pct);
    if (QZ.scope.startsWith("t:")) markStep(QZ.scope.slice(2), "quiz");
    S.history.push({ d: Date.now(), s: QZ.title, sc, n, k: "quiz" });
    S.history = S.history.slice(-40); save();
  }
  const msg = pct >= 90 ? "Výborně, tohle umíš!" : pct >= 70 ? "Dobrá práce, ještě kousek." : pct >= 50 ? "Půlka je tam. Projdi si chyby." : "Nevadí – mrkni do látky a zkus to znovu.";
  view(`
    <a class="back" href="#kvizy">← Kvízy</a>
    <section class="card stack" style="align-items:flex-start">
      <p class="eyebrow">${esc(QZ.title)}</p>
      <span class="big num">${pct} %</span>
      <p><b>${sc} z ${n}</b> správně. ${msg}</p>
    </section>
    ${QZ.wrong.length ? `<section class="stack"><h2>Co se nepovedlo</h2><div class="card"><ul class="res" style="margin:0;padding-left:20px">${QZ.wrong.map(q => `<li><b>${esc(q.q)}</b><br><span class="small" style="color:var(--good)">${esc(correctText(q))}</span></li>`).join("")}</ul></div></section>` : ""}
    <div class="grid2">
      ${QZ.wrong.length ? `<button class="btn primary" data-act="retry">Zopakovat chybné (${QZ.wrong.length})</button>` : ""}
      <button class="btn" data-act="again">Nový kvíz ze stejné látky</button>
      <a class="btn" href="#kvizy">Zpět na výběr</a>
    </div>
  `);
}
function correctText(q) {
  if (q.type === "mc") return "Správně: " + q.correct;
  if (q.type === "tf") return "Správně: " + (q.v ? "pravda" : "nepravda") + (q.why ? " – " + q.why : "");
  if (q.type === "match") return q.pairs.map(p => p[0] + " → " + p[1]).join(" · ");
  if (q.type === "order") return q.items.map((x, i) => (i + 1) + ". " + x).join("  ");
  return "";
}

/* ===== KARTIČKY ===== */
let CPK = { only: true };
let CS = null;
function vCardsPick() {
  if (PK.scope === "chyby") PK.scope = "all";
  view(`
    <a class="back" href="#procvic">← Procvičování</a>
    <header class="stack" style="gap:6px"><h1>Kartičky</h1><p class="muted">Přečti si otázku, zkus si odpovědět v hlavě a otoč kartičku. Pak řekni po pravdě, jestli jsi to věděla.</p></header>
    <section class="stack"><p class="eyebrow">Z čeho</p>${scopeButtons("c")}</section>
    <label class="check ${CPK.only ? "on" : ""}" id="onlyl"><input type="checkbox" id="only" ${CPK.only ? "checked" : ""}><span><b>Jen kartičky, které ještě neumím</b><br><span class="small muted">Ty, které umíš, se přeskočí.</span></span></label>
    <button class="btn primary block" data-act="startcards">Začít</button>
  `);
}
function startCards(scope, only) {
  let pool = scopeC(scope);
  let note = "";
  if (only) {
    const f = pool.filter(c => S.cards[c.id] !== 3);
    if (!f.length) note = "Všechny tyhle kartičky už umíš – ukazuju je všechny."; else pool = f;
  }
  if (!pool.length) { toast("Tady zatím nejsou žádné kartičky."); return; }
  pool = shuffle(pool).sort((a, b) => (S.cards[a.id] || 0) - (S.cards[b.id] || 0));
  CS = { scope, title: scopeName(scope), list: pool, i: 0, flip: false, r: [0, 0, 0] };
  go("karticky-hra");
  if (note) toast(note);
}
function vCardsPlay() {
  if (!CS) { go("karticky"); return; }
  const n = CS.list.length;
  if (CS.i >= n) {
    if (CS.scope.startsWith("t:")) markStep(CS.scope.slice(2), "cards");
    view(`
      <a class="back" href="#karticky">← Kartičky</a>
      <section class="card stack">
        <p class="eyebrow">${esc(CS.title)}</p><h2>Hotovo, prošla jsi ${n} ${plural(n, "kartičku", "kartičky", "kartiček")}</h2>
        <div class="row"><span class="pill good">Umím: ${CS.r[2]}</span><span class="pill warn">Skoro: ${CS.r[1]}</span><span class="pill">Ještě ne: ${CS.r[0]}</span></div>
      </section>
      <div class="grid2"><button class="btn primary" data-act="cardsagain">Znovu ty, co neumím</button><a class="btn" href="#karticky">Zpět na výběr</a></div>`);
    return;
  }
  const c = CS.list[CS.i], t = c.topic && T(c.topic);
  view(`
    <div class="qtop"><a class="back" href="#karticky">← Ukončit</a><span class="pill num">${CS.i + 1} / ${n}</span></div>
    <div class="bar"><i style="width:${CS.i / n * 100}%"></i></div>
    <div class="flash ${CS.flip ? "flip" : ""}" data-act="flip" role="button" tabindex="0" aria-label="Otočit kartičku">
      <div class="in">
        <div class="face"><span class="pill accent">${t ? "Otázka " + t.num : esc(CS.title)}</span><p class="t">${esc(c.f)}</p><p class="hint">Klepni pro otočení</p></div>
        <div class="face back"><p class="t">${esc(c.b)}</p></div>
      </div>
    </div>
    <div class="rate" id="rate" ${CS.flip ? "" : "hidden"}>
      <button class="btn r1" data-act="rate" data-v="1">Ještě ne</button>
      <button class="btn r2" data-act="rate" data-v="2">Skoro</button>
      <button class="btn r3" data-act="rate" data-v="3">Umím</button>
    </div>
    <p class="small muted" id="rateh" ${CS.flip ? "hidden" : ""} style="text-align:center">Nejdřív si odpověz v hlavě, pak kartičku otoč.</p>
  `);
}

/* ===== ZKOUŠKA NAOSTRO ===== */
let EX = null;
function vExam() {
  if (!EX || !EX.t) {
    view(`
      <a class="back" href="#procvic">← Procvičování</a>
      <header class="stack" style="gap:6px"><h1>Zkouška naostro</h1><p class="muted">Jako u ústní zkoušky: vylosuješ si otázku, připravíš se a odpovíš nahlas. Pak si odškrtáš, co jsi řekla.</p></header>
      <section class="card stack">
        <ol class="steps body" style="padding:0">
          <li><span>Vylosuj si otázku (nebo si ji vyber).</span></li>
          <li><span>Přečti si, na co se ptají, a chvíli si to promysli – bez koukání do látky.</span></li>
          <li><span>Odpověz nahlas, jako bys stála před komisí.</span></li>
          <li><span>Odkryj nejdůležitější body a odškrtej, co jsi zmínila.</span></li>
        </ol>
        <button class="btn primary block" data-act="draw">Vylosovat otázku</button>
        <div><label class="lbl" for="exsel">Nebo si vyber</label><select id="exsel"><option value="">— vyber otázku —</option>${ORDERED.map(t => `<option value="${t.id}">${t.num}. ${esc(t.title)}</option>`).join("")}</select></div>
      </section>
      ${Object.keys(S.oral).length ? `<section class="stack"><h2>Moje výsledky naostro</h2><div class="card stack" style="gap:8px">${ORDERED.filter(t => S.oral[t.id] != null).map(t => `<div class="row" style="justify-content:space-between"><a href="#otazka-${t.id}" style="color:inherit;font-weight:700;text-decoration:none">${t.num}. ${esc(t.title)}</a><span class="pill ${S.oral[t.id] >= 80 ? "good" : S.oral[t.id] >= 50 ? "warn" : ""} num">${S.oral[t.id]} %</span></div>`).join("<hr>")}</div></section>` : ""}
    `);
    return;
  }
  const t = T(EX.t);
  if (EX.phase === "answer") {
    view(`
      <a class="back" href="#" data-act="exreset">← Jiná otázka</a>
      <section class="card stack">
        <p class="eyebrow">Vylosovala sis</p>
        <div class="row"><span class="tnum">${t.num}</span><h1 style="font-size:1.4rem;flex:1;min-width:0">${esc(t.title)}</h1></div>
        <div class="zad"><p class="eyebrow">Na co se ptají</p><ul>${t.zadani.map(z => `<li>${esc(z)}</li>`).join("")}</ul></div>
      </section>
      <section class="card stack" style="align-items:center;text-align:center">
        <p class="eyebrow">Stopky</p>
        <span class="timer" id="timer">${fmtT(EX.sec)}</span>
        <div class="row" style="justify-content:center"><button class="btn" data-act="tgo">${TIMER ? "Pauza" : (EX.sec ? "Pokračovat" : "Spustit")}</button><button class="btn ghost" data-act="tzero">Vynulovat</button></div>
        <p class="small muted">U ústní zkoušky bývá na přípravu zhruba 15 minut a odpověď trvá pár minut.</p>
      </section>
      <button class="btn primary block" data-act="excheck">Hotovo – ukaž, co jsem měla říct</button>
    `);
    return;
  }
  // kontrola
  const checked = EX.checked;
  view(`
    <a class="back" href="#" data-act="exreset">← Jiná otázka</a>
    <section class="stack"><p class="eyebrow">Otázka ${t.num}</p><h1 style="font-size:1.4rem">${esc(t.title)}</h1>
    <p class="muted">Odškrtej body, které jsi řekla (i vlastními slovy).</p></section>
    <div class="stack" style="gap:8px">${t.osnova.map((o, i) => `<label class="check ${checked[i] ? "on" : ""}"><input type="checkbox" data-ex="${i}" ${checked[i] ? "checked" : ""}><span>${esc(o)}</span></label>`).join("")}</div>
    <div class="stack" style="gap:8px"><p class="eyebrow">Čísla, která je dobré zmínit</p><div class="chips">${t.key.map(k => `<span class="chip">${esc(k)}</span>`).join("")}</div></div>
    <div class="grid2"><button class="btn primary" data-act="exsave">Uložit výsledek</button><a class="btn" href="#otazka-${t.id}">Otevřít látku</a></div>
  `);
}
const fmtT = s => String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");

/* ===== ANGLIČTINA ===== */
let ENTAB = "slova";
function vEnglish() {
  const tabs = [["slova", "Slovíčka"], ["fraze", "Fráze"], ["ukazky", "Ukázkové popisy"], ["muj", "Můj popis"]];
  let body = "";
  if (ENTAB === "slova") {
    body = `<input type="search" id="ensearch" placeholder="Hledat slovíčko česky nebo anglicky" autocomplete="off"><div id="envocab" class="stack"></div>`;
  } else if (ENTAB === "fraze") {
    body = `<p class="muted">Z těchhle vět poskládáš popis jakéhokoliv výrobku.</p><div class="tbl"><table class="vocab"><thead><tr><th>Anglicky</th><th>Česky</th></tr></thead><tbody>${EN_PHRASES.map(p => `<tr><td><b>${esc(p[0])}</b></td><td>${esc(p[1])}</td></tr>`).join("")}</tbody></table></div>`;
  } else if (ENTAB === "ukazky") {
    body = `<p class="muted">Vyber si jeden nebo dva výrobky, které jsi dělala, a nauč se jejich popis skoro nazpaměť.</p>
      <div class="stack" style="gap:8px">${EN_SAMPLES.map(s => `<details class="sec"><summary><span>${esc(s.n)}</span></summary><div class="body"><p lang="en">${esc(s.en)}</p><details><summary class="small" style="cursor:pointer;font-weight:700;color:var(--accent)">Český překlad</summary><p class="note" style="margin-top:8px">${esc(s.cz)}</p></details></div></details>`).join("")}</div>`;
  } else {
    body = `<p class="muted">Napiš si tu vlastní popis svého výrobku (třeba dortu na zkoušku). Pomůžou ti fráze a ukázky.</p>
      <textarea id="entext" lang="en" style="min-height:220px" placeholder="My product is …">${esc(S.enText)}</textarea><p class="small muted">Ukládá se samo.</p>`;
  }
  view(`
    <a class="back" href="#otazky">← Otázky</a>
    <header class="stack" style="gap:6px"><h1>Angličtina</h1><p class="muted">U zkoušky budeš možná popisovat svůj výrobek anglicky: z čeho je, jak se dělá a jak chutná.</p></header>
    <div class="grid2"><button class="btn" data-act="enquiz">Kvíz ze slovíček</button><button class="btn" data-act="encards">Kartičky ze slovíček</button></div>
    <div class="seg">${tabs.map(t => `<button data-act="entab" data-v="${t[0]}" class="${ENTAB === t[0] ? "on" : ""}">${t[1]}</button>`).join("")}</div>
    ${body}
  `);
  if (ENTAB === "slova") renderVocab("");
}
function renderVocab(q) {
  const box = $("#envocab"); if (!box) return;
  const w = norm(q.trim());
  box.innerHTML = EN_VOCAB.map(g => {
    const rows = g.w.filter(x => !w || norm(x[0]).includes(w) || norm(x[1]).includes(w));
    if (!rows.length) return "";
    return `<div class="stack" style="gap:8px"><h2>${esc(g.g)}</h2><div class="tbl"><table class="vocab"><tbody>${rows.map(r => `<tr><td>${esc(r[0])}</td><td lang="en"><b>${esc(r[1])}</b></td></tr>`).join("")}</tbody></table></div></div>`;
  }).join("") || `<p class="muted">Nic nenalezeno.</p>`;
}

/* ===== TAHÁKY ===== */
function vCheat() {
  view(`
    <a class="back" href="#otazky">← Otázky</a>
    <header class="stack" style="gap:6px"><h1>Taháky</h1><p class="muted">Věci, které se opakují napříč otázkami – na jednom místě.</p></header>
    <div class="grid2"><button class="btn" data-act="gquiz">Kvíz ze zkratek a pojmů</button><button class="btn" data-act="gcards">Kartičky ze zkratek a pojmů</button></div>
    <div class="stack" style="gap:8px">
      <details class="sec" open><summary><span>Teploty a časy pečení</span></summary><div class="body">
        <div class="tbl"><table><thead><tr><th>Ot.</th><th>Co</th><th>Teplota</th><th>Čas</th></tr></thead><tbody>
        ${TEMPS.map(r => `<tr><td><a href="#otazka-${r[0]}">${r[0]}</a></td><td>${esc(r[1])}</td><td class="t">${esc(r[2])}</td><td class="t">${esc(r[3])}</td></tr>`).join("")}
        </tbody></table></div></div></details>
      <details class="sec"><summary><span>Čísla a poměry</span></summary><div class="body"><dl class="pairs">${NUMBERS.map(n => `<dt>${esc(n[0])}</dt><dd>${esc(n[1])}</dd>`).join("")}</dl></div></details>
      <details class="sec"><summary><span>Zkratky a pojmy</span></summary><div class="body"><dl class="pairs">${GLOSSARY.map(n => `<dt>${esc(n[0])}</dt><dd>${esc(n[1])}</dd>`).join("")}</dl></div></details>
      <details class="sec"><summary><span>Krémy a polevy, které se opakují</span></summary><div class="body"><dl class="pairs">${RECIPES.map(n => `<dt>${esc(n[0])}</dt><dd>${esc(n[1])}</dd>`).join("")}</dl></div></details>
      <details class="sec"><summary><span>Šlehání × tření</span></summary><div class="body"><dl class="pairs">
        <dt>Šlehání</dt><dd>tekuté suroviny (vejce, bílky) – vytváříme pěnu</dd>
        <dt>Tření</dt><dd>tužší suroviny (tuk s cukrem, žloutky)</dd>
        <dt>Cukr do šlehaných hmot</dt><dd>krupice – krystal se špatně rozpouští, moučka moc rychle</dd>
        <dt>Mouka</dt><dd>vždy prosejeme – provzdušnění a odstranění nečistot</dd>
      </dl></div></details>
    </div>
  `);
}

/* ===== POZNÁMKY ===== */
function vNotes() {
  const withNotes = ORDERED.filter(t => (S.notes[t.id] || "").trim());
  view(`
    <header class="stack" style="gap:6px"><h1>Poznámky</h1><p class="muted">Tvůj blok. Píšeš a ukládá se to samo.</p></header>
    <section class="card stack"><h2>Obecné poznámky</h2>
      <textarea id="note-g" style="min-height:220px" placeholder="Termíny, co říkala učitelka, co si chci zopakovat…">${esc(S.general)}</textarea></section>
    <section class="stack"><h2>Poznámky u otázek</h2>
      ${withNotes.length ? withNotes.map(t => `<a class="card stack" href="#otazka-${t.id}" style="text-decoration:none;color:inherit;gap:4px"><span class="eyebrow">Otázka ${t.num}</span><b>${esc(t.title)}</b><span class="small muted" style="white-space:pre-line">${esc(S.notes[t.id].slice(0, 220))}${S.notes[t.id].length > 220 ? "…" : ""}</span></a>`).join("") : `<p class="muted small">Zatím žádné. Poznámku k otázce napíšeš dole na stránce každé otázky.</p>`}
    </section>
  `);
}

/* ===== NASTAVENÍ ===== */
let RESET_ARM = false;
function vSettings() {
  RESET_ARM = false;
  view(`
    <header class="stack" style="gap:6px"><h1>Nastavení a záloha</h1></header>
    <section class="card stack"><h2>Datum zkoušek</h2>
      <input type="date" id="exam" value="${esc(S.exam)}"><p class="small muted">Až budeš znát přesné datum, změň ho tady.</p></section>
    <section class="card stack"><h2>Záloha</h2>
      <p class="small">Pokrok a poznámky se ukládají jen v tomhle prohlížeči. Na mobilu a na počítači jsou zvlášť. Zálohou je přeneseš: zkopíruj ji na jednom zařízení, pošli si ji (třeba zprávou) a vlož ji na druhém.</p>
      <button class="btn" data-act="backup">Zkopírovat zálohu</button>
      <textarea id="bk" placeholder="Sem vlož zkopírovanou zálohu…" style="min-height:90px"></textarea>
      <button class="btn" data-act="restore">Obnovit ze zálohy</button>
    </section>
    <section class="card stack"><h2>Začít znovu</h2>
      <p class="small muted">Smaže pokrok v kartičkách, kvízech a výsledky. Poznámky zůstanou.</p>
      <button class="btn" data-act="reset" id="resetb">Smazat pokrok</button></section>
  `);
}
/* ===== AKCE ===== */
const ACT = {
  learned(b) { S.status[b.dataset.t] = 2; S.focus = null; save(); toast("Super! Jdeme na další otázku."); route(); },
  hideguide() { S.hideGuide = true; save(); route(); },
  showguide() { S.hideGuide = false; save(); go("domu"); },
  toprac() { const el = $("#prac"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); },
  quick() { startQuiz("all", 10); },
  cardsall() { startCards("all", true); },
  mistakes() { if (!Object.keys(S.mistakes).length) { toast("Zatím nemáš žádné chyby."); return; } startQuiz("chyby", 0); },
  status(b) { const t = S.last; S.status[t] = +b.dataset.v; save(); $$(".seg button[data-act=status]").forEach(x => x.classList.toggle("on", x === b)); },
  expand(b) { const all = $$("details.sec"); const open = !all.every(d => d.open); all.forEach(d => d.open = open); b.textContent = open ? "Sbalit vše" : "Rozbalit vše"; },
  tquiz(b) { PK.scope = "t:" + b.dataset.t; startQuiz(PK.scope, 0); },
  tcards(b) { PK.scope = "t:" + b.dataset.t; startCards(PK.scope, false); },
  texam(b) { EX = { t: b.dataset.t, phase: "answer", sec: 0, checked: {} }; go("naostro"); },
  scope(b) { PK.scope = b.dataset.s; route(); },
  qn(b) { PK.n = +b.dataset.n; $$("[data-act=qn]").forEach(x => x.classList.toggle("on", x === b)); },
  startquiz() { startQuiz(PK.scope, PK.n); },
  ans(b) {
    if (QZ.done) return;
    const q = QZ.list[QZ.i], i = +b.dataset.i, ok = q.opts[i] === q.correct;
    $$(".opt").forEach((x, k) => { x.disabled = true; if (q.opts[k] === q.correct) x.classList.add("ok"); });
    if (!ok) b.classList.add("no");
    feedback(ok, ok ? "" : "Správně je: " + esc(q.correct) + ".");
    record(ok);
  },
  checkmatch() {
    if (QZ.done) return;
    const q = QZ.list[QZ.i];
    const vals = q.pairs.map((p, i) => { const v = $("#m" + i).value; return v === "" ? "" : q.choices[+v]; });
    if (vals.some(v => !v)) { toast("Vyber příčinu u všech vad."); return; }
    let ok = true;
    q.pairs.forEach((p, i) => {
      const s = $("#m" + i), good = vals[i] === p[1]; s.disabled = true; s.classList.add(good ? "ok" : "no");
      if (!good) { ok = false; const f = $("#mf" + i); f.hidden = false; f.textContent = "Správně: " + p[1]; }
    });
    $("[data-act=checkmatch]").hidden = true;
    feedback(ok);
    record(ok);
  },
  ord(b) {
    if (QZ.done) return;
    const q = QZ.list[QZ.i]; q.picked.push(q.shuf[+b.dataset.v]);
    if (q.picked.length === q.items.length) {
      const ok = q.picked.join("|") === q.items.join("|");
      QZ.done = true; renderOrder();
      feedback(ok, ok ? "" : "Správné pořadí: " + q.items.map((x, i) => (i + 1) + ". " + esc(x)).join(" · "));
      QZ.done = false; record(ok);
    } else renderOrder();
  },
  ordreset() { const q = QZ.list[QZ.i]; q.picked = []; renderOrder(); },
  next() { QZ.i++; route(); },
  retry() { const w = QZ.wrong; QZ.saved = false; startQuiz("retry", 0, w); },
  again() { startQuiz(QZ.scope === "retry" ? "all" : QZ.scope, QZ.scope === "chyby" ? 0 : (PK.n || 0)); },
  startcards() { startCards(PK.scope, CPK.only); },
  flip() { CS.flip = !CS.flip; $(".flash").classList.toggle("flip", CS.flip); $("#rate").hidden = !CS.flip; $("#rateh").hidden = CS.flip; },
  rate(b) { const v = +b.dataset.v, c = CS.list[CS.i]; S.cards[c.id] = v; CS.r[v - 1]++; save(); CS.i++; CS.flip = false; route(); },
  cardsagain() { startCards(CS.scope, true); },
  draw() { const t = ORDERED[Math.random() * ORDERED.length | 0]; EX = { t: t.id, phase: "answer", sec: 0, checked: {} }; route(); },
  exreset() { stopTimer(); EX = null; route(); },
  tgo(b) {
    if (TIMER) { stopTimer(); b.textContent = "Pokračovat"; return; }
    TIMER = setInterval(() => { EX.sec++; const el = $("#timer"); if (el) el.textContent = fmtT(EX.sec); }, 1000);
    b.textContent = "Pauza";
  },
  tzero() { stopTimer(); EX.sec = 0; route(); },
  excheck() { stopTimer(); EX.phase = "check"; route(); },
  exsave() {
    const t = T(EX.t), n = t.osnova.length, sc = Object.values(EX.checked).filter(Boolean).length, pct = Math.round(sc / n * 100);
    S.oral[t.id] = pct; S.history.push({ d: Date.now(), s: "Otázka " + t.num, sc, n, k: "oral" }); S.history = S.history.slice(-40); save();
    toast("Uloženo: " + sc + " z " + n + " bodů");
    EX = null; route();
  },
  entab(b) { ENTAB = b.dataset.v; route(); },
  enquiz() { startQuiz("en", 10); },
  encards() { startCards("en", true); },
  gquiz() { startQuiz("pojmy", 10); },
  gcards() { startCards("pojmy", true); },
  backup() {
    const data = JSON.stringify(S);
    const fallback = () => { const t = $("#bk"); t.value = data; t.focus(); t.select(); toast("Záloha je v políčku – zkopíruj ji."); };
    try { navigator.clipboard.writeText(data).then(() => toast("Záloha zkopírovaná."), fallback); } catch (e) { fallback(); }
  },
  restore() {
    const v = $("#bk").value.trim(); if (!v) { toast("Nejdřív vlož zálohu do políčka."); return; }
    try { const d = JSON.parse(v); if (typeof d !== "object" || !d) throw 0; S = Object.assign(defState(), d); save(); toast("Záloha obnovena."); go("domu"); }
    catch (e) { toast("Tohle nevypadá jako záloha. Zkopíruj ji celou."); }
  },
  reset(b) {
    if (!RESET_ARM) { RESET_ARM = true; b.textContent = "Opravdu smazat? Klikni znovu"; b.style.borderColor = "var(--bad)"; b.style.color = "var(--bad)"; return; }
    const keep = { notes: S.notes, general: S.general, enText: S.enText, exam: S.exam };
    S = Object.assign(defState(), keep); save(); toast("Pokrok smazán."); go("domu");
  }
};
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]");
  if (!b || b.disabled) return;
  const f = ACT[b.dataset.act]; if (!f) return;
  if (b.tagName === "A") e.preventDefault();
  f(b, e);
});
document.addEventListener("change", e => {
  const el = e.target;
  if (el.id === "tsel" && el.value) { PK.scope = el.value; route(); }
  if (el.id === "focussel" && el.value) { S.focus = el.value; if ((S.status[el.value] || 0) === 2) S.status[el.value] = 1; save(); route(); }
  if (el.id === "exsel" && el.value) { EX = { t: el.value, phase: "answer", sec: 0, checked: {} }; route(); }
  if (el.id === "exam" && el.value) { S.exam = el.value; save(); toast("Datum uloženo."); }
  if (el.id === "only") { CPK.only = el.checked; $("#onlyl").classList.toggle("on", el.checked); }
  if (el.dataset && el.dataset.ex != null) { EX.checked[el.dataset.ex] = el.checked; el.closest(".check").classList.toggle("on", el.checked); }
});
let saveT = null;
document.addEventListener("input", e => {
  const el = e.target;
  if (el.id === "search") return renderTopicList(el.value);
  if (el.id === "ensearch") return renderVocab(el.value);
  if (el.id === "note-t") S.notes[el.dataset.t] = el.value;
  else if (el.id === "note-g") S.general = el.value;
  else if (el.id === "entext") S.enText = el.value;
  else return;
  clearTimeout(saveT); saveT = setTimeout(save, 400);
});
document.addEventListener("keydown", e => {
  if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  const h = location.hash.slice(1);
  if (h === "karticky-hra" && CS && CS.i < CS.list.length) {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); ACT.flip(); }
    else if (CS.flip && ["1", "2", "3"].includes(e.key)) { const b = $(`[data-act=rate][data-v="${e.key}"]`); if (b) ACT.rate(b); }
  }
  if (h === "kviz-hra" && QZ && QZ.i < QZ.list.length) {
    const q = QZ.list[QZ.i];
    if (!QZ.done && (q.type === "mc" || q.type === "tf")) { const i = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 }[e.key.toLowerCase()]; const b = $$(".opt")[i]; if (b) ACT.ans(b); }
    else if (QZ.done && e.key === "Enter") { e.preventDefault(); ACT.next(); }
  }
});
window.addEventListener("hashchange", route);
route();
