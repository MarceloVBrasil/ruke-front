import { FormField, FormState, pedido_ferias, PEDIDO_FERIAS } from "../FormTypesAndFields";
import { IPagamentoIntempestivoFerias, pagamento_intempestivo_ferias, PagamentoIntempestivoFeriasActions } from "./types";

export class PagamentoIntempestivoFerias implements IPagamentoIntempestivoFerias {
    setDataInicio(state: FormState, action: PagamentoIntempestivoFeriasActions): FormState {
        if (action.type != 'SET_DATA_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    pagamento_intempestivo_ferias: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS],
                        data_inicio: action.value
                    } as pagamento_intempestivo_ferias
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setDataPagamentoRealizado(state: FormState, action: PagamentoIntempestivoFeriasActions): FormState {
        if (action.type != 'SET_DATA_PAGAMENTO_REALIZADO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    pagamento_intempestivo_ferias: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS],
                        data_pagamento_realizado: action.value
                    } as pagamento_intempestivo_ferias
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setValorEstimadoPagamentoEmDobro(state: FormState, action: PagamentoIntempestivoFeriasActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    pagamento_intempestivo_ferias: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS],
                        valor_estimado_pagamento_em_dobro: action.value
                    } as pagamento_intempestivo_ferias
                } as pedido_ferias,
                changed: true
            }
        }
    }

}