import { FormField, FormState, pedido_multa_477, PEDIDO_MULTA_477 } from "../FormTypesAndFields";
import { IPagasForaPrazoLegalPedido, PagasForaDoPrazoLegalPedidoActions } from "./types";

export class PagasForaPrazoLegal implements IPagasForaPrazoLegalPedido {
    setProjecaoAvisoPrevio(state: FormState, action: PagasForaDoPrazoLegalPedidoActions): FormState {
        if (action.type != 'SET_PROJECAO_AVISO_PREVIO') return state

        return {
            ...state,
            [FormField.PEDIDO_MULTA_477]: {
                value: {
                    ...state[FormField.PEDIDO_MULTA_477].value,
                    pagas_fora_do_prazo_legal_pedido: {
                        ...state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO],
                        projecao_aviso_previo: action.value
                    }
                } as pedido_multa_477,
                changed: true
            }
        }
    }
    setDataProjecao(state: FormState, action: PagasForaDoPrazoLegalPedidoActions): FormState {
        if (action.type != 'SET_DATA_PROJECAO') return state

        return {
            ...state,
            [FormField.PEDIDO_MULTA_477]: {
                value: {
                    ...state[FormField.PEDIDO_MULTA_477].value,
                    pagas_fora_do_prazo_legal_pedido: {
                        ...state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO],
                        data_projecao: action.value
                    }
                } as pedido_multa_477,
                changed: true
            }
        }
    }
    setDataPagamento(state: FormState, action: PagasForaDoPrazoLegalPedidoActions): FormState {
        if (action.type != 'SET_DATA_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_MULTA_477]: {
                value: {
                    ...state[FormField.PEDIDO_MULTA_477].value,
                    pagas_fora_do_prazo_legal_pedido: {
                        ...state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO],
                        data_pagamento_verbas: action.value
                    }
                } as pedido_multa_477,
                changed: true
            }
        }
    }

}