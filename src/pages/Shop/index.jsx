import Upgrade from "../../components/atoms/upgrade";
import GameStatsCard from "../../components/molecules/game-stats-cards";
import { useGameStore } from "../../store/gameStore";
import { buildPrimaryStatCards } from "../../utils/stat-cards";

export default function Shop() {
  const money = useGameStore((state) => state.money);
  const incomePerSecond = useGameStore((state) => state.incomePerSecond);
  const upgrades = useGameStore((state) => state.upgrades);
  const BUY_UPGRADE = useGameStore((state) => state.BUY_UPGRADE);

  const totalOwnedUpgrades = upgrades.reduce(
    (total, upgrade) => total + upgrade.count,
    0,
  );
  const statCards = buildPrimaryStatCards({
    incomePerSecond,
    money,
    totalOwnedUpgrades,
  });

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
            onClick={BUY_UPGRADE}
            money={money}
          />
        ))}
      </div>
    </>
  );
}
