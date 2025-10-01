import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators"
import { ErrorStep6, FormField, RECONHECIMENTO_VINCULO_EMPREGATICIO } from "./FormTypesAndFields"

export function isStep6FormInvalid(api_data: any): boolean {
    const erros: ErrorStep6 = {
        demais_campos: {
            valor_estimado_pedido: false
        }
    }

    const demais_campos = api_data[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]

    if (demais_campos || true) {
        erros.demais_campos.valor_estimado_pedido =
            !isPositive(demais_campos?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.VALOR_ESTIMADO_PEDIDO] as number)
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}

export function isStep6MarkedAsError(api_data: any): boolean {
    const erros: ErrorStep6 = {
        demais_campos: {
            valor_estimado_pedido: false
        }
    }

    const demais_campos = api_data[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]

    if (demais_campos || true) {
        erros.demais_campos.valor_estimado_pedido =
            !isFieldEmpty(demais_campos?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.VALOR_ESTIMADO_PEDIDO] as number)
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}