import { FormField, FormState, PEDIDO_GORJETAS } from "../FormTypesAndFields";
import { IPagamentoPorFora, pagamento_por_fora_pedido, PagamentoPorForaActions } from "./types";

export class PagamentoPorFora implements IPagamentoPorFora {
    setValorMedio(state: FormState, action: PagamentoPorForaActions): FormState {
        if (action.type != 'SET_VALOR_MEDIO') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]: {
                        ...state[FormField.PEDIDO_GORJETAS].value[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO],
                        valor_medio: action.value
                    } as pagamento_por_fora_pedido,
                },
                changed: true
            }
        }
    }
    setPeriodo(state: FormState, action: PagamentoPorForaActions): FormState {
        if (action.type != 'SET_PERIODO') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]: {
                        ...state[FormField.PEDIDO_GORJETAS].value[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO],
                        periodo: action.value
                    } as pagamento_por_fora_pedido,
                },
                changed: true
            }
        }
    }
    setValorIntegradoSalario(state: FormState, action: PagamentoPorForaActions): FormState {
        if (action.type != 'SET_VALOR_INTEGRADO_SALARIO') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]: {
                        ...state[FormField.PEDIDO_GORJETAS].value[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO],
                        valor_integrado_salario: action.value
                    } as pagamento_por_fora_pedido,
                },
                changed: true
            }
        }
    }
    setDataInicial(state: FormState, action: PagamentoPorForaActions): FormState {
        if (action.type != 'SET_DATA_INICIAL') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]: {
                        ...state[FormField.PEDIDO_GORJETAS].value[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO],
                        data_inicial: action.value
                    } as pagamento_por_fora_pedido,
                },
                changed: true
            }
        }
    }
    setDataFinal(state: FormState, action: PagamentoPorForaActions): FormState {
        if (action.type != 'SET_DATA_FINAL') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]: {
                        ...state[FormField.PEDIDO_GORJETAS].value[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO],
                        data_final: action.value
                    } as pagamento_por_fora_pedido,
                },
                changed: true
            }
        }
    }
    setValorTotalEstimadoGorjetas(state: FormState, action: PagamentoPorForaActions): FormState {
        if (action.type != 'SET_VALOR_TOTAL_ESTIMADO_GORJETAS') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]: {
                        ...state[FormField.PEDIDO_GORJETAS].value[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO],
                        valor_total_estimado_gorjetas: action.value
                    } as pagamento_por_fora_pedido,
                },
                changed: true
            }
        }
    }

}