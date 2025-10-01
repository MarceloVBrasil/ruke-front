import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO {
    VALOR_ESTIMADO = "valor_estimado"
}

export type nao_fornecimento_epi_labor_perigoso = {
    [NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO.VALOR_ESTIMADO]: null | number
}

export type NaoFornacimentoEpiLaborPerigosoActions =
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO, value: number }

export interface INaoFornecimentoEpiLaborPerigoso {
    setValorEstimado(state: FormState, action: NaoFornacimentoEpiLaborPerigosoActions): FormState
}

export type NaoFornecimentoEpiLaborPerigosoError = {
    valor_estimado: boolean
}