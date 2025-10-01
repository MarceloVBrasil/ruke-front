import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { ISupressaoIntervaloInterjornada, supressao_intervalo_interjornada, SupressaoIntervaloInterjornadaActions } from "./types";

export class SupressaoIntervaloInterjornada implements ISupressaoIntervaloInterjornada {
    setMediaIntervalo(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState {
        if (action.type != 'SET_MEDIA_INTERVALO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    supressao_intervalo_interjornada: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA],
                        media_intervalo: action.value
                    } as supressao_intervalo_interjornada
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadeHorasIntervaloAteFim(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState {
        if (action.type != 'SET_QUANTIDADE_HORAS_INTERVALO_ATE_FIM') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    supressao_intervalo_interjornada: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA],
                        quantidade_horas_intervalo_ate_fim: action.value
                    } as supressao_intervalo_interjornada
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setIntervaloTrabalhoReclamante(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState {
        if (action.type != 'SET_INTERVALO_TRABALHO_RECLAMANTE') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    supressao_intervalo_interjornada: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA],
                        intervalo_trabalho_reclamante: action.value
                    } as supressao_intervalo_interjornada
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadePorSemanaTrabalhoSuprimido(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState {
        if (action.type != 'SET_QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    supressao_intervalo_interjornada: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA],
                        quantidade_por_semana_intervalo_suprimido: action.value
                    } as supressao_intervalo_interjornada
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadeHorasDuranteSemana(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState {
        if (action.type != 'SET_QUANTIDADE_HORAS_DURANTE_SEMANA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    supressao_intervalo_interjornada: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA],
                        quantidade_horas_durante_semana: action.value
                    } as supressao_intervalo_interjornada
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorEstimadoPedido(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    supressao_intervalo_interjornada: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA],
                        valor_estimado_pedido: action.value
                    } as supressao_intervalo_interjornada
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}