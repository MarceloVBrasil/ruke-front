import { ADICIONAL_PERICULOSIDADE, adicional_periculosidade, FormField, FormState } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setRazoes(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RAZOES') return state

        const checked = action.value.checked

        if (checked)
            return {
                ...state,
                [FormField.ADCICIONAL_PERICULOSIDADE]: {
                    value: {
                        ...state[FormField.ADCICIONAL_PERICULOSIDADE].value,
                        razoes: state[FormField.ADCICIONAL_PERICULOSIDADE].value && state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES] ? [...state[FormField.ADCICIONAL_PERICULOSIDADE].value?.[ADICIONAL_PERICULOSIDADE.RAZOES] as string[], action.value.value] : [action.value.value]
                    } as adicional_periculosidade,
                    changed: true
                }
            }
        else
            return {
                ...state,
                [FormField.ADCICIONAL_PERICULOSIDADE]: {
                    value: {
                        ...state[FormField.ADCICIONAL_PERICULOSIDADE].value,
                        razoes: state[FormField.ADCICIONAL_PERICULOSIDADE].value?.[ADICIONAL_PERICULOSIDADE.RAZOES]?.filter(
                            (v) => v !== action.value.value
                        ) as string[],
                    } as adicional_periculosidade,
                    changed: true,
                },
            };
    }
    setCompreendeTodoContrato(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_COMPREENDE_TODO_CONTRATO') return state

        const compreende_totalidade = action.value

        if (compreende_totalidade)
            return {
                ...state,
                [FormField.ADCICIONAL_PERICULOSIDADE]: {
                    value: {
                        ...state[FormField.ADCICIONAL_PERICULOSIDADE].value,
                        compreende_todo_contrato: action.value,
                        data_fim: null,
                        data_inicio: null
                    } as adicional_periculosidade,
                    changed: true
                }
            }
        else
            return {
                ...state,
                [FormField.ADCICIONAL_PERICULOSIDADE]: {
                    value: {
                        ...state[FormField.ADCICIONAL_PERICULOSIDADE].value,
                        compreende_todo_contrato: action.value
                    } as adicional_periculosidade,
                    changed: true
                }
            }
    }
    setDataInicio(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_DATA_INICIO') return state

        return {
            ...state,
            [FormField.ADCICIONAL_PERICULOSIDADE]: {
                value: {
                    ...state[FormField.ADCICIONAL_PERICULOSIDADE].value,
                    data_inicio: action.value
                } as adicional_periculosidade,
                changed: true
            }
        }
    }
    setDataFim(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_DATA_FIM') return state

        return {
            ...state,
            [FormField.ADCICIONAL_PERICULOSIDADE]: {
                value: {
                    ...state[FormField.ADCICIONAL_PERICULOSIDADE].value,
                    data_fim: action.value
                } as adicional_periculosidade,
                changed: true
            }
        }
    }
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.ADCICIONAL_PERICULOSIDADE]: {
                value: {
                    ...state[FormField.ADCICIONAL_PERICULOSIDADE].value,
                    valor_estimado_pedido: action.value
                } as adicional_periculosidade,
                changed: true
            }
        }
    }

}