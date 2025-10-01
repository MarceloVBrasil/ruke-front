import { documentos_faltando } from "../../../helper/FormTypesAndFields";

export type documento = string

export interface ErrorDocumentoModal {
    documento: boolean
}

export enum FormField {
    DOCUMENTO = "documento"
}

export type FormState = {
    [FormField.DOCUMENTO]: documentos_faltando;

};

export type Action =
    | { type: 'SET_FIELD'; field: keyof FormState; value: string }
    | { type: 'RESET' };