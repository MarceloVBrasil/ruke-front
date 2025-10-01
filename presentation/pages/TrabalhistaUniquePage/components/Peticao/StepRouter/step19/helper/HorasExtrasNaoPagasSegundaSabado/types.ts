import { FormState, PEDIDO_JORNADA_TRABALHO, periodo_nao_pagamento } from "../FormTypesAndFields"

export enum HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO {
    HORARIO_CONTRATUAL_INICIO = "horario_contratual_inicio",
    HORARIO_CONTRATUAL_TERMINO = "horario_contratual_termino",
    HORARIO_REAL_INICIO = "horario_real_inicio",
    HORARIO_REAL_TERMINO = "horario_real_termino",
    PERIODO_NAO_PAGAMENTO = "periodo_nao_pagamento",
    DATA_INICIO_NAO_PAGAMENTO = "data_inicio_nao_pagamento",
    DATA_TERMINO_NAO_PAGAMENTO = "data_termino_nao_pagamento",
    QUANTIDADE_HORAS_EXTRAS_SEMANA = "quantidade_horas_extras_semana",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type horas_extras_nao_pagas_segunda_a_sabado = {
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_INICIO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_TERMINO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_INICIO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_TERMINO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO]: null | periodo_nao_pagamento
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_INICIO_NAO_PAGAMENTO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_TERMINO_NAO_PAGAMENTO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.QUANTIDADE_HORAS_EXTRAS_SEMANA]: null | number
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type HorasExtrasNaoPagasSegundaSabadoActions =
    // HORAS EXTRAS NAO PAGAS SEGUNDA A SABADO
    | { type: 'SET_HORARIO_CONTRATUAL_INICIO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO, value: string }
    | { type: 'SET_HORARIO_CONTRATUAL_TERMINO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO, value: string }
    | { type: 'SET_HORARIO_REAL_INICIO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO, value: string }
    | { type: 'SET_HORARIO_REAL_TERMINO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO, value: string }
    | { type: 'SET_PERIODO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO, value: periodo_nao_pagamento }
    | { type: 'SET_DATA_INICIO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO, value: string }
    | { type: 'SET_DATA_TERMINO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO, value: string }
    | { type: 'SET_QUANTIDADE_HORAS_EXTRAS_SEMANA', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO, value: number }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO, value: number }

export interface IHorasExtrasNaoPagasSegundaSabado {
    setHorarioContratualInicio(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState
    setHorarioContratualTermino(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState
    setHorarioRealInicio(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState
    setHorarioRealTermino(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState
    setPeriodoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState
    setDataInicioNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState
    setDataTerminoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState
    setQuantidadeHorasExtrasSemana(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState
    setValorEstimadoPedido(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState
}

export type HorasExtrasNaoPagasSegundaSabadoError = {
    valor_estimado_pedido: boolean
    horario_real_inicio: boolean
    horario_real_termino: boolean
    periodo_nao_pagamento: boolean
    horario_contratual_inicio: boolean
    horario_contratual_termino: boolean
    quantidade_horas_extras_semana: boolean
    data_inicio: boolean
    data_termino: boolean
}