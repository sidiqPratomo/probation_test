export const ServiceFormatNumberDecimal = (number: number, decimal?: number): number => {
  return parseFloat(number.toFixed(decimal))
}
