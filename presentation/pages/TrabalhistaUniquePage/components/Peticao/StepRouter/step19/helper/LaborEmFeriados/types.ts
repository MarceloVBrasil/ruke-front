import { FormState, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields"

export enum LABOR_EM_FERIADOS {
    QUANTIDADE_FERIADOS_POR_ANO = "quantidade_feriados_por_ano",
    VALOR_ESTIMADO_HORAS_TRABALHADAS = "valor_estimado_horas_trabalhadas",
    FERIADOS_TRABALHADOS = "feriados_trabalhados"
}

export type labor_em_feriados = {
    [LABOR_EM_FERIADOS.QUANTIDADE_FERIADOS_POR_ANO]: null | number
    [LABOR_EM_FERIADOS.VALOR_ESTIMADO_HORAS_TRABALHADAS]: null | number
    [LABOR_EM_FERIADOS.FERIADOS_TRABALHADOS]: null | string
}

export type LaborEmFeriadosActions =
    // LABOR FERIADOS
    | { type: 'SET_QUANTIDADE_FERIADOS_POR_ANO', field: PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS, value: number }
    | { type: 'SET_VALOR_ESTIMADO_HORAS_TRABALHADAS', field: PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS, value: number }
    | { type: 'SET_FERIADOS_TRABALHADOS', field: PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS, value: string }

export interface ILaborEmFeriados {
    setQuantidadeFeriadosPorAno(state: FormState, action: LaborEmFeriadosActions): FormState
    setValorEstimadoHorasTrabalhadas(state: FormState, action: LaborEmFeriadosActions): FormState
    setFeriasdosTrabalhados(state: FormState, action: LaborEmFeriadosActions): FormState
}

export type LaborEmFeriadosError = {
    valor_estimado_horas_trabalhadas: boolean
    quantidade_feriados_por_ano: boolean
    feriados_trabalhados: boolean
}