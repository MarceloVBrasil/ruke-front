import { allNullValue, isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators"
import { ErrorStep10, FormField } from "./FormTypesAndFields"
import { PEDIDO_ACT_CCT } from "./CCTACT/types"
import { PEDIDO_ACUMULO_FUNCAO } from "./AcumuloFuncao/types"
import { PEDIDO_DESVIO_FUNCAO } from "./DesvioFuncao/types"
import { PEDIDO_DIFERENCA_SALARIAL } from "./DiferencasSalariais/types"
import { PEDIDO_SALARIO_SUBSTITUICAO } from "./SalarioSubstituicao/types"

export function isStep10FormInvalid(api_data: any): boolean {
    const erros: ErrorStep10 = {
        acumulo_funcao: {
            valor_estimado: false
        },
        act_cct: {
            valor_estimado: false
        },
        desvio_funcao: {
            valor_estimado: false
        },
        diferencas_salariais: {
            valor_estimado: false,
            paradigmas: false
        },
        salario_substituicao: {
            valor_estimado: false,
            data_final: false,
            data_inicial: false,
            nome_empregado_substituido: false,
            motivo_substituicao: false
        },
        especiais: {
            nenhum_campo_preenchido: false
        }
    }

    const pedido_act_cct = api_data[FormField.PEDIDO_ACT_CCT]
    const pedido_acumulo_funcao = api_data[FormField.PEDIDO_ACUMULO_FUNCAO]
    const pedido_desvio_funcao = api_data[FormField.PEDIDO_DESVIO_FUNCAO]
    const pedido_diferencas_salariais = api_data[FormField.PEDIDO_DIFERENCAS_SALARIAIS]
    const pedido_salario_substituicao = api_data[FormField.PEDIDO_SALARIO_SUBSTITUICAO]

    if (pedido_act_cct) {
        erros.act_cct.valor_estimado = !isPositive(pedido_act_cct[PEDIDO_ACT_CCT.VALOR_ESTIMADO_PEDIDO])
    }

    if (pedido_acumulo_funcao) {
        erros.acumulo_funcao.valor_estimado = !isPositive(pedido_acumulo_funcao[PEDIDO_ACUMULO_FUNCAO.VALOR_ESTIMADO_PEDIDO])
    }

    if (pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.FUNDAMENTO] || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.INTERVALOS] || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.OUTROS_FUNDAMENTOS] || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO] === true || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO] === false || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO]) {
        erros.desvio_funcao.valor_estimado = !isPositive(pedido_desvio_funcao[PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO])
    }

    if (pedido_diferencas_salariais?.[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS] || pedido_diferencas_salariais?.[PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO]) {
        erros.diferencas_salariais.valor_estimado = !isPositive(pedido_diferencas_salariais[PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO])
        erros.diferencas_salariais.paradigmas = isFieldEmpty(pedido_diferencas_salariais[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS])
    }

    if (pedido_salario_substituicao) {
        erros.salario_substituicao.valor_estimado = !isPositive(pedido_salario_substituicao[PEDIDO_SALARIO_SUBSTITUICAO.VALOR_ESTIMADO_PEDIDO])
        erros.salario_substituicao.data_final = isFieldEmpty(pedido_salario_substituicao[PEDIDO_SALARIO_SUBSTITUICAO.DATA_FINAL])
        erros.salario_substituicao.data_inicial = isFieldEmpty(pedido_salario_substituicao[PEDIDO_SALARIO_SUBSTITUICAO.DATA_INICIAL])
        erros.salario_substituicao.nome_empregado_substituido = isFieldEmpty(pedido_salario_substituicao[PEDIDO_SALARIO_SUBSTITUICAO.NOME_EMPREGADO_SUBSTITUIDO])
        erros.salario_substituicao.motivo_substituicao = isFieldEmpty(pedido_salario_substituicao[PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO])
    }

    if (true
        && !pedido_act_cct
        && !pedido_acumulo_funcao
        && !pedido_desvio_funcao
        && !pedido_diferencas_salariais
        && !pedido_salario_substituicao
    ) { erros.especiais.nenhum_campo_preenchido = true }

    if (true
        && !pedido_act_cct
        && !pedido_acumulo_funcao
        && !pedido_salario_substituicao
        && allNullValue(pedido_diferencas_salariais)
        && allNullValue(pedido_desvio_funcao)
    ) erros.especiais.nenhum_campo_preenchido = true


    return (
        false
        || someTruthyValue(erros.act_cct)
        || someTruthyValue(erros.acumulo_funcao)
        || someTruthyValue(erros.desvio_funcao)
        || someTruthyValue(erros.diferencas_salariais)
        || someTruthyValue(erros.salario_substituicao)
        || someTruthyValue(erros.especiais)
    )
}

