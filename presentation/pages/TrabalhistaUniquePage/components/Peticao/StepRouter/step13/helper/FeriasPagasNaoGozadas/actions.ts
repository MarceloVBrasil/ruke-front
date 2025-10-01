import { FormField, FormState, pedido_ferias, PEDIDO_FERIAS } from "../FormTypesAndFields";
import { ferias_pagas_nao_gozadas, FeriasPagasNaoGozadasActions, IFeriasPagasNaoGozadas } from "./types";

export class FeriasPagasNaoGozadas implements IFeriasPagasNaoGozadas {
    setDataInicio(state: FormState, action: FeriasPagasNaoGozadasActions): FormState {
        if (action.type != 'SET_DATA_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ferias_pagas_nao_gozadas: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS],
                        data_inicio: action.value
                    } as ferias_pagas_nao_gozadas
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setDataFinal(state: FormState, action: FeriasPagasNaoGozadasActions): FormState {
        if (action.type != 'SET_DATA_FINAL') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ferias_pagas_nao_gozadas: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS],
                        data_final: action.value
                    } as ferias_pagas_nao_gozadas
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setValorEstimadoPagamentoEmDobro(state: FormState, action: FeriasPagasNaoGozadasActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    ferias_pagas_nao_gozadas: {
                        ...state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS],
                        valor_estimado_pagamento_em_dobro: action.value
                    } as ferias_pagas_nao_gozadas
                } as pedido_ferias,
                changed: true
            }
        }
    }

}