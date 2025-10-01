import { FormState, PEDIDO_JORNADA_TRABALHO, periodo_nao_pagamento } from "../FormTypesAndFields"

export enum HORAS_EXTRAS_NAO_PAGAS {
    HORARIO_REAL_INICIO = "horario_real_inicio",
    HORARIO_REAL_TERMINO = "horario_real_termino",
    PERIODO_NAO_PAGAMENTO = "periodo_nao_pagamento",
    DATA_INICIO_NAO_PAGAMENTO = "data_inicio_nao_pagamento",
    DATA_TERMINO_NAO_PAGAMENTO = "data_termino_nao_pagamento",
    QUANTIDADE_HORAS_EXTRAS_SEMANA = "quantidade_horas_extras_semana",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type horas_extras_nao_pagas = {
    [HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_INICIO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_TERMINO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO]: null | periodo_nao_pagamento
    [HORAS_EXTRAS_NAO_PAGAS.DATA_INICIO_NAO_PAGAMENTO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS.DATA_TERMINO_NAO_PAGAMENTO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS.QUANTIDADE_HORAS_EXTRAS_SEMANA]: null | number
    [HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type HorasExtrasNaoPagasActions =
    // HORAS EXTRAS NAO PAGAS
    | { type: 'SET_HORARIO_REAL_INICIO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS, value: string }
    | { type: 'SET_HORARIO_REAL_TERMINO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS, value: string }
    | { type: 'SET_PERIODO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS, value: periodo_nao_pagamento }
    | { type: 'SET_DATA_INICIO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS, value: string }
    | { type: 'SET_DATA_TERMINO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS, value: string }
    | { type: 'SET_QUANTIDADE_HORAS_EXTRAS_SEMANA', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS, value: number }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS, value: number }

export interface IHorasExtrasNaoPagas {
    setHorarioRealInicio(state: FormState, action: HorasExtrasNaoPagasActions): FormState
    setHorarioRealTermino(state: FormState, action: HorasExtrasNaoPagasActions): FormState
    setPeriodoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasActions): FormState
    setDataInicioNaoPagamento(state: FormState, action: HorasExtrasNaoPagasActions): FormState
    setDataTerminoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasActions): FormState
    setQuantidadeHorasExtrasSemana(state: FormState, action: HorasExtrasNaoPagasActions): FormState
    setValorEstimadoPedido(state: FormState, action: HorasExtrasNaoPagasActions): FormState
}

export type HorasExtrasNaoPagasError = {
    valor_estimado_pedido: boolean
    horario_real_inicio: boolean
    horario_real_termino: boolean
    periodo_nao_pagamento: boolean
    quantidade_horas_extras_semana: boolean
    data_inicio: boolean
    data_termino: boolean
}