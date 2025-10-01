import { FormField, FormState } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_PAGAMENTO_POR_FORA', field: FormField.PEDIDO_GORJETAS, value: boolean }
    | { type: 'SET_PAGAMENTO_RETIDO', field: FormField.PEDIDO_GORJETAS, value: boolean }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: FormField.PEDIDO_GORJETAS, value: number }

export interface IDemaisCampos {
    setPagamentoPorFora(state: FormState, action: DemaisCamposActions): FormState
    setPagamentoRetido(state: FormState, action: DemaisCamposActions): FormState
    setValorEstimado(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    valor_estimado_pedido: boolean
}