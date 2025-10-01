import { FormField, FormState, FUNDAMENTOS, PEDIDO_REVERSAO_JUSTA_CAUSA, pedido_reversao_justa_causa, RAZOES } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setFundamentos(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_FUNDAMENTOS') return state

        const checked = action.value.checked

        if (checked)
            return {
                ...state,
                [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: {
                    value: {
                        ...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value,
                        fundamentos: state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value && state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS] ? [...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS], action.value.value] : [action.value.value],
                    } as pedido_reversao_justa_causa,
                    changed: true
                }
            }
        else
            return {
                ...state,
                [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: {
                    value: {
                        ...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value,
                        fundamentos: state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.filter(
                            (v) => v !== action.value.value
                        ) as string[],
                        alegacao_empresa: state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value && state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.ALEGACAO_EMPRESA] && action.value.value != FUNDAMENTOS.VER_OPCAO_ABAIXO ? state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.ALEGACAO_EMPRESA] : null
                    } as pedido_reversao_justa_causa,
                    changed: true
                }
            }
    }
    setAlegacaoEmpresa(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_ALEGACAO_EMPRESA') return state

        return {
            ...state,
            [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: {
                value: {
                    ...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value,
                    alegacao_empresa: action.value
                } as pedido_reversao_justa_causa,
                changed: true
            }
        }
    }
    setRazoes(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RAZOES') return state

        const checked = action.value.checked

        if (checked)
            return {
                ...state,
                [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: {
                    value: {
                        ...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value,
                        razoes: state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value && state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES] ? [...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES], action.value.value] : [action.value.value],
                    } as pedido_reversao_justa_causa,
                    changed: true
                }
            }
        else
            return {
                ...state,
                [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: {
                    value: {
                        ...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value,
                        razoes: state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES]?.filter(
                            (v) => v !== action.value.value
                        ) as string[],
                        texto_outra_razao: state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value && state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.TEXTO_OUTRA_RAZAO] && action.value.value != RAZOES.OUTRA ? state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.TEXTO_OUTRA_RAZAO] : null
                    } as pedido_reversao_justa_causa,
                    changed: true
                }
            }
    }
    setTextoOutraRazao(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_TEXTO_OUTRA_RAZAO') return state

        return {
            ...state,
            [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: {
                value: {
                    ...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value,
                    texto_outra_razao: action.value
                } as pedido_reversao_justa_causa,
                changed: true
            }
        }
    }
    setIndenizacaoDanoMoral(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_INDENIZACAO_DANO_MORAL') return state

        const checked = action.value

        if (checked)
            return {
                ...state,
                [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: {
                    value: {
                        ...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value,
                        indenizacao_dano_moral: true
                    } as pedido_reversao_justa_causa,
                    changed: true
                }
            }
        else
            return {
                ...state,
                [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: {
                    value: {
                        ...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value,
                        indenizacao_dano_moral: false,
                        valor_indenizacao: null
                    } as pedido_reversao_justa_causa,
                    changed: true
                }
            }
    }
    setValorRescisao(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_RESCISAO') return state

        return {
            ...state,
            [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: {
                value: {
                    ...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value,
                    valor_rescisao: action.value
                } as pedido_reversao_justa_causa,
                changed: true
            }
        }
    }
    setValorIndenizacao(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_INDENIZACAO') return state

        return {
            ...state,
            [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: {
                value: {
                    ...state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value,
                    valor_indenizacao: action.value
                } as pedido_reversao_justa_causa,
                changed: true
            }
        }
    }

}