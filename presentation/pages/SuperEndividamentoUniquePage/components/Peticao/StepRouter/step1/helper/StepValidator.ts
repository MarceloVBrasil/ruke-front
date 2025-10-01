import { isFieldEmpty, isStringNumberNegative, isCepValid, isCpfValid, isEmailValid } from "@/app/utils/validators"
import { FormField } from "./FormTypesAndFields"

export function isStep1FormInvalid(api_data: any): boolean {
    return (
        isFieldEmpty(api_data[FormField.BAIRRO_CLIENTE])
        || isFieldEmpty(api_data[FormField.CIDADE_CLIENTE])
        || isFieldEmpty(api_data[FormField.DATA_NASCIMENTO_CLIENTE])
        || isFieldEmpty(api_data[FormField.ESTADO])
        || isFieldEmpty(api_data[FormField.ESTADO_CIVIL_CLIENTE])
        || isFieldEmpty(api_data[FormField.NOME_CLIENTE])
        || isFieldEmpty(api_data[FormField.NUMERO_CLIENTE])
        || isStringNumberNegative(api_data[FormField.NUMERO_CLIENTE])
        || isFieldEmpty(api_data[FormField.PROFISSAO_CLIENTE])
        || isFieldEmpty(api_data[FormField.RUA_CLIENTE])
        || !isCepValid(api_data[FormField.CEP_CLIENTE])
        || !isCpfValid(api_data[FormField.CPF_CLIENTE])
        || !isEmailValid(api_data[FormField.EMAIL_CLIENTE])
        || isFieldEmpty(api_data[FormField.RG_CLIENTE])
    )
}

export function isStep1MarkedAsError(api_data: any): boolean {
    return (
        !isFieldEmpty(api_data[FormField.BAIRRO_CLIENTE])
        || !isFieldEmpty(api_data[FormField.CIDADE_CLIENTE])
        || !isFieldEmpty(api_data[FormField.DATA_NASCIMENTO_CLIENTE])
        || !isFieldEmpty(api_data[FormField.ESTADO])
        || !isFieldEmpty(api_data[FormField.ESTADO_CIVIL_CLIENTE])
        || !isFieldEmpty(api_data[FormField.NOME_CLIENTE])
        || !isFieldEmpty(api_data[FormField.NUMERO_CLIENTE]) && isStringNumberNegative(api_data[FormField.NUMERO_CLIENTE])
        || !isFieldEmpty(api_data[FormField.PROFISSAO_CLIENTE])
        || !isFieldEmpty(api_data[FormField.RUA_CLIENTE])
        || !isFieldEmpty(api_data[FormField.CEP_CLIENTE]) && !isCepValid(api_data[FormField.CEP_CLIENTE])
        || !isFieldEmpty(api_data[FormField.CPF_CLIENTE]) && !isCpfValid(api_data[FormField.CPF_CLIENTE])
        || !isFieldEmpty(api_data[FormField.EMAIL_CLIENTE]) && !isEmailValid(api_data[FormField.EMAIL_CLIENTE])
        || !isFieldEmpty(api_data[FormField.RG_CLIENTE])
    )
}