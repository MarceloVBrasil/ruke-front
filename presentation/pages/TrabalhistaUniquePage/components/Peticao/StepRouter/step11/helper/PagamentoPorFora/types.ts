import { FormState, PEDIDO_GORJETAS } from "../FormTypesAndFields"

export enum PAGAMENTO_POR_FORA_PEDIDO {
    VALOR_MEDIO = "valor_medio",
    PERIODO = "periodo",
    VALOR_INTEGRADO_SALARIO = "valor_integrado_salario",
    DATA_INICIAL = "data_inicial",
    DATA_FINAL = "data_final",
    VALOR_TOTAL_ESTIMADO_GORJETAS = "valor_total_estimado_gorjetas",
}

export type periodo = 'todo_periodo' | 'periodo_selecionado'

export type pagamento_por_fora_pedido = {
    [PAGAMENTO_POR_FORA_PEDIDO.VALOR_MEDIO]: null | number
    [PAGAMENTO_POR_FORA_PEDIDO.PERIODO]: periodo
    [PAGAMENTO_POR_FORA_PEDIDO.VALOR_INTEGRADO_SALARIO]: null | boolean
    [PAGAMENTO_POR_FORA_PEDIDO.DATA_INICIAL]: null | string
    [PAGAMENTO_POR_FORA_PEDIDO.DATA_FINAL]: null | string
    [PAGAMENTO_POR_FORA_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS]: null | number
}

export type PagamentoPorForaActions =
    // PAGAMENTO POR FORA PEDIDO
    | { type: 'SET_VALOR_MEDIO', field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO, value: number }
    | { type: 'SET_PERIODO', field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO, value: periodo }
    | { type: 'SET_VALOR_INTEGRADO_SALARIO', field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO, value: boolean }
    | { type: 'SET_DATA_INICIAL', field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO, value: string }
    | { type: 'SET_DATA_FINAL', field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO, value: string }
    | { type: 'SET_VALOR_TOTAL_ESTIMADO_GORJETAS', field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO, value: number }

export interface IPagamentoPorFora {
    setValorMedio(state: FormState, action: PagamentoPorForaActions): FormState
    setPeriodo(state: FormState, action: PagamentoPorForaActions): FormState
    setValorIntegradoSalario(state: FormState, action: PagamentoPorForaActions): FormState
    setDataInicial(state: FormState, action: PagamentoPorForaActions): FormState
    setDataFinal(state: FormState, action: PagamentoPorForaActions): FormState
    setValorTotalEstimadoGorjetas(state: FormState, action: PagamentoPorForaActions): FormState
}

export type PagamentoPorForaError = {
    valor_total_estimado_gorjetas: boolean
}