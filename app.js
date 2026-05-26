/* ═══════════════════════════════════════════════════════
   TrendPulse Timeline App
   Renders events, handles scroll, filter, modal, hellseher mode
   ═══════════════════════════════════════════════════════ */

(() => {
  "use strict";

  // ─────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────
  const state = {
    typeFilter: "all",       // all | past | now | forecast | vision
    activePillars: new Set(Object.keys(PILLAR_META)),
    hellseher: false,
    scenario: 50,            // 0 = dystopia, 100 = utopia
    scenarioBandwidth: 25,   // events within +/- this of slider are shown
  };

  // ─────────────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────────────
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const MONTHS_DE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

  function formatDate(year, month) {
    return `${MONTHS_DE[month - 1]} ${year}`;
  }

  // ─────────────────────────────────────────────────────
  // IMPACT GENERATOR — Was könnte passieren?
  // Pro Pillar smarte Templates, deterministisch per Event
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
    // Wenn Event eigene impacts hat, nimm die
    if (Array.isArray(ev.impact) && ev.impact.length) return ev.impact;

    const pool = IMPACT_TEMPLATES[ev.pillar] || IMPACT_TEMPLATES.tech;

    // Deterministisch 3 Impacts pro Event auswählen
    // Hash über Year + Month + Title für stabile Auswahl
    const hash = (ev.year * 13 + (ev.month || 1) * 7 + (ev.title || "").length) % pool.length;
    const picks = [
      pool[hash],
      pool[(hash + 1) % pool.length],
      pool[(hash + 2) % pool.length],
    ];

    // Type modifier
    if (ev.type === "vision") picks.unshift("Spekulativ. Wenn dieses Szenario eintritt:");
    if (ev.type === "past")    picks.unshift("Rückwirkend bewertet:");

    return picks.slice(0, 4);
  }

  function confidenceClass(c) {
    if (c == null) return "";
    if (c >= 70) return "high";
    if (c >= 45) return "mid";
    if (c >= 25) return "low";
    return "very-low";
  }

  function relativeTime(targetYear, targetMonth) {
    const months = (targetYear - CURRENT_YEAR) * 12 + (targetMonth - CURRENT_MONTH);
    if (months < 0) return "passed";
    if (months === 0) return "now";
    if (months < 12) return `${months} months`;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    if (years < 5 && rem) return `${years}y ${rem}m`;
    return `${years} years`;
  }

  // ─────────────────────────────────────────────────────
  // RENDER PILLAR CHIPS
  // ─────────────────────────────────────────────────────
  function renderPillarChips() {
    const container = $("#pillarChips");
    container.innerHTML = "";
    Object.entries(PILLAR_META).forEach(([key, meta]) => {
      const btn = document.createElement("button");
      btn.className = "chip active";
      btn.dataset.pillar = key;
      btn.innerHTML = `
        <span class="dot-color" style="background:${meta.bg}; border: 1px solid rgba(0,0,0,0.08)"></span>
        ${meta.label}
      `;
      btn.addEventListener("click", () => togglePillar(key, btn));
      container.appendChild(btn);
    });
  }

  function togglePillar(key, btn) {
    if (state.activePillars.has(key)) {
      state.activePillars.delete(key);
      btn.classList.remove("active");
    } else {
      state.activePillars.add(key);
      btn.classList.add("active");
    }
    applyFilters();
  }

  // ─────────────────────────────────────────────────────
  // RENDER TIMELINE
  // ─────────────────────────────────────────────────────
  function renderTimeline() {
    const container = $("#timelineEvents");
    const sorted = [...TIMELINE_EVENTS].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return (a.month || 1) - (b.month || 1);
    });

    let lastYear = null;
    let lastDecade = null;
    let nowMomentInserted = false;
    const frag = document.createDocumentFragment();

    const MONTHS_FULL_DE = ["Januar", "Februar", "März", "April", "Mai", "Juni",
                            "Juli", "August", "September", "Oktober", "November", "Dezember"];

    sorted.forEach((ev, i) => {
      // Year marker
      if (ev.year !== lastYear) {
        const isDecade = ev.year % 10 === 0;
        const isNow = ev.year === CURRENT_YEAR;
        const marker = document.createElement("div");
        marker.className = `year-marker ${isDecade ? "decade" : ""} ${isNow ? "now-marker" : ""}`;
        marker.dataset.year = ev.year;
        marker.innerHTML = `<span class="year">${ev.year}</span>`;
        frag.appendChild(marker);
        lastYear = ev.year;
        if (isDecade) lastDecade = ev.year;
      }

      // NOW MOMENT marker — inserted right before the first event at or after May 2026
      if (!nowMomentInserted && ev.year === CURRENT_YEAR && (ev.month || 1) >= CURRENT_MONTH) {
        nowMomentInserted = true;
        const nowMoment = document.createElement("div");
        nowMoment.className = "now-moment-marker";
        nowMoment.id = "now-moment";
        nowMoment.innerHTML = `
          <div class="now-moment-pulse"></div>
          <div class="now-moment-label">
            <span class="now-moment-dot"></span>
            Jetzt · ${MONTHS_FULL_DE[CURRENT_MONTH - 1]} ${CURRENT_YEAR}
          </div>
        `;
        frag.appendChild(nowMoment);
      }

      // Fallback: if no event exactly at current month exists in 2026, insert after last 2026 event
      if (!nowMomentInserted && ev.year === CURRENT_YEAR && i < sorted.length - 1 && sorted[i + 1].year > CURRENT_YEAR) {
        nowMomentInserted = true;
        const nowMoment = document.createElement("div");
        nowMoment.className = "now-moment-marker";
        nowMoment.id = "now-moment";
        nowMoment.innerHTML = `
          <div class="now-moment-pulse"></div>
          <div class="now-moment-label">
            <span class="now-moment-dot"></span>
            Jetzt · ${MONTHS_FULL_DE[CURRENT_MONTH - 1]} ${CURRENT_YEAR}
          </div>
        `;
        frag.appendChild(nowMoment);
      }

      // Event row
      const row = document.createElement("div");
      row.className = `event-row ${ev.side} ${ev.type} ${ev.pillar === "nader" ? "is-nader" : ""} ${ev.confirmed ? "is-confirmed" : ""}`;
      row.dataset.year = ev.year;
      row.dataset.pillar = ev.pillar;
      row.dataset.type = ev.type;
      if (ev.confirmed) row.dataset.confirmed = "true";
      if (ev.confidence != null) {
        row.dataset.confidenceClass = confidenceClass(ev.confidence);
      }
      if (ev.scenario != null) {
        row.dataset.scenario = ev.scenario;
      }

      const meta = PILLAR_META[ev.pillar];
      const card = document.createElement("div");
      card.className = `event-card size-${ev.size || "medium"} is-${ev.type} ${ev.confirmed ? "is-confirmed" : ""}`;
      card.dataset.eventIndex = i;
      card.style.animationDelay = `${(i % 8) * 40}ms`;

      const confidenceHTML = ev.confidence != null
        ? `<div class="confidence-ring ${confidenceClass(ev.confidence)}" title="${ev.confidence}% confidence">${ev.confidence}</div>`
        : "";

      const confirmedBadge = ev.confirmed
        ? `<div class="confirmed-badge">✓ Bestätigt</div>`
        : "";

      const isSmall = ev.size === "small";
      const expandIconHTML = isSmall ? `<span class="expand-icon">+</span>` : "";

      // Impact section — was könnte passieren?
      const impacts = generateImpacts(ev);
      const impactHTML = `
        <div class="impact-section">
          <button class="impact-toggle" type="button">
            💡 Was könnte passieren?
            <span class="chev">▼</span>
          </button>
          <ul class="impact-list">
            ${impacts.map(i => `<li>${i}</li>`).join("")}
          </ul>
        </div>
      `;

      card.innerHTML = `
        ${confidenceHTML}
        ${confirmedBadge}
        <div class="card-head">
          <span class="pillar-chip pillar-${ev.pillar}">${meta.emoji}<span class="pillar-label"> ${meta.label}</span></span>
          <span class="date">${formatDate(ev.year, ev.month || 1)}</span>
        </div>
        <h3>${ev.title}</h3>
        <p>${ev.desc}</p>
        ${impactHTML}
        ${expandIconHTML}
      `;

      // Impact toggle handler — stoppt Propagation damit Card/Modal nicht reagiert
      const impactToggle = card.querySelector(".impact-toggle");
      if (impactToggle) {
        impactToggle.addEventListener("click", (e) => {
          e.stopPropagation();
          const section = impactToggle.closest(".impact-section");
          section.classList.toggle("open");
        });
      }

      if (isSmall) {
        card.addEventListener("click", (e) => {
          // Wenn Klick auf Impact Toggle war, ignorieren
          if (e.target.closest(".impact-section")) return;
          e.stopPropagation();
          const wasExpanded = card.classList.contains("expanded");
          // Collapse all other small cards
          $$(".event-card.size-small.expanded").forEach(c => c.classList.remove("expanded"));
          if (!wasExpanded) card.classList.add("expanded");
        });
        // Double click opens full modal
        card.addEventListener("dblclick", (e) => {
          if (e.target.closest(".impact-section")) return;
          e.stopPropagation();
          card.classList.remove("expanded");
          openModal(ev);
        });
      } else {
        card.addEventListener("click", (e) => {
          if (e.target.closest(".impact-section")) return;
          openModal(ev);
        });
      }

      const dot = document.createElement("div");
      dot.className = "event-dot";

      row.appendChild(dot);
      row.appendChild(card);
      frag.appendChild(row);
    });

    container.appendChild(frag);
  }

  // ─────────────────────────────────────────────────────
  // STATS
  // ─────────────────────────────────────────────────────
  function renderStats() {
    const total = TIMELINE_EVENTS.length;
    const past = TIMELINE_EVENTS.filter(e => e.type === "past").length;
    const forecast = TIMELINE_EVENTS.filter(e => e.type === "forecast").length;
    const vision = TIMELINE_EVENTS.filter(e => e.type === "vision").length;

    animateNumber($("#statTotal"), total);
    animateNumber($("#statPast"), past);
    animateNumber($("#statForecast"), forecast);
    animateNumber($("#statVision"), vision);
  }

  function animateNumber(el, target) {
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = target;
      } else {
        el.textContent = current;
        requestAnimationFrame(tick);
      }
    };
    tick();
  }

  // ─────────────────────────────────────────────────────
  // FILTERING
  // ─────────────────────────────────────────────────────
  function applyFilters() {
    const bandwidth = state.scenarioBandwidth;
    $$(".event-row").forEach(row => {
      const type = row.dataset.type;
      const pillar = row.dataset.pillar;
      const scenarioStr = row.dataset.scenario;
      let visible = true;
      let opacity = 1;

      if (state.typeFilter !== "all" && type !== state.typeFilter) visible = false;
      if (!state.activePillars.has(pillar)) visible = false;

      // Scenario filter only applies to events with explicit scenario value
      if (visible && scenarioStr !== undefined) {
        const scenario = parseFloat(scenarioStr);
        const distance = Math.abs(scenario - state.scenario);
        if (distance > bandwidth) {
          visible = false;
        } else {
          // Fade based on distance: 0 → opacity 1, bandwidth → opacity 0.6
          opacity = 1 - (distance / bandwidth) * 0.4;
        }
      }

      row.style.display = visible ? "" : "none";
      row.style.opacity = opacity;
    });
  }

  function setTypeFilter(filter, btn) {
    state.typeFilter = filter;
    $$('.chip[data-filter]').forEach(c => c.classList.remove("active", "yellow"));
    btn.classList.add("active");
    if (filter === "all") btn.classList.add("yellow");
    applyFilters();
  }

  // ─────────────────────────────────────────────────────
  // SCENARIO SLIDER
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

    // Animate emoji
    const emojiEl = $("#sliderEmoji");
    emojiEl.style.transform = "scale(1.2) rotate(-8deg)";
    setTimeout(() => { emojiEl.style.transform = ""; }, 200);
  }

  function setupScenarioSlider() {
    const slider = $("#sliderInput");
    updateScenarioUI(state.scenario);

    slider.addEventListener("input", (e) => {
      state.scenario = parseInt(e.target.value, 10);
      updateScenarioUI(state.scenario);
      applyFilters();
    });
  }

  // ─────────────────────────────────────────────────────
  // NEXT EVENT CARD
  // ─────────────────────────────────────────────────────
  function updateNextEventCard() {
    // Find next forecast event after now
    const future = TIMELINE_EVENTS
      .filter(e => (e.type === "forecast" || e.type === "vision") &&
                   (e.year > CURRENT_YEAR || (e.year === CURRENT_YEAR && (e.month || 1) > CURRENT_MONTH)))
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        return (a.month || 1) - (b.month || 1);
      });

    if (future.length === 0) return;
    const next = future[0];
    $("#nextEventTitle").textContent = next.title;
    $("#nextEventTime").textContent = relativeTime(next.year, next.month || 1);

    $("#jumpToNext").addEventListener("click", () => {
      jumpToYear(next.year);
    });
  }

  // ─────────────────────────────────────────────────────
  // SCROLL OBSERVATIONS
  // ─────────────────────────────────────────────────────
  function setupScrollObservers() {
    // Event card fade in
    const cardObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          cardObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "-40px" });

    $$(".event-card").forEach(c => cardObs.observe(c));

    // Decade tracking
    const decadeButtons = $$(".decade-nav button");
    const yearMarkers = $$(".year-marker");
    const decadeObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const year = parseInt(entry.target.dataset.year, 10);
          updateActiveDecade(year);
        }
      });
    }, { rootMargin: "-50% 0px -50% 0px" });

    yearMarkers.forEach(m => decadeObs.observe(m));
  }

  function updateActiveDecade(year) {
    const decade = year === CURRENT_YEAR ? CURRENT_YEAR : Math.floor(year / 10) * 10;
    $$(".decade-nav button").forEach(btn => {
      const btnYear = parseInt(btn.dataset.year, 10);
      btn.classList.toggle("active", btnYear === decade ||
        (year === CURRENT_YEAR && btnYear === CURRENT_YEAR));
    });
  }

  function jumpToYear(year) {
    // For current year, jump to the precise NOW moment marker (month-level)
    const target = (year === CURRENT_YEAR)
      ? $("#now-moment") || $(`.year-marker[data-year="${year}"]`)
      : $(`.year-marker[data-year="${year}"]`);
    if (target) {
      const headerH = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 40;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  // ─────────────────────────────────────────────────────
  // SCROLL PROGRESS + STICKY NOW
  // ─────────────────────────────────────────────────────
  function setupScrollProgress() {
    const progress = $("#scrollProgress");
    const header = $("#header");
    const nowSticky = $("#nowSticky");
    const nowMarker = $(`.year-marker[data-year="${CURRENT_YEAR}"]`);

    function update() {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(100, (scrollTop / docH) * 100);
      progress.style.width = pct + "%";

      header.classList.toggle("scrolled", scrollTop > 12);

      // Show now sticky when we are past the now marker
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
  function openModal(ev) {
    const meta = PILLAR_META[ev.pillar];
    $("#modalEyebrow").textContent = `${formatDate(ev.year, ev.month || 1)} · ${meta.label} · ${ev.type.toUpperCase()}`;
    $("#modalTitle").textContent = ev.title;
    $("#modalBody").textContent = ev.desc;

    const metaContainer = $("#modalMeta");
    metaContainer.innerHTML = "";

    const pills = [];
    pills.push(`<span class="pill">📅 ${formatDate(ev.year, ev.month || 1)}</span>`);
    pills.push(`<span class="pill">${meta.emoji} ${meta.label}</span>`);
    if (ev.confidence != null) {
      pills.push(`<span class="pill">🎯 ${ev.confidence}% Confidence</span>`);
    }
    if (ev.type === "vision") {
      pills.push(`<span class="pill">🔮 Hellseher Modus</span>`);
    }
    if (ev.type === "now") {
      pills.push(`<span class="pill" style="background: var(--yellow); color: var(--ink); font-weight: 700">⚡ Aktuelles Signal</span>`);
    }
    const timeUntil = relativeTime(ev.year, ev.month || 1);
    if (timeUntil !== "passed" && timeUntil !== "now") {
      pills.push(`<span class="pill">⏳ in ${timeUntil}</span>`);
    }
    metaContainer.innerHTML = pills.join("");

    $("#modalBg").classList.add("open");
  }

  function closeModal() {
    $("#modalBg").classList.remove("open");
  }

  // ─────────────────────────────────────────────────────
  // HELLSEHER MODE
  // ─────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────
  // HELLSEHER NEURAL VORTEX BACKGROUND
  // Translated from Interactive Neural Vortex (React/WebGL) → Vanilla JS
  // Pure GLSL Shader, reagiert auf Maus, Scroll und Zeit
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
  let neuroProgram = null;
  let neuroAnimFrame = null;
  let neuroResize = null;
  let neuroPointer = null;
  let neuroTouch = null;
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
    // Start the WebGL vortex immediately — runs in both Light and Hellseher mode
    startNeuroVortex();
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

    neuroProgram = neuroGL.createProgram();
    neuroGL.attachShader(neuroProgram, vs);
    neuroGL.attachShader(neuroProgram, fs);
    neuroGL.linkProgram(neuroProgram);
    if (!neuroGL.getProgramParameter(neuroProgram, neuroGL.LINK_STATUS)) {
      console.error("Program link error:", neuroGL.getProgramInfoLog(neuroProgram));
      return;
    }
    neuroGL.useProgram(neuroProgram);

    // Full screen quad
    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = neuroGL.createBuffer();
    neuroGL.bindBuffer(neuroGL.ARRAY_BUFFER, buf);
    neuroGL.bufferData(neuroGL.ARRAY_BUFFER, verts, neuroGL.STATIC_DRAW);
    const posLoc = neuroGL.getAttribLocation(neuroProgram, "a_position");
    neuroGL.enableVertexAttribArray(posLoc);
    neuroGL.vertexAttribPointer(posLoc, 2, neuroGL.FLOAT, false, 0, 0);

    // Uniform locations
    const uTime    = neuroGL.getUniformLocation(neuroProgram, "u_time");
    const uRatio   = neuroGL.getUniformLocation(neuroProgram, "u_ratio");
    const uPointer = neuroGL.getUniformLocation(neuroProgram, "u_pointer_position");
    const uScroll  = neuroGL.getUniformLocation(neuroProgram, "u_scroll_progress");

    neuroResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      neuroGL.viewport(0, 0, canvas.width, canvas.height);
      neuroGL.uniform1f(uRatio, canvas.width / canvas.height);
    };
    neuroResize();
    window.addEventListener("resize", neuroResize);

    neuroPointer = (e) => {
      neuroPointerState.tX = e.clientX;
      neuroPointerState.tY = e.clientY;
    };
    neuroTouch = (e) => {
      if (e.touches[0]) {
        neuroPointerState.tX = e.touches[0].clientX;
        neuroPointerState.tY = e.touches[0].clientY;
      }
    };
    window.addEventListener("pointermove", neuroPointer);
    window.addEventListener("touchmove", neuroTouch, { passive: true });

    const render = () => {
      const t = performance.now();
      // Smooth pointer easing
      neuroPointerState.x += (neuroPointerState.tX - neuroPointerState.x) * 0.2;
      neuroPointerState.y += (neuroPointerState.tY - neuroPointerState.y) * 0.2;

      neuroGL.uniform1f(uTime, t * 0.25);
      neuroGL.uniform2f(uPointer,
        neuroPointerState.x / window.innerWidth,
        1 - neuroPointerState.y / window.innerHeight
      );
      neuroGL.uniform1f(uScroll, window.pageYOffset / (2 * window.innerHeight));
      neuroGL.drawArrays(neuroGL.TRIANGLE_STRIP, 0, 4);
      neuroAnimFrame = requestAnimationFrame(render);
    };
    render();
  }

  function stopNeuroVortex() {
    if (neuroAnimFrame) {
      cancelAnimationFrame(neuroAnimFrame);
      neuroAnimFrame = null;
    }
    if (neuroResize) window.removeEventListener("resize", neuroResize);
    if (neuroPointer) window.removeEventListener("pointermove", neuroPointer);
    if (neuroTouch) window.removeEventListener("touchmove", neuroTouch);
    neuroResize = neuroPointer = neuroTouch = null;

    if (neuroGL) {
      neuroGL.clear(neuroGL.COLOR_BUFFER_BIT);
      if (neuroProgram) neuroGL.deleteProgram(neuroProgram);
      neuroProgram = null;
      neuroGL = null;
    }
  }

  function toggleHellseher() {
    state.hellseher = !state.hellseher;
    document.body.classList.toggle("hellseher", state.hellseher);

    const btn = $("#hellseherToggle");
    btn.classList.toggle("active", state.hellseher);

    if (state.hellseher) {
      $("#crystalIcon").textContent = "✨";
      $("#crystalLabel").textContent = "Realität";
      setTimeout(() => jumpToYear(CURRENT_YEAR), 200);
    } else {
      $("#crystalIcon").textContent = "🔮";
      $("#crystalLabel").textContent = "Hellseher";
    }
    // Note: Vortex bleibt in beiden Modi aktiv, nur Opacity wechselt via CSS
  }

  // ─────────────────────────────────────────────────────
  // KEYBOARD
  // ─────────────────────────────────────────────────────
  function setupKeyboard() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "h" || e.key === "H") toggleHellseher();
      if (e.key === "n" || e.key === "N") jumpToYear(CURRENT_YEAR);
    });
  }

  // ─────────────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────────────
  function init() {
    renderPillarChips();
    renderTimeline();
    renderStats();
    setupScrollObservers();
    setupScrollProgress();
    setupKeyboard();
    setupScenarioSlider();
    updateNextEventCard();
    setupHellseherGrid();

    // Type filter chips
    $$('.chip[data-filter]').forEach(btn => {
      btn.addEventListener("click", () => setTypeFilter(btn.dataset.filter, btn));
    });

    // Decade nav
    $$(".decade-nav button").forEach(btn => {
      btn.addEventListener("click", () => {
        jumpToYear(parseInt(btn.dataset.year, 10));
      });
    });

    // Hellseher toggle
    $("#hellseherToggle").addEventListener("click", toggleHellseher);

    // Modal close
    $("#modalClose").addEventListener("click", closeModal);
    $("#modalBg").addEventListener("click", (e) => {
      if (e.target.id === "modalBg") closeModal();
    });

    // Nav jumps
    $$(".nav a").forEach(a => {
      a.addEventListener("click", () => {
        const target = a.dataset.jump;
        if (!target) return;
        const el = document.getElementById(target);
        if (el) {
          $$(".nav a").forEach(x => x.classList.remove("active"));
          a.classList.add("active");
          window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
        }
      });
    });

    console.log(`📡 TrendPulse Timeline loaded · ${TIMELINE_EVENTS.length} events from ${TIMELINE_START} to ${TIMELINE_END}`);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
