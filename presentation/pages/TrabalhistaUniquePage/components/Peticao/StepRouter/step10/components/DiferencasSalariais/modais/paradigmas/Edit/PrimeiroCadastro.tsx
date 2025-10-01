import GridTextField from '@/presentation/components/GridTextField'
import { Grid } from '@mui/material'
import React from 'react'
import { ErrorParadigmaModal, paradigma } from '../ParadigmasFormAndFields'

interface IPrimeiroCadastro {
    error: ErrorParadigmaModal
    state: paradigma
    handleChange: (e: any) => void
    renderCondition: boolean
}

export default function PrimeiroCadastro(props: IPrimeiroCadastro) {
    const { error, state, handleChange, renderCondition } = props
    return (
        <Grid container spacing={1} style={{ display: renderCondition ? 'flex' : 'none' }}>
            <GridTextField
                xs={12}
                fullWidth
                label='Nome'
                error={error.nome}
                helperText={error.nome ? 'Nome é obrigatório' : ' '}
                value={state.nome}
                name={'nome'}
                variant={'standard'}
                onChange={handleChange}
            />
            <GridTextField
                xs={12}
                type='date'
                label='Data início'
                fullWidth
                error={error.data_inicial}
                helperText={error.data_inicial ? 'Data início é obrigatória' : ' '}
                value={state.data_inicial}
                name={'data_inicio'}
                variant={'standard'}
                onChange={handleChange}
            />
            <GridTextField
                xs={12}
                type='date'
                fullWidth
                error={error.data_final}
                helperText={error.data_final ? 'Data fim é obrigatória' : ' '}
                label='Data fim'
                value={state.data_final}
                name={'data_fim'}
                variant={'standard'}
                onChange={handleChange}
            />
        </Grid>
    )
}
