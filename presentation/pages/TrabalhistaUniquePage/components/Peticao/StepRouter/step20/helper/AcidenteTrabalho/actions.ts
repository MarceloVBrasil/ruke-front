import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { acidente_trabalho, AcidenteTrabalhoActions, IAcidenteTrabalho } from "./types";

export class AcidenteTrabalho implements IAcidenteTrabalho {
    setDataAcidente(state: FormState, action: AcidenteTrabalhoActions): FormState {
        if (action.type != 'SET_DATA_ACIDENTE') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    acidente_trabalho: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO],
                        data_acidente: action.value
                    } as acidente_trabalho
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setDescricaoAcidente(state: FormState, action: AcidenteTrabalhoActions): FormState {
        if (action.type != 'SET_DESCRICAO_ACIDENTE') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    acidente_trabalho: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO],
                        descricao_acidente: action.value
                    } as acidente_trabalho
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setValorEstimado(state: FormState, action: AcidenteTrabalhoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    acidente_trabalho: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO],
                        valor_estimado: action.value
                    } as acidente_trabalho
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}