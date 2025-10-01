export enum FormField {
    DOCUMENTOS_FALTANDO = "documentos_faltando"
}

export type documentos_faltando = { credor: string, documento_faltando: string }

export type FormState = {
    [FormField.DOCUMENTOS_FALTANDO]: { value: documentos_faltando[], changed: boolean };
};

export type Action =
    | { type: 'ADD'; field: FormField.DOCUMENTOS_FALTANDO; value: documentos_faltando }
    | { type: 'EDIT'; field: FormField.DOCUMENTOS_FALTANDO; value: documentos_faltando[] }
    | { type: 'DELETE'; field: FormField.DOCUMENTOS_FALTANDO; value: documentos_faltando[] }
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'RESET' };