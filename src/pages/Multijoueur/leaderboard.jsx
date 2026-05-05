import { LeaderboardScoreCard } from "@/components/molecules/leaderboard-score-card";
import { QueryGuard } from "@/components/molecules/query-guard";
import useLeaderboard from "@/hooks/use-leaderboard";

export default function Leaderboard() {
  const { data, isLoading, error } = useLeaderboard();
  const scores = Array.isArray(data) ? data : data?.entries ?? [];
  const count = data?.count ?? scores.length;
  const limit = data?.limit ?? scores.length;

  return (
    <section>
      <div>
        <p className="text-sm font-semibold uppercase text-primary">
          Multijoueur
        </p>
        <h1 className="mt-2 text-3xl font-bold">Leaderboard</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Les meilleurs scores publics enregistres sur les rounds
          multijoueur.
        </p>
        <p className="mt-2 text-sm font-semibold text-muted-foreground">
          {count} score(s) affiches sur {limit}.
        </p>
      </div>

      <div className="mt-6">
        <QueryGuard error={error} isLoading={isLoading}>
          {scores.length > 0 ? (
            <div className="grid gap-3">
              {scores.map((score, index) => (
                <LeaderboardScoreCard
                  key={`${score.userId}-${score.achievedAt}`}
                  rank={index + 1}
                  score={score}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 text-muted-foreground">
              Aucun score pour le moment.
            </div>
          )}
        </QueryGuard>
      </div>
    </section>
  );
}
