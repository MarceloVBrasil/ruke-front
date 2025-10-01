import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { INaoPagamentoVerbasRescisorias, nao_pagamento_verbas_rescisorias, NaoPagamentoVerbasRescisoriasActions } from "./types";

export class NaoPagamentoVerbasRescisorias implements INaoPagamentoVerbasRescisorias {
    setValorEstimado(state: FormState, action: NaoPagamentoVerbasRescisoriasActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    nao_pagamento_verbas_rescisorias: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS],
                        valor_estimado: action.value
                    } as nao_pagamento_verbas_rescisorias
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setDataProjecaoTermino(state: FormState, action: NaoPagamentoVerbasRescisoriasActions): FormState {
        if (action.type != 'SET_DATA_PROJECAO_TERMINO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    nao_pagamento_verbas_rescisorias: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS],
                        data_projecao_termino: action.value
                    } as nao_pagamento_verbas_rescisorias
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}