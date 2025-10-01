import { FormState, PEDIDO_JORNADA_TRABALHO, periodo_nao_pagamento } from "../FormTypesAndFields"

export enum HORAS_EXTRAS_PAGAS_PARCIALMENTE {
    HORARIO_REAL_INICIO = "horario_real_inicio",
    HORARIO_REAL_TERMINO = "horario_real_termino",
    QUANTIDADE_HORAS_EXTRAS_PAGAS = "quantidade_horas_extras_pagas",
    QUANTIDADE_HORAS_EXTRAS_REALIZADAS_SEMANA = "quantidade_horas_extras_realizadas_semana",
    PERIODO_NAO_PAGAMENTO = "periodo_nao_pagamento",
    DATA_INICIO_NAO_PAGAMENTO = "data_inicio_nao_pagamento",
    DATA_TERMINO_NAO_PAGAMENTO = "data_termino_nao_pagamento",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type horas_extras_pagas_parcialmente = {
    [HORAS_EXTRAS_PAGAS_PARCIALMENTE.HORARIO_REAL_INICIO]: null | string
    [HORAS_EXTRAS_PAGAS_PARCIALMENTE.HORARIO_REAL_TERMINO]: null | string
    [HORAS_EXTRAS_PAGAS_PARCIALMENTE.QUANTIDADE_HORAS_EXTRAS_PAGAS]: null | number
    [HORAS_EXTRAS_PAGAS_PARCIALMENTE.QUANTIDADE_HORAS_EXTRAS_REALIZADAS_SEMANA]: null | number
    [HORAS_EXTRAS_PAGAS_PARCIALMENTE.PERIODO_NAO_PAGAMENTO]: null | periodo_nao_pagamento
    [HORAS_EXTRAS_PAGAS_PARCIALMENTE.DATA_INICIO_NAO_PAGAMENTO]: null | string
    [HORAS_EXTRAS_PAGAS_PARCIALMENTE.DATA_TERMINO_NAO_PAGAMENTO]: null | string
    [HORAS_EXTRAS_PAGAS_PARCIALMENTE.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type HorasExtrasPagasParcialmenteActions =
    // HORAS EXTRAS PAGAS PARCIALMENTE
    | { type: 'SET_HORARIO_REAL_INICIO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE, value: string }
    | { type: 'SET_HORARIO_REAL_TERMINO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE, value: string }
    | { type: 'SET_QUANTIDADE_HORAS_EXTRAS_PAGAS', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE, value: number }
    | { type: 'SET_QUANTIDADE_HORAS_EXTRAS_REALIZADAS_SEMANA', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE, value: number }
    | { type: 'SET_PERIODO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE, value: periodo_nao_pagamento }
    | { type: 'SET_DATA_INICIO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE, value: string }
    | { type: 'SET_DATA_TERMINO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE, value: string }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE, value: number }

export interface IHorasPagasParcialmente {
    setHorarioRealInicio(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState
    setHorarioRealTermino(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState
    setQuantidadeHorasExtrasPagas(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState
    setQuantidadeHorasExtrasRealizadasSemana(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState
    setPeriodoNaoPagamento(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState
    setDataInicioNaoPagamento(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState
    setDataTerminoNaoPagamento(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState
    setValorEstimadoPedido(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState
}

export type HorasExtrasPagasParcialmenteError = {
    valor_estimado_pedido: boolean
    horario_real_inicio: boolean
    horario_real_termino: boolean
    quantidade_horas_extras_pagas: boolean
    quantidade_horas_extras_realizadas: boolean
    periodo_nao_pagamento: boolean
    data_inicio: boolean
    data_termino: boolean
}