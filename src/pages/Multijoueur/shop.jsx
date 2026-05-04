import { Upgrade } from "@/components/atoms/upgrade";
import {
  defensiveUpgrades,
  multiplayerUpgrades,
  strategicActions,
} from "@/data/multiplayerShop";

function CategoryTitle({ title, description }) {
  return (
    <div className="mt-8 mb-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

const economyUpgrades = multiplayerUpgrades.map((upgrade) => ({
  ...upgrade,
  icon: upgrade.icon ?? "code",
  count: 0,
}));

const resilienceUpgrades = defensiveUpgrades.map((upgrade) => ({
  ...upgrade,
  icon: "shield",
  count: 0,
  incomePerSecondGain: upgrade.resiliencePerSecondGain,
}));

const actionUpgrades = strategicActions.map((action) => ({
  id: action.id,
  name: action.name,
  icon: "crosshair",
  baseCost: Number.parseFloat(action.cost) || 0,
  count: 0,
  incomePerSecondGain: 0,
  description: action.effect,
  costLabel: `Cout: ${action.cost}`,
  gainLabel: `Cooldown: ${action.cooldown}`,
}));

export default function MultiplayerShop() {
  return (
    <>
      <h1 className="text-3xl font-bold">Shop multijoueur</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        Meme affichage que le shop solo, mais avec les categories du mode
        multijoueur. Les malus et bonus sont geres par le serveur.
      </p>

      <CategoryTitle
        title="Upgrades economiques"
        description="Achats qui augmentent le revenu passif du joueur pendant le round."
      />
      <div className="flex flex-col gap-2">
        {economyUpgrades.map((upgrade) => (
          <Upgrade
            actualCost={upgrade.baseCost}
            buttonLabel="Serveur"
            canBuy
            key={upgrade.id}
            onClick={() => {}}
            showEfficiency={false}
            upgrade={upgrade}
          />
        ))}
      </div>

      <CategoryTitle
        title="Upgrades defensives"
        description="Achats qui produisent de la resilience pour mitiger automatiquement les malus."
      />
      <div className="flex flex-col gap-2">
        {resilienceUpgrades.map((upgrade) => (
          <Upgrade
            actualCost={upgrade.baseCost}
            buttonLabel="Serveur"
            canBuy
            gainLabel={`+${upgrade.resiliencePerSecondGain} resilience / sec`}
            key={upgrade.id}
            onClick={() => {}}
            showEfficiency={false}
            upgrade={upgrade}
          />
        ))}
      </div>

      <CategoryTitle
        title="Actions strategiques"
        description="Sabotage et shield seront envoyes au serveur sous forme d'intentions."
      />
      <div className="flex flex-col gap-2">
        {actionUpgrades.map((upgrade) => (
          <Upgrade
            actualCost={upgrade.baseCost}
            buttonLabel="Serveur"
            canBuy
            costLabel={upgrade.costLabel}
            gainLabel={upgrade.gainLabel}
            key={upgrade.id}
            onClick={() => {}}
            showCount={false}
            showEfficiency={false}
            upgrade={upgrade}
          />
        ))}
      </div>
    </>
  );
}
