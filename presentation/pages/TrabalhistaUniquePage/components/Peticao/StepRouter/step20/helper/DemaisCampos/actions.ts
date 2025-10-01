import { FormField, FormState, hipotese, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setHipoteses(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_HIPOTESES') return state

        const checked = action.value.checked
        const hipotese = action.value.value as hipotese
        const hipoteses = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES] ?? []

        if (checked) {
            hipoteses.push(hipotese)

            return {
                ...state,
                [FormField.PEDIDO_DANOS_MORAIS]: {
                    value: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                        hipoteses
                    } as pedido_danos_morais,
                    changed: true
                }
            }

        } else {
            return {
                ...state,
                [FormField.PEDIDO_DANOS_MORAIS]: {
                    value: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                        hipoteses: hipoteses.filter(h => h != hipotese)
                    } as pedido_danos_morais,
                    changed: true
                }
            }
        }

    }
}