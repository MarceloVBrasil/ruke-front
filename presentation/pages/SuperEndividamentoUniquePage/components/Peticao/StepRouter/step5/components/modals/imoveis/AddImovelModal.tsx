import * as React from 'react';
import { Grid, SelectChangeEvent } from '@mui/material';
import { useEffect, useReducer } from 'react';
import { imovel } from '@/app/types/imovel';
import { formatCepInput, formatCurrency } from '@/app/utils/Formater';
import { formReducer, getFormInitialState } from './ImoveisReducerFunctions';
import { ErrorImovelModal, FormField } from './ImoveisFormTypesAndFields';
import { cep } from '@/app/types/cep';
import { AddModal } from '@/presentation/components/ModalAdd';
import GridTextField from '@/presentation/components/GridTextField';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { isCepValid, isFieldEmpty, isPositive } from '@/app/utils/validators';
import { getAddressByCep } from '@/app/api/client/outros';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';

interface IModal {
    open: boolean
    onClose: () => void
    onAdicionarClick: (imovel: imovel) => void
}

export function AddImovelModal(props: IModal) {
    const { open, onClose } = props
    const [state, dispatch] = useReducer(formReducer, getFormInitialState());
    const valorInputRef = React.useRef<HTMLDivElement>(null)

    const [error, setError] = React.useState<ErrorImovelModal>(getErrorInitialState())

    useEffect(() => {
        if (isCepValid(state[FormField.CEP])) {
            getEnderecoByCep(state[FormField.CEP]);
        }
    }, [state[FormField.CEP]]);

    return (
        <AddModal
            title='Cadastrar Imóvel'
            open={open}
            onClose={onClose}
            onAdicionarClick={handleAdicionarClick}
        >
            <Grid container spacing={1}>
                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    error={error.cep}
                    helperText={error.cep ? 'CEP é obrigatório' : ' '}
                    name={FormField.CEP}
                    label='CEP*'
                    value={formatCepInput(state[FormField.CEP])}
                    onChange={handleChange}
                    variant='standard'

                />
                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    error={error.rua}
                    helperText={error.rua ? 'Rua é obrigatória' : ' '}
                    name={FormField.RUA}
                    label='Rua*'
                    value={state[FormField.RUA]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.NUMERO}
                    fullWidth
                    error={error.numero}
                    helperText={error.numero ? 'Número é obrigatória' : ' '}
                    type='number'
                    label='Número*'
                    value={state[FormField.NUMERO]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.CIDADE}
                    fullWidth
                    error={error.cidade}
                    helperText={error.cidade ? 'Cidade é obrigatória' : ' '}
                    label='Cidade*'
                    value={state[FormField.CIDADE]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.BAIRRO}
                    fullWidth
                    error={error.bairro}
                    helperText={error.bairro ? 'Bairro é obrigatório' : ' '}
                    label='Bairro*'
                    value={state[FormField.BAIRRO]}
                    onChange={handleChange}
                    variant='standard'
                />

                <GridTextField
                    xs={12} sm={6}
                    name={FormField.ESTADO}
                    fullWidth
                    error={error.estado}
                    helperText={error.estado ? 'Estado é obrigatório' : ' '}
                    label='Estado*'
                    value={state[FormField.ESTADO]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.COMPLEMENTO}
                    fullWidth
                    label='Complemento'
                    value={state[FormField.COMPLEMENTO]}
                    onChange={handleChange}
                    variant='standard'
                />

                <GridCurrencyInput
                    xs={12} sm={6}
                    error={error.valor}
                    helperText={error.valor ? 'Valor é obrigatório' : ' '}
                    label='Valor*'
                    name={FormField.VALOR}
                    defaultValue={state[FormField.VALOR]}
                    ref={valorInputRef}
                    onBlur={() => handleMoneyValueChange('valor')}
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
            field: name as keyof imovel,
            value,
        });
    }

    function handleMoneyValueChange(fieldname: keyof imovel) {
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

    async function getEnderecoByCep(cep: string) {

        try {
            const data: cep = await getAddressByCep(cep)

            const filteredData = {
                [FormField.RUA]: data.logradouro,
                [FormField.BAIRRO]: data.bairro,
                [FormField.CIDADE]: data.localidade,
                [FormField.ESTADO]: data.uf
            }

            dispatch({
                type: 'SET_FIELD',
                field: FormField.RUA,
                value: filteredData[FormField.RUA]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.BAIRRO,
                value: filteredData[FormField.BAIRRO]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.CIDADE,
                value: filteredData[FormField.CIDADE]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.ESTADO,
                value: filteredData[FormField.ESTADO]
            })

        } catch (error) {

        }
    }

    function resetForm() {

        dispatch({
            type: 'RESET'
        })
    }

    function getErrorInitialState(): ErrorImovelModal {
        const erros: ErrorImovelModal = {
            cep: false,
            estado: false,
            cidade: false,
            bairro: false,
            rua: false,
            complemento: false,
            numero: false,
            valor: false
        }

        return erros
    }

    function isFormInvalid(): boolean {
        return (
            !isCepValid(state.cep)
            || isFieldEmpty(state.estado)
            || isFieldEmpty(state.cidade)
            || isFieldEmpty(state.bairro)
            || isFieldEmpty(state.rua)
            || isFieldEmpty(state.numero)
            || !isPositive(state.numero)
            || !isPositive(state.valor)
        )
    }

    function checkErrors() {
        if (!isCepValid(state.cep)) setError(prev => { return { ...prev, cep: true } })
        else setError(prev => { return { ...prev, cep: false } })

        if (isFieldEmpty(state.estado)) setError(prev => { return { ...prev, estado: true } })
        else setError(prev => { return { ...prev, estado: false } })

        if (isFieldEmpty(state.cidade)) setError(prev => { return { ...prev, cidade: true } })
        else setError(prev => { return { ...prev, cidade: false } })

        if (isFieldEmpty(state.bairro)) setError(prev => { return { ...prev, bairro: true } })
        else setError(prev => { return { ...prev, bairro: false } })

        if (isFieldEmpty(state.rua)) setError(prev => { return { ...prev, rua: true } })
        else setError(prev => { return { ...prev, rua: false } })

        if (isFieldEmpty(state.numero) || !isPositive(state.numero)) setError(prev => { return { ...prev, numero: true } })
        else setError(prev => { return { ...prev, numero: false } })


        if (isFieldEmpty(state.valor) || !isPositive(state.valor)) setError(prev => { return { ...prev, valor: true } })
        else setError(prev => { return { ...prev, valor: false } })
    }
}