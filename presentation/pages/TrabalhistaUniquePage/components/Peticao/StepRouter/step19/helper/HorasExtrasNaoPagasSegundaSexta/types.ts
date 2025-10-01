import { FormState, PEDIDO_JORNADA_TRABALHO, periodo_nao_pagamento } from "../FormTypesAndFields"

export enum HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA {
    EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO = "empregador_realizava_controle_de_ponto",
    HORARIO_REAL_INICIO = "horario_real_inicio",
    HORARIO_REAL_TERMINO = "horario_real_termino",
    PERIODO_NAO_PAGAMENTO = "periodo_nao_pagamento",
    DATA_INICIO_NAO_PAGAMENTO = "data_inicio_nao_pagamento",
    DATA_TERMINO_NAO_PAGAMENTO = "data_termino_nao_pagamento",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido",
    QUANTIDADE_HORAS_EXTARS_SEMANAIS = "quantidade_horas_extras_semanais"
}

export type horas_extras_nao_pagas_segunda_a_sexta = {
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO]: null | boolean
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.HORARIO_REAL_INICIO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.HORARIO_REAL_TERMINO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.PERIODO_NAO_PAGAMENTO]: null | periodo_nao_pagamento
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.DATA_INICIO_NAO_PAGAMENTO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.DATA_TERMINO_NAO_PAGAMENTO]: null | string
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.VALOR_ESTIMADO_PEDIDO]: null | number
    [HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.QUANTIDADE_HORAS_EXTARS_SEMANAIS]: null | number
}

export type HorasExtrasNaoPagasSegundaSextaActions =
    // HORAS EXTRAS NAO PAGAS SEGUNDA A SEXTA
    | { type: 'SET_EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA, value: boolean }
    | { type: 'SET_HORARIO_REAL_INICIO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA, value: string }
    | { type: 'SET_HORARIO_REAL_TERMINO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA, value: string }
    | { type: 'SET_PERIODO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA, value: periodo_nao_pagamento }
    | { type: 'SET_DATA_INICIO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA, value: string }
    | { type: 'SET_DATA_TERMINO_NAO_PAGAMENTO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA, value: string }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA, value: number }
    | { type: 'SET_QUANTIDADE_HORAS_EXTRAS_SEMANAIS', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA, value: number }

export interface IHorasNaoPagasSegundaSexta {
    setEmpregadorRealizavaControleDePonto(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState
    setHorarioRealInicio(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState
    setHorarioRealTermino(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState
    setPeriodoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState
    setDataInicioNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState
    setDataTerminoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState
    setValorEstimadoPedido(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState
    setQuantidadeHorasExtrasSemanais(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState
}

export type HorasExtrasNaoPagasSegundaSextaError = {
    valor_estimado_pedido: boolean
    periodo_nao_pagamento: boolean
    horario_real_inicio: boolean
    horario_real_termino: boolean
    quantidade_horas_extras_semanais: boolean
    data_inicio: boolean
    data_termino: boolean
}