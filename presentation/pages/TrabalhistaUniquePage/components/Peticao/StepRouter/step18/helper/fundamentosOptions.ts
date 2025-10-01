import { FUNDAMENTO_LABEL, FUNDAMENTO_VALUE } from "./FormTypesAndFields";

export const fundamentos_options: { descricao: string, value: string }[] = [
    {
        descricao: FUNDAMENTO_LABEL.PAGAMENTO_A_MENOR,
        value: FUNDAMENTO_VALUE.PAGAMENTO_A_MENOR
    },

    {
        descricao: FUNDAMENTO_LABEL.TRABALHADO_PERIODO_SUPERIOR_30_DIAS,
        value: FUNDAMENTO_VALUE.TRABALHADO_PERIODO_SUPERIOR_30_DIAS
    },

    {
        descricao: FUNDAMENTO_LABEL.AUSENCIA_PAGAMENTO,
        value: FUNDAMENTO_VALUE.AUSENCIA_PAGAMENTO
    },

    {
        descricao: FUNDAMENTO_LABEL.TRABALHADO_SEM_REDUCAO_JORNADA_OU_DISPENSA,
        value: FUNDAMENTO_VALUE.TRABALHADO_SEM_REDUCAO_JORNADA_OU_DISPENSA
    }
]