import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { IJornadaTrabalho_12_36, jornada_trabalho_12_36, JornadaTrabalho_12_36_Actions } from "./types";

export class JornadaTrabalho_12_36 implements IJornadaTrabalho_12_36 {
    setRealizavaHorasExtras(state: FormState, action: JornadaTrabalho_12_36_Actions): FormState {
        if (action.type != 'SET_REALIZAVA_HORAS_EXTRAS') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    jornada_trabalho_12_36: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36],
                        realizava_horas_extras: action.value
                    } as jornada_trabalho_12_36
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadeHorasExtrasPorDia(state: FormState, action: JornadaTrabalho_12_36_Actions): FormState {
        if (action.type != 'SET_QUANTIDADE_HORAS_EXTRAS_POR_DIA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    jornada_trabalho_12_36: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36],
                        quantidade_horas_extras_por_dia: action.value
                    } as jornada_trabalho_12_36
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadeHorasExtrasPorSemana(state: FormState, action: JornadaTrabalho_12_36_Actions): FormState {
        if (action.type != 'SET_QUANTIDADE_HORAS_EXTRAS_POR_SEMANA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    jornada_trabalho_12_36: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36],
                        quantidade_horas_extras_por_semana: action.value
                    } as jornada_trabalho_12_36
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setTotalHorasExtras(state: FormState, action: JornadaTrabalho_12_36_Actions): FormState {
        if (action.type != 'SET_TOTAL_HORAS_EXTRAS') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    jornada_trabalho_12_36: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36],
                        total_horas_extras: action.value
                    } as jornada_trabalho_12_36
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorEstimadoHorasExtras(state: FormState, action: JornadaTrabalho_12_36_Actions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_HORAS_EXTRAS') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    jornada_trabalho_12_36: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36],
                        valor_estimado_horas_extras: action.value
                    } as jornada_trabalho_12_36
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}