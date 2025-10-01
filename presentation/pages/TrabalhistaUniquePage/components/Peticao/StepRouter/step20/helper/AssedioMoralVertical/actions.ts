import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { assedio_moral_vertical, AssedioMoralVerticalActions, IAssedioMoralVertical } from "./types";

export class AssedioMoralVertical implements IAssedioMoralVertical {
    setNomeSuperiorAssediador(state: FormState, action: AssedioMoralVerticalActions): FormState {
        if (action.type != 'SET_NOME_SUPERIOR_ASSEDIADOR') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    assedio_moral_vertical: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL],
                        nome_superior_realizou_assedio: action.value
                    } as assedio_moral_vertical
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setDescricaoAssedio(state: FormState, action: AssedioMoralVerticalActions): FormState {
        if (action.type != 'SET_DESCRICAO_ASSEDIO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    assedio_moral_vertical: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL],
                        descricao_ofensas_vexatorias: action.value
                    } as assedio_moral_vertical
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setValorEstimado(state: FormState, action: AssedioMoralVerticalActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    assedio_moral_vertical: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL],
                        valor_estimado: action.value
                    } as assedio_moral_vertical
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}