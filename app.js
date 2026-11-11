/* ═══════════════════════════════════════════════════════
   TrendPulse Timeline App
   Rendert Events als Jahres-Accordion, steuert Filter, Suche,
   Szenario, Hellseher Modus und Modal.
   ═══════════════════════════════════════════════════════ */

(() => {
  "use strict";

  // ─────────────────────────────────────────────────────
  // CONFIG
  // ─────────────────────────────────────────────────────
  // Pro Jahr dürfen höchstens so viele Events "large" sein. Wer mehr als
  // eine Handvoll groß macht, macht nichts mehr groß.
  const MAX_LARGE_PER_YEAR = 4;
  // Ab so vielen Events pro Jahr werden Monatsmarker eingezogen.
  const MONTH_MARKER_THRESHOLD = 12;
  // "now" umfasst den aktuellen Monat plus je einen davor und danach.
  const NOW_WINDOW = 1;

  const NOW_INDEX = CURRENT_YEAR * 12 + CURRENT_MONTH;

  // ─────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────
  const state = {
    typeFilter: "all",       // all | past | now | forecast | vision
    activePillars: new Set(Object.keys(PILLAR_META)),
    search: "",
    hellseher: false,
    scenario: 50,            // 0 = Dystopie, 100 = Utopie
    scenarioBandwidth: 25,   // Events innerhalb +/- dieses Werts bleiben sichtbar
  };

  // ─────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const MONTHS_DE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  const MONTHS_FULL_DE = ["Januar", "Februar", "März", "April", "Mai", "Juni",
                          "Juli", "August", "September", "Oktober", "November", "Dezember"];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Alle Datenfelder laufen durch innerHTML, deshalb hier escapen.
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function debounce(fn, ms) {
    let t = null;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  function formatDate(year, month, day) {
    if (day) return `${day}. ${MONTHS_DE[month - 1]} ${year}`;
    return `${MONTHS_DE[month - 1]} ${year}`;
  }

  function confidenceClass(c) {
    if (c == null) return "";
    if (c >= 70) return "high";
    if (c >= 45) return "mid";
    if (c >= 25) return "low";
    return "very-low";
  }

  function relativeTime(targetYear, targetMonth) {
    const months = (targetYear * 12 + targetMonth) - NOW_INDEX;
    if (months < 0) return "vorbei";
    if (months === 0) return "diesen Monat";
    if (months === 1) return "1 Monat";
    if (months < 12) return `${months} Monaten`;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    if (years < 5 && rem) return `${years} J. ${rem} Mon.`;
    return `${years} Jahren`;
  }

  // ─────────────────────────────────────────────────────
  // DATENAUFBEREITUNG
  // Typ und Größe werden abgeleitet, nicht von Hand gepflegt.
  // ─────────────────────────────────────────────────────

  // "vision" ist eine Aussage über Spekulation, nicht über Zeit, und bleibt
  // deshalb manuell. Alles andere ergibt sich aus dem Datum. Damit werden
  // Events automatisch zu "past", sobald sie vorbei sind.
  function deriveType(ev) {
    if (ev.type === "vision") return "vision";
    const delta = (ev.year * 12 + (ev.month || 1)) - NOW_INDEX;
    if (delta < -NOW_WINDOW) return "past";
    if (delta <= NOW_WINDOW) return "now";
    return "forecast";
  }

  // Rang für das Large-Budget: bestätigt und kuratiert schlägt vage Prognose.
  function importance(ev) {
    let score = ev.confidence != null ? ev.confidence : 50;
    if (ev.confirmed) score += 25;
    if (Array.isArray(ev.impact) && ev.impact.length) score += 15;
    if (ev.pillar === "nader") score += 30;
    return score;
  }

  function buildEvents() {
    const prepared = TIMELINE_EVENTS.map(ev => ({
      ...ev,
      month: ev.month || 1,
      size: ev.size || "medium",
      type: deriveType(ev),
      authoredType: ev.type,
      curatedImpact: Array.isArray(ev.impact) && ev.impact.length > 0,
    }));

    // Large-Budget pro Jahr durchsetzen, sonst ist jedes dritte Event "groß".
    const byYear = new Map();
    prepared.forEach(ev => {
      if (!byYear.has(ev.year)) byYear.set(ev.year, []);
      byYear.get(ev.year).push(ev);
    });
    byYear.forEach(list => {
      list.filter(e => e.size === "large")
        .sort((a, b) => importance(b) - importance(a))
        .slice(MAX_LARGE_PER_YEAR)
        .forEach(e => { e.size = "medium"; });
    });

    prepared.sort((a, b) =>
      (a.year - b.year) || (a.month - b.month) || ((a.day || 1) - (b.day || 1))
    );
    prepared.forEach((ev, i) => { ev.id = i; });
    return prepared;
  }

  const EVENTS = buildEvents();
  const SCENARIO_EVENT_COUNT = EVENTS.filter(e => e.scenario != null).length;
  const rowById = new Map();

  // ─────────────────────────────────────────────────────
  // IMPACT GENERATOR — Was könnte passieren?
  // Nur Fallback. Kuratierte Impacts aus den Daten gewinnen immer.
  // ─────────────────────────────────────────────────────
  const IMPACT_TEMPLATES = {
    tech: [
      "Neue Use Cases entstehen schneller als Regulatoren mitkommen",
      "Berliner Tech Szene zieht frisches Talent und Kapital an",
      "Investorenklima dreht je nach Outcome scharf in eine Richtung",
      "Bestehende Produkt-Stacks werden über Nacht obsolet",
    ],
    pop: [
      "Globaler Aufmerksamkeits-Spike. Social Media Trends drehen für Wochen",
      "Merchandising und Streaming Wellen reichen 6+ Monate weiter",
      "Generation Z Memes definieren das Event neu und viral",
      "TV Quoten und Sponsoring Deals brechen Rekorde",
    ],
    culture: [
      "Gesellschaftlicher Diskurs verschiebt sich nachhaltig",
      "Wahlpolitische Effekte spürbar in den kommenden Quartalen",
      "Medien Echo läuft wochenlang, Bildungssektor adaptiert das Thema",
      "Generationen Konflikt um Interpretation flammt auf",
    ],
    business: [
      "Aktienkurse betroffener Sektoren reagieren binnen 24 Stunden",
      "M&A Aktivität in adjacenten Industrien beschleunigt",
      "Wettbewerber müssen Strategie öffentlich anpassen",
      "Neue Geschäftsmodelle entstehen in der Lücke",
    ],
    banking: [
      "Zinspfade neu kalibriert. Märkte preisen Risiko um",
      "Kapitalflüsse zwischen Asset Klassen ändern sich",
      "Banken Compliance Abteilungen werden überrumpelt",
      "Privatanleger Verhalten dreht innerhalb einer Woche",
    ],
    crypto: [
      "BTC und ETH Volatilität spürbar in 48h Fenster",
      "Regulatorische Reaktionen in mindestens 3 G20 Ländern folgen",
      "DeFi TVL und Stablecoin Volume reagieren scharf",
      "On Chain Aktivität explodiert. Gas Fees ziehen an",
    ],
    marketing: [
      "Brands müssen Tone und Message in Echtzeit anpassen",
      "Werbe Budgets shiften zwischen Kanälen über Nacht",
      "Creator Economy passt sich an. Neue Nischen entstehen",
      "Performance Metriken werden neu kalibriert",
    ],
    design: [
      "Visual Language Standards verschieben sich",
      "Tools die das Pattern unterstützen werden Standard",
      "Portfolios und Case Studies global aktualisiert",
      "Junior Designer lernen neue Skills oder werden ersetzt",
    ],
    nader: [
      "Persönliche Standortbestimmung erzwungen",
      "Business Modell Pivot Option auf dem Tisch",
      "Network Effekte werden sichtbar und nutzbar",
      "Rückblick zeigt was wirklich getragen hat",
    ],
  };

  function generateImpacts(ev) {
    const pool = IMPACT_TEMPLATES[ev.pillar] || IMPACT_TEMPLATES.tech;
    // Deterministisch, damit dasselbe Event immer dieselben Impacts zeigt.
    const hash = (ev.year * 13 + ev.month * 7 + (ev.title || "").length) % pool.length;
    const picks = [
      pool[hash],
      pool[(hash + 1) % pool.length],
      pool[(hash + 2) % pool.length],
    ];
    if (ev.type === "vision") picks.unshift("Spekulativ. Wenn dieses Szenario eintritt:");
    if (ev.type === "past") picks.unshift("Rückwirkend bewertet:");
    return picks.slice(0, 4);
  }

  function impactsFor(ev) {
    return ev.curatedImpact ? ev.impact : generateImpacts(ev);
  }

  // ─────────────────────────────────────────────────────
  // PILLAR CHIPS
  // ─────────────────────────────────────────────────────
  function renderPillarChips() {
    const container = $("#pillarChips");
    container.innerHTML = "";
    Object.entries(PILLAR_META).forEach(([key, meta]) => {
      const count = EVENTS.filter(e => e.pillar === key).length;
      const btn = document.createElement("button");
      btn.className = "chip active";
      btn.dataset.pillar = key;
      btn.title = "Klick: an und aus · Doppelklick: nur diese Kategorie";
      btn.innerHTML = `
        <span class="dot-color" style="background:${esc(meta.bg)}; border: 1px solid rgba(0,0,0,0.08)"></span>
        ${esc(meta.label)}
        <span class="chip-count">${count}</span>
      `;
      btn.addEventListener("click", () => togglePillar(key));
      btn.addEventListener("dblclick", (e) => {
        e.preventDefault();
        soloPillar(key);
      });
      container.appendChild(btn);
    });
  }

  function syncPillarChips() {
    $$('.chip[data-pillar]').forEach(btn => {
      btn.classList.toggle("active", state.activePillars.has(btn.dataset.pillar));
    });
  }

  function togglePillar(key) {
    if (state.activePillars.has(key)) state.activePillars.delete(key);
    else state.activePillars.add(key);
    syncPillarChips();
    applyFilters();
  }

  function soloPillar(key) {
    state.activePillars = new Set([key]);
    syncPillarChips();
    applyFilters();
  }

  function setAllPillars(on) {
    state.activePillars = on ? new Set(Object.keys(PILLAR_META)) : new Set();
    syncPillarChips();
    applyFilters();
  }

  // ─────────────────────────────────────────────────────
  // TIMELINE RENDER
  // ─────────────────────────────────────────────────────
  function nowMomentEl() {
    const el = document.createElement("div");
    el.className = "now-moment-marker";
    el.id = "now-moment";
    el.innerHTML = `
      <div class="now-moment-pulse"></div>
      <div class="now-moment-label">
        <span class="now-moment-dot"></span>
        Heute · ${CURRENT_DAY}. ${MONTHS_FULL_DE[CURRENT_MONTH - 1]} ${CURRENT_YEAR}
      </div>
    `;
    return el;
  }

  const eventWord = (n) => `${n} ${n === 1 ? "Event" : "Events"}`;

  function yearMarkerEl(year, list) {
    const marker = document.createElement("div");
    marker.className = `year-marker ${year % 10 === 0 ? "decade" : ""} ${year === CURRENT_YEAR ? "now-marker" : ""}`;
    marker.dataset.year = year;
    marker.setAttribute("role", "button");
    marker.setAttribute("tabindex", "0");
    marker.setAttribute("aria-label", `Jahr ${year}, ${eventWord(list.length)}, aufklappen oder zuklappen`);

    const dots = [...new Set(list.map(e => e.pillar))]
      .map(p => `<span class="year-dot" style="background:${esc(PILLAR_META[p].bg)}" title="${esc(PILLAR_META[p].label)}"></span>`)
      .join("");

    marker.innerHTML = `
      <span class="year">${year}</span>
      <span class="year-meta">
        <span class="year-count">${eventWord(list.length)}</span>
        <span class="year-dots">${dots}</span>
      </span>
      <span class="year-chev" aria-hidden="true">▾</span>
    `;
    return marker;
  }

  function eventRowEl(ev) {
    const meta = PILLAR_META[ev.pillar];
    const row = document.createElement("div");
    row.className = `event-row ${ev.side} ${ev.type} ${ev.pillar === "nader" ? "is-nader" : ""} ${ev.confirmed ? "is-confirmed" : ""}`;
    row.dataset.year = ev.year;
    row.dataset.month = ev.month;
    row.dataset.pillar = ev.pillar;
    row.dataset.type = ev.type;
    row.dataset.eventId = ev.id;
    if (ev.confirmed) row.dataset.confirmed = "true";
    if (ev.confidence != null) row.dataset.confidenceClass = confidenceClass(ev.confidence);
    if (ev.scenario != null) row.dataset.scenario = ev.scenario;

    const card = document.createElement("div");
    card.className = `event-card size-${ev.size} is-${ev.type} ${ev.confirmed ? "is-confirmed" : ""}`;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    const confidenceHTML = ev.confidence != null
      ? `<div class="confidence-ring ${confidenceClass(ev.confidence)}" title="${ev.confidence}% Confidence">${ev.confidence}</div>`
      : "";
    const confirmedBadge = ev.confirmed ? `<div class="confirmed-badge">✓ Bestätigt</div>` : "";

    if (ev.size === "small") {
      // Small Cards tragen keine Impact-Liste. Die steckt im Modal, sonst
      // platzt die Karte. h3 und Datum liegen in card-content, damit sie
      // nicht als horizontale Flex-Siblings überlappen.
      card.innerHTML = `
        ${confidenceHTML}
        <div class="card-head">
          <span class="pillar-chip pillar-${ev.pillar}">${meta.emoji}</span>
          <div class="card-content">
            ${confirmedBadge}
            <span class="date">${formatDate(ev.year, ev.month, ev.day)}</span>
            <h3>${esc(ev.title)}</h3>
          </div>
        </div>
        <p>${esc(ev.desc)}</p>
      `;
    } else {
      const impacts = impactsFor(ev);
      const impactLabel = !ev.curatedImpact ? "💡 Mögliche Effekte · automatisch"
        : ev.type === "past" ? "💡 Was es bewirkt" : "💡 Was könnte passieren?";
      card.innerHTML = `
        ${confidenceHTML}
        ${confirmedBadge}
        <div class="card-head">
          <span class="pillar-chip pillar-${ev.pillar}">${meta.emoji}<span class="pillar-label"> ${esc(meta.label)}</span></span>
          <span class="date">${formatDate(ev.year, ev.month, ev.day)}</span>
        </div>
        <h3>${esc(ev.title)}</h3>
        <p>${esc(ev.desc)}</p>
        <div class="impact-section ${ev.curatedImpact ? "" : "is-generated"}">
          <button class="impact-toggle" type="button" aria-expanded="false">
            ${impactLabel}
            <span class="chev" aria-hidden="true">▼</span>
          </button>
          <ul class="impact-list">
            ${impacts.map(i => `<li>${esc(i)}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    const dot = document.createElement("div");
    dot.className = "event-dot";
    row.appendChild(dot);
    row.appendChild(card);
    rowById.set(ev.id, row);
    return row;
  }

  function renderTimeline() {
    const container = $("#timelineEvents");
    container.innerHTML = "";
    rowById.clear();
    const frag = document.createDocumentFragment();

    const years = [...new Set(EVENTS.map(e => e.year))].sort((a, b) => a - b);
    let nowMomentPlaced = false;

    years.forEach(year => {
      const list = EVENTS.filter(e => e.year === year);

      const block = document.createElement("section");
      block.className = "year-block";
      block.dataset.year = year;
      if (year < CURRENT_YEAR) block.classList.add("is-past-year");
      if (year === CURRENT_YEAR) block.classList.add("is-now-year");
      // Nur das aktuelle und das nächste Jahr stehen offen. Der Rest wäre
      // sonst eine Scrollstrecke, die niemand liest.
      if (year !== CURRENT_YEAR && year !== CURRENT_YEAR + 1) block.classList.add("collapsed");

      const marker = yearMarkerEl(year, list);
      marker.setAttribute("aria-expanded", String(!block.classList.contains("collapsed")));
      block.appendChild(marker);

      const body = document.createElement("div");
      body.className = "year-body";

      const withMonths = list.length >= MONTH_MARKER_THRESHOLD;
      let lastMonth = null;
      let nowInYear = false;

      list.forEach(ev => {
        if (withMonths && ev.month !== lastMonth) {
          const m = document.createElement("div");
          m.className = "month-marker";
          m.dataset.month = ev.month;
          m.innerHTML = `<span>${MONTHS_FULL_DE[ev.month - 1]}</span>`;
          body.appendChild(m);
          lastMonth = ev.month;
        }
        if (year === CURRENT_YEAR && !nowInYear &&
            (ev.month > CURRENT_MONTH || (ev.month === CURRENT_MONTH && (ev.day || 1) >= CURRENT_DAY))) {
          nowInYear = true;
          nowMomentPlaced = true;
          body.appendChild(nowMomentEl());
        }
        body.appendChild(eventRowEl(ev));
      });

      // Liegen alle Events des aktuellen Jahres vor dem aktuellen Monat,
      // gehört der Jetzt-Marker ans Ende des Jahres.
      if (year === CURRENT_YEAR && !nowInYear) {
        nowMomentPlaced = true;
        body.appendChild(nowMomentEl());
      }

      block.appendChild(body);
      frag.appendChild(block);
    });

    container.appendChild(frag);

    // Gibt es für das aktuelle Jahr gar keine Events, steht der Marker
    // vor dem ersten Jahr, das in der Zukunft liegt.
    if (!nowMomentPlaced) {
      const nextBlock = $$(".year-block", container)
        .find(b => Number(b.dataset.year) > CURRENT_YEAR);
      if (nextBlock) container.insertBefore(nowMomentEl(), nextBlock);
      else container.appendChild(nowMomentEl());
    }
  }

  // ─────────────────────────────────────────────────────
  // ACCORDION
  // ─────────────────────────────────────────────────────
  function setYearOpen(block, open) {
    if (!block) return;
    block.classList.toggle("collapsed", !open);
    const marker = $(".year-marker", block);
    if (marker) marker.setAttribute("aria-expanded", String(open));
  }

  function expandYear(block) { setYearOpen(block, true); }

  function toggleYear(block) {
    setYearOpen(block, block.classList.contains("collapsed"));
  }

  function setAllYears(open, filterFn) {
    $$(".year-block").forEach(block => {
      if (filterFn && !filterFn(Number(block.dataset.year))) return;
      setYearOpen(block, open);
    });
  }

  // ─────────────────────────────────────────────────────
  // STATS
  // ─────────────────────────────────────────────────────
  function renderStats() {
    animateNumber($("#statTotal"), EVENTS.length);
    animateNumber($("#statPast"), EVENTS.filter(e => e.type === "past").length);
    animateNumber($("#statNow"), EVENTS.filter(e => e.type === "now").length);
    animateNumber($("#statForecast"), EVENTS.filter(e => e.type === "forecast").length);
    animateNumber($("#statVision"), EVENTS.filter(e => e.type === "vision").length);
  }

  function animateNumber(el, target) {
    if (!el) return;
    // requestAnimationFrame ist in einem Hintergrund-Tab gedrosselt. Ohne
    // diese Abkürzung bliebe der Zähler beim ersten Schritt stehen.
    if (prefersReducedMotion || document.hidden || target === 0) {
      el.textContent = target;
      return;
    }
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const tick = () => {
      current += step;
      if (current >= target) el.textContent = target;
      else {
        el.textContent = current;
        requestAnimationFrame(tick);
      }
    };
    tick();
  }

  // ─────────────────────────────────────────────────────
  // FILTER
  // ─────────────────────────────────────────────────────
  function matchesSearch(ev) {
    if (!state.search) return true;
    return `${ev.title} ${ev.desc}`.toLowerCase().includes(state.search);
  }

  function applyFilters() {
    let visible = 0;
    let scenarioHidden = 0;

    EVENTS.forEach(ev => {
      const row = rowById.get(ev.id);
      if (!row) return;
      let show = true;
      let opacity = 1;

      if (state.typeFilter !== "all" && ev.type !== state.typeFilter) show = false;
      if (show && !state.activePillars.has(ev.pillar)) show = false;
      if (show && !matchesSearch(ev)) show = false;

      // Der Szenario-Regler wirkt bewusst nur auf Events mit eigenem
      // Szenario-Wert. Bestätigte Termine sind Fakten, kein Szenario.
      if (show && ev.scenario != null) {
        const distance = Math.abs(ev.scenario - state.scenario);
        if (distance > state.scenarioBandwidth) {
          show = false;
          scenarioHidden++;
        } else {
          opacity = 1 - (distance / state.scenarioBandwidth) * 0.4;
        }
      }

      row.style.display = show ? "" : "none";
      row.style.opacity = opacity;
      if (show) visible++;
    });

    updateYearBlocks();
    updateFilterMeta(visible, scenarioHidden);
  }

  function updateYearBlocks() {
    $$(".year-block").forEach(block => {
      const rows = $$(".event-row", block);
      const shown = rows.filter(r => r.style.display !== "none");
      const count = shown.length;

      block.classList.toggle("year-empty", count === 0);

      const countEl = $(".year-count", block);
      if (countEl) {
        countEl.textContent = count === rows.length
          ? eventWord(rows.length)
          : `${count} von ${rows.length}`;
      }

      // Monatsmarker ohne sichtbare Events wären leere Überschriften.
      $$(".month-marker", block).forEach(m => {
        const any = rows.some(r => r.dataset.month === m.dataset.month && r.style.display !== "none");
        m.style.display = any ? "" : "none";
      });

      // Bei aktiver Suche bringt ein zugeklapptes Jahr den Treffer nicht ans Licht.
      if (state.search && count > 0) expandYear(block);
    });
  }

  function updateFilterMeta(visible, scenarioHidden) {
    const countEl = $("#filterCount");
    if (countEl) {
      let text = visible === EVENTS.length
        ? `Alle ${EVENTS.length} Events`
        : `${visible} von ${EVENTS.length} Events`;
      if (scenarioHidden > 0) text += ` · Szenario blendet ${scenarioHidden} aus`;
      countEl.textContent = text;
    }
    const resetBtn = $("#filterReset");
    if (resetBtn) resetBtn.hidden = isDefaultFilter();
    const empty = $("#emptyState");
    if (empty) empty.hidden = visible > 0;
  }

  function isDefaultFilter() {
    return state.typeFilter === "all"
      && state.search === ""
      && state.activePillars.size === Object.keys(PILLAR_META).length
      && state.scenario === 50;
  }

  function resetFilters() {
    state.typeFilter = "all";
    state.search = "";
    state.activePillars = new Set(Object.keys(PILLAR_META));
    state.scenario = 50;

    const searchInput = $("#searchInput");
    if (searchInput) searchInput.value = "";
    const slider = $("#sliderInput");
    if (slider) slider.value = 50;
    updateScenarioUI(50);
    syncPillarChips();
    $$('.chip[data-filter]').forEach(c => {
      const isAll = c.dataset.filter === "all";
      c.classList.toggle("active", isAll);
      c.classList.toggle("yellow", isAll);
    });
    applyFilters();
  }

  function setTypeFilter(filter, btn) {
    state.typeFilter = filter;
    $$('.chip[data-filter]').forEach(c => c.classList.remove("active", "yellow"));
    btn.classList.add("active");
    if (filter === "all") btn.classList.add("yellow");
    applyFilters();
  }

  // ─────────────────────────────────────────────────────
  // SZENARIO SLIDER
  // ─────────────────────────────────────────────────────
  const SCENARIO_MOODS = [
    { min: 0,  max: 10,  mood: "dystopia", emoji: "🌑", label: "Pure Dystopie",     sub: "Die dunkelste Zukunft. Klima Kollaps, AI Übernahme, autoritäre Welten." },
    { min: 11, max: 25,  mood: "dystopia", emoji: "🌫️", label: "Sehr Dunkel",       sub: "Krisen häufen sich. Klima, Wirtschaft, Demokratie schwächeln gleichzeitig." },
    { min: 26, max: 40,  mood: "dark",     emoji: "🌒", label: "Eher Pessimistisch", sub: "Vieles geht schief. Aber Inseln der Hoffnung existieren." },
    { min: 41, max: 55,  mood: "mix",      emoji: "🌗", label: "Realistic Mix",     sub: "Wahrscheinlichste Zukunft. Licht und Schatten gleichmäßig verteilt." },
    { min: 56, max: 70,  mood: "mix",      emoji: "🌓", label: "Vorsichtig Optimistisch", sub: "Es gibt Probleme, aber wir lösen sie. Schritt für Schritt." },
    { min: 71, max: 85,  mood: "bright",   emoji: "🌤️", label: "Sehr Hell",          sub: "Klima Wende klappt. Demokratie blüht. Tech löst real Probleme." },
    { min: 86, max: 100, mood: "utopia",   emoji: "☀️", label: "Pure Utopie",        sub: "Best Case. Post Knappheit. Heilung. Frieden. Multi planetare Menschheit." },
  ];

  function getMood(value) {
    return SCENARIO_MOODS.find(m => value >= m.min && value <= m.max) || SCENARIO_MOODS[3];
  }

  function updateScenarioUI(value) {
    const mood = getMood(value);
    $("#sliderValue").textContent = value;
    $("#sliderEmoji").textContent = mood.emoji;
    $("#sliderHeadline").textContent = mood.label;
    $("#sliderSub").textContent = mood.sub;
    $("#scenarioSlider").dataset.mood = mood.mood;

    if (!prefersReducedMotion) {
      const emojiEl = $("#sliderEmoji");
      emojiEl.style.transform = "scale(1.2) rotate(-8deg)";
      setTimeout(() => { emojiEl.style.transform = ""; }, 200);
    }
  }

  function setupScenarioSlider() {
    const slider = $("#sliderInput");
    updateScenarioUI(state.scenario);

    const note = $("#sliderNote");
    if (note) {
      note.innerHTML = `Der Regler wirkt nur auf die <strong>${SCENARIO_EVENT_COUNT}</strong> spekulativen Szenario-Events. Bestätigte Termine und Vergangenes bleiben immer sichtbar.`;
    }

    // Ohne Debounce läuft bei jedem Pixel ein kompletter Filterdurchlauf.
    const runFilter = debounce(applyFilters, 90);
    slider.addEventListener("input", (e) => {
      state.scenario = parseInt(e.target.value, 10);
      updateScenarioUI(state.scenario);
      runFilter();
    });
  }

  // ─────────────────────────────────────────────────────
  // SUCHE
  // ─────────────────────────────────────────────────────
  function setupSearch() {
    const input = $("#searchInput");
    if (!input) return;
    const run = debounce(() => {
      state.search = input.value.trim().toLowerCase();
      applyFilters();
    }, 160);
    input.addEventListener("input", run);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        input.value = "";
        state.search = "";
        applyFilters();
        input.blur();
      }
    });
  }

  // ─────────────────────────────────────────────────────
  // NEXT EVENT CARD
  // ─────────────────────────────────────────────────────
  function updateNextEventCard() {
    // Tagesgenau: das nächste große Ereignis ab morgen, sonst das nächste überhaupt.
    const today = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, CURRENT_DAY);
    const dateOf = (e) => new Date(e.year, e.month - 1, e.day || 1);
    const upcoming = EVENTS
      .filter(e => e.type !== "past" && dateOf(e) > today)
      .sort((a, b) => dateOf(a) - dateOf(b));
    const next = upcoming.find(e => e.size === "large") || upcoming[0];
    if (!next) return;
    const days = Math.round((dateOf(next) - today) / 86400000);
    $("#nextEventTitle").textContent = next.title;
    $("#nextEventTime").textContent = days === 1 ? "1 Tag"
      : days < 45 ? `${days} Tagen` : relativeTime(next.year, next.month);
    $("#jumpToNext").addEventListener("click", () => jumpToYear(next.year));
  }

  // ─────────────────────────────────────────────────────
  // DECADE NAV — aus den Daten, nicht von Hand
  // ─────────────────────────────────────────────────────
  function renderDecadeNav() {
    const nav = $("#decadeNav");
    if (!nav) return;
    nav.innerHTML = "";
    const decades = [...new Set(EVENTS.map(e => Math.floor(e.year / 10) * 10))].sort((a, b) => a - b);
    const currentDecade = Math.floor(CURRENT_YEAR / 10) * 10;

    decades.forEach(d => {
      const firstYear = EVENTS.find(e => Math.floor(e.year / 10) * 10 === d).year;
      const btn = document.createElement("button");
      btn.dataset.year = String(firstYear);
      btn.dataset.decade = String(d);
      btn.textContent = d >= 2100 ? String(d) : `${String(d).slice(2)}s`;
      nav.appendChild(btn);

      if (d === currentDecade) {
        const now = document.createElement("button");
        now.dataset.year = String(CURRENT_YEAR);
        now.className = "now-btn";
        now.textContent = "NOW";
        nav.appendChild(now);
      }
    });

    nav.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (btn) jumpToYear(parseInt(btn.dataset.year, 10));
    });
  }

  function updateActiveDecade(year) {
    const decade = Math.floor(year / 10) * 10;
    $$(".decade-nav button").forEach(btn => {
      if (btn.classList.contains("now-btn")) {
        btn.classList.toggle("active", year === CURRENT_YEAR);
      } else {
        btn.classList.toggle("active", Number(btn.dataset.decade) === decade && year !== CURRENT_YEAR);
      }
    });
  }

  function jumpToYear(year) {
    const block = $(`.year-block[data-year="${year}"]`);
    if (block) expandYear(block);
    const target = (year === CURRENT_YEAR && $("#now-moment"))
      ? $("#now-moment")
      : $(`.year-marker[data-year="${year}"]`);
    if (!target) return;
    // Nach dem Ausklappen stimmt das alte Layout nicht mehr, daher ein Frame warten.
    requestAnimationFrame(() => {
      const top = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  // ─────────────────────────────────────────────────────
  // SCROLL
  // ─────────────────────────────────────────────────────
  let cardObs = null;

  function setupScrollObservers() {
    cardObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          cardObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "-40px" });

    $$(".event-card").forEach(c => cardObs.observe(c));

    const decadeObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) updateActiveDecade(parseInt(entry.target.dataset.year, 10));
      });
    }, { rootMargin: "-50% 0px -50% 0px" });

    $$(".year-marker").forEach(m => decadeObs.observe(m));
  }

  function setupScrollProgress() {
    const progress = $("#scrollProgress");
    const header = $("#header");
    const nowSticky = $("#nowSticky");

    function update() {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = Math.min(100, (scrollTop / docH) * 100) + "%";
      header.classList.toggle("scrolled", scrollTop > 12);

      const nowMarker = $(`.year-marker[data-year="${CURRENT_YEAR}"]`);
      if (nowMarker) {
        const markerTop = nowMarker.getBoundingClientRect().top;
        nowSticky.classList.toggle("visible", markerTop < 80 && scrollTop > 600);
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // ─────────────────────────────────────────────────────
  // MODAL
  // ─────────────────────────────────────────────────────
  let lastFocused = null;

  function openModal(ev) {
    const meta = PILLAR_META[ev.pillar];
    lastFocused = document.activeElement;

    $("#modalEyebrow").textContent = `${formatDate(ev.year, ev.month, ev.day)} · ${meta.label} · ${ev.type.toUpperCase()}`;
    $("#modalTitle").textContent = ev.title;

    const impacts = impactsFor(ev);
    const impactTitle = !ev.curatedImpact ? "Mögliche Effekte (automatisch generiert)"
      : ev.type === "past" ? "Was es bewirkt" : "Was könnte passieren?";
    const quellen = Array.isArray(ev.quellen) ? ev.quellen.filter(u => /^https:\/\//.test(u)) : [];
    const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };
    $("#modalBody").innerHTML = `
      <p>${esc(ev.desc)}</p>
      <div class="modal-impacts ${ev.curatedImpact ? "" : "is-generated"}">
        <h4>💡 ${impactTitle}</h4>
        <ul>${impacts.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
      </div>
      ${quellen.length ? `<div class="modal-quellen"><h4>Quellen</h4>${quellen.map(u =>
        `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(host(u))} ↗</a>`).join("")}</div>` : ""}
    `;

    const pills = [
      `<span class="pill">📅 ${formatDate(ev.year, ev.month, ev.day)}</span>`,
      `<span class="pill">${meta.emoji} ${esc(meta.label)}</span>`,
    ];
    if (ev.confidence != null) pills.push(`<span class="pill">🎯 ${ev.confidence}% Confidence</span>`);
    if (ev.confirmed) pills.push(`<span class="pill">✓ Bestätigter Termin</span>`);
    if (ev.type === "vision") pills.push(`<span class="pill">🔮 Hellseher Modus</span>`);
    if (ev.type === "now") {
      pills.push(`<span class="pill" style="background: var(--yellow); color: var(--ink); font-weight: 700">⚡ Aktuelles Signal</span>`);
    }
    const timeUntil = relativeTime(ev.year, ev.month);
    if (timeUntil !== "vorbei" && timeUntil !== "diesen Monat") {
      pills.push(`<span class="pill">⏳ in ${timeUntil}</span>`);
    }
    $("#modalMeta").innerHTML = pills.join("");

    $("#modalBg").classList.add("open");
    document.body.style.overflow = "hidden";
    $("#modalClose").focus();
  }

  function closeModal() {
    if (!$("#modalBg").classList.contains("open")) return;
    $("#modalBg").classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  }

  function trapFocus(e) {
    if (e.key !== "Tab") return;
    const modal = $("#modalBg .modal");
    const focusables = $$('button, [href], input, [tabindex]:not([tabindex="-1"])', modal);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // ─────────────────────────────────────────────────────
  // EVENT DELEGATION
  // Eine Handvoll Listener statt über 1000 einzelne.
  // ─────────────────────────────────────────────────────
  function setupDelegation() {
    const container = $("#timelineEvents");

    container.addEventListener("click", (e) => {
      const toggle = e.target.closest(".impact-toggle");
      if (toggle) {
        const section = toggle.closest(".impact-section");
        const open = section.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        return;
      }
      const marker = e.target.closest(".year-marker");
      if (marker) {
        toggleYear(marker.closest(".year-block"));
        return;
      }
      const row = e.target.closest(".event-row");
      if (row) openModal(EVENTS[Number(row.dataset.eventId)]);
    });

    container.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const marker = e.target.closest(".year-marker");
      if (marker) {
        e.preventDefault();
        toggleYear(marker.closest(".year-block"));
        return;
      }
      const card = e.target.closest(".event-card");
      if (card) {
        e.preventDefault();
        openModal(EVENTS[Number(card.closest(".event-row").dataset.eventId)]);
      }
    });
  }

  // ─────────────────────────────────────────────────────
  // HELLSEHER NEURAL VORTEX BACKGROUND (WebGL)
  // ─────────────────────────────────────────────────────
  const NEURO_VS = `
    precision mediump float;
    attribute vec2 a_position;
    varying vec2 vUv;
    void main() {
      vUv = .5 * (a_position + 1.);
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const NEURO_FS = `
    precision mediump float;
    varying vec2 vUv;
    uniform float u_time;
    uniform float u_ratio;
    uniform vec2 u_pointer_position;
    uniform float u_scroll_progress;

    vec2 rotate(vec2 uv, float th) {
      return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
    }

    float neuro_shape(vec2 uv, float t, float p) {
      vec2 sine_acc = vec2(0.);
      vec2 res = vec2(0.);
      float scale = 8.;
      for (int j = 0; j < 15; j++) {
        uv = rotate(uv, 1.);
        sine_acc = rotate(sine_acc, 1.);
        vec2 layer = uv * scale + float(j) + sine_acc - t;
        sine_acc += sin(layer) + 2.4 * p;
        res += (.5 + .5 * cos(layer)) / scale;
        scale *= (1.2);
      }
      return res.x + res.y;
    }

    void main() {
      vec2 uv = .5 * vUv;
      uv.x *= u_ratio;
      vec2 pointer = vUv - u_pointer_position;
      pointer.x *= u_ratio;
      float p = clamp(length(pointer), 0., 1.);
      p = .5 * pow(1. - p, 2.);
      float t = .001 * u_time;
      vec3 color = vec3(0.);
      float noise = neuro_shape(uv, t, p);
      noise = 1.2 * pow(noise, 3.);
      noise += pow(noise, 10.);
      noise = max(.0, noise - .5);
      noise *= (1. - length(vUv - .5));
      color = vec3(0.5, 0.15, 0.65);
      color = mix(color, vec3(0.02, 0.7, 0.9), 0.32 + 0.16 * sin(2.0 * u_scroll_progress + 1.2));
      color += vec3(0.15, 0.0, 0.6) * sin(2.0 * u_scroll_progress + 1.5);
      color = color * noise;
      gl_FragColor = vec4(color, noise);
    }
  `;

  let neuroGL = null;
  let neuroAnimFrame = null;
  let neuroRenderFn = null;
  const neuroPointerState = { x: 0, y: 0, tX: 0, tY: 0 };

  function compileShader(gl, src, type) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error("Shader error:", gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  function setupHellseherGrid() {
    // Eine dauerhaft laufende GPU-Animation ist für jemanden, der Animationen
    // reduziert haben will, genau das Falsche.
    if (prefersReducedMotion) return;
    startNeuroVortex();

    // Im Hintergrund-Tab weiterzurechnen kostet nur Akku.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) pauseNeuroVortex();
      else resumeNeuroVortex();
    });
  }

  function startNeuroVortex() {
    const canvas = document.getElementById("hellseherCanvas");
    if (!canvas) return;

    neuroGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!neuroGL) {
      console.warn("WebGL not supported, fallback to plain dark bg");
      return;
    }

    const vs = compileShader(neuroGL, NEURO_VS, neuroGL.VERTEX_SHADER);
    const fs = compileShader(neuroGL, NEURO_FS, neuroGL.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = neuroGL.createProgram();
    neuroGL.attachShader(program, vs);
    neuroGL.attachShader(program, fs);
    neuroGL.linkProgram(program);
    if (!neuroGL.getProgramParameter(program, neuroGL.LINK_STATUS)) {
      console.error("Program link error:", neuroGL.getProgramInfoLog(program));
      return;
    }
    neuroGL.useProgram(program);

    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = neuroGL.createBuffer();
    neuroGL.bindBuffer(neuroGL.ARRAY_BUFFER, buf);
    neuroGL.bufferData(neuroGL.ARRAY_BUFFER, verts, neuroGL.STATIC_DRAW);
    const posLoc = neuroGL.getAttribLocation(program, "a_position");
    neuroGL.enableVertexAttribArray(posLoc);
    neuroGL.vertexAttribPointer(posLoc, 2, neuroGL.FLOAT, false, 0, 0);

    const uTime    = neuroGL.getUniformLocation(program, "u_time");
    const uRatio   = neuroGL.getUniformLocation(program, "u_ratio");
    const uPointer = neuroGL.getUniformLocation(program, "u_pointer_position");
    const uScroll  = neuroGL.getUniformLocation(program, "u_scroll_progress");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      neuroGL.viewport(0, 0, canvas.width, canvas.height);
      neuroGL.uniform1f(uRatio, canvas.width / canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    window.addEventListener("pointermove", (e) => {
      neuroPointerState.tX = e.clientX;
      neuroPointerState.tY = e.clientY;
    });
    window.addEventListener("touchmove", (e) => {
      if (e.touches[0]) {
        neuroPointerState.tX = e.touches[0].clientX;
        neuroPointerState.tY = e.touches[0].clientY;
      }
    }, { passive: true });

    let frame = 0;
    neuroRenderFn = () => {
      frame++;
      // Im Light Mode liegt der Vortex bei Opacity 0.2 und ist kaum sichtbar.
      // Volle Framerate wäre dort verschenkte GPU-Zeit.
      if (state.hellseher || frame % 2 === 0) {
        neuroPointerState.x += (neuroPointerState.tX - neuroPointerState.x) * 0.2;
        neuroPointerState.y += (neuroPointerState.tY - neuroPointerState.y) * 0.2;

        neuroGL.uniform1f(uTime, performance.now() * 0.25);
        neuroGL.uniform2f(uPointer,
          neuroPointerState.x / window.innerWidth,
          1 - neuroPointerState.y / window.innerHeight
        );
        neuroGL.uniform1f(uScroll, window.pageYOffset / (2 * window.innerHeight));
        neuroGL.drawArrays(neuroGL.TRIANGLE_STRIP, 0, 4);
      }
      neuroAnimFrame = requestAnimationFrame(neuroRenderFn);
    };
    neuroRenderFn();
  }

  function pauseNeuroVortex() {
    if (neuroAnimFrame) {
      cancelAnimationFrame(neuroAnimFrame);
      neuroAnimFrame = null;
    }
  }

  function resumeNeuroVortex() {
    if (!neuroGL || neuroAnimFrame || !neuroRenderFn) return;
    neuroRenderFn();
  }

  function toggleHellseher() {
    state.hellseher = !state.hellseher;
    document.body.classList.toggle("hellseher", state.hellseher);

    const btn = $("#hellseherToggle");
    btn.classList.toggle("active", state.hellseher);
    btn.setAttribute("aria-pressed", String(state.hellseher));

    if (state.hellseher) {
      $("#crystalIcon").textContent = "✨";
      $("#crystalLabel").textContent = "Realität";
      // Hellseher blendet Vergangenes aus. Zugeklappte Zukunftsjahre würden
      // dann gar nichts mehr zeigen, deshalb alles ab jetzt aufklappen.
      setAllYears(true, year => year >= CURRENT_YEAR);
      setTimeout(() => jumpToYear(CURRENT_YEAR), 200);
    } else {
      $("#crystalIcon").textContent = "🔮";
      $("#crystalLabel").textContent = "Hellseher";
    }
  }

  // ─────────────────────────────────────────────────────
  // KEYBOARD
  // ─────────────────────────────────────────────────────
  function setupKeyboard() {
    document.addEventListener("keydown", (e) => {
      if ($("#modalBg").classList.contains("open")) {
        if (e.key === "Escape") closeModal();
        trapFocus(e);
        return;
      }
      // In einem Eingabefeld sind Buchstaben Text, keine Shortcuts.
      // e.target ist nicht garantiert ein Element, deshalb der instanceof-Check.
      if (e.target instanceof Element && e.target.matches("input, textarea")) return;

      if (e.key === "h" || e.key === "H") toggleHellseher();
      if (e.key === "n" || e.key === "N") jumpToYear(CURRENT_YEAR);
      if (e.key === "/") {
        e.preventDefault();
        $("#searchInput").focus();
      }
    });
  }

  // ─────────────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────────────
  function init() {
    const nowYearEl = $("#nowYear");
    if (nowYearEl) nowYearEl.textContent = CURRENT_YEAR;

    renderPillarChips();
    renderTimeline();
    renderDecadeNav();
    renderStats();
    setupDelegation();
    setupScrollObservers();
    setupScrollProgress();
    setupKeyboard();
    setupScenarioSlider();
    setupSearch();
    updateNextEventCard();
    setupHellseherGrid();
    applyFilters();

    $$('.chip[data-filter]').forEach(btn => {
      btn.addEventListener("click", () => setTypeFilter(btn.dataset.filter, btn));
    });

    $("#pillarAll").addEventListener("click", () => setAllPillars(true));
    $("#pillarNone").addEventListener("click", () => setAllPillars(false));
    $("#filterReset").addEventListener("click", resetFilters);
    $("#yearsExpand").addEventListener("click", () => setAllYears(true));
    $("#yearsCollapse").addEventListener("click", () => setAllYears(false));

    $("#hellseherToggle").addEventListener("click", toggleHellseher);
    $("#modalClose").addEventListener("click", closeModal);
    $("#modalBg").addEventListener("click", (e) => {
      if (e.target.id === "modalBg") closeModal();
    });

    $$(".nav a").forEach(a => {
      a.addEventListener("click", () => {
        const el = document.getElementById(a.dataset.jump || "");
        if (!el) return;
        $$(".nav a").forEach(x => x.classList.remove("active"));
        a.classList.add("active");
        window.scrollTo({ top: el.offsetTop - 80, behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    });

    jumpToToday();
    watchDayChange();

    console.log(`📡 TrendPulse Timeline · ${EVENTS.length} Events von ${TIMELINE_START} bis ${TIMELINE_END}`);
  }

  // Beim Öffnen direkt auf den heutigen Tag springen. Ein Link mit #anker
  // (z. B. #filters) hat Vorrang.
  function jumpToToday() {
    if (location.hash && location.hash.length > 1) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const go = () => {
      const target = $("#now-moment");
      if (!target) return;
      const block = target.closest(".year-block");
      if (block) expandYear(block);
      // Kein requestAnimationFrame: das läuft in Hintergrund-Tabs nicht.
      // getBoundingClientRect erzwingt das aktuelle Layout ohnehin.
      // Unter Kopfzeile und klebender Filterleiste in die Bildmitte setzen.
      let covered = 0;
      $$("header, section, nav, div").forEach(el => {
        const pos = getComputedStyle(el).position;
        if (pos !== "sticky" && pos !== "fixed") return;
        const r = el.getBoundingClientRect();
        if (r.top < 200 && r.height > 0 && r.height < window.innerHeight * 0.5 && r.width > window.innerWidth * 0.5) covered = Math.max(covered, r.bottom);
      });
      const free = window.innerHeight - covered;
      const top = target.getBoundingClientRect().top + window.scrollY - (covered + free * 0.4);
      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
    };
    // Schriften, Ausklapp- und Einblend-Animationen verschieben das Layout noch.
    // Deshalb mehrfach nachziehen, bis der Nutzer selbst scrollt.
    let userMoved = false;
    const stop = () => { userMoved = true; };
    ["wheel", "touchstart", "keydown", "mousedown"].forEach(t =>
      window.addEventListener(t, stop, { once: true, passive: true }));
    const safeGo = () => { if (!userMoved) go(); };
    go();
    [150, 400, 800, 1400, 2200].forEach(ms => setTimeout(safeGo, ms));
    window.addEventListener("load", safeGo, { once: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(safeGo);
  }

  // Bleibt der Tab über Mitternacht offen, lädt die Seite beim nächsten
  // Hinsehen neu, damit Heute, Past und Forecast wieder stimmen.
  function watchDayChange() {
    const today = new Date().toDateString();
    const check = () => {
      if (new Date().toDateString() !== today) location.reload();
    };
    document.addEventListener("visibilitychange", () => { if (!document.hidden) check(); });
    setInterval(check, 60 * 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
