import routes from "@/router/routes";
import { getToken } from "@clerk/react";
import {
  ChartLineUpIcon,
  GlobeHemisphereWestIcon,
  LightningIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { UserIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const modeCards = [
  {
    id: "solo",
    title: "Partie solo",
    description:
      "Continue ta startup en local, sans serveur, avec sauvegarde navigateur et progression infinie.",
    to: routes.solo,
    action: "Jouer en solo",
    Icon: LightningIcon,
    SecondIcon: UserIcon,
  },
  {
    id: "multi",
    title: "Partie multijoueur",
    description:
      "Rejoins les rounds competitifs, prepare tes upgrades, gere la resilience et vise le leaderboard.",
    to: routes.multijoueur,
    action: "Rejoindre le multi",
    Icon: GlobeHemisphereWestIcon,
    SecondIcon: UsersThreeIcon,
  },
];
async function toto() {
  const token = await getToken();
  console.log(token);
}
export default function Accueil() {
  useEffect(() => {
    toto();
  }, []);
  return (
    <main className="min-h-screen bg-linear-to-b from-background via-background to-secondary/35 px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center gap-8">
        <section className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-primary">
            Startup Tycoon
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Choisis ton mode de jeu
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Le solo garde les regles locales historiques. Le multijoueur prepare
            les rounds synchronises avec bonus, malus, sabotage et leaderboard.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {modeCards.map((mode) => (
            <Link
              className="flex min-h-72 flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-lg"
              key={mode.id}
              to={mode.to}
            >
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <mode.Icon
                    className="h-8 w-8 text-primary"
                    weight="duotone"
                  />
                </div>
                <h2 className="mt-6 text-2xl font-bold">{mode.title}</h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                  {mode.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <span className="btn-primary">{mode.action}</span>
                <mode.SecondIcon
                  className="h-8 w-8 text-primary"
                  weight="duotone"
                />
              </div>
            </Link>
          ))}
        </section>

        <div className="flex justify-center">
          <Link
            className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold uppercase text-secondary-foreground shadow-sm transition hover:bg-background hover:text-foreground"
            to={routes.leaderboard}
          >
            <ChartLineUpIcon
              className="h-5 w-5 text-primary"
              weight="duotone"
            />
            Voir le leaderboard
          </Link>
        </div>
      </div>
    </main>
  );
}
