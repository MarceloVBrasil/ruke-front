import { FormField, FormState, PEDIDO_GORJETAS } from "../FormTypesAndFields";
import { IPagamentoRetidoPedido, pagamento_retido_pedido, PagamentoRetidoPedidoActions } from "./types";

export class PagamentoRetido implements IPagamentoRetidoPedido {
    setPercentualGorjetas(state: FormState, action: PagamentoRetidoPedidoActions): FormState {
        if (action.type != 'SET_PERCENTUAL_GORJETAS') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO]: {
                        ...state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO],
                        percentual_gorjetas: action.value
                    } as pagamento_retido_pedido,
                },
                changed: true
            }
        }
    }
    setPedidoRestituicao(state: FormState, action: PagamentoRetidoPedidoActions): FormState {
        if (action.type != 'SET_PEDIDO_RESTITUICAO') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO]: {
                        ...state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO],
                        pedido_restituicao: action.value
                    } as pagamento_retido_pedido,
                },
                changed: true
            }
        }
    }
    setValorMedioMensal(state: FormState, action: PagamentoRetidoPedidoActions): FormState {
        if (action.type != 'SET_VALOR_MEDIO_MENSAL') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO]: {
                        ...state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO],
                        valor_medio_mensal: action.value
                    } as pagamento_retido_pedido,
                },
                changed: true
            }
        }
    }
    setValorTotalEstimadoGorjetas(state: FormState, action: PagamentoRetidoPedidoActions): FormState {
        if (action.type != 'SET_VALOR_TOTAL_ESTIMADO_GORJETAS') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO]: {
                        ...state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO],
                        valor_total_estimado_gorjetas: action.value
                    } as pagamento_retido_pedido,
                },
                changed: true
            }
        }
    }

}