import { FormField, FormState, pedido_ferias, PEDIDO_FERIAS } from "../FormTypesAndFields";
import { IPedidoFeriasInterrompidasInjustamente, pedido_ferias_interrompidas_injustamente, PedidoFeriasInterrompidasInjustamenteActions } from "./types";

export class PedidoFeriasInterrompidasInjustamente implements IPedidoFeriasInterrompidasInjustamente {
    setDataInicio(state: FormState, action: PedidoFeriasInterrompidasInjustamenteActions): FormState {
        if (action.type != 'SET_DATA_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ferias_interrompidas_injustamente_pedido: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO],
                        data_inicio: action.value
                    } as pedido_ferias_interrompidas_injustamente
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setDataFinal(state: FormState, action: PedidoFeriasInterrompidasInjustamenteActions): FormState {
        if (action.type != 'SET_DATA_FINAL') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ferias_interrompidas_injustamente_pedido: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO],
                        data_final: action.value
                    } as pedido_ferias_interrompidas_injustamente
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setInterrupcaoFerias(state: FormState, action: PedidoFeriasInterrompidasInjustamenteActions): FormState {
        if (action.type != 'SET_INTERRUPCAO_FERIAS') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ferias_interrompidas_injustamente_pedido: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO],
                        interrupcao_ferias: action.value
                    } as pedido_ferias_interrompidas_injustamente
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setValorEstimadoPagamentoEmDoro(state: FormState, action: PedidoFeriasInterrompidasInjustamenteActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ferias_interrompidas_injustamente_pedido: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO],
                        valor_estimado_pagamento_em_dobro: action.value
                    } as pedido_ferias_interrompidas_injustamente
                } as pedido_ferias,
                changed: true
            }
        }
    }

}