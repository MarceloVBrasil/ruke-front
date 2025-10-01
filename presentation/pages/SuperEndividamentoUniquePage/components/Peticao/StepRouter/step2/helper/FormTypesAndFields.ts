export enum FormField {
    ACAO_AJUIZADA_EM = "acao_ajuizada_em",
    CIDADE_ACAO = "cidade_acao",
    ESTADO_ACAO = "estado_acao",
}

export type FormState = {
    [FormField.ACAO_AJUIZADA_EM]: { value: string, changed: boolean };
    [FormField.CIDADE_ACAO]: { value: string, changed: boolean };
    [FormField.ESTADO_ACAO]: { value: string, changed: boolean };
};

export type Action =
    | { type: 'SET_FIELD'; field: keyof FormState; value: string }
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'RESET' };