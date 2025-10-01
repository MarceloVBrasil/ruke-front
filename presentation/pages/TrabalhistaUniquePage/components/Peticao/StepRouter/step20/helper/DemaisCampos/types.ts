import { FormField, FormState } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_HIPOTESES', field: FormField.PEDIDO_DANOS_MORAIS, value: { checked: boolean, value: string } }

export interface IDemaisCampos {
    setHipoteses(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    hipoteses: boolean
}