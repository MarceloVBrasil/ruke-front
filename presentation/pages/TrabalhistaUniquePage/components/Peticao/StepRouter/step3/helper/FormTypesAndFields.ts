export enum FormField {
    CIDADE_ACAO = "cidade_acao",
    ESTADO_ACAO = "estado_acao",
    LOCAL_SELECIONADO = "local_selecionado",
    LOCAL_SELECIONADO_CORRESPONDE = "local_selecionado_corresponde"
}

export type FormState = {
    [FormField.CIDADE_ACAO]: { value: string, changed: boolean };
    [FormField.ESTADO_ACAO]: { value: string, changed: boolean };
    [FormField.LOCAL_SELECIONADO_CORRESPONDE]: { value: boolean, changed: boolean };
    [FormField.LOCAL_SELECIONADO]: { value: string, changed: boolean };
};

export type Action =
    | { type: 'SET_FIELD'; field: keyof FormState; value: string }
    | { type: 'SET_BOOLEAN_FIELD'; field: keyof FormState; value: boolean }
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'RESET' };