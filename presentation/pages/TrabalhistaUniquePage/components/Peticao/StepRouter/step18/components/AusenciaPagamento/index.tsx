import React, { Dispatch, useRef } from 'react'
import { Action, PEDIDO_AVISO_PREVIO } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridTextField from '@/presentation/components/GridTextField'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { AUSENCIA_PAGAMENTO, ausencia_pagamento, AusenciaPagamentoError } from '../../helper/AusenciaPagamento/types'

interface IAusenciaPagamento {
    ausenciaPagamento: ausencia_pagamento | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: AusenciaPagamentoError
}

export default function AusenciaPagamento(props: IAusenciaPagamento) {
    const { ausenciaPagamento, show, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)
    return (
        <Grid container spacing={1} sx={{
            display: show ? 'flex' : 'none'
        }}>

            <GridTextField
                xs={12}
                fullWidth
                type='number'
                label='Quantos dias de aviso prévio deveriam ter sido pagos ao reclamante?'
                variant='outlined'
                name={AUSENCIA_PAGAMENTO.QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS}
                value={ausenciaPagamento?.[AUSENCIA_PAGAMENTO.QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS] as number}
                onChange={handleQuantidadeDiasFaltaramSerPagosChange}
                containerStyle={{ marginLeft: 5 }}
                error={error.quantidade_dias_deveriam_ser_pagos}
                helperText={error.quantidade_dias_deveriam_ser_pagos ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={AUSENCIA_PAGAMENTO.VALOR_ESTIMADO}
                defaultValue={ausenciaPagamento?.[AUSENCIA_PAGAMENTO.VALOR_ESTIMADO] ?? 0}
                label={'Qual o valor estimado do aviso prévio que não foi pago?'}
                sx={{ marginTop: 3, ml: 0 }}
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
            />

        </Grid>
    )

    function handleQuantidadeDiasFaltaramSerPagosChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS',
            field: PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO,
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
            field: PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO,
            value: getGridCurrencyInputValue(valorEstimadoRef, AUSENCIA_PAGAMENTO.VALOR_ESTIMADO)
        })
    }
}
