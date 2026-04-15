import { formatMoney } from "../../utils/formatNumber";

export default function MoneyDisplay({ money }) {
  return (
    <div className="flex items-end gap-2 text-foreground">
      <span className="text-balance text-[2.1rem] leading-none font-bold tracking-tight sm:text-[2.35rem]">
        {formatMoney(money)}
      </span>
      <span className="pb-1 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        $
      </span>
    </div>
  );
}
