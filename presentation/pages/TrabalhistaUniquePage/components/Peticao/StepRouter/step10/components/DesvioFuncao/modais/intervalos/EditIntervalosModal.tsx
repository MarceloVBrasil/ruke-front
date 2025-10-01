import * as React from 'react';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { useReducer } from 'react';
import { AddModal } from '@/presentation/components/ModalAdd';
import { isFieldEmpty, isPositive } from '@/app/utils/validators';
import { formReducer, getEditFormInitialState, getErrorInitialState, getFormInitialState } from './DesviosReducerFunctions';
import { intervalo, ErrorDesviosModal } from './DesviosFormAndFields';
import GridTextField from '@/presentation/components/GridTextField';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { getGridCurrencyInputValue, setGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import GridCheckbox from '@/presentation/components/GridCheckbox';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import { EditModal } from '@/presentation/components/ModalEdit';

interface IModal {
    open: boolean
    onClose: () => void
    onEditarClick: (id: string, intervalo: intervalo) => void
    intervalo: intervalo
}

export function EditDesviosModal(props: IModal) {
    const { open, onClose, onEditarClick, intervalo } = props
    const [state, dispatch] = useReducer(formReducer, getEditFormInitialState(intervalo));
    const [delimitarPeriodo, setDelimitarPeriodo] = React.useState(state.data_final != null || state.data_inicial != null);
    const [outrosFundamentosChecked, setOutrosFundamentosChecked] = React.useState(state.outros_fundamentos !== null)

    const [error, setError] = React.useState<ErrorDesviosModal>(getErrorInitialState())
    const salarioInpurRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (state.salario_nao_conhecido) setGridCurrencyInputValue(salarioInpurRef, 'valor_salario', 0)
        else handleValorSalarioChangeUseEffect()
    }, [state.salario_nao_conhecido])

    return (
        <EditModal
            title='Desvio de Função | Editar Intervalo de data'
            open={open}
            onClose={onClose}
            onEditarClick={handleAdicionarClick}
        >
            <Grid container spacing={2}>
                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Cargo da CTPS'
                    error={error.cargo_ctps}
                    helperText={error.cargo_ctps ? 'cargo ctps é obrigatório' : ' '}
                    value={state.cargo_ctps}
                    name={state.cargo_ctps}
                    variant={'standard'}
                    onChange={handleCargoCtpsChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Cargo que ocupava na prática'
                    error={error.cargo_que_ocupava}
                    helperText={error.cargo_que_ocupava ? 'cargo que ocupava é obrigatória' : ' '}
                    value={state.cargo_que_ocupava as string}
                    name={state.cargo_que_ocupava as string}
                    variant={'standard'}
                    onChange={handleCargoQueOcupavaChange}
                />

                <Box sx={{ width: '100%', marginLeft: 2, display: 'flex', flexDirection: 'column', gap: 0 }}>
                    <GridCurrencyInput
                        xs={12}
                        disabled={state.salario_nao_conhecido}
                        ref={salarioInpurRef}
                        onBlur={handleValorSalarioChange}
                        defaultValue={state.valor_salario}
                        name={'valor_salario'}
                        label={'Salário devido para o cargo efetivamente ocupado'}
                        variant='standard'
                    />

                    <GridCheckbox
                        xs={12}
                        checked={state.salario_nao_conhecido}
                        name={'salario_nao_conhecido'}
                        value={state.salario_nao_conhecido}
                        label={'Salário não conhecido'}
                        onChange={handleSalarioNaoConhecidoChange}
                    />
                </Box>

                {/* <GridCheckbox
                    xs={12}
                    checked={delimitarPeriodo}
                    name={'delimitar_periodo'}
                    value={''}
                    label={'Delimitar período'}
                    onChange={handleDelimitarPeriodo}
                    style={{ paddingTop: 0 }}
                /> */}

                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Data inicial'
                    type='date'
                    error={error.data_inicial}
                    helperText={error.data_inicial ? 'data inicial é obrigatória' : ' '}
                    value={state.data_inicial}
                    name={state.data_inicial}
                    variant={'standard'}
                    onChange={handleDataInicialChange}
                // containerStyle={{ visibility: delimitarPeriodo ? 'visible' : 'hidden' }}
                />

                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Data final'
                    type='date'
                    error={error.data_final}
                    helperText={error.data_final ? 'data final é obrigatória' : ' '}
                    value={state.data_final}
                    name={state.data_final}
                    variant={'standard'}
                    onChange={handleDataFinalChange}
                // containerStyle={{ visibility: delimitarPeriodo ? 'visible' : 'hidden' }}
                />
            </Grid>
        </EditModal>
    );

    function handleDelimitarPeriodo() {
        const checked = !delimitarPeriodo

        if (checked) {
            setDelimitarPeriodo(checked)
        }

        else {
            setDelimitarPeriodo(checked)

            dispatch({
                type: 'SET_DATA_INICIAL_FIELD',
                value: null
            })

            dispatch({
                type: 'SET_DATA_FINAL_FIELD',
                value: null
            })
        }
    }

    function handleDataInicialChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string> | { target: { name: string, value: string } }
    ) {
        const { name, value } = e.target;

        dispatch({
            type: 'SET_DATA_INICIAL_FIELD',
            value,
        });
    }

    function handleDataFinalChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string> | { target: { name: string, value: string } }
    ) {
        const { name, value } = e.target;

        dispatch({
            type: 'SET_DATA_FINAL_FIELD',
            value,
        });
    }

    function handleCargoCtpsChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string> | { target: { name: string, value: string } }
    ) {
        const { name, value } = e.target;

        dispatch({
            type: 'SET_CARGO_CTPS_FIELD',
            value,
        });
    }

    function handleCargoQueOcupavaChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string> | { target: { name: string, value: string } }
    ) {
        const { name, value } = e.target;

        dispatch({
            type: 'SET_CARGO_OCUPAVA_FIELD',
            value,
        });
    }

    function handleSalarioNaoConhecidoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string> | { target: { name: string, value: string } }
    ) {
        const { name, value } = e.target;

        dispatch({
            type: 'SET_SALARIO_FIELD',
            value: !state.salario_nao_conhecido
        });
    }

    function handleValorSalarioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        dispatch({
            type: 'SET_VALOR_SALARIO_FIELD',
            value: getGridCurrencyInputValue(salarioInpurRef, e.target.name)
        })
    }

    function handleValorSalarioChangeUseEffect(

    ) {
        dispatch({
            type: 'SET_VALOR_SALARIO_FIELD',
            value: getGridCurrencyInputValue(salarioInpurRef, 'valor_salario')
        })
    }

    function handleAdicionarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onEditarClick(state.id, state)
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
            false
            || isFieldEmpty(state.cargo_ctps)
            || isFieldEmpty(state.cargo_que_ocupava)
            || isFieldEmpty(state.data_final)
            || isFieldEmpty(state.data_inicial)
            || !state.salario_nao_conhecido && !isPositive(state.valor_salario)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state.cargo_ctps)) setError((prev) => { return { ...prev, cargo_ctps: true } })
        else setError((prev) => { return { ...prev, cargo_ctps: false } })

        if (isFieldEmpty(state.cargo_que_ocupava)) setError((prev) => { return { ...prev, cargo_que_ocupava: true } })
        else setError((prev) => { return { ...prev, cargo_que_ocupava: false } })

        if (isFieldEmpty(state.data_final)) setError((prev) => { return { ...prev, data_final: true } })
        else setError((prev) => { return { ...prev, data_final: false } })

        if (isFieldEmpty(state.data_inicial)) setError((prev) => { return { ...prev, data_inicial: true } })
        else setError((prev) => { return { ...prev, data_inicial: false } })

        if (!state.salario_nao_conhecido && !isPositive(state.valor_salario)) setError((prev) => { return { ...prev, valor_salario: true } })
        else setError((prev) => { return { ...prev, valor_salario: false } })
    }
}