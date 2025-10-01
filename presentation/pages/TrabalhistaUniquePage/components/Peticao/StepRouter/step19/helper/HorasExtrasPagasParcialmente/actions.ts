import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { horas_extras_pagas_parcialmente, HorasExtrasPagasParcialmenteActions, IHorasPagasParcialmente } from "./types";

export class HorasExtrasPagasParcialmente implements IHorasPagasParcialmente {
    setHorarioRealInicio(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState {
        if (action.type != 'SET_HORARIO_REAL_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_pagas_parcialmente: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE],
                        horario_real_inicio: action.value
                    } as horas_extras_pagas_parcialmente
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setHorarioRealTermino(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState {
        if (action.type != 'SET_HORARIO_REAL_TERMINO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_pagas_parcialmente: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE],
                        horario_real_termino: action.value
                    } as horas_extras_pagas_parcialmente
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadeHorasExtrasPagas(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState {
        if (action.type != 'SET_QUANTIDADE_HORAS_EXTRAS_PAGAS') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_pagas_parcialmente: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE],
                        quantidade_horas_extras_pagas: action.value
                    } as horas_extras_pagas_parcialmente
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadeHorasExtrasRealizadasSemana(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState {
        if (action.type != 'SET_QUANTIDADE_HORAS_EXTRAS_REALIZADAS_SEMANA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_pagas_parcialmente: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE],
                        quantidade_horas_extras_realizadas_semana: action.value
                    } as horas_extras_pagas_parcialmente
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setPeriodoNaoPagamento(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState {
        if (action.type != 'SET_PERIODO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_pagas_parcialmente: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE],
                        periodo_nao_pagamento: action.value
                    } as horas_extras_pagas_parcialmente
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setDataInicioNaoPagamento(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState {
        if (action.type != 'SET_DATA_INICIO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_pagas_parcialmente: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE],
                        data_inicio_nao_pagamento: action.value
                    } as horas_extras_pagas_parcialmente
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setDataTerminoNaoPagamento(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState {
        if (action.type != 'SET_DATA_TERMINO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_pagas_parcialmente: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE],
                        data_termino_nao_pagamento: action.value
                    } as horas_extras_pagas_parcialmente
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorEstimadoPedido(state: FormState, action: HorasExtrasPagasParcialmenteActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_pagas_parcialmente: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE],
                        valor_estimado_pedido: action.value
                    } as horas_extras_pagas_parcialmente
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}