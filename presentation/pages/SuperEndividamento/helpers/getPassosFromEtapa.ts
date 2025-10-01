export function getPassoFromEtapa(etapa: string): string {
    switch (etapa) {
        case '1.1': return '1'
        case '1.2': return '2'
        case '1.3': return '3'
        case '2.1': return '4'
        case '2.2': return '5'
        case '3.1': return '6'
        case '4.1': return '7'
        case '5.1': return '8'
        case '6.1': return '9'
        case '7.1': return '10'

        default: return '1'
    }
}