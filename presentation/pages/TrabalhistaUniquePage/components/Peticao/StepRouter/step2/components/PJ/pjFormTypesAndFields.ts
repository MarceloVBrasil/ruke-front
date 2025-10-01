import { PJ_RECLAMADA } from "../../helper/FormTypesAndFields"
import { periodo_responsabilidade } from "../../helper/PeriodoResponsabilidade"

export interface ErrorPJModal {
    cnpj: boolean
    nome: boolean
    cep: boolean
    rua: boolean
    numero: boolean
    bairro: boolean
    cidade: boolean
    estado: boolean
    reclamada_principal: boolean
}

export enum FormField {
    CNPJ = "cnpj",
    NOME = "nome",
    CEP = "cep",
    ESTADO = "estado",
    CIDADE = "cidade",
    BAIRRO = "bairro",
    RUA = 'rua',
    NUMERO = "numero",
    COMPLEMENTO = "complemento",
    RECLAMADA_PRINCIPAL = 'principal',
    RAZAO_INCLUSAO_POLO_PASSIVO = "razao_inclusao_polo_passivo"
}

export type Action =
    | { type: 'SET_FIELD'; field: keyof PJ_RECLAMADA; value: string }
    | { type: 'SET_RECLAMADA_PRINCIPAL_FIELD'; field: FormField.RECLAMADA_PRINCIPAL; value: boolean }
    | { type: 'SET_RESPONSAVEL_SUBSIDIARIO_FIELD'; field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO; value: boolean }
    | { type: 'SET_PERIODO_RESPONSABILIDADE_FIELD'; field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO; value: periodo_responsabilidade }
    | { type: 'SET_RESPONSAVEL_SOLIDARIO_FIELD'; field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO; value: boolean }
    | { type: 'SET_SUCESSAO_EMPRESARIAL_FIELD'; field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO; value: boolean }
    | { type: 'RESET' };