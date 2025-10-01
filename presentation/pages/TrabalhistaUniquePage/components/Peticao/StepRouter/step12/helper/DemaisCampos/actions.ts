import { FormField, FormState, pedido_rescisao_indireta } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_RESCISAO_INDIRETA]: {
                value: {
                    ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value,
                    valor_estimado_pedido: action.value
                } as pedido_rescisao_indireta,
                changed: true
            }
        }
    }
    setInterrompeuAtividades(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_INTERROMPEU_ATIVIDADES') return state

        return {
            ...state,
            [FormField.PEDIDO_RESCISAO_INDIRETA]: {
                value: {
                    ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value,
                    interrompeu_as_atividades: action.value,
                    continua_trabalhando: !action.value
                } as pedido_rescisao_indireta,
                changed: true
            }
        }
    }
    setContinuaTrabalhando(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_CONTINUA_TRABALHANDO') return state

        return {
            ...state,
            [FormField.PEDIDO_RESCISAO_INDIRETA]: {
                value: {
                    ...state[FormField.PEDIDO_RESCISAO_INDIRETA].value,
                    continua_trabalhando: action.value,
                    interrompeu_as_atividades: !action.value
                } as pedido_rescisao_indireta,
                changed: true
            }
        }
    }

}