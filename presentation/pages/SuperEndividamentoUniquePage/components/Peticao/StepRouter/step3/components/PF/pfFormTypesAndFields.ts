import { PF } from "@/app/types/pf";

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
    ESTADO_CIVIL = "estado_civil",
}

export type Action =
    | { type: 'SET_FIELD'; field: keyof PF; value: string }
    | { type: 'RESET' };