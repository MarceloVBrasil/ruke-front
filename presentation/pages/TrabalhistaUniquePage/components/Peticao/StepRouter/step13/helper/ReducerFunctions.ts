import { AusenciaPagamentoTercoConstitucional } from "./AusenciaPagamentoTercoConstitucional/actions";
import { DemaisCampos } from "./DemaisCampos/actions";
import { PedidoFeriasInterrompidasInjustamente } from "./FeriasInterrompidasInjustamente/actions";
import { PedidoFeriasNaoGozadas } from "./FeriasNaoGozadas/actions";
import { FeriasPagasNaoGozadas } from "./FeriasPagasNaoGozadas/actions";
import {
    Action,
    FormField,
    FormState,
    PEDIDO_FERIAS,
} from "./FormTypesAndFields";
import { PagamentoIntempestivoFerias } from "./PagamentoIntempestivoFerias/actions";

const feriasNaoGozadas = new PedidoFeriasNaoGozadas()
const feriasInterrompidasInjustamente = new PedidoFeriasInterrompidasInjustamente()
const pagamentoIntempestivoFerias = new PagamentoIntempestivoFerias()
const feriasPagasNaoGozadas = new FeriasPagasNaoGozadas()
const ausenciaPagamentoTercoConstitucional = new AusenciaPagamentoTercoConstitucional()
const demaisCampos = new DemaisCampos()

function formReducer(state: FormState, action: Action) {
    if (action.field === FormField.PEDIDO_FERIAS) {
        switch (action.type) {
            case 'SET_PERIODO_DATA_FINAL':
                return demaisCampos.setPeriodoDataFinal(state, action)
            case 'SET_PERIODO_DATA_INICIO':
                return demaisCampos.setPeriodoDataInicio(state, action)
            case 'SET_SITUACAO_FERIAS_RECLAMANTE':
                return demaisCampos.setSituacaoFeriasReclamante(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return demaisCampos.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL) {
        switch (action.type) {
            case 'SET_DATA_FINAL':
                return ausenciaPagamentoTercoConstitucional.setDataFinal(state, action)
            case 'SET_DATA_INICIO':
                return ausenciaPagamentoTercoConstitucional.setDataInicio(state, action)
            case 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO':
                return ausenciaPagamentoTercoConstitucional.setValorEstimadoPagamentoEmDobro(state, action)
        }
    }

    else if (action.field === PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO) {
        switch (action.type) {
            case 'SET_DATA_FINAL':
                return feriasInterrompidasInjustamente.setDataFinal(state, action)
            case 'SET_DATA_INICIO':
                return feriasInterrompidasInjustamente.setDataInicio(state, action)
            case 'SET_INTERRUPCAO_FERIAS':
                return feriasInterrompidasInjustamente.setInterrupcaoFerias(state, action)
            case 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO':
                return feriasInterrompidasInjustamente.setValorEstimadoPagamentoEmDoro(state, action)
        }
    }

    else if (action.field === PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO) {
        switch (action.type) {
            case 'SET_PERIODOS_FERIAS':
                return feriasNaoGozadas.setPeriodosFerias(state, action)
            case 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DROBRO':
                return feriasNaoGozadas.setValorEstimadoPagamentoEmDobro(state, action)
        }
    }

    else if (action.field === PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS) {
        switch (action.type) {
            case 'SET_DATA_FINAL':
                return feriasPagasNaoGozadas.setDataFinal(state, action)
            case 'SET_DATA_INICIO':
                return feriasPagasNaoGozadas.setDataInicio(state, action)
            case 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO':
                return feriasPagasNaoGozadas.setValorEstimadoPagamentoEmDobro(state, action)
        }
    }

    else if (action.field === PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS) {
        switch (action.type) {
            case 'SET_DATA_INICIO':
                return pagamentoIntempestivoFerias.setDataInicio(state, action)
            case 'SET_DATA_PAGAMENTO_REALIZADO':
                return pagamentoIntempestivoFerias.setDataPagamentoRealizado(state, action)
            case 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO':
                return pagamentoIntempestivoFerias.setValorEstimadoPagamentoEmDobro(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_FERIAS]: {
            value: api_data[FormField.PEDIDO_FERIAS],
            changed: false
        }
    }

    return data
}

export { formReducer, getFormStateFromApi }