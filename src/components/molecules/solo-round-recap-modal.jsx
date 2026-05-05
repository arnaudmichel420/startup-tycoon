import { useSubmitGame } from "@/hooks/use-submit-game";
import { useSoloGameStore } from "@/store/soloGameStore";
import { formatMoney } from "@/utils/formatNumber";
import { useUser } from "@clerk/react";
import { useEffect, useMemo, useRef } from "react";

export function SoloRoundRecapModal({ open }) {
  const money = useSoloGameStore((state) => state.money);
  const totalClicks = useSoloGameStore((state) => state.totalClicks);
  const incomePerSecond = useSoloGameStore((state) => state.incomePerSecond);
  const upgrades = useSoloGameStore((state) => state.upgrades);
  const START_ROUND = useSoloGameStore((state) => state.START_ROUND);
  const totalOwnedUpgrades = upgrades.reduce(
    (total, upgrade) => total + upgrade.count,
    0,
  );

  const submitGame = useSubmitGame();
  const { user } = useUser();
  const hasSubmittedRef = useRef(false);
  const displayName = useMemo(
    () => user?.fullName || "Ma startup",
    [user?.fullName],
  );

  useEffect(() => {
    if (!open) {
      hasSubmittedRef.current = false;
      return;
    }

    if (hasSubmittedRef.current) {
      return;
    }

    hasSubmittedRef.current = true;
    submitGame.mutate({
      mode: "solo",
      score: Math.round(money),
      duration: 300,
      clicks: totalClicks,
      upgrades: totalOwnedUpgrades,
      displayName,
    });
  }, [displayName, money, open, submitGame, totalClicks, totalOwnedUpgrades]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl rounded-xl border border-border bg-card p-6 shadow-2xl">
        <p className="text-sm font-semibold uppercase text-primary">
          Round termine
        </p>
        <h1 className="mt-2 text-3xl font-bold">Recap de la partie</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Voici le score final de ton round solo de 5 minutes.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Score
            </p>
            <p className="mt-2 text-2xl font-bold">{formatMoney(money)} $</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Clics
            </p>
            <p className="mt-2 text-2xl font-bold">{totalClicks}</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Revenu/sec
            </p>
            <p className="mt-2 text-2xl font-bold">
              {formatMoney(incomePerSecond)} $
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Upgrades
            </p>
            <p className="mt-2 text-2xl font-bold">{totalOwnedUpgrades}</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-background p-4">
          {submitGame.isPending ? (
            <p className="text-sm font-semibold text-muted-foreground">
              Enregistrement du score...
            </p>
          ) : null}
          {submitGame.isError ? (
            <p className="text-sm font-semibold text-destructive">
              Impossible d'enregistrer le score : {submitGame.error.message}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            className="btn-primary"
            disabled={submitGame.isPending}
            onClick={START_ROUND}
            type="button"
          >
            Rejouer
          </button>
        </div>
      </div>
    </div>
  );
}
