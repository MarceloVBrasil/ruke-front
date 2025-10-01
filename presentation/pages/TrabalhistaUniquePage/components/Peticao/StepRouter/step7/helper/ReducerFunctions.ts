import { DemaisCampos } from "./DemaisCampos/actions";
import { Action, FormState, FormField, adicional_insalubridade_initial_value, ADICIONAL_INSALUBRIDADE, GRAU } from "./FormTypesAndFields";

const demaisCampos = new DemaisCampos()


function formReducer(state: FormState, action: Action): FormState {
    if (action.field === FormField.ADCICIONAL_INSALUBRIDADE) {
        switch (action.type) {
            case 'SET_BASE_CALCULO_SALARIO_MINIMO':
                return demaisCampos.setBaseCalculoSalarioMinimo(state, action)
            case 'SET_LIMPEZA_BANHEIRO':
                return demaisCampos.setLimpezaBanheiro(state, action)
            case 'SET_QUAL_GRAU_DEVERIA_RECEBER':
                return demaisCampos.setQualGrauDeveriaReceber(state, action)
            case 'SET_RECEBEU_ADICIONAL_BANHEIRO':
                return demaisCampos.setRecebeuAdicionalBanheiro(state, action)
            case 'SET_RECEBIA_EM_QUE_GRAU':
                return demaisCampos.setRecebiaEmQueGrau(state, action)
            case 'SET_RECEBIMENTO':
                return demaisCampos.setRecebimento(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return demaisCampos.setValorEstimadoPedido(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.ADCICIONAL_INSALUBRIDADE]: { value: api_data[FormField.ADCICIONAL_INSALUBRIDADE] || adicional_insalubridade_initial_value, changed: true },
    };

    data[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] = data[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] || 'sempre_recebeu'
    data[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.RECEBIA_EM_QUE_GRAU] = data[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.RECEBIA_EM_QUE_GRAU] || GRAU.MEDIO
    data[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER] = data[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER] || GRAU.MAXIMO
    data[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.LIMPEZA_BANHEIRO] = data[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.LIMPEZA_BANHEIRO] || false

    return data
}

export { formReducer, getFormStateFromApi }