import { AuxilioAlimentacao } from "./AuxilioAlimentacao/actions"
import { Actions, FormField, FormState, PEDIDO_INTEGRACAO_SALARIAL } from "./FormTypesAndFields"
import { FuncoesAuxiliares } from "./FuncoesAuxiliares/actions"
import { IntegracaoPremios } from "./IntegracaoPremiosBonus/actions"
import { SalarioPorFora } from "./SalarioPorFora/actions"

const salarioPorFora = new SalarioPorFora()
const integracaoPremios = new IntegracaoPremios()
const auxilioAlimentacao = new AuxilioAlimentacao()
const funcoesAuxiliares = new FuncoesAuxiliares()

function formReducer(state: FormState, action: Actions): FormState {
    if (action.field === PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA) {
        switch (action.type) {
            case 'SET_DATA_INICIO':
                return salarioPorFora.setDataInicio(state, action)
            case 'SET_DATA_FIM':
                return salarioPorFora.setDataFim(state, action)
            case 'SET_VALOR_MENSAL_MEDIO':
                return salarioPorFora.setValorMensalPedido(state, action)
            case 'SET_RUBRICA_POR_FORA':
                return salarioPorFora.setRubricaPorFora(state, action)
            case 'SET_FORMA_PAGAMENTO':
                return salarioPorFora.setFormaPagamento(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return salarioPorFora.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS) {
        switch (action.type) {
            case 'SET_DATA_INICIO':
                return integracaoPremios.setDataInicio(state, action)
            case 'SET_DATA_FIM':
                return integracaoPremios.setDataFim(state, action)
            case 'SET_VALOR_MENSAL_MEDIO':
                return integracaoPremios.setValorMensalMedio(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return integracaoPremios.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO) {
        switch (action.type) {
            case 'SET_DATA_INICIO':
                return auxilioAlimentacao.setDataInicio(state, action)
            case 'SET_DATA_FIM':
                return auxilioAlimentacao.setDataFim(state, action)
            case 'SET_VALOR_MENSAL_MEDIO':
                return auxilioAlimentacao.setValorMensalMedio(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return auxilioAlimentacao.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === 'FUNCAO_AUXILIAR') {
        switch (action.type) {
            case 'SET_RAZAO':
                return funcoesAuxiliares.setRazoesDireitoIntegracaoParcela(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_INTEGRACAO_SALARIAL]: { value: api_data[FormField.PEDIDO_INTEGRACAO_SALARIAL], changed: false }
    }

    return data
}

export { formReducer, getFormStateFromApi }