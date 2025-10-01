import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { AcumuloFuncaoActions, AcumuloFuncaoError, pedido_acumulo_funcao } from "./AcumuloFuncao/types"
import { ActCctActions, ActCctError, pedido_act_cct } from "./CCTACT/types"
import { DesvioFuncaoActions, DesvioFuncaoError, pedido_desvio_funcao } from "./DesvioFuncao/types"
import { DiferencaSalarialActions, DiferencasSalariaisError, pedido_diferenca_salarial } from "./DiferencasSalariais/types"
import { pedido_salario_substituicao, SalarioSubstituicaoActions, SalarioSubstituicaoError } from "./SalarioSubstituicao/types"

export interface ErrorStep10 {
    acumulo_funcao: AcumuloFuncaoError
    act_cct: ActCctError
    desvio_funcao: DesvioFuncaoError
    diferencas_salariais: DiferencasSalariaisError
    salario_substituicao: SalarioSubstituicaoError
    especiais: ErroEspecialStep10
}

type ErroEspecialStep10 = {
    nenhum_campo_preenchido: boolean
}

export enum FormField {
    PEDIDO_DIFERENCAS_SALARIAIS = PEDIDOS_CHAVES_IGUAIS_A_API.DIFERENCAS_SALARIAIS,
    PEDIDO_DESVIO_FUNCAO = "pedido_desvio_funcao",
    PEDIDO_ACT_CCT = "pedido_act_cct",
    PEDIDO_ACUMULO_FUNCAO = "pedido_acumulo_funcao",
    PEDIDO_SALARIO_SUBSTITUICAO = "pedido_salario_substituicao",
}



export type FormState = {
    [FormField.PEDIDO_DIFERENCAS_SALARIAIS]: { value: null | pedido_diferenca_salarial, changed: boolean }
    [FormField.PEDIDO_DESVIO_FUNCAO]: { value: null | pedido_desvio_funcao, changed: boolean }
    [FormField.PEDIDO_ACT_CCT]: { value: null | pedido_act_cct, changed: boolean }
    [FormField.PEDIDO_ACUMULO_FUNCAO]: { value: null | pedido_acumulo_funcao, changed: boolean }
    [FormField.PEDIDO_SALARIO_SUBSTITUICAO]: { value: null | pedido_salario_substituicao, changed: boolean }
}

export type Action =
    | AcumuloFuncaoActions
    | ActCctActions
    | DesvioFuncaoActions
    | DiferencaSalarialActions
    | SalarioSubstituicaoActions
