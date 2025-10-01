import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum NAO_PAGAMENTO_VERBAS_RESCISORIAS {
    VALOR_ESTIMADO = "valor_estimado",
    DATA_PROJECAO_TERMINO = "data_projecao_termino"
}

export type nao_pagamento_verbas_rescisorias = {
    [NAO_PAGAMENTO_VERBAS_RESCISORIAS.VALOR_ESTIMADO]: null | number
    [NAO_PAGAMENTO_VERBAS_RESCISORIAS.DATA_PROJECAO_TERMINO]: null | string
}

export type NaoPagamentoVerbasRescisoriasActions =
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS, value: number }
    | { type: 'SET_DATA_PROJECAO_TERMINO', field: PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS, value: string }

export interface INaoPagamentoVerbasRescisorias {
    setValorEstimado(state: FormState, action: NaoPagamentoVerbasRescisoriasActions): FormState
    setDataProjecaoTermino(state: FormState, action: NaoPagamentoVerbasRescisoriasActions): FormState
}


export type NaoPagamentoVerbasRescisoriasError = {
    valor_estimado: boolean
    data_projecao_termino: boolean
}