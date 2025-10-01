import { isFieldEmpty, someTruthyValue } from "@/app/utils/validators"
import { ADICIONAL_INSALUBRIDADE, ErrorStep7, FormField } from "./FormTypesAndFields"

export function isStep7FormInvalid(api_data: any): boolean {
    const erros: ErrorStep7 = {
        demais_campos: {
            recebimento: false,
            limpeza_banheiro: false,
            qual_grau_deveria_receber: false
        }
    }

    const demais_campos = api_data[FormField.ADCICIONAL_INSALUBRIDADE]

    if (demais_campos || true) {
        erros.demais_campos.limpeza_banheiro =
            isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.LIMPEZA_BANHEIRO] as boolean)
        erros.demais_campos.recebimento =
            isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] as string)
        erros.demais_campos.qual_grau_deveria_receber =
            demais_campos?.[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] != 'recebeu_em_parte' && isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER] as string)
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}

export function isStep7MarkedAsError(api_data: any): boolean {
    const erros: ErrorStep7 = {
        demais_campos: {
            recebimento: false,
            limpeza_banheiro: false,
            qual_grau_deveria_receber: false
        }
    }

    const demais_campos = api_data[FormField.ADCICIONAL_INSALUBRIDADE]

    if (demais_campos || true) {
        erros.demais_campos.limpeza_banheiro =
            !isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.LIMPEZA_BANHEIRO] as boolean)
        erros.demais_campos.recebimento =
            !isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] as string)
        erros.demais_campos.qual_grau_deveria_receber =
            demais_campos?.[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] != 'recebeu_em_parte' && !isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER] as string)
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}