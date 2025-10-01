import { acao_judicial } from "@/app/types/acao_judicial";

export interface ErrorStep8 {
    acoes_judiciais_cliente: boolean
}

export enum FormField {
    ACOES_JUDICIAIS_CLIENTE = "acoes_judiciais_cliente"
}

export type FormState = {
    [FormField.ACOES_JUDICIAIS_CLIENTE]: { value: acao_judicial[], changed: boolean }
}

export type Action =
    | { type: 'ADD'; field: FormField.ACOES_JUDICIAIS_CLIENTE; value: acao_judicial }
    | { type: 'EDIT'; field: FormField.ACOES_JUDICIAIS_CLIENTE; value: acao_judicial[] }
    | { type: 'DELETE'; field: FormField.ACOES_JUDICIAIS_CLIENTE; value: acao_judicial[] }
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'RESET' };
