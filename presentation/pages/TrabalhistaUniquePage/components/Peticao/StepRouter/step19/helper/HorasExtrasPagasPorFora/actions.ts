import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { horas_extras_pagas_por_fora, HorasExtrasPagasPorForaActions, IHorasExtrasPagasPorFora } from "./types";

export class HorasExtrasPagasPorFora implements IHorasExtrasPagasPorFora {
    setHorarioRealInicio(state: FormState, action: HorasExtrasPagasPorForaActions): FormState {
        if (action.type != 'SET_HORARIO_REAL_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_pagas_por_fora: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA],
                        horario_real_inicio: action.value
                    } as horas_extras_pagas_por_fora
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setHorarioRealTermino(state: FormState, action: HorasExtrasPagasPorForaActions): FormState {
        if (action.type != 'SET_HORARIO_REAL_TERMINO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_pagas_por_fora: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA],
                        horario_real_termino: action.value
                    } as horas_extras_pagas_por_fora
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorPagoPorFora(state: FormState, action: HorasExtrasPagasPorForaActions): FormState {
        if (action.type != 'SET_VALOR_PAGO_POR_FORA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_pagas_por_fora: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA],
                        valor_pago_por_fora: action.value
                    } as horas_extras_pagas_por_fora
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}