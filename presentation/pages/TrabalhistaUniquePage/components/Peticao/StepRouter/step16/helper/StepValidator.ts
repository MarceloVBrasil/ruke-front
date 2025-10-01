import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators";
import { ErrorStep16, FormField, PEDIDO_FALTA_DEPOSITO_FGTS } from "./FormTypesAndFields";

export function isStep16FormInvalid(api_data: any) {
    const erros: ErrorStep16 = {
        demais_campos: {
            valor_estimado_pedido: false,
            reclamada_efetuou_depositos: false,
            data_inicio: false,
            data_termino: false,
            valor_estimado_fgts_nao_depositado: false,
            reclamante_demitido_sem_justa_causa: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_FALTA_DEPOSITO_FGTS]

    if (demais_campos || true) {
        erros.demais_campos.valor_estimado_pedido =
            !isPositive(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_PEDIDO] as number)
        erros.demais_campos.reclamada_efetuou_depositos =
            isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS])

        if (demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS] === false) {
            erros.demais_campos.data_inicio =
                isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.DATA_INICIO] as string)
            erros.demais_campos.data_termino =
                isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.DATA_TERMINO] as string)
            erros.demais_campos.valor_estimado_fgts_nao_depositado =
                !isPositive(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO] as number)
            erros.demais_campos.reclamante_demitido_sem_justa_causa =
                isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA] as boolean)
        }
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}

export function isStep16MarkedAsError(api_data: any) {
    const erros: ErrorStep16 = {
        demais_campos: {
            valor_estimado_pedido: false,
            reclamada_efetuou_depositos: false,
            data_inicio: false,
            data_termino: false,
            valor_estimado_fgts_nao_depositado: false,
            reclamante_demitido_sem_justa_causa: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_FALTA_DEPOSITO_FGTS]

    if (demais_campos || true) {
        erros.demais_campos.valor_estimado_pedido =
            !isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_PEDIDO] as number)
        erros.demais_campos.reclamada_efetuou_depositos =
            !isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS])

        if (demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS] === false) {
            erros.demais_campos.data_inicio =
                !isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.DATA_INICIO] as string)
            erros.demais_campos.data_termino =
                !isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.DATA_TERMINO] as string)
            erros.demais_campos.valor_estimado_fgts_nao_depositado =
                !isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO] as number)
            erros.demais_campos.reclamante_demitido_sem_justa_causa =
                !isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA] as boolean)
        }
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}