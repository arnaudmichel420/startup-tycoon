import { useOutletContext } from "react-router-dom";
import Upgrade from "../../components/atoms/upgrade";
import GameStatsCard from "../../components/molecules/game-stats-cards";
import { buildPrimaryStatCards } from "../../utils/stat-cards";

export default function Shop() {
  const {
    money,
    setMoney,
    incomePerSecond,
    setIncomePerSecond,
    upgrades,
    setUpgrades,
  } = useOutletContext();
  const totalOwnedUpgrades = upgrades.reduce(
    (total, upgrade) => total + upgrade.count,
    0,
  );
  const statCards = buildPrimaryStatCards({
    incomePerSecond,
    money,
    totalOwnedUpgrades,
  });

  const addUpgrade = (id) => {
    const currentUpgrade = upgrades.find((upgrade) => upgrade.id === id);
    if (!currentUpgrade) return;

    setIncomePerSecond((prev) => (prev += currentUpgrade.incomePerSecondGain));
    setMoney(
      (prev) =>
        (prev -= Math.round(
          currentUpgrade.baseCost * Math.pow(1.15, currentUpgrade.count),
        )),
    );
    setUpgrades((prev) => [
      ...prev.map((upgrade) =>
        upgrade.id === id ? { ...upgrade, count: upgrade.count + 1 } : upgrade,
      ),
    ]);
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Shop</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {statCards.map((card) => (
          <GameStatsCard key={card.id} eyebrow={card.eyebrow}>
            {card.content}
          </GameStatsCard>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {upgrades.map((upgrade) => (
          <Upgrade
            key={upgrade.id}
            upgrade={upgrade}
            onClick={addUpgrade}
            money={money}
          />
        ))}
      </div>
    </>
  );
}
