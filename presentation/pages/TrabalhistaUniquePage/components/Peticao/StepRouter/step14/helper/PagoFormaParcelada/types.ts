import { FormState, PEDIDO_MULTA_477 } from "../FormTypesAndFields"

export enum PAGAS_FORMA_PARCELADA_PEDIDO {
    PROJECAO_AVISO_PREVIO = "projecao_aviso_previo",
    DATA_PROJECAO = "data_projecao",
    QUANTIDADE_PARCELAS = "quantidade_parcelas"
}

export type pagas_forma_parcelada_pedido = {
    [PAGAS_FORMA_PARCELADA_PEDIDO.PROJECAO_AVISO_PREVIO]: null | boolean
    [PAGAS_FORMA_PARCELADA_PEDIDO.DATA_PROJECAO]: null | string
    [PAGAS_FORMA_PARCELADA_PEDIDO.QUANTIDADE_PARCELAS]: null | number
}

export type PagasFormaParceladaPedidoActions =
    // PAGAS FORMA PARCELADA PEDIDO
    | { type: 'SET_PROJECAO_AVISO_PREVIO', field: PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO, value: boolean }
    | { type: 'SET_DATA_PROJECAO', field: PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO, value: string }
    | { type: 'SET_QUANTIDADE_PARCELAS', field: PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO, value: number }

export interface IPagasFormaParceladaPedido {
    setProjecaoAvisoPrevio(state: FormState, action: PagasFormaParceladaPedidoActions): FormState
    setDataProjecao(state: FormState, action: PagasFormaParceladaPedidoActions): FormState
    setQuantidadeParcelas(state: FormState, action: PagasFormaParceladaPedidoActions): FormState
}

export type PagasFormaParceladaError = {
    data_projecao: boolean
    quantidade_parcelas: boolean
}