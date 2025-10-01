import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { excesso_horas_extras, ExcessoHorasExtrasActions, IExcessoHorasExtras } from "./types";

export class ExcessoHorasExtras implements IExcessoHorasExtras {
    setValorEstimado(state: FormState, action: ExcessoHorasExtrasActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    excesso_horas_extras: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO],
                        valor_estimado: action.value
                    } as excesso_horas_extras
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}