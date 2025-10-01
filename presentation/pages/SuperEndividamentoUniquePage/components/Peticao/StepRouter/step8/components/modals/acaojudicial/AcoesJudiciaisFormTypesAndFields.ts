import { acao_judicial } from "@/app/types/acao_judicial";

export interface ErrorAcaoJudicialModal {
    acao_judicial: boolean
}

export type Action =
    | { type: 'SET_FIELD'; field: keyof acao_judicial; value: acao_judicial }
    | { type: 'RESET' };
