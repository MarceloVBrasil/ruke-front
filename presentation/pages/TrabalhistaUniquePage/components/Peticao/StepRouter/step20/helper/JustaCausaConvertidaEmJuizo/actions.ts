import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { IJustaCausaRevertidaEmJuizo, justa_causa_revertida_em_juizo, JustaCausaRevertidaEmJuizoActions } from "./types";

export class JustaCausaRevertidaEmJuizo implements IJustaCausaRevertidaEmJuizo {
    setValorEstimado(state: FormState, action: JustaCausaRevertidaEmJuizoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    justa_causa_revertida_em_juizo: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO],
                        valor_estimado: action.value
                    } as justa_causa_revertida_em_juizo
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}