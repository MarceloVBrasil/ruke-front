export enum SITUACOES_VALUES {
    RECLAMANTE_PJ = "reclamante_pj",
    RECLAMANTE_REPRESENTANTE_COMERCIAL = "reclamante_representante_comercial",
    RECLAMANTE_MOTORISTA_CARGAS = "reclamante_motorista_cargas",
    RECLAMANTE_MOTORISTA_APLICATIVO = "reclamante_motorista_aplicativo"
}

export const situacoes: { descricao: string, value: string }[] = [
    { descricao: 'O reclamante prestava serviços como PJ (Pessoa Jurídica)', value: SITUACOES_VALUES.RECLAMANTE_PJ },
    { descricao: 'O reclamante era representante comercial', value: SITUACOES_VALUES.RECLAMANTE_REPRESENTANTE_COMERCIAL },
    { descricao: 'O reclamante era motorista de cargas', value: SITUACOES_VALUES.RECLAMANTE_MOTORISTA_CARGAS },
    { descricao: 'O reclamante era motorista de aplicativo', value: SITUACOES_VALUES.RECLAMANTE_MOTORISTA_APLICATIVO },
]