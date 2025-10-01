import { FormField, FormState } from "../FormTypesAndFields";
import { DiferencaSalarialActions, IDiferencaSalarial, pedido_diferenca_salarial, PEDIDO_DIFERENCA_SALARIAL } from "./types";

export class DiferencaSalarial implements IDiferencaSalarial {
    setAddParadigma(state: FormState, action: DiferencaSalarialActions): FormState {
        if (action.type != 'ADD_PARADIGMA') return state

        return {
            ...state,
            [FormField.PEDIDO_DIFERENCAS_SALARIAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value,
                    paradigmas: state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value && state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS] ? [...state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS], action.value] : [action.value],
                } as pedido_diferenca_salarial,
                changed: true
            }
        }
    }
    setEditParadigma(state: FormState, action: DiferencaSalarialActions): FormState {
        if (action.type != 'EDIT_PARADIGMA') return state

        return {
            ...state,
            [FormField.PEDIDO_DIFERENCAS_SALARIAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value,
                    paradigmas: [...action.value],
                } as pedido_diferenca_salarial,
                changed: true
            }
        }
    }
    setDeleteParadigma(state: FormState, action: DiferencaSalarialActions): FormState {
        if (action.type != 'DELETE_PARADIGMA') return state

        return {
            ...state,
            [FormField.PEDIDO_DIFERENCAS_SALARIAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value,
                    paradigmas: [...action.value],
                } as pedido_diferenca_salarial,
                changed: true
            }
        }
    }
    setValorEstimado(state: FormState, action: DiferencaSalarialActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_DIFERENCAS_SALARIAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value,
                    valor_estimado_pedido: action.value
                } as pedido_diferenca_salarial,
                changed: true
            }
        }
    }

}