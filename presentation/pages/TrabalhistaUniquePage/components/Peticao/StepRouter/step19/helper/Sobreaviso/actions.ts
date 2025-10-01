import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { ISobreaviso, sobreaviso, SobreavisoActions } from "./types";

export class Sobreaviso implements ISobreaviso {
    setQuantidadeVezesSemana(state: FormState, action: SobreavisoActions): FormState {
        if (action.type != 'SET_QUANTIDADE_VEZES_SEMANA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    sobreaviso: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SOBREAVISO],
                        quantidade_vezes_semana: action.value
                    } as sobreaviso
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorEstimadoPedido(state: FormState, action: SobreavisoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    sobreaviso: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SOBREAVISO],
                        valor_estimado_pedido: action.value
                    } as sobreaviso
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}