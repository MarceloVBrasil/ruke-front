import { FormField, FormState, pedido_jornada_trabalho, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields"
import { horas_extras_nao_pagas, HorasExtrasNaoPagasActions, IHorasExtrasNaoPagas } from "./types"

export class HorasExtrasNaoPagas implements IHorasExtrasNaoPagas {
    setHorarioRealInicio(state: FormState, action: HorasExtrasNaoPagasActions) {
        if (action.type != 'SET_HORARIO_REAL_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS],
                        horario_real_inicio: action.value
                    } as horas_extras_nao_pagas
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setHorarioRealTermino(state: FormState, action: HorasExtrasNaoPagasActions) {
        if (action.type != 'SET_HORARIO_REAL_TERMINO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS],
                        horario_real_termino: action.value
                    } as horas_extras_nao_pagas
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setPeriodoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasActions) {
        if (action.type != 'SET_PERIODO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS],
                        periodo_nao_pagamento: action.value
                    } as horas_extras_nao_pagas
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setDataInicioNaoPagamento(state: FormState, action: HorasExtrasNaoPagasActions) {
        if (action.type != 'SET_DATA_INICIO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS],
                        data_inicio_nao_pagamento: action.value
                    } as horas_extras_nao_pagas
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setDataTerminoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasActions) {
        if (action.type != 'SET_DATA_TERMINO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS],
                        data_termino_nao_pagamento: action.value
                    } as horas_extras_nao_pagas
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadeHorasExtrasSemana(state: FormState, action: HorasExtrasNaoPagasActions) {
        if (action.type != 'SET_QUANTIDADE_HORAS_EXTRAS_SEMANA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS],
                        quantidade_horas_extras_semana: action.value
                    } as horas_extras_nao_pagas
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorEstimadoPedido(state: FormState, action: HorasExtrasNaoPagasActions) {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS],
                        valor_estimado_pedido: action.value
                    } as horas_extras_nao_pagas
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}