import { imovel } from "@/app/types/imovel";

export interface ErrorImovelModal {
    cep: boolean
    estado: boolean
    cidade: boolean
    bairro: boolean
    rua: boolean
    complemento: boolean
    numero: boolean
    valor: boolean
}

export enum FormField {
    CEP = "cep",
    ESTADO = "estado",
    CIDADE = "cidade",
    BAIRRO = 'bairro',
    RUA = "rua",
    COMPLEMENTO = 'complemento',
    NUMERO = "numero",
    VALOR = "valor",
}

export type FormState = {
    [FormField.CEP]: string;
    [FormField.ESTADO]: string
    [FormField.CIDADE]: string;
    [FormField.BAIRRO]: string
    [FormField.RUA]: string;
    [FormField.NUMERO]: number;
    [FormField.COMPLEMENTO]: string
    [FormField.VALOR]: number;
};

export type Action =
    | { type: 'SET_FIELD'; field: keyof imovel; value: string | number }
    | { type: 'SET_MONEY_FIELD'; field: keyof imovel; value: number }
    | { type: 'RESET' };
