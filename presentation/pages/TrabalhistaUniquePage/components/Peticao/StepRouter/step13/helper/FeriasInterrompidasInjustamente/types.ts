import { FormState, PEDIDO_FERIAS } from "../FormTypesAndFields"

export enum PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE {
    DATA_INICIO = "data_inicio",
    DATA_FINAL = "data_final",
    INTERRUPCAO_FERIAS = "interrupcao_ferias",
    VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO = "valor_estimado_pagamento_em_dobro"
}

export type pedido_ferias_interrompidas_injustamente = {
    [PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_INICIO]: null | string
    [PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_FINAL]: null | string
    [PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.INTERRUPCAO_FERIAS]: null | string
    [PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO]: null | number

}

export type PedidoFeriasInterrompidasInjustamenteActions =
    // FERIAS INTERROMPIDAS INJUSTAMNETE
    | { type: 'SET_DATA_INICIO', field: PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO, value: string }
    | { type: 'SET_DATA_FINAL', field: PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO, value: string }
    | { type: 'SET_INTERRUPCAO_FERIAS', field: PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO, value: string }
    | { type: 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO', field: PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO, value: number }

export interface IPedidoFeriasInterrompidasInjustamente {
    setDataInicio(state: FormState, action: PedidoFeriasInterrompidasInjustamenteActions): FormState
    setDataFinal(state: FormState, action: PedidoFeriasInterrompidasInjustamenteActions): FormState
    setInterrupcaoFerias(state: FormState, action: PedidoFeriasInterrompidasInjustamenteActions): FormState
    setValorEstimadoPagamentoEmDoro(state: FormState, action: PedidoFeriasInterrompidasInjustamenteActions): FormState
}

export type PedidoFeriasInterrompidasInjustamenteError = {
    valor_estimado_pagamento_em_dobro: boolean
    data_inicial: boolean
    data_final: boolean
    data_interrupcao_ferias: boolean
}