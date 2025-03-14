export function roundPercentage(value: number): string {
  const roundedValue = value * 100;
  return roundedValue.toFixed(2);
}

export function formatPrice(value: number): string {
  const formattedValue = value.toFixed(2);
  return formattedValue;
}
