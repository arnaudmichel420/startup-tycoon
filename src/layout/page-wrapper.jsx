import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import IncomeDisplay from "../components/atoms/income-display";
import MoneyDisplay from "../components/atoms/money-display";
import routes from "../router/routes";
import { useGameStore } from "../store/gameStore";
import { buildPrimaryStatCards } from "../utils/stat-cards";
import GameStatsCard from "../components/molecules/game-stats-cards";

const navLinkClassName = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold tracking-[0.18em] uppercase transition ${
    isActive
      ? "bg-primary text-primary-foreground shadow-sm"
      : "text-secondary-foreground/80 hover:bg-background/70 hover:text-foreground"
  }`;

export default function PageWrapper() {
  const TICK = useGameStore((state) => state.TICK);
  const money = useGameStore((state) => state.money);
  const incomePerSecond = useGameStore((state) => state.incomePerSecond);

  useEffect(() => {
    const interval = setInterval(() => {
      TICK();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [TICK]);

  const statCards = buildPrimaryStatCards({
    incomePerSecond,
    money,
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-secondary/35 text-foreground">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 pt-4">
          <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-card/85 shadow-lg backdrop-blur">
            <div className="flex flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Startup Tycoon
                </p>
                <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Build, automate, scale.
                </h1>
              </div>

              <nav className="flex flex-wrap gap-2">
                <NavLink className={navLinkClassName} to={routes.game}>
                  Game
                </NavLink>
                <NavLink className={navLinkClassName} to={routes.shop}>
                  Shop
                </NavLink>
                <NavLink className={navLinkClassName} to={routes.stats}>
                  Stats
                </NavLink>
                <NavLink className={navLinkClassName} to={routes.settings}>
                  Settings
                </NavLink>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 py-8">
          <Outlet />
        </main>

        <footer className="pb-6">
          <div className="rounded-[2rem] border border-border/80 bg-card px-6 py-6 shadow-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Startup Tycoon 2026
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Un clicker chaleureux, ambitieux et taille pour passer d'une
                  idee fragile a une machine a cash bien huilee.
                </p>
              </div>
              <p className="text-sm font-semibold text-secondary-foreground">
                Cashflow, upgrades et croissance continue.
              </p>
            </div>
          </div>
        </footer>

        <div className="fixed right-4 bottom-4 z-30 grid gap-3 sm:right-6 sm:bottom-6">
          {statCards
            .filter((card) => card.id !== "upgrades")
            ?.map((card) => (
              <GameStatsCard key={card.id} eyebrow={card.eyebrow}>
                {card.content}
              </GameStatsCard>
            ))}
        </div>
      </div>
    </div>
  );
}
