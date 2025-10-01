import { isFieldEmpty } from "@/app/utils/validators"
import { FormField } from "./FormTypesAndFields"

export function isStep5FormInvalid(api_data: any): boolean {
    return (
        isFieldEmpty(api_data[FormField.RAZOES_ENDIVIDAMENTO])
    )
}

export function isStep5MarkedAsError(api_data: any): boolean {
    return (
        !isFieldEmpty(api_data[FormField.RAZOES_ENDIVIDAMENTO])
    )
}