import * as React from 'react';
import { Box, Grid, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useReducer } from 'react';
import { acao_judicial } from '@/app/types/acao_judicial';
import { formReducer, getErrorInitialState, getFormInitialState } from './AcoesJudiciaisReducerFunctions';
import MaskedInput from '@/presentation/components/MaskedInput';
import { AddModal } from '@/presentation/components/ModalAdd';
import { formatNumeroProcesso } from '@/app/utils/Formater';
import { isFieldEmpty } from '@/app/utils/validators';
import GridTextField from '@/presentation/components/GridTextField';


interface IModal {
    open: boolean
    onClose: () => void
    onAdicionarClick: (acao_judicial: acao_judicial) => void
}

export function AddAcaoJudicialModal(props: IModal) {
    const { open, onClose, onAdicionarClick } = props
    const [state, dispatch] = useReducer(formReducer, getFormInitialState());

    const [error, setError] = React.useState(getErrorInitialState())

    return (
        <AddModal
            title='Cadastrar Ação Judicial'
            open={open}
            onClose={onClose}
            onAdicionarClick={handleAdicionarClick}
        >
            <Grid container spacing={1}>
                <GridTextField
                    xs={12}
                    fullWidth
                    error={error.acao_judicial}
                    helperText={error.acao_judicial ? 'Número do processo é obrigatório' : ' '}
                    value={formatNumeroProcesso(state)}
                    onChange={handleChange}
                    placeholder='Número do processo'
                    variant='standard'
                    name='numero_processo'
                />
            </Grid>
        </AddModal>
    );

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;
        dispatch({
            type: 'SET_FIELD',
            field: name as keyof acao_judicial,
            value,
        });
    }

    function handleAdicionarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onAdicionarClick(state as acao_judicial)
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
            isFieldEmpty(state)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state)) setError(prev => { return { ...prev, acao_judicial: true } })
        else setError(prev => { return { ...prev, acao_judicial: false } })
    }
}