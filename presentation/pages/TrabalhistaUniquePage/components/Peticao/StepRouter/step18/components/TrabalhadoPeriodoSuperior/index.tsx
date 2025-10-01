import React, { Dispatch, useRef } from 'react'
import { Action, PEDIDO_AVISO_PREVIO } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridTextField from '@/presentation/components/GridTextField'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { TRABALHADO_PERIODO_SUPERIOR_30_DIAS, trabalhado_periodo_superior_30_dias, TrabalhadoPeriodoSuperior30DiasError } from '../../helper/TrabalhadoPeriodoSuperior/types'

interface ITrabalhadoPeriodoSuperior {
    trabalhado_periodo_superior: trabalhado_periodo_superior_30_dias | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: TrabalhadoPeriodoSuperior30DiasError
}

export default function TrabalhadoPeriodoSuperior(props: ITrabalhadoPeriodoSuperior) {
    const { trabalhado_periodo_superior, show, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)
    return (
        <Grid container spacing={1} sx={{
            display: show ? 'flex' : 'none'
        }}>

            <GridTextField
                xs={12}
                fullWidth
                type='number'
                label='Quantos dias de aviso prévio foram efetivamente pagos pelo reclamante?'
                variant='outlined'
                name={TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS}
                value={trabalhado_periodo_superior?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS] as number}
                onChange={handleQuantidadeDiasEfetivamentePagos}
                containerStyle={{ marginLeft: 5 }}
                error={error.quantidade_dias_efetivamente_pagos}
                helperText={error.quantidade_dias_efetivamente_pagos ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                fullWidth
                type='number'
                label='Quantos dias de aviso prévio faltaram ser pagos?'
                variant='outlined'
                name={TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS}
                value={trabalhado_periodo_superior?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS] as number}
                onChange={handleQuantidadeDiasFaltaramSerPagos}
                containerStyle={{ marginLeft: 5 }}
                error={error.quantidade_dias_faltaram_ser_pagos}
                helperText={error.quantidade_dias_faltaram_ser_pagos ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={TRABALHADO_PERIODO_SUPERIOR_30_DIAS.VALOR_ESTIMADO}
                defaultValue={trabalhado_periodo_superior?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.VALOR_ESTIMADO] ?? 0}
                label={'Qual o valor estimado do aviso prévio proporcional que foi trabalhado a mais?'}
                sx={{ marginTop: 3, ml: 0 }}
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
            />

        </Grid>
    )

    function handleQuantidadeDiasEfetivamentePagos(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS',
            field: PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS,
            value: parseInt(value)
        })
    }

    function handleQuantidadeDiasFaltaramSerPagos(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_DIAS_FALTARAM_SER_PAGOS',
            field: PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS,
            value: parseInt(value)
        })
    }

    function handleValorEstimadoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO',
            field: PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS,
            value: getGridCurrencyInputValue(valorEstimadoRef, TRABALHADO_PERIODO_SUPERIOR_30_DIAS.VALOR_ESTIMADO)
        })
    }
}
