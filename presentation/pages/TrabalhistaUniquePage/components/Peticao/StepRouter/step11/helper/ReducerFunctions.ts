import { DemaisCampos } from "./DemaisCampos/actions";
import { Action, FormState, FormField, PEDIDO_GORJETAS } from "./FormTypesAndFields";
import { PagamentoPorFora } from "./PagamentoPorFora/actions";
import { PagamentoRetido } from "./PagamentoRetido/actions";

const demaisCampos = new DemaisCampos()
const pagamentoPorFora = new PagamentoPorFora()
const pagamentoRetido = new PagamentoRetido()

function formReducer(state: FormState, action: Action) {
    if (action.field === FormField.PEDIDO_GORJETAS) {
        switch (action.type) {
            case 'SET_PAGAMENTO_POR_FORA':
                return demaisCampos.setPagamentoPorFora(state, action)
            case 'SET_PAGAMENTO_RETIDO':
                return demaisCampos.setPagamentoRetido(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return demaisCampos.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO) {
        switch (action.type) {
            case 'SET_DATA_FINAL':
                return pagamentoPorFora.setDataFinal(state, action)
            case 'SET_DATA_INICIAL':
                return pagamentoPorFora.setDataInicial(state, action)
            case 'SET_PERIODO':
                return pagamentoPorFora.setPeriodo(state, action)
            case 'SET_VALOR_INTEGRADO_SALARIO':
                return pagamentoPorFora.setValorIntegradoSalario(state, action)
            case 'SET_VALOR_MEDIO':
                return pagamentoPorFora.setValorMedio(state, action)
            case 'SET_VALOR_TOTAL_ESTIMADO_GORJETAS':
                return pagamentoPorFora.setValorTotalEstimadoGorjetas(state, action)
        }
    }

    else if (action.field === PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO) {
        switch (action.type) {
            case 'SET_PEDIDO_RESTITUICAO':
                return pagamentoRetido.setPedidoRestituicao(state, action)
            case 'SET_PERCENTUAL_GORJETAS':
                return pagamentoRetido.setPercentualGorjetas(state, action)
            case 'SET_VALOR_MEDIO_MENSAL':
                return pagamentoRetido.setValorMedioMensal(state, action)
            case 'SET_VALOR_TOTAL_ESTIMADO_GORJETAS':
                return pagamentoRetido.setValorTotalEstimadoGorjetas(state, action)
        }
    }

    return state
}



function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_GORJETAS]: { value: api_data[FormField.PEDIDO_GORJETAS], changed: false }
    }

    return data
}

export { formReducer, getFormStateFromApi }