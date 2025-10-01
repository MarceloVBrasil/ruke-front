import { recebimento } from "./FormTypesAndFields";

export const recebimento_insalubridade_options: { descricao: string, value: recebimento }[] = [
    { descricao: 'Sempre recebeu, mas em grau inferior ao devido', value: 'sempre_recebeu' },
    { descricao: 'Recebeu em parte do contrato, mas tem direito no contrato todo', value: 'recebeu_em_parte' },
    { descricao: 'Nunca', value: 'nunca' },
]