export function isStep10MarkedAsError(api_data: any): boolean {
    const erros: ErrorStep10 = {
        acumulo_funcao: {
            valor_estimado: false
        },
        act_cct: {
            valor_estimado: false
        },
        desvio_funcao: {
            valor_estimado: false
        },
        diferencas_salariais: {
            valor_estimado: false,
            paradigmas: false
        },
        salario_substituicao: {
            valor_estimado: false,
            data_final: false,
            data_inicial: false,
            nome_empregado_substituido: false,
            motivo_substituicao: false
        },
        especiais: {
            nenhum_campo_preenchido: false
        }
    }

    const pedido_act_cct = api_data[FormField.PEDIDO_ACT_CCT]
    const pedido_acumulo_funcao = api_data[FormField.PEDIDO_ACUMULO_FUNCAO]
    const pedido_desvio_funcao = api_data[FormField.PEDIDO_DESVIO_FUNCAO]
    const pedido_diferencas_salariais = api_data[FormField.PEDIDO_DIFERENCAS_SALARIAIS]
    const pedido_salario_substituicao = api_data[FormField.PEDIDO_SALARIO_SUBSTITUICAO]


    if (pedido_act_cct) {
        erros.act_cct.valor_estimado = !isFieldEmpty(pedido_act_cct[PEDIDO_ACT_CCT.VALOR_ESTIMADO_PEDIDO])
    }

    if (pedido_acumulo_funcao) {
        erros.acumulo_funcao.valor_estimado = !isFieldEmpty(pedido_acumulo_funcao[PEDIDO_ACUMULO_FUNCAO.VALOR_ESTIMADO_PEDIDO])
    }

    if (pedido_desvio_funcao) {
        erros.desvio_funcao.valor_estimado = !isFieldEmpty(pedido_desvio_funcao[PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO])
    }

    if (pedido_diferencas_salariais) {
        erros.diferencas_salariais.valor_estimado = !isFieldEmpty(pedido_diferencas_salariais[PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO])
        erros.diferencas_salariais.paradigmas = !isFieldEmpty(pedido_diferencas_salariais[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS])
    }

    if (pedido_salario_substituicao) {
        erros.salario_substituicao.valor_estimado = !isFieldEmpty(pedido_salario_substituicao[PEDIDO_SALARIO_SUBSTITUICAO.VALOR_ESTIMADO_PEDIDO])
        erros.salario_substituicao.data_final = !isFieldEmpty(pedido_salario_substituicao[PEDIDO_SALARIO_SUBSTITUICAO.DATA_FINAL])
        erros.salario_substituicao.data_inicial = !isFieldEmpty(pedido_salario_substituicao[PEDIDO_SALARIO_SUBSTITUICAO.DATA_INICIAL])
        erros.salario_substituicao.nome_empregado_substituido = !isFieldEmpty(pedido_salario_substituicao[PEDIDO_SALARIO_SUBSTITUICAO.NOME_EMPREGADO_SUBSTITUIDO])
        erros.salario_substituicao.motivo_substituicao = !isFieldEmpty(pedido_salario_substituicao[PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO])
    }

    return (
        false
        || someTruthyValue(erros.act_cct)
        || someTruthyValue(erros.acumulo_funcao)
        || someTruthyValue(erros.desvio_funcao)
        || someTruthyValue(erros.diferencas_salariais)
        || someTruthyValue(erros.salario_substituicao)

    )
}