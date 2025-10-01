import React, { useState } from 'react'
import { ErrorParadigmaModal, paradigma } from '../ParadigmasFormAndFields'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'

interface IDemaisCadastros {
    error: ErrorParadigmaModal
    state: paradigma
    handleChange: (e: any) => void
    renderCondition: boolean
    paradigmas: paradigma[]
}

export default function DemaisCadastros(props: IDemaisCadastros) {
    const { error, state, handleChange, renderCondition, paradigmas } = props
    const [novasAtividades, setNovasAtividades] = useState<boolean>(false)
    const [atividade, setAtividade] = useState<string>('')

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
                name={'data_inicio'}
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
                name={'data_fim'}
                variant={'standard'}
                onChange={handleChange}
            />

            <GridRadioGroup
                sectionTitle={'Atividades '}
                name={'atividades'}
                error={error.atividades}
                helperText={error.atividades ? 'Atividades são obrigatórias' : ' '}
                value={atividade}
                onChange={handleAtividadesChange}
                options={[...paradigmas.map(p => { return { descricao: `Usar as mesmas atividades do paradigima ${p.nome}`, value: p.id } }), { descricao: 'Novas atividades', value: 'novas_atividades' }]}
            />
            <GridTextField
                containerStyle={{ visibility: novasAtividades ? 'visible' : 'hidden' }}
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

    function handleAtividadesChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;
        setAtividade(value)

        const paradigma = paradigmas.find(p => p.id == value)

        if (!!paradigma) {
            setNovasAtividades(false)
            return handleChange({ target: { name, value: paradigma.atividades } })
        }

        setNovasAtividades(true)
    }
}
