import { FormField, FormState, pedido_gratuidade_justica } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setReclamanteDesempregado(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RECLAMANTE_DESEMPREGADO') return state

        return {
            ...state,
            [FormField.PEDIDO_GRATUIDADE_JUSTICA]: {
                value: {
                    ...state[FormField.PEDIDO_GRATUIDADE_JUSTICA].value,
                    reclamante_desempregado: action.value
                } as pedido_gratuidade_justica,
                changed: true
            }
        }
    }
    setRendaInferiorReclamante(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RENDA_INFERIOR_RECLAMANTE') return state

        return {
            ...state,
            [FormField.PEDIDO_GRATUIDADE_JUSTICA]: {
                value: {
                    ...state[FormField.PEDIDO_GRATUIDADE_JUSTICA].value,
                    renda_inferior_reclamante: action.value
                } as pedido_gratuidade_justica,
                changed: true
            }
        }
    }
    setRendaAtualReclamante(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RENDA_ATUAL_RECLAMANTE') return state

        return {
            ...state,
            [FormField.PEDIDO_GRATUIDADE_JUSTICA]: {
                value: {
                    ...state[FormField.PEDIDO_GRATUIDADE_JUSTICA].value,
                    renda_atual_reclamante: action.value
                } as pedido_gratuidade_justica,
                changed: true
            }
        }
    }
    setGastosMensaisReclamante(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_GASTOS_MENSAIS_RECLAMANTE') return state

        return {
            ...state,
            [FormField.PEDIDO_GRATUIDADE_JUSTICA]: {
                value: {
                    ...state[FormField.PEDIDO_GRATUIDADE_JUSTICA].value,
                    gastos_mensais_reclamante: action.value
                } as pedido_gratuidade_justica,
                changed: true
            }
        }
    }
    setReclamanteTemCondicoesCustosProcessuais(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RECLAMANTE_TEM_CONDICOES_CUSTOS_PROCESSUAIS') return state

        return {
            ...state,
            [FormField.PEDIDO_GRATUIDADE_JUSTICA]: {
                value: {
                    ...state[FormField.PEDIDO_GRATUIDADE_JUSTICA].value,
                    reclamante_nao_tem_condicoes: action.value
                } as pedido_gratuidade_justica,
                changed: true
            }
        }
    }

}