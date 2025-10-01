import { FormField, FormState } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_RAZOES'; field: FormField.ADCICIONAL_PERICULOSIDADE; value: { checked: boolean, value: string } }
    | { type: 'SET_COMPREENDE_TODO_CONTRATO'; field: FormField.ADCICIONAL_PERICULOSIDADE; value: boolean }
    | { type: 'SET_DATA_INICIO'; field: FormField.ADCICIONAL_PERICULOSIDADE; value: string }
    | { type: 'SET_DATA_FIM'; field: FormField.ADCICIONAL_PERICULOSIDADE; value: string }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO'; field: FormField.ADCICIONAL_PERICULOSIDADE; value: number }

export interface IDemaisCampos {
    setRazoes(state: FormState, action: DemaisCamposActions): FormState
    setCompreendeTodoContrato(state: FormState, action: DemaisCamposActions): FormState
    setDataInicio(state: FormState, action: DemaisCamposActions): FormState
    setDataFim(state: FormState, action: DemaisCamposActions): FormState
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    valor_estimado_pedido: boolean
}