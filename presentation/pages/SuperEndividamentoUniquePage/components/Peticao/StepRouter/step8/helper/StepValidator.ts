import { isFieldEmpty } from "@/app/utils/validators"
import { FormField } from "./FormTypesAndFields"

export function isStep8FormInvalid(api_data: any): boolean {
    return (
        false
        // api_data['sugestao_plano_pagamento'] && isFieldEmpty(api_data[FormField.ACOES_JUDICIAIS_CLIENTE])
    )
}

export function isStep8MarkedAsError(api_data: any): boolean {
    return (
        false
        // !isFieldEmpty(api_data[FormField.ACOES_JUDICIAIS_CLIENTE])
    )
}