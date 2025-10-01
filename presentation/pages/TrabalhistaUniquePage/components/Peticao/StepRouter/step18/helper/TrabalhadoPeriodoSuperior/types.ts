import { FormState, PEDIDO_AVISO_PREVIO } from "../FormTypesAndFields"

export enum TRABALHADO_PERIODO_SUPERIOR_30_DIAS {
    QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS = "quantidade_dias_efetivamente_pagos",
    QUANTIDADE_DIAS_FALTARAM_SER_PAGOS = "quantidade_dias_faltaram_ser_pagos",
    VALOR_ESTIMADO = "valor_estimado"
}

export type trabalhado_periodo_superior_30_dias = {
    [TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS]: null | number
    [TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS]: null | number
    [TRABALHADO_PERIODO_SUPERIOR_30_DIAS.VALOR_ESTIMADO]: null | number
}

export type TrabalhadoPeriodoSuperior30DiasActions =
    // TRABALHADO PERIODO SUPERIOR 30 DIAS
    | { type: 'SET_QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS', field: PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS, value: number }
    | { type: 'SET_QUANTIDADE_DIAS_FALTARAM_SER_PAGOS', field: PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS, value: number }
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS, value: number }

export interface ITrabalhadoPeriodoSuperior30Dias {
    setQuantidadeDiasEfetivamentePagos(state: FormState, action: TrabalhadoPeriodoSuperior30DiasActions): FormState
    setQuantidadeDiasFaltaramSerPagos(state: FormState, action: TrabalhadoPeriodoSuperior30DiasActions): FormState
    setValorEstimado(state: FormState, action: TrabalhadoPeriodoSuperior30DiasActions): FormState
}

export type TrabalhadoPeriodoSuperior30DiasError = {
    valor_estimado: boolean
    quantidade_dias_faltaram_ser_pagos: boolean
    quantidade_dias_efetivamente_pagos: boolean
}