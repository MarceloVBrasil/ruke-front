import { FormField, FormState, pedido_ferias } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setPeriodoDataInicio(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_PERIODO_DATA_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    periodo_data_inicio: action.value
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setPeriodoDataFinal(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_PERIODO_DATA_FINAL') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    periodo_data_final: action.value
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setSituacaoFeriasReclamante(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_SITUACAO_FERIAS_RECLAMANTE') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    situacao_ferias_reclamante: action.value
                } as pedido_ferias,
                changed: true
            }
        }
    }
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_FERIAS]: {
                value: {
                    ...state[FormField.PEDIDO_FERIAS].value,
                    valor_estimado_pedido: action.value
                } as pedido_ferias,
                changed: true
            }
        }
    }

}