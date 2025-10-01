import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE {
    VALOR_ESTIMADO = "valor_estimado"
}

export type nao_fornecimento_epi_labor_insalubre = {
    [NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE.VALOR_ESTIMADO]: null | number
}

export type NaoFornacimentoEpiLaborInsalubreActions =
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE, value: number }

export interface INaoFornecimentoEpiLaborInsalubre {
    setValorEstimado(state: FormState, action: NaoFornacimentoEpiLaborInsalubreActions): FormState
}

export type NaoFornecimentoEpiLaborInsalubreError = {
    valor_estimado: boolean
}