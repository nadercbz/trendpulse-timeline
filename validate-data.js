#!/usr/bin/env node
/**
 * TrendPulse Daten Validierung
 *
 *   node validate-data.js
 *
 * Prüft timeline-data.js auf die Fehlerklassen, die sich beim Pflegen von
 * Hand einschleichen: Duplikate, widersprüchliche Datumsangaben zwischen
 * Feld und Beschreibung, fehlende Pflichtfelder, kaputte Wertebereiche.
 *
 * Exit Code 1 bei Fehlern, 0 bei sauberen Daten. Warnungen brechen nicht ab.
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const DATA_FILE = path.join(__dirname, "timeline-data.js");

const PILLARS = ["tech", "crypto", "business", "banking", "marketing", "pop", "culture", "design", "nader"];
const SIZES = ["small", "medium", "large"];
const SIDES = ["left", "right"];
const TYPES = ["past", "now", "forecast", "vision"];

const MONTHS_DE = {
  januar: 1, februar: 2, "märz": 3, maerz: 3, april: 4, mai: 5, juni: 6,
  juli: 7, august: 8, september: 9, oktober: 10, november: 11, dezember: 12,
};

const errors = [];
const warnings = [];

// timeline-data.js ist ein Plain Script ohne Export. Im VM Kontext laufen
// lassen ist einfacher als ein Parser und liest exakt das, was der Browser sieht.
const sandbox = { console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(DATA_FILE, "utf8"), sandbox, { filename: "timeline-data.js" });

// const landet nicht auf dem Sandbox-Objekt, sondern im lexikalischen Scope
// des Kontexts. Deshalb den Namen als Ausdruck auswerten statt auslesen.
const events = vm.runInContext("TIMELINE_EVENTS", sandbox);
if (!Array.isArray(events)) {
  console.error("✗ TIMELINE_EVENTS ist kein Array. Datei kaputt?");
  process.exit(1);
}

const label = (ev) => `"${ev.title}" (${ev.year}/${String(ev.month || 1).padStart(2, "0")})`;

// ── Pflichtfelder und Wertebereiche ──────────────────────
events.forEach(ev => {
  if (!ev.title) errors.push(`Event ohne title: ${JSON.stringify(ev).slice(0, 80)}`);
  if (!ev.desc) errors.push(`${label(ev)}: desc fehlt`);
  if (!Number.isInteger(ev.year)) errors.push(`${label(ev)}: year fehlt oder ist keine Zahl`);
  if (ev.month != null && (ev.month < 1 || ev.month > 12)) errors.push(`${label(ev)}: month ${ev.month} liegt außerhalb 1 bis 12`);
  if (ev.day != null && (ev.day < 1 || ev.day > 31)) errors.push(`${label(ev)}: day ${ev.day} liegt außerhalb 1 bis 31`);
  if (!PILLARS.includes(ev.pillar)) errors.push(`${label(ev)}: pillar "${ev.pillar}" unbekannt`);
  if (!TYPES.includes(ev.type)) errors.push(`${label(ev)}: type "${ev.type}" unbekannt`);
  if (ev.side && !SIDES.includes(ev.side)) errors.push(`${label(ev)}: side "${ev.side}" unbekannt`);
  if (ev.size && !SIZES.includes(ev.size)) errors.push(`${label(ev)}: size "${ev.size}" unbekannt`);
  if (ev.confidence != null && (ev.confidence < 0 || ev.confidence > 100)) errors.push(`${label(ev)}: confidence ${ev.confidence} liegt außerhalb 0 bis 100`);
  if (ev.scenario != null && (ev.scenario < 0 || ev.scenario > 100)) errors.push(`${label(ev)}: scenario ${ev.scenario} liegt außerhalb 0 bis 100`);
  if (ev.impact != null && !Array.isArray(ev.impact)) errors.push(`${label(ev)}: impact muss ein Array sein`);
});

// ── Duplikate ────────────────────────────────────────────
// Exakt gleicher Titel ist fast immer ein versehentlicher Copy-Paste.
const byTitle = new Map();
events.forEach(ev => {
  const key = (ev.title || "").toLowerCase().trim();
  if (!byTitle.has(key)) byTitle.set(key, []);
  byTitle.get(key).push(ev);
});
byTitle.forEach((list, key) => {
  if (list.length > 1) {
    errors.push(`Titel "${list[0].title}" existiert ${list.length}x: ${list.map(e => `${e.year}/${e.month || 1}`).join(", ")}`);
  }
});

// Gleicher Tag plus gleicher Pillar ist fast immer dasselbe Event zweimal
// erfasst, auch wenn die Titel unterschiedlich formuliert sind.
const byDay = new Map();
events.filter(ev => ev.day != null).forEach(ev => {
  const key = `${ev.year}-${ev.month || 1}-${ev.day}-${ev.pillar}`;
  if (!byDay.has(key)) byDay.set(key, []);
  byDay.get(key).push(ev);
});
byDay.forEach(list => {
  if (list.length > 1) {
    warnings.push(`Gleicher Tag und Pillar (${list[0].year}-${String(list[0].month).padStart(2, "0")}-${list[0].day}, ${list[0].pillar}): ${list.map(e => `"${e.title}"`).join(" vs ")}`);
  }
});

// Fast gleiche Titel im selben Jahr sind meist dasselbe Event zweimal erfasst.
const norm = (s) => (s || "").toLowerCase().replace(/[^a-zäöüß0-9]/g, "");
events.forEach((a, i) => {
  events.slice(i + 1).forEach(b => {
    if (a.year !== b.year) return;
    const na = norm(a.title);
    const nb = norm(b.title);
    if (na === nb) return; // schon als exaktes Duplikat gemeldet
    if (na.length > 8 && (na.includes(nb) || nb.includes(na))) {
      warnings.push(`Mögliches Duplikat in ${a.year}: "${a.title}" vs "${b.title}"`);
    }
  });
});

// ── Datum im Text vs Datum im Feld ───────────────────────
// Genau hier sind Shrek 5 und Spider-Man auseinandergelaufen.
// Konvention: desc beginnt mit dem eigenen Datum des Events. Deshalb nur das
// ERSTE Datum im Text prüfen, nicht irgendeins. Eine Ankündigung darf im
// Fließtext ein späteres Datum nennen ("21. Mai ... Release am 19. November").
// Das Jahr ist optional, weil viele Events es im Kopf weglassen ("21. Mai.").
events.forEach(ev => {
  const m = (ev.desc || "").match(/(\d{1,2})\.\s*([A-Za-zÄÖÜäöü]+)(?:\s+(\d{4}))?/);
  if (!m) return;
  const month = MONTHS_DE[m[2].toLowerCase()];
  if (!month) return; // Wort war kein Monatsname, z.B. "3. Platz"
  const day = Number(m[1]);
  const year = m[3] ? Number(m[3]) : null;

  // Jubiläums-Events nennen im desc absichtlich das historische Datum
  // ("9. Januar 2007: Steve Jobs stellt iPhone vor"). Nur Datumsangaben in
  // Reichweite des Event-Jahres sind ein echter Widerspruch.
  if (year != null && Math.abs(year - ev.year) > 2) return;

  if (year != null && year !== ev.year) {
    errors.push(`${label(ev)}: desc nennt Jahr ${year}, Feld sagt ${ev.year}`);
  } else if (month !== (ev.month || 1)) {
    errors.push(`${label(ev)}: desc nennt Monat ${month}, Feld sagt ${ev.month || 1}`);
  } else if (ev.day != null && day !== ev.day) {
    errors.push(`${label(ev)}: desc nennt Tag ${day}, Feld sagt ${ev.day}`);
  }
});

// ── Large Budget ─────────────────────────────────────────
const largePerYear = new Map();
events.filter(e => e.size === "large").forEach(ev => {
  largePerYear.set(ev.year, (largePerYear.get(ev.year) || 0) + 1);
});
[...largePerYear.entries()]
  .filter(([, n]) => n > 4)
  .sort((a, b) => b[1] - a[1])
  .forEach(([year, n]) => {
    warnings.push(`${year} hat ${n} large Events. app.js stuft die schwächsten automatisch auf medium.`);
  });

// ── Ausgabe ──────────────────────────────────────────────
console.log(`\n📡 TrendPulse Datencheck · ${events.length} Events\n`);

if (warnings.length) {
  console.log(`⚠  ${warnings.length} Warnung${warnings.length === 1 ? "" : "en"}:`);
  warnings.forEach(w => console.log(`   · ${w}`));
  console.log("");
}

if (errors.length) {
  console.log(`✗  ${errors.length} Fehler:`);
  errors.forEach(e => console.log(`   · ${e}`));
  console.log("");
  process.exit(1);
}

console.log("✓  Keine Fehler.\n");
