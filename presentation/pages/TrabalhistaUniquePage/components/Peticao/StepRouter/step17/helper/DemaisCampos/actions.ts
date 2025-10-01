import { FormField, FormState, pedido_garantia_provisoria_emprego } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setRazaoEstabilidade(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RAZAO_ESTABILIDADE') return state

        return {
            ...state,
            [FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO]: {
                value: {
                    ...state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value,
                    razao_estabilidade: action.value
                } as pedido_garantia_provisoria_emprego,
                changed: true
            }
        }
    }
    setDataInicio(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_DATA_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO]: {
                value: {
                    ...state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value,
                    data_inicio: action.value
                } as pedido_garantia_provisoria_emprego,
                changed: true
            }
        }
    }
    setDataTermino(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_DATA_TERMINO') return state

        return {
            ...state,
            [FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO]: {
                value: {
                    ...state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value,
                    data_termino: action.value
                } as pedido_garantia_provisoria_emprego,
                changed: true
            }
        }
    }
    setReclamanteEstaPeriodoEstabilidade(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RECLAMANTE_ESTA_PERIODO_ESTABILIDADE') return state

        return {
            ...state,
            [FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO]: {
                value: {
                    ...state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value,
                    reclamante_esta_periodo_estabilidade: action.value
                } as pedido_garantia_provisoria_emprego,
                changed: true
            }
        }
    }
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO]: {
                value: {
                    ...state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value,
                    valor_estimado_pedido: action.value
                } as pedido_garantia_provisoria_emprego,
                changed: true
            }
        }
    }

}