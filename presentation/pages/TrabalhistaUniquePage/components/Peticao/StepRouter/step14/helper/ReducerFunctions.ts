import { DemaisCampos } from "./DemaisCampos/actions";
import { Action, FormField, FormState, PEDIDO_MULTA_477, pedido_multa_477 } from "./FormTypesAndFields";
import { NaoPagasDentroPrazoLegal } from "./NaoPagoPrazoLegal/actions";
import { PagasForaPrazoLegal } from "./PagoForaPrazoLegal/actions";
import { PagasFormaParcelada } from "./PagoFormaParcelada/actions";

const pagasForaPrazoLegal = new PagasForaPrazoLegal()
const pagasFormaParcelada = new PagasFormaParcelada()
const naoPagasDentroPrazoLegal = new NaoPagasDentroPrazoLegal()
const demaisCampos = new DemaisCampos()

function formReducer(state: FormState, action: Action) {
    if (action.field === FormField.PEDIDO_MULTA_477) {
        switch (action.type) {
            case 'SET_OPCAO_PAGAMENTO_VERBAS_RESCISORIAS':
                return demaisCampos.setOpcaoPagamentoVerbasRescisorias(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return demaisCampos.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL) {
        switch (action.type) {
            case 'SET_DATA_PROJECAO':
                return naoPagasDentroPrazoLegal.setDataProjecao(state, action)
            case 'SET_PROJECAO_AVISO_PREVIO':
                return naoPagasDentroPrazoLegal.setProjecaoAvisoPrevio(state, action)
        }
    }

    else if (action.field === PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO) {
        switch (action.type) {
            case 'SET_DATA_PAGAMENTO':
                return pagasForaPrazoLegal.setDataPagamento(state, action)
            case 'SET_DATA_PROJECAO':
                return pagasForaPrazoLegal.setDataProjecao(state, action)
            case 'SET_PROJECAO_AVISO_PREVIO':
                return pagasForaPrazoLegal.setProjecaoAvisoPrevio(state, action)
        }
    }

    else if (action.field === PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO) {
        switch (action.type) {
            case 'SET_DATA_PROJECAO':
                return pagasFormaParcelada.setDataProjecao(state, action)
            case 'SET_PROJECAO_AVISO_PREVIO':
                return pagasFormaParcelada.setProjecaoAvisoPrevio(state, action)
            case 'SET_QUANTIDADE_PARCELAS':
                return pagasFormaParcelada.setQuantidadeParcelas(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_MULTA_477]: { value: api_data[FormField.PEDIDO_MULTA_477], changed: false }
    }

    return data
}

export { formReducer, getFormStateFromApi }