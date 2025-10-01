import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Box, FormControl, FormControlLabel, FormHelperText, Grid, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useEffect, useReducer } from 'react';
import { divida } from '@/app/types/divida';
import { FormField, NATUREZA_DIVIDA } from './DividasFormTypesAndFields';
import { formReducer, getErrorInitialState, getFormInitialEditState } from './DividaReducerFunctions';
import { isNaturezaCompraDeBem, isOutraNatureza } from '../../../helper/ReducerFuntions';
import { EditModal } from '@/presentation/components/ModalEdit';
import { isFieldEmpty, isPositive, isNegative } from '@/app/utils/validators';
import GridSelectField from '@/presentation/components/GridSelectField';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import GridTextField from '@/presentation/components/GridTextField';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import { natureza_options } from './natureza_options';

interface IModal {
    open: boolean
    onClose: () => void
    onEditarClick: (id: string, divida: divida) => void
    credores: string[]
    divida: divida
}

export function EditDividaModal(props: IModal) {
    const { open, onClose, onEditarClick, credores, divida } = props
    const [state, dispatch] = useReducer(formReducer, getFormInitialEditState(divida));

    const valor_base_input_ref = React.useRef<HTMLDivElement>(null)
    const valor_pago_input_ref = React.useRef<HTMLDivElement>(null)
    const valor_total_input_ref = React.useRef<HTMLDivElement>(null)

    const [naturezaCompraBemChecked, setNaturezaCompraBemChecked] = React.useState(isNaturezaCompraDeBem(divida.natureza))
    const [naturezaOutrosChecked, setNaturezaOutrosChecked] = React.useState(isOutraNatureza(state[FormField.NATUREZA]))

    const [naturezaCompraBem, setNaturezaCompraBem] = React.useState(isNaturezaCompraDeBem(divida.natureza) ? divida.natureza.substring(10) : '')
    const [naturezaOutros, setNaturezaOutros] = React.useState(isOutraNatureza(divida.natureza) ? divida.natureza : '')

    const [error, setError] = React.useState(getErrorInitialState())

    useEffect(() => {
        handleValorQueFaltaPagar()
    }, [state[FormField.VALOR_TOTAL_DIVIDA], state[FormField.VALOR_PAGO]])

    useEffect(() => {
        setNaturezaCompraBemChecked(state[FormField.NATUREZA].includes(NATUREZA_DIVIDA.COMPRA))
        setNaturezaOutrosChecked(isOutraNatureza(state[FormField.NATUREZA]))
    }, [state[FormField.NATUREZA]])

    return (
        <EditModal
            title='Editar Dívida'
            open={open}
            onClose={onClose}
            onEditarClick={handleEditarClick}
        >
            <Grid container spacing={1}>

                <GridTextField
                    xs={12} sm={6}
                    error={error.valor_que_falta_pagar}
                    helperText={error.valor_que_falta_pagar ? 'Valor que falta pagar inválido' : ' '}
                    name={FormField.VALOR_QUE_FALTA_PAGAR}
                    fullWidth
                    label='Quanto falta pagar (calculado automaticamente)'
                    style={{ position: 'relative', bottom: 12 }}
                    variant='standard'
                    inputProps={{ readOnly: true, style: { fontSize: 30 } }}
                    value={Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(state[FormField.VALOR_QUE_FALTA_PAGAR])}
                />

                <GridSelectField
                    xs={12} sm={6}
                    error={error.credor}
                    helperText={error.credor ? 'Credor é obrigatório' : ' '}
                    fullWidth
                    label='Credor*'
                    name={FormField.CREDOR}
                    value={state[FormField.CREDOR]}
                    onChange={handleChange}
                    variant="standard"
                    options={credores.map(credor => { return { descricao: credor, value: credor } })}
                />

                <GridTextField
                    xs={12}
                    name={FormField.DATA}
                    type='date'
                    label='Data*'
                    error={error.data}
                    helperText={error.data ? 'Data é obrigatória' : ' '}
                    fullWidth
                    value={state[FormField.DATA]}
                    onChange={handleChange}
                    variant='standard'
                />

                <GridTextField
                    xs={12} sm={6}
                    tooltip='Você pode adicionar não só parcelas de um financiamento, mas também contas mensais como luz ou água. Por exemplo, se o reclamante deve conta de energia elétrica pelos meses de janeiro e março, essas dívidas podem ser registradas aqui. Assim, dá para organizar tanto dívidas parceladas quanto contas de serviços mensais'
                    error={error.numero_parcelas}
                    helperText={error.numero_parcelas ? 'Número de parcelas é obrigatório' : ' '}
                    name={FormField.NUMERO_DE_PARCELAS}
                    fullWidth
                    label='Número de Parcelas*'
                    value={state[FormField.NUMERO_DE_PARCELAS]}
                    onChange={handleChange}
                    variant='standard'
                />

                <GridCurrencyInput
                    xs={12} sm={6}
                    error={error.valor_base_parcelas_sem_juros}
                    helperText={error.valor_base_parcelas_sem_juros ? 'Valor Base das parcelas é obrigatório' : ' '}
                    name={FormField.VALOR_BASE_PARCELAS_SEM_JUROS}
                    label='Valor Base das parcelas*'
                    defaultValue={state[FormField.VALOR_BASE_PARCELAS_SEM_JUROS]}
                    ref={valor_base_input_ref}
                    onBlur={() => handleMoneyValueChange(valor_base_input_ref, FormField.VALOR_BASE_PARCELAS_SEM_JUROS)}
                    variant='standard'
                />

                {/* <GridTextField
                    xs={12} sm={6}
                    name={FormField.JUROS_REMUNERATORIOS}
                    fullWidth
                    error={error.juros_remuneratorios}
                    helperText={error.juros_remuneratorios ? 'Juros Remuneratórios é obrigatório' : ' '}
                    label='Juros Remuneratórios*'
                    value={state[FormField.JUROS_REMUNERATORIOS]}
                    onChange={handleChange}
                    variant='standard'
                    endAdornment='%'
                    type='number'
                /> */}

                {/* <GridTextField
                    xs={12} sm={6}
                    name={FormField.JUROS_MORA_MES}
                    fullWidth
                    error={error.juros_mora_mes}
                    helperText={error.juros_mora_mes ? 'Campo juros de mora é obrigatório' : ' '}
                    label='Juros de Mora ao mês*'
                    value={state[FormField.JUROS_MORA_MES]}
                    onChange={handleChange}
                    variant='standard'
                    endAdornment='%'
                    type='number'
                /> */}

                <GridCurrencyInput
                    xs={12} sm={6}
                    name={FormField.VALOR_PAGO}
                    label='Valor já pago*'
                    error={error.valor_pago}
                    helperText={error.valor_pago ? 'Valor já pago é obrigatório' : ' '}
                    defaultValue={state[FormField.VALOR_PAGO]}
                    ref={valor_pago_input_ref}
                    onBlur={() => handleMoneyValueChange(valor_pago_input_ref, FormField.VALOR_PAGO)}
                    variant='standard'
                />

                <GridCurrencyInput
                    xs={12} sm={6}
                    error={error.valor_total_divida}
                    helperText={error.valor_total_divida ? 'Valor total da dívida é obrigatório' : ' '}
                    name={FormField.VALOR_TOTAL_DIVIDA}
                    label='Valor Total da Dívida*'
                    defaultValue={state[FormField.VALOR_TOTAL_DIVIDA]}
                    ref={valor_total_input_ref}
                    onBlur={() => handleMoneyValueChange(valor_total_input_ref, FormField.VALOR_TOTAL_DIVIDA)}
                    variant='standard'
                />

                <Grid item xs={12} sm={6} sx={{ display: 'flex', gap: 2 }}>
                    <FormControl fullWidth error={error.natureza}>
                        <RadioGroup name={FormField.NATUREZA} value={state[FormField.NATUREZA]} onChange={handleChange} sx={{ px: 2, display: 'flex' }}>
                            <GridRadioGroup
                                style={{ position: 'relative', right: 15 }}
                                sectionTitle={'Natureza*'}
                                sectionTitleStyles={{ fontWeight: 500 }}
                                name={FormField.NATUREZA}
                                value={state.natureza}
                                onChange={handleChange}
                                options={natureza_options}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
                                <FormControlLabel checked={naturezaCompraBemChecked} value={NATUREZA_DIVIDA.COMPRA} control={<Radio />} label={"Compra de Bem"} />
                                <TextField
                                    value={naturezaCompraBem}
                                    placeholder='Qual?'
                                    onChange={handleCompraDeBemNaturezaTypeChange}
                                    fullWidth
                                    sx={{ position: 'absolute', left: 170, visibility: naturezaCompraBemChecked ? 'visible' : 'hidden' }}
                                    variant='standard'
                                />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
                                <FormControlLabel checked={naturezaOutrosChecked} value={NATUREZA_DIVIDA.OUTROS} control={<Radio />} label={NATUREZA_DIVIDA.OUTROS} />
                                <TextField
                                    value={naturezaOutros}
                                    placeholder='Qual?'
                                    onChange={handleOutraNaturezaTypeChange}
                                    fullWidth
                                    sx={{ position: 'absolute', left: 170, visibility: naturezaOutrosChecked ? 'visible' : 'hidden' }}
                                    variant='standard'
                                />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <GridRadioGroup
                    error={error.parcelas_vencidas}
                    helperText={error.parcelas_vencidas ? 'Campo parcelas vencidas é obrigatório' : ' '}
                    xs={12} sm={6}
                    sectionTitle='Existem parcelas vencidas*?'
                    name={FormField.PARCELAS_VENCIDAS}
                    value={state[FormField.PARCELAS_VENCIDAS]}
                    onChange={handleChange}
                    options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
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
            field: name as keyof divida,
            value,
        });
    }

    function handleOutraNaturezaTypeChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value } = e.target
        setNaturezaOutros(value)
        dispatch({
            type: 'OUTRA_NATUREZA_TYPE_CHANGE',
            field: FormField.NATUREZA,
            value
        })
    }

    function handleCompraDeBemNaturezaTypeChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value } = e.target
        setNaturezaCompraBem(value)
        dispatch({
            type: 'COMPRA_DE_BEM_NATUREZA_TYPE_CHANGE',
            field: FormField.NATUREZA,
            value
        })
    }

    function handleValorQueFaltaPagar() {
        dispatch({
            type: 'SET_MONEY_FIELD',
            field: FormField.VALOR_QUE_FALTA_PAGAR,
            value: state[FormField.VALOR_TOTAL_DIVIDA] - state[FormField.VALOR_PAGO]
        })
    }

    function handleMoneyValueChange(ref: any, fieldname: keyof divida) {
        const valor = getGridCurrencyInputValue(ref, fieldname)

        dispatch({
            type: 'SET_MONEY_FIELD',
            field: fieldname,
            value: valor
        })
    }

    function handleEditarClick() {
        checkErrors()
        if (isFormInvalid()) return

        onEditarClick(state.id as string, state)
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
            isFieldEmpty(state.data)
            || isFieldEmpty(state.credor)
            || isFieldEmpty(state.natureza)
            || isFieldEmpty(state.numero_de_parcelas)
            || !isPositive(state.numero_de_parcelas)
            || isFieldEmpty(state.valor_base_parcelas_sem_juros)
            || !isPositive(state.valor_base_parcelas_sem_juros)
            || isFieldEmpty(state.valor_total_divida)
            || !isPositive(state.valor_total_divida)
            || !isPositive(state.valor_que_falta_pagar)
            || isFieldEmpty(state.valor_pago)
            || isNegative(state.valor_pago)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state.data)) setError(prev => { return { ...prev, data: true } })
        else setError(prev => { return { ...prev, data: false } })

        if (isFieldEmpty(state.credor)) setError(prev => { return { ...prev, credor: true } })
        else setError(prev => { return { ...prev, credor: false } })

        if (isFieldEmpty(state.natureza)) setError(prev => { return { ...prev, natureza: true } })
        else setError(prev => { return { ...prev, natureza: false } })

        if (isFieldEmpty(state.numero_de_parcelas) || !isPositive(state.numero_de_parcelas)) setError(prev => { return { ...prev, numero_parcelas: true } })
        else setError(prev => { return { ...prev, numero_parcelas: false } })

        if (isFieldEmpty(state.valor_base_parcelas_sem_juros) || !isPositive(state.valor_base_parcelas_sem_juros)) setError(prev => { return { ...prev, valor_base_parcelas_sem_juros: true } })
        else setError(prev => { return { ...prev, valor_base_parcelas_sem_juros: false } })

        if (isFieldEmpty(state.valor_total_divida) || !isPositive(state.valor_total_divida)) setError(prev => { return { ...prev, valor_total_divida: true } })
        else setError(prev => { return { ...prev, valor_total_divida: false } })

        if (!isPositive(state.valor_que_falta_pagar)) setError(prev => { return { ...prev, valor_que_falta_pagar: true } })
        else setError(prev => { return { ...prev, valor_que_falta_pagar: false } })

        if (isFieldEmpty(state.valor_pago) || isNegative(state.valor_pago)) setError(prev => { return { ...prev, valor_pago: true } })
        else setError(prev => { return { ...prev, valor_pago: false } })

    }
}