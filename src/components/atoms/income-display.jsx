import { memo } from "react";
import { formatMoney } from "../../utils/formatNumber";

export const IncomeDisplay = memo(
  function IncomeDisplay({ incomePerSecond }) {
    return (
      <div className="flex items-end gap-2 text-foreground">
        <span className="text-[1.55rem] leading-none font-bold tracking-tight sm:text-[1.8rem]">
          {formatMoney(incomePerSecond)}
        </span>
        <span className="pb-1 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          $ / sec
        </span>
      </div>
    );
  },
  (prev, next) =>
    formatMoney(prev.incomePerSecond) === formatMoney(next.incomePerSecond),
);
