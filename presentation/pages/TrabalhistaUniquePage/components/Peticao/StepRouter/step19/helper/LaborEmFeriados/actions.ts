import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { ILaborEmFeriados, labor_em_feriados, LaborEmFeriadosActions } from "./types";

export class LaborEmFeriados implements ILaborEmFeriados {
    setQuantidadeFeriadosPorAno(state: FormState, action: LaborEmFeriadosActions): FormState {
        if (action.type != 'SET_QUANTIDADE_FERIADOS_POR_ANO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    labor_em_feriados: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS],
                        quantidade_feriados_por_ano: action.value
                    } as labor_em_feriados
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorEstimadoHorasTrabalhadas(state: FormState, action: LaborEmFeriadosActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_HORAS_TRABALHADAS') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    labor_em_feriados: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS],
                        valor_estimado_horas_trabalhadas: action.value
                    } as labor_em_feriados
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setFeriasdosTrabalhados(state: FormState, action: LaborEmFeriadosActions): FormState {
        if (action.type != 'SET_FERIADOS_TRABALHADOS') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    labor_em_feriados: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS],
                        feriados_trabalhados: action.value
                    } as labor_em_feriados
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}