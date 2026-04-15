const cardClassName =
  "rounded-[1.35rem] border border-border/90 bg-card px-4 py-4 shadow-lg shadow-primary/8 sm:px-5 flex flex-col justify-between";

export default function GameStatsCard({ eyebrow, children }) {
  return (
    <div className={cardClassName}>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        {eyebrow}
      </p>
      <div className="mt-3 text-[2rem] leading-none font-bold text-foreground">
        {children}
      </div>
    </div>
  );
}
