export const SUBJECTS = [
  { id: 'mathe',      name: 'Mathematik',  badge: 'L', emoji: '📐', priority: 'orange', color: '#6c63ff' },
  { id: 'englisch',   name: 'Englisch',    badge: 'L', emoji: '🇬🇧', priority: 'orange', color: '#00e5ff' },
  { id: 'geschichte', name: 'Geschichte',  badge: 'L', emoji: '📜', priority: 'orange', color: '#ff9a3c' },
  { id: 'deutsch',    name: 'Deutsch',     badge: null, emoji: '🇩🇪', priority: 'orange', color: '#a78bfa' },
  { id: 'geo',        name: 'Geographie',  badge: null, emoji: '🌍', priority: 'red',    color: '#ff4d6d' },
  { id: 'info',       name: 'Informatik',  badge: 'P', emoji: '💻', priority: 'green',  color: '#00e676' },
  { id: 'psycho',     name: 'Psychologie', badge: null, emoji: '🧠', priority: 'red',    color: '#ff4d6d' },
  { id: 'religion',   name: 'Religion',    badge: null, emoji: '✝️', priority: 'green',  color: '#00e676' },
  { id: 'sport',      name: 'Sport',       badge: null, emoji: '🏃', priority: 'green',  color: '#00e676' },
];

export const DEFAULTS = {
  mathe: 5, englisch: 6, geschichte: 6, deutsch: 6,
  geo: 3, info: 11, psycho: 2, religion: 5, sport: 8
};

