import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { ILaborAosDomingos, labor_aos_domingos_sem_contraprestacao, LaborAosDomingosActions } from "./types";

export class LaborAosDomingos implements ILaborAosDomingos {
    setQuantidadeDomingosMes(state: FormState, action: LaborAosDomingosActions): FormState {
        if (action.type != 'SET_QUANTIDADE_DOMINGOS_POR_MES') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    labor_aos_domingos_sem_contraprestacao: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO],
                        quantidade_domingos_por_mes: action.value
                    } as labor_aos_domingos_sem_contraprestacao
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorPagoPorFora(state: FormState, action: LaborAosDomingosActions): FormState {
        if (action.type != 'SET_VALOR_PAGO_POR_FORA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    labor_aos_domingos_sem_contraprestacao: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO],
                        valor_pago_por_fora: action.value
                    } as labor_aos_domingos_sem_contraprestacao
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}