import IncomeDisplay from "../components/atoms/income-display";
import MoneyDisplay from "../components/atoms/money-display";

export function buildPrimaryStatCards({
  incomePerSecond,
  money,
  totalOwnedUpgrades,
}) {
  return [
    {
      id: "money",
      eyebrow: "Tresorerie",
      content: <MoneyDisplay money={money} />,
    },
    {
      id: "income",
      eyebrow: "Revenu passif",
      content: <IncomeDisplay incomePerSecond={incomePerSecond} />,
    },
    {
      id: "upgrades",
      eyebrow: "Upgrades poses",
      content: totalOwnedUpgrades,
    },
  ];
}
