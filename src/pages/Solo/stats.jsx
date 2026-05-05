import { LeaderboardScoreCard } from "@/components/molecules/leaderboard-score-card";
import { QueryGuard } from "@/components/molecules/query-guard";
import useMyGames from "@/hooks/use-my-games";

export default function Stats() {
  const { data, error, isLoading } = useMyGames();
  const games = data?.games ?? [];

  return (
    <section>
      <div>
        <p className="text-sm font-semibold uppercase text-primary">
          Historique personnel
        </p>
        <h1 className="mt-2 text-3xl font-bold">Stats</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Tes parties sauvegardees cote serveur, accessibles uniquement une fois
          connecte.
        </p>
      </div>

      <div className="mt-6">
        <QueryGuard error={error} isLoading={isLoading}>
          {games.length > 0 ? (
            <div className="grid gap-5">
              <div className="grid gap-3">
                {games.map((game, index) => (
                  <LeaderboardScoreCard
                    key={game.id}
                    rank={index + 1}
                    score={game}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 text-muted-foreground">
              Aucune partie sauvegardee pour le moment.
            </div>
          )}
        </QueryGuard>
      </div>
    </section>
  );
}
