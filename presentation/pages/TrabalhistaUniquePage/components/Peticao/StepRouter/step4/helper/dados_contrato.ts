import { MOTIVOS_ENCERRAMENTO } from "./FormTypesAndFields";

type option = { descricao: string, value: string | boolean }

export const motivos_encerramento: option[] = [
    { descricao: 'Iniciativa da parte reclamada', value: MOTIVOS_ENCERRAMENTO.INICIATIVA_RECLAMADA },
    { descricao: 'Iniciativa da parte reclamante', value: MOTIVOS_ENCERRAMENTO.INICIATIVA_RECLAMANTE },
    { descricao: 'Prazo determinado', value: MOTIVOS_ENCERRAMENTO.PRAZO_DETERMINADO },
    { descricao: 'Justa causa', value: MOTIVOS_ENCERRAMENTO.JUSTA_CAUSA },
    { descricao: 'Recisão indireta', value: MOTIVOS_ENCERRAMENTO.RESCISAO_INDIRETA },

]

export const aviso_previo: option[] = [
    { descricao: 'Indenizado', value: 'indenizado' },
    { descricao: 'Trabalhado', value: 'trabalhado' },
]

export const reversao_justa_causa: option[] = [
    { descricao: 'Sim', value: true },
    { descricao: 'Não', value: false },
]

export const deixar_de_trabalhar: option[] = [
    { descricao: 'Sim, o reclamante vai deixar de trabalhar.', value: true },
    { descricao: 'Não, o reclamante vai continuar trabalhando.', value: false },
]