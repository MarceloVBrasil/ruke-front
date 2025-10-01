import * as React from 'react';
import { Box, Grid, SelectChangeEvent, Typography } from '@mui/material';
import { useReducer } from 'react';
import { formReducer, getErrorInitialState, getFormInitialEditState, getFormInitialState } from './GastosExistenciaisReducerFunctions';
import { formatCurrency } from '@/app/utils/Formater';
import { GastoExistencial } from '@/app/types/gastos-existenciais';
import { isFieldEmpty, isPositive } from '@/app/utils/validators';
import GridTextField from '@/presentation/components/GridTextField';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { EditModal } from '@/presentation/components/ModalEdit';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';

interface IModal {
    open: boolean
    onClose: () => void
    onEditarClick: (id: string, gasto_existencial: GastoExistencial) => void
    gasto_existencial: GastoExistencial
}

export function EditGastoExistencialModal(props: IModal) {
    const { open, onClose, onEditarClick, gasto_existencial } = props
    const [state, dispatch] = useReducer(formReducer, getFormInitialEditState(gasto_existencial));
    const valorInputRef = React.useRef<HTMLDivElement>(null)

    const [error, setError] = React.useState(getErrorInitialState())

    return (
        <EditModal
            title='Editar Gasto Existencial'
            open={open}
            onClose={onClose}
            onEditarClick={handleEditarClick}
        >
            <Grid container spacing={1}>
                <GridTextField
                    xs={12} sm={6}
                    error={error.descricao}
                    fullWidth
                    helperText={error.descricao ? 'Descrição é obrigatória' : ' '}
                    label='Descrição'
                    name='descricao'
                    value={state.descricao}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridCurrencyInput
                    xs={12} sm={6}
                    error={error.valor}
                    helperText={error.valor ? 'Valor é obrigatório' : ' '}
                    label='Valor'
                    name='valor'
                    ref={valorInputRef}
                    onBlur={() => handleMoneyValueChange('valor')}
                    defaultValue={state.valor}
                    variant='standard'
                />
                <GridTextField
                    xs={12}
                    multiline
                    fullWidth
                    label='Observações'
                    name='observacoes'
                    value={state.observacoes}
                    onChange={handleChange}
                    variant='standard'
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
            field: name as keyof GastoExistencial,
            value,
        });
    }

    function handleMoneyValueChange(fieldname: keyof GastoExistencial) {
        const valor = getGridCurrencyInputValue(valorInputRef, fieldname)
        dispatch({
            type: 'SET_MONEY_FIELD',
            field: fieldname,
            value: valor
        })
    }


    function handleEditarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onEditarClick(state.id, { ...state, valor: state.valor })
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
            isFieldEmpty(state.descricao)
            || isFieldEmpty(state.valor)
            || !isPositive(state.valor)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state.descricao)) setError(prev => { return { ...prev, descricao: true } })
        else setError(prev => { return { ...prev, descricao: false } })

        if (isFieldEmpty(state.valor)) setError(prev => { return { ...prev, valor: true } })
        else setError(prev => { return { ...prev, valor: false } })

        if (!isPositive(state.valor)) setError(prev => { return { ...prev, valor: true } })
        else setError(prev => { return { ...prev, valor: false } })
    }
}