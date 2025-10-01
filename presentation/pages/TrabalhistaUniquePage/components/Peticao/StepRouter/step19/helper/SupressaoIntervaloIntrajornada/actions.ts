import { FormState, Action, FormField, pedido_jornada_trabalho, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields";
import { ISupressaoIntervaloIntrajornada, supressao_intervalo_intrajornada, SupressaoIntervaloIntrajornadaActions } from "./types";

export class SupressaoIntervaloIntrajornada implements ISupressaoIntervaloIntrajornada {
    setDuracaoIntervalo(state: FormState, action: SupressaoIntervaloIntrajornadaActions): FormState {
        if (action.type != 'SET_DURACAO_INTERVALO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    supressao_intervalo_intrajornada: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA],
                        duracao_intervalo: action.value
                    } as supressao_intervalo_intrajornada
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadePorSemanaIntervaloSuprimido(state: FormState, action: SupressaoIntervaloIntrajornadaActions): FormState {
        if (action.type != 'SET_QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    supressao_intervalo_intrajornada: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA],
                        quantidade_por_semana_intervalo_suprimido: action.value
                    } as supressao_intervalo_intrajornada
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadeHorasTotais(state: FormState, action: SupressaoIntervaloIntrajornadaActions): FormState {
        if (action.type != 'SET_QUANTIDADE_HORAS_TOTAIS') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    supressao_intervalo_intrajornada: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA],
                        quantidade_horas_totais: action.value
                    } as supressao_intervalo_intrajornada
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorEstimadoPedido(state: FormState, action: SupressaoIntervaloIntrajornadaActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    supressao_intervalo_intrajornada: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA],
                        valor_estimado_pedido: action.value
                    } as supressao_intervalo_intrajornada
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}