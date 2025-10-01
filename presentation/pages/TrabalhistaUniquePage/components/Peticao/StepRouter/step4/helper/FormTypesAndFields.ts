export interface ICrossRegrasNegocioDadosContrato {
    carteira_trabalho_anotada: boolean
    pedir_reversao_justa_causa: boolean
    pedir_multa_art_477: boolean
}

export enum FormField {
    DATA_INICIO_CONTRATO = "data_inicio_contrato",
    DATA_FIM_CONTRATO = "data_fim_contrato",
    CARGO = "cargo",
    DADOS_CONTRATO = "dados_contrato",
    REMUNERACAO = "remuneracao",
    CONTRATO_ATIVO = "contrato_ativo"
}

export enum DADOS_CONTRATO {
    MOTIVO_ENCERRAMENTO = "motivo_encerramento",
    AVISO_PREVIO = "aviso_previo",
    REVERSAO_CAUSA_JUSTA = "reversao_justa_causa",
    DEIXAR_DE_TRABALHAR = "deixar_de_trabalhar",
    CARTEIRA_DE_TRABALHO_ANOTADA = "carteira_de_trabalho_anotada",
    VERBAS_RESCISORIAS = "verbas_rescisorias"
}

export enum VERBAS_RESCISORIAS {
    PAGAMENTO_RESCISAO = "pagamento_rescisao",
    PAGAMENTO_PRAZO_DEZ_DIAS = "pagamento_prazo_dez_dias",
    DOCUMENTOS_ENTRGUES_PRAZO_DEZ_DIAS = "documentos_entregues_prazo_dez_dias",
    PEDIR_MULTA_ART_477 = "pedir_multa_art_477"
}

export type pagamento_rescisao = 'sim' | 'nao' | 'parcial'

export type verbas_rescisorias = {
    [VERBAS_RESCISORIAS.PAGAMENTO_RESCISAO]: pagamento_rescisao,
    [VERBAS_RESCISORIAS.PAGAMENTO_PRAZO_DEZ_DIAS]: boolean
    [VERBAS_RESCISORIAS.DOCUMENTOS_ENTRGUES_PRAZO_DEZ_DIAS]: boolean
    [VERBAS_RESCISORIAS.PEDIR_MULTA_ART_477]: boolean
}

export type dados_contrato = {
    [DADOS_CONTRATO.MOTIVO_ENCERRAMENTO]: string,
    [DADOS_CONTRATO.AVISO_PREVIO]: string
    [DADOS_CONTRATO.REVERSAO_CAUSA_JUSTA]: boolean,
    [DADOS_CONTRATO.DEIXAR_DE_TRABALHAR]: boolean,
    [DADOS_CONTRATO.CARTEIRA_DE_TRABALHO_ANOTADA]: boolean
    [DADOS_CONTRATO.VERBAS_RESCISORIAS]: verbas_rescisorias
}



export enum MOTIVOS_ENCERRAMENTO {
    INICIATIVA_RECLAMADA = "iniciativa_reclamada",
    INICIATIVA_RECLAMANTE = "iniciativa_reclamante",
    PRAZO_DETERMINADO = "prazo_determinado",
    JUSTA_CAUSA = "justa_causa",
    RESCISAO_INDIRETA = "rescisao_indireta",
}

export type FormState = {
    [FormField.DATA_INICIO_CONTRATO]: { value: string, changed: boolean };
    [FormField.DATA_FIM_CONTRATO]: { value: string, changed: boolean };
    [FormField.CONTRATO_ATIVO]: { value: boolean, changed: boolean };
    [FormField.CARGO]: { value: string, changed: boolean };
    [FormField.DADOS_CONTRATO]: { value: dados_contrato, changed: boolean };
    [FormField.REMUNERACAO]: { value: number, changed: boolean };
};

export type Action =
    | { type: 'SET_FIELD'; field: keyof FormState; value: string }
    | { type: 'SET_CONTRATO_ATIVO_FIELD'; field: FormField.CONTRATO_ATIVO, value: boolean }
    | { type: 'SET_MOTIVO_ENCERRAMENTO_FIELD'; field: FormField.DADOS_CONTRATO; value: string }
    | { type: 'SET_AVISO_PREVIO_FIELD'; field: FormField.DADOS_CONTRATO; value: string }
    | { type: 'SET_REVERSAO_JUSTA_CAUSA_FIELD'; field: FormField.DADOS_CONTRATO; value: boolean }
    | { type: 'SET_DEIXAR_DE_TRABALHAR_FIELD'; field: FormField.DADOS_CONTRATO; value: boolean }
    | { type: 'SET_CARTEIRA_TRABALHO_ANOTADA_FIELD'; field: FormField.DADOS_CONTRATO; value: boolean }
    | { type: 'SET_PAGAMENTO_RECISAO_FIELD'; field: FormField.DADOS_CONTRATO; value: pagamento_rescisao }
    | { type: 'SET_PAGAMENTO_PRAZO_DEZ_DIAS_FIELD'; field: FormField.DADOS_CONTRATO; value: boolean }
    | { type: 'SET_DOCUMENTOS_ENTREGUES_PRAZO_DEZ_DIAS_FIELD'; field: FormField.DADOS_CONTRATO; value: boolean }
    | { type: 'SET_PEDIR_MULTA_ART_477_FIELD'; field: FormField.DADOS_CONTRATO; value: boolean }
    | { type: 'SET_MONEY_FIELD'; field: FormField.REMUNERACAO; value: number }
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'RESET' };