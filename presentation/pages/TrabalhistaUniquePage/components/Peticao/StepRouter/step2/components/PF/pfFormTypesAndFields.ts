import { PF_RECLAMADA } from "../../helper/FormTypesAndFields"
import { periodo_responsabilidade } from "../../helper/PeriodoResponsabilidade"

export interface ErrorPFModal {
    cpf: boolean
    nome: boolean
    cep: boolean
    rua: boolean
    numero: boolean
    bairro: boolean
    cidade: boolean
    estado: boolean
    estado_civil: boolean
    rg: boolean
    email: boolean
    reclamada_principal: boolean
}


export enum FormField {
    CPF = "cpf",
    NOME = "nome",
    CEP = "cep",
    ESTADO = "estado",
    CIDADE = "cidade",
    BAIRRO = "bairro",
    RUA = 'rua',
    NUMERO = "numero",
    COMPLEMENTO = "complemento",
    RG = "rg",
    EMAIL = "email",
    RECLAMADA_PRINCIPAL = "principal",
    ESTADO_CIVIL = "estado_civil",
    RAZAO_INCLUSAO_POLO_PASSIVO = "razao_inclusao_polo_passivo"
}

export type Action =
    | { type: 'SET_FIELD'; field: keyof PF_RECLAMADA; value: string }
    | { type: 'SET_RECLAMADA_PRINCIPAL_FIELD'; field: FormField.RECLAMADA_PRINCIPAL; value: boolean }
    | { type: 'SET_RESPONSAVEL_SUBSIDIARIO_FIELD'; field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO; value: boolean }
    | { type: 'SET_PERIODO_RESPONSABILIDADE_FIELD'; field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO; value: periodo_responsabilidade }
    | { type: 'SET_RESPONSAVEL_SOLIDARIO_FIELD'; field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO; value: boolean }
    | { type: 'SET_SUCESSAO_EMPRESARIAL_FIELD'; field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO; value: boolean }
    | { type: 'RESET' };