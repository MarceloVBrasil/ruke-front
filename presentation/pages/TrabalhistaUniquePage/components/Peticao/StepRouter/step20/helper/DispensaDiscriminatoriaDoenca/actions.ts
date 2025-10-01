import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { dispensa_discriminatoria_doenca, DispensaDiscriminatoriaDoencaActions, IDispensaDiscriminatoriaDoenca } from "./types";

export class DispensaDiscriminatoriaDoenca implements IDispensaDiscriminatoriaDoenca {
    setDoencaReclamante(state: FormState, action: DispensaDiscriminatoriaDoencaActions): FormState {
        if (action.type != 'SET_DOENCA_DIAGNOSTICADA_RECLAMANTE') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    dispensa_discriminatoria_doenca: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA],
                        doenca_diagnosticada_reclamante: action.value
                    } as dispensa_discriminatoria_doenca
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setDataDiagnostico(state: FormState, action: DispensaDiscriminatoriaDoencaActions): FormState {
        if (action.type != 'SET_DATA_DIAGNOSTICO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    dispensa_discriminatoria_doenca: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA],
                        data_diagnostico: action.value
                    } as dispensa_discriminatoria_doenca
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setValorEstimado(state: FormState, action: DispensaDiscriminatoriaDoencaActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    dispensa_discriminatoria_doenca: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA],
                        valor_estimado: action.value
                    } as dispensa_discriminatoria_doenca
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}