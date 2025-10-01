import { FormState, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields"

export enum JORNADA_TRABALHO_12_36 {
    REALIZAVA_HORAS_EXTRAS = "realizava_horas_extras",
    QUANTIDADE_HORAS_EXTRAS_POR_DIA = "quantidade_horas_extras_por_dia",
    QUANTIDADE_HORAS_EXTRAS_POR_SEMANA = "quantidade_horas_extras_por_semana",
    TOTAL_HORAS_EXTRAS = "total_horas_extras",
    VALOR_ESTIMADO_HORAS_EXTRAS = "valor_estimado_horas_extras"
}

export type jornada_trabalho_12_36 = {
    [JORNADA_TRABALHO_12_36.REALIZAVA_HORAS_EXTRAS]: null | boolean
    [JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_DIA]: null | number
    [JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_SEMANA]: null | number
    [JORNADA_TRABALHO_12_36.TOTAL_HORAS_EXTRAS]: null | number
    [JORNADA_TRABALHO_12_36.VALOR_ESTIMADO_HORAS_EXTRAS]: null | number
}

export type JornadaTrabalho_12_36_Actions =
    // JORNADA TRABALHO 12X36
    | { type: 'SET_REALIZAVA_HORAS_EXTRAS', field: PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36, value: boolean }
    | { type: 'SET_QUANTIDADE_HORAS_EXTRAS_POR_DIA', field: PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36, value: number }
    | { type: 'SET_QUANTIDADE_HORAS_EXTRAS_POR_SEMANA', field: PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36, value: number }
    | { type: 'SET_TOTAL_HORAS_EXTRAS', field: PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36, value: number }
    | { type: 'SET_VALOR_ESTIMADO_HORAS_EXTRAS', field: PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36, value: number }

export interface IJornadaTrabalho_12_36 {
    setRealizavaHorasExtras(state: FormState, action: JornadaTrabalho_12_36_Actions): FormState
    setQuantidadeHorasExtrasPorDia(state: FormState, action: JornadaTrabalho_12_36_Actions): FormState
    setQuantidadeHorasExtrasPorSemana(state: FormState, action: JornadaTrabalho_12_36_Actions): FormState
    setTotalHorasExtras(state: FormState, action: JornadaTrabalho_12_36_Actions): FormState
    setValorEstimadoHorasExtras(state: FormState, action: JornadaTrabalho_12_36_Actions): FormState
}

export type JornadaTrabalho_12_36_Error = {
    valor_estimado_horas_extras: boolean
    realizava_horas_extras: boolean
    quantidade_horas_extras_por_dia: boolean
    quantidade_horas_extras_por_semana: boolean
    total_horas_extras: boolean
}