import { adicional_insalubridade, FormField, FormState } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setRecebimento(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RECEBIMENTO') return state

        const recebimento = action.value

        switch (recebimento) {
            case 'nunca':
                return {
                    ...state,
                    [FormField.ADCICIONAL_INSALUBRIDADE]: {
                        value: {
                            ...state[FormField.ADCICIONAL_INSALUBRIDADE].value,
                            recebimento,
                            recebia_em_que_grau: null,
                            qual_grau_deveria_receber: null
                        } as adicional_insalubridade, changed: true
                    }
                }
            case 'sempre_recebeu':
                return {
                    ...state,
                    [FormField.ADCICIONAL_INSALUBRIDADE]: {
                        value: {
                            ...state[FormField.ADCICIONAL_INSALUBRIDADE].value,
                            recebimento,
                        } as adicional_insalubridade, changed: true
                    }
                }
            case 'recebeu_em_parte':
                return {
                    ...state,
                    [FormField.ADCICIONAL_INSALUBRIDADE]: {
                        value: {
                            ...state[FormField.ADCICIONAL_INSALUBRIDADE].value,
                            recebimento,
                            recebia_em_que_grau: null,
                            qual_grau_deveria_receber: null
                        } as adicional_insalubridade, changed: true
                    }
                }
            default:
                return state
        }
    }
    setQualGrauDeveriaReceber(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_QUAL_GRAU_DEVERIA_RECEBER') return state

        return {
            ...state,
            [FormField.ADCICIONAL_INSALUBRIDADE]: {
                value: {
                    ...state[FormField.ADCICIONAL_INSALUBRIDADE].value,
                    qual_grau_deveria_receber: action.value
                } as adicional_insalubridade,
                changed: true
            }
        }
    }
    setRecebiaEmQueGrau(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RECEBIA_EM_QUE_GRAU') return state

        return {
            ...state,
            [FormField.ADCICIONAL_INSALUBRIDADE]: {
                value: {
                    ...state[FormField.ADCICIONAL_INSALUBRIDADE].value,
                    recebia_em_que_grau: action.value,
                    qual_grau_deveria_receber: null
                } as adicional_insalubridade,
                changed: true
            }
        }
    }
    setLimpezaBanheiro(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_LIMPEZA_BANHEIRO') return state

        const fazia_limpeza_banheiro = action.value

        if (fazia_limpeza_banheiro)

            return {
                ...state,
                [FormField.ADCICIONAL_INSALUBRIDADE]: {
                    value: {
                        ...state[FormField.ADCICIONAL_INSALUBRIDADE].value,
                        limpeza_banheiro: true
                    } as adicional_insalubridade,
                    changed: true
                }
            }
        else
            return {
                ...state,
                [FormField.ADCICIONAL_INSALUBRIDADE]: {
                    value: {
                        ...state[FormField.ADCICIONAL_INSALUBRIDADE].value,
                        limpeza_banheiro: false,
                        recebeu_adicional_banheiro: null
                    } as adicional_insalubridade,
                    changed: true
                }
            }
    }
    setRecebeuAdicionalBanheiro(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_RECEBEU_ADICIONAL_BANHEIRO') return state

        return {
            ...state,
            [FormField.ADCICIONAL_INSALUBRIDADE]: {
                value: {
                    ...state[FormField.ADCICIONAL_INSALUBRIDADE].value,
                    recebeu_adicional_banheiro: action.value
                } as adicional_insalubridade,
                changed: true
            }
        }
    }
    setBaseCalculoSalarioMinimo(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_BASE_CALCULO_SALARIO_MINIMO') return state

        return {
            ...state,
            [FormField.ADCICIONAL_INSALUBRIDADE]: {
                value: {
                    ...state[FormField.ADCICIONAL_INSALUBRIDADE].value,
                    base_calculo_salario_minimo: action.value
                } as adicional_insalubridade,
                changed: true
            }
        }
    }
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.ADCICIONAL_INSALUBRIDADE]: {
                value: {
                    ...state[FormField.ADCICIONAL_INSALUBRIDADE].value,
                    valor_estimado_pedido: action.value
                } as adicional_insalubridade,
                changed: true
            }
        }
    }

}