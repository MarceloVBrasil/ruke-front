import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators"
import { ErrorStep14, FormField, PEDIDO_MULTA_477 } from "./FormTypesAndFields"
import { NAO_PAGAS_DENTRO_PRAZO_LEGAL } from "./NaoPagoPrazoLegal/types"
import { PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO } from "./PagoForaPrazoLegal/types"
import { PAGAS_FORMA_PARCELADA_PEDIDO } from "./PagoFormaParcelada/types"

export function isStep14FormInvalid(api_data: any) {
    const erros: ErrorStep14 = {
        nao_pagas_dentro_prazo_legal: {
            data_projecao: false
        },
        pagas_fora_prazo_legal: {
            data_projecao: false,
            data_pagamento: false
        },
        pagas_forma_parcelada: {
            data_projecao: false,
            quantidade_parcelas: false
        },
        demais_campos: {
            valor_estimado_pedido: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_MULTA_477]
    const nao_pago_prazo_legal = api_data[FormField.PEDIDO_MULTA_477]?.[PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL]
    const pagas_fora_prazo_legal = api_data[FormField.PEDIDO_MULTA_477]?.[PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO]
    const pagas_forma_parcelada = api_data[FormField.PEDIDO_MULTA_477]?.[PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO]

    if (nao_pago_prazo_legal) {
        erros.nao_pagas_dentro_prazo_legal.data_projecao =
            !!nao_pago_prazo_legal?.[NAO_PAGAS_DENTRO_PRAZO_LEGAL.PROJECAO_AVISO_PREVIO] && isFieldEmpty(nao_pago_prazo_legal?.[NAO_PAGAS_DENTRO_PRAZO_LEGAL.DATA_PROJECAO])
    }

    if (demais_campos || true) {
        erros.demais_campos.valor_estimado_pedido =
            !isPositive(demais_campos?.[PEDIDO_MULTA_477.VALOR_ESTIMADO_PEDIDO] as number)
    }

    if (pagas_fora_prazo_legal) {
        if (pagas_fora_prazo_legal?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.PROJECAO_AVISO_PREVIO]) {
            erros.pagas_fora_prazo_legal.data_projecao =
                isFieldEmpty(pagas_fora_prazo_legal?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PROJECAO] as string)
            erros.pagas_fora_prazo_legal.data_pagamento =
                isFieldEmpty(pagas_fora_prazo_legal?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PAGAMENTO_VERBAS] as string)
        }
    }

    if (pagas_forma_parcelada) {
        if (pagas_forma_parcelada?.[PAGAS_FORMA_PARCELADA_PEDIDO.PROJECAO_AVISO_PREVIO]) {
            erros.pagas_forma_parcelada.data_projecao =
                isFieldEmpty(pagas_forma_parcelada?.[PAGAS_FORMA_PARCELADA_PEDIDO.DATA_PROJECAO] as string)
            erros.pagas_forma_parcelada.quantidade_parcelas =
                !isPositive(pagas_forma_parcelada?.[PAGAS_FORMA_PARCELADA_PEDIDO.QUANTIDADE_PARCELAS] as number)
        }
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.nao_pagas_dentro_prazo_legal)
        || someTruthyValue(erros.pagas_fora_prazo_legal)
        || someTruthyValue(erros.pagas_forma_parcelada)
    )
}

export function isStep14MarkedAsError(api_data: any) {
    const erros: ErrorStep14 = {
        nao_pagas_dentro_prazo_legal: {
            data_projecao: false
        },
        pagas_fora_prazo_legal: {
            data_projecao: false,
            data_pagamento: false
        },
        pagas_forma_parcelada: {
            data_projecao: false,
            quantidade_parcelas: false
        },
        demais_campos: {
            valor_estimado_pedido: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_MULTA_477]
    const nao_pago_prazo_legal = api_data[FormField.PEDIDO_MULTA_477]?.[PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL]
    const pagas_fora_prazo_legal = api_data[FormField.PEDIDO_MULTA_477]?.[PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO]
    const pagas_forma_parcelada = api_data[FormField.PEDIDO_MULTA_477]?.[PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO]

    if (demais_campos || true) {
        erros.demais_campos.valor_estimado_pedido =
            !isFieldEmpty(demais_campos?.[PEDIDO_MULTA_477.VALOR_ESTIMADO_PEDIDO] as number)
    }

    if (nao_pago_prazo_legal) {
        erros.nao_pagas_dentro_prazo_legal.data_projecao =
            !isFieldEmpty(nao_pago_prazo_legal?.[NAO_PAGAS_DENTRO_PRAZO_LEGAL.DATA_PROJECAO])
    }

    if (pagas_fora_prazo_legal) {
        erros.pagas_fora_prazo_legal.data_projecao =
            !isFieldEmpty(pagas_fora_prazo_legal?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PROJECAO] as string)
        erros.pagas_fora_prazo_legal.data_pagamento =
            !isFieldEmpty(pagas_fora_prazo_legal?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PAGAMENTO_VERBAS] as string)
    }

    if (pagas_forma_parcelada) {
        erros.pagas_forma_parcelada.data_projecao =
            !isFieldEmpty(pagas_forma_parcelada?.[PAGAS_FORMA_PARCELADA_PEDIDO.DATA_PROJECAO] as string)
        erros.pagas_forma_parcelada.quantidade_parcelas =
            !isFieldEmpty(pagas_forma_parcelada?.[PAGAS_FORMA_PARCELADA_PEDIDO.QUANTIDADE_PARCELAS] as number)
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.nao_pagas_dentro_prazo_legal)
        || someTruthyValue(erros.pagas_fora_prazo_legal)
        || someTruthyValue(erros.pagas_forma_parcelada)
    )
}