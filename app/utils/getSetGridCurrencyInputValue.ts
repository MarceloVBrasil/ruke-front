import { formatCurrency } from "./Formater"

export function getGridCurrencyInputValue(ref: any, name: string) {
    const valor = ref.current?.querySelector(`#${name}-id`)?.getAttribute('value')?.slice(2)
    const valor_currency = valor ? formatCurrency(valor) : 0

    return valor_currency
}


export function setGridCurrencyInputValue(ref: any, name: string, value: number) {
    if (ref.current?.querySelector(`#${name}-id`)) ref.current.querySelector(`#${name}-id`).value = value
}