export default [
  {
    id: "bosch-powertools",
    parentId: null,
    displayText: "Bosch Powertools",
  },
  {
    id: "handwerk-industrie",
    parentId: "bosch-powertools",
    displayText: "Handwerk/Industrie",
    styleControl: "colored",
  },
  {
    id: "heimwerker",
    parentId: "bosch-powertools",
    displayText: "Heimwerker",
    styleControl: "linethrough",
  },
  {
    id: "gartengeraete",
    parentId: "bosch-powertools",
    displayText: "Gartengeräte",
    styleControl: "disabled",
  },
  {
    id: "industriewerkzeuge",
    parentId: "bosch-powertools",
    displayText: "Industriewerkzeuge",
  },
  {
    id: "zubehoer-heimwerker",
    parentId: "bosch-powertools",
    displayText: "Zubehör Heimwerker",
  },
  {
    id: "promoline",
    parentId: "bosch-powertools",
    displayText: "Promoline",
  },
  {
    id: "akkugeraete",
    parentId: "handwerk-industrie",
    displayText: "Akkugeräte",
  },
  {
    id: "bohr-schlag-abbruchhaemmer-elektrisch",
    parentId: "handwerk-industrie",
    displayText: "Bohr/Schlag-/Abbruchhämmer (elektrisch)",
  },
  {
    id: "bohrmaschine-elektrisch",
    parentId: "handwerk-industrie",
    displayText: "Bohrmaschine elektrisch",
  },
  {
    id: "bohrmaschine-elektrisch-diamantbohren",
    parentId: "handwerk-industrie",
    displayText: "Bohrmaschine (elektrisch, Diamantbohren)",
  },
  {
    id: "ruehrwerk",
    parentId: "handwerk-industrie",
    displayText: "Rührwerk",
  },
  {
    id: "schere-nager-elektrisch",
    parentId: "handwerk-industrie",
    displayText: "Schere, Nager (elektrisch)",
  },
  {
    id: "fraese-elektrisch",
    parentId: "handwerk-industrie",
    displayText: "Fräse (elektrisch)",
  },
  {
    id: "hobel-elektrisch",
    parentId: "handwerk-industrie",
    displayText: "Hobel (elektrisch)",
  },
  // Zusatz zum testen Scrollverhalten
  {
    id: "akkugeraete_1",
    parentId: "akkugeraete",
    displayText: "Akkugeräte + 1",
  },
  {
    id: "akkugeraete_2",
    parentId: "akkugeraete",
    displayText: "Akkugeräte + 2",
  },
  {
    id: "akkugeraete_3",
    parentId: "akkugeraete",
    displayText: "Akkugeräte + 3",
  },
  {
    id: "akkugeraete_4",
    parentId: "akkugeraete_1",
    displayText: "Akkugeräte + 1",
  },
  {
    id: "akkugeraete_5",
    parentId: "akkugeraete_2",
    displayText: "Akkugeräte + 2",
  },
  {
    id: "akkugeraete_6",
    parentId: "akkugeraete_3",
    displayText: "Akkugeräte + 3",
  },
];
