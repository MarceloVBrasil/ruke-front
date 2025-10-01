import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { SUPRESSAO_INTERVALO_INTRAJORNADA, supressao_intervalo_intrajornada, SupressaoIntervaloIntrajornadaActions, SupressaoIntervaloIntrajornadaError } from '../../helper/SupressaoIntervaloIntrajornada/types'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_JORNADA_TRABALHO } from '../../helper/FormTypesAndFields'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'

interface ISupressaoIntervaloIntrajornada {
    supressao_intrajornada: supressao_intervalo_intrajornada | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<SupressaoIntervaloIntrajornadaActions>
    error: SupressaoIntervaloIntrajornadaError
}

export default function SupressaoIntervaloIntrajornada(props: ISupressaoIntervaloIntrajornada) {
    const { supressao_intrajornada, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Supressão de Intervalo Intrajornada' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <GridTextField
                xs={12}
                variant='outlined'
                type='number'
                fullWidth
                name={SUPRESSAO_INTERVALO_INTRAJORNADA.DURACAO_INTERVALO}
                defaultValue={supressao_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.DURACAO_INTERVALO] as number}
                onBlur={handleDuracaoIntervaloChange}
                label='Qual era a duração do intervalo intrajornada efetivamente usufruído?'
                error={error.duracao_intervalo}
                helperText={error.duracao_intervalo ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='outlined'
                type='number'
                fullWidth
                name={SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO}
                defaultValue={supressao_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO] as number}
                onBlur={handleQuantidadeIntervaloSuprimidoPorSemana}
                label='Quantas vezes por semana o reclamante teve o intervalo intrajornada suprimido?'
                error={error.quantidade_por_semana_intervalo_suprimido}
                helperText={error.quantidade_por_semana_intervalo_suprimido ? 'Campo obrigatório' : ' '}
            />

            {/* <GridTextField
                xs={12}
                variant='outlined'
                type='number'
                fullWidth
                name={SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_HORAS_TOTAIS}
                defaultValue={supressao_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_HORAS_TOTAIS] as number}
                onBlur={handleQuantidadeHorasTotaisDevemSerPagasChange}
                label='Qual a quantidade de horas totais deve ser paga?'
                error={error.quantidade_horas_totais}
                helperText={error.quantidade_horas_totais ? 'Campo obrigatório' : ' '}
            /> */}

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoPedidoRef}
                name={SUPRESSAO_INTERVALO_INTRAJORNADA.VALOR_ESTIMADO_PEDIDO}
                variant='outlined'
                defaultValue={supressao_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.VALOR_ESTIMADO_PEDIDO] ?? 0}
                onBlur={handleValorEstimadoHorasExtras}
                label='Qual valor estimado do pedido de horas intrajornada?'
                error={error.valor_estimado_pedido}
                helperText={error.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
            />


        </Grid>
    )

    function handleDuracaoIntervaloChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DURACAO_INTERVALO',
            field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA,
            value: parseInt(value)
        })
    }
    function handleQuantidadeIntervaloSuprimidoPorSemana(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO',
            field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA,
            value: parseInt(value)
        })
    }

    function handleQuantidadeHorasTotaisDevemSerPagasChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_HORAS_TOTAIS',
            field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA,
            value: parseInt(value)
        })
    }

    function handleValorEstimadoHorasExtras(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, SUPRESSAO_INTERVALO_INTRAJORNADA.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
