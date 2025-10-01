import { FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "../FormTypesAndFields";
import { descaracterizacao_cargo_confianca, DescaracterizacaoCargoConfiancaActions, IDescaracterizacaoCargoConfianca } from "./types";

export class DescaracterizacaoCargoConfianca implements IDescaracterizacaoCargoConfianca {
    setCargoReclamante(state: FormState, action: DescaracterizacaoCargoConfiancaActions): FormState {
        if (action.type != 'SET_CARGO_RECLAMANTE') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    descaracterizacao_cargo_confianca: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA],
                        cargo_reclamante: action.value
                    } as descaracterizacao_cargo_confianca
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setAtividades(state: FormState, action: DescaracterizacaoCargoConfiancaActions): FormState {
        if (action.type != 'SET_ATIVIDADES') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    descaracterizacao_cargo_confianca: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA],
                        atividades: action.value
                    } as descaracterizacao_cargo_confianca
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }

    setQuantidadeHorasTrabalhadasSemanalmente(state: FormState, action: DescaracterizacaoCargoConfiancaActions): FormState {
        if (action.type != 'SET_QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE') return state

        return {
            ...state,
            [FormField.PEDIDO_JORNADA_TRABALHO]: {
                value: {
                    ...state[FormField.PEDIDO_JORNADA_TRABALHO].value,
                    descaracterizacao_cargo_confianca: {
                        ...state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA],
                        quantidade_horas_trabalhadas_semanalmente: action.value
                    } as descaracterizacao_cargo_confianca
                } as pedido_jornada_trabalho,
                changed: true
            }
        }
    }
}