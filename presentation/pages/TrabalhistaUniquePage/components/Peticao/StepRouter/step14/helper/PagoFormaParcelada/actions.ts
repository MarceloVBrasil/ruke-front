import { FormField, FormState, PEDIDO_MULTA_477, pedido_multa_477 } from "../FormTypesAndFields";
import { IPagasFormaParceladaPedido, PagasFormaParceladaPedidoActions } from "./types";

export class PagasFormaParcelada implements IPagasFormaParceladaPedido {
    setProjecaoAvisoPrevio(state: FormState, action: PagasFormaParceladaPedidoActions): FormState {
        if (action.type != 'SET_PROJECAO_AVISO_PREVIO') return state

        return {
            ...state,
            [FormField.PEDIDO_MULTA_477]: {
                value: {
                    ...state[FormField.PEDIDO_MULTA_477].value,
                    pagas_forma_parcelada_pedido: {
                        ...state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO],
                        projecao_aviso_previo: action.value
                    }
                } as pedido_multa_477,
                changed: true
            }
        }
    }
    setDataProjecao(state: FormState, action: PagasFormaParceladaPedidoActions): FormState {
        if (action.type != 'SET_DATA_PROJECAO') return state

        return {
            ...state,
            [FormField.PEDIDO_MULTA_477]: {
                value: {
                    ...state[FormField.PEDIDO_MULTA_477].value,
                    pagas_forma_parcelada_pedido: {
                        ...state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO],
                        data_projecao: action.value
                    }
                } as pedido_multa_477,
                changed: true
            }
        }
    }
    setQuantidadeParcelas(state: FormState, action: PagasFormaParceladaPedidoActions): FormState {
        if (action.type != 'SET_QUANTIDADE_PARCELAS') return state

        return {
            ...state,
            [FormField.PEDIDO_MULTA_477]: {
                value: {
                    ...state[FormField.PEDIDO_MULTA_477].value,
                    pagas_forma_parcelada_pedido: {
                        ...state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO],
                        quantidade_parcelas: action.value
                    }
                } as pedido_multa_477,
                changed: true
            }
        }
    }

}