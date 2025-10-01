import { intervalo } from "../../components/DesvioFuncao/modais/intervalos/DesviosFormAndFields"
import { FormField, FormState } from "../FormTypesAndFields"

export type fundamento = "piso_lei" | "piso_cct" | "piso_pcs" | "compra_empregados" | "media_mercado" | "outros"

export enum FUNDAMENTOS {
    PISO_LEI = "piso_lei",
    PISO_CCT = "piso_cct",
    PISO_PCS = "piso_pcs",
    COMPRA_EMPREGADOS = "compra_empregados",
    MEDIA_MERCADO = "media_mercado",
    OUTROS = "outros"
}

// pedido desvio funcao
export enum PEDIDO_DESVIO_FUNCAO {
    TODO_CONTRATO = "todo_contrato",
    INTERVALOS = "intervalos",
    FUNDAMENTO = "fundamento",
    OUTROS_FUNDAMENTOS = "outros_fundamentos",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type pedido_desvio_funcao = {
    [PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO]: null | boolean
    [PEDIDO_DESVIO_FUNCAO.INTERVALOS]: null | intervalo[]
    [PEDIDO_DESVIO_FUNCAO.FUNDAMENTO]: fundamento[],
    [PEDIDO_DESVIO_FUNCAO.OUTROS_FUNDAMENTOS]: null | string
    [PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type DesvioFuncaoActions =
    // pedido desvio funcao
    | { type: 'ADD_INTERVALO', field: FormField.PEDIDO_DESVIO_FUNCAO, value: intervalo }
    | { type: 'EDIT_INTERVALO', field: FormField.PEDIDO_DESVIO_FUNCAO, value: intervalo[] }
    | { type: 'DELETE_INTERVALO', field: FormField.PEDIDO_DESVIO_FUNCAO, value: intervalo[] }
    | { type: 'SET_TODO_CONTRATO', field: FormField.PEDIDO_DESVIO_FUNCAO, value: boolean }
    | { type: 'SET_FUNDAMENTO', field: FormField.PEDIDO_DESVIO_FUNCAO, value: { checked: boolean, value: fundamento } }
    | { type: 'SET_OUTRO_FUNDAMENTO', field: FormField.PEDIDO_DESVIO_FUNCAO, value: string }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: FormField.PEDIDO_DESVIO_FUNCAO, value: number }

export interface IDesvioFuncao {
    setAddDesvio(state: FormState, action: DesvioFuncaoActions): FormState
    setEditDesvio(state: FormState, action: DesvioFuncaoActions): FormState
    setDeleteDesvio(state: FormState, action: DesvioFuncaoActions): FormState
    setTodoContrato(state: FormState, action: DesvioFuncaoActions): FormState
    setFundamento(state: FormState, action: DesvioFuncaoActions): FormState
    setOutroFundamento(state: FormState, action: DesvioFuncaoActions): FormState
    setValorEstimado(state: FormState, action: DesvioFuncaoActions): FormState
}

export const pedido_desvio_funcao_initial_value: pedido_desvio_funcao | null = null

export type DesvioFuncaoError = {
    valor_estimado: boolean
}