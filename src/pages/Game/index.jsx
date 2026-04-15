import { useCallback, useEffect, useState } from "react";
import GameHeader from "../../components/molecules/game-header";
import MoneyDisplay from "../../components/atoms/money-display";
import ClickButton from "../../components/atoms/click-button";
import IncomeDisplay from "../../components/atoms/income-display";

export default function Game() {
  const [money, setMoney] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [incomePerSecond, setIncomePerSecond] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setMoney((prev) => prev + incomePerSecond);
    //   console.log("toto");
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [incomePerSecond]);

  const addMoney = useCallback(
    () => setMoney((prev) => prev + clickValue),
    [clickValue],
  );
  const addIncome = useCallback(
    () => setIncomePerSecond((prev) => prev + 1),
    [],
  );
  const resetIncome = useCallback(() => setIncomePerSecond(0), []);

  return (
    <div className="flex flex-col gap-2">
      <MoneyDisplay money={money} />
      <IncomeDisplay incomePerSecond={incomePerSecond} />
      <ClickButton clickValue={clickValue} onClick={addMoney} />
      <p className="mt-3">Ici vous jouerez au clicker.</p>
      <button className="btn-primary" onClick={addIncome}>
        +1 income/sec
      </button>
      <button className="btn-primary" onClick={resetIncome}>
        Reset income/sec
      </button>
    </div>
  );
}
