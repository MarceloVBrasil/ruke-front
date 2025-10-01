import { FormField, FormState, pedido_ferias, PEDIDO_FERIAS } from "../FormTypesAndFields";
import { IPedidoFeriasNaoGozadas, pedido_ferias_nao_gozadas, PedidoFeriasNaoGozadasActions } from "./types";

export class PedidoFeriasNaoGozadas implements IPedidoFeriasNaoGozadas {
    setValorEstimadoPagamentoEmDobro(state: FormState, action: PedidoFeriasNaoGozadasActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DROBRO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ferias_nao_gozadas_pedido: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS],
                        valor_estimado_pagamento_em_dobro: action.value
                    } as pedido_ferias_nao_gozadas
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setPeriodosFerias(state: FormState, action: PedidoFeriasNaoGozadasActions): FormState {
        if (action.type != 'SET_PERIODOS_FERIAS') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ferias_nao_gozadas_pedido: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO],
                        periodos_ferias: action.value
                    } as pedido_ferias_nao_gozadas
                } as pedido_ferias,
                changed: true
            }
        }
    }

}