import { FormField, FormState } from "../FormTypesAndFields";
import { AcumuloFuncaoActions, IAcumuloFuncao, pedido_acumulo_funcao } from "./types";

export class AcumuloFuncao implements IAcumuloFuncao {
    setDataInicial(state: FormState, action: AcumuloFuncaoActions): FormState {
        if (action.type != 'SET_DATA_INICIAL') return state

        return {
            ...state,
            [FormField.PEDIDO_ACUMULO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_ACUMULO_FUNCAO].value,
                    data_inicial: action.value
                } as pedido_acumulo_funcao,
                changed: true
            }
        }
    }
    setDataFinal(state: FormState, action: AcumuloFuncaoActions): FormState {
        if (action.type != 'SET_DATA_FINAL') return state

        return {
            ...state,
            [FormField.PEDIDO_ACUMULO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_ACUMULO_FUNCAO].value,
                    data_final: action.value
                } as pedido_acumulo_funcao,
                changed: true
            }
        }
    }
    setCargoOcupado(state: FormState, action: AcumuloFuncaoActions): FormState {
        if (action.type != 'SET_CARGO_OCUPADO') return state

        return {
            ...state,
            [FormField.PEDIDO_ACUMULO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_ACUMULO_FUNCAO].value,
                    cargo_ocupado: action.value
                } as pedido_acumulo_funcao,
                changed: true
            }
        }
    }
    setFuncaoAcumulada(state: FormState, action: AcumuloFuncaoActions): FormState {
        if (action.type != 'SET_FUNCAO_ACUMULADA') return state

        return {
            ...state,
            [FormField.PEDIDO_ACUMULO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_ACUMULO_FUNCAO].value,
                    funcao_acumulada: action.value
                } as pedido_acumulo_funcao,
                changed: true
            }
        }
    }
    setAtividadesCargoAcumulado(state: FormState, action: AcumuloFuncaoActions): FormState {
        if (action.type != 'SET_ATIVIDADES_CARGO_ACUMULADO') return state

        return {
            ...state,
            [FormField.PEDIDO_ACUMULO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_ACUMULO_FUNCAO].value,
                    atividades_cargo_acumulado: action.value
                } as pedido_acumulo_funcao,
                changed: true
            }
        }
    }
    setValorEstimado(state: FormState, action: AcumuloFuncaoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_ACUMULO_FUNCAO]: {
                value: {
                    ...state[FormField.PEDIDO_ACUMULO_FUNCAO].value,
                    valor_estimado_pedido: action.value
                } as pedido_acumulo_funcao,
                changed: true
            }
        }
    }

}