export type divida = {
    id?: string
    data: string
    credor: string
    natureza: string
    numero_de_parcelas: number
    valor_base_parcelas_sem_juros: number
    juros_remuneratorios: number
    juros_mora_mes: number
    valor_total_divida: number
    valor_pago: number
    parcelas_vencidas: boolean
    valor_que_falta_pagar: number
}