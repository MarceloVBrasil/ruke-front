import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { Action, PEDIDO_FERIAS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridTextField from '@/presentation/components/GridTextField'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PAGAMENTO_INTEMPESTIVO_FERIAS, pagamento_intempestivo_ferias, PagamentoIntempestivoFeriasError } from '../../helper/PagamentoIntempestivoFerias/types'
import { PEDIDO_FERIAS_NAO_GOZADAS } from '../../helper/FeriasNaoGozadas/types'

interface IPagamentoIntempestivo {
    situacao: pagamento_intempestivo_ferias | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: PagamentoIntempestivoFeriasError
}

export default function PagamentoIntempestivo(props: IPagamentoIntempestivo) {
    const { situacao, show, setFormHasChanged, dispatch, error } = props
    const valorEstimadoInputRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container sx={{
            boxShadow: 3, borderRadius: 2, padding: 2, paddingRight: 3, marginTop: 1,
            display: show ? 'block' : 'none'
        }}>
            <GridTextField
                xs={12}
                label='Qual foi a data de início do gozo de férias?'
                type='date'
                fullWidth
                name={PEDIDO_FERIAS_NAO_GOZADAS.PERIODOS_FERIAS}
                value={situacao?.[PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_INICIO] as string}
                variant='outlined'
                onChange={handleDataInicioChange}
                error={error.data_inicio}
                helperText={error.data_inicio ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                label='Quando o pagamento das férias foi realizado?'
                type='date'
                fullWidth
                name={PEDIDO_FERIAS_NAO_GOZADAS.PERIODOS_FERIAS}
                value={situacao?.[PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_PAGAMENTO_REALIZADO] as string}
                variant='outlined'
                onChange={handledataPagamentoRealizadoChange}
                error={error.data_pagamento_realizado}
                helperText={error.data_pagamento_realizado ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoInputRef}
                onBlur={handleValorEstimadoPedidoChange}
                name={PAGAMENTO_INTEMPESTIVO_FERIAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO}
                defaultValue={situacao?.[PEDIDO_FERIAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] ?? 0}
                label={'Qual o valor estimado das férias em dobro?'}
                sx={{ marginTop: 3 }}
                error={error.valor_estimado_pagamento_em_dobro}
                helperText={error.valor_estimado_pagamento_em_dobro ? 'Campo obrigatório' : ' '}
            />
        </Grid>
    )

    function handleDataInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INICIO',
            field: PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS,
            value
        })
    }

    function handledataPagamentoRealizadoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_PAGAMENTO_REALIZADO',
            field: PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS,
            value
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO',
            field: PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS,
            value: getGridCurrencyInputValue(valorEstimadoInputRef, PAGAMENTO_INTEMPESTIVO_FERIAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO)
        })
    }
}
