import { FormField, FormState } from "../FormTypesAndFields";
import { DesvioFuncaoActions, IDesvioFuncao, PEDIDO_DESVIO_FUNCAO, pedido_desvio_funcao } from "./types";

export class DesvioFuncao implements IDesvioFuncao {
    setAddDesvio(state: FormState, action: DesvioFuncaoActions): FormState {
        if (action.type != 'ADD_INTERVALO') return state

        return {
            ...state,
            [FormField.PEDIDO_DESVIO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_DESVIO_FUNCAO].value,
                    intervalos: state[FormField.PEDIDO_DESVIO_FUNCAO].value && state[FormField.PEDIDO_DESVIO_FUNCAO].value[PEDIDO_DESVIO_FUNCAO.INTERVALOS] ? [...state[FormField.PEDIDO_DESVIO_FUNCAO].value[PEDIDO_DESVIO_FUNCAO.INTERVALOS], action.value] : [action.value],
                } as pedido_desvio_funcao,
                changed: true
            }
        }
    }
    setEditDesvio(state: FormState, action: DesvioFuncaoActions): FormState {
        if (action.type != 'EDIT_INTERVALO') return state

        return {
            ...state,
            [FormField.PEDIDO_DESVIO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_DESVIO_FUNCAO].value,
                    intervalos: [...action.value],
                } as pedido_desvio_funcao,
                changed: true
            }
        }
    }
    setDeleteDesvio(state: FormState, action: DesvioFuncaoActions): FormState {
        if (action.type != 'DELETE_INTERVALO') return state

        return {
            ...state,
            [FormField.PEDIDO_DESVIO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_DESVIO_FUNCAO].value,
                    intervalos: [...action.value],
                } as pedido_desvio_funcao,
                changed: true
            }
        }
    }
    setTodoContrato(state: FormState, action: DesvioFuncaoActions): FormState {
        if (action.type != 'SET_TODO_CONTRATO') return state

        const checked = action.value

        if (!checked)
            return {
                ...state,
                [FormField.PEDIDO_DESVIO_FUNCAO]: {
                    value: {
                        ...state[FormField.PEDIDO_DESVIO_FUNCAO].value,
                        todo_contrato: action.value,
                    } as pedido_desvio_funcao,
                    changed: true
                }
            }
        else return {
            ...state,
            [FormField.PEDIDO_DESVIO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_DESVIO_FUNCAO].value,
                    todo_contrato: action.value,
                    // intervalos: null
                } as pedido_desvio_funcao,
                changed: true
            }
        }
    }
    setFundamento(state: FormState, action: DesvioFuncaoActions): FormState {
        if (action.type != 'SET_FUNDAMENTO') return state
        const checked = action.value.checked
        const fundamento = action.value.value
        const fundamentos = state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.FUNDAMENTO] ?? []

        if (checked) {
            fundamentos.push(fundamento)
            return {
                ...state,
                [FormField.PEDIDO_DESVIO_FUNCAO]: {
                    value: {
                        ...state[FormField.PEDIDO_DESVIO_FUNCAO].value,
                        fundamento: fundamentos
                    } as pedido_desvio_funcao,
                    changed: true
                }
            }
        } else {
            return {
                ...state,
                [FormField.PEDIDO_DESVIO_FUNCAO]: {
                    value: {
                        ...state[FormField.PEDIDO_DESVIO_FUNCAO].value,
                        fundamento: fundamentos.filter(f => f != fundamento)
                    } as pedido_desvio_funcao,
                    changed: true
                }
            }
        }
    }
    setOutroFundamento(state: FormState, action: DesvioFuncaoActions): FormState {
        if (action.type != 'SET_OUTRO_FUNDAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_DESVIO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_DESVIO_FUNCAO].value,
                    outros_fundamentos: action.value
                } as pedido_desvio_funcao,
                changed: true
            }
        }
    }
    setValorEstimado(state: FormState, action: DesvioFuncaoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_DESVIO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_DESVIO_FUNCAO].value,
                    valor_estimado_pedido: action.value
                } as pedido_desvio_funcao,
                changed: true
            }
        }
    }

}