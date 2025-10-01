import { FormField, FormState, pedido_aviso_previo, PEDIDO_AVISO_PREVIO } from "../FormTypesAndFields";
import { ITrabalhadoReducaoJornadaUltimos7Dias, trabalhado_reducao_jornada_ultimos_7_dias, TrabalhadoReducaoJornadaUltimos7DiasActions } from "./types";

export class TrabalhadoReducaoJornadaUltimos7Dias implements ITrabalhadoReducaoJornadaUltimos7Dias {
    setDataProjetadoTermino(state: FormState, action: TrabalhadoReducaoJornadaUltimos7DiasActions): FormState {
        if (action.type != 'SET_DATA_PROJETADO_TERMINO') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    trabalhado_reducao_jornada_ultimos_7_dias: {
                        ...state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS],
                        data_projecao_termino: action.value
                    } as trabalhado_reducao_jornada_ultimos_7_dias
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }
    setValorEstimado(state: FormState, action: TrabalhadoReducaoJornadaUltimos7DiasActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    trabalhado_reducao_jornada_ultimos_7_dias: {
                        ...state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS],
                        valor_estimado: action.value
                    } as trabalhado_reducao_jornada_ultimos_7_dias
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }

}