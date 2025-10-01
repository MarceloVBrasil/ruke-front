import { advogado_assinante } from '@/app/types/advogados_assinantes'
import GridTextField from '@/presentation/components/GridTextField'
import { AddModal } from '@/presentation/components/ModalAdd'
import React, { useReducer, useState } from 'react'
import { formReducer, getErrorInitialState, getFormInitialEditState, getFormInitialState } from './AssinantesReducerFunctions'
import { FormField } from './AssinantesFormTypesAndFields'
import { SelectChangeEvent } from '@mui/material'
import GridSelectField from '@/presentation/components/GridSelectField'
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros'
import { isFieldEmpty } from '@/app/utils/validators'
import { EditModal } from '@/presentation/components/ModalEdit'

interface IModal {
    open: boolean
    onClose: () => void
    onEditarClick: (id: string, assinante: advogado_assinante) => void
    advogado_assinante: advogado_assinante
}

export default function EditAssinanteModal(props: IModal) {
    const { open, onClose, onEditarClick, advogado_assinante } = props
    const [state, dispatch] = useReducer(formReducer, getFormInitialEditState(advogado_assinante))
    const [error, setError] = useState(getErrorInitialState())

    return (
        <EditModal
            title='Advogado Assinante'
            open={open}
            onClose={onClose}
            onEditarClick={handleEditarClick}
        >
            <GridTextField
                xs={12}
                label='Advogado que receberá as intimações*'
                variant='standard'
                error={error.nome}
                helperText={error.nome ? 'Advogado é obrigatório' : ' '}
                fullWidth
                name={FormField.ADVOGADO}
                value={(state[FormField.ADVOGADO])}
                onChange={handleAdvogadoChange}
            />


            <GridTextField
                xs={12}
                label='Número OAB*'
                variant='standard'
                error={error.oab}
                helperText={error.oab ? 'Número da oab é obrigatório' : ' '}
                fullWidth
                name={FormField.OAB}
                value={(state[FormField.OAB])}
                onChange={handleOabChange}
            />

            <GridSelectField
                label={'Estado OAB*'}
                helperText={error.oab ? 'Estado da oab é obrigatório' : ' '}
                fullWidth
                value={state.estado_oab}
                onChange={handleEstadoOabChange}
                name={''}
                variant={'standard'}
                options={estados_brasileiros}
            />

        </EditModal>
    )

    function handleAdvogadoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;
        dispatch({
            type: 'SET_ADVOGADO',
            field: name as keyof advogado_assinante,
            value,
        });
    }

    function handleOabChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;
        dispatch({
            type: 'SET_OAB',
            field: name as keyof advogado_assinante,
            value,
        });
    }

    function resetForm() {
        dispatch({
            type: 'RESET'
        })
    }

    function handleEstadoOabChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;
        dispatch({
            type: 'SET_ESTADO_OAB',
            field: name as keyof advogado_assinante,
            value,
        });
    }

    function handleEditarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onClose()
        onEditarClick(state.id as string, state)
        resetForm()
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state.estado_oab)
            || isFieldEmpty(state.nome)
            || isFieldEmpty(state.oab)
            // || isFieldEmpty(state.status)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state.nome)) setError(prev => { return { ...prev, nome: true } })
        else setError(prev => { return { ...prev, nome: false } })

        if (isFieldEmpty(state.oab)) setError(prev => { return { ...prev, oab: true } })
        else setError(prev => { return { ...prev, oab: false } })

        if (isFieldEmpty(state.estado_oab)) setError(prev => { return { ...prev, estado_oab: true } })
        else setError(prev => { return { ...prev, estado_oab: false } })

        if (isFieldEmpty(state.status)) setError(prev => { return { ...prev, status: true } })
        else setError(prev => { return { ...prev, status: false } })
    }
}
