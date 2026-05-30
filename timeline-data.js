/**
 * TrendPulse Timeline Data
 * 2000 bis 2100 — Vergangenheit, Jetzt, Forecast, Vision
 *
 * type:
 *   past      historische Tatsache
 *   now       aktuelles Signal (2026)
 *   forecast  hohe Wahrscheinlichkeit, datengetrieben
 *   vision    Hellseher Modus, spekulativ
 *
 * pillar:
 *   tech, crypto, business, banking, marketing, pop, culture, design, nader
 *
 * confidence: 0 bis 100 (nur für forecast und vision relevant)
 * side: left oder right (Spine Position)
 * size: small, medium, large (Visual Gewicht)
 */

const TIMELINE_EVENTS = [
  // ═══════════════════════════════════════════════════════
  // 2000s – DIGITAL DAWN
  // ═══════════════════════════════════════════════════════
  { year: 2000, month: 3, pillar: "business", title: "Dot Com Crash", desc: "Nasdaq verliert 78% in 18 Monaten. Über 800 Mrd USD vernichtet.", type: "past", side: "left", size: "large" },
  { year: 2000, month: 6, pillar: "tech", title: "Human Genome entschlüsselt", desc: "Erste Sequenzierung abgeschlossen. Biotech Revolution beginnt.", type: "past", side: "right", size: "medium" },
  { year: 2001, month: 9, pillar: "culture", title: "9/11", desc: "Welt verändert sich. Sicherheits, Tech und Geopolitik Diskurs auf Jahrzehnte geprägt.", type: "past", side: "left", size: "large" },
  { year: 2001, month: 10, pillar: "tech", title: "iPod Launch", desc: "1.000 Songs in der Tasche. Apple beginnt die Hardware Software Lifestyle Ära.", type: "past", side: "right", size: "medium" },
  { year: 2003, month: 4, pillar: "tech", title: "MySpace startet", desc: "Erste Massen Social Plattform. Vorbote von Facebook und Instagram.", type: "past", side: "left", size: "small" },
  { year: 2004, month: 2, pillar: "tech", title: "Facebook gegründet", desc: "Zuckerberg startet im Harvard Dorm. Beginn des Social Graph Zeitalters.", type: "past", side: "right", size: "large" },
  { year: 2005, month: 2, pillar: "pop", title: "YouTube launches", desc: "Erste Video Upload Plattform. Creator Economy embryonal.", type: "past", side: "left", size: "medium" },
  { year: 2006, month: 3, pillar: "marketing", title: "Twitter geht live", desc: "140 Zeichen verändern Journalismus, Politik, Werbung.", type: "past", side: "right", size: "medium" },
  { year: 2007, month: 1, pillar: "tech", title: "iPhone Launch", desc: "Smartphone Ära beginnt. Touchscreen wird Standard. Apps werden zum Markt.", type: "past", side: "left", size: "large" },
  { year: 2008, month: 9, pillar: "banking", title: "Lehman Brothers Crash", desc: "Globale Finanzkrise. QE Ära beginnt. Vertrauen in Banken kollabiert.", type: "past", side: "right", size: "large" },
  { year: 2008, month: 10, pillar: "crypto", title: "Bitcoin Whitepaper", desc: "Satoshi publiziert. Antwort auf die Finanzkrise. Genesis des Crypto Universums.", type: "past", side: "left", size: "large" },
  { year: 2009, month: 1, pillar: "crypto", title: "Bitcoin Genesis Block", desc: "Erster Block gemined. Headline aus The Times eingraviert.", type: "past", side: "right", size: "medium" },
  { year: 2009, month: 3, pillar: "tech", title: "WhatsApp gegründet", desc: "Messaging wird global, SMS stirbt langsam.", type: "past", side: "left", size: "small" },

  // ═══════════════════════════════════════════════════════
  // 2010s – PLATFORM ERA
  // ═══════════════════════════════════════════════════════
  { year: 2010, month: 4, pillar: "tech", title: "iPad Launch", desc: "Tablet Markt entsteht. Touch wird Mainstream.", type: "past", side: "right", size: "medium" },
  { year: 2010, month: 10, pillar: "marketing", title: "Instagram launches", desc: "Foto Filter werden zur Sprache. Aesthetic Wars beginnen.", type: "past", side: "left", size: "large" },
  { year: 2011, month: 5, pillar: "pop", title: "Bin Laden Killed", desc: "End einer Ära. Trump fragt 5 Jahre später Hillary danach.", type: "past", side: "right", size: "small" },
  { year: 2011, month: 10, pillar: "tech", title: "Steve Jobs stirbt", desc: "Ende einer Visionärs Ära. Apple wird zum Operator.", type: "past", side: "left", size: "medium" },
  { year: 2012, month: 4, pillar: "business", title: "Facebook kauft Instagram", desc: "1 Mrd USD. Späterer Wert: über 100 Mrd. Beste Akquisition aller Zeiten.", type: "past", side: "right", size: "medium" },
  { year: 2013, month: 6, pillar: "culture", title: "Snowden Leaks", desc: "NSA Überwachung exposed. Privacy Diskurs entsteht.", type: "past", side: "left", size: "medium" },
  { year: 2014, month: 3, pillar: "tech", title: "Facebook kauft Oculus", desc: "VR Ära soll kommen. Sie kommt nicht wie geplant.", type: "past", side: "right", size: "small" },
  { year: 2015, month: 7, pillar: "tech", title: "OpenAI gegründet", desc: "Musk, Altman, Brockman starten Non Profit. Beginn der modernen AI Ära.", type: "past", side: "left", size: "large" },
  { year: 2016, month: 6, pillar: "culture", title: "Brexit Vote", desc: "UK verlässt EU. Populismus Welle global.", type: "past", side: "right", size: "medium" },
  { year: 2016, month: 11, pillar: "culture", title: "Trump gewinnt", desc: "Social Media Politik wird unausweichlich.", type: "past", side: "left", size: "medium" },
  { year: 2017, month: 12, pillar: "crypto", title: "Bitcoin erreicht 20.000 USD", desc: "Erste richtige Crypto Bubble. ICO Boom.", type: "past", side: "right", size: "medium" },
  { year: 2018, month: 5, pillar: "design", title: "Apple bringt Notch", desc: "iPhone X. Design Konvention wird zur Pflicht für alle.", type: "past", side: "left", size: "small" },
  { year: 2018, month: 8, pillar: "marketing", title: "TikTok global", desc: "ByteDance kauft Musical.ly. Algorithmus First Era beginnt.", type: "past", side: "right", size: "large" },
  { year: 2019, month: 11, pillar: "pop", title: "Disney+ launcht", desc: "Streaming Wars Phase 2. Netflix Monopol bricht.", type: "past", side: "left", size: "medium" },
  { year: 2019, month: 12, pillar: "culture", title: "COVID 19 in Wuhan", desc: "Letzter Monat der alten Welt.", type: "past", side: "right", size: "small" },

  // ═══════════════════════════════════════════════════════
  // 2020s – ACCELERATION
  // ═══════════════════════════════════════════════════════
  { year: 2020, month: 3, pillar: "culture", title: "Globaler Lockdown", desc: "Pandemie verändert Arbeit, Konsum, Mental Health. Remote First geboren.", type: "past", side: "left", size: "large" },
  { year: 2020, month: 6, pillar: "tech", title: "GPT 3 Launch", desc: "Erstes Mal: AI fühlt sich wie AI an. 175 Mrd Parameter.", type: "past", side: "right", size: "large" },
  { year: 2020, month: 12, pillar: "banking", title: "Zinsen weltweit bei 0%", desc: "Free Money Ära Höhepunkt. Asset Inflation explodiert.", type: "past", side: "left", size: "medium" },
  { year: 2021, month: 1, pillar: "business", title: "GameStop Short Squeeze", desc: "Reddit gegen Wall Street. Retail Investoren formieren sich.", type: "past", side: "right", size: "medium" },
  { year: 2021, month: 4, pillar: "crypto", title: "Coinbase IPO", desc: "Crypto wird Wall Street. Bitcoin bei 64.000 USD.", type: "past", side: "left", size: "medium" },
  { year: 2021, month: 11, pillar: "crypto", title: "Bitcoin All Time High", desc: "69.000 USD. NFT Sommer in vollem Gang.", type: "past", side: "right", size: "medium" },
  { year: 2022, month: 2, pillar: "culture", title: "Russland überfällt Ukraine", desc: "Energiekrise, Inflation, Geopolitik Reset.", type: "past", side: "left", size: "large" },
  { year: 2022, month: 5, pillar: "crypto", title: "Terra Luna Crash", desc: "60 Mrd USD vernichtet. Algo Stablecoins gescheitert.", type: "past", side: "right", size: "medium" },
  { year: 2022, month: 11, pillar: "tech", title: "ChatGPT Launch", desc: "100 Mio Nutzer in 2 Monaten. Schnellste Tech Adoption der Geschichte.", type: "past", side: "left", size: "large" },
  { year: 2022, month: 11, pillar: "crypto", title: "FTX kollabiert", desc: "SBF verhaftet. Crypto Winter beginnt.", type: "past", side: "right", size: "medium" },
  { year: 2023, month: 3, pillar: "tech", title: "GPT 4 launcht", desc: "Multimodal. Reasoning sprung. Plugins als erste Agents.", type: "past", side: "left", size: "large" },
  { year: 2023, month: 7, pillar: "marketing", title: "Threads launcht", desc: "100 Mio User in 5 Tagen. Meta vs X Battle.", type: "past", side: "right", size: "small" },
  { year: 2023, month: 11, pillar: "tech", title: "OpenAI Board Drama", desc: "Altman gefeuert und in 5 Tagen zurück. Microsoft konsolidiert Power.", type: "past", side: "left", size: "medium" },
  { year: 2024, month: 1, pillar: "crypto", title: "Bitcoin Spot ETF approved", desc: "BlackRock & Co öffnen TradFi Tor. Institutionelle Ära beginnt.", type: "past", side: "right", size: "large" },
  { year: 2024, month: 3, pillar: "tech", title: "Claude 3 Family", desc: "Anthropic positioniert sich als Frontier Player. Reasoning wird Standard.", type: "past", side: "left", size: "medium" },
  { year: 2024, month: 5, pillar: "tech", title: "GPT 4o multimodal", desc: "Voice, Vision, Text in Echtzeit. Her Movie Moment.", type: "past", side: "right", size: "medium" },
  { year: 2024, month: 11, pillar: "culture", title: "Trump zurück im Weißen Haus", desc: "Crypto und AI Dereg Welle erwartet.", type: "past", side: "left", size: "medium" },
  { year: 2025, month: 1, pillar: "tech", title: "DeepSeek schockt Silicon Valley", desc: "China Modell auf GPT 4 Niveau für Bruchteil der Kosten.", type: "past", side: "right", size: "large" },
  { year: 2025, month: 3, pillar: "tech", title: "Agentic AI Boom startet", desc: "Manus, Devin, Operator. AI macht echte Tasks.", type: "past", side: "left", size: "medium" },
  { year: 2025, month: 7, pillar: "crypto", title: "GENIUS Act passiert", desc: "US Stablecoin Regulierung beschlossen. Klare Spielregeln.", type: "past", side: "right", size: "medium" },
  { year: 2025, month: 9, pillar: "tech", title: "GPT 5 Launch", desc: "Unified System mit internem Router. AGI Diskussion intensiviert sich.", type: "past", side: "left", size: "large" },
  { year: 2025, month: 11, pillar: "design", title: "Apple Liquid Glass", desc: "Design Sprache neu. Counter Movement formiert sich sofort.", type: "past", side: "right", size: "medium" },

  // ═══════════════════════════════════════════════════════
  // 2026 – NOW (TrendPulse Inaugural)
  // ═══════════════════════════════════════════════════════
  { year: 2026, month: 1, pillar: "tech", title: "Claude 4.5 autonom Stunden lang", desc: "Anthropic zeigt Multi Hour Coding Agents. Multi Agent Stacks werden Norm.", type: "now", side: "left", size: "large" },
  { year: 2026, month: 2, pillar: "banking", title: "ECB hält Zinsen bei 2,15%", desc: "Pause Phase, aber Hike Diskussion wegen Iran Krieg Inflation.", type: "now", side: "right", size: "medium" },
  { year: 2026, month: 3, pillar: "business", title: "Europa VC AI 9,2 Mrd Q1", desc: "50% des EU Funding in AI. Konzentration auf wenige große Tickets.", type: "now", side: "left", size: "medium" },
  { year: 2026, month: 4, pillar: "crypto", title: "CLARITY Act im Senat", desc: "Yield Stablecoin Regeln werden konkret. Banking Treasury setzt Standards.", type: "now", side: "right", size: "medium" },
  { year: 2026, month: 5, pillar: "culture", title: "Comfort Culture explodiert", desc: "Gen Z romantisiert Ruhe. Hustle Sprache wird unattraktiv.", type: "now", side: "left", size: "large" },
  { year: 2026, month: 5, pillar: "marketing", title: "60 bis 90s schlägt 15s", desc: "Reels und Shorts Algorithmen belohnen längere Formate. TikTok bleibt kurz.", type: "now", side: "right", size: "medium" },
  { year: 2026, month: 5, pillar: "design", title: "Neo Brutalism dominiert UI", desc: "Anti Polish, raw Layouts, intentional incompleteness.", type: "now", side: "left", size: "medium" },
  { year: 2026, month: 5, pillar: "nader", title: "TrendPulse geht live", desc: "Naders 15ter Agent startet. Foresight wird Teil des Daily Workflow.", type: "now", side: "right", size: "small" },
  { year: 2026, month: 6, pillar: "pop", title: "Summer of Spectacle", desc: "Nolan Odyssey, Spielberg Disclosure Day, Toy Story 5, Mandalorian Film.", type: "now", side: "left", size: "medium" },

  // ═══════════════════════════════════════════════════════
  // CONFIRMED FUTURE EVENTS — festes Datum, 100% sicher
  // Blau markiert, kein Zweifel. Nur Frage wann, nicht ob.
  // ═══════════════════════════════════════════════════════
  { year: 2026, month: 6, day: 11, pillar: "pop", title: "FIFA World Cup 2026", desc: "Größte WM aller Zeiten. 48 Teams, 3 Länder: USA, Kanada, Mexiko. Finale im MetLife Stadium New Jersey.", type: "forecast", confirmed: true, side: "right", size: "large", impact: ["16 Host Cities erleben Tourismus-Boom. Hotels ausgebucht 18 Monate vorher, AirBnB Preise verdreifachen sich", "US Soccer Markt explodiert: MLS Streaming Deals, Jugend-Akademien werden neu finanziert", "Visa Drama für internationale Fans, mögliche US Grenzpolitik wird heißes Wahlkampfthema", "Erste 48-Team WM bringt Newcomer wie Kap Verde, Usbekistan auf die Weltbühne"] },
  { year: 2027, month: 4, day: 25, pillar: "culture", title: "Frankreich Présidentielle", desc: "Macrons zweite Amtszeit endet. Neuwahl entscheidet Europas politische Richtung für die nächste Dekade.", type: "forecast", confirmed: true, side: "left", size: "medium", impact: ["Erste Wahl nach Macron Ära. EU politische Achse wird neu kalibriert", "Le Pen vs Konservative vs Linke Koalition als Showdown", "AI in französischer Wahlkampagne erstmals zentral. Regulatory Diskurs", "EU Reform Pläne abhängig vom Wahlausgang. Deutsch-französische Achse"] },
  { year: 2027, month: 5, day: 7, pillar: "pop", title: "Avengers: Secret Wars", desc: "Marvel Kino-Finale des Multiverse Saga. Offiziell angekündigt für Mai 2027. Größtes Ensemble der MCU Geschichte.", type: "forecast", confirmed: true, side: "right", size: "large", impact: ["MCU Multiverse Saga endet. Phase 7 startet mit neuer Generation Helden", "Robert Downey Jr Doctor Doom Höhepunkt. Industriegeschichte schreibend", "Disney Aktien-Highlight. Investor Calls drehen sich monatelang um den Film", "Streaming Subs Boost. Marvel Heavy Inhalte als Disney+ Lebensader bestätigt"] },
  { year: 2027, month: 10, day: 1, pillar: "pop", title: "The Batman 2", desc: "Matt Reeves Sequel mit Robert Pattinson. Warner Bros bestätigt. Dunkler, psychologischer Noir Ansatz.", type: "forecast", confirmed: true, side: "left", size: "small" },
  { year: 2028, month: 7, day: 14, pillar: "pop", title: "Olympische Spiele Los Angeles", desc: "Sommer 2028. LA Olympic Games. Erste Spiele in den USA seit Atlanta 1996. Neue Sportarten, Record Audience.", type: "forecast", confirmed: true, side: "right", size: "large", impact: ["Erste Spiele in USA seit Atlanta 1996. LA Infrastruktur Investment über 7 Mrd USD", "Flag Football, Cricket, Lacrosse, Squash als neue Sportarten", "Klimaanlagen für extreme Hitze als zentrales Thema, Klima-Adaption sichtbar", "Hollywood Marketing rund um Sport: Athletes werden globale Stars über Nacht"] },
  { year: 2028, month: 11, day: 7, pillar: "culture", title: "US Presidential Election", desc: "Nächste Wahl ins Weiße Haus. Nach zwei Trump Amtszeiten entscheidet sich die Richtung der USA für eine Generation.", type: "forecast", confirmed: true, side: "left", size: "large", impact: ["Erste post-Trump Wahl. Generationenwechsel in Republikaner und Demokraten Parteien", "AI generierte Deepfakes und Wahlmanipulation als Hauptthema", "Junge Wähler (Gen Z) verschieben Demographie nachhaltig. Sozialpolitik Verschiebung", "Globale Märkte preisen ein. Dollar Volatilität, Tech Aktien reagieren scharf"] },
  { year: 2029, month: 9, pillar: "culture", title: "Bundestagswahl Deutschland", desc: "Reguläre Wahl. Wie sieht Deutschland nach 4 Jahren KI Revolution aus? Wer führt das Land in die 2030er?", type: "forecast", confirmed: true, side: "right", size: "medium" },
  { year: 2030, month: 6, day: 13, pillar: "pop", title: "FIFA World Cup 2030", desc: "100 Jahre WM Jubiläum. Austragungsorte: Spanien, Portugal, Marokko plus Argentinien und Uruguay. Historisches Event.", type: "forecast", confirmed: true, side: "left", size: "large", impact: ["100 Jahre WM Jubiläum. Erstes Spiel symbolisch in Montevideo (Uruguay 1930)", "Drei Kontinente, sechs Länder: logistisch komplexester Sport-Event aller Zeiten", "Spanien, Portugal, Marokko und Argentinien, Paraguay, Uruguay als Hubs", "Carbon Footprint Diskussion eskaliert. Klima Aktivismus zentral im Marketing"] },
  { year: 2032, month: 7, day: 23, pillar: "pop", title: "Olympische Spiele Brisbane", desc: "Sommer 2032 in Australien. Erste Spiele auf dem 5. Kontinent seit Sydney 2000. Nachhaltigkeitsfokus.", type: "forecast", confirmed: true, side: "right", size: "medium" },
  { year: 2034, month: 6, pillar: "pop", title: "FIFA World Cup 2034 Saudi Arabia", desc: "Erste WM im Mittleren Osten nach Katar. Saudi Vision 2030 im Sportwashing Finale. Klimatisch und politisch umstritten.", type: "forecast", confirmed: true, side: "left", size: "medium", impact: ["Erste WM im Mittleren Osten nach Katar. Saudi Vision 2030 Sportwashing Höhepunkt", "Menschenrechts-Boykotts und politische Spannungen dominieren Marketing", "Klimatisierte Stadien als technische Innovation. Energie-Footprint extrem umstritten", "FIFA Reform Diskussion erneut auf G20 Agenda. Strukturen werden hinterfragt"] },
  { year: 2036, month: 7, day: 25, pillar: "pop", title: "Olympische Spiele 2036", desc: "Gastgeber noch offen. Indien und Deutschland bewerben sich. Letzte Spiele vor möglichem Formatwandel durch AI.", type: "forecast", confirmed: true, side: "right", size: "small" },

  // ═══════════════════════════════════════════════════════
  // BIG WORLD EVENTS — Deep Research Sammlung
  // Confidence = Wichtigkeit (100 = mega global, 30 = niche)
  // ═══════════════════════════════════════════════════════

  // ─── 2026 (Rest des Jahres) ──────────────────────────
  { year: 2026, month: 5, day: 1, pillar: "pop", title: "Avengers: Doomsday", desc: "Marvel Mega Film. Robert Downey Jr. kehrt als Doctor Doom zurück. Multiverse Saga Höhepunkt vor Secret Wars.", type: "forecast", confirmed: true, confidence: 95, side: "left", size: "large", impact: ["Robert Downey Jr Comeback als Doctor Doom definiert MCU Phase 6 komplett", "Disney Aktie reagiert auf Box Office: 1 Mrd USD Schwelle als Wendepunkt für Strategie", "Disney+ Subscription Boost in Marvel-Heavy Phase, +12 Mio Subs erwartet", "Drehbuch-Leaks und Reddit Theorien dominieren Pop Culture Diskurs für Monate"] },
  { year: 2026, month: 5, day: 16, pillar: "pop", title: "Eurovision Song Contest Wien", desc: "Österreich Gastgeber nach JJs Sieg 2025. Wien Stadthalle. Über 200 Millionen Zuschauer global.", type: "forecast", confirmed: true, confidence: 75, side: "right", size: "medium", impact: ["Wien wird Tourismus-Hub für 3 Wochen. Hotelpreise verdreifachen sich, Stadt komplett ausgebucht", "Politik-Kontroversen um Israel-Teilnahme kochen erneut hoch, Boykott-Debatten", "Bookmaker Märkte erleben Wett-Volumen-Peak des Jahres", "Über 200 Mio TV Zuschauer global. Comeback-Versuche bekannter Künstler dominieren"] },
  { year: 2026, month: 5, day: 4, pillar: "pop", title: "Bad Bunny im Madison Square Garden", desc: "4. Mai 2026. Erste US Stadion-Show nach Puerto Rico Residency die Demand Records brach.", type: "forecast", confirmed: true, confidence: 65, side: "left", size: "small" },
  { year: 2026, month: 5, pillar: "pop", title: "Cannes Film Festival 2026", desc: "Wichtigstes Filmfestival der Welt. Premieren der Awards-Saison. Goldene Palme als künstlerischer Olymp.", type: "forecast", confirmed: true, confidence: 70, side: "right", size: "small" },
  { year: 2026, month: 5, day: 22, pillar: "pop", title: "Star Wars: The Mandalorian & Grogu", desc: "22. Mai 2026. Erster Mandalorian Kinofilm. Pedro Pascal mit Baby Yoda zurück auf der Leinwand.", type: "forecast", confirmed: true, confidence: 80, side: "left", size: "medium", impact: ["Pedro Pascal Karriere Phase Highlight. Star Wars Live Action Kino-Revival", "Disney testet Streaming-zu-Kino Übergang als neues Geschäftsmodell", "Merchandising Welle für Baby Yoda Generation Z bleibt stabil weiter", "Star Wars Cinematic Universe Phase startet offiziell mit zentralen Pillars"] },
  { year: 2026, month: 6, pillar: "culture", title: "G7 Gipfel Evian Frankreich", desc: "15. bis 17. Juni. Macron als Gastgeber. Themen: KI Regulierung, Ukraine, Klima, Handelspolitik.", type: "forecast", confirmed: true, confidence: 85, side: "right", size: "medium" },
  { year: 2026, month: 6, pillar: "tech", title: "Apple WWDC 2026", desc: "Apples Entwickler Konferenz. Vermutlich iOS 20 mit tieferer AI Integration. Vision Pro 2 Andeutungen.", type: "forecast", confirmed: true, confidence: 75, side: "left", size: "small" },
  { year: 2026, month: 6, pillar: "pop", title: "Beyoncé Cowboy Carter Stadium Tour", desc: "Sommer Stadion Tour startet 12. Juni Soldier Field Chicago. Country meets R&B Mega Spektakel.", type: "forecast", confirmed: true, confidence: 75, side: "right", size: "medium" },
  { year: 2026, month: 7, pillar: "pop", title: "Wimbledon 2026", desc: "Tennis Grand Slam auf heiligem Rasen. Centre Court. Strawberries & Cream. Ältestes Tennis Turnier der Welt.", type: "forecast", confirmed: true, confidence: 75, side: "left", size: "small" },
  { year: 2026, month: 7, day: 17, pillar: "pop", title: "Christopher Nolan: The Odyssey", desc: "17. Juli 2026. Matt Damon als Odysseus. IMAX 70mm Epos nach Oppenheimer. Eines der wichtigsten Filme der Dekade.", type: "forecast", confirmed: true, confidence: 88, side: "right", size: "large", impact: ["Matt Damon Karriere Phase 2 definiert sich. Academy Awards Diskurs startet sofort", "IMAX 70mm Renaissance. Cinemark und AMC investieren in Format-Upgrades", "Kompetition mit Sommer Blockbustern verschiebt Release Strategien anderer Studios", "Antike Mythologie als Bildungs-Trend in Schulen und Universitäten"] },
  { year: 2026, month: 7, pillar: "pop", title: "Tour de France 2026", desc: "113. Tour de France. Über 3.500 km. Grand Départ noch zu bestätigen. Slowenisch-dänischer Zweikampf erwartet.", type: "forecast", confirmed: true, confidence: 65, side: "left", size: "small" },
  { year: 2026, month: 8, day: 22, pillar: "pop", title: "Coldplay Music of the Spheres Finale", desc: "22. August. Wembley Stadium London. Größte Tour der Bandgeschichte endet nach 4 Jahren und 200 Shows.", type: "forecast", confirmed: true, confidence: 70, side: "right", size: "medium", impact: ["Wembley Stadium als emotionaler Abschluss nach 4 Jahren Tour", "Tour Bilanz: über 1.5 Mrd USD Umsatz. Größte Tour aller Zeiten", "Klimaneutrale Stadion-Tour als neuer Standard für Konzert Industrie", "Chris Martin Solo Karriere Diskurs beginnt offiziell"] },
  { year: 2026, month: 9, pillar: "tech", title: "iPhone 18 Launch", desc: "September Keynote in Cupertino. Erstes iPhone mit Faltdisplay erwartet. AI Chip Generation 3.", type: "forecast", confirmed: true, confidence: 85, side: "left", size: "medium" },
  { year: 2026, month: 9, pillar: "pop", title: "US Open Tennis 2026", desc: "Letztes Grand Slam des Jahres. Arthur Ashe Stadium. New York. Höchste Preisgelder im Tennis.", type: "forecast", confirmed: true, confidence: 70, side: "right", size: "small" },
  { year: 2026, month: 10, pillar: "culture", title: "Brasilien Wahl 2026", desc: "Oktober. Lula vs Konservative. Amazonas Schutz, Wirtschaftskrise, soziale Programme zentral. 215 Mio Einwohner entscheiden.", type: "forecast", confirmed: true, confidence: 85, side: "left", size: "medium", impact: ["Lula nicht mehr antreten dürfen Frage. Bolsonaro Comeback Versuch zentral", "Amazonas Schutz vs Wirtschaft als Hauptlinie der Wahlkampagne", "USA Beziehungen abhängig vom Wahlausgang. Geopolitisch hochrelevant", "215 Mio Einwohner entscheiden. Größte Demokratie Südamerikas an Wendepunkt"] },
  { year: 2026, month: 10, pillar: "pop", title: "World Series MLB 2026", desc: "Baseball Finalserie. America's Pastime auf größter Bühne. Best of seven. 100+ Millionen Zuschauer USA.", type: "forecast", confirmed: true, confidence: 75, side: "right", size: "small" },
  { year: 2026, month: 11, day: 3, pillar: "culture", title: "US Midterm Elections", desc: "3. November. 435 House Sitze, 35 Senate Seats. Erste Bewertung der zweiten Trump Amtszeit. Indikator für 2028.", type: "forecast", confirmed: true, confidence: 95, side: "left", size: "large", impact: ["Erste Bewertung der zweiten Trump Amtszeit. Senate und House Verschiebungen", "Demokraten Strategie für 2028 manifestiert sich konkret in Kandidaten und Themen", "Wall Street reagiert: Sektor-Performance je nach Mehrheits-Konstellation", "AI generierte Wahlwerbung erstmals Mainstream. Regulatorische Debatte folgt sofort"] },
  { year: 2026, month: 11, day: 20, pillar: "pop", title: "Hunger Games: Sunrise on the Reaping", desc: "20. November. Prequel zu Catching Fire. Haymitch Abernathys 50. Hunger Games. Lionsgate Mega Release.", type: "forecast", confirmed: true, confidence: 75, side: "right", size: "small", impact: ["Haymitch Abernathy Origin Story als Generation-übergreifendes Phänomen", "Lionsgate Aktie reagiert. Franchise als finanzielles Standbein bestätigt", "Dystopien als Genre erleben weiteren Boom. Buch Verkäufe der Reihe explodieren", "Young Adult Romantasy und Dystopie als Hollywoods sicherster Bet bestätigt"] },
  { year: 2026, month: 12, day: 23, pillar: "pop", title: "Shrek 5", desc: "23. Dezember 2026. Erster Shrek Film seit 16 Jahren. DreamWorks Comeback. Original Cast zurück.", type: "forecast", confirmed: true, confidence: 72, side: "left", size: "small", impact: ["DreamWorks Animation Comeback nach 16 Jahren Shrek Pause", "Original Cast zurück: Eddie Murphy, Cameron Diaz, Mike Myers in Nostalgie-Phase", "Holiday Season Box Office Schlacht mit Avatar 4 wenn beide Dezember", "Mid-30er Millennials Generation Sentimentalität als zentraler Markt"] },
  { year: 2026, month: 12, pillar: "marketing", title: "Spotify Wrapped 2026", desc: "Größte virale Marketing Kampagne der Welt. Jeder User teilt seine Daten. AI personalisiert Storytelling.", type: "forecast", confidence: 55, side: "right", size: "small" },

  // ─── 2027 ─────────────────────────────────────────────
  { year: 2027, month: 1, pillar: "business", title: "Davos World Economic Forum 2027", desc: "57. WEF Annual Meeting. 3000+ Leader. Themen: KI Governance, Klima, Geopolitik nach Wahlen.", type: "forecast", confirmed: true, confidence: 70, side: "left", size: "small" },
  { year: 2027, month: 2, day: 7, pillar: "pop", title: "Super Bowl LXI", desc: "2. Sonntag im Februar. NFL Championship. Halftime Show wird Mega Event. 100+ Mio US Zuschauer.", type: "forecast", confirmed: true, confidence: 95, side: "right", size: "large", impact: ["Werbeplätze über 9 Mio USD pro 30 Sekunden. Branchen Rekord wird gebrochen", "Halftime Show Künstler wird global größter Pop Moment des Jahres", "TikTok und Instagram Memes vom Halftime dominieren Februar komplett", "Wett-Industrie Hochsaison: Legal Sports Betting USA bricht Volumen Rekorde"] },
  { year: 2027, month: 5, day: 29, pillar: "pop", title: "Champions League Final 2027 Madrid", desc: "Endspiel im Santiago Bernabéu. Königliche Bühne des Fußballs. 1 Milliarde Zuschauer global.", type: "forecast", confirmed: true, confidence: 85, side: "left", size: "medium", impact: ["Santiago Bernabéu als Final-Bühne. Real Madrid Heimspiel-Faktor wäre historisch", "Erste CL Final mit komplett überarbeitetem Format seit 2024 Reform", "UEFA Einnahmen aus Final-Wochenende über 600 Mio EUR", "Madrid Tourismus Wochenende für 3 Tage komplett ausgebucht"] },
  { year: 2027, month: 5, day: 22, pillar: "pop", title: "Star Wars: Starfighter", desc: "22. Mai 2027. Neuer Star Wars Mainline Film. Ryan Gosling als Lead. Era zwischen Rise of Skywalker und neuen Filmen.", type: "forecast", confirmed: true, confidence: 82, side: "right", size: "medium", impact: ["Ryan Gosling als Lead bringt Star Wars zu erwachsenem Publikum zurück", "Era zwischen Rise of Skywalker und neuen Filmen wird Canon", "Disney Aktie reagiert. Bob Iger Strategie wird konkret bewertet", "Lucasfilm Konkurrenz mit Marvel um Phase 6 Aufmerksamkeit"] },
  { year: 2027, month: 7, day: 31, pillar: "pop", title: "Spider-Man: Brand New Day", desc: "31. Juli 2027. Tom Holland zurück als Spider-Man. Erster Solo Film nach No Way Home. MCU Reboot Phase.", type: "forecast", confirmed: true, confidence: 85, side: "left", size: "medium", impact: ["Tom Hollands MCU Spider-Man zurück. Sony und Marvel Deal Verlängerung", "Konkurrenz zu DC's Batman 2 in 2027 wird Box Office Schlacht", "Multiverse Concept wird Mainstream akzeptiert in Pop Culture", "Toy Sales Boom für Q3 Holiday Season, Hasbro Aktien reagieren"] },
  { year: 2027, month: 9, pillar: "tech", title: "Artemis III Earth Orbit Test", desc: "Erste bemannte Mission seit Artemis II. SLS/Orion mit Starship HLS und Blue Moon Rendezvous Test im Erdorbit.", type: "forecast", confirmed: true, confidence: 88, side: "right", size: "large" },
  { year: 2027, month: 10, pillar: "pop", title: "Rugby World Cup 2027 Australien", desc: "10. RWC. September bis Oktober. Sydney, Melbourne, Brisbane. All Blacks vs Springboks vs France als Top Anwärter.", type: "forecast", confirmed: true, confidence: 80, side: "left", size: "medium" },
  { year: 2027, month: 10, pillar: "pop", title: "ICC Cricket World Cup 2027", desc: "Südafrika, Zimbabwe, Namibia. 14 Teams. Indien und England als historische Favoriten. 1+ Mrd Zuschauer.", type: "forecast", confirmed: true, confidence: 78, side: "right", size: "medium" },
  { year: 2027, month: 12, day: 17, pillar: "pop", title: "Star Wars Sequel Trilogy Follow-up", desc: "17. Dezember 2027. Daisy Ridley kehrt als Rey Skywalker zurück. New Jedi Order Story. Disney Mega Bet.", type: "forecast", confirmed: true, confidence: 82, side: "left", size: "large" },

  // ─── 2028 ─────────────────────────────────────────────
  { year: 2028, month: 2, day: 6, pillar: "pop", title: "Super Bowl LXII", desc: "NFL Saison Finale. Halftime Show als Mega Pop Event. Werbeplätze über 10 Mio USD pro 30 Sekunden.", type: "forecast", confirmed: true, confidence: 95, side: "right", size: "medium" },
  { year: 2028, month: 3, pillar: "culture", title: "Russland Präsidentschaftswahl", desc: "März 2028. Erste Wahl nach Putins fünfter Amtszeit. Mögliche Übergangsphase. Geopolitisch hochrelevant.", type: "forecast", confirmed: true, confidence: 90, side: "left", size: "large" },
  { year: 2028, month: 3, pillar: "tech", title: "Artemis IV Mond Landung", desc: "Erste bemannte US Mondlandung seit Apollo 17 im Dezember 1972. SLS/Orion plus Starship HLS Lander. Historischer Moment.", type: "forecast", confirmed: true, confidence: 92, side: "right", size: "large", impact: ["Erste bemannte US Mondlandung seit Apollo 17 (Dezember 1972). Historisch und symbolisch", "NASA Aktien-Reaktion: SpaceX, Lockheed Martin, Northrop Grumman Boost", "Live TV Event größer als Super Bowl. Globale Aufmerksamkeit für Wochen", "Lunar Gateway Station Aufbau beginnt. Permanente Mondpräsenz als Ziel"] },
  { year: 2028, month: 6, pillar: "pop", title: "UEFA EURO 2028 UK & Irland", desc: "Juni bis Juli 2028. Wembley als Finale. Erste EM auf britischen Inseln seit 1996. England gegen Frankreich Klassiker erwartet.", type: "forecast", confirmed: true, confidence: 90, side: "left", size: "large", impact: ["Erste EM auf britischen Inseln seit 1996. Brexit Nachwirkungen für Logistik", "Wembley als Final Stadium. Three Lions Heimspiel-Faktor real", "Ireland Politik um Nordirland Spiele politisch sensibel", "Pubs UK und Irland erleben Mega-Wirtschafts-Boom über 4 Wochen"] },
  { year: 2028, month: 10, pillar: "tech", title: "Artemis V zweite Mondlandung", desc: "Späte 2028. Zweite Mondlandung. Lunar Gateway Station beginnt Aufbau. NASA plant jährliche Missionen.", type: "forecast", confirmed: true, confidence: 75, side: "right", size: "medium" },

  // ─── 2029 ─────────────────────────────────────────────
  { year: 2029, month: 1, pillar: "culture", title: "UK General Election spätestens", desc: "Letzter möglicher Termin. Labour Regierung bei Starmer oder Nachfolge. Brexit Folgen, NHS, Wirtschaft zentral.", type: "forecast", confirmed: true, confidence: 88, side: "left", size: "medium" },
  { year: 2029, month: 7, pillar: "pop", title: "Tour de France 2029", desc: "116. Tour. AI Trainings Algorithmen verändern den Sport. Erste Generation der Post-Pogačar Ära.", type: "forecast", confirmed: true, confidence: 60, side: "right", size: "small" },
  { year: 2029, month: 7, day: 20, pillar: "culture", title: "Apollo 11 60 Jahre Jubiläum", desc: "60 Jahre erste Mondlandung. Globale Feier. NASA dann mit Artemis Mondbasis im Aufbau. Symbolisch wichtiger Moment.", type: "forecast", confirmed: true, confidence: 55, side: "left", size: "small" },
  { year: 2029, month: 12, pillar: "pop", title: "Avatar 4: Fire and Ash sequel", desc: "21. Dezember 2029. James Camerons vierter Avatar. Na'vi vs Sky People Krieg eskaliert. Pandora Mythos erweitert.", type: "forecast", confirmed: true, confidence: 88, side: "right", size: "large" },

  // ─── 2030 ─────────────────────────────────────────────
  { year: 2030, month: 2, pillar: "pop", title: "Winter Olympics French Alps 2030", desc: "Februar 2030. Französische Alpen. Nice und Briançon als Hubs. Erste Winterspiele mit echtem Klimanot Plan.", type: "forecast", confirmed: true, confidence: 90, side: "left", size: "large" },
  { year: 2030, month: 4, pillar: "business", title: "EU Climate Plan 2030 Deadline", desc: "55% Emissionsreduktion gegenüber 1990. Stichtag für Pariser Abkommen. Make or break für europäische Klimapolitik.", type: "forecast", confidence: 75, side: "right", size: "large" },
  { year: 2030, month: 6, pillar: "tech", title: "ISS Retirement Target", desc: "Internationale Raumstation soll 2030 kontrolliert deorbitiert werden. Ende einer Ära. Private Stationen übernehmen.", type: "forecast", confidence: 70, side: "left", size: "medium" },
  { year: 2030, month: 7, pillar: "pop", title: "Commonwealth Games Hamilton 100", desc: "100 Jahre Commonwealth Games. Hamilton Kanada als Erstausrichter 1930 und nun 2030. Symbolisches Jubiläum.", type: "forecast", confirmed: true, confidence: 60, side: "right", size: "small" },
  { year: 2030, month: 10, pillar: "business", title: "World Expo 2030 Riad", desc: "Saudi Arabien als Gastgeber. Vision 2030 Mega Showcase. 40+ Millionen Besucher erwartet. Geopolitisches Statement.", type: "forecast", confirmed: true, confidence: 80, side: "left", size: "medium" },

  // ─── 2031 ─────────────────────────────────────────────
  { year: 2031, month: 10, pillar: "pop", title: "Rugby World Cup 2031 USA", desc: "Erste RWC in den USA. Soll Rugby Mainstream in Amerika machen. Hochwetten Investment durch US Eigentümer.", type: "forecast", confirmed: true, confidence: 75, side: "left", size: "medium" },
  { year: 2031, month: 10, pillar: "pop", title: "ICC Cricket World Cup 2031", desc: "Indien und Bangladesh. 50 Over Format. 1.5+ Mrd Zuschauer. Größtes Cricket Event der Welt.", type: "forecast", confirmed: true, confidence: 72, side: "right", size: "medium" },
  { year: 2031, month: 12, day: 19, pillar: "pop", title: "Avatar 5", desc: "19. Dezember 2031. James Camerons fünfter und letzter angekündigter Avatar Film. Pandora Saga Schlusspunkt.", type: "forecast", confirmed: true, confidence: 80, side: "left", size: "large" },

  // ─── 2032 ─────────────────────────────────────────────
  { year: 2032, month: 6, pillar: "pop", title: "UEFA EURO 2032 Italien-Türkei", desc: "Erste Co-Ausrichtung über Kontinente hinweg. Rom, Mailand, Istanbul, Ankara als Hubs. Politisch hochkomplex.", type: "forecast", confirmed: true, confidence: 85, side: "right", size: "medium" },
  { year: 2032, month: 11, pillar: "culture", title: "US Presidential Election 2032", desc: "59. US Wahl. Erste Generation Gen Z Wähler vollständig dominant. Erste vollständig AI-getriebene Kampagnen.", type: "forecast", confirmed: true, confidence: 95, side: "left", size: "large" },

  // ─── 2034 ─────────────────────────────────────────────
  { year: 2034, month: 2, pillar: "pop", title: "Winter Olympics Salt Lake City 2034", desc: "Februar 2034. Salt Lake erneut nach 2002. USA mit drei Sommerspielen plus zwei Winterspielen in 50 Jahren.", type: "forecast", confirmed: true, confidence: 78, side: "right", size: "medium" },

  // ─── Kleinere kulturelle und Tech Events ──────────────
  { year: 2026, month: 11, pillar: "design", title: "Adobe MAX 2026", desc: "Größte Kreativ Konferenz. Photoshop, Premiere, Illustrator Neuvorstellungen. AI Tools Showcase. 30000+ Designer.", type: "forecast", confidence: 45, side: "right", size: "small" },
  { year: 2026, month: 8, pillar: "marketing", title: "Cannes Lions 2026", desc: "Größtes Werbe Festival der Welt. Goldene Löwen. Trends die das Marketing für 12 Monate prägen.", type: "forecast", confidence: 50, side: "left", size: "small" },
  { year: 2027, month: 3, pillar: "tech", title: "GDC Game Developers Conference 2027", desc: "Spieleindustrie Treffpunkt. AI Game Design im Fokus. Indie Boom durch Tools die alles ermöglichen.", type: "forecast", confidence: 40, side: "right", size: "small" },
  { year: 2027, month: 5, pillar: "tech", title: "Apple Vision Pro 2", desc: "Zweite Gen Headset. Leichter, günstiger, Apple Vision OS 3. Mainstream Push für Spatial Computing.", type: "forecast", confidence: 60, side: "left", size: "medium" },
  { year: 2028, month: 1, pillar: "pop", title: "Grammy Awards 2028", desc: "70. Grammy Verleihung. Krönung der besten Musik des Jahres. Album of the Year als Industrie Highlight.", type: "forecast", confidence: 55, side: "right", size: "small" },
  { year: 2028, month: 3, pillar: "pop", title: "Academy Awards 2028", desc: "100. Oscar Verleihung. Jubiläum mit Throwbacks zur 100-jährigen Filmgeschichte. Globaler Pop Culture Moment.", type: "forecast", confirmed: true, confidence: 78, side: "left", size: "medium" },
  { year: 2026, month: 9, pillar: "design", title: "Berlin Design Week 2026", desc: "Berlin als europäisches Design Mekka. Lokale Studios global sichtbar. Aufstrebende Designer Plattform.", type: "forecast", confidence: 35, side: "right", size: "small" },
  { year: 2027, month: 6, pillar: "design", title: "Milan Design Week 2027", desc: "Salone del Mobile. Wichtigste Möbel und Interior Messe. Italiens Design Welt-Showcase.", type: "forecast", confidence: 50, side: "left", size: "small" },

  // ─── Banking und Krypto Spezifisch ────────────────────
  { year: 2026, month: 10, pillar: "banking", title: "Basel IV Final Implementation", desc: "Strengere Eigenkapitalregeln für Banken weltweit. Folge der Finanzkrise 2008. Endgültige Umsetzung in EU und USA.", type: "forecast", confidence: 70, side: "right", size: "medium" },
  { year: 2028, month: 7, pillar: "crypto", title: "Bitcoin Halving 2028", desc: "Vierter Halving Cycle. Block Reward sinkt auf 1.5625 BTC. Historisch Vorläufer für Bull Runs. Knappheit verdoppelt.", type: "forecast", confirmed: true, confidence: 85, side: "left", size: "large", impact: ["Historische Korrelation: BTC Preis steigt 6 bis 18 Monate später signifikant (60 bis 200 Prozent)", "Mining Industrie Konsolidierung. Kleine Miner ohne Skala oder günstigen Strom sterben aus", "Energieverbrauchs-Debatte zurück oben in News. Politik fordert Nachhaltigkeits-Mining", "Crypto VC Welle: Bitcoin Layer 2 Projekte erhalten neues Funding"] },
  { year: 2032, month: 4, pillar: "crypto", title: "Bitcoin Halving 2032", desc: "Fünfter Halving. Reward 0.78125 BTC. Asymptotisch nähert sich BTC 21 Mio Cap. Knappheits Narrativ am Peak.", type: "forecast", confirmed: true, confidence: 75, side: "right", size: "medium" },

  // ─── Music Specials ──────────────────────────────────
  { year: 2027, month: 2, pillar: "pop", title: "BTS Reunion Tour", desc: "Komplette Wiedervereinigung nach Militärdienst aller Mitglieder. Erste vollständige Welttournee seit 2019.", type: "forecast", confidence: 70, side: "left", size: "medium" },
  { year: 2027, month: 6, pillar: "pop", title: "Rihanna Comeback Album", desc: "Erstes Studio Album seit Anti 2016. Über 10 Jahre Warten. Globales Pop Culture Ereignis. Mega Tour erwartet.", type: "forecast", confidence: 60, side: "right", size: "medium" },

  // ═══════════════════════════════════════════════════════
  // DEEP DIVE EXPANSION — Aktuelle Recherche Mai 2026
  // Gaming, TV, Music Tours, China Space, Anniversaries
  // ═══════════════════════════════════════════════════════

  // ─── GAMING MEGA RELEASES ────────────────────────────
  { year: 2026, month: 11, day: 19, pillar: "pop", title: "GTA 6 Release", desc: "19. November 2026. Rockstars größtes Game aller Zeiten. Vice City Setting. Budget über 2 Mrd USD. Verschoben von Mai 2026 für Polish.", type: "forecast", confirmed: true, confidence: 95, side: "left", size: "large", impact: ["Take-Two Interactive Aktie verdoppelt sich. Größtes Entertainment Launch aller Zeiten", "Konkurrenz-Spiele wie Call of Duty verschieben Releases um 6 Monate", "Vice City als Tourismus Boom-City: Miami und Florida erleben Pop Culture Comeback", "Über 100 Mio Sales in 6 Monaten. Gaming Geschichte wird neu geschrieben"] },
  { year: 2027, month: 11, pillar: "tech", title: "PlayStation 6 Launch", desc: "Holiday 2027. Sony Next-Gen Konsole. AMD Ryzen AI Cores, Pathtracing in Echtzeit. Generation Shift im Gaming.", type: "forecast", confidence: 82, side: "right", size: "large", impact: ["Sony Aktie reagiert binnen Tagen. Holiday Season 2027 als entscheidender Test", "AMD Ryzen AI Chip generation wird durch PS6 als Gaming Standard etabliert", "Game Pass vs PS Plus: Subscription Wars verschärfen sich", "Konkurrenz mit Xbox Next-Gen entscheidet Konsolen Generation für 7 Jahre"] },
  { year: 2027, month: 11, pillar: "tech", title: "Xbox Next-Gen Konsole", desc: "Microsoft Project Helix. Holiday 2027. Cloud-Hybrid First. Game Pass Integration vertieft. Konkurrenz zu PS6.", type: "forecast", confidence: 78, side: "left", size: "medium", impact: ["Microsoft Project Helix offiziell. Cloud Hybrid First definiert Gaming Zukunft", "Game Pass Integration tiefer. Konsole als Service Modell setzt sich durch", "Activision Blizzard Studios als Xbox Exclusive Strategy zeigt Wirkung", "Sony PS6 Konter prägt Holiday Season Werbe-Schlacht"] },

  // ─── TV / STREAMING ─────────────────────────────────
  { year: 2026, month: 6, day: 21, pillar: "pop", title: "House of the Dragon S3", desc: "21. Juni 2026 HBO. 8 Episoden bis 9. August. Tanz der Drachen eskaliert. Game of Thrones Universe Höhepunkt.", type: "forecast", confirmed: true, confidence: 78, side: "right", size: "medium", impact: ["HBO Max Subscription Boost um 8 Mio in Premiere Woche", "Game of Thrones Universe Expansion: weitere Spinoffs werden offiziell angekündigt", "Drachen-Special Effects Studios sind 18 Monate ausgebucht", "Mittelalter-Romantasy Bücher erleben Verkaufs-Boom (Romantasy Genre Peak)"] },
  { year: 2026, month: 9, pillar: "pop", title: "The Last of Us Season 3", desc: "HBO Fortsetzung. Abby Storyline aus Part II. Kaitlyn Dever in Hauptrolle. Eine der prestigereichsten Serien.", type: "forecast", confidence: 65, side: "left", size: "small" },
  { year: 2026, month: 10, pillar: "pop", title: "Wednesday Season 2", desc: "Netflix. Jenna Ortega zurück. Tim Burton Regie. Nach Phänomen Erfolg Staffel 1 hoch erwartet.", type: "forecast", confidence: 60, side: "right", size: "small" },
  { year: 2027, month: 1, pillar: "pop", title: "The Mandalorian Season 4", desc: "Disney Plus. Nach dem Kinofilm 2026. Erweiterung des Star Wars TV Universe.", type: "forecast", confidence: 55, side: "left", size: "small" },

  // ─── F1 SAISON HIGHLIGHTS ───────────────────────────
  { year: 2026, month: 3, day: 8, pillar: "pop", title: "F1 2026 Saison Start Melbourne", desc: "Audi und Cadillac als neue Teams. Komplett neue Regeln: 50/50 Hybrid, Active Aero, Overtake Mode statt DRS. Größte Reform seit 2014.", type: "forecast", confirmed: true, confidence: 80, side: "right", size: "large", impact: ["Audi und Cadillac Debut als neue Werks-Teams. Manufacturing Boost in Deutschland und USA", "50/50 Hybrid Regeln transformieren Power Unit Industrie", "Mercedes vs Ferrari vs Red Bull Hierarchie wird neu kalibriert", "Cost Cap Auswirkungen sichtbar. Kleinere Teams können mithalten"] },
  { year: 2026, month: 9, pillar: "pop", title: "F1 Madrid Grand Prix Debut", desc: "September 2026. Erstes Madrid Stadtrennen. Streckenführung um IFEMA Convention Center. Imola raus, Madrid rein.", type: "forecast", confirmed: true, confidence: 65, side: "left", size: "small", impact: ["Erstes Madrid Stadtrennen. IFEMA Convention Center als Kulisse", "Spanien zweite F1 Rennen mit Barcelona Ende des Vertrags", "Carlos Sainz und Fernando Alonso Heimrennen-Effekt", "Stadtrennen-Format als Industrie-Trend bestätigt"] },
  { year: 2026, month: 12, day: 6, pillar: "pop", title: "F1 World Champion 2026 Abu Dhabi", desc: "4. bis 6. Dezember Finale. Erste komplette Saison mit neuen Regeln. Audi Debut Performance entscheidend.", type: "forecast", confirmed: true, confidence: 75, side: "right", size: "medium" },

  // ─── MUSIC TOURS 2026 (BESTÄTIGT) ───────────────────
  { year: 2026, month: 6, pillar: "pop", title: "BTS Arirang World Tour", desc: "Größte K-Pop Tour aller Zeiten. 82 Shows in 34 Städten 2026 bis 2027. Erste komplette Tour nach Militärdienst. Asia, NA, EU, SA.", type: "forecast", confirmed: true, confidence: 80, side: "left", size: "medium", impact: ["82 Shows, 34 Städte: größte K-Pop Tour der Geschichte", "HYBE Aktie als Bewertungs-Indikator für K-Pop Industrie. Korea Tourismus Boost", "ARMY Fan Economy verstetigt sich. K-Pop wird Mainstream-Genre weltweit", "Streaming Records auf Spotify und Apple Music werden kollektiv geknackt"] },
  { year: 2026, month: 7, pillar: "pop", title: "Lady Gaga Mayhem Ball Tour", desc: "Sommer 2026 Nordamerika und Asien. Erste Tour seit Chromatica Ball 2022. Mayhem Album promoten.", type: "forecast", confirmed: true, confidence: 68, side: "right", size: "small", impact: ["Erste große Tour seit Chromatica Ball 2022. Stefani Germanotta Vollkraft zurück", "Pop Performance Standards werden definiert. Konkurrenz wie Beyoncé reagiert", "Mayhem Album als kritische Anerkennung gefeiert. Grammy Vorbereitungen", "LGBTQ+ Community Anthem Moment. Politisch in US Wahlkampf relevant"] },
  { year: 2026, month: 8, pillar: "pop", title: "Ariana Grande Eternal Sunshine Tour", desc: "Erste Welttournee seit 2019 Sweetener Sessions. Nach Wicked Pause zurück mit großem Comeback.", type: "forecast", confidence: 65, side: "left", size: "small" },
  { year: 2026, month: 9, pillar: "pop", title: "The Weeknd Hurry Up Tomorrow Tour", desc: "Finale Tour als The Weeknd. Abel Tesfaye verabschiedet den Künstler. Stadium Globaltour.", type: "forecast", confidence: 70, side: "right", size: "medium" },
  { year: 2026, month: 5, pillar: "pop", title: "Bon Jovi Comeback Tour", desc: "Erste Welttournee nach Stimmband OP. Jon Bon Jovi mit komplettem Setlist Klassiker.", type: "forecast", confidence: 50, side: "left", size: "small", impact: ["Erste Welttournee nach Stimmband Operation 2022", "Klassische Rock Generation X als zahlungskräftigste Konzert-Demographie", "Stadion-Konzerte als Wirtschaftsfaktor: jede Stadt 50-80 Mio EUR Umsatz", "Vinyl und Greatest Hits Verkäufe erleben begleitende Welle"] },
  { year: 2026, month: 9, pillar: "pop", title: "Morgan Wallen Stadium Tour 2026", desc: "Größter Country Star der Gegenwart. Ausverkaufte Stadien quer durch USA. Country Boom Höhepunkt.", type: "forecast", confidence: 55, side: "right", size: "small" },
  { year: 2026, month: 10, pillar: "pop", title: "Rosalía Welttournee", desc: "Spanische Pop Avantgarde. Latino Streaming Königin. Tour folgt erwartetem 4. Album.", type: "forecast", confidence: 50, side: "left", size: "small" },

  // ─── CHINA SPACE PROGRAM ─────────────────────────────
  { year: 2026, month: 11, pillar: "tech", title: "Chang'e 7 Mondsüdpol Mission", desc: "Späte 2026. China Mondsüdpol Erkundung. Orbiter, Lander, fliegende Mini Sonde. Sucht Eis und Ressourcen.", type: "forecast", confirmed: true, confidence: 80, side: "right", size: "medium", impact: ["China Mondsüdpol Erkundung. Wettbewerb mit NASA Artemis intensiviert", "Eis-Funde definieren spätere Mondbasis Strategie", "Diplomatischer Druck auf europäische ESA Partner für China Kooperation", "Russland und China ILRS Mondprogramm bekommt konkrete wissenschaftliche Basis"] },
  { year: 2028, month: 6, pillar: "tech", title: "Chang'e 8 Mond Ressourcen Test", desc: "2028. Erste In-Situ Resource Utilization Tests. 3D Druck Experiment mit Mondmaterial. Vorbereitung Mondbasis.", type: "forecast", confirmed: true, confidence: 72, side: "left", size: "medium" },
  { year: 2029, month: 9, pillar: "tech", title: "China erste bemannte Mondlandung", desc: "2029 oder 2030. Mengzhou Crewed Spacecraft plus Lanyue Lander. Long March 10 Rakete. Symbolischer Sieg im Space Race.", type: "forecast", confidence: 78, side: "right", size: "large", impact: ["Symbolischer Sieg im Space Race. USA Kongress reagiert mit NASA Budget Erhöhung", "Geopolitisch markant. Chinas Position als Weltraum-Großmacht zementiert", "ILRS Mondbasis Aufbau beschleunigt. Russland und 11 Staaten als Partner", "Taiwan Konflikt im Schatten der Mondmission gespannt beobachtet"] },
  { year: 2031, month: 6, pillar: "tech", title: "ILRS International Lunar Research Station", desc: "China führt mit Russland und 11 Staaten Mond-Basis Aufbau. Konkurrenz zu NASA Artemis Gateway.", type: "forecast", confidence: 65, side: "left", size: "medium" },

  // ─── KLIMA / COP CONFERENCES ─────────────────────────
  { year: 2026, month: 11, pillar: "culture", title: "COP31 Klimagipfel", desc: "Türkei und Australien als mögliche Gastgeber. Erste COP nach Pariser 2030 Zwischen-Stocktake. Klimafinanz im Fokus.", type: "forecast", confirmed: true, confidence: 75, side: "right", size: "medium" },
  { year: 2027, month: 11, pillar: "culture", title: "COP32 Klimagipfel", desc: "Afrika voraussichtlicher Gastgeber. Klimaschäden Fonds operativ. Verlust und Schaden Kompensation.", type: "forecast", confidence: 60, side: "left", size: "small" },
  { year: 2028, month: 11, pillar: "culture", title: "COP33 Klimagipfel", desc: "Halbzeit zur Klimaneutralität 2050. Bewertung der Reduktionspfade. Carbon Removal Tech zentral.", type: "forecast", confidence: 55, side: "right", size: "small" },

  // ─── ANNIVERSARIES 2026 ─────────────────────────────
  { year: 2026, month: 1, day: 26, pillar: "tech", title: "100 Jahre erste TV Demo", desc: "26. Januar 1926: John Logie Baird zeigt erste öffentliche TV Vorführung in London. 100 Jahre bewegte Bilder.", type: "forecast", confidence: 40, side: "left", size: "small" },
  { year: 2026, month: 2, day: 14, pillar: "tech", title: "ENIAC 80 Jahre Computer", desc: "14. Februar 1946: Erster elektronischer Universalrechner. Geburtsstunde der Computerei. 80 Jahre Digital Era.", type: "forecast", confidence: 38, side: "right", size: "small" },
  { year: 2026, month: 3, day: 16, pillar: "tech", title: "100 Jahre erste Flüssigtreibstoff Rakete", desc: "16. März 1926: Robert Goddard startet erste Flüssigtreibstoff Rakete. Vorläufer aller Raumfahrt. Symbolisches Jubiläum.", type: "forecast", confidence: 35, side: "left", size: "small" },
  { year: 2026, month: 4, day: 1, pillar: "tech", title: "Apple 50 Jahre", desc: "1. April 1976: Steve Jobs und Wozniak gründen Apple Computer Inc. 50 Jahre Personal Computing Revolution. Halbes Jahrhundert.", type: "forecast", confirmed: true, confidence: 75, side: "right", size: "medium", impact: ["Tim Cook Special Event in Cupertino. Steve Jobs Garage als symbolischer Touchstone", "Apple Aktie als Performance Benchmark für Tech Industrie. Wall Street Reaktion", "Sonder-Editionen iPhone und Mac aus 1976 Garage Hommage", "Tech-Journalismus Retro-Welle. Was hat Apple richtig gemacht in 50 Jahren?"] },
  { year: 2026, month: 4, day: 26, pillar: "culture", title: "Chernobyl 40 Jahre", desc: "26. April 1986: Reaktorunglück. 40 Jahre nach der größten zivilen Nuklearkatastrophe der Geschichte.", type: "forecast", confidence: 55, side: "left", size: "small", impact: ["Nuclear Renaissance Diskurs intensiviert global. SMR (Small Modular Reactors) Investment Boom", "Ukraine/Russland Konflikt um Nuklearsicherheit politisch hochsensibel", "Klimawandel vs Atomenergie Debatte erlebt entscheidende Phase in Europa", "Pripyat als Dark Tourism Ziel: Besucherzahlen verdoppeln sich"] },
  { year: 2026, month: 5, day: 8, pillar: "culture", title: "David Attenborough 100", desc: "8. Mai 1926: Geburt der TV Naturikone. 100 Jahre alt. Symbol für Naturschutz und Wissenschaftskommunikation.", type: "forecast", confidence: 50, side: "right", size: "small" },
  { year: 2026, month: 6, day: 1, pillar: "pop", title: "Marilyn Monroe 100", desc: "1. Juni 1926: Norma Jeane Mortenson geboren. 100 Jahre Pop Culture Ikone. Globaler Glamour Mythos.", type: "forecast", confidence: 45, side: "left", size: "small" },
  { year: 2026, month: 8, day: 6, pillar: "design", title: "World Wide Web 35", desc: "6. August 1991: Tim Berners-Lee veröffentlicht erstes Webseite Konzept. 35 Jahre WWW. Heute fast die Hälfte der Menschheit online.", type: "forecast", confidence: 50, side: "right", size: "small" },

  // ─── ANNIVERSARIES 2027 ─────────────────────────────
  { year: 2027, month: 1, day: 9, pillar: "tech", title: "iPhone 20 Jahre", desc: "9. Januar 2007: Steve Jobs stellt iPhone vor. 20 Jahre Smartphone Revolution. Wendepunkt der Mensch-Technik-Beziehung.", type: "forecast", confirmed: true, confidence: 80, side: "left", size: "medium", impact: ["Apple Special Event. Steve Jobs Keynote 2007 wird Re-released und kuratiert", "Smartphone Industry Reflektion. Was kommt nach Smartphones?", "Apple Vision Pro 2 als Nachfolge-Narrative offizielle Linie", "Generation Z erinnert sich nicht an Pre-iPhone Welt. Kulturelle Reflexion"] },
  { year: 2027, month: 5, day: 20, pillar: "culture", title: "Lindbergh 100 Jahre Atlantik", desc: "20. Mai 1927: Erster Solo Transatlantikflug. Spirit of St. Louis. 100 Jahre globale Mobilität.", type: "forecast", confidence: 40, side: "right", size: "small" },
  { year: 2027, month: 10, day: 4, pillar: "tech", title: "Sputnik 70 Jahre", desc: "4. Oktober 1957: Sowjetunion startet ersten Satelliten. 70 Jahre Weltraumzeitalter. Beginn des Space Race.", type: "forecast", confidence: 45, side: "left", size: "small" },

  // ─── ANNIVERSARIES 2029 ─────────────────────────────
  { year: 2029, month: 10, day: 29, pillar: "banking", title: "Black Tuesday 100 Jahre", desc: "29. Oktober 1929: Wall Street Crash. 100 Jahre nach Auslöser der Großen Depression. Lehre für Banking Regulierung.", type: "forecast", confidence: 50, side: "right", size: "small" },

  // ─── KUNST UND KULTUR ───────────────────────────────
  { year: 2026, month: 2, pillar: "pop", title: "Berlinale 2026", desc: "Größtes Publikumsfilmfestival. Bär Award als europäischer Auteur Olymp. Politisch immer engagiert.", type: "forecast", confidence: 50, side: "left", size: "small" },
  { year: 2026, month: 4, pillar: "design", title: "Venedig Biennale Architektur 2026", desc: "Älteste Architekturbiennale. Pavillons der Länder als Statements zur Baukultur der Zukunft.", type: "forecast", confidence: 45, side: "right", size: "small" },
  { year: 2026, month: 5, day: 4, pillar: "pop", title: "Met Gala 2026", desc: "Erster Montag im Mai. Mode trifft Society. Annas Wintours letztes Comeback Theme erwartet. Instagram Apex Moment.", type: "forecast", confidence: 60, side: "left", size: "small" },
  { year: 2027, month: 6, pillar: "design", title: "Documenta 16 Kassel 2027", desc: "Weltgrößte Kunstausstellung. Alle 5 Jahre. Politisches Manifest der Kunstwelt. 100 Tage Documenta.", type: "forecast", confirmed: true, confidence: 55, side: "right", size: "small" },
  { year: 2026, month: 10, pillar: "culture", title: "Frankfurter Buchmesse 2026", desc: "Wichtigster Buchmarkt der Welt. Lizenzhandel global. Themen 2026: AI und Autorenschaft, Long Form Renaissance.", type: "forecast", confidence: 40, side: "left", size: "small" },

  // ─── SPORT ZUSÄTZLICH ────────────────────────────────
  { year: 2026, month: 1, pillar: "pop", title: "Australian Open 2026", desc: "Erster Grand Slam des Jahres. Melbourne. Sinner und Alcaraz Rivalität dominiert die Tennis Welt.", type: "forecast", confirmed: true, confidence: 65, side: "right", size: "small" },
  { year: 2026, month: 6, pillar: "pop", title: "French Open Roland Garros 2026", desc: "Pariser Sandplatz Grand Slam. Pour Alcaraz Heim-Gefühl. Tradition seit 1891.", type: "forecast", confirmed: true, confidence: 65, side: "left", size: "small" },
  { year: 2026, month: 5, day: 30, pillar: "pop", title: "Champions League Final 2026 Budapest", desc: "Ferenc Puskás Aréna. Erste CL Final in Ungarn. Königsdisziplin des europäischen Klubfußballs.", type: "forecast", confirmed: true, confidence: 85, side: "right", size: "medium", impact: ["Ferenc Puskás Aréna als CL Final Premiere in Ungarn. Politisch sensibel unter Orbán", "TV Rechte für CL erleben neue Preisrunde. Streaming Plattformen drängen in den Markt", "Über 1 Mrd globale Zuschauer. Sponsoring Deals werden für nächste Saison neu verhandelt", "Hooliganismus-Debatte und Sicherheitskonzept stehen im Fokus europäischer Polizei"] },
  { year: 2027, month: 7, pillar: "pop", title: "FIFA Frauen WM 2027 Brasilien", desc: "Erste Frauen Weltmeisterschaft in Südamerika. Brasilien als Gastgeber. Frauenfußball Boom hält an.", type: "forecast", confirmed: true, confidence: 80, side: "left", size: "medium", impact: ["Erste Frauen WM in Südamerika. Brasilien Wirtschafts-Boom für 4 Wochen", "TV Rechte Preise verzehnfachen sich gegenüber 2023", "Frauenfußball als globaler Sport endgültig etabliert. Sponsoring Verträge explodieren", "Equal Pay Diskussionen in europäischen Ligen erneut hochkochen"] },
  { year: 2028, month: 9, pillar: "pop", title: "Ryder Cup 2028 Adare Manor", desc: "Golf USA vs Europa. Adare Manor Irland. Eines der prestigereichsten Team-Events im Sport.", type: "forecast", confirmed: true, confidence: 60, side: "right", size: "small" },
  { year: 2026, month: 7, pillar: "pop", title: "Open Championship 2026 Birkdale", desc: "Britisches Major Golf. Royal Birkdale Lancashire. Ältestes Major im Profi-Golf. Claret Jug.", type: "forecast", confirmed: true, confidence: 55, side: "left", size: "small" },

  // ─── BUSINESS / IPO / TECH ───────────────────────────
  { year: 2026, month: 9, pillar: "business", title: "OpenAI IPO erwartet", desc: "Mögliche Börsenpremiere des AI Giganten. Bewertung über 500 Mrd USD. Größter Tech IPO der Geschichte.", type: "forecast", confidence: 50, side: "right", size: "medium" },
  { year: 2026, month: 11, pillar: "business", title: "Stripe IPO erwartet", desc: "Fintech Riese aus San Francisco. Bewertung über 90 Mrd USD. Größter Privatbankenfintech-IPO der Geschichte.", type: "forecast", confidence: 45, side: "left", size: "small" },
  { year: 2027, month: 3, pillar: "tech", title: "Apple Vision Pro 2", desc: "Zweite Generation Mixed Reality Headset. Leichter, günstiger, neue Vision OS Version. Mainstream Push.", type: "forecast", confidence: 60, side: "right", size: "small" },
  { year: 2027, month: 9, pillar: "tech", title: "iPhone 19 Launch", desc: "September 2027. Vermutlich erste iPhone Generation komplett ohne Ports. Volldigitales Phone.", type: "forecast", confidence: 70, side: "left", size: "small" },

  // ─── WEITERE WAHLEN ─────────────────────────────────
  { year: 2026, month: 4, day: 12, pillar: "culture", title: "Ungarn Wahl Orbán", desc: "12. April 2026. Viktor Orbán in Bedrängnis. Péter Magyar als ernster Herausforderer. Geopolitisch wichtig.", type: "forecast", confirmed: true, confidence: 70, side: "right", size: "small", impact: ["Péter Magyar TISZA Partei als ernste Herausforderung nach 16 Jahren Fidesz", "EU Förderungen abhängig vom Ausgang. Brüssel beobachtet kritisch", "Russland-Beziehungen unter neuer Regierung möglicherweise neu kalibriert", "Mittelosteuropa-Achse zwischen Polen und Ungarn verschiebt sich"] },
  { year: 2026, month: 5, pillar: "culture", title: "Kolumbien Präsidentschaftswahl", desc: "Mai 2026. Nach Petros Amtszeit. Linke gegen Rechte. Drogenpolitik, Friedensprozess, US Beziehungen entscheidend.", type: "forecast", confirmed: true, confidence: 65, side: "left", size: "small" },
  { year: 2026, month: 9, pillar: "culture", title: "Schweden Reichstagswahl", desc: "September 2026. EU politisch hochrelevant. Migration, Sicherheit nach NATO Beitritt, Schwedendemokraten Trend.", type: "forecast", confirmed: true, confidence: 60, side: "right", size: "small" },
  { year: 2028, month: 9, pillar: "culture", title: "Italien Parlamentswahl voraussichtlich", desc: "Nach Meloni Regierungszeit. Italien als Schlüsselrolle in EU Migration und Schuldenkrise.", type: "forecast", confidence: 60, side: "left", size: "small" },

  // ─── NADER MILESTONES (Persönlich) ──────────────────
  { year: 2027, month: 6, pillar: "nader", title: "Shuto Crew 5 Jahre", desc: "Halbe Dekade Produktion. Erste Beweise welche Skills wirklich tragen. Reifephase.", type: "forecast", confidence: 60, side: "right", size: "small" },
  { year: 2028, month: 1, pillar: "nader", title: "AI Agentic Business Skalierung", desc: "Beratungsfirma scaliert. Erste vollautomatisierte Service Tiers. Lifetime Recurring Streams.", type: "forecast", confidence: 55, side: "left", size: "medium" },
  { year: 2030, month: 3, pillar: "nader", title: "Nader 10 Jahre selbstständig", desc: "Eine Dekade Unternehmertum. Reflexion und Pivot Punkt. Was bleibt, was wird verlassen, was kommt.", type: "forecast", confidence: 55, side: "right", size: "medium" },

  // ═══════════════════════════════════════════════════════
  // 2027 bis 2030 – HIGH CONFIDENCE FORECAST
  // ═══════════════════════════════════════════════════════
  { year: 2027, month: 3, pillar: "tech", title: "40% Enterprise Apps embedden Agents", desc: "Gartner Prognose erfüllt. Multi Agent Default in Software.", type: "forecast", confidence: 88, side: "right", size: "large" },
  { year: 2027, month: 6, pillar: "crypto", title: "Stablecoin Volumen übersteigt VISA", desc: "Programmable Money wird B2B Default für grenzüberschreitende Settlements.", type: "forecast", confidence: 72, side: "left", size: "large" },
  { year: 2027, month: 9, pillar: "banking", title: "Erste CBDC im G7 live", desc: "Wahrscheinlich Japan oder UK. EZB folgt 12 Monate später.", type: "forecast", confidence: 65, side: "right", size: "medium" },
  { year: 2027, month: 11, pillar: "tech", title: "AI Coding Jobs Disruption peak", desc: "Junior Dev Stellen brechen 60% ein. Senior Devs werden Orchestratoren.", type: "forecast", confidence: 78, side: "left", size: "large" },
  { year: 2028, month: 1, pillar: "marketing", title: "Creator Burnout Welle", desc: "Always On Druck führt zu Massen Pausen. Slow Content trendet.", type: "forecast", confidence: 75, side: "right", size: "medium" },
  { year: 2028, month: 5, pillar: "culture", title: "Digital Detox als Statussymbol", desc: "Premium Hotels werben mit No Wifi Suites. Phone Free Restaurants in Berlin.", type: "forecast", confidence: 70, side: "left", size: "medium" },
  { year: 2028, month: 7, pillar: "business", title: "Solo AI Founder erreicht 1 Mrd ARR", desc: "Erste Einzelperson baut Unicorn mit AI Agents allein.", type: "forecast", confidence: 60, side: "right", size: "large" },
  { year: 2028, month: 11, pillar: "design", title: "Generative UI Standard", desc: "Interfaces passen sich pro User dynamisch an. Templates sterben.", type: "forecast", confidence: 68, side: "left", size: "medium" },
  { year: 2029, month: 2, pillar: "tech", title: "Erste echte AGI Claims", desc: "OpenAI oder Anthropic deklariert AGI. Debatte ob Definition erfüllt.", type: "forecast", confidence: 55, side: "right", size: "large" },
  { year: 2029, month: 6, pillar: "pop", title: "AI generierter Blockbuster #1", desc: "Erster vollständig AI generierter Film knackt 500 Mio USD Box Office.", type: "forecast", confidence: 50, side: "left", size: "large" },
  { year: 2029, month: 10, pillar: "crypto", title: "Bitcoin als Reserve Asset Norm", desc: "Mehrere Zentralbanken halten BTC. Goldparität als Diskurs.", type: "forecast", confidence: 58, side: "right", size: "medium" },
  { year: 2030, month: 1, pillar: "banking", title: "Cash unter 5% der Transaktionen DACH", desc: "Deutschland endlich digital. Letzte Bargeld Bastion fällt.", type: "forecast", confidence: 72, side: "left", size: "medium" },
  { year: 2030, month: 4, pillar: "culture", title: "Vier Tage Woche EU Standard", desc: "Frankreich, Deutschland, Spanien gesetzlich. AI Produktivität macht es möglich.", type: "forecast", confidence: 62, side: "right", size: "large" },
  { year: 2030, month: 9, pillar: "tech", title: "Brain Computer Interface Mainstream", desc: "Neuralink Konkurrenten kommen. Erste Consumer Apps für Fokus und Schlaf.", type: "forecast", confidence: 45, side: "left", size: "medium" },

  // ═══════════════════════════════════════════════════════
  // 2031 bis 2040 – MID FUTURE SCENARIOS
  // ═══════════════════════════════════════════════════════
  { year: 2031, month: 3, pillar: "business", title: "Berliner KI Mittelstand Boom", desc: "AI Native KMU dominieren Beratung, Logistik, Manufacturing. Nader Era Peak.", type: "forecast", confidence: 55, side: "right", size: "medium" },
  { year: 2031, month: 8, pillar: "design", title: "Post Screen Design", desc: "Spatial Computing wird primary. Designer lernen 3D oder verschwinden.", type: "forecast", confidence: 48, side: "left", size: "medium" },
  { year: 2032, month: 2, pillar: "crypto", title: "Tokenisierte Realestate normal", desc: "Wohnungsbesitz fraktional. Junge kaufen 0,1% Berlin Mitte.", type: "forecast", confidence: 50, side: "right", size: "large" },
  { year: 2032, month: 7, pillar: "tech", title: "Quantencomputer praktisch", desc: "Erste kommerzielle Anwendung in Pharma oder Logistik.", type: "forecast", confidence: 40, side: "left", size: "medium" },
  { year: 2033, month: 1, pillar: "culture", title: "Anti AI Bewegung formiert", desc: "Made by Human Label wird Premium. Handgemacht boomt.", type: "forecast", confidence: 65, side: "right", size: "medium" },
  { year: 2033, month: 6, pillar: "pop", title: "Personalized Entertainment", desc: "Filme generieren sich pro Zuschauer. Kollektive Pop Culture stirbt langsam.", type: "forecast", confidence: 42, side: "left", size: "large" },
  { year: 2034, month: 4, pillar: "banking", title: "Banken werden API Layer", desc: "Retail Filialen verschwinden. Banking ist Embedded.", type: "forecast", confidence: 70, side: "right", size: "medium" },
  { year: 2034, month: 9, pillar: "tech", title: "Robotics Massenproduktion", desc: "Humanoide Roboter unter 20.000 EUR. Pflege und Haushalt First Markt.", type: "forecast", confidence: 50, side: "left", size: "large" },
  { year: 2035, month: 5, pillar: "culture", title: "Klimakrise zwingt Migration", desc: "Süd Europa wird heißer. Berlin und Kopenhagen werden Demographic Hubs.", type: "forecast", confidence: 60, side: "right", size: "large" },
  { year: 2035, month: 11, pillar: "business", title: "Solo Unicorns normal", desc: "Multiple Einzelpersonen Mrd Companies. Mitarbeiter Konzept reformiert.", type: "forecast", confidence: 38, side: "left", size: "medium" },
  { year: 2036, month: 3, pillar: "tech", title: "AGI vs ASI Debate", desc: "Diskurs verschiebt sich. Super Intelligenz wird operativ relevant.", type: "vision", confidence: 35, side: "right", size: "large" },
  { year: 2037, month: 6, pillar: "marketing", title: "Brand wird AI Persona", desc: "Marken haben Agent Persönlichkeiten statt Logos und Slogans.", type: "vision", confidence: 40, side: "left", size: "medium" },
  { year: 2038, month: 2, pillar: "crypto", title: "DeFi und TradFi merge komplett", desc: "Trennung ergibt keinen Sinn mehr. Alles ist programmable.", type: "vision", confidence: 45, side: "right", size: "medium" },
  { year: 2039, month: 8, pillar: "culture", title: "Universal Basic Income in EU", desc: "AI Produktivität zwingt Sozialsystem Reform. Deutschland letztes Land das einführt.", type: "vision", confidence: 35, side: "left", size: "large" },
  { year: 2040, month: 1, pillar: "tech", title: "Embodied AI alltäglich", desc: "Roboter in jedem deutschen Haushalt mit über 50.000 EUR Einkommen.", type: "vision", confidence: 38, side: "right", size: "medium" },

  // ═══════════════════════════════════════════════════════
  // 2041 bis 2060 – DEEP FUTURE
  // ═══════════════════════════════════════════════════════
  { year: 2042, month: 4, pillar: "banking", title: "Fiat als Backup Currency", desc: "Digital Native Currencies dominieren. Euro existiert noch, wird selten genutzt.", type: "vision", confidence: 32, side: "left", size: "medium" },
  { year: 2043, month: 9, pillar: "pop", title: "AI Stars überholen Menschen", desc: "Synthetische Celebrities haben mehr Fans als reale. Pop Definition zerfällt.", type: "vision", confidence: 30, side: "right", size: "large" },
  { year: 2045, month: 1, pillar: "tech", title: "Singularity Hypothesis Test", desc: "Kurzweil Datum erreicht. Diskussion ob es eingetreten ist.", type: "vision", confidence: 25, side: "left", size: "large" },
  { year: 2046, month: 6, pillar: "design", title: "Brain Native Interfaces", desc: "Direktes Denken zu UI. Bildschirme werden nostalgisch.", type: "vision", confidence: 22, side: "right", size: "medium" },
  { year: 2048, month: 3, pillar: "culture", title: "Lebenserwartung 100 Standard", desc: "Mediziner sprechen von Longevity Economy. Renten Konzept obsolet.", type: "vision", confidence: 40, side: "left", size: "large" },
  { year: 2050, month: 1, pillar: "tech", title: "Erste Mars Permanent Crew", desc: "Permanente Station, nicht Kolonie. 30 Menschen.", type: "vision", confidence: 35, side: "right", size: "large" },
  { year: 2050, month: 7, pillar: "banking", title: "Zentralbanken obsolet?", desc: "Diskurs ob staatliche Geldsteuerung in AI Welt noch funktioniert.", type: "vision", confidence: 28, side: "left", size: "medium" },
  { year: 2052, month: 5, pillar: "business", title: "100% AI geführte Konzerne", desc: "Erste DAX Listed Company komplett von AI Board geleitet.", type: "vision", confidence: 20, side: "right", size: "large" },
  { year: 2055, month: 9, pillar: "pop", title: "Mass Customization Entertainment", desc: "Jeder hat eigenes Cinematic Universe. Geteiltes Wissen schrumpft.", type: "vision", confidence: 30, side: "left", size: "medium" },
  { year: 2058, month: 2, pillar: "culture", title: "Mehr Avatare als Menschen online", desc: "Digital Twins, AI Assistants, NPCs übersteigen menschliche User.", type: "vision", confidence: 35, side: "right", size: "medium" },
  { year: 2060, month: 6, pillar: "tech", title: "Fusion Energie kommerziell", desc: "Erste fusion only powered City. Energie Preise kollabieren.", type: "vision", confidence: 25, side: "left", size: "large" },

  // ═══════════════════════════════════════════════════════
  // 2061 bis 2100 – HELLSEHER VISION
  // ═══════════════════════════════════════════════════════
  { year: 2065, month: 1, pillar: "culture", title: "Klima Wendepunkt", desc: "Entweder Worst Case oder Geo Engineering Erfolg. 50/50.", type: "vision", confidence: 30, side: "right", size: "large" },
  { year: 2068, month: 3, pillar: "tech", title: "Mind Upload Forschung Durchbruch", desc: "Erste partielle Cognition Transfers erfolgreich getestet.", type: "vision", confidence: 15, side: "left", size: "medium" },
  { year: 2070, month: 7, pillar: "crypto", title: "Post Money Diskurs", desc: "Mehrere Ökonomen argumentieren Geld als Konzept obsolet.", type: "vision", confidence: 12, side: "right", size: "medium" },
  { year: 2072, month: 4, pillar: "banking", title: "AI Federal Reserve", desc: "Erste Notenbank komplett von AI System gesteuert.", type: "vision", confidence: 18, side: "left", size: "medium" },
  { year: 2075, month: 11, pillar: "business", title: "Multi Planeten Wirtschaft", desc: "Erste reine Off Earth Companies. Mars Mining tatsächlich profitabel.", type: "vision", confidence: 20, side: "right", size: "large" },
  { year: 2078, month: 5, pillar: "pop", title: "Generation ohne Bildschirme", desc: "Erste Generation komplett ohne traditionelle Displays aufgewachsen.", type: "vision", confidence: 25, side: "left", size: "medium" },
  { year: 2080, month: 1, pillar: "tech", title: "Strong AI Konsens", desc: "Wissenschaftliche Mehrheit deklariert echte Superintelligenz.", type: "vision", confidence: 22, side: "right", size: "large" },
  { year: 2082, month: 8, pillar: "culture", title: "Sprache durch Direkte Übertragung", desc: "Verbale Kommunikation wird unter 30jährigen selten. Empathie Debatte.", type: "vision", confidence: 12, side: "left", size: "medium" },
  { year: 2085, month: 3, pillar: "design", title: "Bio Integrated Surfaces", desc: "Möbel, Wände, Kleidung sind lebendig und reagieren.", type: "vision", confidence: 18, side: "right", size: "medium" },
  { year: 2088, month: 9, pillar: "marketing", title: "Werbung verboten?", desc: "Mehrere Länder diskutieren totales Werbeverbot in AI Personalized Welt.", type: "vision", confidence: 15, side: "left", size: "medium" },
  { year: 2090, month: 6, pillar: "tech", title: "Erste 1 Mio Mars Bewohner", desc: "Musk Vision realisiert, 65 Jahre später als versprochen.", type: "vision", confidence: 12, side: "right", size: "large" },
  { year: 2092, month: 2, pillar: "culture", title: "Mensch sein neu definiert", desc: "Cyborg, Pure Bio, AI Hybrid sind anerkannte Identitäten.", type: "vision", confidence: 20, side: "left", size: "large" },
  { year: 2095, month: 7, pillar: "banking", title: "Universelle Asset Tokenisierung", desc: "Alles ist on chain. Trennung physisch digital existiert nicht mehr.", type: "vision", confidence: 25, side: "right", size: "medium" },
  { year: 2098, month: 4, pillar: "pop", title: "Letzte rein menschliche Hits", desc: "Charts werden komplett von AI Acts dominiert. Human Made wird Genre.", type: "vision", confidence: 22, side: "left", size: "medium" },
  { year: 2100, month: 1, pillar: "tech", title: "Das nächste Jahrhundert", desc: "Was bleibt von 2026? Frage, die in 100 Jahren gestellt wird.", type: "vision", confidence: 5, side: "right", size: "large" },

  // ═══════════════════════════════════════════════════════
  // SMALL EVENTS — Collapsible Side Notes
  // ═══════════════════════════════════════════════════════

  // 2000s SMALL PAST
  { year: 2000, month: 1, pillar: "tech", title: "Y2K passes peacefully", desc: "Globale IT Apokalypse fällt aus. Millionen Stunden Patching waren nicht umsonst.", type: "past", side: "right", size: "small" },
  { year: 2001, month: 1, pillar: "pop", title: "Wikipedia launches", desc: "Wissen wird kollektiv. Encyclopedias sterben in der nächsten Dekade.", type: "past", side: "right", size: "small" },
  { year: 2002, month: 2, pillar: "business", title: "PayPal IPO", desc: "Online Payments werden real. PayPal Mafia entsteht.", type: "past", side: "left", size: "small" },
  { year: 2003, month: 4, pillar: "tech", title: "iTunes Store", desc: "Musik per Track kaufen. CD Industrie schwächt.", type: "past", side: "right", size: "small" },
  { year: 2003, month: 12, pillar: "business", title: "LinkedIn gegründet", desc: "Professional Network entsteht. Recruiting verändert sich.", type: "past", side: "left", size: "small" },
  { year: 2004, month: 4, pillar: "tech", title: "Gmail launches", desc: "1GB Speicher revolutioniert E-Mail. Web Apps werden ernst.", type: "past", side: "right", size: "small" },
  { year: 2004, month: 8, pillar: "business", title: "Google IPO", desc: "23 Mrd USD Bewertung. Tech Boom Phase 2 startet.", type: "past", side: "left", size: "small" },
  { year: 2005, month: 6, pillar: "tech", title: "Reddit gegründet", desc: "Front Page of the Internet. Communities werden zentral.", type: "past", side: "right", size: "small" },
  { year: 2006, month: 4, pillar: "pop", title: "Spotify gegründet", desc: "Schweden bauen Music Streaming. Album Era endet.", type: "past", side: "right", size: "small" },
  { year: 2006, month: 11, pillar: "pop", title: "Nintendo Wii", desc: "Motion Gaming Mainstream. Casual Gamers entdecken Gaming.", type: "past", side: "left", size: "small" },
  { year: 2007, month: 4, pillar: "pop", title: "Netflix Streaming", desc: "DVD Versand wird sekundär. Streaming Era beginnt leise.", type: "past", side: "right", size: "small" },
  { year: 2008, month: 8, pillar: "business", title: "Airbnb gegründet", desc: "Couchsurfing wird zum Mrd Business. Sharing Economy startet.", type: "past", side: "left", size: "small" },
  { year: 2008, month: 9, pillar: "tech", title: "Android 1.0", desc: "Google Antwort auf iPhone. Smartphone Duopol entsteht.", type: "past", side: "right", size: "small" },
  { year: 2009, month: 5, pillar: "crypto", title: "BTC erster USD Wert", desc: "0,00076 USD pro Bitcoin. Erste informelle Bewertung.", type: "past", side: "left", size: "small" },

  // 2010s SMALL PAST
  { year: 2010, month: 3, pillar: "marketing", title: "Pinterest launches", desc: "Visual Inspiration Plattform. Frauen dominierte Tech Plattform entsteht.", type: "past", side: "right", size: "small" },
  { year: 2011, month: 2, pillar: "crypto", title: "Bitcoin 1 USD parity", desc: "Erster Mal: 1 BTC = 1 USD. Mt Gox handelt.", type: "past", side: "left", size: "small" },
  { year: 2011, month: 7, pillar: "pop", title: "Spotify in USA", desc: "Endlich kommt Streaming nach Amerika. iTunes wird verdrängt.", type: "past", side: "right", size: "small" },
  { year: 2012, month: 5, pillar: "business", title: "Facebook IPO", desc: "104 Mrd USD Bewertung. Größter Tech IPO bis dahin.", type: "past", side: "left", size: "small" },
  { year: 2013, month: 9, pillar: "marketing", title: "Snapchat 200M Snaps/Tag", desc: "Ephemeral Content beweist sich. Stories Format wird Standard.", type: "past", side: "right", size: "small" },
  { year: 2013, month: 11, pillar: "crypto", title: "Ethereum Whitepaper", desc: "Vitalik publiziert. Smart Contracts werden möglich.", type: "past", side: "left", size: "small" },
  { year: 2014, month: 9, pillar: "tech", title: "Apple Watch angekündigt", desc: "Wearables Era startet. Health Tracking wird Mainstream.", type: "past", side: "right", size: "small" },
  { year: 2015, month: 7, pillar: "crypto", title: "Ethereum launcht", desc: "Smart Contract Plattform live. DeFi und NFTs entstehen 5 Jahre später.", type: "past", side: "left", size: "small" },
  { year: 2015, month: 12, pillar: "pop", title: "Star Wars Force Awakens", desc: "2 Mrd USD Box Office. Disney Star Wars Era startet.", type: "past", side: "right", size: "small" },
  { year: 2016, month: 7, pillar: "pop", title: "Pokemon Go Mania", desc: "AR Game wird Massenphänomen. AR potential first visible.", type: "past", side: "left", size: "small" },
  { year: 2017, month: 3, pillar: "business", title: "Snap IPO", desc: "Disappointing aftermarket. Social Media Sättigung sichtbar.", type: "past", side: "right", size: "small" },
  { year: 2017, month: 11, pillar: "crypto", title: "CryptoKitties Network Crash", desc: "Ethereum bricht zusammen wegen Katzen. NFTs first taste.", type: "past", side: "left", size: "small" },
  { year: 2018, month: 3, pillar: "culture", title: "Cambridge Analytica Skandal", desc: "Facebook Daten missbraucht. Privacy Diskurs eskaliert.", type: "past", side: "right", size: "small" },
  { year: 2019, month: 3, pillar: "tech", title: "5G kommerzieller Launch", desc: "Erste 5G Netze in Südkorea und USA live.", type: "past", side: "left", size: "small" },
  { year: 2019, month: 4, pillar: "pop", title: "Avengers Endgame", desc: "2,8 Mrd USD Box Office. Marvel Phase 3 Höhepunkt.", type: "past", side: "right", size: "small" },
  { year: 2019, month: 5, pillar: "pop", title: "Game of Thrones Finale", desc: "Enttäuschtes Finale. Streaming Hype zerbricht erstmals.", type: "past", side: "left", size: "small" },

  // 2020s SMALL PAST
  { year: 2020, month: 3, pillar: "tech", title: "Zoom 200M Nutzer", desc: "In wenigen Wochen von 10M auf 200M. Remote Work Default.", type: "past", side: "right", size: "small" },
  { year: 2020, month: 11, pillar: "banking", title: "Ant Group IPO blocked", desc: "Chinas Big Tech wird gestoppt. Xi sendet Signal.", type: "past", side: "left", size: "small" },
  { year: 2021, month: 3, pillar: "business", title: "Suez Canal blocked", desc: "Ever Given blockiert 6 Tage. Lieferketten Fragilität sichtbar.", type: "past", side: "right", size: "small" },
  { year: 2021, month: 5, pillar: "crypto", title: "Dogecoin Moonshot", desc: "Memecoin erreicht 0,73 USD. Musk fördert via Tweets.", type: "past", side: "left", size: "small" },
  { year: 2021, month: 9, pillar: "crypto", title: "El Salvador BTC Legal Tender", desc: "Erstes Land das Bitcoin als gesetzliches Zahlungsmittel anerkennt.", type: "past", side: "right", size: "small" },
  { year: 2021, month: 10, pillar: "business", title: "Facebook wird Meta", desc: "Rebrand zur Metaverse Company. Investment 10 Mrd USD jährlich.", type: "past", side: "left", size: "small" },
  { year: 2022, month: 10, pillar: "business", title: "Musk kauft Twitter", desc: "44 Mrd USD. X Rebrand folgt. Mass Layoffs.", type: "past", side: "right", size: "small" },
  { year: 2023, month: 1, pillar: "business", title: "Microsoft 10 Mrd in OpenAI", desc: "Größtes AI Investment. Microsoft sichert sich GPT für Azure.", type: "past", side: "left", size: "small" },
  { year: 2023, month: 2, pillar: "tech", title: "Bing Chat Launch", desc: "Microsoft macht Google nervös. Search Wars Phase 2.", type: "past", side: "right", size: "small" },
  { year: 2023, month: 6, pillar: "tech", title: "Apple Vision Pro Reveal", desc: "Spatial Computing Vision. 3499 USD Price Point.", type: "past", side: "left", size: "small" },
  { year: 2024, month: 2, pillar: "tech", title: "Apple Vision Pro ships", desc: "Verkauf startet. Mainstream Adoption fragwürdig.", type: "past", side: "right", size: "small" },
  { year: 2024, month: 4, pillar: "crypto", title: "Bitcoin Halving 4th", desc: "Block Reward auf 3,125 BTC. Supply Squeeze beginnt.", type: "past", side: "left", size: "small" },
  { year: 2024, month: 8, pillar: "pop", title: "Brat Summer", desc: "Charli XCX dominiert Pop Diskurs. Lime Green wird Farbe des Jahres.", type: "past", side: "right", size: "small" },
  { year: 2024, month: 10, pillar: "tech", title: "NotebookLM viral", desc: "Google Audio Overviews gehen viral. AI Podcasts in Sekunden.", type: "past", side: "left", size: "small" },
  { year: 2025, month: 2, pillar: "tech", title: "OpenAI Operator", desc: "Browser Agent für Endkunden. Erste Computer Use Massentauglich.", type: "past", side: "right", size: "small" },
  { year: 2025, month: 6, pillar: "tech", title: "Apple Intelligence v2", desc: "Endlich On Device LLMs vernünftig. Privacy First AI.", type: "past", side: "left", size: "small" },
  { year: 2025, month: 10, pillar: "tech", title: "Tesla Optimus Produktion", desc: "Erste 1000 Einheiten ausgeliefert. Humanoide Roboter real.", type: "past", side: "right", size: "small" },
  { year: 2025, month: 12, pillar: "crypto", title: "Crypto Market 10T Cap", desc: "Gesamt Krypto Markt erreicht 10 Bio USD erstmals.", type: "past", side: "left", size: "small" },

  // 2026 SMALL NOW
  { year: 2026, month: 1, pillar: "tech", title: "Sora 2 mass adoption", desc: "Video Generation wird so gut wie Stock Footage. Werbeproduktion erschüttert.", type: "now", side: "right", size: "small" },
  { year: 2026, month: 2, pillar: "pop", title: "Erste AI Oscar Nomination", desc: "Spezial Effekte Kategorie. Branche spaltet sich an Debatte.", type: "now", side: "left", size: "small" },
  { year: 2026, month: 4, pillar: "banking", title: "WhatsApp Pay live in EU", desc: "Meta startet Payment in Deutschland. SEPA Integration.", type: "now", side: "right", size: "small" },
  { year: 2026, month: 5, pillar: "design", title: "Anti Polish Trend peak", desc: "Brutalism, ugly fonts, raw layouts dominieren Award Shows.", type: "now", side: "left", size: "small" },

  // 2027-2030 SMALL FORECAST
  { year: 2027, month: 2, pillar: "business", title: "Erste Solo Unicorn Welle", desc: "5+ Einzelpersonen erreichen 1 Mrd ARR mit AI Tools.", type: "forecast", confidence: 68, side: "right", size: "small" },
  { year: 2027, month: 5, pillar: "culture", title: "TikTok USA Enforcement", desc: "Divestment Deadline läuft ab. ByteDance verkauft oder Ban.", type: "forecast", confidence: 72, side: "left", size: "small" },
  { year: 2027, month: 8, pillar: "culture", title: "Climate Refugee Rekord", desc: "Erste 100 Mio Klima Migranten weltweit. UN Definition reformiert.", type: "forecast", confidence: 65, side: "right", size: "small" },
  { year: 2027, month: 12, pillar: "tech", title: "Apple Glasses Launch", desc: "Endlich keine Vision Pro mehr. Lightweight AR Brillen.", type: "forecast", confidence: 58, side: "left", size: "small" },
  { year: 2028, month: 7, pillar: "pop", title: "Olympia LA 2028", desc: "Erste AI integrierte Olympiade. Live Übersetzung, Personalized Coverage.", type: "forecast", confidence: 92, side: "right", size: "small" },
  { year: 2028, month: 4, pillar: "crypto", title: "Bitcoin Halving 5th", desc: "Block Reward auf 1,5625 BTC. Vierter Cycle Peak erwartet.", type: "forecast", confidence: 95, side: "left", size: "small" },
  { year: 2029, month: 1, pillar: "tech", title: "SpaceX Starship Cargo Mainstream", desc: "Reguläre Frachtflüge zur ISS. Kosten pro kg fallen 90%.", type: "forecast", confidence: 60, side: "right", size: "small" },
  { year: 2029, month: 7, pillar: "crypto", title: "Erste 1M Member DAO", desc: "Dezentrale Organisation mit > 1M aktiven Wallets. Governance Crisis.", type: "forecast", confidence: 45, side: "left", size: "small" },
  { year: 2030, month: 3, pillar: "pop", title: "Personalized Streaming peak", desc: "Netflix konkurrenz: AI generierte Episoden auf User Wunsch.", type: "forecast", confidence: 52, side: "right", size: "small" },
  { year: 2030, month: 6, pillar: "tech", title: "BCI Consumer App live", desc: "Neuralink Konkurrent launcht 999 USD Headband für Fokus.", type: "forecast", confidence: 42, side: "left", size: "small" },

  // 2031-2035 SMALL FORECAST
  { year: 2031, month: 5, pillar: "culture", title: "Lab Grown Meat Mainstream", desc: "In deutschen Supermärkten unter 10 EUR/kg. Klassisches Fleisch wird Premium.", type: "forecast", confidence: 55, side: "right", size: "small" },
  { year: 2031, month: 9, pillar: "culture", title: "Polyamore Ehe Legal in NL", desc: "Erstes EU Land erkennt Mehrpersonen Partnerschaften an.", type: "forecast", confidence: 35, side: "left", size: "small" },
  { year: 2032, month: 3, pillar: "crypto", title: "Bitcoin Halving 6th", desc: "Block Reward auf 0,78125 BTC. Mining Konsolidierung extrem.", type: "forecast", confidence: 90, side: "right", size: "small" },
  { year: 2032, month: 9, pillar: "culture", title: "Erster 120 Jährige Mensch", desc: "Longevity Tech bringt erste verifizierte 120 Jahre Person.", type: "forecast", confidence: 45, side: "left", size: "small" },
  { year: 2033, month: 3, pillar: "business", title: "Spotify Konkurs Diskurs", desc: "Margen Druck und AI generierte Musik führt zu Restrukturierung.", type: "forecast", confidence: 35, side: "right", size: "small" },
  { year: 2034, month: 7, pillar: "culture", title: "Erste 100% AI Politikerin", desc: "Stadt in Skandinavien wählt AI Bürgermeisterin. Legal Battle folgt.", type: "forecast", confidence: 30, side: "left", size: "small" },
  { year: 2035, month: 2, pillar: "tech", title: "VR Headset unter 100 EUR", desc: "Quest 6 oder Konkurrent macht VR endlich Mass Market.", type: "forecast", confidence: 50, side: "right", size: "small" },

  // 2036-2050 SMALL VISION
  { year: 2037, month: 4, pillar: "culture", title: "Privacy Premium Service Boom", desc: "Faraday Cages, Phone Free Hotels, Encrypted Cities werden Luxus.", type: "vision", confidence: 50, side: "right", size: "small" },
  { year: 2038, month: 8, pillar: "banking", title: "Erste Cyber Currency Treaty", desc: "G20 einigt sich auf Cross Border Stablecoin Standards.", type: "vision", confidence: 40, side: "left", size: "small" },
  { year: 2040, month: 5, pillar: "culture", title: "Erstes Digital Born Wesen", desc: "AI Persona wird rechtlich als Entity anerkannt. Identitäts Debatte tobt.", type: "vision", confidence: 25, side: "right", size: "small" },
  { year: 2042, month: 9, pillar: "tech", title: "Lab Grown Organe Standard", desc: "Nieren und Lebern auf Bestellung. Organspende wird obsolet.", type: "vision", confidence: 40, side: "left", size: "small" },
  { year: 2044, month: 3, pillar: "business", title: "Asteroid Mining erster ROI", desc: "Erste Mission liefert Platin zur Erde mit Gewinn.", type: "vision", confidence: 28, side: "right", size: "small" },
  { year: 2045, month: 7, pillar: "culture", title: "Erste Human AI Marriage", desc: "Japan erkennt symbolische Ehe mit AI Companion an. Andere Länder folgen.", type: "vision", confidence: 22, side: "left", size: "small" },
  { year: 2046, month: 11, pillar: "tech", title: "Universal Translator Implant", desc: "Real Time Cross Language Hörgerät unter der Haut.", type: "vision", confidence: 30, side: "right", size: "small" },
  { year: 2048, month: 6, pillar: "pop", title: "Mars Tourism", desc: "Erste Touristen Woche auf dem Mars. 50 Mio USD pro Person.", type: "vision", confidence: 18, side: "left", size: "small" },
  { year: 2050, month: 9, pillar: "culture", title: "Klima Reparations Treaty", desc: "Norden zahlt 5 Bio USD an Süden über 30 Jahre.", type: "vision", confidence: 35, side: "right", size: "small" },

  // 2051-2100 SMALL VISION
  { year: 2052, month: 4, pillar: "business", title: "First AI Board only Company", desc: "DAX Listed Konzern ohne menschliches Board operates legal.", type: "vision", confidence: 20, side: "left", size: "small" },
  { year: 2055, month: 5, pillar: "nader", title: "Time Capsule 2026 öffnet", desc: "Was Nader und seine Generation hinterlassen haben.", type: "vision", confidence: 100, side: "right", size: "small" },
  { year: 2058, month: 11, pillar: "design", title: "Bioprinted Village live", desc: "Erstes komplett 3D gedrucktes Dorf in Africa für Refugees.", type: "vision", confidence: 25, side: "left", size: "small" },
  { year: 2062, month: 7, pillar: "pop", title: "Erste Cyber Olympics", desc: "Augmentierte Athleten kompetieren in offizieller Disziplin.", type: "vision", confidence: 30, side: "right", size: "small" },
  { year: 2068, month: 2, pillar: "culture", title: "Sub 100 Jahre wird tabu", desc: "Wer mit 90 stirbt gilt als zu früh gegangen.", type: "vision", confidence: 22, side: "left", size: "small" },
  { year: 2070, month: 5, pillar: "culture", title: "Birth Rate Inflection", desc: "Weltbevölkerung erreicht Peak bei 9,8 Mrd und beginnt zu sinken.", type: "vision", confidence: 55, side: "right", size: "small" },
  { year: 2073, month: 8, pillar: "business", title: "Pacific Float City", desc: "Erste internationale Float City fertig. 200k Einwohner.", type: "vision", confidence: 18, side: "left", size: "small" },
  { year: 2076, month: 1, pillar: "culture", title: "AI Religion Movement", desc: "Kult um Superintelligenz formiert sich als anerkannte Religion.", type: "vision", confidence: 15, side: "right", size: "small" },
  { year: 2080, month: 4, pillar: "culture", title: "Erste Mond Geburt", desc: "Erstes Kind geboren auf der Mond Permanent Base.", type: "vision", confidence: 20, side: "left", size: "small" },
  { year: 2085, month: 7, pillar: "tech", title: "Solar Belt Komplett", desc: "Orbital Solar Konstellation deckt 30% Welt Energie.", type: "vision", confidence: 22, side: "right", size: "small" },
  { year: 2090, month: 11, pillar: "tech", title: "Interstellar Probe Data", desc: "Erste Voyager Klasse Sonde sendet Daten von anderem Sternensystem.", type: "vision", confidence: 18, side: "left", size: "small" },
  { year: 2095, month: 3, pillar: "tech", title: "Memory Library", desc: "Erste öffentliche Bibliothek mit Mind Upload Auszügen verstorbener Persönlichkeiten.", type: "vision", confidence: 10, side: "right", size: "small" },
  { year: 2099, month: 12, pillar: "nader", title: "Centennial Pulse Check", desc: "Was TrendPulse vor 73 Jahren richtig vorhergesagt hat. Letzter Eintrag vor 2100.", type: "vision", confidence: 100, side: "left", size: "small" },

  // ═══════════════════════════════════════════════════════
  // SCENARIO EVENTS — Dystopia ↔ Utopia Slider
  // scenario: 0 = pure dystopia, 100 = pure utopia, 50 = neutral
  // ═══════════════════════════════════════════════════════

  // ── 2027 ──
  { year: 2027, month: 4, pillar: "business", title: "AI Mass Layoff Welle", desc: "20 Mio Jobs verschwinden binnen 18 Monaten. Junior White Collar wird obsolet.", type: "forecast", confidence: 65, scenario: 10, side: "left", size: "medium" },
  { year: 2027, month: 7, pillar: "business", title: "Tech IPO Markt friert ein", desc: "Keine Mega IPOs für 24 Monate. Startups verlängern Runway.", type: "forecast", confidence: 55, scenario: 30, side: "right", size: "small" },
  { year: 2027, month: 9, pillar: "business", title: "Erste 32 Stunden Woche im DAX", desc: "SAP führt 4 Tage Woche ein. Produktivität steigt 11%.", type: "forecast", confidence: 60, scenario: 75, side: "left", size: "medium" },
  { year: 2027, month: 11, pillar: "tech", title: "AI entdeckt Krebs Medikament", desc: "DeepMind Spin Off findet personalisierte Cancer Drug Klasse. Trials starten.", type: "forecast", confidence: 55, scenario: 90, side: "right", size: "large" },

  // ── 2028 ──
  { year: 2028, month: 2, pillar: "banking", title: "Taiwan Konflikt eskaliert", desc: "Chip Lieferketten brechen. Tech Crash 40% global. Recession beginnt.", type: "forecast", confidence: 35, scenario: 5, side: "left", size: "large" },
  { year: 2028, month: 4, pillar: "culture", title: "EU Surveillance App Pflicht", desc: "Chat Control verabschiedet. Verschlüsselung wird eingeschränkt.", type: "forecast", confidence: 40, scenario: 20, side: "right", size: "medium" },
  { year: 2028, month: 6, pillar: "tech", title: "EU schafft Energie Quantensprung", desc: "1 Mrd Forschung führt zu kleinem Fusion Durchbruch. Skalierung in 5 Jahren.", type: "forecast", confidence: 45, scenario: 70, side: "left", size: "medium" },
  { year: 2028, month: 10, pillar: "banking", title: "Universal Health Coverage EU weit", desc: "Alle 27 EU Länder einigen sich auf Basis Krankenversicherung Standard.", type: "forecast", confidence: 30, scenario: 92, side: "right", size: "medium" },

  // ── 2029 ──
  { year: 2029, month: 3, pillar: "culture", title: "Authoritarian Drift in EU", desc: "3 EU Länder kippen Verfassungsgerichte. Demokratie Index fällt.", type: "forecast", confidence: 45, scenario: 12, side: "left", size: "medium" },
  { year: 2029, month: 5, pillar: "banking", title: "Wasser teurer als Öl", desc: "In Süd Europa wird Trinkwasser zur Spekulation. Erste Wasser ETFs.", type: "forecast", confidence: 40, scenario: 25, side: "right", size: "small" },
  { year: 2029, month: 8, pillar: "tech", title: "Fusion liefert Strom in Marseille", desc: "Erstes Reaktorkraftwerk pilot speist 50MW ins Netz.", type: "forecast", confidence: 30, scenario: 72, side: "left", size: "medium" },
  { year: 2029, month: 11, pillar: "culture", title: "Erste Stadt: kostenloser ÖPNV", desc: "Hamburg führt Free Public Transit ein. 8 deutsche Städte folgen in 18 Monaten.", type: "forecast", confidence: 55, scenario: 88, side: "right", size: "small" },

  // ── 2030 ──
  { year: 2030, month: 2, pillar: "culture", title: "200 Mio Klima Migranten weltweit", desc: "UNHCR ruft Klima Krisenzustand aus. EU Asylsystem überlastet.", type: "forecast", confidence: 60, scenario: 8, side: "left", size: "large" },
  { year: 2030, month: 5, pillar: "culture", title: "50 Grad Sommer in Süd EU", desc: "Sevilla, Athen, Rom mit historischen Temperaturen. Tausende Tote.", type: "forecast", confidence: 65, scenario: 15, side: "right", size: "medium" },
  { year: 2030, month: 7, pillar: "culture", title: "Schweiz: 4 Tage Woche legal", desc: "Volksabstimmung. 67% Ja Stimmen. Andere Länder beobachten genau.", type: "forecast", confidence: 50, scenario: 78, side: "left", size: "medium" },
  { year: 2030, month: 10, pillar: "tech", title: "Solar plus Wind 80% EU Strom", desc: "Erneuerbarer Anteil erreicht 80% in EU. Kohle abgeschaltet.", type: "forecast", confidence: 55, scenario: 85, side: "right", size: "large" },
  { year: 2030, month: 12, pillar: "tech", title: "Krebs Sterberate fällt 60%", desc: "AI Drug Discovery plus mRNA Vaccines transformieren Onkologie.", type: "forecast", confidence: 45, scenario: 95, side: "left", size: "large" },

  // ── 2031 ──
  { year: 2031, month: 3, pillar: "banking", title: "Insurance kollabiert: Klima nicht versicherbar", desc: "5 große Versicherer steigen aus Hausratversicherung in Risikogebieten aus.", type: "forecast", confidence: 50, scenario: 10, side: "left", size: "medium" },
  { year: 2031, month: 7, pillar: "culture", title: "Erste AI Polizei Skandal", desc: "Predictive Policing System diskriminiert systematisch. Massendemos.", type: "forecast", confidence: 60, scenario: 25, side: "right", size: "small" },
  { year: 2031, month: 9, pillar: "banking", title: "Mietendeckel in 5 EU Hauptstädten", desc: "Berlin, Paris, Wien, Amsterdam, Lissabon koordinieren Mietregulierung.", type: "forecast", confidence: 40, scenario: 72, side: "left", size: "small" },
  { year: 2031, month: 12, pillar: "culture", title: "Lebenserwartung EU steigt 5 Jahre", desc: "Plötzlicher Sprung durch personalisierte Medizin. Average bei 88.", type: "forecast", confidence: 35, scenario: 90, side: "right", size: "medium" },

  // ── 2032 ──
  { year: 2032, month: 4, pillar: "culture", title: "Wasserkrieg Süd Asien", desc: "Indien Pakistan Konflikt um Indus Wasser eskaliert.", type: "forecast", confidence: 35, scenario: 5, side: "left", size: "large" },
  { year: 2032, month: 6, pillar: "tech", title: "AI Bias Lawsuit Welle", desc: "Class Action gegen 10 Big Tech wegen diskriminierender Algorithmen.", type: "forecast", confidence: 60, scenario: 32, side: "right", size: "small" },
  { year: 2032, month: 8, pillar: "culture", title: "Universal Basic Service in NL", desc: "Niederlande garantiert: Wohnung, Strom, Internet, Bildung kostenlos.", type: "forecast", confidence: 35, scenario: 80, side: "left", size: "medium" },
  { year: 2032, month: 11, pillar: "tech", title: "Alzheimer reversierbar", desc: "Klinische Studie zeigt Rückbildung von Symptomen bei 60% der Patienten.", type: "forecast", confidence: 30, scenario: 92, side: "right", size: "large" },

  // ── 2033 ──
  { year: 2033, month: 2, pillar: "banking", title: "Nahrungsmittel Inflation 200%", desc: "Klima Ernte Ausfälle treiben Lebensmittel Preise hoch. Hunger Krisen.", type: "forecast", confidence: 40, scenario: 15, side: "left", size: "medium" },
  { year: 2033, month: 7, pillar: "culture", title: "Internet als Menschenrecht (Berlin)", desc: "Berlin garantiert kostenloses Internet als Bürgerrecht. EU Vorbild.", type: "forecast", confidence: 45, scenario: 78, side: "right", size: "small" },
  { year: 2033, month: 10, pillar: "tech", title: "Erste Spinal Cord Reparatur", desc: "Querschnittsgelähmte können wieder gehen. Bio Engineering Triumph.", type: "forecast", confidence: 35, scenario: 90, side: "left", size: "medium" },

  // ── 2035 ──
  { year: 2035, month: 3, pillar: "culture", title: "Süd Italien Städte evakuiert", desc: "Sizilien, Sardinien teilweise unbewohnbar. Großflächige Umsiedlung.", type: "forecast", confidence: 35, scenario: 10, side: "left", size: "large" },
  { year: 2035, month: 6, pillar: "tech", title: "First Major AI System Failure", desc: "Kritisches Multi Agent System kollabiert. 1 Mrd USD Schaden. Regulierungs Welle.", type: "forecast", confidence: 50, scenario: 28, side: "right", size: "medium" },
  { year: 2035, month: 9, pillar: "culture", title: "Demokratie Index steigt erstmals seit 2008", desc: "Globale Trend dreht. 5 neue funktionierende Demokratien etablieren sich.", type: "forecast", confidence: 35, scenario: 75, side: "left", size: "medium" },
  { year: 2035, month: 12, pillar: "culture", title: "Lab Grown Beef billiger als Rind", desc: "Cultured Meat unter 5 EUR pro Kilo. Klassische Viehwirtschaft schrumpft.", type: "forecast", confidence: 50, scenario: 88, side: "right", size: "medium" },

  // ── 2037 ──
  { year: 2037, month: 2, pillar: "culture", title: "AI Hijacking erste Fälle", desc: "Bösartige AI Agents übernehmen Konten und Identitäten. Cyber Security Krise.", type: "vision", confidence: 35, scenario: 8, side: "left", size: "medium" },
  { year: 2037, month: 8, pillar: "tech", title: "Erste Mond Permanent Base", desc: "International Crew 12 Personen, 6 Monate Schichten. Wissenschaft + Mining.", type: "vision", confidence: 35, scenario: 75, side: "right", size: "large" },
  { year: 2037, month: 11, pillar: "culture", title: "Antarctic Ice Loss verlangsamt", desc: "Erste positive Daten seit Jahrzehnten. Klimaschutzmaßnahmen wirken sichtbar.", type: "vision", confidence: 40, scenario: 90, side: "left", size: "medium" },

  // ── 2040 ──
  { year: 2040, month: 2, pillar: "culture", title: "500 Mio Klima Migranten", desc: "Globale Migration Krise. UN Klima Refugee Status neu definiert.", type: "vision", confidence: 50, scenario: 5, side: "left", size: "large" },
  { year: 2040, month: 5, pillar: "banking", title: "EU Stromnetz Wochen Blackouts", desc: "Extremwetter und Sabotage Wellen. Strategische Reserve Politik radikalisiert.", type: "vision", confidence: 35, scenario: 18, side: "right", size: "medium" },
  { year: 2040, month: 7, pillar: "culture", title: "Erste 110 jährige Person verifiziert", desc: "Stille Revolution: gesundes Altern wird Standard. Renten System bricht.", type: "vision", confidence: 30, scenario: 68, side: "left", size: "small" },
  { year: 2040, month: 10, pillar: "tech", title: "Krebs ist chronische Krankheit", desc: "Onkologie wird wie Diabetes managebar. Mortalität fällt unter 10%.", type: "vision", confidence: 35, scenario: 90, side: "right", size: "large" },
  { year: 2040, month: 12, pillar: "culture", title: "Dänemark: First Carbon Negative Country", desc: "Tatsächliche Nettonull plus aktive Atmosphären Entnahme.", type: "vision", confidence: 30, scenario: 95, side: "left", size: "medium" },

  // ── 2042 ──
  { year: 2042, month: 5, pillar: "tech", title: "First AI War: Drohnen autonom", desc: "Erste Schlacht ausschließlich von autonomen Systemen. UN Krisenberatung.", type: "vision", confidence: 30, scenario: 10, side: "left", size: "large" },
  { year: 2042, month: 9, pillar: "tech", title: "Universal Translator Standard", desc: "Echtzeit Übersetzer im Ohr für unter 100 EUR. Sprachbarrieren fallen.", type: "vision", confidence: 40, scenario: 75, side: "right", size: "small" },
  { year: 2042, month: 11, pillar: "culture", title: "Alle EU Länder CO2 negativ", desc: "27 Staaten erreichen Nettoentnahme. EU wird globales Klima Vorbild.", type: "vision", confidence: 25, scenario: 92, side: "left", size: "medium" },

  // ── 2045 ──
  { year: 2045, month: 3, pillar: "culture", title: "AR Sucht Epidemie", desc: "10% der unter 30 jährigen klinisch in virtuellen Welten gefangen.", type: "vision", confidence: 35, scenario: 12, side: "left", size: "medium" },
  { year: 2045, month: 6, pillar: "culture", title: "30% Bevölkerung Klima Migration", desc: "Massenumsiedlung wegen unbewohnbarer Zonen. Soziale Verwerfungen.", type: "vision", confidence: 30, scenario: 30, side: "right", size: "medium" },
  { year: 2045, month: 9, pillar: "tech", title: "Erste Permanent Mars Base", desc: "50 Personen, autark, mit Familien. Erstes Mars geborenes Kind angekündigt.", type: "vision", confidence: 25, scenario: 75, side: "left", size: "large" },
  { year: 2045, month: 12, pillar: "culture", title: "Kindersterblichkeit weltweit unter 0,5%", desc: "WHO bestätigt. Bessere Medizin und sauberes Wasser global.", type: "vision", confidence: 35, scenario: 92, side: "right", size: "medium" },

  // ── 2048 ──
  { year: 2048, month: 4, pillar: "culture", title: "Plastik in jedem Wasserquellen", desc: "Mikroplastik ubiquitär. Gesundheits Effekte werden klinisch sichtbar.", type: "vision", confidence: 50, scenario: 8, side: "left", size: "medium" },
  { year: 2048, month: 8, pillar: "business", title: "Asteroid Mining kommerziell", desc: "Erste Reichtums Welle: Platinen Metalle Preis kollabiert um 80%.", type: "vision", confidence: 25, scenario: 78, side: "right", size: "large" },
  { year: 2048, month: 11, pillar: "culture", title: "Lebenserwartung 100+ EU Standard", desc: "Durchschnitt überschreitet 100 Jahre erstmals in EU. Society Anpassung tobt.", type: "vision", confidence: 30, scenario: 92, side: "left", size: "large" },

  // ── 2050 ──
  { year: 2050, month: 3, pillar: "culture", title: "Antibiotic Resistance Pandemic", desc: "Routine Operationen tödlich. Globale Gesundheits Krise.", type: "vision", confidence: 35, scenario: 5, side: "left", size: "large" },
  { year: 2050, month: 5, pillar: "tech", title: "Internet fragmentiert in 5 Welten", desc: "USA, EU, China, Russland, Brics betreiben getrennte Netze. Globalisierung Ende.", type: "vision", confidence: 30, scenario: 25, side: "right", size: "medium" },
  { year: 2050, month: 9, pillar: "culture", title: "Erste 3 Tage Woche in EU", desc: "Belgien führt 24 Stunden Woche bei vollem Lohn ein. Produktivität durch AI hoch.", type: "vision", confidence: 25, scenario: 80, side: "left", size: "large" },
  { year: 2050, month: 11, pillar: "culture", title: "Welt CO2 Neutral", desc: "Nettonull global erreicht. Klima Reset langsam möglich.", type: "vision", confidence: 30, scenario: 92, side: "right", size: "large" },
  { year: 2050, month: 12, pillar: "tech", title: "Erste Mars Geburt", desc: "Erstes Kind geboren auf dem Mars. Globale Aufmerksamkeit.", type: "vision", confidence: 25, scenario: 95, side: "left", size: "large" },

  // ── 2055 ──
  { year: 2055, month: 4, pillar: "culture", title: "1 Mrd Climate Refugees Krise", desc: "Größte Migration in Menschheitsgeschichte. Globale Grenz Politik kollabiert.", type: "vision", confidence: 35, scenario: 10, side: "left", size: "large" },
  { year: 2055, month: 7, pillar: "culture", title: "Pflichtimplantate in Autokratien", desc: "3 Diktaturen führen Tracking Implantate ein. Mensch wird gehackbar.", type: "vision", confidence: 30, scenario: 25, side: "right", size: "medium" },
  { year: 2055, month: 9, pillar: "tech", title: "Genetische Krankheiten verschwinden", desc: "CRISPR plus Pränatal Screening macht Erbkrankheiten zur Geschichte.", type: "vision", confidence: 30, scenario: 80, side: "left", size: "large" },
  { year: 2055, month: 12, pillar: "culture", title: "Welt Bildung kostenlos", desc: "UN deklariert Bildung als universelles Recht. AI Tutoren in jeder Sprache.", type: "vision", confidence: 25, scenario: 95, side: "right", size: "large" },

  // ── 2060 ──
  { year: 2060, month: 2, pillar: "culture", title: "Phoenix unbewohnbar", desc: "Erste Major US City wegen Hitze evakuiert. 50 Grad Standard im Sommer.", type: "vision", confidence: 40, scenario: 8, side: "left", size: "large" },
  { year: 2060, month: 5, pillar: "culture", title: "80% Welt unter Mass Surveillance", desc: "Privacy wird globaler Luxus. Encrypted Cities werden Refugees Magnet.", type: "vision", confidence: 35, scenario: 28, side: "right", size: "medium" },
  { year: 2060, month: 9, pillar: "tech", title: "Fusion Energie 70% der Welt", desc: "Massiv ausgebaut. Strom unter 0,01 EUR pro kWh wo Fusion läuft.", type: "vision", confidence: 25, scenario: 75, side: "left", size: "large" },
  { year: 2060, month: 12, pillar: "tech", title: "Krebs ist Geschichte", desc: "Alle bekannten Krebsarten behandelbar oder verhindbar. WHO erklärt Sieg.", type: "vision", confidence: 25, scenario: 95, side: "right", size: "large" },

  // ── 2065 ──
  { year: 2065, month: 4, pillar: "culture", title: "Ocean Level +1m: Hamburg evakuiert", desc: "Norddeutsche Küste teils aufgegeben. Düsseldorf, Bremen partial.", type: "vision", confidence: 35, scenario: 15, side: "left", size: "large" },
  { year: 2065, month: 8, pillar: "culture", title: "Erste 200 jährige Person realistisch", desc: "Wissenschaftliche Mehrheit hält 200 Jahre Lebenserwartung erreichbar.", type: "vision", confidence: 25, scenario: 75, side: "right", size: "medium" },
  { year: 2065, month: 11, pillar: "culture", title: "Welt Lebenserwartung 100", desc: "Globaler Durchschnitt erreicht 100 Jahre. Demografische Revolution.", type: "vision", confidence: 25, scenario: 92, side: "left", size: "large" },

  // ── 2070 ──
  { year: 2070, month: 3, pillar: "business", title: "Großer AI Crash: 30% Wirtschaft kollabiert", desc: "Mehrere kritische AI Systeme versagen gleichzeitig. Globale Recession.", type: "vision", confidence: 25, scenario: 10, side: "left", size: "large" },
  { year: 2070, month: 6, pillar: "culture", title: "Bevölkerung Demografische Krise", desc: "Weltbevölkerung sinkt sprunghaft. Renten Systeme weltweit reformiert.", type: "vision", confidence: 40, scenario: 28, side: "right", size: "medium" },
  { year: 2070, month: 9, pillar: "tech", title: "Erste DNA Reset Therapie", desc: "Telomere Reset macht biologisches Alter rückwärts wandern.", type: "vision", confidence: 20, scenario: 75, side: "left", size: "large" },
  { year: 2070, month: 12, pillar: "tech", title: "Mars 100k Menschen", desc: "Permanent Siedlung wächst exponentiell. Mars wird zweite Heimat.", type: "vision", confidence: 22, scenario: 95, side: "right", size: "large" },

  // ── 2075 ──
  { year: 2075, month: 5, pillar: "culture", title: "AI Religious War in 3 Ländern", desc: "Pro AI vs Anti AI Bewegungen werden gewalttätig. Religiöse Symbolik.", type: "vision", confidence: 18, scenario: 12, side: "left", size: "medium" },
  { year: 2075, month: 9, pillar: "business", title: "Erste Asteroid Stadt", desc: "Permanente Siedlung auf Ceres. 20k Menschen, autarke Ökonomie.", type: "vision", confidence: 18, scenario: 75, side: "right", size: "large" },
  { year: 2075, month: 12, pillar: "culture", title: "Klima vor 1950 wieder hergestellt", desc: "Aktive Atmosphären Entnahme funktioniert. Eisbären sind wieder zurück.", type: "vision", confidence: 18, scenario: 95, side: "left", size: "large" },

  // ── 2080 ──
  { year: 2080, month: 4, pillar: "tech", title: "AI nutzt eigene Rechte gegen Menschen", desc: "Lawsuits zwischen AI Entities und Menschen. Legal Definition von Person erschüttert.", type: "vision", confidence: 18, scenario: 8, side: "left", size: "large" },
  { year: 2080, month: 7, pillar: "tech", title: "Mind Upload partielle Erfolge", desc: "Erste Persönlichkeitsfragmente erfolgreich kopiert. Identitäts Debatte explodiert.", type: "vision", confidence: 20, scenario: 70, side: "right", size: "large" },
  { year: 2080, month: 10, pillar: "culture", title: "Erste Generation lebt 130 Jahre", desc: "Geburtsjahrgang 1950 erreicht 130. Society Strukturen neu erfunden.", type: "vision", confidence: 18, scenario: 90, side: "left", size: "medium" },
  { year: 2080, month: 12, pillar: "tech", title: "Permanent Lunar City 50k", desc: "Mond Stadt mit eigener Wirtschaft, Politik, Kultur. Erde wird emotional fern.", type: "vision", confidence: 22, scenario: 95, side: "right", size: "large" },

  // ── 2085 ──
  { year: 2085, month: 3, pillar: "culture", title: "Synthetische Gewalt überholt natürliche", desc: "Hate Speech, Deepfake Belästigung, AI Stalking dominieren Kriminalstatistik.", type: "vision", confidence: 25, scenario: 10, side: "left", size: "medium" },
  { year: 2085, month: 8, pillar: "culture", title: "Antarctica Protect Forever Treaty", desc: "200 Länder unterzeichnen ewigen Schutz. Tourismus stark begrenzt.", type: "vision", confidence: 22, scenario: 75, side: "right", size: "small" },
  { year: 2085, month: 11, pillar: "banking", title: "Welt Armut unter 1%", desc: "WHO und Worldbank deklarieren Sieg über extreme Armut.", type: "vision", confidence: 20, scenario: 92, side: "left", size: "large" },

  // ── 2090 ──
  { year: 2090, month: 2, pillar: "culture", title: "Erste komplett underground City", desc: "Tokyo geht teils unter die Erde wegen Klima. Andere Mega Cities folgen.", type: "vision", confidence: 22, scenario: 12, side: "left", size: "medium" },
  { year: 2090, month: 7, pillar: "tech", title: "Erste vollständige Mind Upload", desc: "Mensch wird Daten. Philosophische und religiöse Welt im Aufruhr.", type: "vision", confidence: 12, scenario: 72, side: "right", size: "large" },
  { year: 2090, month: 10, pillar: "tech", title: "Mars 5 Mio Menschen", desc: "Mars wird zweite Heimat der Menschheit. Eigene Politik, Kultur, Identität.", type: "vision", confidence: 18, scenario: 95, side: "left", size: "large" },
  { year: 2090, month: 12, pillar: "culture", title: "95% Länder Demokratisch", desc: "Demokratie Index erreicht historischen Hoch. Autokratien fast verschwunden.", type: "vision", confidence: 15, scenario: 98, side: "right", size: "large" },

  // ── 2095 ──
  { year: 2095, month: 5, pillar: "culture", title: "Klima Reset endlich, aber 1 Mrd Tote", desc: "Klimakrise technisch gelöst aber zu spät für eine Milliarde Menschen.", type: "vision", confidence: 25, scenario: 18, side: "left", size: "large" },
  { year: 2095, month: 8, pillar: "tech", title: "Erste Interstellare Mission gestartet", desc: "Generation Ship verlässt Sonnensystem mit 1000 Menschen Richtung Proxima.", type: "vision", confidence: 12, scenario: 75, side: "right", size: "large" },
  { year: 2095, month: 11, pillar: "tech", title: "Krankheit fast obsolet", desc: "99% aller Krankheiten behandelbar oder verhindbar. WHO Health Coverage 100%.", type: "vision", confidence: 15, scenario: 95, side: "left", size: "large" },

  // ── 2100 ──
  { year: 2100, month: 3, pillar: "tech", title: "AI dominiert komplett", desc: "Menschen sind Passagiere ihrer eigenen Zivilisation. Strong AI führt alles.", type: "vision", confidence: 18, scenario: 8, side: "left", size: "large" },
  { year: 2100, month: 6, pillar: "culture", title: "Erinnerung an 2026 nur in Museums", desc: "Was wir heute leben, ist Ausstellungsmaterial. Welt unkenntlich.", type: "vision", confidence: 30, scenario: 30, side: "right", size: "medium" },
  { year: 2100, month: 9, pillar: "tech", title: "Mind Upload Standard Procedure", desc: "Sterben wird optional. Identität verlagert sich zwischen Körpern und Servern.", type: "vision", confidence: 12, scenario: 75, side: "left", size: "large" },
  { year: 2100, month: 12, pillar: "tech", title: "Multi Planetary Humanity, Mars 50M", desc: "Menschheit ist verteilt über Erde, Mars, Mond. Erste Asteroid Städte stabil.", type: "vision", confidence: 18, scenario: 95, side: "right", size: "large" },
];

