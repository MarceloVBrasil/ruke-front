import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators";
import { ErrorStep12, FormField, PEDIDO_RESCISAO_INDIRETA } from "./FormTypesAndFields";
import { INTERRUPCAO_ATIVIDADES_PEDIDO } from "./InterrupcaoAtividades/types";
import { CONTINUA_TRABALHANDO_PEDIDO } from "./ContinuaTrabalhando/types";

export function isStep12FormInvalid(api_data: any): boolean {
    const erros: ErrorStep12 = {
        demais_campos: {
            valor_estimado_pedido: false,
            continua_trabalhando_ou_interrompeu_atividades: false
        },
        interrupcao_atividades: {
            alineas: false,
            data_interrupcao: false,
            data_projecao_aviso_previo: false,
            falta_grave: false
        },
        continua_trabalhando: {
            alineas: false,
            falta_grave: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_RESCISAO_INDIRETA]
    if (demais_campos || true) {
        erros.demais_campos.valor_estimado_pedido =
            !isPositive(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.VALOR_ESTIMADO_PEDIDO])
        erros.demais_campos.continua_trabalhando_ou_interrompeu_atividades =
            isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO])
            || isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERROMPEU_AS_ATIVIDADES])

        if (demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERROMPEU_AS_ATIVIDADES]) {
            erros.interrupcao_atividades.alineas =
                isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS] as string[])
            erros.interrupcao_atividades.data_interrupcao =
                isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.DATA_INTERRUPCAO] as string)
            erros.interrupcao_atividades.data_projecao_aviso_previo =
                isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.PROJECAO_AVISO_PREVIO] as string)
            erros.interrupcao_atividades.falta_grave =
                isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.FALTA_GRAVE] as string)
        }

        if (demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO]) {
            erros.continua_trabalhando.alineas =
                isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS] as string[])
            erros.continua_trabalhando.falta_grave =
                isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]?.[CONTINUA_TRABALHANDO_PEDIDO.FALTA_GRAVE] as string)
        }
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.interrupcao_atividades)
        || someTruthyValue(erros.continua_trabalhando)
    )
}

export function isStep12MarkedAsError(api_data: any): boolean {
    const erros: ErrorStep12 = {
        demais_campos: {
            valor_estimado_pedido: false,
            continua_trabalhando_ou_interrompeu_atividades: false
        },
        interrupcao_atividades: {
            alineas: false,
            data_interrupcao: false,
            data_projecao_aviso_previo: false,
            falta_grave: false
        },
        continua_trabalhando: {
            alineas: false,
            falta_grave: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_RESCISAO_INDIRETA]

    if (demais_campos) {
        erros.demais_campos.valor_estimado_pedido =
            !isFieldEmpty(demais_campos[PEDIDO_RESCISAO_INDIRETA.VALOR_ESTIMADO_PEDIDO])
        erros.demais_campos.continua_trabalhando_ou_interrompeu_atividades =
            !isFieldEmpty(demais_campos[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO])
            || !isFieldEmpty(demais_campos[PEDIDO_RESCISAO_INDIRETA.INTERROMPEU_AS_ATIVIDADES])

        if (demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERROMPEU_AS_ATIVIDADES]) {
            erros.interrupcao_atividades.alineas =
                !isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS] as string[])
            erros.interrupcao_atividades.data_interrupcao =
                !isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.DATA_INTERRUPCAO] as string)
            erros.interrupcao_atividades.data_projecao_aviso_previo =
                !isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.PROJECAO_AVISO_PREVIO] as string)
            erros.interrupcao_atividades.falta_grave =
                !isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.FALTA_GRAVE] as string)
        }

        if (demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO]) {
            erros.continua_trabalhando.alineas =
                !isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS] as string[])
            erros.continua_trabalhando.falta_grave =
                !isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]?.[CONTINUA_TRABALHANDO_PEDIDO.FALTA_GRAVE] as string)
        }
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.interrupcao_atividades)
        || someTruthyValue(erros.continua_trabalhando)
    )
}