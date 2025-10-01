import { DemaisCampos } from "./DemaisCampos/actions";
import { Action, FormField, FormState } from "./FormTypesAndFields";

const demaisCampos = new DemaisCampos()

function formReducer(state: FormState, action: Action) {
    if (action.field === FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO) {
        switch (action.type) {
            case 'SET_DATA_INICIO':
                return demaisCampos.setDataInicio(state, action)
            case 'SET_DATA_TERMINO':
                return demaisCampos.setDataTermino(state, action)
            case 'SET_RAZAO_ESTABILIDADE':
                return demaisCampos.setRazaoEstabilidade(state, action)
            case 'SET_RECLAMANTE_ESTA_PERIODO_ESTABILIDADE':
                return demaisCampos.setReclamanteEstaPeriodoEstabilidade(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return demaisCampos.setValorEstimadoPedido(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO]: {
            value: api_data[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO],
            changed: false
        }
    }

    return data
}

export { formReducer, getFormStateFromApi }