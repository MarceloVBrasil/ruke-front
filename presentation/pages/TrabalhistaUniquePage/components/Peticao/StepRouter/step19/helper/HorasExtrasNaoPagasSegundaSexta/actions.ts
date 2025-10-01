import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { horas_extras_nao_pagas_segunda_a_sexta, HorasExtrasNaoPagasSegundaSextaActions, IHorasNaoPagasSegundaSexta } from "./types";

export class HorasExtrasNaoPagasSegundaSexta implements IHorasNaoPagasSegundaSexta {
    setEmpregadorRealizavaControleDePonto(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState {
        if (action.type != 'SET_EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sexta: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA],
                        empregador_realizava_controle_de_ponto: action.value
                    } as horas_extras_nao_pagas_segunda_a_sexta
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setHorarioRealInicio(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState {
        if (action.type != 'SET_HORARIO_REAL_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sexta: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA],
                        horario_real_inicio: action.value
                    } as horas_extras_nao_pagas_segunda_a_sexta
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setHorarioRealTermino(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState {
        if (action.type != 'SET_HORARIO_REAL_TERMINO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sexta: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA],
                        horario_real_termino: action.value
                    } as horas_extras_nao_pagas_segunda_a_sexta
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setPeriodoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState {
        if (action.type != 'SET_PERIODO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sexta: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA],
                        periodo_nao_pagamento: action.value
                    } as horas_extras_nao_pagas_segunda_a_sexta
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setDataInicioNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState {
        if (action.type != 'SET_DATA_INICIO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sexta: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA],
                        data_inicio_nao_pagamento: action.value
                    } as horas_extras_nao_pagas_segunda_a_sexta
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setDataTerminoNaoPagamento(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState {
        if (action.type != 'SET_DATA_TERMINO_NAO_PAGAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sexta: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA],
                        data_termino_nao_pagamento: action.value
                    } as horas_extras_nao_pagas_segunda_a_sexta
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorEstimadoPedido(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sexta: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA],
                        valor_estimado_pedido: action.value
                    } as horas_extras_nao_pagas_segunda_a_sexta
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadeHorasExtrasSemanais(state: FormState, action: HorasExtrasNaoPagasSegundaSextaActions): FormState {
        if (action.type != 'SET_QUANTIDADE_HORAS_EXTRAS_SEMANAIS') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horas_extras_nao_pagas_segunda_a_sexta: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA],
                        quantidade_horas_extras_semanais: action.value
                    } as horas_extras_nao_pagas_segunda_a_sexta
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}