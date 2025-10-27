import React, { Dispatch, useRef } from 'react'
import { ASSEDIO_MORAL_HORIZONTAL, assedio_moral_horizontal, AssedioMoralHorizontalActions, AssedioMoralHorizontalError } from '../../helper/AssedioMoralHorizontal/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridTextField from '@/presentation/components/GridTextField'

interface IAssedioMoralHorizontal {
    assedio_horizontal: assedio_moral_horizontal | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<AssedioMoralHorizontalActions>
    error: AssedioMoralHorizontalError
}

export default function AssedioMoralHorizontal(props: IAssedioMoralHorizontal) {
    const { assedio_horizontal, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid rowSpacing={2} container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre o Assédio Moral Horizontal' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridTextField
                xs={12}
                fullWidth
                name={ASSEDIO_MORAL_HORIZONTAL.NOME_PESSOA_REALIZOU_ASSEDIO}
                defaultValue={assedio_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.NOME_PESSOA_REALIZOU_ASSEDIO] as string}
                onBlur={handleNomeAssediadorChange}
                label='Qual o nome da pessoa que realizou o assédio moral?'
                variant='filled'
                error={error.nome_pessoa_realizou_assedio}
                helperText={error.nome_pessoa_realizou_assedio ? 'Campo obrigatório' : ' '}
                className='danos_morais'

            />

            <GridTextField
                xs={12}
                fullWidth
                multiline
                name={ASSEDIO_MORAL_HORIZONTAL.DESCRICAO_OFENSAS_VEXATORIAS}
                defaultValue={assedio_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.DESCRICAO_OFENSAS_VEXATORIAS] as string}
                onBlur={handleDescricaoAssedio}
                label='Descreva as ofensas ou ações vexatórias sofridas'
                placeholder='ofensas vexatórias...'
                variant='filled'
                containerStyle={{ left: 8, position: 'relative' }}
                error={error.descricao_ofensas_vexatorias}
                helperText={error.descricao_ofensas_vexatorias ? 'Campo obrigatório' : ' '}

            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={ASSEDIO_MORAL_HORIZONTAL.VALOR_ESTIMADO}
                defaultValue={assedio_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.VALOR_ESTIMADO] ?? 0}
                label='Qual foi o valor solicitado a título de indenização por danos morais'
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                variant='filled'
            />

        </Grid>
    )

    function handleNomeAssediadorChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_NOME_ASSEDIADOR',
            field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL,
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
            field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL,
            value
        })
    }

    function handleValorEstimadoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO',
            field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL,
            value: getGridCurrencyInputValue(valorEstimadoRef, ASSEDIO_MORAL_HORIZONTAL.VALOR_ESTIMADO)
        })
    }
}
