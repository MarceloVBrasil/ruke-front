import { isFieldEmpty } from "@/app/utils/validators"
import { FormField } from "./FormTypesAndFields"

export function isStep6FormInvalid(api_data: any): boolean {
    return (
        isFieldEmpty(api_data[FormField.DIVIDAS_CONSUMO])
    )
}

export function isStep6MarkedAsError(api_data: any): boolean {
    return (
        !isFieldEmpty(api_data[FormField.DIVIDAS_CONSUMO])
    )
}