import { PF } from "@/app/types/pf";
import { PJ } from "@/app/types/pj";
import { periodo_responsabilidade } from "./PeriodoResponsabilidade";

export enum RAZAO_INCLUSAO_POLO_PASSIVO {
    RESPONSAVEL_SUBSIDIARIO = "responsavel_subsidiario",
    PERIODO_RESPONSABILIDADE = "periodo_responsabilidade",
    RESPONSAVEL_SOLIDARIO = "responsavel_solidario",
    SUCESSAO_EMPRESARIAL = "sucessao_empresarial",
}

export const razao_inclusao_polo_passivo_initial_state: razao_inclusao_polo_passivo = {
    [RAZAO_INCLUSAO_POLO_PASSIVO.RESPONSAVEL_SUBSIDIARIO]: false,
    [RAZAO_INCLUSAO_POLO_PASSIVO.PERIODO_RESPONSABILIDADE]: "todo_contrato_de_trabalho",
    [RAZAO_INCLUSAO_POLO_PASSIVO.RESPONSAVEL_SOLIDARIO]: false,
    [RAZAO_INCLUSAO_POLO_PASSIVO.SUCESSAO_EMPRESARIAL]: false
}

export type razao_inclusao_polo_passivo = {
    [RAZAO_INCLUSAO_POLO_PASSIVO.RESPONSAVEL_SUBSIDIARIO]: boolean
    [RAZAO_INCLUSAO_POLO_PASSIVO.PERIODO_RESPONSABILIDADE]: periodo_responsabilidade | ''
    [RAZAO_INCLUSAO_POLO_PASSIVO.RESPONSAVEL_SOLIDARIO]: boolean
    [RAZAO_INCLUSAO_POLO_PASSIVO.SUCESSAO_EMPRESARIAL]: boolean
}

export type PF_RECLAMADA = PF & { principal: boolean, razao_inclusao_polo_passivo: null | razao_inclusao_polo_passivo }
export type PJ_RECLAMADA = PJ & { principal: boolean, razao_inclusao_polo_passivo: null | razao_inclusao_polo_passivo }

export enum FormField {
    PESSOAS_JURIDICAS_RECLAMADAS = "reclamadas_pj",
    PESSOAS_FISICAS_RECLAMADAS = "reclamadas_pf",
    CIDADE_ACAO = 'cidade_acao',
    ESTADO_ACAO = 'estado_acao'
}

export type FormState = {
    [FormField.PESSOAS_JURIDICAS_RECLAMADAS]: { value: PJ_RECLAMADA[], changed: boolean };
    [FormField.PESSOAS_FISICAS_RECLAMADAS]: { value: PF_RECLAMADA[], changed: boolean };
};

export type Action =
    | { type: 'ADD'; field: FormField.PESSOAS_FISICAS_RECLAMADAS | FormField.PESSOAS_JURIDICAS_RECLAMADAS; value: PJ_RECLAMADA | PF_RECLAMADA }
    | { type: 'EDIT'; field: FormField.PESSOAS_FISICAS_RECLAMADAS | FormField.PESSOAS_JURIDICAS_RECLAMADAS; value: PJ_RECLAMADA[] | PF_RECLAMADA[] }
    | { type: 'DELETE'; field: FormField.PESSOAS_FISICAS_RECLAMADAS | FormField.PESSOAS_JURIDICAS_RECLAMADAS; value: PJ_RECLAMADA[] | PF_RECLAMADA[] }
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'RESET' };
