import { isFieldEmpty } from "@/app/utils/validators"
import { FormField } from "./FormTypesAndFields"

export function isStep2FormInvalid(api_data: any): boolean {
    return (
        isFieldEmpty(api_data[FormField.ACAO_AJUIZADA_EM])
        || isFieldEmpty(api_data[FormField.CIDADE_ACAO])
        || isFieldEmpty(api_data[FormField.ESTADO_ACAO])
    )
}

export function isStep2MarkedAsError(api_data: any): boolean {
    return (
        !isFieldEmpty(api_data[FormField.ACAO_AJUIZADA_EM])
        || !isFieldEmpty(api_data[FormField.CIDADE_ACAO])
        || !isFieldEmpty(api_data[FormField.ESTADO_ACAO])
    )
}