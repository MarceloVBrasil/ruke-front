import { FormState, PEDIDO_JORNADA_TRABALHO, periodo_nao_pagamento } from "../FormTypesAndFields"

export enum HORAS_EXTRAS_NAO_PAGAS_SABADO {
    EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO = "empregador_realizava_controle_de_ponto",
    HORARIO_REAL_INICIO = "horario_real_inicio",
    HORARIO_REAL_TERMINO = "horario_real_termino",
    PERIODO_NAO_PAGAMENTO = "periodo_nao_pagamento",
    DATA_INICIO_NAO_PAGAMENTO = "data_inicio_nao_pagamento",
    DATA_TERMINO_NAO_PAGAMENTO = "data_termino_nao_pagamento",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido",
    QUANTIDADE_HORAS_EXTRAS = "quantidade_horas_extras",
}

export type horas_extras_nao_pagas_sabado = {
    [HORAS_EXTRAS_NAO_PAGAS_SABADO.EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO]: null | boolean
    [HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_INICIO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_TERMINO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO]: null | periodo_nao_pagamento
    [HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_INICIO_NAO_PAGAMENTO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_TERMINO_NAO_PAGAMENTO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SABADO.VALOR_ESTIMADO_PEDIDO]: null | number
    [HORAS_EXTRAS_NAO_PAGAS_SABADO.QUANTIDADE_HORAS_EXTRAS]: null | number
}

export type HorasExtrasnaoPagasSabadoActions =
    // HORAS EXTRAS NAO PAGAS SABADOS
    | { type: 'SET_EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS, value: boolean }
    | { type: 'SET_HORARIO_REAL_INICIO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS, value: string }
    | { type: 'SET_HORARIO_REAL_TERMINO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS, value: string }
    | { type: 'SET_PERIODO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS, value: periodo_nao_pagamento }
    | { type: 'SET_DATA_INICIO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS, value: string }
    | { type: 'SET_DATA_TERMINO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS, value: string }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS, value: number }
    | { type: 'SET_QUANTIDADE_HORAS_EXTRAS', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS, value: number }


export interface IHorasExtrasNaoPagasSabado {
    setEmpregadorRealizavaControleDePonto(state: FormState, action: HorasExtrasnaoPagasSabadoActions): FormState
    setHorarioRealInicio(state: FormState, action: HorasExtrasnaoPagasSabadoActions): FormState
    setHorarioRealTermino(state: FormState, action: HorasExtrasnaoPagasSabadoActions): FormState
    setPeriodoNaoPagamento(state: FormState, action: HorasExtrasnaoPagasSabadoActions): FormState
    setDataInicioNaoPagamento(state: FormState, action: HorasExtrasnaoPagasSabadoActions): FormState
    setDataTerminoNaoPagamento(state: FormState, action: HorasExtrasnaoPagasSabadoActions): FormState
    setQuantidadeHorasExtras(state: FormState, action: HorasExtrasnaoPagasSabadoActions): FormState
    setValorEstimadoPedido(state: FormState, action: HorasExtrasnaoPagasSabadoActions): FormState
}

export type HorasExtrasNaoPagasSabadoError = {
    valor_estimado_pedido: boolean
    horario_real_inicio: boolean
    horario_real_termino: boolean
    periodo_nao_pagamento: boolean
    quantidade_horas_extras: boolean
    data_inicio: boolean
    data_termino: boolean
}