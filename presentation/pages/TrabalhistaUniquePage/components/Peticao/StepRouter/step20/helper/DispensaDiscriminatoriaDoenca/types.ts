import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum DISPENSA_DISCRIMINATORIA_DOENCA {
    DOENCA_DIAGNOSTICADA_RECLAMANTE = "doenca_diagnosticada_reclamante",
    DATA_DIAGNOSTICO = "data_diagnostico",
    VALOR_ESTIMADO = "valor_estimado",
}

export type dispensa_discriminatoria_doenca = {
    [DISPENSA_DISCRIMINATORIA_DOENCA.DATA_DIAGNOSTICO]: null | string
    [DISPENSA_DISCRIMINATORIA_DOENCA.DOENCA_DIAGNOSTICADA_RECLAMANTE]: null | string
    [DISPENSA_DISCRIMINATORIA_DOENCA.VALOR_ESTIMADO]: null | number
}

export type DispensaDiscriminatoriaDoencaActions =
    | { type: 'SET_DOENCA_DIAGNOSTICADA_RECLAMANTE', field: PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA, value: string }
    | { type: 'SET_DATA_DIAGNOSTICO', field: PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA, value: string }
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA, value: number }

export interface IDispensaDiscriminatoriaDoenca {
    setDoencaReclamante(state: FormState, action: DispensaDiscriminatoriaDoencaActions): FormState
    setDataDiagnostico(state: FormState, action: DispensaDiscriminatoriaDoencaActions): FormState
    setValorEstimado(state: FormState, action: DispensaDiscriminatoriaDoencaActions): FormState
}

export type DispensaDiscriminatoriaDoencaError = {
    valor_estimado: boolean
    data_diagnostico: boolean
    doenca_diagnosticada_reclamante: boolean
}