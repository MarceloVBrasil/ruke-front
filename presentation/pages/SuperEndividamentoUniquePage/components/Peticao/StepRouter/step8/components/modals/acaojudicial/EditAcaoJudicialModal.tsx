import * as React from 'react';
import { Box, Grid, SelectChangeEvent, TextField } from '@mui/material';
import { useReducer } from 'react';
import { acao_judicial } from '@/app/types/acao_judicial';
import { formReducer, getErrorInitialState, getFormInitialEditState } from './AcoesJudiciaisReducerFunctions';
import MaskedInput from '@/presentation/components/MaskedInput';
import { EditModal } from '@/presentation/components/ModalEdit';
import { formatNumeroProcesso } from '@/app/utils/Formater';
import GridTextField from '@/presentation/components/GridTextField';
import { error } from 'console';
import { isFieldEmpty } from '@/app/utils/validators';

interface IModal {
    open: boolean
    onClose: () => void
    onEditarClick: (antiga_acao_judicial: acao_judicial, acao_judicial: acao_judicial) => void
    antiga_acao_judicial: acao_judicial
}

export function EditAcaoJudicialModal(props: IModal) {
    const { open, onClose, onEditarClick, antiga_acao_judicial } = props
    const [state, dispatch] = useReducer(formReducer, getFormInitialEditState(antiga_acao_judicial));

    const [error, setError] = React.useState(getErrorInitialState())

    return (
        <EditModal
            title='Editar Ação Judicial'
            open={open}
            onClose={onClose}
            onEditarClick={handleEditarClick}
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
        </EditModal>
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

    function handleEditarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onEditarClick(antiga_acao_judicial, state as acao_judicial)
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