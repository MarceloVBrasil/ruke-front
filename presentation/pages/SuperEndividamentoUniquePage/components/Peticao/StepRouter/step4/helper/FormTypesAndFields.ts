import { FonteRenda } from "@/app/types/fontes_de_renda";
import { Checkbox } from "@/app/types/checkbox"

export type FonteRendaCheckbox = FonteRenda & Checkbox & { id: string }

export interface ErrorStep4 {
    fontes_renda_cliente: boolean
    familiares_cliente: boolean
}

export enum FormField {
    FONTES_DE_RENDA_CLIENTE = "fontes_de_renda_cliente",
    FAMILIARES_CLIENTE = "familiares_cliente",
}

export type FormState = {
    [FormField.FONTES_DE_RENDA_CLIENTE]: { value: FonteRendaCheckbox[], changed: boolean };
    [FormField.FAMILIARES_CLIENTE]: { value: FonteRendaCheckbox[], changed: boolean };
};

export type Action =
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'CHECKBOX_TOOGLE'; field: keyof FormState, value: FonteRendaCheckbox }
    | { type: 'NAO_POSSUI_FAMILIAR_CHECKBOX_TOOGLE'; field: keyof Omit<FormState, FormField.FONTES_DE_RENDA_CLIENTE>, value: boolean }
    | { type: 'OUTRA_FONTE_RENDA_DESCRICAO_CHANGE'; field: FormField.FONTES_DE_RENDA_CLIENTE, value: FonteRendaCheckbox }
    | { type: 'MONEY_VALUE_CHANGE'; field: keyof FormState, value: FonteRendaCheckbox }
    | { type: 'RESET' };