import { useMemo, useState } from "react";
import { SearchInput } from "../../components/atoms/search-input";
import { Upgrade } from "../../components/atoms/upgrade";
import {
  IncomeStatCard,
  MoneyStatCard,
  UpgradesStatCard,
} from "../../components/molecules/primary-stat-cards";
import { useGameStore } from "../../store/gameStore";
import { useDebounce } from "@/hooks/use-debounce";

export default function Shop() {
  const money = useGameStore((state) => state.money);
  const incomePerSecond = useGameStore((state) => state.incomePerSecond);
  const upgrades = useGameStore((state) => state.upgrades);
  const BUY_UPGRADE = useGameStore((state) => state.BUY_UPGRADE);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 300);

  const totalOwnedUpgrades = upgrades.reduce(
    (total, upgrade) => total + upgrade.count,
    0,
  );

  const filteredUpgrades = useMemo(() => {
    const cleanedValue = debouncedValue.trim().toUpperCase();

    if (!cleanedValue) return upgrades;

    return upgrades.filter((filteredUpgrade) =>
      filteredUpgrade.name.trim().toUpperCase().includes(cleanedValue),
    );
  }, [debouncedValue, upgrades]);

  return (
    <>
      <h1 className="text-3xl font-bold">Shop</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <MoneyStatCard money={money} />
        <IncomeStatCard incomePerSecond={incomePerSecond} />
        <UpgradesStatCard totalOwnedUpgrades={totalOwnedUpgrades} />
      </div>
      <SearchInput
        className="mt-5 max-w-md"
        id="shop-search"
        label="Recherche rapide"
        placeholder="Chercher une upgrade"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex flex-col gap-2 mt-4">
        {filteredUpgrades?.length > 0
          ? filteredUpgrades.map((upgrade) => {
              const actualCost = Math.round(
                upgrade.baseCost * Math.pow(1.15, upgrade.count),
              );
              const canBuy = money <= actualCost;
              return (
                <Upgrade
                  key={upgrade.id}
                  upgrade={upgrade}
                  onClick={BUY_UPGRADE}
                  canBuy={canBuy}
                  actualCost={actualCost}
                />
              );
            })
          : "Aucun résultat"}
      </div>
    </>
  );
}
