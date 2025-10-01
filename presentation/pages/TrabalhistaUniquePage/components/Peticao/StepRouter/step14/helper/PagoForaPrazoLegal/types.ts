import { FormState, PEDIDO_MULTA_477 } from "../FormTypesAndFields"

export enum PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO {
    PROJECAO_AVISO_PREVIO = "projecao_aviso_previo",
    DATA_PROJECAO = "data_projecao",
    DATA_PAGAMENTO_VERBAS = "data_pagamento_verbas",
}

export type pagas_fora_do_prazo_legal_pedido = {
    [PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.PROJECAO_AVISO_PREVIO]: null | boolean
    [PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PROJECAO]: null | string
    [PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PAGAMENTO_VERBAS]: null | string
}

export type PagasForaDoPrazoLegalPedidoActions =
    // PAGAS FORA DO PRAZO LEGAL PEDIDO
    | { type: 'SET_PROJECAO_AVISO_PREVIO', field: PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO, value: boolean }
    | { type: 'SET_DATA_PROJECAO', field: PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO, value: string }
    | { type: 'SET_DATA_PAGAMENTO', field: PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO, value: string }

export interface IPagasForaPrazoLegalPedido {
    setProjecaoAvisoPrevio(state: FormState, action: PagasForaDoPrazoLegalPedidoActions): FormState
    setDataProjecao(state: FormState, action: PagasForaDoPrazoLegalPedidoActions): FormState
    setDataPagamento(state: FormState, action: PagasForaDoPrazoLegalPedidoActions): FormState
}

export type PagasForaPrazoLegalError = {
    data_projecao: boolean
    data_pagamento: boolean
}