import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { intervalo_trabalho, SUPRESSAO_INTERVALO_INTERJORNADA, supressao_intervalo_interjornada, SupressaoIntervaloInterjornadaActions, SupressaoIntervaloInterjornadaError } from '../../helper/SupressaoIntervaloInterjornada/types'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { SUPRESSAO_INTERVALO_INTRAJORNADA } from '../../helper/SupressaoIntervaloIntrajornada/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_JORNADA_TRABALHO } from '../../helper/FormTypesAndFields'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'

interface ISupressaoIntervaloInterjornada {
    supressao_interjornada: supressao_intervalo_interjornada | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<SupressaoIntervaloInterjornadaActions>
    error: SupressaoIntervaloInterjornadaError
}

export default function SupressaoIntervaloInterjornada(props: ISupressaoIntervaloInterjornada) {
    const { supressao_interjornada, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Supressão de Intervalo Interjornada' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <GridTextField
                xs={12}
                variant='filled'
                type='number'
                fullWidth
                name={SUPRESSAO_INTERVALO_INTRAJORNADA.DURACAO_INTERVALO}
                defaultValue={supressao_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.MEDIA_INTERVALO] as number}
                onBlur={handleMediaIntervaloChange}
                label='Qual era o intervalo interjornada que, em média, era efetivamente realizado?'
                error={error.media_intervalo}
                helperText={error.media_intervalo ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='filled'
                type='number'
                fullWidth
                name={SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_INTERVALO_ATE_FIM}
                defaultValue={supressao_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_INTERVALO_ATE_FIM] as number}
                onBlur={handleQuantidadeHorasIntervaloSuprimidasAteFim}
                label='Quantas horas de intervalo interjornada foram suprimidos entre o fim de uma jornada e o início da seguinte?'
                error={error.quantidade_horas_intervalo_ate_fim}
                helperText={error.quantidade_horas_intervalo_ate_fim ? 'Campo obrigatório' : ' '}
            />

            <GridRadioGroup
                xs={12}
                name={SUPRESSAO_INTERVALO_INTERJORNADA.INTERVALO_TRABALHO_RECLAMANTE}
                sectionTitle='O reclamante trabalhava de segunda a sexta ou segunda a sábado'
                value={supressao_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.INTERVALO_TRABALHO_RECLAMANTE] as string}
                onChange={handleIntervaloTrabalhoReclamanteChange}
                options={[
                    { descricao: 'Segunda a Sexta', value: 'segunda_a_sexta' },
                    { descricao: 'Segunda a Sábado', value: 'segunda_a_sabado' }
                ]}
                error={error.intervalo_trabalho_reclamante}
                helperText={error.intervalo_trabalho_reclamante ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='filled'
                type='number'
                fullWidth
                name={SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO}
                defaultValue={supressao_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO] as number}
                onBlur={handleQuantidadeIntervalosPorSemanaSuprimido}
                label='Quantas vezes por semana o intervalo interjornada foi suprimido?'
                error={error.quantidade_por_semana_intervalo_suprimido}
                helperText={error.quantidade_por_semana_intervalo_suprimido ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='filled'
                type='number'
                fullWidth
                name={SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_DURANTE_SEMANA}
                defaultValue={supressao_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_DURANTE_SEMANA] as number}
                onBlur={handleQuantidadeHorasDuranteSemanaChange}
                label='Quantas horas de intervalo interjornada era suprimida durante a semana?'
                error={error.quantidade_horas_durante_semana}
                helperText={error.quantidade_horas_durante_semana ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoPedidoRef}
                name={SUPRESSAO_INTERVALO_INTRAJORNADA.VALOR_ESTIMADO_PEDIDO}
                variant='filled'
                defaultValue={supressao_interjornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.VALOR_ESTIMADO_PEDIDO] ?? 0}
                onBlur={handleValorEstimadoHorasExtras}
                label='Qual valor estimado do pedido de horas interjornada?'
                error={error.valor_estimado_pedido}
                helperText={error.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
            />

        </Grid>
    )

    function handleMediaIntervaloChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_MEDIA_INTERVALO',
            field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA,
            value: parseInt(value)
        })
    }

    function handleIntervaloTrabalhoReclamanteChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_INTERVALO_TRABALHO_RECLAMANTE',
            field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA,
            value: value as intervalo_trabalho
        })
    }

    function handleQuantidadeHorasIntervaloSuprimidasAteFim(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_HORAS_INTERVALO_ATE_FIM',
            field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA,
            value: parseInt(value)
        })
    }

    function handleQuantidadeIntervalosPorSemanaSuprimido(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO',
            field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA,
            value: parseInt(value)
        })
    }
    function handleQuantidadeHorasDuranteSemanaChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_HORAS_DURANTE_SEMANA',
            field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA,
            value: parseInt(value)
        })
    }

    function handleValorEstimadoHorasExtras(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, SUPRESSAO_INTERVALO_INTRAJORNADA.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
