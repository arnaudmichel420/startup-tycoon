export function buildPrimaryStatCards({
  incomePerSecond,
  money,
  totalOwnedUpgrades,
}) {
  return [
    {
      id: "money",
      eyebrow: "Tresorerie",
      value: money,
    },
    {
      id: "income",
      eyebrow: "Revenu passif",
      value: incomePerSecond,
    },
    {
      id: "upgrades",
      eyebrow: "Upgrades poses",
      value: totalOwnedUpgrades,
    },
  ];
}
