import { FormState, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields"

export enum DESCARACTERIZACAO_CARGO_CONFIANCA {
    CARGO_RECLAMANTE = "cargo_reclamante",
    ATIVIDADES = "atividades",
    QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE = "quantidade_horas_trabalhadas_semanalmente"
}

export type descaracterizacao_cargo_confianca = {
    [DESCARACTERIZACAO_CARGO_CONFIANCA.ATIVIDADES]: null | string
    [DESCARACTERIZACAO_CARGO_CONFIANCA.CARGO_RECLAMANTE]: null | string
    [DESCARACTERIZACAO_CARGO_CONFIANCA.QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE]: null | number
}

export type DescaracterizacaoCargoConfiancaActions =
    // DESCARACTERIZACAO CARGO CONFIANCA
    | { type: 'SET_CARGO_RECLAMANTE', field: PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA, value: string }
    | { type: 'SET_ATIVIDADES', field: PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA, value: string }
    | { type: 'SET_QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE', field: PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA, value: number }

export interface IDescaracterizacaoCargoConfianca {
    setCargoReclamante(state: FormState, action: DescaracterizacaoCargoConfiancaActions): FormState
    setAtividades(state: FormState, action: DescaracterizacaoCargoConfiancaActions): FormState
    setQuantidadeHorasTrabalhadasSemanalmente(state: FormState, action: DescaracterizacaoCargoConfiancaActions): FormState
}

export type DescaracterizacaoCargoConfiancaError = {
    cargo_reclamante: boolean
    atividades: boolean
    quantidade_horas_trabalhadas_semanalmente: boolean
}