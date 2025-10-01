import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators"
import { ErrorStep9, FormField, PEDIDO_REVERSAO_JUSTA_CAUSA } from "./FormTypesAndFields"

export function isStep9FormInvalid(api_data: any): boolean {
    const erros: ErrorStep9 = {
        demais_campos: {
            valor_rescisao: false,
            razoes: false,
            fundamentos: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]

    if (demais_campos || true) {
        erros.demais_campos.valor_rescisao =
            !isPositive(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_RESCISAO] as number)
        erros.demais_campos.razoes =
            isFieldEmpty(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES])
        erros.demais_campos.fundamentos =
            isFieldEmpty(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS])
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}

export function isStep9MarkedAsError(api_data: any): boolean {
    const erros: ErrorStep9 = {
        demais_campos: {
            valor_rescisao: false,
            razoes: false,
            fundamentos: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]

    if (demais_campos || true) {
        erros.demais_campos.valor_rescisao =
            !isFieldEmpty(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_RESCISAO] as number)
        erros.demais_campos.razoes =
            !isFieldEmpty(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES])
        erros.demais_campos.fundamentos =
            !isFieldEmpty(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS])
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}