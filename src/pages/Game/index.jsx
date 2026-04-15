import { useOutletContext } from "react-router-dom";
import ClickButton from "../../components/atoms/click-button";
import GameInsightCard from "../../components/molecules/game-insight-cards";
import GameStatsCard from "../../components/molecules/game-stats-cards";
import { buildPrimaryStatCards } from "../../utils/stat-cards";

export default function Game() {
  const { money, setMoney, clickValue, incomePerSecond, upgrades } =
    useOutletContext();

  const addMoney = () => setMoney((prev) => prev + clickValue);
  const totalOwnedUpgrades = upgrades.reduce(
    (total, upgrade) => total + upgrade.count,
    0,
  );

  const topUpgrade = () =>
    [...upgrades].sort((left, right) => right.count - left.count)[0];

  const statCards = buildPrimaryStatCards({
    incomePerSecond,
    money,
    totalOwnedUpgrades,
  });

  const insightCards = [
    {
      id: "momentum",
      eyebrow: "Momentum",
      title: "La croissance est enclenchee.",
      description:
        "Ton revenu automatique travaille deja pour toi pendant que tu prepares la prochaine vague d'ameliorations.",
    },
    {
      id: "focus",
      eyebrow: "Focus actuel",
      title:
        topUpgrade?.count > 0 ? topUpgrade.name : "Aucune upgrade dominante",
      description:
        topUpgrade?.count > 0
          ? `${topUpgrade.count} exemplaire(s) dominent deja ton economie.`
          : "Passe par le shop pour lancer ta premiere vraie machine a cash.",
    },
  ];

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-8 shadow-xl sm:px-8">
        <div className="absolute -right-12 top-16 h-36 w-36 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />

        <div className="relative flex flex-col gap-8">
          <div className="space-y-3">
            <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Control Room
            </span>
            <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Fais grandir ta startup clic apres clic.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Chaque clic finance ta prochaine phase de croissance. Plus ton
              revenu passif grimpe, plus ton empire prend de la vitesse.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {statCards.map((card) => (
              <GameStatsCard key={card.id} eyebrow={card.eyebrow}>
                {card.content}
              </GameStatsCard>
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-primary/15 bg-secondary/35 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Action principale
              </p>
              <p className="text-sm text-muted-foreground">
                Lance un nouveau sprint et gagne {clickValue}$ a chaque clic.
              </p>
            </div>
            <ClickButton clickValue={clickValue} onClick={addMoney} />
          </div>
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        {insightCards.map((card) => (
          <GameInsightCard
            key={card.id}
            description={card.description}
            eyebrow={card.eyebrow}
            title={card.title}
          />
        ))}
      </aside>
    </section>
  );
}
