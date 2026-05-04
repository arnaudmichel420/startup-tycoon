export const multiplayerUpgrades = [
  {
    id: "dev-junior",
    name: "Dev Junior",
    baseCost: 10,
    incomePerSecondGain: 1,
    description: "Premier renfort produit pour generer un revenu regulier.",
  },
  {
    id: "dev-senior",
    name: "Dev Senior",
    baseCost: 50,
    incomePerSecondGain: 3,
    description: "Un profil plus autonome qui accelere la production.",
  },
  {
    id: "serveur-cloud",
    name: "Serveur Cloud",
    baseCost: 120,
    incomePerSecondGain: 5,
    description: "Infrastructure scalable pour soutenir la croissance.",
  },
  {
    id: "marketing",
    name: "Marketing",
    baseCost: 200,
    incomePerSecondGain: 7,
    description: "Acquisition de clients et visibilite pendant le round.",
  },
  {
    id: "cto",
    name: "CTO",
    baseCost: 500,
    incomePerSecondGain: 15,
    description: "Direction technique qui fiabilise le rythme de livraison.",
  },
  {
    id: "data-center",
    name: "Data Center",
    baseCost: 2000,
    incomePerSecondGain: 50,
    description: "Grosse capacite serveur pour creuser l'ecart au classement.",
  },
];

export const defensiveUpgrades = [
  {
    id: "ops-engineer",
    name: "Ops Engineer",
    baseCost: 50,
    resiliencePerSecondGain: 5,
    description: "Produit de la resilience pour absorber les incidents.",
  },
  {
    id: "cto-securite",
    name: "CTO Securite",
    baseCost: 300,
    resiliencePerSecondGain: 15,
    description: "Renforce la defense contre les events negatifs.",
  },
  {
    id: "red-team",
    name: "Red Team",
    baseCost: 1000,
    resiliencePerSecondGain: 40,
    description: "Equipe defensive massive pour survivre aux rounds agressifs.",
  },
];

export const strategicActions = [
  {
    id: "sabotage",
    name: "Sabotage cible",
    cost: "200$",
    cooldown: "30s",
    effect: "Envoie BUG_EN_PROD sur un adversaire choisi.",
  },
  {
    id: "shield",
    name: "Shield",
    cost: "150 resilience",
    cooldown: "90s",
    effect: "Immunite aux events negatifs pendant 60s.",
  },
];

export const negativeEvents = [
  {
    id: "bug-en-prod",
    name: "BUG_EN_PROD",
    scope: "1 joueur",
    effect: "-10% revenu passif pendant 30s",
    mitigationCost: 30,
  },
  {
    id: "levee-ratee",
    name: "LEVEE_RATEE",
    scope: "1 joueur",
    effect: "-20% de la money actuelle",
    mitigationCost: 50,
  },
  {
    id: "burn-out",
    name: "BURN_OUT",
    scope: "1 joueur",
    effect: "Clics desactives pendant 10s",
    mitigationCost: 25,
  },
  {
    id: "crise-marche",
    name: "CRISE_MARCHE",
    scope: "Global",
    effect: "-5% revenu passif pour tous pendant 60s",
    mitigationCost: 40,
  },
];

export const positiveEvents = [
  {
    id: "levee-de-fonds",
    name: "LEVEE_DE_FONDS",
    scope: "1 joueur",
    effect: "+500$ immediat",
  },
  {
    id: "innovation",
    name: "INNOVATION",
    scope: "1 joueur",
    effect: "+20% revenu passif pendant 30s",
  },
  {
    id: "hackathon",
    name: "HACKATHON",
    scope: "1 joueur",
    effect: "x2 valeur de clic pendant 15s",
  },
  {
    id: "boom-marche",
    name: "BOOM_MARCHE",
    scope: "Global",
    effect: "+10% revenu passif pour tous pendant 60s",
  },
];
