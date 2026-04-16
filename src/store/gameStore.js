import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import defaultUpgrades from "../data/upgrades";

export const useGameStore = create(
  persist(
    (set) => ({
      money: 0,
      clickValue: 1,
      incomePerSecond: 0,
      upgrades: defaultUpgrades,
      totalClicks: 0,
      totalEarned: 0,
      CLICK: () =>
        set((state) => ({
          money: state.money + state.clickValue,
          totalClicks: state.totalClicks + 1,
        })),
      TICK: () =>
        set((state) => ({
          money: state.money + state.incomePerSecond,
          totalEarned: state.money + state.incomePerSecond,
        })),
      BUY_UPGRADE: (id) => {
        set((state) => {
          const currentUpgrade = state.upgrades.find(
            (upgrade) => upgrade.id === id,
          );
          if (!currentUpgrade) return;

          const currentUpgradeCost =
            currentUpgrade.baseCost * Math.pow(1.15, currentUpgrade.count);

          if (state.money <= currentUpgradeCost) return;

          return {
            money: state.money - currentUpgradeCost,
            incomePerSecond:
              state.incomePerSecond + currentUpgrade.incomePerSecondGain,
            upgrades: state.upgrades.map((upgrade) =>
              upgrade.id === id
                ? { ...upgrade, count: upgrade.count + 1 }
                : upgrade,
            ),
          };
        });
      },
      RESET_GAME: () =>
        set(() => ({
          money: 0,
          clickValue: 1,
          incomePerSecond: 0,
          upgrades: defaultUpgrades,
          totalClicks: 0,
          totalEarned: 0,
        })),
    }),
    {
      name: "startup-tycoon-store",
      version: 1,
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const value = localStorage.getItem(name);

          if (!value) return null;

          try {
            const parsedValue = JSON.parse(value);

            if (parsedValue.version !== 1) return null;
            if (typeof parsedValue.state?.money !== "number") return null;

            return value;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          const parsedValue = JSON.parse(value);

          const newValue = {
            saveAt: Date.now(),
            ...parsedValue,
          };
          localStorage.setItem(name, JSON.stringify(newValue));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      })),
    },
  ),
);
