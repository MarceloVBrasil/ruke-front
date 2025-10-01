import { FormState, PEDIDO_AVISO_PREVIO } from "../FormTypesAndFields"

export enum PAGAMENTO_A_MENOR {
    QUANTIDADE_DIAS_FALTARAM_SER_PAGOS = "quantidade_dias_faltaram_ser_pagos",
    VALOR_ESTIMADO = "valor_estimado"
}

export type pagamento_a_menor = {
    [PAGAMENTO_A_MENOR.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS]: null | number
    [PAGAMENTO_A_MENOR.VALOR_ESTIMADO]: null | number
}

export type PagamentoAMenorActions =
    // PAGAMENTO A MENOR
    | { type: 'SET_QUANTIDADE_DIAS_FALTARAM_SER_PAGOS', field: PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR, value: number }
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR, value: number }

export interface IPagamentoAMenor {
    setQuantidadeDiasFaltaramSerPagos(state: FormState, action: PagamentoAMenorActions): FormState
    setValorEstimado(state: FormState, action: PagamentoAMenorActions): FormState
}

export type PagamentoAMenorError = {
    valor_estimado: boolean
    quantidade_dias_faltaram_ser_pagos: boolean
}