function formatRemainingTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function RoundTimerCard({ onStart, remainingSeconds, status }) {
  const label =
    status === "playing"
      ? "Round en cours"
      : status === "finished"
        ? "Round termine"
        : "Round pret";

  return (
    <div className="rounded-xl border border-border bg-card px-4 py-4 shadow-lg shadow-primary/8 sm:px-5">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-[2rem] leading-none font-bold text-foreground">
          {formatRemainingTime(remainingSeconds)}
        </p>
        {status !== "playing" && (
          <button className="btn-primary" onClick={onStart} type="button">
            Start
          </button>
        )}
      </div>
    </div>
  );
}
