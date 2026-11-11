// Übernimmt Recherche-Ergebnisse (JSON) in timeline-data.js.
// Aufruf: node tools/uebernehmen.mjs datei1.json datei2.json ... [--probe]
// Format je Datei: { updates: [{title, status, year, month, day, title_neu, desc, impact, quellen}],
//                    neu: [{year, month, day, pillar, title, desc, size, impact, quellen}] }
// status: eingetreten | verschoben | offen  -> Eintrag wird aktualisiert
//         abgesagt                          -> Eintrag wird entfernt
//         unklar                            -> bleibt unverändert
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";

const DATA = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "timeline-data.js");
const args = process.argv.slice(2);
const probe = args.includes("--probe");
const files = args.filter(a => !a.startsWith("--"));

const ORDER = ["year", "month", "day", "pillar", "title", "desc", "type", "confirmed", "confidence", "side", "size", "impact"];
const PILLARS = ["tech", "crypto", "business", "banking", "marketing", "pop", "culture", "design", "nader"];
const DASH = /[—–]| - /;

const clean = (t) => String(t).replace(/\s*[—–]\s*/g, ", ").replace(/ - /g, ", ").trim();

function serialize(o) {
  const keys = [...ORDER.filter(k => k in o), ...Object.keys(o).filter(k => !ORDER.includes(k))];
  const parts = keys.filter(k => o[k] !== undefined && o[k] !== null).map(k => `${k}: ${JSON.stringify(o[k])}`);
  return `  { ${parts.join(", ")} },`;
}

function parseLine(line) {
  const src = line.trim().replace(/,\s*$/, "");
  return vm.runInNewContext(`(${src})`);
}

let lines = fs.readFileSync(DATA, "utf8").split("\n");
const end = lines.findIndex((l, i) => i > 27 && /^\];/.test(l));
const titleIdx = new Map();
for (let i = 28; i < end; i++) {
  const m = lines[i].match(/^\s*\{.*title: "((?:[^"\\]|\\.)*)"/);
  if (m) titleIdx.set(JSON.parse(`"${m[1]}"`), i);
}

const log = { aktualisiert: [], entfernt: [], unklar: [], fehlt: [], neu: [], doppelt: [] };
const remove = new Set();
const sideOf = (i) => (i % 2 ? "right" : "left");
let n = 0;

for (const f of files) {
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  for (const u of j.updates || []) {
    const i = titleIdx.get(u.title);
    if (i == null) { log.fehlt.push(u.title); continue; }
    if (u.status === "unklar" || !u.desc) { log.unklar.push(u.title); continue; }
    if (u.status === "abgesagt" && !u.desc) { remove.add(i); log.entfernt.push(u.title); continue; }
    const ev = parseLine(lines[i]);
    if (u.year) ev.year = u.year;
    if (u.month) ev.month = u.month;
    if (u.day) ev.day = u.day; else if (u.month && u.month !== ev.month) delete ev.day;
    if (u.title_neu) ev.title = clean(u.title_neu);
    ev.desc = clean(u.desc);
    if (Array.isArray(u.impact) && u.impact.length) ev.impact = u.impact.map(clean);
    if (u.status === "eingetreten" || u.status === "abgesagt") {
      ev.confirmed = true;
      delete ev.confidence;
      if (ev.type !== "vision") ev.type = "past";
    }
    if (Array.isArray(u.quellen) && u.quellen.length) ev.quellen = u.quellen.slice(0, 3);
    lines[i] = serialize(ev);
    log.aktualisiert.push(`${u.title} [${u.status}]`);
  }
  for (const e of j.neu || []) {
    if (e.pillar === "sport") e.pillar = "pop";
    const t = clean(e.title);
    if (titleIdx.has(t)) { log.doppelt.push(t); continue; }
    if (!PILLARS.includes(e.pillar)) { log.fehlt.push(`Pillar ${e.pillar}: ${t}`); continue; }
    const ev = {
      year: e.year, month: e.month, day: e.day || undefined, pillar: e.pillar, title: t,
      desc: clean(e.desc), type: "past", confirmed: true, side: sideOf(n++),
      size: ["small", "medium", "large"].includes(e.size) ? e.size : "medium",
      impact: Array.isArray(e.impact) && e.impact.length ? e.impact.map(clean) : undefined,
      quellen: Array.isArray(e.quellen) && e.quellen.length ? e.quellen.slice(0, 3) : undefined,
    };
    const today = new Date();
    const future = (ev.year * 10000 + ev.month * 100 + (ev.day || 1)) >
      (today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate());
    if (future) { ev.type = "forecast"; ev.confidence = 90; }
    titleIdx.set(t, -1);
    log.neu.push(`${ev.year}-${ev.month}-${ev.day || "?"} ${t}`);
    lines.splice(end, 0, serialize(ev));
  }
}

lines = lines.filter((_, i) => !remove.has(i));
const out = lines.join("\n");

// Prüfen: Datei muss laufen und keine Gedankenstriche in neuen Texten enthalten.
const ctx = {};
vm.runInNewContext(out + "\nthis.E = TIMELINE_EVENTS;", ctx);
const bad = ctx.E.filter(e => DASH.test(e.desc || "") && (e.quellen));
console.log(JSON.stringify({ ...log, events: ctx.E.length, dashFehler: bad.map(e => e.title) }, null, 1));
if (!probe) { fs.writeFileSync(DATA, out); console.log("geschrieben:", DATA); }
