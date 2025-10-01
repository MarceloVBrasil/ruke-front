import { AusenciaPagamento } from "./AusenciaPagamento/actions";
import { DemaisCampos } from "./DemaisCampos/actions";
import { Action, FormField, FormState, PEDIDO_AVISO_PREVIO, pedido_aviso_previo } from "./FormTypesAndFields";
import { PagamentoAMenor } from "./PagamentoMenor/actions";
import { TrabalhadoPeriodoSuperior30Dias } from "./TrabalhadoPeriodoSuperior/actions";
import { TrabalhadoReducaoJornadaUltimos7Dias } from "./TrabalhadoSemReducaoJornadaOuDispensa/actions";

const ausenciaPagamento = new AusenciaPagamento()
const demaisCampos = new DemaisCampos()
const pagamentoAMenor = new PagamentoAMenor()
const trabalhadoPeriodoSuperior30Dias = new TrabalhadoPeriodoSuperior30Dias()
const trabalhadoReducaoJornadaUltimo7Dias = new TrabalhadoReducaoJornadaUltimos7Dias()

function formReducer(state: FormState, action: Action) {
    if (action.field === FormField.PEDIDO_AVISO_PREVIO) {
        switch (action.type) {
            case 'SET_DATA_DISPENSA_SEM_JUSTA_CAUSA':
                return demaisCampos.setDataDispensaSemJustaCausa(state, action)
            case 'SET_FUNDAMENTO':
                return demaisCampos.setFundamento(state, action)
            case 'SET_QUANTIDADE_DIAS_AVISO_PREVIO':
                return demaisCampos.setQuantidadeDiasAvisoPrevio(state, action)
        }
    }

    else if (action.field === PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO) {
        switch (action.type) {
            case 'SET_QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS':
                return ausenciaPagamento.setQuantidadeDiasDeveriamSerPagos(state, action)
            case 'SET_VALOR_ESTIMADO':
                return ausenciaPagamento.setValorEstimado(state, action)

        }
    }

    else if (action.field === PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR) {
        switch (action.type) {
            case 'SET_QUANTIDADE_DIAS_FALTARAM_SER_PAGOS':
                return pagamentoAMenor.setQuantidadeDiasFaltaramSerPagos(state, action)
            case 'SET_VALOR_ESTIMADO':
                return pagamentoAMenor.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS) {
        switch (action.type) {
            case 'SET_QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS':
                return trabalhadoPeriodoSuperior30Dias.setQuantidadeDiasEfetivamentePagos(state, action)
            case 'SET_QUANTIDADE_DIAS_FALTARAM_SER_PAGOS':
                return trabalhadoPeriodoSuperior30Dias.setQuantidadeDiasFaltaramSerPagos(state, action)
            case 'SET_VALOR_ESTIMADO':
                return trabalhadoPeriodoSuperior30Dias.setValorEstimado(state, action)
        }
    }

    else if (action.field === PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS) {
        switch (action.type) {
            case 'SET_DATA_PROJETADO_TERMINO':
                return trabalhadoReducaoJornadaUltimo7Dias.setDataProjetadoTermino(state, action)
            case 'SET_VALOR_ESTIMADO':
                return trabalhadoReducaoJornadaUltimo7Dias.setValorEstimado(state, action)
        }
    }

    return state

}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_AVISO_PREVIO]: { value: api_data[FormField.PEDIDO_AVISO_PREVIO], changed: false }
    }

    return data
}

export { formReducer, getFormStateFromApi }