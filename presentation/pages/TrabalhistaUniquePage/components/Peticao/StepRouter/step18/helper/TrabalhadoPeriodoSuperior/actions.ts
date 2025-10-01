import { FormField, FormState, pedido_aviso_previo, PEDIDO_AVISO_PREVIO } from "../FormTypesAndFields";
import { ITrabalhadoPeriodoSuperior30Dias, trabalhado_periodo_superior_30_dias, TrabalhadoPeriodoSuperior30DiasActions } from "./types";

export class TrabalhadoPeriodoSuperior30Dias implements ITrabalhadoPeriodoSuperior30Dias {
    setQuantidadeDiasEfetivamentePagos(state: FormState, action: TrabalhadoPeriodoSuperior30DiasActions): FormState {
        if (action.type != 'SET_QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    trabalhado_periodo_superior_30_dias: {
                        ...state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS],
                        quantidade_dias_efetivamente_pagos: action.value
                    } as trabalhado_periodo_superior_30_dias
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }
    setQuantidadeDiasFaltaramSerPagos(state: FormState, action: TrabalhadoPeriodoSuperior30DiasActions): FormState {
        if (action.type != 'SET_QUANTIDADE_DIAS_FALTARAM_SER_PAGOS') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    trabalhado_periodo_superior_30_dias: {
                        ...state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS],
                        quantidade_dias_faltaram_ser_pagos: action.value
                    } as trabalhado_periodo_superior_30_dias
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }
    setValorEstimado(state: FormState, action: TrabalhadoPeriodoSuperior30DiasActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    trabalhado_periodo_superior_30_dias: {
                        ...state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS],
                        valor_estimado: action.value
                    } as trabalhado_periodo_superior_30_dias
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }

}