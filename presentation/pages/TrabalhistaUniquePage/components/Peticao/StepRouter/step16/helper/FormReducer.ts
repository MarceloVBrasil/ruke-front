import { DemaisCampos } from "./DemaisCampos/actions";
import { Action, FormField, FormState } from "./FormTypesAndFields";

const demaisCampos = new DemaisCampos()

function formReducer(state: FormState, action: Action) {
    if (action.field === FormField.PEDIDO_FALTA_DEPOSITO_FGTS) {
        switch (action.type) {
            case 'SET_DATA_INICIO':
                return demaisCampos.setDataInicio(state, action)
            case 'SET_DATA_TERMINO':
                return demaisCampos.setDataTermino(state, action)
            case 'SET_RECLAMADA_EFETUOU_DEPOSITOS':
                return demaisCampos.setReclamadaEfetuouDepositos(state, action)
            case 'SET_RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA':
                return demaisCampos.setReclamanteDemitidoSemJustaCausa(state, action)
            case 'SET_VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO':
                return demaisCampos.setValorEstimadoFgtsNaoDepositado(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return demaisCampos.setValorEstimadoPedido(state, action)
        }
    }

    return state

}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_FALTA_DEPOSITO_FGTS]: {
            value: api_data[FormField.PEDIDO_FALTA_DEPOSITO_FGTS],
            changed: false
        }
    }
    return data

}

export { formReducer, getFormStateFromApi }