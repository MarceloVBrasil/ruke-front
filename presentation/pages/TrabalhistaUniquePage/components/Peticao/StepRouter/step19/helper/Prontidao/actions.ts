import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { IProntidao, prontidao, ProntidaoActions } from "./types";

export class Prontidao implements IProntidao {
    setQuantidadeVezesSemana(state: FormState, action: ProntidaoActions): FormState {
        if (action.type != 'SET_QUANTIDADE_VEZES_SEMANA') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    prontidao: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.PRONTIDAO],
                        quantidade_vezes_semana: action.value
                    } as prontidao
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setValorEstimadoPedido(state: FormState, action: ProntidaoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    prontidao: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.PRONTIDAO],
                        valor_estimado_pedido: action.value
                    } as prontidao
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}