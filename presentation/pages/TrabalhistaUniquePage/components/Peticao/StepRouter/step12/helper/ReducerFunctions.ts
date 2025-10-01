import { ContinuaTrabalhando } from "./ContinuaTrabalhando/actions";
import { DemaisCampos } from "./DemaisCampos/actions";
import {
    Action,
    FormField,
    FormState,
    PEDIDO_RESCISAO_INDIRETA
} from "./FormTypesAndFields";
import { InterrupcaoAtividades } from "./InterrupcaoAtividades/actions";

const demaisCampos = new DemaisCampos()
const continuaTrabalhando = new ContinuaTrabalhando()
const interrupcaoAtividades = new InterrupcaoAtividades()

function formReducer(state: FormState, action: Action) {
    if (action.field === FormField.PEDIDO_RESCISAO_INDIRETA) {
        switch (action.type) {
            case 'SET_CONTINUA_TRABALHANDO':
                return demaisCampos.setContinuaTrabalhando(state, action)
            case 'SET_INTERROMPEU_ATIVIDADES':
                return demaisCampos.setInterrompeuAtividades(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return demaisCampos.setValorEstimadoPedido(state, action)
        }
    }

    if (action.field === PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO) {
        switch (action.type) {
            case 'SET_ALINEAS':
                return continuaTrabalhando.setAlineas(state, action)
            case 'SET_FALTA_GRAVE':
                return continuaTrabalhando.setFaltaGrave(state, action)
        }
    }

    if (action.field === PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO) {
        switch (action.type) {
            case 'SET_ALINEAS':
                return interrupcaoAtividades.setAlineas(state, action)
            case 'SET_DATA_INTERRUPCAO':
                return interrupcaoAtividades.setDataInterrupcao(state, action)
            case 'SET_FALTA_GRAVE':
                return interrupcaoAtividades.setFaltaGrave(state, action)
            case 'SET_PROJECAO_AVISO_PREVIO':
                return interrupcaoAtividades.setProjecaoAvisoPrevio(state, action)
            case 'SET_ULTIMO_DIA_TRABALHANDO':
                return interrupcaoAtividades.setUltimoDiaTrabalhando(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_RESCISAO_INDIRETA]: {
            value: api_data[FormField.PEDIDO_RESCISAO_INDIRETA],
            changed: false
        }
    }

    return data
}

export { formReducer, getFormStateFromApi }