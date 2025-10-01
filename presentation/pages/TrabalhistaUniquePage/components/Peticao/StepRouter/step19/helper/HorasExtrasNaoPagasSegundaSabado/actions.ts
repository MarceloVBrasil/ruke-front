import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { horas_extras_nao_pagas_segunda_a_sabado, HorasExtrasNaoPagasSegundaSabadoActions, IHorasExtrasNaoPagasSegundaSabado } from "./types";

export class HorasExtrasNaoPagasSegundaSabado implements IHorasExtrasNaoPagasSegundaSabado {

    setHorarioContratualInicio(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions) {
        if (action.type != 'SET_HORARIO_CONTRATUAL_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sabado: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO],
                        horario_contratual_inicio: action.value
                    } as horas_extras_nao_pagas_segunda_a_sabado
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setHorarioContratualTermino(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState {
        if (action.type != 'SET_HORARIO_CONTRATUAL_TERMINO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sabado: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO],
                        horario_contratual_termino: action.value
                    } as horas_extras_nao_pagas_segunda_a_sabado
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setHorarioRealInicio(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState {
        if (action.type != 'SET_HORARIO_REAL_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sabado: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO],
                        horario_real_inicio: action.value
                    } as horas_extras_nao_pagas_segunda_a_sabado
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setHorarioRealTermino(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState {
        if (action.type != 'SET_HORARIO_REAL_TERMINO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sabado: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO],
                        horario_real_termino: action.value
                    } as horas_extras_nao_pagas_segunda_a_sabado
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setPeriodoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState {
        if (action.type != 'SET_PERIODO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sabado: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO],
                        periodo_nao_pagamento: action.value
                    } as horas_extras_nao_pagas_segunda_a_sabado
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setDataInicioNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState {
        if (action.type != 'SET_DATA_INICIO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sabado: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO],
                        data_inicio_nao_pagamento: action.value
                    } as horas_extras_nao_pagas_segunda_a_sabado
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setDataTerminoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState {
        if (action.type != 'SET_DATA_TERMINO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sabado: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO],
                        data_termino_nao_pagamento: action.value
                    } as horas_extras_nao_pagas_segunda_a_sabado
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadeHorasExtrasSemana(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState {
        if (action.type != 'SET_QUANTIDADE_HORAS_EXTRAS_SEMANA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sabado: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO],
                        quantidade_horas_extras_semana: action.value
                    } as horas_extras_nao_pagas_segunda_a_sabado
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorEstimadoPedido(state: FormState, action: HorasExtrasNaoPagasSegundaSabadoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sabado: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO],
                        valor_estimado_pedido: action.value
                    } as horas_extras_nao_pagas_segunda_a_sabado
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}