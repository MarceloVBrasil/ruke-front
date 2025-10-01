import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { assedio_moral_horizontal, AssedioMoralHorizontalActions, IAssedioMoralHorizontal } from "./types";

export class AssedioMoralHorizontal implements IAssedioMoralHorizontal {
    setNomeAssediador(state: FormState, action: AssedioMoralHorizontalActions): FormState {
        if (action.type != 'SET_NOME_ASSEDIADOR') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    assedio_moral_horizontal: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL],
                        nome_pessoa_realizou_assedio: action.value
                    } as assedio_moral_horizontal
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setDescricaoAssedio(state: FormState, action: AssedioMoralHorizontalActions): FormState {
        if (action.type != 'SET_DESCRICAO_ASSEDIO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    assedio_moral_horizontal: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL],
                        descricao_ofensas_vexatorias: action.value
                    } as assedio_moral_horizontal
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setValorEstimado(state: FormState, action: AssedioMoralHorizontalActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    assedio_moral_horizontal: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL],
                        valor_estimado: action.value
                    } as assedio_moral_horizontal
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}