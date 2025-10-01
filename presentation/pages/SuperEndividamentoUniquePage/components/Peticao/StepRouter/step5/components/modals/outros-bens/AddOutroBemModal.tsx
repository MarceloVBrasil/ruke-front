import { SelectChangeEvent, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useReducer, useState } from 'react'
import { outro_bem } from '../../../helper/FormTypesAndFields'
import { AddModal } from '@/presentation/components/ModalAdd'
import { formReducer, getInitialErrorState, getInitialState } from './OutrosBensReducerFunctions'
import { FormField, ErrorOutroBemModal } from './OutrosBensFormTypesAndFields'
import { isFieldEmpty } from '@/app/utils/validators'

interface IModal {
    open: boolean
    onClose: () => void
    onAdicionarClick: (outro_bem: outro_bem) => void
}

export default function AddOutroBemModal(props: IModal) {
    const { open, onClose, onAdicionarClick } = props
    const [state, dispatch] = useReducer(formReducer, getInitialState())

    const [error, setError] = useState<ErrorOutroBemModal>(getInitialErrorState())

    return (
        <AddModal
            title='Cadastrar Outro Bem'
            open={open}
            onClose={onClose}
            onAdicionarClick={handleAdicionarClick}
        >
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    name={FormField.DESCRICAO}
                    fullWidth
                    error={error.descricao}
                    helperText={error.descricao ? 'Descrição é obrigatória' : ' '}
                    label='Descrição*'
                    value={state[FormField.DESCRICAO]}
                    onChange={handleChange}
                    variant='standard'
                />
            </Box>
        </AddModal>
    )

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

    function handleAdicionarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onAdicionarClick(state.descricao as outro_bem)
        resetForm()
        onClose()
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
