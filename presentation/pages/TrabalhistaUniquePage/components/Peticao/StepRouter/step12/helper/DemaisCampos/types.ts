import { FormField, FormState } from "../FormTypesAndFields"

export type DemaisCamposActions =
    | { type: 'SET_INTERROMPEU_ATIVIDADES', field: FormField.PEDIDO_RESCISAO_INDIRETA, value: boolean }
    | { type: 'SET_CONTINUA_TRABALHANDO', field: FormField.PEDIDO_RESCISAO_INDIRETA, value: boolean }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: FormField.PEDIDO_RESCISAO_INDIRETA, value: number }

export interface IDemaisCampos {
    setInterrompeuAtividades(state: FormState, action: DemaisCamposActions): FormState
    setContinuaTrabalhando(state: FormState, action: DemaisCamposActions): FormState
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    valor_estimado_pedido: boolean
    continua_trabalhando_ou_interrompeu_atividades: boolean
}