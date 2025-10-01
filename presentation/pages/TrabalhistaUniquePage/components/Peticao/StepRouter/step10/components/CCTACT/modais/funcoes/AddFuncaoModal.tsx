import { AddModal } from '@/presentation/components/ModalAdd'
import React, { ChangeEvent, useReducer, useRef } from 'react'
import { diferenca_prevista, ErrorFuncaoModal, funcao, periodo } from './FuncaoFormAndFields'
import { formReducer, getErrorInitialValue, getFormInitialState } from './FuncoesReducerFunctions'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridTextField from '@/presentation/components/GridTextField'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { isFieldEmpty, isPositive } from '@/app/utils/validators'

interface IModal {
    open: boolean
    onClose: () => void
    onAdicionarClick: (funcao: funcao) => void
}

export default function AddFuncaoModal(props: IModal) {
    const { open, onClose, onAdicionarClick } = props
    const [state, dispatch] = useReducer(formReducer, getFormInitialState())

    const salarioDevidoRef = useRef<HTMLDivElement>(null)

    const [error, setError] = React.useState<ErrorFuncaoModal>(getErrorInitialValue())

    return (
        <AddModal
            open={open}
            onClose={onClose}
            onAdicionarClick={handleAdicionarClick}
            title='Adicionar função'
        >
            <Grid container spacing={2}>
                <GridTextField
                    xs={12}
                    fullWidth
                    label='Cargo da CTPS'
                    error={error.cargo}
                    helperText={error.cargo ? 'cargo é obrigatório' : ' '}
                    value={state.cargo}
                    name={'cargo'}
                    variant={'standard'}
                    onChange={handleChange}
                />

                <GridRadioGroup
                    sectionTitle={'Diferença prevista em:'}
                    name={'diferenca_prevista'}
                    value={state.diferenca_prevista as diferenca_prevista}
                    onChange={handleChange}
                    options={[{ descricao: 'Convenção Coletiva', value: 'convencao_coletiva' }, { descricao: 'Acordo Coletivo', value: 'acordo_coletivo' }]}
                    error={error.diferenca_prevista}
                    helperText={error.diferenca_prevista ? 'diferença prevista é obrigatória' : ' '}
                />

                <GridRadioGroup
                    xs={12}
                    sectionTitle={'Período'}
                    name={'periodo'}
                    value={state.periodo as periodo}
                    onChange={handleChange}
                    options={[{ descricao: 'Todo o contrato de trabalho', value: 'todo_contrato' }, { descricao: 'Período delimitado', value: 'periodo_delimitado' }]}
                    error={error.periodo}
                    helperText={error.periodo ? 'período é obrigatório' : ' '}
                />

                <GridCurrencyInput
                    defaultValue={state.salario_devido}
                    ref={salarioDevidoRef}
                    sx={{ marginTop: 4, marginRight: 2 }}
                    label='Salário devido para o cargo efetivamente ocupado'
                    onBlur={handleSalarioDevidoFieldChange}
                    name={'salario_devido'}
                    variant={'standard'}
                    xs={12}
                    error={error.salario_devido}
                    helperText={error.salario_devido ? 'salário devido é obrigatório' : ' '}
                />

                <GridTextField
                    xs={12} sm={6}
                    containerStyle={{ visibility: state.periodo == 'periodo_delimitado' ? 'visible' : 'hidden' }}
                    fullWidth
                    label='Data inicial'
                    type='date'
                    error={error.data_inicial}
                    helperText={error.data_inicial ? 'data inicial é obrigatória' : ' '}
                    value={state.data_inicial}
                    name={'data_inicial'}
                    variant={'standard'}
                    onChange={handleChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    containerStyle={{ visibility: state.periodo == 'periodo_delimitado' ? 'visible' : 'hidden' }}
                    fullWidth
                    label='Data final'
                    type='date'
                    error={error.data_inicial}
                    helperText={error.data_inicial ? 'data final é obrigatória' : ' '}
                    value={state.data_final}
                    name={'data_final'}
                    variant={'standard'}
                    onChange={handleChange}
                />
            </Grid>
        </AddModal>
    )

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string> | { target: { name: string, value: string } }
    ) {
        const { name, value } = e.target;

        dispatch({
            type: 'SET_FIELD',
            field: name as keyof funcao,
            value,
        });
    }

    function handleSalarioDevidoFieldChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;

        dispatch({
            type: 'SET_NUMBER_FIELD',
            field: 'salario_devido',
            value: getGridCurrencyInputValue(salarioDevidoRef, 'salario_devido')
        })
    }

    function handleAdicionarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onAdicionarClick(state)
        onClose()
        resetForm()
    }

    function resetForm() {
        dispatch({
            type: 'RESET'
        })
    }

    function isFormInvalid(): boolean {

        return (
            false
            || isFieldEmpty(state.cargo)
            || isFieldEmpty(state.diferenca_prevista as diferenca_prevista)
            || isFieldEmpty(state.periodo as periodo)
            || !isPositive(state.salario_devido)
            || state.periodo === 'periodo_delimitado' && isFieldEmpty(state.data_final)
            || state.periodo === 'periodo_delimitado' && isFieldEmpty(state.data_inicial)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state.cargo)) setError(prev => { return { ...prev, cargo: true } })
        else setError(prev => { return { ...prev, cargo: false } })

        if (isFieldEmpty(state.diferenca_prevista as diferenca_prevista)) setError(prev => { return { ...prev, diferenca_prevista: true } })
        else setError(prev => { return { ...prev, diferenca_prevista: false } })

        if (isFieldEmpty(state.periodo as periodo)) setError(prev => { return { ...prev, periodo: true } })
        else setError(prev => { return { ...prev, periodo: false } })

        if (!isPositive(state.salario_devido)) setError(prev => { return { ...prev, salario_devido: true } })
        else setError(prev => { return { ...prev, salario_devido: false } })

        if (state.periodo === 'periodo_delimitado') {
            if (isFieldEmpty(state.data_final)) setError(prev => { return { ...prev, data_final: true } })
            else setError(prev => { return { ...prev, data_final: false } })

            if (isFieldEmpty(state.data_inicial)) setError(prev => { return { ...prev, data_inicial: true } })
            else setError(prev => { return { ...prev, data_inicial: false } })
        }
    }
}
