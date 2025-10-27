import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { SOBREAVISO, sobreaviso, SobreavisoActions, SobreavisoError } from '../../helper/Sobreaviso/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_JORNADA_TRABALHO } from '../../helper/FormTypesAndFields'
import { HORAS_EXTRAS_NAO_PAGAS } from '../../helper/HorasExtrasNaoPagas/types'
import { PRONTIDAO } from '../../helper/Prontidao/types'

interface ISobreaviso {
    sobreaviso: sobreaviso | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<SobreavisoActions>
    error: SobreavisoError
}

export default function Sobreaviso(props: ISobreaviso) {
    const { sobreaviso, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)
    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Sobreaviso' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <GridTextField
                xs={12}
                type='number'
                fullWidth
                label='Quantas vezes por semana o reclamante ficou de sobreaviso'
                name={PRONTIDAO.QUANTIDADE_VEZES_SEMANA}
                defaultValue={sobreaviso?.[SOBREAVISO.QUANTIDADE_VEZES_SEMANA] as number}
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
                defaultValue={sobreaviso?.[SOBREAVISO.VALOR_ESTIMADO_PEDIDO] ?? 0}
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
            field: PEDIDO_JORNADA_TRABALHO.SOBREAVISO,
            value: parseInt(value)
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_JORNADA_TRABALHO.SOBREAVISO,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, SOBREAVISO.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
