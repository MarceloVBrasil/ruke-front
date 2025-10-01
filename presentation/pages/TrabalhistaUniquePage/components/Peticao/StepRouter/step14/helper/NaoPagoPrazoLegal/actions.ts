import { FormField, FormState, pedido_multa_477, PEDIDO_MULTA_477 } from "../FormTypesAndFields";
import { INaoPagasDentroPrazoLegal, NaoPagasDentroPrazoLegalActions } from "./types";

export class NaoPagasDentroPrazoLegal implements INaoPagasDentroPrazoLegal {
    setProjecaoAvisoPrevio(state: FormState, action: NaoPagasDentroPrazoLegalActions): FormState {
        if (action.type != 'SET_PROJECAO_AVISO_PREVIO') return state

        return {
            ...state,
            [FormField.PEDIDO_MULTA_477]: {
                value: {
                    ...state[FormField.PEDIDO_MULTA_477].value,
                    nao_pagas_dentro_prazo_legal: {
                        ...state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL],
                        projecao_aviso_previo: action.value
                    }
                } as pedido_multa_477,
                changed: true
            }
        }
    }
    setDataProjecao(state: FormState, action: NaoPagasDentroPrazoLegalActions): FormState {
        if (action.type != 'SET_DATA_PROJECAO') return state

        return {
            ...state,
            [FormField.PEDIDO_MULTA_477]: {
                value: {
                    ...state[FormField.PEDIDO_MULTA_477].value,
                    nao_pagas_dentro_prazo_legal: {
                        ...state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL],
                        data_projecao: action.value
                    }
                } as pedido_multa_477,
                changed: true
            }
        }
    }

}