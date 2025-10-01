import { FormState, PEDIDO_FERIAS } from "../FormTypesAndFields"

export enum PAGAMENTO_INTEMPESTIVO_FERIAS {
    DATA_INICIO = "data_inicio",
    DATA_PAGAMENTO_REALIZADO = "data_pagamento_realizado",
    VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO = "valor_estimado_pagamento_em_dobro"
}

export type pagamento_intempestivo_ferias = {
    [PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_INICIO]: null | string
    [PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_PAGAMENTO_REALIZADO]: null | string
    [PAGAMENTO_INTEMPESTIVO_FERIAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO]: null | number
}

export type PagamentoIntempestivoFeriasActions =
    // PAGAMENTO INTEMPESTIVO 
    | { type: 'SET_DATA_INICIO', field: PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS, value: string }
    | { type: 'SET_DATA_PAGAMENTO_REALIZADO', field: PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS, value: string }
    | { type: 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO', field: PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS, value: number }

export interface IPagamentoIntempestivoFerias {
    setDataInicio(state: FormState, action: PagamentoIntempestivoFeriasActions): FormState
    setDataPagamentoRealizado(state: FormState, action: PagamentoIntempestivoFeriasActions): FormState
    setValorEstimadoPagamentoEmDobro(state: FormState, action: PagamentoIntempestivoFeriasActions): FormState
}

export type PagamentoIntempestivoFeriasError = {
    valor_estimado_pagamento_em_dobro: boolean
    data_inicio: boolean
    data_pagamento_realizado: boolean
}