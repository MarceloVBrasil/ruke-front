import { isFieldEmpty, isNegative, isPositive, isStringNumberNegative } from "@/app/utils/validators"
import { DADOS_CONTRATO, FormField } from "./FormTypesAndFields"

export function isStep4FormInvalid(api_data: any): boolean {
    const contrato_ativo = api_data[FormField.CONTRATO_ATIVO]

    return (
        false
        || isFieldEmpty(api_data[FormField.DATA_INICIO_CONTRATO])
        || !contrato_ativo && isFieldEmpty(api_data[FormField.DATA_FIM_CONTRATO])
        || isFieldEmpty(api_data[FormField.REMUNERACAO])
        || !isPositive(api_data[FormField.REMUNERACAO])
        || isFieldEmpty(api_data[FormField.CARGO])
        || isFieldEmpty(api_data[FormField.DADOS_CONTRATO][DADOS_CONTRATO.MOTIVO_ENCERRAMENTO])
        || isFieldEmpty(api_data[FormField.DADOS_CONTRATO][DADOS_CONTRATO.CARTEIRA_DE_TRABALHO_ANOTADA])
        || isFieldEmpty(api_data[FormField.DADOS_CONTRATO][DADOS_CONTRATO.VERBAS_RESCISORIAS])
    )
}

export function isStep4MarkedAsError(api_data: any): boolean {
    const contrato_ativo = api_data[FormField.CONTRATO_ATIVO]

    return (
        false
        || !isFieldEmpty(api_data[FormField.DATA_INICIO_CONTRATO])
        || !contrato_ativo && !isFieldEmpty(api_data[FormField.DATA_FIM_CONTRATO])
        || !isFieldEmpty(api_data[FormField.REMUNERACAO])
        || !isFieldEmpty(api_data[FormField.CARGO])
        || !isFieldEmpty(api_data[FormField.DADOS_CONTRATO][DADOS_CONTRATO.MOTIVO_ENCERRAMENTO])
        || !isFieldEmpty(api_data[FormField.DADOS_CONTRATO][DADOS_CONTRATO.CARTEIRA_DE_TRABALHO_ANOTADA])
        || !isFieldEmpty(api_data[FormField.DADOS_CONTRATO][DADOS_CONTRATO.VERBAS_RESCISORIAS])
    )
}