export const TOPICS = {
  mathe: {
    '10': [
      { key: 'mathe_10_1', label: 'Lineare Funktionen', url: 'https://www.mathebibel.de/lineare-funktionen' },
      { key: 'mathe_10_2', label: 'Quadratische Funktionen', url: 'https://www.mathebibel.de/quadratische-funktionen' },
      { key: 'mathe_10_3', label: 'Gleichungssysteme', url: 'https://www.mathebibel.de/lineare-gleichungssysteme' },
      { key: 'mathe_10_4', label: 'Potenzen & Wurzeln', url: 'https://www.mathebibel.de/potenzen' },
      { key: 'mathe_10_5', label: 'Grundlagen Stochastik', url: 'https://www.mathebibel.de/wahrscheinlichkeitsrechnung' },
      { key: 'mathe_10_6', label: 'Flächen & Volumen', url: 'https://www.mathebibel.de/flaeche' },
    ],
    '11': [
      { key: 'mathe_11_1', label: 'Analysis – Ableitungen', url: 'https://www.mathebibel.de/ableitungsregeln' },
      { key: 'mathe_11_2', label: 'Kurvendiskussion', url: 'https://www.mathebibel.de/kurvendiskussion' },
      { key: 'mathe_11_3', label: 'Stochastik – Wahrscheinlichkeiten', url: 'https://www.mathebibel.de/wahrscheinlichkeit' },
      { key: 'mathe_11_4', label: 'Baumdiagramme', url: 'https://www.mathebibel.de/baumdiagramm' },
      { key: 'mathe_11_5', label: 'Geometrie – Vektoren', url: 'https://www.mathebibel.de/vektoren' },
      { key: 'mathe_11_6', label: 'Geraden', url: 'https://www.mathebibel.de/gerade' },
    ],
    '12': [
      { key: 'mathe_12_1', label: 'Integrale', url: 'https://www.mathebibel.de/integralrechnung' },
      { key: 'mathe_12_2', label: 'Flächenberechnung mit Integralen', url: 'https://www.mathebibel.de/flaeche-zwischen-kurve-und-x-achse' },
      { key: 'mathe_12_3', label: 'Binomialverteilung', url: 'https://www.mathebibel.de/binomialverteilung' },
      { key: 'mathe_12_4', label: 'Normalverteilung', url: 'https://www.mathebibel.de/normalverteilung' },
      { key: 'mathe_12_5', label: 'Analytische Geometrie – Ebenen', url: 'https://www.mathebibel.de/ebenen' },
      { key: 'mathe_12_6', label: 'Lagebeziehungen', url: 'https://www.mathebibel.de/lagebeziehungen' },
    ],
  },
  deutsch: {
    '10': [
      { key: 'de_10_1', label: 'Inhaltsangabe', url: 'https://www.studysmarter.de/schule/deutsch/aufsatz/inhaltsangabe/' },
      { key: 'de_10_2', label: 'Erörterung', url: 'https://www.studysmarter.de/schule/deutsch/aufsatz/eroerterung/' },
      { key: 'de_10_3', label: 'Gedichtanalyse', url: 'https://www.studysmarter.de/schule/deutsch/lyrik/gedichtanalyse/' },
      { key: 'de_10_4', label: 'Grammatik & Stilmittel', url: 'https://www.studysmarter.de/schule/deutsch/stilmittel/' },
    ],
    '11': [
      { key: 'de_11_1', label: 'Textanalyse', url: 'https://www.studysmarter.de/schule/deutsch/textanalyse/' },
      { key: 'de_11_2', label: 'Interpretation Drama/Epik', url: 'https://www.studysmarter.de/schule/deutsch/interpretation/' },
      { key: 'de_11_3', label: 'Argumentation vertiefen', url: 'https://www.studysmarter.de/schule/deutsch/argumentation/' },
      { key: 'de_11_4', label: 'Sprachliche Analyse', url: 'https://www.studysmarter.de/schule/deutsch/sprachanalyse/' },
    ],
    '12': [
      { key: 'de_12_1', label: 'Abituraufsatz', url: 'https://www.abiweb.de/deutsch/abituraufsatz.html' },
      { key: 'de_12_2', label: 'Vergleich von Texten', url: 'https://www.studysmarter.de/schule/deutsch/textvergleich/' },
      { key: 'de_12_3', label: 'Literarische Epochen', url: 'https://www.studysmarter.de/schule/deutsch/literaturepochen/' },
      { key: 'de_12_4', label: 'Rhetorik & Sprache', url: 'https://www.studysmarter.de/schule/deutsch/rhetorik/' },
    ],
  },
  englisch: {
    '10': [
      { key: 'en_10_1', label: 'Zeiten (Simple Past, Present Perfect)', url: 'https://www.ego4u.de/de/cram-up/grammar' },
      { key: 'en_10_2', label: 'Textverständnis', url: 'https://www.studysmarter.de/schule/englisch/reading-comprehension/' },
      { key: 'en_10_3', label: 'Writing Basics', url: 'https://www.studysmarter.de/schule/englisch/writing/' },
      { key: 'en_10_4', label: 'Vokabelaufbau', url: 'https://www.vocabulix.com/deutsch-englisch' },
    ],
    '11': [
      { key: 'en_11_1', label: 'Analysis', url: 'https://www.studysmarter.de/schule/englisch/textanalyse-englisch/' },
      { key: 'en_11_2', label: 'Comment / Discussion', url: 'https://www.studysmarter.de/schule/englisch/comment/' },
      { key: 'en_11_3', label: 'Mediation', url: 'https://www.studysmarter.de/schule/englisch/mediation/' },
      { key: 'en_11_4', label: 'Listening & Reading Skills', url: 'https://www.khanacademy.org/ela' },
    ],
    '12': [
      { key: 'en_12_1', label: 'Advanced Writing', url: 'https://www.studysmarter.de/schule/englisch/essay-schreiben/' },
      { key: 'en_12_2', label: 'Global Issues', url: 'https://www.bbc.com/news/world' },
      { key: 'en_12_3', label: 'Literature Analysis', url: 'https://www.studysmarter.de/schule/englisch/literature-analysis/' },
      { key: 'en_12_4', label: 'Argumentation auf hohem Niveau', url: 'https://www.studysmarter.de/schule/englisch/argumentation/' },
    ],
  },
  geo: {
    '10': [
      { key: 'geo_10_1', label: 'Klimazonen', url: 'https://www.studysmarter.de/schule/geographie/klimazonen/' },
      { key: 'geo_10_2', label: 'Vegetationszonen', url: 'https://www.studysmarter.de/schule/geographie/vegetationszonen/' },
      { key: 'geo_10_3', label: 'Bevölkerung', url: 'https://www.studysmarter.de/schule/geographie/bevoelkerungsentwicklung/' },
    ],
    '11': [
      { key: 'geo_11_1', label: 'Wirtschaftsgeographie', url: 'https://www.studysmarter.de/schule/geographie/wirtschaftsgeographie/' },
      { key: 'geo_11_2', label: 'Globalisierung', url: 'https://www.studysmarter.de/schule/geographie/globalisierung/' },
      { key: 'geo_11_3', label: 'Stadtentwicklung', url: 'https://www.studysmarter.de/schule/geographie/stadtentwicklung/' },
    ],
    '12': [
      { key: 'geo_12_1', label: 'Nachhaltigkeit', url: 'https://www.studysmarter.de/schule/geographie/nachhaltigkeit/' },
      { key: 'geo_12_2', label: 'Disparitäten', url: 'https://www.studysmarter.de/schule/geographie/disparitaeten/' },
      { key: 'geo_12_3', label: 'Raumplanung', url: 'https://www.studysmarter.de/schule/geographie/raumplanung/' },
    ],
  },
  geschichte: {
    '10': [
      { key: 'ge_10_1', label: 'Industrialisierung', url: 'https://www.studysmarter.de/schule/geschichte/industrialisierung/' },
      { key: 'ge_10_2', label: 'Imperialismus', url: 'https://www.studysmarter.de/schule/geschichte/imperialismus/' },
      { key: 'ge_10_3', label: 'Erster Weltkrieg', url: 'https://www.studysmarter.de/schule/geschichte/erster-weltkrieg/' },
    ],
    '11': [
      { key: 'ge_11_1', label: 'Weimarer Republik', url: 'https://www.studysmarter.de/schule/geschichte/weimarer-republik/' },
      { key: 'ge_11_2', label: 'Nationalsozialismus', url: 'https://www.studysmarter.de/schule/geschichte/nationalsozialismus/' },
      { key: 'ge_11_3', label: 'Zweiter Weltkrieg', url: 'https://www.studysmarter.de/schule/geschichte/zweiter-weltkrieg/' },
    ],
    '12': [
      { key: 'ge_12_1', label: 'Kalter Krieg', url: 'https://www.studysmarter.de/schule/geschichte/kalter-krieg/' },
      { key: 'ge_12_2', label: 'BRD & DDR', url: 'https://www.studysmarter.de/schule/geschichte/brd-und-ddr/' },
      { key: 'ge_12_3', label: 'Globalgeschichte', url: 'https://www.studysmarter.de/schule/geschichte/globalgeschichte/' },
    ],
  },
  info: {
    '10': [
      { key: 'info_10_1', label: 'Grundlagen Computer', url: 'https://www.studysmarter.de/schule/informatik/grundlagen/' },
      { key: 'info_10_2', label: 'Binärsystem', url: 'https://www.studysmarter.de/schule/informatik/binaersystem/' },
      { key: 'info_10_3', label: 'Einfache Algorithmen', url: 'https://www.studysmarter.de/schule/informatik/algorithmen/' },
    ],
    '11': [
      { key: 'info_11_1', label: 'Programmierung', url: 'https://www.studysmarter.de/schule/informatik/programmierung/' },
      { key: 'info_11_2', label: 'Datenstrukturen', url: 'https://www.studysmarter.de/schule/informatik/datenstrukturen/' },
      { key: 'info_11_3', label: 'Objektorientierung', url: 'https://www.studysmarter.de/schule/informatik/objektorientierte-programmierung/' },
    ],
    '12': [
      { key: 'info_12_1', label: 'Datenbanken', url: 'https://www.studysmarter.de/schule/informatik/datenbanken/' },
      { key: 'info_12_2', label: 'Netzwerke', url: 'https://www.studysmarter.de/schule/informatik/netzwerke/' },
      { key: 'info_12_3', label: 'Informatiksysteme', url: 'https://www.studysmarter.de/schule/informatik/informatiksysteme/' },
    ],
  },
  psycho: {
    '10': [
      { key: 'psy_10_1', label: 'Wahrnehmung', url: 'https://www.studysmarter.de/schule/psychologie/wahrnehmung/' },
      { key: 'psy_10_2', label: 'Lernen', url: 'https://www.studysmarter.de/schule/psychologie/lernen/' },
      { key: 'psy_10_3', label: 'Gedächtnis', url: 'https://www.studysmarter.de/schule/psychologie/gedaechtnis/' },
    ],
    '11': [
      { key: 'psy_11_1', label: 'Lerntheorien', url: 'https://www.studysmarter.de/schule/psychologie/lerntheorien/' },
      { key: 'psy_11_2', label: 'Entwicklungspsychologie', url: 'https://www.studysmarter.de/schule/psychologie/entwicklungspsychologie/' },
      { key: 'psy_11_3', label: 'Motivation', url: 'https://www.studysmarter.de/schule/psychologie/motivation/' },
    ],
    '12': [
      { key: 'psy_12_1', label: 'Klinische Psychologie', url: 'https://www.studysmarter.de/schule/psychologie/klinische-psychologie/' },
      { key: 'psy_12_2', label: 'Persönlichkeit', url: 'https://www.studysmarter.de/schule/psychologie/persoenlichkeit/' },
      { key: 'psy_12_3', label: 'Verhalten', url: 'https://www.studysmarter.de/schule/psychologie/verhalten/' },
    ],
  },
  religion: {
    '10': [
      { key: 'rel_10_1', label: 'Moral & Werte', url: 'https://www.studysmarter.de/schule/religion/ethik/' },
      { key: 'rel_10_2', label: 'Religionen der Welt', url: 'https://www.studysmarter.de/schule/religion/weltreligionen/' },
    ],
    '11': [
      { key: 'rel_11_1', label: 'Ethik', url: 'https://www.studysmarter.de/schule/religion/ethik/' },
      { key: 'rel_11_2', label: 'Verantwortung', url: 'https://www.studysmarter.de/schule/religion/verantwortung/' },
      { key: 'rel_11_3', label: 'Freiheit', url: 'https://www.studysmarter.de/schule/religion/freiheit/' },
    ],
    '12': [
      { key: 'rel_12_1', label: 'Philosophie', url: 'https://www.studysmarter.de/schule/philosophie/' },
      { key: 'rel_12_2', label: 'Sinnfragen', url: 'https://www.studysmarter.de/schule/religion/sinnfragen/' },
      { key: 'rel_12_3', label: 'Religion vs. Wissenschaft', url: 'https://www.studysmarter.de/schule/religion/religion-und-wissenschaft/' },
    ],
  },
  sport: {
    '10': [
      { key: 'spo_10_1', label: 'Ausdauer', url: 'https://www.studysmarter.de/schule/sport/ausdauer/' },
      { key: 'spo_10_2', label: 'Kraft', url: 'https://www.studysmarter.de/schule/sport/kraft/' },
      { key: 'spo_10_3', label: 'Koordination', url: 'https://www.studysmarter.de/schule/sport/koordination/' },
    ],
    '11': [
      { key: 'spo_11_1', label: 'Sporttheorie', url: 'https://www.studysmarter.de/schule/sport/sporttheorie/' },
      { key: 'spo_11_2', label: 'Trainingslehre', url: 'https://www.studysmarter.de/schule/sport/trainingslehre/' },
    ],
    '12': [
      { key: 'spo_12_1', label: 'Trainingsprinzipien', url: 'https://www.studysmarter.de/schule/sport/trainingslehre/' },
      { key: 'spo_12_2', label: 'Sportsoziologie', url: 'https://www.studysmarter.de/schule/sport/' },
    ],
  },
};