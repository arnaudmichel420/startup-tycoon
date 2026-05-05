import { formatMoney } from "@/utils/formatNumber";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function LeaderboardScoreCard({ rank, score }) {
  const achievedAt = score.achievedAt ?? score.createdAt;

  return (
    <article className="grid gap-4 rounded-xl border border-border bg-card p-5 shadow-sm md:grid-cols-[auto_1fr_auto] md:items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-lg font-bold text-primary">
        #{rank}
      </div>

      <div>
        <h2 className="text-xl font-bold">{score.displayName}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {dateFormatter.format(new Date(achievedAt))}
        </p>
      </div>

      <div className="grid gap-3 text-sm sm:grid-cols-4 md:min-w-[32rem]">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Score
          </p>
          <p className="mt-1 font-bold">{formatMoney(score.score)} $</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Duree
          </p>
          <p className="mt-1 font-bold">{formatDuration(score.duration)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Clics
          </p>
          <p className="mt-1 font-bold">{score.clicks}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">
            Upgrades
          </p>
          <p className="mt-1 font-bold">{score.upgrades}</p>
        </div>
      </div>
    </article>
  );
}
