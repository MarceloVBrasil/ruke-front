import { isFieldEmpty, someTruthyValue } from "@/app/utils/validators"
import { ErrorStep15, FormField, PEDIDO_GRATUIDADE_JUSTICA } from "./FormTypesAndFields"

export function isStep15FormInvalid(api_data: any) {
    const erros: ErrorStep15 = {
        demais_campos: {
            reclamante_desempregado: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_GRATUIDADE_JUSTICA]

    if (demais_campos || true) {
        erros.demais_campos.reclamante_desempregado =
            isFieldEmpty(demais_campos?.[PEDIDO_GRATUIDADE_JUSTICA.RECLAMANTE_DESEMPREGADO] as boolean)
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}

export function isStep15MarkedAsError(api_data: any) {
    const erros: ErrorStep15 = {
        demais_campos: {
            reclamante_desempregado: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_GRATUIDADE_JUSTICA]

    if (demais_campos || true) {
        erros.demais_campos.reclamante_desempregado =
            !isFieldEmpty(demais_campos?.[PEDIDO_GRATUIDADE_JUSTICA.RECLAMANTE_DESEMPREGADO] as boolean)
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}