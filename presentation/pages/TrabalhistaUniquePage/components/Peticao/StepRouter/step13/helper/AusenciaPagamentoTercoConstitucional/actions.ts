import { FormField, FormState, pedido_ferias, PEDIDO_FERIAS } from "../FormTypesAndFields";
import { ausencia_pagamento_terco_constitucional, AusenciaPagamentoTercoConstitucionalActions, IAusenciaPagamentoTercoContitucional } from "./types";

export class AusenciaPagamentoTercoConstitucional implements IAusenciaPagamentoTercoContitucional {
    setDataInicio(state: FormState, action: AusenciaPagamentoTercoConstitucionalActions): FormState {
        if (action.type != 'SET_DATA_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ausencia_pagamento_terco_constitucional: {
                        ...state[FormField.PEDIDO_FERIAS].value[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL],
                        data_inicio: action.value
                    } as ausencia_pagamento_terco_constitucional
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setDataFinal(state: FormState, action: AusenciaPagamentoTercoConstitucionalActions): FormState {
        if (action.type != 'SET_DATA_FINAL') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ausencia_pagamento_terco_constitucional: {
                        ...state[FormField.PEDIDO_FERIAS].value[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL],
                        data_final: action.value
                    } as ausencia_pagamento_terco_constitucional
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setValorEstimadoPagamentoEmDobro(state: FormState, action: AusenciaPagamentoTercoConstitucionalActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ausencia_pagamento_terco_constitucional: {
                        ...state[FormField.PEDIDO_FERIAS].value[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL],
                        valor_estimado_pagamento_em_dobro: action.value
                    } as ausencia_pagamento_terco_constitucional
                } as pedido_ferias,
                changed: true
            }
        }
    }

}