export function formatMoney(money) {
  if (money > 999999)
    return `${Number.parseFloat(money / 1000000).toFixed(2)} M`;
  if (money > 999) return `${Number.parseFloat(money / 1000).toFixed(2)} K`;
  return money;
}
