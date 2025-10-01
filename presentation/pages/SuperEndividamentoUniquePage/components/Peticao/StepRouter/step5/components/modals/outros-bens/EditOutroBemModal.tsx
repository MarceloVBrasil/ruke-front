import { SelectChangeEvent, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useReducer, useState } from 'react'
import { outro_bem } from '../../../helper/FormTypesAndFields'
import { EditModal } from '@/presentation/components/ModalEdit'
import { ErrorOutroBemModal, FormField } from './OutrosBensFormTypesAndFields'
import { formReducer, getInitialState, getInitialErrorState, getInitialEditState } from './OutrosBensReducerFunctions'
import { isFieldEmpty } from '@/app/utils/validators'

interface IModal {
    open: boolean
    onClose: () => void
    onEditarClick: (antigo_outro_bem: outro_bem, novo_outro_bem: outro_bem) => void
    antigo_outro_bem: outro_bem
}

export default function EditOutroBemModal(props: IModal) {
    const { open, onClose, onEditarClick, antigo_outro_bem } = props
    const [state, dispatch] = useReducer(formReducer, getInitialEditState(antigo_outro_bem))

    const [error, setError] = useState<ErrorOutroBemModal>(getInitialErrorState())
    return (
        <EditModal
            title='Editar Outro Bem'
            open={open}
            onClose={onClose}
            onEditarClick={handleEditarClick}
        >
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    name={FormField.DESCRICAO}
                    fullWidth
                    error={error.descricao}
                    helperText={error.descricao ? 'Descrição é obrigatória' : ' '}
                    label='Descrição*'
                    value={state.descricao}
                    onChange={handleChange}
                    variant='standard'
                />
            </Box>
        </EditModal>
    )

    function handleEditarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onEditarClick(antigo_outro_bem, state.descricao as outro_bem)
        resetForm()
        onClose()
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;
        dispatch({
            type: 'SET_FIELD',
            field: name as keyof FormField,
            value,
        });
    }

    function resetForm() {
        dispatch({
            type: 'RESET'
        })
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state.descricao)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state.descricao)) setError(prev => { return { ...prev, descricao: true } })
        else setError(prev => { return { ...prev, descricao: false } })
    }
}
