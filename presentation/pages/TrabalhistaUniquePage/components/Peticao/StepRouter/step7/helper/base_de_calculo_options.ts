import { base_calculo_salario_minimo, BASE_CALCULO_SALARIO_MINIMO } from "./FormTypesAndFields";

export const base_de_calculo_options: { descricao: string, value: base_calculo_salario_minimo }[] = [
    { descricao: 'Valor previsto em norma coletiva', value: BASE_CALCULO_SALARIO_MINIMO.VALOR_PREVISTO_NORMA_COLETIVA },
    { descricao: 'Salário (sem previsão em norma coletiva)', value: BASE_CALCULO_SALARIO_MINIMO.SALARIO },
    { descricao: 'Outra base', value: BASE_CALCULO_SALARIO_MINIMO.OUTRA_BASE },
]