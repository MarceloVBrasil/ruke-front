import { FormField, FormState, pedido_falta_deposito_fgts } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setReclamadaEfetuouDepositos(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RECLAMADA_EFETUOU_DEPOSITOS') return state

        return {
            ...state,
            [FormField.PEDIDO_FALTA_DEPOSITO_FGTS]: {
                value: {
                    ...state[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value,
                    reclamada_efetuou_depositos: action.value
                } as pedido_falta_deposito_fgts,
                changed: true
            }
        }
    }
    setDataInicio(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_DATA_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_FALTA_DEPOSITO_FGTS]: {
                value: {
                    ...state[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value,
                    data_inicio: action.value
                } as pedido_falta_deposito_fgts,
                changed: true
            }
        }
    }
    setDataTermino(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_DATA_TERMINO') return state

        return {
            ...state,
            [FormField.PEDIDO_FALTA_DEPOSITO_FGTS]: {
                value: {
                    ...state[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value,
                    data_termino: action.value
                } as pedido_falta_deposito_fgts,
                changed: true
            }
        }
    }
    setValorEstimadoFgtsNaoDepositado(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO') return state

        return {
            ...state,
            [FormField.PEDIDO_FALTA_DEPOSITO_FGTS]: {
                value: {
                    ...state[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value,
                    valor_estimado_fgts_nao_depositado: action.value
                } as pedido_falta_deposito_fgts,
                changed: true
            }
        }
    }
    setReclamanteDemitidoSemJustaCausa(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA') return state

        return {
            ...state,
            [FormField.PEDIDO_FALTA_DEPOSITO_FGTS]: {
                value: {
                    ...state[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value,
                    reclamante_demitido_sem_justa_causa: action.value
                } as pedido_falta_deposito_fgts,
                changed: true
            }
        }
    }
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_FALTA_DEPOSITO_FGTS]: {
                value: {
                    ...state[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value,
                    valor_estimado_pedido: action.value
                } as pedido_falta_deposito_fgts,
                changed: true
            }
        }
    }

}