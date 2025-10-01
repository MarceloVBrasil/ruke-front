import { isFieldEmpty } from "@/app/utils/validators"
import { FormField } from "./FormTypesAndFields"

export function isStep7FormInvalid(api_data: any): boolean {
    return (
        isFieldEmpty(api_data[FormField.GASTOS_EXISTENCIAIS])
    )
}

export function isStep7MarkedAsError(api_data: any): boolean {
    return (
        !isFieldEmpty(api_data[FormField.GASTOS_EXISTENCIAIS])
    )
}