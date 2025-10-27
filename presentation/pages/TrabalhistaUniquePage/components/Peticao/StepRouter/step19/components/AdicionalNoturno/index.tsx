import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { ADICIONAL_NOTURNO, adicional_noturno, AdicionalNoturnoActions, AdicionalNoturnoError } from '../../helper/AdicionalNoturno/types'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import { Grid, SelectChangeEvent } from '@mui/material'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_JORNADA_TRABALHO } from '../../helper/FormTypesAndFields'
import { HORAS_EXTRAS_NAO_PAGAS } from '../../helper/HorasExtrasNaoPagas/types'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'

interface IAdicionalNoturno {
    adicionalNoturno: adicional_noturno | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<AdicionalNoturnoActions>
    error: AdicionalNoturnoError
}

export default function AdicionalNoturno(props: IAdicionalNoturno) {
    const { adicionalNoturno, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Adicional Noturno' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoPedidoRef}
                name={HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO}
                variant='filled'
                defaultValue={adicionalNoturno?.[HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO] ?? 0}
                onBlur={handleValorEstimadoPedidoChange}
                label='Qual o valor do pedido de adicional noturno?'
                error={error.valor_estimado_pedido}
                helperText={error.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
            />
        </Grid>
    )

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_JORNADA_TRABALHO.ADICIONAL_NOTURNO,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, ADICIONAL_NOTURNO.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
