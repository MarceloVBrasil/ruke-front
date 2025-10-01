import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setCargaHorariaSemanal(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_CARGA_HORARIA_SEMANAL_HORAS') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    carga_horaria_semanal_horas: action.value
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setHorarioInicioJornada(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_HORARIO_INICIO_JORNADA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horario_inicio_jornada: action.value
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setHorarioTerminoJornada(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_HORARIO_TERMINO_JORNADA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horario_termino_jornada: action.value
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setHorarioAlmoco(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_HORARIO_ALMOCO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    horario_almoco: action.value
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }


    setHipoteses(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_HIPOTESES') return state

        const checked = action.value.checked
        const hipotese = action.value.value
        let hipoteses = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HIPOTESES] ?? []
        hipoteses = [...new Set(hipoteses)] // remove duplicates

        if (checked) {
            hipoteses.push(hipotese)
            return {
                ...state,
                [FormField.PEDIDO_JORNADA_TRABALHO]: {
                    value: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                        hipoteses: hipoteses
                    } as pedido_jornada_trabalho,
                    changed: true
                }
            }
        }
        else {
            return {
                ...state,
                [FormField.PEDIDO_JORNADA_TRABALHO]: {
                    value: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                        hipoteses: hipoteses.filter(h => h !== hipotese)
                    } as pedido_jornada_trabalho,
                    changed: true
                }
            }
        }
    }
}