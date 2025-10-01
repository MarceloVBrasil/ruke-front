import { DemaisCampos } from "./DemaisCampos/actions";
import { Action, FormState, FormField, pedido_reversao_justa_causa, PEDIDO_REVERSAO_JUSTA_CAUSA, RAZOES, FUNDAMENTOS, pedido_reversao_justa_causa_initial_value } from "./FormTypesAndFields";

const demaisCampos = new DemaisCampos()

function formReducer(state: FormState, action: Action): FormState {
    if (action.field === FormField.PEDIDO_REVERSAO_JUSTA_CAUSA) {
        switch (action.type) {
            case 'SET_ALEGACAO_EMPRESA':
                return demaisCampos.setAlegacaoEmpresa(state, action)
            case 'SET_FUNDAMENTOS':
                return demaisCampos.setFundamentos(state, action)
            case 'SET_INDENIZACAO_DANO_MORAL':
                return demaisCampos.setIndenizacaoDanoMoral(state, action)
            case 'SET_RAZOES':
                return demaisCampos.setRazoes(state, action)
            case 'SET_TEXTO_OUTRA_RAZAO':
                return demaisCampos.setTextoOutraRazao(state, action)
            case 'SET_VALOR_INDENIZACAO':
                return demaisCampos.setValorIndenizacao(state, action)
            case 'SET_VALOR_RESCISAO':
                return demaisCampos.setValorRescisao(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: { value: api_data[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA] || pedido_reversao_justa_causa_initial_value, changed: false },
    };

    (data[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value as pedido_reversao_justa_causa)[PEDIDO_REVERSAO_JUSTA_CAUSA.INDENIZACAO_DANO_MORAL] = data[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.INDENIZACAO_DANO_MORAL] ?? true

    return data
}

export { formReducer, getFormStateFromApi }