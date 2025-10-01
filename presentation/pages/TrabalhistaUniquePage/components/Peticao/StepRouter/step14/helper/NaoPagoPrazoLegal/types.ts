import { FormState, PEDIDO_MULTA_477 } from "../FormTypesAndFields"

export enum NAO_PAGAS_DENTRO_PRAZO_LEGAL {
    PROJECAO_AVISO_PREVIO = "projecao_aviso_previo",
    DATA_PROJECAO = "data_projecao"
}

export type nao_pagas_dentro_prazo_legal = {
    [NAO_PAGAS_DENTRO_PRAZO_LEGAL.PROJECAO_AVISO_PREVIO]: null | boolean
    [NAO_PAGAS_DENTRO_PRAZO_LEGAL.DATA_PROJECAO]: null | string
}

export type NaoPagasDentroPrazoLegalActions =
    // NAO PAGAS DENTRO PRAZO LEGAL
    | { type: 'SET_PROJECAO_AVISO_PREVIO', field: PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL, value: boolean }
    | { type: 'SET_DATA_PROJECAO', field: PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL, value: string }

export interface INaoPagasDentroPrazoLegal {
    setProjecaoAvisoPrevio(state: FormState, action: NaoPagasDentroPrazoLegalActions): FormState
    setDataProjecao(state: FormState, action: NaoPagasDentroPrazoLegalActions): FormState
}

export type NaoPagasDentroPrazoLegalError = {
    data_projecao: boolean
}