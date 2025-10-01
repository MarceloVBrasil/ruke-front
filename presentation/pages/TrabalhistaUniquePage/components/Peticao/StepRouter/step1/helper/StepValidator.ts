import { isCepValid, isCpfValid, isFieldEmpty, isStringNumberNegative } from "@/app/utils/validators"
import { FormField } from "./FormTypesAndFields"

export function isStep1FormInvalid(api_data: any): boolean {
    return (
        false
        || isFieldEmpty(api_data[FormField.NOME_RECLAMANTE])
        || isFieldEmpty(api_data[FormField.NACIONALIDADE_RECLAMENTE])
        || !isCpfValid(api_data[FormField.CPF_RECLAMANTE])
        || isFieldEmpty(api_data[FormField.DATA_NASCIMENTO_RECLAMANTE])
        || isFieldEmpty(api_data[FormField.ESTADO_CIVIL_RECLAMANTE])
        || isFieldEmpty(api_data[FormField.PROFISSAO_RECLAMANTE])
        || !isCepValid(api_data[FormField.CEP_RECLAMANTE])
        || isFieldEmpty(api_data[FormField.RUA_RECLAMANTE])
        || isFieldEmpty(api_data[FormField.NUMERO_RECLAMANTE])
        || isStringNumberNegative(api_data[FormField.NUMERO_RECLAMANTE])
        || isFieldEmpty(api_data[FormField.BAIRRO_RECLAMANTE])
        || isFieldEmpty(api_data[FormField.CIDADE_RECLAMANTE])
        || isFieldEmpty(api_data[FormField.ESTADO])
    )
}

export function isStep1MarkedAsError(api_data: any): boolean {
    return (
        false
        || !isFieldEmpty(api_data[FormField.NOME_RECLAMANTE])
        || !isFieldEmpty(api_data[FormField.NACIONALIDADE_RECLAMENTE])
        || !isFieldEmpty(api_data[FormField.CPF_RECLAMANTE])
        || !isFieldEmpty(api_data[FormField.DATA_NASCIMENTO_RECLAMANTE])
        || !isFieldEmpty(api_data[FormField.ESTADO_CIVIL_RECLAMANTE])
        || !isFieldEmpty(api_data[FormField.PROFISSAO_RECLAMANTE])
        || !isFieldEmpty(api_data[FormField.CEP_RECLAMANTE])
        || !isFieldEmpty(api_data[FormField.RUA_RECLAMANTE])
        || !isFieldEmpty(api_data[FormField.NUMERO_RECLAMANTE])
        || !isFieldEmpty(api_data[FormField.BAIRRO_RECLAMANTE])
        || !isFieldEmpty(api_data[FormField.CIDADE_RECLAMANTE])
        || !isFieldEmpty(api_data[FormField.ESTADO])
        || !isFieldEmpty(api_data[FormField.DOENCA_RECLAMANTE])
    )
}