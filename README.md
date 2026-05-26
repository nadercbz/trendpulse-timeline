# 📡 TrendPulse Timeline Dashboard

> Interaktiver Zeitstrahl von 2000 bis 2100. Vergangenheit, Jetzt, Forecast, Hellseher Vision.

---

## 🚀 Starten

### Variante A: über Claude Preview (empfohlen)
Bereits konfiguriert in `Projects/18_New Horizon/.claude/launch.json`.
Server Name: `trendpulse-dashboard` auf Port 8765.

### Variante B: manuell im Terminal
```bash
cd "Agents/15_TrendPulse/Dashboard"
python3 -m http.server 8765
```
Dann öffnen: http://localhost:8765

### Variante C: direkt im Browser
Die `index.html` lässt sich auch ohne Server öffnen (file:// reicht).

---

## 🎨 Design

Inspiriert vom Do. Dashboard Reference Image.

- **Off White Background** `#F2F0EB` warm und ruhig
- **Schwarz** `#0F0F0F` für Headlines, Pills, Dots
- **Gelb** `#FFE34A` für Highlights und Now Marker
- **Pastel Chips** Peach, Mint, Lavender, Coral, Sand für Pillars
- **Typography** Inter (Sans) + Instrument Serif (italic Accent)
- **Soft Shadows** kaum sichtbar, sehr clean

---

## 🧭 Features

| Feature | Beschreibung |
|---------|-------------|
| **Vertikale Spine** | Zeitstrahl Linie zentriert, Events zigzaggen links und rechts |
| **Year Marker** | Jedes Jahr als Pill markiert. Dekaden in Bold. NOW in Gelb pulsierend |
| **Filter Chips** | Type Filter (Past, Now, Forecast, Vision) plus 9 Pillar Toggles |
| **Decade Nav** | Floating rechts. Quick Jump zu jeder Dekade |
| **Next Event Card** | Schwarze Bubble oben rechts zeigt nächste größere Disruption |
| **Confidence Ring** | Future Events haben Ring mit Prozent Score |
| **Scenario Slider** | 0 bis 100. Dystopie links, Utopie rechts. Filtert Future Events live nach Wahrscheinlichkeits Stimmung |
| **Hellseher Modus** | Toggle. Dunkler Hintergrund mit Sternen, nur Future Events |
| **Small Cards** | Kompakte Side Pills mit + Icon. Click expandiert in voller Card. Double click öffnet Modal |
| **Modal** | Click auf Medium/Large Event öffnet Detail Modal |
| **Scroll Progress** | Gelber Balken oben zeigt Position im Jahrhundert |
| **Now Sticky** | Schwarzer Pill der "you are in 2026" zeigt wenn man die NOW Zone passiert hat |
| **Keyboard** | `H` toggle Hellseher, `N` Jump to Now, `Esc` Modal schließen |

---

## 📊 Daten

Datei: `timeline-data.js`

Strukturiert in 4 Typen:
- **past** historische Tatsachen (2000 bis 2025)
- **now** aktuelle Signale (2026, aus TrendPulse Pulse Report)
- **forecast** datengetriebene Prognosen (2027 bis 2035)
- **vision** Hellseher Szenarien (2036 bis 2100)

### Scenario Werte

Future Events können einen `scenario` Wert von 0 bis 100 haben:
- `0 bis 15` Pure Dystopie (Klima Kollaps, Surveillance State, AI Domination)
- `16 bis 35` Sehr Dunkel (Krisen häufen sich)
- `36 bis 55` Realistischer Mix (Light und Schatten)
- `56 bis 70` Vorsichtig Optimistisch
- `71 bis 85` Sehr Hell (Probleme werden gelöst)
- `86 bis 100` Pure Utopie (Post Knappheit, Frieden, Healing)

Der Slider hat ein Bandwidth von 25. Bei Slider Wert X werden Events mit `|scenario - X| <= 25` angezeigt. Distanz beeinflusst auch die Opacity.

Events ohne `scenario` Field sind **immer sichtbar** (Baseline Forecasts).

### Neuen Event hinzufügen

```javascript
{
  year: 2028,
  month: 4,
  pillar: "tech",                       // siehe PILLAR_META
  title: "Kurzer Titel",
  desc: "Beschreibung in 1-2 Sätzen.",
  type: "forecast",                     // past | now | forecast | vision
  confidence: 75,                       // optional, nur für forecast/vision
  side: "left",                         // left oder right (Spine Position)
  size: "medium"                        // small, medium, large
}
```

Einfach in das `TIMELINE_EVENTS` Array reinpushen. Sortierung passiert automatisch nach Jahr und Monat.

---

## 🎯 9 Pillars

## 📐 3 Card Größen

| Size | Visual | Interaktion |
|------|--------|-------------|
| **large** | Volle Card mit Beschreibung, prominent | Click öffnet Modal |
| **medium** | Standard Card mit Beschreibung | Click öffnet Modal |
| **small** | Kompakte Pill mit nur Titel und + Icon | Click expandiert inline, nochmal Click kollabiert. Double Click öffnet Modal |

Nutze `large` für Mega Events (iPhone, ChatGPT, 9/11), `medium` für wichtige aber nicht epochale Events, `small` für Color und Context.

---

## 🎯 9 Pillars

| Key | Label | Farbe |
|-----|-------|-------|
| `tech` | Tech & AI | Sand |
| `crypto` | Crypto & Web3 | Peach |
| `business` | Business | Mint |
| `banking` | Banking | Gelb |
| `marketing` | Marketing | Rose |
| `pop` | Pop Culture | Lavender |
| `culture` | Culture | Coral |
| `design` | Design | Sky Blue |
| `nader` | Nader Milestones | Schwarz + Gelb |

---

## ⌨️ Keyboard Shortcuts

- `H` Hellseher Modus toggle
- `N` Springe zu Now (2026)
- `Esc` Modal schließen

---

## 🛠️ Tech Stack

- **HTML + CSS + Vanilla JS** kein Build Step, läuft überall
- **Google Fonts** Inter + Instrument Serif
- **IntersectionObserver** für Fade In und Decade Tracking
- **CSS Animations** für pulsierende Now Marker und Hellseher Stars
- **No Dependencies** keine Library, keine Frameworks

---

## 📁 Files

```
Dashboard/
├── index.html         Struktur
├── style.css          Design System und Animationen
├── app.js             Render, Scroll, Filter, Modal Logik
├── timeline-data.js   Events 2000 bis 2100 plus PILLAR_META
└── README.md          Diese Datei
```

---

## 🔄 Workflow für Updates

1. Neue Erkenntnisse aus dem täglichen Pulse Check rein in `timeline-data.js`
2. Page reload → Event ist da
3. Optional: Confidence Score anpassen wenn Vorhersage bestätigt oder widerlegt
4. Past Events ersetzen ihre forecast Counterparts wenn sie eintreten

---

## 🎬 Erweiterungs Ideen

- [ ] Search Bar
- [ ] Share Link Generator (URL hash zu Event)
- [ ] Export als PDF Jahres Übersicht
- [ ] Audio Playback der Insights (Text to Speech)
- [ ] Notion Sync (Events aus TrendPulse Daily Database automatisch laden)
- [ ] Confidence Visualisierung als Heat Map
- [ ] Sound Design: subtle ticks beim Scrollen über Years
