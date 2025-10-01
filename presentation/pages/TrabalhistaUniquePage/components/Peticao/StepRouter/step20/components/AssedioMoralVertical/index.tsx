import React, { Dispatch, useRef } from 'react'
import { assedio_moral_vertical, ASSEDIO_MORAL_VERTICAL, AssedioMoralVerticalActions, AssedioMoralVerticalError } from '../../helper/AssedioMoralVertical/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridTextField from '@/presentation/components/GridTextField'

interface IAssedioMoralVertical {
    assedio_vertical: assedio_moral_vertical | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<AssedioMoralVerticalActions>
    error: AssedioMoralVerticalError
}

export default function AssedioMoralVertical(props: IAssedioMoralVertical) {
    const { assedio_vertical, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid rowSpacing={2} container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre o Assédio Moral Vertical' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridTextField
                xs={12}
                fullWidth
                name={ASSEDIO_MORAL_VERTICAL.NOME_SUPERIOR_REALIZOU_ASSEDIO}
                defaultValue={assedio_vertical?.[ASSEDIO_MORAL_VERTICAL.NOME_SUPERIOR_REALIZOU_ASSEDIO] as string}
                onBlur={handleNomeAssediadorChange}
                label='Qual o nome do superior que realizou o assédio moral?'
                variant='outlined'
                error={error.nome_superior_realizou_assedio}
                helperText={error.nome_superior_realizou_assedio ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                fixLabel

            />

            <GridTextField
                xs={12}
                fullWidth
                multiline
                name={ASSEDIO_MORAL_VERTICAL.DESCRICAO_OFENSAS_VEXATORIAS}
                defaultValue={assedio_vertical?.[ASSEDIO_MORAL_VERTICAL.DESCRICAO_OFENSAS_VEXATORIAS] as string}
                onBlur={handleDescricaoAssedio}
                label='Descreva as ofensas ou ações vexatórias sofridas'
                variant='outlined'
                containerStyle={{ position: 'relative', left: 8 }}
                error={error.descricao_ofensas_vexatorias}
                helperText={error.descricao_ofensas_vexatorias ? 'Campo obrigatório' : ' '}
                fixLabel

            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={ASSEDIO_MORAL_VERTICAL.VALOR_ESTIMADO}
                defaultValue={assedio_vertical?.[ASSEDIO_MORAL_VERTICAL.VALOR_ESTIMADO] ?? 0}
                label='Qual foi o valor solicitado a título de indenização por danos morais'
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                fixLabel
            />

        </Grid>
    )

    function handleNomeAssediadorChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_NOME_SUPERIOR_ASSEDIADOR',
            field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL,
            value
        })
    }

    function handleDescricaoAssedio(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DESCRICAO_ASSEDIO',
            field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL,
            value
        })
    }

    function handleValorEstimadoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO',
            field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL,
            value: getGridCurrencyInputValue(valorEstimadoRef, ASSEDIO_MORAL_VERTICAL.VALOR_ESTIMADO)
        })
    }
}
