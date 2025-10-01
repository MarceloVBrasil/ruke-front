import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum EXCESSO_HORAS_EXTRAS {
    VALOR_ESTIMADO = "valor_estimado"
}

export type excesso_horas_extras = {
    [EXCESSO_HORAS_EXTRAS.VALOR_ESTIMADO]: null | number
}

export type ExcessoHorasExtrasActions =
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.EXCESSO_HORAS_EXTRAS, value: number }

export interface IExcessoHorasExtras {
    setValorEstimado(state: FormState, action: ExcessoHorasExtrasActions): FormState
}

export type ExcessoHorasExtrasError = {
    valor_estimado: boolean
}