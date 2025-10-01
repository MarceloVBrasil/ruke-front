import { FormField, FormState } from "../FormTypesAndFields";
import { ActCctActions, IActCct, PEDIDO_ACT_CCT, pedido_act_cct } from "./types";

export class ActCct implements IActCct {
    setAddFuncao(state: FormState, action: ActCctActions): FormState {
        if (action.type != 'ADD_FUNCAO') return state

        return {
            ...state,
            [FormField.PEDIDO_ACT_CCT]: {
                value: {
                    ...state[FormField.PEDIDO_ACT_CCT].value,
                    cargos: state[FormField.PEDIDO_ACT_CCT].value?.[PEDIDO_ACT_CCT.CARGOS] ? [...state[FormField.PEDIDO_ACT_CCT].value?.[PEDIDO_ACT_CCT.CARGOS], action.value] : [action.value]
                } as pedido_act_cct,
                changed: true
            }
        }
    }
    setEditFuncao(state: FormState, action: ActCctActions): FormState {
        if (action.type != 'EDIT_FUNCAO') return state

        return {
            ...state,
            [FormField.PEDIDO_ACT_CCT]: {
                value: {
                    ...state[FormField.PEDIDO_ACT_CCT].value,
                    cargos: action.value
                } as pedido_act_cct,
                changed: true
            }
        }
    }
    setDeleteFuncao(state: FormState, action: ActCctActions): FormState {
        if (action.type != 'DELETE_FUNCAO') return state

        return {
            ...state,
            [FormField.PEDIDO_ACT_CCT]: {
                value: {
                    ...state[FormField.PEDIDO_ACT_CCT].value,
                    cargos: action.value
                } as pedido_act_cct,
                changed: true
            }
        }
    }
    setValorEstimado(state: FormState, action: ActCctActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_ACT_CCT]: {
                value: {
                    ...state[FormField.PEDIDO_ACT_CCT].value,
                    valor_estimado_pedido: action.value
                } as pedido_act_cct,
                changed: true
            }
        }
    }

}