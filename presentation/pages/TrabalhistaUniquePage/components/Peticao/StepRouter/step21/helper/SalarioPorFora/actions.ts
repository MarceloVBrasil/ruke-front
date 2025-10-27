import { FormField, FormState, PEDIDO_INTEGRACAO_SALARIAL } from "../FormTypesAndFields";
import { ISalarioPorFora, salario_por_fora, SALARIO_POR_FORA, SalarioPorForaActions } from "./types";

export class SalarioPorFora implements ISalarioPorFora {
    setDataInicio(state: FormState, action: SalarioPorForaActions): FormState {
        if (action.type !== 'SET_DATA_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    salario_por_fora: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.value?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA],
                        data_inicio: action.value
                    } as salario_por_fora
                },
                changed: true
            }
        }
    }
    setDataFim(state: FormState, action: SalarioPorForaActions): FormState {
        if (action.type !== 'SET_DATA_FIM') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    salario_por_fora: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.value?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA],
                        data_fim: action.value
                    } as salario_por_fora
                },
                changed: true
            }
        }
    }
    setValorMensalPedido(state: FormState, action: SalarioPorForaActions): FormState {
        if (action.type !== 'SET_VALOR_MENSAL_MEDIO') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    salario_por_fora: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.value?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA],
                        valor_mensal_medio: action.value
                    } as salario_por_fora
                },
                changed: true
            }
        }
    }
    setRubricaPorFora(state: FormState, action: SalarioPorForaActions): FormState {
        if (action.type !== 'SET_RUBRICA_POR_FORA') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    salario_por_fora: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.value?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA],
                        rubrica_por_fora: action.value
                    } as salario_por_fora
                },
                changed: true
            }
        }
    }
    setFormaPagamento(state: FormState, action: SalarioPorForaActions): FormState {
        if (action.type !== 'SET_FORMA_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    salario_por_fora: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.value?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA],
                        forma_pagamento: action.value
                    } as salario_por_fora
                },
                changed: true
            }
        }
    }
    setValorEstimadoPedido(state: FormState, action: SalarioPorForaActions): FormState {
        if (action.type !== 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    salario_por_fora: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.value?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA],
                        valor_estimado_pedido: action.value
                    } as salario_por_fora
                },
                changed: true
            }
        }
    }

}