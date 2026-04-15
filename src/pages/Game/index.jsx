import { useState } from "react";
import GameHeader from "../../components/molecules/game-header";
import MoneyDisplay from "../../components/atoms/money-display";
import ClickButton from "../../components/atoms/click-button";

export default function Game() {
  const [money, setMoney] = useState(999999);
  const [clickValue, setClickValue] = useState(1);
  return (
    <div className="flex flex-col gap-2">
      <MoneyDisplay money={money} />
      <ClickButton
        clickValue={clickValue}
        onClick={() => setMoney((prev) => prev + clickValue)}
      />
      <p className="mt-3">Ici vous jouerez au clicker.</p>
    </div>
  );
}
