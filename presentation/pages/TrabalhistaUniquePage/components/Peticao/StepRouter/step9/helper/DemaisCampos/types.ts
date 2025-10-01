import { FormField, FormState, razao } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_FUNDAMENTOS', field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA, value: { checked: boolean, value: string } }
    | { type: 'SET_ALEGACAO_EMPRESA', field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA, value: string }
    | { type: 'SET_RAZOES', field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA, value: { checked: boolean, value: razao } }
    | { type: 'SET_TEXTO_OUTRA_RAZAO', field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA, value: string }
    | { type: 'SET_INDENIZACAO_DANO_MORAL', field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA, value: boolean }
    | { type: 'SET_VALOR_INDENIZACAO', field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA, value: number }
    | { type: 'SET_VALOR_RESCISAO', field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA, value: number }

export interface IDemaisCampos {
    setFundamentos(state: FormState, action: DemaisCamposActions): FormState
    setAlegacaoEmpresa(state: FormState, action: DemaisCamposActions): FormState
    setRazoes(state: FormState, action: DemaisCamposActions): FormState
    setTextoOutraRazao(state: FormState, action: DemaisCamposActions): FormState
    setIndenizacaoDanoMoral(state: FormState, action: DemaisCamposActions): FormState
    setValorIndenizacao(state: FormState, action: DemaisCamposActions): FormState
    setValorRescisao(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    valor_rescisao: boolean
    razoes: boolean
    fundamentos: boolean
}