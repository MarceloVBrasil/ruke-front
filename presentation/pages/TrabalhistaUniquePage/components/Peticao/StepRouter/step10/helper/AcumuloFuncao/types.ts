import { FormField, FormState } from "../FormTypesAndFields"

export enum PEDIDO_ACUMULO_FUNCAO {
    DATA_INICIAL = "data_inicial",
    DATA_FINAL = "data_final",
    CARGO_OCUPADO = "cargo_ocupado",
    FUNCAO_ACUMULADA = "funcao_acumulada",
    ATIVIDADES_CARGO_ACUMULADO = "atividades_cargo_acumulado",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type pedido_acumulo_funcao = {
    [PEDIDO_ACUMULO_FUNCAO.DATA_INICIAL]: null | string
    [PEDIDO_ACUMULO_FUNCAO.DATA_FINAL]: null | string
    [PEDIDO_ACUMULO_FUNCAO.CARGO_OCUPADO]: null | string
    [PEDIDO_ACUMULO_FUNCAO.FUNCAO_ACUMULADA]: null | string
    [PEDIDO_ACUMULO_FUNCAO.ATIVIDADES_CARGO_ACUMULADO]: null | string
    [PEDIDO_ACUMULO_FUNCAO.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type AcumuloFuncaoActions =
    | { type: 'SET_DATA_INICIAL', field: FormField.PEDIDO_ACUMULO_FUNCAO, value: string }
    | { type: 'SET_DATA_FINAL', field: FormField.PEDIDO_ACUMULO_FUNCAO, value: string }
    | { type: 'SET_CARGO_OCUPADO', field: FormField.PEDIDO_ACUMULO_FUNCAO, value: string }
    | { type: 'SET_FUNCAO_ACUMULADA', field: FormField.PEDIDO_ACUMULO_FUNCAO, value: string }
    | { type: 'SET_ATIVIDADES_CARGO_ACUMULADO', field: FormField.PEDIDO_ACUMULO_FUNCAO, value: string }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: FormField.PEDIDO_ACUMULO_FUNCAO, value: number }

export interface IAcumuloFuncao {
    setDataInicial(state: FormState, action: AcumuloFuncaoActions): FormState
    setDataFinal(state: FormState, action: AcumuloFuncaoActions): FormState
    setCargoOcupado(state: FormState, action: AcumuloFuncaoActions): FormState
    setFuncaoAcumulada(state: FormState, action: AcumuloFuncaoActions): FormState
    setAtividadesCargoAcumulado(state: FormState, action: AcumuloFuncaoActions): FormState
    setValorEstimado(state: FormState, action: AcumuloFuncaoActions): FormState
}

export const pedido_acumulo_funcao_initial_value: pedido_acumulo_funcao | null = null

export type AcumuloFuncaoError = {
    valor_estimado: boolean
}