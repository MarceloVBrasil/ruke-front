import { paradigma } from "../../components/DiferencasSalariais/modais/paradigmas/ParadigmasFormAndFields"
import { FormField, FormState } from "../FormTypesAndFields"

// pedido diferenca salarial
export type pedido_diferenca_salarial = {
    [PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS]: null | paradigma[]
    [PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO]: null | number
}

export enum PEDIDO_DIFERENCA_SALARIAL {
    PARADIGMAS = "paradigmas",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type DiferencaSalarialActions =
    // pedido diferencas salariais
    | { type: 'ADD_PARADIGMA', field: FormField.PEDIDO_DIFERENCAS_SALARIAIS, value: paradigma }
    | { type: 'EDIT_PARADIGMA', field: FormField.PEDIDO_DIFERENCAS_SALARIAIS, value: paradigma[] }
    | { type: 'DELETE_PARADIGMA', field: FormField.PEDIDO_DIFERENCAS_SALARIAIS, value: paradigma[] }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: FormField.PEDIDO_DIFERENCAS_SALARIAIS, value: number }

export interface IDiferencaSalarial {
    setAddParadigma(state: FormState, action: DiferencaSalarialActions): FormState
    setEditParadigma(state: FormState, action: DiferencaSalarialActions): FormState
    setDeleteParadigma(state: FormState, action: DiferencaSalarialActions): FormState
    setValorEstimado(state: FormState, action: DiferencaSalarialActions): FormState
}

export const pedido_diferenca_salarial_initial_value: pedido_diferenca_salarial | null = null

export type DiferencasSalariaisError = {
    valor_estimado: boolean
    paradigmas: boolean
}