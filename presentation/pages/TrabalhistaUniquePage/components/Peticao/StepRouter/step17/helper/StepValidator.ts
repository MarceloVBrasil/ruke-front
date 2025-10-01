import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators";
import { ErrorStep17, FormField, PEDIDO_GARANTIA_PROVISORIA_EMPREGO } from "./FormTypesAndFields";

export function isStep17FormInvalid(api_data: any) {
    const erros: ErrorStep17 = {
        demais_campos: {
            valor_estimado_pedido: false,
            data_inicio: false,
            reclamante_esta_periodo_estabilidade: false,
            data_termino: false,
            razao_estabilidade: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO]

    if (demais_campos || true) {
        erros.demais_campos.valor_estimado_pedido =
            !isPositive(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.demais_campos.data_inicio =
            isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_INICIO] as number)
        erros.demais_campos.data_termino =
            isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_TERMINO] as string)
        erros.demais_campos.reclamante_esta_periodo_estabilidade =
            isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RECLAMANTE_ESTA_PERIODO_ESTABILIDADE] as boolean)
        erros.demais_campos.razao_estabilidade =
            isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RAZAO_ESTABILIDADE] as string)
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}

export function isStep17MarkedAsError(api_data: any) {
    const erros: ErrorStep17 = {
        demais_campos: {
            valor_estimado_pedido: false,
            data_inicio: false,
            reclamante_esta_periodo_estabilidade: false,
            data_termino: false,
            razao_estabilidade: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO]

    if (demais_campos || true) {
        erros.demais_campos.valor_estimado_pedido =
            !isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.demais_campos.data_inicio =
            !isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_INICIO] as string)
        erros.demais_campos.data_termino =
            !isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_TERMINO] as string)
        erros.demais_campos.reclamante_esta_periodo_estabilidade =
            !isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RECLAMANTE_ESTA_PERIODO_ESTABILIDADE] as boolean)
        erros.demais_campos.razao_estabilidade =
            !isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RAZAO_ESTABILIDADE] as string)
    }

    return (
        false
        || someTruthyValue(erros.demais_campos)
    )
}