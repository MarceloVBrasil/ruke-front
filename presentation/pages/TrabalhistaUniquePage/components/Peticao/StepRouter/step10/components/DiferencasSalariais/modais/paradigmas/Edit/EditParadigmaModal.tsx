import * as React from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';
import { useReducer } from 'react';
import { isFieldEmpty } from '@/app/utils/validators';
import { formReducer, getEditFormInitialState, getErrorInitialState } from '../ParadigmasReducerFunctions';
import { EditModal } from '@/presentation/components/ModalEdit';
import PrimeiroCadastro from './PrimeiroCadastro';
import DemaisCadastros from './DemaisCadastros';
import { paradigma } from '../ParadigmasFormAndFields';

interface IModal {
    open: boolean
    onClose: () => void
    onEditarClick: (id_paradigma: string, paradigma: paradigma) => void
    paradigma: paradigma
    paradigmas: paradigma[]
    primeiroCadastro: boolean
}

export function EditParadigmaModal(props: IModal) {
    const { open, onClose, onEditarClick, paradigma, primeiroCadastro, paradigmas } = props
    const [state, dispatch] = useReducer(formReducer, getEditFormInitialState(paradigma));

    const [error, setError] = React.useState(getErrorInitialState())


    return (
        <EditModal
            title='Cadastrar Paradigma'
            open={open}
            onClose={onClose}
            onEditarClick={handleEditarClick}
        >
            <PrimeiroCadastro
                renderCondition={primeiroCadastro}
                error={error}
                state={state}
                handleChange={handleChange}
            />

            <DemaisCadastros
                renderCondition={!primeiroCadastro}
                error={error}
                state={state}
                handleChange={handleChange}
                paradigmas={paradigmas}
            />
        </EditModal>
    );

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;
        dispatch({
            type: 'SET_FIELD',
            field: name as keyof paradigma,
            value,
        });
    }

    function handleEditarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onEditarClick(state.id, state)
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
            || state.periodo == 'periodo_selecionado' && isFieldEmpty(state.data_inicial)
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