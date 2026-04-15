import { formatMoney } from "../../utils/formatNumber";

export default function MoneyDisplay({ money }) {
  return <div> Money: {formatMoney(money)} $</div>;
}
