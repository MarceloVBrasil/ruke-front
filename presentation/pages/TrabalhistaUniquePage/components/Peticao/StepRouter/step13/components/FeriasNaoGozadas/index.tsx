import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { Action, PEDIDO_FERIAS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridTextField from '@/presentation/components/GridTextField'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_FERIAS_NAO_GOZADAS, pedido_ferias_nao_gozadas, PedidoFeriasNaoGozadasError } from '../../helper/FeriasNaoGozadas/types'

interface IFeriasNaoGozadas {
    situacao: pedido_ferias_nao_gozadas | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: PedidoFeriasNaoGozadasError
}

export default function FeriasNaoGozadas(props: IFeriasNaoGozadas) {
    const { situacao, show, setFormHasChanged, dispatch, error } = props
    const valorEstimadoInputRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container sx={{
            boxShadow: 3, borderRadius: 2, paddingRight: 3, paddingLeft: 2, marginTop: 2, paddingY: 2,
            display: show ? 'block' : 'none'
        }}>
            <GridTextField
                xs={12}
                placeholder='de 01/01/2020 a 31/12/2023'
                fullWidth
                label='Quais foram os períodos de férias não gozadas?'
                name={PEDIDO_FERIAS_NAO_GOZADAS.PERIODOS_FERIAS}
                defaultValue={situacao?.[PEDIDO_FERIAS_NAO_GOZADAS.PERIODOS_FERIAS] as string}
                variant='outlined'
                onBlur={handlePeriodosChange}
                error={error.periodos_ferias}
                helperText={error.periodos_ferias ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoInputRef}
                onBlur={handleValorEstimadoPedidoChange}
                name={PEDIDO_FERIAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO}
                defaultValue={situacao?.[PEDIDO_FERIAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] ?? 0}
                label={'Qual o valor estimado das férias não gozadas?'}
                sx={{ marginTop: 3 }}
                error={error.valor_estimado_pagamento_em_dobro}
                helperText={error.valor_estimado_pagamento_em_dobro ? 'Campo obrigatório' : ' '}
            />
        </Grid>
    )

    function handlePeriodosChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PERIODOS_FERIAS',
            field: PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO,
            value
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DROBRO',
            field: PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO,
            value: getGridCurrencyInputValue(valorEstimadoInputRef, PEDIDO_FERIAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO)
        })
    }
}
