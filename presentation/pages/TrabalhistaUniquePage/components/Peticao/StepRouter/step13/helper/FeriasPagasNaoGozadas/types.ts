import { FormState, PEDIDO_FERIAS } from "../FormTypesAndFields"

export enum FERIAS_PAGAS_NAO_GOZADAS {
    DATA_INICIO = "data_inicio",
    DATA_FINAL = "data_final",
    VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO = "valor_estimado_pagamento_em_dobro"
}

export type ferias_pagas_nao_gozadas = {
    [FERIAS_PAGAS_NAO_GOZADAS.DATA_INICIO]: null | string
    [FERIAS_PAGAS_NAO_GOZADAS.DATA_FINAL]: null | string
    [FERIAS_PAGAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO]: null | number
}

export type FeriasPagasNaoGozadasActions =
    // FERIAS PAGAS NAO GOZADAS
    | { type: 'SET_DATA_INICIO', field: PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS, value: string }
    | { type: 'SET_DATA_FINAL', field: PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS, value: string }
    | { type: 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO', field: PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS, value: number }

export interface IFeriasPagasNaoGozadas {
    setDataInicio(state: FormState, action: FeriasPagasNaoGozadasActions): FormState
    setDataFinal(state: FormState, action: FeriasPagasNaoGozadasActions): FormState
    setValorEstimadoPagamentoEmDobro(state: FormState, action: FeriasPagasNaoGozadasActions): FormState
}

export type FeriasPagasNaoGozadasError = {
    valor_estimado_pagamento_em_dobro: boolean
    data_inicio: boolean
    data_final: boolean
}