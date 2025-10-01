import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { ISonegacaoVerbasTrabalhistas, sonegacao_verbas_trabalhistas, SonegacaoVerbasTrabalhistasActions } from "./types";

export class SonegacaoVerbasTrabalhistas implements ISonegacaoVerbasTrabalhistas {
    setVerbasSonegadas(state: FormState, action: SonegacaoVerbasTrabalhistasActions): FormState {
        if (action.type != 'SET_VERBAS_SONEGADAS') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    sonegacao_verbas_trabalhistas: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS],
                        verbas_sonegadas: action.value
                    } as sonegacao_verbas_trabalhistas
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setValorEstimado(state: FormState, action: SonegacaoVerbasTrabalhistasActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    sonegacao_verbas_trabalhistas: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS],
                        valor_estimado: action.value
                    } as sonegacao_verbas_trabalhistas
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}