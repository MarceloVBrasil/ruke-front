import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { PRONTIDAO, prontidao, ProntidaoActions, ProntidaoError } from '../../helper/Prontidao/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_JORNADA_TRABALHO } from '../../helper/FormTypesAndFields'
import { HORAS_EXTRAS_NAO_PAGAS } from '../../helper/HorasExtrasNaoPagas/types'
import GridTextField from '@/presentation/components/GridTextField'

interface IProntidao {
    prontidao: prontidao | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<ProntidaoActions>
    error: ProntidaoError
}

export default function Prontidao(props: IProntidao) {
    const { prontidao, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Prontidão' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <GridTextField
                xs={12}
                type='number'
                fullWidth
                label='Quantas vezes por semana o reclamante ficou de prontidão'
                name={PRONTIDAO.QUANTIDADE_VEZES_SEMANA}
                defaultValue={prontidao?.[PRONTIDAO.QUANTIDADE_VEZES_SEMANA] as number}
                variant='filled'
                onBlur={handleQuantidadeVezesSemanaChange}
                error={error.quantidade_vezes_semana}
                helperText={error.quantidade_vezes_semana ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoPedidoRef}
                name={HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO}
                variant='filled'
                defaultValue={prontidao?.[PRONTIDAO.VALOR_ESTIMADO_PEDIDO] ?? 0}
                onBlur={handleValorEstimadoPedidoChange}
                label='Qual o valor pedido?'
                error={error.valor_estimado_pedido}
                helperText={error.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
            />
        </Grid>
    )

    function handleQuantidadeVezesSemanaChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_VEZES_SEMANA',
            field: PEDIDO_JORNADA_TRABALHO.PRONTIDAO,
            value: parseInt(value)
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_JORNADA_TRABALHO.PRONTIDAO,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, PRONTIDAO.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
