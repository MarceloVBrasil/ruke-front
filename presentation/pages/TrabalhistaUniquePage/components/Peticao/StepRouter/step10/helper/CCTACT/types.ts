import { funcao } from "../../components/CCTACT/modais/funcoes/FuncaoFormAndFields"
import { FormField, FormState } from "../FormTypesAndFields"

// pedido act cct
export enum PEDIDO_ACT_CCT {
    CARGOS = "cargos",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type pedido_act_cct = {
    [PEDIDO_ACT_CCT.CARGOS]: null | funcao[]
    [PEDIDO_ACT_CCT.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type ActCctActions =
    | { type: 'ADD_FUNCAO', field: FormField.PEDIDO_ACT_CCT, value: funcao }
    | { type: 'EDIT_FUNCAO', field: FormField.PEDIDO_ACT_CCT, value: funcao[] }
    | { type: 'DELETE_FUNCAO', field: FormField.PEDIDO_ACT_CCT, value: funcao[] }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: FormField.PEDIDO_ACT_CCT, value: number }

export interface IActCct {
    setAddFuncao(state: FormState, action: ActCctActions): FormState
    setEditFuncao(state: FormState, action: ActCctActions): FormState
    setDeleteFuncao(state: FormState, action: ActCctActions): FormState
    setValorEstimado(state: FormState, action: ActCctActions): FormState
}

export const pedido_act_cct_initial_value: pedido_act_cct | null = null

export type ActCctError = {
    valor_estimado: boolean
}