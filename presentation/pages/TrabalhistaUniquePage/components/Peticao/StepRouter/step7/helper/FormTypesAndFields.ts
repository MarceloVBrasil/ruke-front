import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"

export interface ErrorStep7 {
    demais_campos: DemaisCamposError
}

export enum FormField {
    ADCICIONAL_INSALUBRIDADE = PEDIDOS_CHAVES_IGUAIS_A_API.ADICIONAL_INSALUBRIDADE
}

export enum ADICIONAL_INSALUBRIDADE {
    RECEBIMENTO = "recebimento",
    QUAL_GRAU_DEVERIA_RECEBER = "qual_grau_deveria_receber",
    RECEBIA_EM_QUE_GRAU = "recebia_em_que_grau",
    LIMPEZA_BANHEIRO = "limpeza_banheiro",
    RECEBEU_ADICIONAL_BANHEIRO = "recebeu_adicional_banheiro",
    BASE_CALCULO_SALARIO_MINIMO = "base_calculo_salario_minimo",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export enum GRAU {
    MINIMO = 'Grau Mínimo (10%)',
    MEDIO = 'Grau Médio (20%)',
    MAXIMO = 'Grau Máximo (40%)',
}

export enum BASE_CALCULO_SALARIO_MINIMO {
    VALOR_PREVISTO_NORMA_COLETIVA = "valor_previsto_norma_coletiva",
    SALARIO = "salario",
    OUTRA_BASE = "outra_base"
}

export type recebimento = null | 'nunca' | 'sempre_recebeu' | 'recebeu_em_parte'
export type qual_grau_deveria_receber = null | GRAU.MINIMO | GRAU.MEDIO | GRAU.MAXIMO
export type recebia_em_que_grau = null | GRAU.MINIMO | GRAU.MEDIO | GRAU.MAXIMO
export type base_calculo_salario_minimo = null | BASE_CALCULO_SALARIO_MINIMO.VALOR_PREVISTO_NORMA_COLETIVA | BASE_CALCULO_SALARIO_MINIMO.SALARIO | string

export type adicional_insalubridade = {
    [ADICIONAL_INSALUBRIDADE.RECEBIMENTO]: recebimento
    [ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER]: qual_grau_deveria_receber
    [ADICIONAL_INSALUBRIDADE.RECEBIA_EM_QUE_GRAU]: recebia_em_que_grau
    [ADICIONAL_INSALUBRIDADE.LIMPEZA_BANHEIRO]: null | boolean
    [ADICIONAL_INSALUBRIDADE.RECEBEU_ADICIONAL_BANHEIRO]: null | boolean
    [ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO]: base_calculo_salario_minimo
    [ADICIONAL_INSALUBRIDADE.VALOR_ESTIMADO_PEDIDO]: null | number
}

export const adicional_insalubridade_initial_value: adicional_insalubridade = {
    [ADICIONAL_INSALUBRIDADE.RECEBIMENTO]: null,
    [ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER]: null,
    [ADICIONAL_INSALUBRIDADE.RECEBIA_EM_QUE_GRAU]: null,
    [ADICIONAL_INSALUBRIDADE.LIMPEZA_BANHEIRO]: null,
    [ADICIONAL_INSALUBRIDADE.RECEBEU_ADICIONAL_BANHEIRO]: null,
    [ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO]: null,
    [ADICIONAL_INSALUBRIDADE.VALOR_ESTIMADO_PEDIDO]: null
}

export type FormState = {
    [FormField.ADCICIONAL_INSALUBRIDADE]: { value: adicional_insalubridade, changed: boolean }
}

export type Action =
    | DemaisCamposActions
