import { FormState, PEDIDO_FERIAS } from "../FormTypesAndFields"

export enum PEDIDO_FERIAS_NAO_GOZADAS {
    VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO = "valor_estimado_pagamento_em_dobro",
    PERIODOS_FERIAS = "periodos_ferias"
}

export type pedido_ferias_nao_gozadas = {
    [PEDIDO_FERIAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO]: null | number
    [PEDIDO_FERIAS_NAO_GOZADAS.PERIODOS_FERIAS]: null | string
}

export type PedidoFeriasNaoGozadasActions =
    // FERIAS NAO GOZADAS
    | { type: 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DROBRO', field: PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO, value: number }
    | { type: 'SET_PERIODOS_FERIAS', field: PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO, value: string }

export interface IPedidoFeriasNaoGozadas {
    setValorEstimadoPagamentoEmDobro(state: FormState, action: PedidoFeriasNaoGozadasActions): FormState
    setPeriodosFerias(state: FormState, action: PedidoFeriasNaoGozadasActions): FormState
}

export type PedidoFeriasNaoGozadasError = {
    valor_estimado_pagamento_em_dobro: boolean
    periodos_ferias: boolean
}