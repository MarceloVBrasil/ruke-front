import React, { Dispatch, useRef } from 'react'
import { SONEGACAO_VERBAS_TRABALHISTAS, sonegacao_verbas_trabalhistas, SonegacaoVerbasTrabalhistasActions, SonegacaoVerbasTrabalhistasError } from '../../helper/SonegacaoVerbasTrabalhistas/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridTextField from '@/presentation/components/GridTextField'

interface ISonegacaoVerbasTrabalhistas {
    sonegacao: sonegacao_verbas_trabalhistas | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<SonegacaoVerbasTrabalhistasActions>
    error: SonegacaoVerbasTrabalhistasError
}

export default function SonegacaoVerbasTrabalhistas(props: ISonegacaoVerbasTrabalhistas) {
    const { sonegacao, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid rowSpacing={2} container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre a Sonegação de Verbas Trabalhistas' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridTextField
                xs={12}
                fullWidth
                name={SONEGACAO_VERBAS_TRABALHISTAS.VERBAS_SONEGADAS}
                defaultValue={sonegacao?.[SONEGACAO_VERBAS_TRABALHISTAS.VERBAS_SONEGADAS] as string}
                onBlur={handleVerbasSonegadas}
                label='Quais foram as verbas trabalhistas sonegadas?'
                variant='filled'
                error={error.verbas_sonegadas}
                helperText={error.verbas_sonegadas ? 'Campo obrigatório' : ' '}
                className='danos_morais'

            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={SONEGACAO_VERBAS_TRABALHISTAS.VALOR_ESTIMADO}
                defaultValue={sonegacao?.[SONEGACAO_VERBAS_TRABALHISTAS.VALOR_ESTIMADO] ?? 0}
                label='Qual foi o valor solicitado a título de indenização por danos morais'
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                variant='filled'
            />

        </Grid>
    )

    function handleVerbasSonegadas(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VERBAS_SONEGADAS',
            field: PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS,
            value
        })
    }

    function handleValorEstimadoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO',
            field: PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS,
            value: getGridCurrencyInputValue(valorEstimadoRef, SONEGACAO_VERBAS_TRABALHISTAS.VALOR_ESTIMADO)
        })
    }
}
