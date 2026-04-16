export function formatMoney(money) {
  if (money > 999999999999999)
    return `${Number.parseFloat(money / 1000000000000000).toFixed(2)} T`;
  if (money > 999999999)
    return `${Number.parseFloat(money / 1000000000).toFixed(2)} B`;
  if (money > 999999)
    return `${Number.parseFloat(money / 1000000).toFixed(2)} M`;
  if (money > 999) return `${Number.parseFloat(money / 1000).toFixed(2)} K`;
  return Number.parseFloat(money).toFixed(2);
}
