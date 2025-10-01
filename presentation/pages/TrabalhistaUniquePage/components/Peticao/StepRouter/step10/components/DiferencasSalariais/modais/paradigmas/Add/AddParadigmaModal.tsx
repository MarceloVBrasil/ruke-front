import * as React from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';
import { useReducer } from 'react';
import { AddModal } from '@/presentation/components/ModalAdd';
import { isFieldEmpty } from '@/app/utils/validators';
import { formReducer, getErrorInitialState, getFormInitialState } from '../ParadigmasReducerFunctions';
import PrimeiroCadastro from './PrimeiroCadastro';
import DemaisCadastros from './DemaisCadastros';
import { paradigma } from '../ParadigmasFormAndFields';

interface IModal {
    open: boolean
    onClose: () => void
    onAdicionarClick: (paradigma: paradigma) => void
    primeiroCadastro: boolean
    paradigmas: paradigma[]
}

export function AddParadigmaModal(props: IModal) {
    const { open, onClose, onAdicionarClick, primeiroCadastro, paradigmas } = props
    const [state, dispatch] = useReducer(formReducer, getFormInitialState());

    const [error, setError] = React.useState(getErrorInitialState())


    return (
        <AddModal
            title='Cadastrar Paradigma'
            open={open}
            onClose={onClose}
            onAdicionarClick={handleAdicionarClick}
        >
            <PrimeiroCadastro
                renderCondition={primeiroCadastro}
                state={state}
                error={error}
                handleChange={handleChange}
            />

            <DemaisCadastros
                renderCondition={!primeiroCadastro}
                state={state}
                error={error}
                handleChange={handleChange}
                paradigmas={paradigmas}
            />
        </AddModal>
    );

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string> | { target: { name: string, value: string } }
    ) {
        const { name, value } = e.target;

        dispatch({
            type: 'SET_FIELD',
            field: name as keyof paradigma,
            value,
        });
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
            isFieldEmpty(state.nome)
            || isFieldEmpty(state.atividades)
            || isFieldEmpty(state.periodo)
            || state.periodo == 'periodo_selecionado' && isFieldEmpty(state.data_final)
            || state.periodo == 'periodo_selecionado' && isFieldEmpty(state.data_final)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state.nome)) setError(prev => { return { ...prev, nome: true } })
        else setError(prev => { return { ...prev, nome: false } })

        if (isFieldEmpty(state.atividades)) setError(prev => { return { ...prev, atividades: true } })
        else setError(prev => { return { ...prev, atividades: false } })

        if (state.periodo == 'periodo_selecionado' && isFieldEmpty(state.data_inicial)) setError(prev => { return { ...prev, data_inicial: true } })
        else setError(prev => { return { ...prev, data_inicial: false } })

        if (state.periodo == 'periodo_selecionado' && isFieldEmpty(state.data_final)) setError(prev => { return { ...prev, data_final: true } })
        else setError(prev => { return { ...prev, data_final: false } })
    }
}