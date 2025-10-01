import * as React from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';
import { useReducer } from 'react';
import { veiculo } from '@/app/types/veiculo';
import { ErrorVeiculoModal, FormField } from './VeiculosFormTypesAndFields';
import { formReducer, getFormInitialState } from './VeiculosReducerFunctions';
import { onlyNumber } from '@/app/utils/Formater';
import { AddModal } from '@/presentation/components/ModalAdd';
import GridTextField from '@/presentation/components/GridTextField';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { isAnoValid, isFieldEmpty, isPositive, isRenavamValid } from '@/app/utils/validators';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';

interface IModal {
    open: boolean
    onClose: () => void
    onAdicionarClick: (veiculo: veiculo) => void
}

export function AddVeiculoModal(props: IModal) {
    const { open, onClose } = props
    const [state, dispatch] = useReducer(formReducer, getFormInitialState());
    const valorInputRef = React.useRef<HTMLDivElement>(null)

    const [error, setError] = React.useState<ErrorVeiculoModal>(getErrorInitialState())

    return (
        <AddModal
            title='Cadastrar Veículo'
            open={open}
            onClose={onClose}
            onAdicionarClick={handleAdicionarClick}
        >
            <Grid container spacing={1}>
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.MARCA}
                    fullWidth
                    error={error.marca}
                    helperText={error.marca ? 'Marca é obrigatória' : ' '}
                    label='Marca*'
                    value={state[FormField.MARCA]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.ANO}
                    fullWidth
                    error={error.ano}
                    helperText={error.ano ? 'Ano é obrigatório' : ' '}
                    label='Ano*'
                    value={onlyNumber(state[FormField.ANO])}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.RENAVAM}
                    fullWidth
                    error={error.renavam}
                    helperText={error.renavam ? 'Renavam é obrigatória' : ' '}
                    label='Renavam*'
                    value={state[FormField.RENAVAM]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridCurrencyInput
                    xs={12} sm={6}
                    label='Valor*'
                    error={error.valor}
                    helperText={error.valor ? 'Valor é obrigatória' : ' '}
                    name={FormField.VALOR}
                    defaultValue={state[FormField.VALOR]}
                    ref={valorInputRef}
                    onBlur={() => handleMoneyValueChange('valor')}
                    variant='standard'
                />

                <GridTextField
                    xs={12} sm={6}
                    name={FormField.PLACA}
                    fullWidth
                    error={error.placa}
                    helperText={error.placa ? 'Placa é obrigatória' : ' '}
                    label='Placa*'
                    value={state[FormField.PLACA]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.COR}
                    fullWidth
                    error={error.cor}
                    helperText={error.cor ? 'Cor é obrigatória' : ' '}
                    label='Cor*'
                    value={state[FormField.COR]}
                    onChange={handleChange}
                    variant='standard'
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
            field: name as keyof veiculo,
            value,
        });
    }

    function handleMoneyValueChange(fieldname: keyof veiculo) {
        const valor = getGridCurrencyInputValue(valorInputRef, fieldname)

        dispatch({
            type: 'SET_MONEY_FIELD',
            field: fieldname,
            value: valor
        })
    }

    function handleAdicionarClick() {
        checkErrors()
        if (isFormInvalid()) return

        props.onAdicionarClick({ ...state, valor: getGridCurrencyInputValue(valorInputRef, 'valor') })
        onClose()
        resetForm()
    }

    function resetForm() {
        dispatch({
            type: 'RESET'
        })
    }

    function getErrorInitialState(): ErrorVeiculoModal {
        const erros: ErrorVeiculoModal = {
            marca: false,
            ano: false,
            renavam: false,
            valor: false,
            placa: false,
            cor: false
        }

        return erros
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state.marca)
            || !isAnoValid(state.ano)
            || !isRenavamValid(state.renavam)
            || isFieldEmpty(getGridCurrencyInputValue(valorInputRef, 'valor'))
            || !isPositive(getGridCurrencyInputValue(valorInputRef, 'valor'))
            || isFieldEmpty(state.placa)
            || isFieldEmpty(state.cor)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state.marca)) setError(prev => { return { ...prev, marca: true } })
        else setError(prev => { return { ...prev, marca: false } })

        if (!isAnoValid(state.ano)) setError(prev => { return { ...prev, ano: true } })
        else setError(prev => { return { ...prev, ano: false } })

        if (!isRenavamValid(state.renavam)) setError(prev => { return { ...prev, renavam: true } })
        else setError(prev => { return { ...prev, renavam: false } })

        if (isFieldEmpty(state.valor)) setError(prev => { return { ...prev, valor: true } })
        else if (!isPositive(state.valor)) setError(prev => { return { ...prev, valor: true } })
        else setError(prev => { return { ...prev, valor: false } })

        if (isFieldEmpty(state.placa)) setError(prev => { return { ...prev, placa: true } })
        else setError(prev => { return { ...prev, placa: false } })

        if (isFieldEmpty(state.cor)) setError(prev => { return { ...prev, cor: true } })
        else setError(prev => { return { ...prev, cor: false } })
    }
}