import { FormField, FormState, hipotese } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_CARGA_HORARIA_SEMANAL_HORAS', field: FormField.PEDIDO_JORNADA_TRABALHO, value: number }
    | { type: 'SET_HORARIO_INICIO_JORNADA', field: FormField.PEDIDO_JORNADA_TRABALHO, value: string }
    | { type: 'SET_HORARIO_TERMINO_JORNADA', field: FormField.PEDIDO_JORNADA_TRABALHO, value: string }
    | { type: 'SET_HORARIO_ALMOCO', field: FormField.PEDIDO_JORNADA_TRABALHO, value: string }
    | { type: 'SET_HIPOTESES', field: FormField.PEDIDO_JORNADA_TRABALHO, value: { checked: boolean, value: hipotese } }

export interface IDemaisCampos {
    setCargaHorariaSemanal(state: FormState, action: DemaisCamposActions): FormState
    setHorarioInicioJornada(state: FormState, action: DemaisCamposActions): FormState
    setHorarioTerminoJornada(state: FormState, action: DemaisCamposActions): FormState
    setHorarioAlmoco(state: FormState, action: DemaisCamposActions): FormState
    setHipoteses(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    hipoteses: boolean
    horario_inicio_jornada: boolean
    horario_termino_jornada: boolean,
    horario_almoco: boolean,
    carga_horaria_semanal: boolean
}