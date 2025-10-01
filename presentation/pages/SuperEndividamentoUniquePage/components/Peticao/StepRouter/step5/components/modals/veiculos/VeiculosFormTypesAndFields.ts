import { veiculo } from "@/app/types/veiculo";

export interface ErrorVeiculoModal {
    marca: boolean
    ano: boolean
    renavam: boolean
    valor: boolean
    placa: boolean
    cor: boolean
}

export enum FormField {
    MARCA = "marca",
    ANO = "ano",
    RENAVAM = "renavam",
    VALOR = "valor",
    PLACA = "placa",
    COR = "cor",
}

export type FormState = {
    [FormField.MARCA]: string;
    [FormField.ANO]: string;
    [FormField.RENAVAM]: string;
    [FormField.VALOR]: number;
    [FormField.PLACA]: string;
    [FormField.COR]: string;
};

export type Action =
    | { type: 'SET_FIELD'; field: keyof veiculo; value: string }
    | { type: 'SET_MONEY_FIELD'; field: keyof veiculo; value: number }
    | { type: 'RESET' };
