import { FormField, FormState, periodo_vinculo } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_PERIODO_VINCULO'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: periodo_vinculo }
    | { type: 'SET_DATA_INICIO'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO, value: string }
    | { type: 'SET_DATA_FIM'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: string }
    | { type: 'SET_PJ'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | boolean }
    | { type: 'SET_EMPREGADO_CLT'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | boolean }
    | { type: 'SET_REPRESENTANTE_COMERCIAL'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | boolean }
    | { type: 'SET_CONTRATO_REPRESENTANTE_COMERCIAL'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | boolean }
    | { type: 'SET_INSCRICAO_CORE'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | boolean }
    | { type: 'SET_REPRESENTACAO_COMERCIAL_MEI'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | boolean }
    | { type: 'SET_MOTORISTA_CARGAS'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | boolean }
    | { type: 'SET_MOTORISTA_VEICULO_PROPRIO'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | boolean }
    | { type: 'SET_MOTORISTA_INSCRICAO_ANTT'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | boolean }
    | { type: 'SET_MOTORISTA_TRES_ANOS_EXPERIENCIA'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | boolean }
    | { type: 'SET_MOTORISTA_APLICATIVO'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | boolean }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO'; field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO; value: null | number }

export interface IDemaisCampos {
    setPeriodoVinculo(state: FormState, action: DemaisCamposActions): FormState
    setDataInicio(state: FormState, action: DemaisCamposActions): FormState
    setDataFim(state: FormState, action: DemaisCamposActions): FormState
    setPJ(state: FormState, action: DemaisCamposActions): FormState
    setEmpregadoCLT(state: FormState, action: DemaisCamposActions): FormState
    setRepresentanteComercial(state: FormState, action: DemaisCamposActions): FormState
    setContratoRepresentanteComercial(state: FormState, action: DemaisCamposActions): FormState
    setInscricaoCore(state: FormState, action: DemaisCamposActions): FormState
    setRepresentacaoComercialMEI(state: FormState, action: DemaisCamposActions): FormState
    setMotoristaCargas(state: FormState, action: DemaisCamposActions): FormState
    setMotoristaVeiculoProprio(state: FormState, action: DemaisCamposActions): FormState
    setMotoristaInscricaoANTT(state: FormState, action: DemaisCamposActions): FormState
    setMotoristaTresAnosExperiencia(state: FormState, action: DemaisCamposActions): FormState
    setMotoristaAplicativo(state: FormState, action: DemaisCamposActions): FormState
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    valor_estimado_pedido: boolean
}