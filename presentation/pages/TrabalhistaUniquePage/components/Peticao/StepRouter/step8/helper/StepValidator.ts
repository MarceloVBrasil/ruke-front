import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators"
import { ADICIONAL_PERICULOSIDADE, ErrorStep8, FormField } from "./FormTypesAndFields"

export function isStep8FormInvalid(api_data: any): boolean {
    const erros: ErrorStep8 = {
        demais_campos: {
            valor_estimado_pedido: false
        }
    }

    const demais_campos = api_data[FormField.ADCICIONAL_PERICULOSIDADE]

    if (demais_campos || true) {
        erros.demais_campos.valor_estimado_pedido =
            !isPositive(demais_campos?.[ADICIONAL_PERICULOSIDADE.VALOR_ESTIMADO_PEDIDO] as number)
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}

export function isStep8MarkedAsError(api_data: any): boolean {

    const erros: ErrorStep8 = {
        demais_campos: {
            valor_estimado_pedido: false
        }
    }

    const demais_campos = api_data[FormField.ADCICIONAL_PERICULOSIDADE]

    if (demais_campos || true) {
        erros.demais_campos.valor_estimado_pedido =
            !isFieldEmpty(demais_campos?.[ADICIONAL_PERICULOSIDADE.VALOR_ESTIMADO_PEDIDO] as number)
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}