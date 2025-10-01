import { FormField, FormState } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_RECLAMANTE_DESEMPREGADO', field: FormField.PEDIDO_GRATUIDADE_JUSTICA, value: boolean }
    | { type: 'SET_RENDA_INFERIOR_RECLAMANTE', field: FormField.PEDIDO_GRATUIDADE_JUSTICA, value: boolean }
    | { type: 'SET_RENDA_ATUAL_RECLAMANTE', field: FormField.PEDIDO_GRATUIDADE_JUSTICA, value: number }
    | { type: 'SET_GASTOS_MENSAIS_RECLAMANTE', field: FormField.PEDIDO_GRATUIDADE_JUSTICA, value: number }
    | { type: 'SET_RECLAMANTE_TEM_CONDICOES_CUSTOS_PROCESSUAIS', field: FormField.PEDIDO_GRATUIDADE_JUSTICA, value: boolean }

export interface IDemaisCampos {
    setReclamanteDesempregado(state: FormState, action: DemaisCamposActions): FormState
    setRendaInferiorReclamante(state: FormState, action: DemaisCamposActions): FormState
    setRendaAtualReclamante(state: FormState, action: DemaisCamposActions): FormState
    setGastosMensaisReclamante(state: FormState, action: DemaisCamposActions): FormState
    setReclamanteTemCondicoesCustosProcessuais(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    reclamante_desempregado: boolean
}