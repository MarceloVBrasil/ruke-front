import { formatCurrency } from "@/app/utils/Formater"

export const converterStringBoolean = (value: string) => {
  if (value === 'true') {
    return true
  }
  if (value === 'false') {
    return false
  }
  return false
}

export function converterMoneyToString(money: string) {
  if (!money) return ''
  return formatCurrency(money).toString()
}

export function convertNumberToBrlCurrency(value: number | string): string {
  const number = typeof value === 'string' ? parseFloat(value.replace(/[^\d]/g, '')) : value;
  console.log(number.toFixed(2))
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function convertBrlCurrencyToNumber(value: string): number {
  const numeric = value.replace(/[^\d]/g, '');
  return parseFloat(numeric) / 100;
}