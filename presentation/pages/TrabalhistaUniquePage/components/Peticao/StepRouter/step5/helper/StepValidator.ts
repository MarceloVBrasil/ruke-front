import { isFieldEmpty } from "@/app/utils/validators"
import { FormField } from "./FormTypesAndFields"

export function isStep5FormInvalid(api_data: any, pedidos?: string[]): boolean {
    return (
        isFieldEmpty(api_data[FormField.BLOCOS_PEDIDOS_EXISTENTES])
        && isFieldEmpty(pedidos as string[])
    )
}

export function isStep5MarkedAsError(api_data: any): boolean {
    return (
        !isFieldEmpty(api_data[FormField.BLOCOS_PEDIDOS_EXISTENTES])
    )
}