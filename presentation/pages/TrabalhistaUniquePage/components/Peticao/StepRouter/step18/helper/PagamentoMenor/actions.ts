import { FormField, FormState, pedido_aviso_previo, PEDIDO_AVISO_PREVIO } from "../FormTypesAndFields";
import { IPagamentoAMenor, pagamento_a_menor, PagamentoAMenorActions } from "./types";

export class PagamentoAMenor implements IPagamentoAMenor {
    setQuantidadeDiasFaltaramSerPagos(state: FormState, action: PagamentoAMenorActions): FormState {
        if (action.type != 'SET_QUANTIDADE_DIAS_FALTARAM_SER_PAGOS') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    pagamento_a_menor: {
                        ...state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR],
                        quantidade_dias_faltaram_ser_pagos: action.value
                    } as pagamento_a_menor
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }
    setValorEstimado(state: FormState, action: PagamentoAMenorActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    pagamento_a_menor: {
                        ...state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR],
                        valor_estimado: action.value
                    } as pagamento_a_menor
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }

}