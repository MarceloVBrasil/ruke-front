import { advogado_assinante } from "@/app/types/advogados_assinantes";

export interface IErrorAdvogadoAssinante {
    nome: boolean
    oab: boolean
    estado_oab: boolean
}

export enum FormField {
    ADVOGADO = "nome",
    OAB = "oab",
    ESTADO_OAB = "estado_oab",
    STATUS = "status"
}

export type FormState = {
    [FormField.ADVOGADO]: string
    [FormField.ESTADO_OAB]: string
    [FormField.OAB]: string
    [FormField.STATUS]: boolean
}

export type Action =
    | { type: 'SET_ADVOGADO'; field: keyof advogado_assinante, value: string }
    | { type: 'SET_OAB'; field: keyof advogado_assinante, value: string }
    | { type: 'SET_ESTADO_OAB'; field: keyof advogado_assinante, value: string }
    | { type: 'SET_STATUS'; field: keyof advogado_assinante, value: boolean }
    | { type: 'RESET' };