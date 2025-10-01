import { adicional_insalubridade_initial_value } from "../../step7/helper/FormTypesAndFields";
import { DemaisCampos } from "./DemaisCampos/actions";
import { Action, FormState, FormField, adicional_periculosidade, ADICIONAL_PERICULOSIDADE } from "./FormTypesAndFields";

const demaisCampos = new DemaisCampos()

function formReducer(state: FormState, action: Action): FormState {
    if (action.field === FormField.ADCICIONAL_PERICULOSIDADE) {
        switch (action.type) {
            case 'SET_COMPREENDE_TODO_CONTRATO':
                return demaisCampos.setCompreendeTodoContrato(state, action)
            case 'SET_DATA_FIM':
                return demaisCampos.setDataFim(state, action)
            case 'SET_DATA_INICIO':
                return demaisCampos.setDataInicio(state, action)
            case 'SET_RAZOES':
                return demaisCampos.setRazoes(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return demaisCampos.setValorEstimadoPedido(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.ADCICIONAL_PERICULOSIDADE]: { value: api_data[FormField.ADCICIONAL_PERICULOSIDADE] || adicional_insalubridade_initial_value, changed: false },
    };

    (data[FormField.ADCICIONAL_PERICULOSIDADE].value as adicional_periculosidade)[ADICIONAL_PERICULOSIDADE.COMPREENDE_TODO_CONTRATO] = data[FormField.ADCICIONAL_PERICULOSIDADE].value?.[ADICIONAL_PERICULOSIDADE.COMPREENDE_TODO_CONTRATO] ?? true;

    return data
}

export { formReducer, getFormStateFromApi }