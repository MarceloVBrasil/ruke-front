import { DemaisCampos } from "./DemaisCampos/actions";
import { Action, FormState, FormField, reconhecimento_vinculo_empregaticio_initial_value } from "./FormTypesAndFields";

const demaisCampos = new DemaisCampos()

function formReducer(state: FormState, action: Action): FormState {
    if (action.field === FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO) {
        switch (action.type) {
            case 'SET_CONTRATO_REPRESENTANTE_COMERCIAL':
                return demaisCampos.setContratoRepresentanteComercial(state, action)
            case 'SET_DATA_FIM':
                return demaisCampos.setDataFim(state, action)
            case 'SET_DATA_INICIO':
                return demaisCampos.setDataInicio(state, action)
            case 'SET_EMPREGADO_CLT':
                return demaisCampos.setEmpregadoCLT(state, action)
            case 'SET_INSCRICAO_CORE':
                return demaisCampos.setInscricaoCore(state, action)
            case 'SET_MOTORISTA_APLICATIVO':
                return demaisCampos.setMotoristaAplicativo(state, action)
            case 'SET_MOTORISTA_CARGAS':
                return demaisCampos.setMotoristaCargas(state, action)
            case 'SET_MOTORISTA_INSCRICAO_ANTT':
                return demaisCampos.setMotoristaInscricaoANTT(state, action)
            case 'SET_MOTORISTA_TRES_ANOS_EXPERIENCIA':
                return demaisCampos.setMotoristaTresAnosExperiencia(state, action)
            case 'SET_MOTORISTA_VEICULO_PROPRIO':
                return demaisCampos.setMotoristaVeiculoProprio(state, action)
            case 'SET_PERIODO_VINCULO':
                return demaisCampos.setPeriodoVinculo(state, action)
            case 'SET_PJ':
                return demaisCampos.setPJ(state, action)
            case 'SET_REPRESENTACAO_COMERCIAL_MEI':
                return demaisCampos.setRepresentacaoComercialMEI(state, action)
            case 'SET_REPRESENTANTE_COMERCIAL':
                return demaisCampos.setRepresentanteComercial(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return demaisCampos.setValorEstimadoPedido(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: { value: api_data[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO] || reconhecimento_vinculo_empregaticio_initial_value, changed: false },
    };

    return data
}

export { formReducer, getFormStateFromApi }