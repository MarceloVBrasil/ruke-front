import { PJ } from "@/app/types/pj";

export interface ErrorPJModal {
    cnpj: boolean
    nome: boolean
    cep: boolean
    rua: boolean
    numero: boolean
    bairro: boolean
    cidade: boolean
    estado: boolean
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
    COMPLEMENTO = "complemento"
}

export type Action =
    | { type: 'SET_FIELD'; field: keyof PJ; value: string }
    | { type: 'RESET' };