import { isFieldEmpty, isPositive } from "@/app/utils/validators"
import { FormField } from "./FormTypesAndFields"

export function isStep10FormInvalid(api_data: any): boolean {
    return (
        isFieldEmpty(api_data[FormField.VALOR_TOTAL_CAUSA])
        || !isPositive(api_data[FormField.VALOR_TOTAL_CAUSA])
        || isFieldEmpty(api_data[FormField.ADVOGADO])
        // || isFieldEmpty(api_data[FormField.ASSINANTES])
        || isFieldEmpty(api_data[FormField.LOCAL_PETICAO])
        || isFieldEmpty(api_data[FormField.DATA_PETICAO])
    )
}

export function isStep10MarkedAsError(api_data: any): boolean {
    return (
        !isFieldEmpty(api_data[FormField.VALOR_TOTAL_CAUSA])
        || !isFieldEmpty(api_data[FormField.VALOR_TOTAL_CAUSA])
        || !isFieldEmpty(api_data[FormField.ADVOGADO])
        // || !isFieldEmpty(api_data[FormField.ASSINANTES])
        || !isFieldEmpty(api_data[FormField.LOCAL_PETICAO])
        || !isFieldEmpty(api_data[FormField.DATA_PETICAO])
        || !isFieldEmpty(api_data[FormField.DATA_PETICAO])
    )
}