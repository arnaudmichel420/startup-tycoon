import { memo } from "react";
import { IncomeDisplay } from "@/components/atoms/income-display";
import MoneyDisplay from "@/components/atoms/money-display";
import { GameStatsCard } from "@/components/molecules/game-stats-cards";

export const MoneyStatCard = memo(function MoneyStatCard({ money }) {
  return (
    <GameStatsCard eyebrow="Tresorerie">
      <MoneyDisplay money={money} />
    </GameStatsCard>
  );
});

export const IncomeStatCard = memo(function IncomeStatCard({
  incomePerSecond,
}) {
  return (
    <GameStatsCard eyebrow="Revenu passif">
      <IncomeDisplay incomePerSecond={incomePerSecond} />
    </GameStatsCard>
  );
});

export const UpgradesStatCard = memo(function UpgradesStatCard({
  totalOwnedUpgrades,
}) {
  return (
    <GameStatsCard eyebrow="Upgrades poses">{totalOwnedUpgrades}</GameStatsCard>
  );
});
