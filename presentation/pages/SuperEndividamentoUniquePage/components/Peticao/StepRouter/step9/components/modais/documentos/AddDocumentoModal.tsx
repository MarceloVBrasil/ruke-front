import * as React from 'react';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { useReducer } from 'react';
import { FormField } from './DocumentoFormTypesAndFields';
import { formReducer, getErrorInitialState, getFormInitialState } from './DocumentoReducerFunctions';
import { AddModal } from '@/presentation/components/ModalAdd';
import { isFieldEmpty } from '@/app/utils/validators';
import GridTextField from '@/presentation/components/GridTextField';
import { documentos_faltando } from '../../../helper/FormTypesAndFields';


interface IModal {
    open: boolean
    onClose: () => void
    onAdicionarClick: (documento_faltando: documentos_faltando) => void
    documento_faltando: documentos_faltando
}

export function AddDocumentoModal(props: IModal) {
    const { open, onClose, onAdicionarClick, documento_faltando } = props
    const [state, dispatch] = useReducer(formReducer, getFormInitialState(documento_faltando));

    const [error, setError] = React.useState(getErrorInitialState())

    return (
        <AddModal
            title='Cadastrar Documento Faltante'
            open={open}
            onClose={onClose}
            onAdicionarClick={handleAdicionarClick}
        >
            <Grid container spacing={1}>
                <GridTextField
                    xs={12}
                    fullWidth
                    disabled
                    value={(state.credor.split('-')[0])}
                    onChange={handleChange}
                    placeholder='Credor'
                    variant='standard'
                    name={FormField.DOCUMENTO}
                />

                <GridTextField
                    xs={12}
                    fullWidth
                    error={error.documento}
                    helperText={error.documento ? 'Documento Faltante é obrigatório' : ' '}
                    value={(state.documento_faltando)}
                    onChange={handleChange}
                    placeholder='Documento'
                    variant='standard'
                    name={FormField.DOCUMENTO}
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
            field: FormField.DOCUMENTO,
            value,
        });
    }

    function handleAdicionarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onAdicionarClick(state as documentos_faltando)
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
            isFieldEmpty(state.documento_faltando)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state.documento_faltando)) setError(prev => { return { ...prev, documento: true } })
        else setError(prev => { return { ...prev, documento: false } })
    }
}