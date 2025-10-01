import { FormField, FormState } from "../FormTypesAndFields";
import { ISalarioSubstituicao, pedido_salario_substituicao, SalarioSubstituicaoActions } from "./types";

export class SalarioSubstituicao implements ISalarioSubstituicao {
    setNomeEmpregadoSubstituido(state: FormState, action: SalarioSubstituicaoActions): FormState {
        if (action.type != 'SET_NOME_EMPREGADO_SUBSTITUIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_SALARIO_SUBSTITUICAO]: {
                value: {
                    ...state[FormField.PEDIDO_SALARIO_SUBSTITUICAO].value,
                    nome_empregado_substituido: action.value
                } as pedido_salario_substituicao,
                changed: true
            }
        }
    }
    setCargoEmpregadoSubstituido(state: FormState, action: SalarioSubstituicaoActions): FormState {
        if (action.type != 'SET_CARGO_EMPREGADO_SUBSTITUIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_SALARIO_SUBSTITUICAO]: {
                value: {
                    ...state[FormField.PEDIDO_SALARIO_SUBSTITUICAO].value,
                    cargo_empregado_substituido: action.value
                } as pedido_salario_substituicao,
                changed: true
            }
        }
    }
    setMotivoSubstituicao(state: FormState, action: SalarioSubstituicaoActions): FormState {
        if (action.type != 'SET_MOTIVO_SUBSTITUICAO') return state

        return {
            ...state,
            [FormField.PEDIDO_SALARIO_SUBSTITUICAO]: {
                value: {
                    ...state[FormField.PEDIDO_SALARIO_SUBSTITUICAO].value,
                    motivo_substituicao: action.value
                } as pedido_salario_substituicao,
                changed: true
            }
        }
    }
    setDataInicial(state: FormState, action: SalarioSubstituicaoActions): FormState {
        if (action.type != 'SET_DATA_INICIAL') return state

        return {
            ...state,
            [FormField.PEDIDO_SALARIO_SUBSTITUICAO]: {
                value: {
                    ...state[FormField.PEDIDO_SALARIO_SUBSTITUICAO].value,
                    data_inicial: action.value
                } as pedido_salario_substituicao,
                changed: true
            }
        }
    }
    setDataFinal(state: FormState, action: SalarioSubstituicaoActions): FormState {
        if (action.type != 'SET_DATA_FINAL') return state

        return {
            ...state,
            [FormField.PEDIDO_SALARIO_SUBSTITUICAO]: {
                value: {
                    ...state[FormField.PEDIDO_SALARIO_SUBSTITUICAO].value,
                    data_final: action.value
                } as pedido_salario_substituicao,
                changed: true
            }
        }
    }
    setValorSalarioEmpregadoSubstituido(state: FormState, action: SalarioSubstituicaoActions): FormState {
        if (action.type != 'SET_VALOR_SALARIO_EMPREGADO_SUBSTITUIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_SALARIO_SUBSTITUICAO]: {
                value: {
                    ...state[FormField.PEDIDO_SALARIO_SUBSTITUICAO].value,
                    valor_salario_empregado_substituido: action.value
                } as pedido_salario_substituicao,
                changed: true
            }
        }
    }
    setValorEstimado(state: FormState, action: SalarioSubstituicaoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_SALARIO_SUBSTITUICAO]: {
                value: {
                    ...state[FormField.PEDIDO_SALARIO_SUBSTITUICAO].value,
                    valor_estimado_pedido: action.value
                } as pedido_salario_substituicao,
                changed: true
            }
        }
    }

}