import {
  BriefcaseIcon,
  BuildingsIcon,
  CodeIcon,
  GearIcon,
  MegaphoneIcon,
  StudentIcon,
} from "@phosphor-icons/react";
import { memo } from "react";

const icons = {
  student: StudentIcon,
  briefcase: BriefcaseIcon,
  code: CodeIcon,
  megaphone: MegaphoneIcon,
  gear: GearIcon,
  buildings: BuildingsIcon,
};

export const Upgrade = memo(function Upgrade({
  upgrade,
  canBuy,
  onClick,
  actualCost,
}) {
  const Icon = icons[upgrade.icon] ?? BriefcaseIcon;

  return (
    <div className="group flex items-center justify-between gap-5 rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 shadow-xs">
          <Icon className="h-7 w-7 text-primary" weight="duotone" />
        </div>

        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold tracking-tight">{upgrade.name}</h3>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
              x{upgrade.count}
            </span>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {upgrade.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-sm font-medium">
            <span className="rounded-md bg-background px-2 py-1 text-foreground">
              Cout: {actualCost} $
            </span>
            <span className="rounded-md bg-accent px-2 py-1 text-accent-foreground">
              +{upgrade.incomePerSecondGain} / sec
            </span>
            <span className="rounded-md px-2 py-1 text-accent-foreground">
              {parseFloat(actualCost / upgrade.incomePerSecondGain).toFixed(1)}{" "}
              / click
            </span>
          </div>
        </div>
      </div>

      <button
        disabled={canBuy}
        onClick={() => onClick(upgrade.id)}
        className="btn-primary shrink-0"
      >
        Acheter
      </button>
    </div>
  );
});
