import { DemaisCampos } from "./DemaisCampos/actions";
import { Action, FormField, FormState } from "./FormTypesAndFields";

const demaisCampos = new DemaisCampos()

function formReducer(state: FormState, action: Action) {
    if (action.field === FormField.PEDIDO_GRATUIDADE_JUSTICA) {
        switch (action.type) {
            case 'SET_GASTOS_MENSAIS_RECLAMANTE':
                return demaisCampos.setGastosMensaisReclamante(state, action)
            case 'SET_RECLAMANTE_DESEMPREGADO':
                return demaisCampos.setReclamanteDesempregado(state, action)
            case 'SET_RECLAMANTE_TEM_CONDICOES_CUSTOS_PROCESSUAIS':
                return demaisCampos.setReclamanteTemCondicoesCustosProcessuais(state, action)
            case 'SET_RENDA_ATUAL_RECLAMANTE':
                return demaisCampos.setRendaAtualReclamante(state, action)
            case 'SET_RENDA_INFERIOR_RECLAMANTE':
                return demaisCampos.setRendaInferiorReclamante(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_GRATUIDADE_JUSTICA]: { value: api_data[FormField.PEDIDO_GRATUIDADE_JUSTICA], changed: false }
    }

    return data
}

export { formReducer, getFormStateFromApi }