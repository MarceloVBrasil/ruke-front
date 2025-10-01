export interface ErrorOutroBemModal {
    descricao: boolean
}

export enum FormField {
    DESCRICAO = 'descricao'
}

export type FormState = {
    descricao: string
};

export type Action =
    | { type: 'SET_FIELD'; field: keyof FormField; value: string }
    | { type: 'RESET' };