export function getPassoFromEtapa(etapa: string): string {
    switch (etapa) {
        case '1': return '1'
        case '2': return '2'
        case '3': return '3'
        case '4': return '4'
        case '5': return '5'
        case 'vinculo_empregaticio': return '6'
        case 'insalubridade': return '7'
        case 'periculosidade': return '8'
        case 'reversao_justa_causa': return '9'
        case 'diferencas_salariais': return '10'
        case 'gorjetas': return '11'
        case 'rescisao_indireta': return '12'
        case 'ferias': return '13'
        case 'multa_477': return '14'
        case 'gratuidade_justica': return '15'
        case 'falta_deposito_fgts': return '16'
        case 'garantia_provisoria_emprego': return '17'
        case 'aviso_previo': return '18'
        case 'jornada_trabalho': return '19'
        case 'danos_morais': return '20'
        case 'configuracoes_finais': return '21'

        default: return '1'
    }
}