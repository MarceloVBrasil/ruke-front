import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { adicional_noturno, AdicionalNoturnoActions, IAdicionalNoturno } from "./types";

export class AdicionalNorturno implements IAdicionalNoturno {
    setValorEstimadoPedido(state: FormState, action: AdicionalNoturnoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    adicional_noturno: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.ADICIONAL_NOTURNO],
                        valor_estimado_pedido: action.value
                    } as adicional_noturno
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}