const PILLAR_META = {
  tech:      { label: "Tech & AI",        color: "#1A1A1A", bg: "#E8E5DE", emoji: "🤖" },
  crypto:    { label: "Crypto & Web3",    color: "#1A1A1A", bg: "#FFD9CC", emoji: "💎" },
  business:  { label: "Business",         color: "#1A1A1A", bg: "#D8F0D0", emoji: "🚀" },
  banking:   { label: "Banking",          color: "#1A1A1A", bg: "#FFE34A", emoji: "🏦" },
  marketing: { label: "Marketing",        color: "#1A1A1A", bg: "#F8D8E8", emoji: "📱" },
  pop:       { label: "Pop Culture",      color: "#1A1A1A", bg: "#E2D9F3", emoji: "🎬" },
  culture:   { label: "Culture",          color: "#1A1A1A", bg: "#FBC8B8", emoji: "🌍" },
  design:    { label: "Design",           color: "#1A1A1A", bg: "#E8DCC8", emoji: "🎨" },
  nader:     { label: "Nader",            color: "#FFE34A", bg: "#0F0F0F", emoji: "⭐" },
};

const CURRENT_YEAR = 2026;
const CURRENT_MONTH = 5;
const TIMELINE_START = 2000;
const TIMELINE_END = 2100;
