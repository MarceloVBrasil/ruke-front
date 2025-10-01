import * as React from 'react';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { useReducer } from 'react';
import { documento, FormField } from './DocumentoFormTypesAndFields';
import { formReducer, getErrorInitialState, getFormInitialEditState } from './DocumentoReducerFunctions';
import { formatNumeroProcesso } from '@/app/utils/Formater';
import { isFieldEmpty } from '@/app/utils/validators';
import GridTextField from '@/presentation/components/GridTextField';
import { EditModal } from '@/presentation/components/ModalEdit';
import { documentos_faltando } from '../../../helper/FormTypesAndFields';


interface IModal {
    open: boolean
    onClose: () => void
    onEditarClick: (documento_antigo: documentos_faltando, documento_faltante: documentos_faltando) => void
    antigo_documento: documentos_faltando
}

export function EditDocumentoModal(props: IModal) {
    const { open, onClose, onEditarClick, antigo_documento } = props
    const [state, dispatch] = useReducer(formReducer, getFormInitialEditState(antigo_documento));

    const [error, setError] = React.useState(getErrorInitialState())

    return (
        <EditModal
            title='Editar Documento Faltante'
            open={open}
            onClose={onClose}
            onEditarClick={handleEditarClick}
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
        </EditModal>
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

    function handleEditarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onEditarClick(antigo_documento, state as documentos_faltando)
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