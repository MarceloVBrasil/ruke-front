import { imovel } from "@/app/types/imovel";
import { veiculo } from "@/app/types/veiculo";

export interface ErrorsStep5 {
    razoes_endividamento: boolean
}

export type outro_bem = string

export enum RAZOES_ENDIVIDAMENTO {
    REDUCAO_RENDA = "reducao_renda",
    FALTA_EDUCACAO_FINANCEIRA = "falta_educacao_financeira",
    CRISE_FINANCEIRA = "crise_financeira",
    DESEMPREGO = "desemprego",
    MORTE_DE_FAMILIAR_QUE_GARANTIA_O_SUSTENTO = "morte_familiar",
    CRISE_DE_SAUDE = "crise_saude",
    OUTROS = "outros"
}

export enum FormField {
    VEICULOS = "veiculos_cliente",
    IMOVEIS = "imoveis_cliente",
    OUTROS_BENS = "outros_bens_cliente",
    RAZOES_ENDIVIDAMENTO = "razoes_endividamento",
}

export type FormState = {
    [FormField.VEICULOS]: { value: veiculo[], changed: boolean };
    [FormField.IMOVEIS]: { value: imovel[], changed: boolean };
    [FormField.OUTROS_BENS]: { value: outro_bem[], changed: boolean };
    [FormField.RAZOES_ENDIVIDAMENTO]: { value: string[], changed: boolean };
};

export type Action =
    | { type: 'ADD'; field: keyof FormState; value: veiculo | imovel | outro_bem }
    | { type: 'EDIT'; field: keyof Omit<FormState, FormField.RAZOES_ENDIVIDAMENTO>; value: veiculo[] | imovel[] | outro_bem[] }
    | { type: 'DELETE'; field: keyof Omit<FormState, FormField.RAZOES_ENDIVIDAMENTO>; value: veiculo[] | imovel[] | outro_bem[] }
    | { type: 'RAZOES_ENDIVIDAMENTO_CHECKBOX_TOGGLE', field: FormField.RAZOES_ENDIVIDAMENTO, value: string }
    | { type: 'OUTRAS_RAZOES_ENDIVIDAMENTO_TYPE_CHANGE', field: FormField.RAZOES_ENDIVIDAMENTO, value: string }
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'RESET' };
