import { FormState, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields"

export enum LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO {
    QUANTIDADE_DOMINGOS_POR_MES = "quantidade_domingos_por_mes",
    VALOR_PAGO_POR_FORA = "valor_pago_por_fora"
}

export type labor_aos_domingos_sem_contraprestacao = {
    [LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.QUANTIDADE_DOMINGOS_POR_MES]: null | number
    [LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.VALOR_PAGO_POR_FORA]: null | number
}

export type LaborAosDomingosActions =
    // LABOR AOS DOMINGOS
    | { type: 'SET_QUANTIDADE_DOMINGOS_POR_MES', field: PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO, value: number }
    | { type: 'SET_VALOR_PAGO_POR_FORA', field: PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO, value: number }

export interface ILaborAosDomingos {
    setQuantidadeDomingosMes(state: FormState, action: LaborAosDomingosActions): FormState
    setValorPagoPorFora(state: FormState, action: LaborAosDomingosActions): FormState
}

export type LaborAosDomingosError = {
    valor_pago_por_fora: boolean
    quantidade_domingos_mes: boolean
}