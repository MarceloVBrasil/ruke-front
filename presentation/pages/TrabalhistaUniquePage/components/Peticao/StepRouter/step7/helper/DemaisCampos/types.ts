import { base_calculo_salario_minimo, FormField, FormState, qual_grau_deveria_receber, recebia_em_que_grau, recebimento } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_RECEBIMENTO'; field: FormField.ADCICIONAL_INSALUBRIDADE, value: recebimento }
    | { type: 'SET_QUAL_GRAU_DEVERIA_RECEBER'; field: FormField.ADCICIONAL_INSALUBRIDADE; value: qual_grau_deveria_receber }
    | { type: 'SET_RECEBIA_EM_QUE_GRAU'; field: FormField.ADCICIONAL_INSALUBRIDADE; value: recebia_em_que_grau }
    | { type: 'SET_LIMPEZA_BANHEIRO'; field: FormField.ADCICIONAL_INSALUBRIDADE; value: null | boolean }
    | { type: 'SET_RECEBEU_ADICIONAL_BANHEIRO'; field: FormField.ADCICIONAL_INSALUBRIDADE, value: null | boolean }
    | { type: 'SET_BASE_CALCULO_SALARIO_MINIMO'; field: FormField.ADCICIONAL_INSALUBRIDADE; value: base_calculo_salario_minimo; }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO'; field: FormField.ADCICIONAL_INSALUBRIDADE; value: number; }

export interface IDemaisCampos {
    setRecebimento(state: FormState, action: DemaisCamposActions): FormState
    setQualGrauDeveriaReceber(state: FormState, action: DemaisCamposActions): FormState
    setRecebiaEmQueGrau(state: FormState, action: DemaisCamposActions): FormState
    setLimpezaBanheiro(state: FormState, action: DemaisCamposActions): FormState
    setRecebeuAdicionalBanheiro(state: FormState, action: DemaisCamposActions): FormState
    setBaseCalculoSalarioMinimo(state: FormState, action: DemaisCamposActions): FormState
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    recebimento: boolean
    limpeza_banheiro: boolean
    qual_grau_deveria_receber: boolean
}