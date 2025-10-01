import { AcumuloFuncao } from "./AcumuloFuncao/actions";
import { pedido_acumulo_funcao_initial_value } from "./AcumuloFuncao/types";
import { ActCct } from "./CCTACT/actions";
import { pedido_act_cct_initial_value } from "./CCTACT/types";
import { DesvioFuncao } from "./DesvioFuncao/actions";
import { pedido_desvio_funcao_initial_value } from "./DesvioFuncao/types";
import { DiferencaSalarial } from "./DiferencasSalariais/actions";
import { pedido_diferenca_salarial_initial_value } from "./DiferencasSalariais/types";
import {
    Action,
    FormState,
    FormField,
} from "./FormTypesAndFields";
import { SalarioSubstituicao } from "./SalarioSubstituicao/actions";
import { pedido_salario_substituicao_initial_value } from "./SalarioSubstituicao/types";

const acumuloFuncao = new AcumuloFuncao()
const actcct = new ActCct()
const desvioFuncao = new DesvioFuncao()
const diferencaSalarial = new DiferencaSalarial()
const salarioSubstituicao = new SalarioSubstituicao()

function formReducer(state: FormState, action: Action): FormState {
    if (action.field === FormField.PEDIDO_ACT_CCT) {
        switch (action.type) {
            case 'ADD_FUNCAO':
                return actcct.setAddFuncao(state, action)
            case 'DELETE_FUNCAO':
                return actcct.setDeleteFuncao(state, action)
            case 'EDIT_FUNCAO':
                return actcct.setEditFuncao(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return actcct.setValorEstimado(state, action)
        }
    }

    else if (action.field === FormField.PEDIDO_ACUMULO_FUNCAO) {
        switch (action.type) {
            case 'SET_ATIVIDADES_CARGO_ACUMULADO':
                return acumuloFuncao.setAtividadesCargoAcumulado(state, action)
            case 'SET_CARGO_OCUPADO':
                return acumuloFuncao.setCargoOcupado(state, action)
            case 'SET_DATA_FINAL':
                return acumuloFuncao.setDataFinal(state, action)
            case 'SET_DATA_INICIAL':
                return acumuloFuncao.setDataInicial(state, action)
            case 'SET_FUNCAO_ACUMULADA':
                return acumuloFuncao.setFuncaoAcumulada(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return acumuloFuncao.setValorEstimado(state, action)
        }
    }

    else if (action.field === FormField.PEDIDO_DESVIO_FUNCAO) {
        switch (action.type) {
            case 'ADD_INTERVALO':
                return desvioFuncao.setAddDesvio(state, action)
            case 'DELETE_INTERVALO':
                return desvioFuncao.setDeleteDesvio(state, action)
            case 'EDIT_INTERVALO':
                return desvioFuncao.setEditDesvio(state, action)
            case 'SET_FUNDAMENTO':
                return desvioFuncao.setFundamento(state, action)
            case 'SET_OUTRO_FUNDAMENTO':
                return desvioFuncao.setOutroFundamento(state, action)
            case 'SET_TODO_CONTRATO':
                return desvioFuncao.setTodoContrato(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return desvioFuncao.setValorEstimado(state, action)
        }
    }

    else if (action.field === FormField.PEDIDO_DIFERENCAS_SALARIAIS) {
        switch (action.type) {
            case 'ADD_PARADIGMA':
                return diferencaSalarial.setAddParadigma(state, action)
            case 'DELETE_PARADIGMA':
                return diferencaSalarial.setDeleteParadigma(state, action)
            case 'EDIT_PARADIGMA':
                return diferencaSalarial.setEditParadigma(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return diferencaSalarial.setValorEstimado(state, action)
        }
    }

    else if (action.field === FormField.PEDIDO_SALARIO_SUBSTITUICAO) {
        switch (action.type) {
            case 'SET_CARGO_EMPREGADO_SUBSTITUIDO':
                return salarioSubstituicao.setCargoEmpregadoSubstituido(state, action)
            case 'SET_DATA_FINAL':
                return salarioSubstituicao.setDataFinal(state, action)
            case 'SET_DATA_INICIAL':
                return salarioSubstituicao.setDataInicial(state, action)
            case 'SET_MOTIVO_SUBSTITUICAO':
                return salarioSubstituicao.setMotivoSubstituicao(state, action)
            case 'SET_NOME_EMPREGADO_SUBSTITUIDO':
                return salarioSubstituicao.setNomeEmpregadoSubstituido(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return salarioSubstituicao.setValorEstimado(state, action)
            case 'SET_VALOR_SALARIO_EMPREGADO_SUBSTITUIDO':
                return salarioSubstituicao.setValorSalarioEmpregadoSubstituido(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_DIFERENCAS_SALARIAIS]: { value: api_data[FormField.PEDIDO_DIFERENCAS_SALARIAIS] || pedido_diferenca_salarial_initial_value, changed: false },
        [FormField.PEDIDO_DESVIO_FUNCAO]: { value: api_data[FormField.PEDIDO_DESVIO_FUNCAO] || pedido_desvio_funcao_initial_value, changed: false },
        [FormField.PEDIDO_ACT_CCT]: { value: api_data[FormField.PEDIDO_ACT_CCT] || pedido_act_cct_initial_value, changed: false },
        [FormField.PEDIDO_ACUMULO_FUNCAO]: { value: api_data[FormField.PEDIDO_ACUMULO_FUNCAO] || pedido_acumulo_funcao_initial_value, changed: false },
        [FormField.PEDIDO_SALARIO_SUBSTITUICAO]: { value: api_data[FormField.PEDIDO_SALARIO_SUBSTITUICAO] || pedido_salario_substituicao_initial_value, changed: false },
    };

    return data
}

export { formReducer, getFormStateFromApi }