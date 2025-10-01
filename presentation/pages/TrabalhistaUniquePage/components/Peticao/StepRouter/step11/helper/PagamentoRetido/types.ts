import { FormState, PEDIDO_GORJETAS } from "../FormTypesAndFields"

export enum PAGAMENTO_RETIDO_PEDIDO {
    PERCENTUAL_GORJETAS = "percentual_gorjetas",
    PEDIDO_RESTITUICAO = "pedido_restituicao",
    VALOR_MEDIO_MENSAL = "valor_medio_mensal",
    VALOR_TOTAL_ESTIMADO_GORJETAS = "valor_total_estimado_gorjetas"
}

export type pagamento_retido_pedido = {
    [PAGAMENTO_RETIDO_PEDIDO.PERCENTUAL_GORJETAS]: null | number
    [PAGAMENTO_RETIDO_PEDIDO.PEDIDO_RESTITUICAO]: null | boolean
    [PAGAMENTO_RETIDO_PEDIDO.VALOR_MEDIO_MENSAL]: null | number
    [PAGAMENTO_RETIDO_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS]: null | number
}

export type PagamentoRetidoPedidoActions =
    // PAGAMENTO RETIDO PEDIDO
    | { type: 'SET_PERCENTUAL_GORJETAS', field: PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO, value: number }
    | { type: 'SET_PEDIDO_RESTITUICAO', field: PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO, value: boolean }
    | { type: 'SET_VALOR_MEDIO_MENSAL', field: PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO, value: number }
    | { type: 'SET_VALOR_TOTAL_ESTIMADO_GORJETAS', field: PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO, value: number }

export interface IPagamentoRetidoPedido {
    setPercentualGorjetas(state: FormState, action: PagamentoRetidoPedidoActions): FormState
    setPedidoRestituicao(state: FormState, action: PagamentoRetidoPedidoActions): FormState
    setValorMedioMensal(state: FormState, action: PagamentoRetidoPedidoActions): FormState
    setValorTotalEstimadoGorjetas(state: FormState, action: PagamentoRetidoPedidoActions): FormState
}

export type PagamentoRetidoPedidoError = {
    valor_total_estimado_gorjetas: boolean
}