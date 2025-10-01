import { FormField, FormState, pedido_rescisao_indireta, PEDIDO_RESCISAO_INDIRETA } from "../FormTypesAndFields";
import { CONTINUA_TRABALHANDO_PEDIDO, ContinuaTrabalhandoActions, IContinuaTrabalhando } from "./types";

export class ContinuaTrabalhando implements IContinuaTrabalhando {
    setAlineas(state: FormState, action: ContinuaTrabalhandoActions): FormState {
        if (action.type != 'SET_ALINEAS') return state

        const checked = action.value.checked

        if (checked) {
            return {
                ...state,
                [FormField.PEDIDO_RESCISAO_INDIRETA]: {
                    value: {
                        ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value,
                        continua_trabalhando_pedido: {
                            ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO],
                            alineas: [
                                action.value.value,
                                ...(state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS]
                                    ? state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS] as string[]
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
                        continua_trabalhando_pedido: {
                            ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO],
                            alineas: (state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS] as string[]).filter(alinea => alinea != action.value.value)
                        }
                    } as pedido_rescisao_indireta,
                    changed: true
                }
            }
        }
    }
    setFaltaGrave(state: FormState, action: ContinuaTrabalhandoActions): FormState {
        if (action.type != 'SET_FALTA_GRAVE') return state

        return {
            ...state,
            [FormField.PEDIDO_RESCISAO_INDIRETA]: {
                value: {
                    ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value,
                    continua_trabalhando_pedido: {
                        ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO],
                        falta_grave: action.value
                    }
                } as pedido_rescisao_indireta,
                changed: true
            }
        }
    }

}