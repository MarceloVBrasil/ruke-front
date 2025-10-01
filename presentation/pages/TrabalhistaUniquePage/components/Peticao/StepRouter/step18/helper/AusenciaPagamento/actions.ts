import { FormField, FormState, pedido_aviso_previo, PEDIDO_AVISO_PREVIO } from "../FormTypesAndFields";
import { ausencia_pagamento, AusenciaPagamentoActions, IAusenciaPagamento } from "./types";

export class AusenciaPagamento implements IAusenciaPagamento {
    setQuantidadeDiasDeveriamSerPagos(state: FormState, action: AusenciaPagamentoActions): FormState {
        if (action.type != 'SET_QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    ausencia_pagamento: {
                        ...state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO],
                        quantidade_dias_deveriam_ser_pagos: action.value
                    } as ausencia_pagamento
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }
    setValorEstimado(state: FormState, action: AusenciaPagamentoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    ausencia_pagamento: {
                        ...state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO],
                        valor_estimado: action.value
                    } as ausencia_pagamento
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }

}