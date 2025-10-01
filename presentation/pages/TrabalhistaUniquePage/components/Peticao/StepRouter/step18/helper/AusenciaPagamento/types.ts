import { FormState, PEDIDO_AVISO_PREVIO } from "../FormTypesAndFields"

export enum AUSENCIA_PAGAMENTO {
    QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS = "quantidade_dias_deveriam_ser_pagos",
    VALOR_ESTIMADO = "valor_estimado"
}

export type ausencia_pagamento = {
    [AUSENCIA_PAGAMENTO.QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS]: null | number
    [AUSENCIA_PAGAMENTO.VALOR_ESTIMADO]: null | number
}

export type AusenciaPagamentoActions =
    // AUSENCIA PAGAMENTO
    | { type: 'SET_QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS', field: PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO, value: number }
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO, value: number }

export interface IAusenciaPagamento {
    setQuantidadeDiasDeveriamSerPagos(state: FormState, action: AusenciaPagamentoActions): FormState
    setValorEstimado(state: FormState, action: AusenciaPagamentoActions): FormState
}

export type AusenciaPagamentoError = {
    valor_estimado: boolean
    quantidade_dias_deveriam_ser_pagos: boolean
}