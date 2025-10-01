import { FormField, FormState } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_RAZAO_ESTABILIDADE', field: FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO, value: string }
    | { type: 'SET_DATA_INICIO', field: FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO, value: string }
    | { type: 'SET_DATA_TERMINO', field: FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO, value: string }
    | { type: 'SET_RECLAMANTE_ESTA_PERIODO_ESTABILIDADE', field: FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO, value: boolean }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO, value: number }

export interface IDemaisCampos {
    setRazaoEstabilidade(state: FormState, action: DemaisCamposActions): FormState
    setDataInicio(state: FormState, action: DemaisCamposActions): FormState
    setDataTermino(state: FormState, action: DemaisCamposActions): FormState
    setReclamanteEstaPeriodoEstabilidade(state: FormState, action: DemaisCamposActions): FormState
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    valor_estimado_pedido: boolean
    data_inicio: boolean
    data_termino: boolean
    reclamante_esta_periodo_estabilidade: boolean
    razao_estabilidade: boolean
}