import { FormState, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields"

export enum HORAS_EXTRAS_PAGAS_POR_FORA {
    HORARIO_REAL_INICIO = "horario_real_inicio",
    HORARIO_REAL_TERMINO = "horario_real_termino",
    VALOR_PAGO_POR_FORA = "valor_pago_por_fora"
}

export type horas_extras_pagas_por_fora = {
    [HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_INICIO]: null | string
    [HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_TERMINO]: null | string
    [HORAS_EXTRAS_PAGAS_POR_FORA.VALOR_PAGO_POR_FORA]: null | number
}

export type HorasExtrasPagasPorForaActions =
    // HORAS EXTRAS PAGAS POR FORA
    | { type: 'SET_HORARIO_REAL_INICIO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA, value: string }
    | { type: 'SET_HORARIO_REAL_TERMINO', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA, value: string }
    | { type: 'SET_VALOR_PAGO_POR_FORA', field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA, value: number }

export interface IHorasExtrasPagasPorFora {
    setHorarioRealInicio(state: FormState, action: HorasExtrasPagasPorForaActions): FormState
    setHorarioRealTermino(state: FormState, action: HorasExtrasPagasPorForaActions): FormState
    setValorPagoPorFora(state: FormState, action: HorasExtrasPagasPorForaActions): FormState
}

export type HorasExtrasPagasPorForaError = {
    valor_pago_por_fora: boolean
    horario_real_inicio: boolean
    horario_real_termino: boolean
}