import { advogado_assinante } from "@/app/types/advogados_assinantes"

export interface ErrorStep10 {
    valor_total_causa: boolean
    advogado: boolean
    oab_advogado: boolean
    local_peticao: boolean
    data_peticao: boolean
}

export enum FormField {
    VALOR_TOTAL_CAUSA = "valor_total_causa",
    ADVOGADO = "advogado",
    ASSINANTES = "assinantes",
    OAB_ADVOGADO = "oab_advogado",
    LOCAL_PETICAO = "local_peticao",
    DATA_PETICAO = "data_peticao",
}

export type FormState = {
    [FormField.VALOR_TOTAL_CAUSA]: { value: number, changed: boolean };
    [FormField.ADVOGADO]: { value: string, changed: boolean };
    [FormField.OAB_ADVOGADO]: { value: string, changed: boolean };
    [FormField.LOCAL_PETICAO]: { value: string, changed: boolean };
    [FormField.DATA_PETICAO]: { value: string, changed: boolean };
};

export type Action =
    | { type: 'SET_FIELD'; field: keyof FormState; value: string }
    | { type: 'SET_MONEY_FIELD'; field: FormField.VALOR_TOTAL_CAUSA; value: number }
    | { type: 'SET_ADD_ASSINANTE'; field: FormField.ASSINANTES; value: advogado_assinante }
    | { type: 'SET_EDIT_ASSINANTE'; field: FormField.ASSINANTES; value: advogado_assinante[] }
    | { type: 'SET_DELETE_ASSINANTE'; field: FormField.ASSINANTES; value: advogado_assinante[] }
    | { type: 'RESET' }
    | { type: 'SET_API_STATE'; payload: FormState };