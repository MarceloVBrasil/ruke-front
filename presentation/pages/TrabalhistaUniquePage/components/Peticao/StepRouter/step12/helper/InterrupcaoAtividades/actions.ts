import { FormField, FormState, pedido_rescisao_indireta, PEDIDO_RESCISAO_INDIRETA } from "../FormTypesAndFields";
import { IInterrupcaoAtividades, INTERRUPCAO_ATIVIDADES_PEDIDO, InterrupcaoAtividadesPedidoActions } from "./types";

export class InterrupcaoAtividades implements IInterrupcaoAtividades {
    setAlineas(state: FormState, action: InterrupcaoAtividadesPedidoActions): FormState {
        if (action.type != 'SET_ALINEAS') return state

        const checked = action.value.checked

        if (checked) {
            return {
                ...state,
                [FormField.PEDIDO_RESCISAO_INDIRETA]: {
                    value: {
                        ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value,
                        interrupcao_atividades_pedido: {
                            ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO],
                            alineas: [
                                action.value.value,
                                ...(state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS]
                                    ? state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS] as string[]
                                    : [])
                            ]
                        }
                    } as pedido_rescisao_indireta,
                    changed: true
                }
            }
        } else {
            return {
                ...state,
                [FormField.PEDIDO_RESCISAO_INDIRETA]: {
                    value: {
                        ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value,
                        interrupcao_atividades_pedido: {
                            ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO],
                            alineas: (state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS] as string[]).filter(alinea => alinea != action.value.value)
                        }
                    } as pedido_rescisao_indireta,
                    changed: true
                }
            }
        }
    }
    setDataInterrupcao(state: FormState, action: InterrupcaoAtividadesPedidoActions): FormState {
        if (action.type != 'SET_DATA_INTERRUPCAO') return state

        return {
            ...state,
            [FormField.PEDIDO_RESCISAO_INDIRETA]: {
                value: {
                    ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value,
                    interrupcao_atividades_pedido: {
                        ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO],
                        data_interrupcao: action.value
                    }
                } as pedido_rescisao_indireta,
                changed: true
            }
        }
    }
    setUltimoDiaTrabalhando(state: FormState, action: InterrupcaoAtividadesPedidoActions): FormState {
        if (action.type != 'SET_ULTIMO_DIA_TRABALHANDO') return state

        return {
            ...state,
            [FormField.PEDIDO_RESCISAO_INDIRETA]: {
                value: {
                    ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value,
                    interrupcao_atividades_pedido: {
                        ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO],
                        ultimo_dia_trabalhando: action.value
                    }
                } as pedido_rescisao_indireta,
                changed: true
            }
        }
    }
    setProjecaoAvisoPrevio(state: FormState, action: InterrupcaoAtividadesPedidoActions): FormState {
        if (action.type != 'SET_PROJECAO_AVISO_PREVIO') return state

        return {
            ...state,
            [FormField.PEDIDO_RESCISAO_INDIRETA]: {
                value: {
                    ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value,
                    interrupcao_atividades_pedido: {
                        ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO],
                        projecao_aviso_previo: action.value
                    }
                } as pedido_rescisao_indireta,
                changed: true
            }
        }
    }
    setFaltaGrave(state: FormState, action: InterrupcaoAtividadesPedidoActions): FormState {
        if (action.type != 'SET_FALTA_GRAVE') return state

        return {
            ...state,
            [FormField.PEDIDO_RESCISAO_INDIRETA]: {
                value: {
                    ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value,
                    interrupcao_atividades_pedido: {
                        ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO],
                        falta_grave: action.value
                    }
                } as pedido_rescisao_indireta,
                changed: true
            }
        }
    }

}