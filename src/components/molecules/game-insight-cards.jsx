const cardClassName =
  "rounded-[2rem] border border-border/90 bg-card px-6 py-6 shadow-xl shadow-primary/10 sm:px-7 sm:py-7";

export default function GameInsightCard({ eyebrow, title, description }) {
  return (
    <div className={cardClassName}>
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-4 max-w-lg text-base leading-8 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
