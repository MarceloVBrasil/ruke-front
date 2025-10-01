import { isFieldEmpty } from "@/app/utils/validators"
import { FormField } from "./FormTypesAndFields"

export function isStep3FormInvalid(api_data: any): boolean {

    return (
        isFieldEmpty(api_data[FormField.LOCAL_SELECIONADO_CORRESPONDE])
        || isFieldEmpty(api_data[FormField.CIDADE_ACAO])
        || isFieldEmpty(api_data[FormField.ESTADO_ACAO])
    )
}

export function isStep3MarkedAsError(api_data: any): boolean {
    return (
        !isFieldEmpty(api_data[FormField.LOCAL_SELECIONADO_CORRESPONDE])
        || !isFieldEmpty(api_data[FormField.LOCAL_SELECIONADO])
        || !isFieldEmpty(api_data[FormField.CIDADE_ACAO])
        || !isFieldEmpty(api_data[FormField.ESTADO_ACAO])
    )
}