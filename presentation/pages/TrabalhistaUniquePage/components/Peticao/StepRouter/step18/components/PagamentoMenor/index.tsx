import React, { Dispatch, useRef } from 'react'
import { Action, PEDIDO_AVISO_PREVIO } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridTextField from '@/presentation/components/GridTextField'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { PAGAMENTO_A_MENOR, pagamento_a_menor, PagamentoAMenorError } from '../../helper/PagamentoMenor/types'

interface IPagamentoMenor {
    pagamantoMenor: pagamento_a_menor | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: PagamentoAMenorError
}

export default function PagamentoMenor(props: IPagamentoMenor) {
    const { pagamantoMenor, show, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)
    return (
        <Grid container spacing={1} sx={{
            display: show ? 'flex' : 'none'
        }}>

            <GridTextField
                xs={12}
                fullWidth
                type='number'
                label='Quantos dias de aviso prévio faltaram ser pagos?'
                variant='filled'
                name={PAGAMENTO_A_MENOR.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS}
                value={pagamantoMenor?.[PAGAMENTO_A_MENOR.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS] as number}
                onChange={handleQuantidadeDiasFaltaramSerPagosChange}
                containerStyle={{ marginLeft: 5 }}
                error={error.quantidade_dias_faltaram_ser_pagos}
                helperText={error.quantidade_dias_faltaram_ser_pagos ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={PAGAMENTO_A_MENOR.VALOR_ESTIMADO}
                defaultValue={pagamantoMenor?.[PAGAMENTO_A_MENOR.VALOR_ESTIMADO] ?? 0}
                label={'Qual o valor estimado do aviso prévio proporcional devido?'}
                sx={{ marginTop: 3, ml: 0 }}
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obriagtório' : ' '}
                variant='filled'
            />

        </Grid>
    )

    function handleQuantidadeDiasFaltaramSerPagosChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_DIAS_FALTARAM_SER_PAGOS',
            field: PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR,
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
            field: PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR,
            value: getGridCurrencyInputValue(valorEstimadoRef, PAGAMENTO_A_MENOR.VALOR_ESTIMADO)
        })
    }
}
