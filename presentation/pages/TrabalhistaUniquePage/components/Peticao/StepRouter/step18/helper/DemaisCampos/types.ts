import { FormField, FormState, fundamento } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_DATA_DISPENSA_SEM_JUSTA_CAUSA', field: FormField.PEDIDO_AVISO_PREVIO, value: string }
    | { type: 'SET_QUANTIDADE_DIAS_AVISO_PREVIO', field: FormField.PEDIDO_AVISO_PREVIO, value: number }
    | { type: 'SET_FUNDAMENTO', field: FormField.PEDIDO_AVISO_PREVIO, value: fundamento }

export interface IDemaisCampos {
    setDataDispensaSemJustaCausa(state: FormState, action: DemaisCamposActions): FormState
    setQuantidadeDiasAvisoPrevio(state: FormState, action: DemaisCamposActions): FormState
    setFundamento(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    fundamento: boolean
    data_dispensa_sem_justa_causa: boolean
    quantidade_dias_aviso_previo: boolean
}