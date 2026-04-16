import { IncomeDisplay } from "../atoms/income-display";
import MoneyDisplay from "../atoms/money-display";

export default function GameHeader({ money }) {
  return (
    <header className="mb-8 flex items-center justify-between gap-4 rounded-lg border bg-card px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-3xl font-bold">Startup Tycoon</h1>
        <IncomeDisplay />
      </div>
      <div className="text-lg font-semibold">
        <MoneyDisplay money={money} />
      </div>
    </header>
  );
}
