import React from 'react'
import { ErrorParadigmaModal, paradigma } from '../ParadigmasFormAndFields'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid } from '@mui/material'

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
            <GridRadioGroup
                sectionTitle={'Período'}
                name={'periodo'}
                value={state.periodo}
                onChange={handleChange}
                options={[{ descricao: 'Todo o período', value: 'todo_periodo' }, { descricao: 'Período delimitado', value: 'periodo_selecionado' }]}
            />

            <GridTextField
                xs={12}
                style={{ visibility: state.periodo == 'periodo_selecionado' ? 'visible' : 'hidden' }}
                type='date'
                label='Data início'
                fullWidth
                error={error.data_inicial}
                helperText={error.data_inicial ? 'Data início é obrigatória' : ' '}
                value={state.data_inicial}
                name={'data_inicial'}
                variant={'standard'}
                onChange={handleChange}
            />
            <GridTextField
                xs={12}
                style={{ visibility: state.periodo == 'periodo_selecionado' ? 'visible' : 'hidden' }}
                type='date'
                fullWidth
                error={error.data_final}
                helperText={error.data_final ? 'Data fim é obrigatória' : ' '}
                label='Data fim'
                value={state.data_final}
                name={'data_final'}
                variant={'standard'}
                onChange={handleChange}
            />
            <GridTextField
                xs={12}
                label='Atividades'
                multiline
                fullWidth
                error={error.atividades}
                helperText={error.atividades ? 'Atividades são obrigatórias' : ' '}
                value={state.atividades}
                name={'atividades'}
                variant={'standard'}
                onChange={handleChange}
            />
        </Grid>
    )
}
