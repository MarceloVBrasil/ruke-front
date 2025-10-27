import { FormField, FormState, situacao_ferias_reclamante } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_PERIODO_DATA_INICIO', field: FormField.PEDIDO_FERIAS, value: string }
    | { type: 'SET_PERIODO_DATA_FINAL', field: FormField.PEDIDO_FERIAS, value: string }
    | { type: 'SET_SITUACAO_FERIAS_RECLAMANTE', field: FormField.PEDIDO_FERIAS, value: situacao_ferias_reclamante }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: FormField.PEDIDO_FERIAS, value: number }

export interface IDemaisCampos {
    setPeriodoDataInicio(state: FormState, action: DemaisCamposActions): FormState
    setPeriodoDataFinal(state: FormState, action: DemaisCamposActions): FormState
    setSituacaoFeriasReclamante(state: FormState, action: DemaisCamposActions): FormState
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    remuneracao: boolean
    data_inicial: boolean
}