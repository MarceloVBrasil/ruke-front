import { FormState, PEDIDO_FERIAS } from "../FormTypesAndFields"

export enum AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL {
    DATA_INICIO = "data_inicio",
    DATA_FINAL = "data_final",
    VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO = "valor_estimado_pagamento_em_dobro"
}

export type ausencia_pagamento_terco_constitucional = {
    [AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_INICIO]: null | string
    [AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_FINAL]: null | string
    [AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO]: null | number
}

export type AusenciaPagamentoTercoConstitucionalActions =
    // AUSENCIA PAGAMENTO TERCO CONSTITUCIONAL
    | { type: 'SET_DATA_INICIO', field: PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL, value: string }
    | { type: 'SET_DATA_FINAL', field: PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL, value: string }
    | { type: 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO', field: PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL, value: number }

export interface IAusenciaPagamentoTercoContitucional {
    setDataInicio(state: FormState, action: AusenciaPagamentoTercoConstitucionalActions): FormState
    setDataFinal(state: FormState, action: AusenciaPagamentoTercoConstitucionalActions): FormState
    setValorEstimadoPagamentoEmDobro(state: FormState, action: AusenciaPagamentoTercoConstitucionalActions): FormState
}

export type AusenciaPagamentoTercoConstitucionalError = {
    valor_estimado_pagamento_em_dobro: boolean
    data_final: boolean
    data_inicial: boolean
}