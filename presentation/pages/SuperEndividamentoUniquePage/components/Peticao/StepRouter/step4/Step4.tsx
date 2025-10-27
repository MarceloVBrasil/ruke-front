
"üse client"

import { FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, SelectChangeEvent, TextField } from '@mui/material'
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { PASSOS } from '../helper/passos';
import { updateSuperendividamentoTicket } from '@/app/api/server/superendividamento';
import { getSuperendividamentoTicketIdFromURL } from '../helper/getSuperendividamentoTicketIdFromURL';
import { ErrorStep4, FormField, FormState } from './helper/FormTypesAndFields';
import { formReducer, getStateFromApi, isOutraRenda } from './helper/ReducerFunctions';
import { FONTES_RENDA } from './helper/FontesDeRendaEnum';
import { FonteRendaCheckbox } from './helper/FormTypesAndFields';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import { isFieldEmpty } from '@/app/utils/validators';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import FormButtons from '@/presentation/components/FormButtons';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { IStep } from '../StepRouter';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import { CheckBox } from '@/presentation/components/Checkbox';

export default function Step4({ api_data, stepsError, setStepsError }: IStep) {
    const [state, dispatch] = useReducer(formReducer, getStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getSuperendividamentoTicketIdFromURL(pathname)

    const [error, setError] = useState(getErrorInitialState())

    const aposentadoria = useMemo(() => {
        return state[FormField.FONTES_DE_RENDA_CLIENTE].value.find(renda => {
            return renda.descricao === FONTES_RENDA.APOSENTADORIA;
        }) || { descricao: FONTES_RENDA.APOSENTADORIA, valor_bruto: 0, valor_liquido: 0, checked: false, id: FONTES_RENDA.APOSENTADORIA };
    }, [state[FormField.FONTES_DE_RENDA_CLIENTE].value]);

    const salario = useMemo(() => {
        return state[FormField.FONTES_DE_RENDA_CLIENTE].value.find(renda => {
            return renda.descricao === FONTES_RENDA.SALARIO;
        }) || { descricao: FONTES_RENDA.SALARIO, valor_bruto: 0, valor_liquido: 0, checked: false, id: FONTES_RENDA.SALARIO };
    }, [state[FormField.FONTES_DE_RENDA_CLIENTE].value]);

    const alugueis = useMemo(() => {
        return state[FormField.FONTES_DE_RENDA_CLIENTE].value.find(renda => {
            return renda.descricao === FONTES_RENDA.ALUGUEIS;
        }) || { descricao: FONTES_RENDA.ALUGUEIS, valor_bruto: 0, valor_liquido: 0, checked: false, id: FONTES_RENDA.ALUGUEIS };
    }, [state[FormField.FONTES_DE_RENDA_CLIENTE].value]);

    const outras_rendas = useMemo(() => {
        return state[FormField.FONTES_DE_RENDA_CLIENTE].value.find(renda => isOutraRenda(renda))
            || { descricao: '', valor_bruto: 0, valor_liquido: 0, checked: false, id: FONTES_RENDA.OUTROS };
    }, [state[FormField.FONTES_DE_RENDA_CLIENTE].value]);


    const conjuge = useMemo(() => {
        return state[FormField.FAMILIARES_CLIENTE].value.find(renda => {
            return renda.descricao === FONTES_RENDA.CONJUGE;
        }) || { descricao: FONTES_RENDA.CONJUGE, valor_bruto: 0, valor_liquido: 0, checked: false, id: FONTES_RENDA.CONJUGE };
    }, [state[FormField.FAMILIARES_CLIENTE].value]);

    const outro_familiar = useMemo(() => {
        return state[FormField.FAMILIARES_CLIENTE].value.find(renda => {
            return renda.descricao === FONTES_RENDA.OUTRO_FAMILIAR;
        }) || { descricao: FONTES_RENDA.OUTRO_FAMILIAR, valor_bruto: 0, valor_liquido: 0, checked: false, id: FONTES_RENDA.OUTRO_FAMILIAR };
    }, [state[FormField.FAMILIARES_CLIENTE].value]);

    const aposentadoria_vb_input_ref = useRef<HTMLDivElement>(null)
    const aposentadoria_vl_input_ref = useRef<HTMLDivElement>(null)
    const salario_vb_input_ref = useRef<HTMLDivElement>(null)
    const salario_vl_input_ref = useRef<HTMLDivElement>(null)
    const alugueis_vb_input_ref = useRef<HTMLDivElement>(null)
    const alugueis_vl_input_ref = useRef<HTMLDivElement>(null)
    const outras_rendas_vb_input_ref = useRef<HTMLDivElement>(null)
    const outras_rendas_vl_input_ref = useRef<HTMLDivElement>(null)
    const conjuge_vb_input_ref = useRef<HTMLDivElement>(null)
    const conjuge_vl_input_ref = useRef<HTMLDivElement>(null)
    const outro_familiar_vb_input_ref = useRef<HTMLDivElement>(null)
    const outro_familiar_vl_input_ref = useRef<HTMLDivElement>(null)

    const [nao_possui_familiar_checkbox_checked, setNaoPossuiFamiliarCheckboxChecked] = useState<boolean>(!conjuge.checked && !outro_familiar.checked)

    useEffect(() => {
        setNaoPossuiFamiliarCheckboxChecked(!conjuge.checked && !outro_familiar.checked)
    }, [state[FormField.FAMILIARES_CLIENTE]])

    useEffect(() => {
        validateStep()
        if (stepsError.step4.show) checkErrors()
    }, [stepsError.step4])

    const handleNextClick = () => {
        validateStep()

        if (formHasChanged) submitForm();
        goToNextStep();
    };

    const handleBackClick = () => {
        validateStep()

        if (formHasChanged) submitForm();
        goToPreviousStep();
    };

    const goToNextStep = () => {
        router.push(`${pathname}?step=5`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=3`);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='4' titulo={PASSOS.step4.titulo} />
            <FormSectionTitle sectionTitle='Fontes de renda do cliente*' />

            <FormControl fullWidth error={error.fontes_renda_cliente}>
                <FormGroup sx={{ px: 2.5 }}>
                    {/* APOSENTADORIA */}
                    <Grid container spacing={1} sx={{ pt: 0, pr: 2, boxShadow: 3, borderRadius: 1, alignItems: 'center', p: 2 }}>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel checked={aposentadoria.checked} onChange={handleCheckboxToogle} name={FormField.FONTES_DE_RENDA_CLIENTE} value={FONTES_RENDA.APOSENTADORIA} control={<CheckBox />} label="Aposentadoria" />
                        </Grid>
                        <GridCurrencyInput
                            xs={12} sm={4}
                            label={'Valor Bruto'}
                            name={`VB${FONTES_RENDA.APOSENTADORIA}`}
                            defaultValue={aposentadoria.valor_bruto}
                            ref={aposentadoria_vb_input_ref}
                            onBlur={() => handleChangeValorBruto(FormField.FONTES_DE_RENDA_CLIENTE, FONTES_RENDA.APOSENTADORIA, getGridCurrencyInputValue(aposentadoria_vb_input_ref, `VB${FONTES_RENDA.APOSENTADORIA}`))}
                            variant='standard'
                        />
                        <GridCurrencyInput
                            xs={12} sm={4}
                            label='Valor Líquido'
                            name={`VL${FONTES_RENDA.APOSENTADORIA}`}
                            defaultValue={aposentadoria.valor_liquido}
                            ref={aposentadoria_vl_input_ref}
                            onBlur={() => handleChangeValorLiquido(FormField.FONTES_DE_RENDA_CLIENTE, FONTES_RENDA.APOSENTADORIA, getGridCurrencyInputValue(aposentadoria_vl_input_ref, `VL${FONTES_RENDA.APOSENTADORIA}`))}
                            variant='standard'
                        />
                    </Grid>

                    {/* SALARIO */}
                    <Grid container spacing={1} sx={{ mt: 2, pr: 2, boxShadow: 3, borderRadius: 1, alignItems: 'center', p: 2 }}>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel checked={salario.checked} onChange={handleCheckboxToogle} name={FormField.FONTES_DE_RENDA_CLIENTE} value={FONTES_RENDA.SALARIO} control={<CheckBox />} label="Salário" />
                        </Grid>
                        <GridCurrencyInput
                            xs={12} sm={4}
                            label='Valor Bruto'
                            name={`VB${FONTES_RENDA.SALARIO}`}
                            defaultValue={salario.valor_bruto}
                            ref={salario_vb_input_ref}
                            onBlur={() => handleChangeValorBruto(FormField.FONTES_DE_RENDA_CLIENTE, FONTES_RENDA.SALARIO, getGridCurrencyInputValue(salario_vb_input_ref, `VB${FONTES_RENDA.SALARIO}`))}
                            variant='standard'

                        />
                        <GridCurrencyInput
                            xs={12} sm={4}
                            label='Valor Líquido'
                            name={`VL${FONTES_RENDA.SALARIO}`}
                            defaultValue={salario.valor_liquido}
                            ref={salario_vl_input_ref}
                            onBlur={() => handleChangeValorLiquido(FormField.FONTES_DE_RENDA_CLIENTE, FONTES_RENDA.SALARIO, getGridCurrencyInputValue(salario_vl_input_ref, `VL${FONTES_RENDA.SALARIO}`))}
                            variant='standard'

                        />
                    </Grid>

                    {/* ALUGUEIS */}
                    <Grid container spacing={1} sx={{ mt: 2, pr: 2, boxShadow: 3, borderRadius: 1, alignItems: 'center', p: 2 }}>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel checked={alugueis.checked} onChange={handleCheckboxToogle} name={FormField.FONTES_DE_RENDA_CLIENTE} value={FONTES_RENDA.ALUGUEIS} control={<CheckBox />} label="Aluguéis" />
                        </Grid>
                        <GridCurrencyInput
                            xs={12} sm={4}
                            label='Valor Bruto'
                            name={`VB${FONTES_RENDA.ALUGUEIS}`}
                            defaultValue={alugueis.valor_bruto}
                            ref={alugueis_vb_input_ref}
                            onBlur={() => handleChangeValorBruto(FormField.FONTES_DE_RENDA_CLIENTE, FONTES_RENDA.ALUGUEIS, getGridCurrencyInputValue(alugueis_vb_input_ref, `VB${FONTES_RENDA.ALUGUEIS}`))}
                            variant='standard'

                        />
                        <GridCurrencyInput
                            xs={12} sm={4}
                            label='Valor Líquido'
                            name={`VL${FONTES_RENDA.ALUGUEIS}`}
                            defaultValue={alugueis.valor_liquido}
                            ref={alugueis_vl_input_ref}
                            onBlur={() => handleChangeValorLiquido(FormField.FONTES_DE_RENDA_CLIENTE, FONTES_RENDA.ALUGUEIS, getGridCurrencyInputValue(alugueis_vl_input_ref, `VL${FONTES_RENDA.ALUGUEIS}`))}
                            variant='standard'
                        />
                    </Grid>

                    {/* OUTROS */}
                    <Grid container spacing={1} sx={{ mt: 2, pr: 2, boxShadow: 3, borderRadius: 1, alignItems: 'center', p: 2 }}>
                        <Grid item xs={12} sm={4} sx={{ position: 'relative', top: 10 }}>
                            <FormControlLabel onChange={handleCheckboxToogle} checked={outras_rendas.checked} name={FormField.FONTES_DE_RENDA_CLIENTE} value={FONTES_RENDA.OUTROS} control={<CheckBox />} label="Outros" />
                            <TextField
                                fullWidth
                                multiline
                                onChange={handleOutrasRendasDescricaoChange}
                                value={outras_rendas.descricao}
                                variant='standard'
                                sx={{
                                    visibility: outras_rendas.checked ? 'visible' : 'hidden',
                                    position: 'relative', bottom: 18
                                }}
                            />
                        </Grid>
                        <GridCurrencyInput
                            xs={12} sm={4}
                            label='Valor Bruto'
                            name={`VB${FONTES_RENDA.OUTROS}`}
                            defaultValue={outras_rendas.valor_bruto}
                            ref={outras_rendas_vb_input_ref}
                            onBlur={() => handleChangeValorBruto(FormField.FONTES_DE_RENDA_CLIENTE, FONTES_RENDA.OUTROS, getGridCurrencyInputValue(outras_rendas_vb_input_ref, `VB${FONTES_RENDA.OUTROS}`))}
                            variant='standard'

                        />
                        <GridCurrencyInput
                            xs={12} sm={4}
                            label='Valor Líquido'
                            name={`VL${FONTES_RENDA.OUTROS}`}
                            defaultValue={outras_rendas.valor_liquido}
                            ref={outras_rendas_vl_input_ref}
                            onBlur={() => handleChangeValorLiquido(FormField.FONTES_DE_RENDA_CLIENTE, FONTES_RENDA.OUTROS, getGridCurrencyInputValue(outras_rendas_vl_input_ref, `VL${FONTES_RENDA.OUTROS}`))}
                            variant='standard'

                        />
                    </Grid>
                </FormGroup>
                <FormHelperText>{error.fontes_renda_cliente ? 'Por favor, selecione a(s) fonte(s) de renda' : ' '}</FormHelperText>
            </FormControl>

            <FormSectionTitle sectionTitle='O autor possui familiares que moram em sua residência e contribuem financeiramente com o sustento da família?' />

            <FormGroup sx={{ px: 2 }}>
                {/* CÔNJUGE */}
                <Grid container spacing={1} sx={{ mt: 2, pr: 2, boxShadow: 3, borderRadius: 1, alignItems: 'center', p: 2 }}>
                    <Grid item xs={12} sm={4}>
                        <FormControlLabel checked={conjuge.checked} onChange={handleCheckboxToogle} name={FormField.FAMILIARES_CLIENTE} value={FONTES_RENDA.CONJUGE} control={<CheckBox />} label="Cônjuge" />
                    </Grid>
                    <GridCurrencyInput
                        xs={12} sm={4}
                        label='Valor Bruto'
                        sx={{ visibility: conjuge.checked ? 'visible' : 'hidden' }}
                        name={`VB${FONTES_RENDA.CONJUGE}`}
                        defaultValue={conjuge.valor_bruto}
                        ref={conjuge_vb_input_ref}
                        onBlur={() => handleChangeValorBruto(FormField.FAMILIARES_CLIENTE, FONTES_RENDA.CONJUGE, getGridCurrencyInputValue(conjuge_vb_input_ref, `VB${FONTES_RENDA.CONJUGE}`))}
                        variant='standard'
                    />
                    <GridCurrencyInput
                        xs={12} sm={4}
                        label='Valor Líquido'
                        sx={{ visibility: conjuge.checked ? 'visible' : 'hidden' }}
                        name={`VL${FONTES_RENDA.CONJUGE}`}
                        defaultValue={conjuge.valor_liquido}
                        ref={conjuge_vl_input_ref}
                        onBlur={() => handleChangeValorLiquido(FormField.FAMILIARES_CLIENTE, FONTES_RENDA.CONJUGE, getGridCurrencyInputValue(conjuge_vl_input_ref, `VL${FONTES_RENDA.CONJUGE}`))}
                        variant='standard'
                    />
                </Grid>

                {/* OUTRO FAMILIAR */}
                <Grid container spacing={1} sx={{ mt: 2, pr: 2, boxShadow: 3, borderRadius: 1, alignItems: 'center', p: 2 }}>
                    <Grid item xs={12} sm={4}>
                        <FormControlLabel checked={outro_familiar.checked} onChange={handleCheckboxToogle} name={FormField.FAMILIARES_CLIENTE} value={FONTES_RENDA.OUTRO_FAMILIAR} control={<CheckBox />} label="Outro Familiar" />
                    </Grid>
                    <GridCurrencyInput
                        xs={12} sm={4}
                        label='Valor Bruto'
                        sx={{ visibility: outro_familiar.checked ? 'visible' : 'hidden' }}
                        name={`VB${FONTES_RENDA.OUTRO_FAMILIAR}`}
                        defaultValue={outro_familiar.valor_bruto}
                        ref={outro_familiar_vb_input_ref}
                        onBlur={() => handleChangeValorBruto(FormField.FAMILIARES_CLIENTE, FONTES_RENDA.OUTRO_FAMILIAR, getGridCurrencyInputValue(outro_familiar_vb_input_ref, `VB${FONTES_RENDA.OUTRO_FAMILIAR}`))}
                        variant='standard'
                    />
                    <GridCurrencyInput
                        xs={12} sm={4}
                        label='Valor Líquido'
                        sx={{ visibility: outro_familiar.checked ? 'visible' : 'hidden' }}
                        name={`VL${FONTES_RENDA.OUTRO_FAMILIAR}`}
                        defaultValue={outro_familiar.valor_liquido}
                        ref={outro_familiar_vl_input_ref}
                        onBlur={() => handleChangeValorLiquido(FormField.FAMILIARES_CLIENTE, FONTES_RENDA.OUTRO_FAMILIAR, getGridCurrencyInputValue(outro_familiar_vl_input_ref, `VL${FONTES_RENDA.OUTRO_FAMILIAR}`))}
                        variant='standard'
                    />
                </Grid>

                {/* NÃO POSSUI FAMILIAR NESTA CONDIÇÃO */}
                <Grid container spacing={1} sx={{ mt: 2, pr: 2, boxShadow: 3, borderRadius: 1, alignItems: 'center', p: 2 }}>
                    <FormControlLabel checked={nao_possui_familiar_checkbox_checked} onChange={handleNaoPossuiFamiliarCheckboxToogle} name={FormField.FAMILIARES_CLIENTE} value={FONTES_RENDA.OUTRO_FAMILIAR} control={<CheckBox />} label="Não possui" />
                </Grid>
            </FormGroup>


            <FormButtons
                type='back-next'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handleCheckboxToogle(e: any) {
        const { name, value } = e.target
        const fonte_renda = getFonteRendaCliente(value)
        fonte_renda.checked = !fonte_renda.checked

        setFormHasChanged(true)

        dispatch({
            type: 'CHECKBOX_TOOGLE',
            field: name as keyof FormState,
            value: fonte_renda
        })
    }

    function handleNaoPossuiFamiliarCheckboxToogle(e: any) {
        setNaoPossuiFamiliarCheckboxChecked(prev => {
            const is_nao_possui_familiar_checked = true
            conjuge.checked = false
            outro_familiar.checked = false

            return is_nao_possui_familiar_checked
        })

        setFormHasChanged(true)

        dispatch({
            type: 'NAO_POSSUI_FAMILIAR_CHECKBOX_TOOGLE',
            field: FormField.FAMILIARES_CLIENTE,
            value: true
        })
    }

    function handleOutrasRendasDescricaoChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const descricao = e.target.value
        const outras_rendas_nova = { ...outras_rendas, descricao }

        setFormHasChanged(true)

        dispatch({
            type: 'OUTRA_FONTE_RENDA_DESCRICAO_CHANGE',
            field: FormField.FONTES_DE_RENDA_CLIENTE,
            value: outras_rendas_nova
        })
    }

    function handleChangeValorBruto(fieldname: keyof FormState, id_fonte_renda: string, valor: number) {
        const fonte_renda = getFonteRendaCliente(id_fonte_renda)
        fonte_renda.valor_bruto = valor

        setFormHasChanged(true)

        dispatch({
            type: 'MONEY_VALUE_CHANGE',
            field: fieldname,
            value: fonte_renda
        })
    }

    function handleChangeValorLiquido(fieldname: keyof FormState, id_fonte_renda: string, valor: number) {
        const fonte_renda = getFonteRendaCliente(id_fonte_renda)
        fonte_renda.valor_liquido = valor

        setFormHasChanged(true)

        dispatch({
            type: 'MONEY_VALUE_CHANGE',
            field: fieldname,
            value: fonte_renda
        })
    }

    function getFonteRendaCliente(id_fonte_renda: string): FonteRendaCheckbox {
        switch (id_fonte_renda) {
            case FONTES_RENDA.APOSENTADORIA:
                return aposentadoria
            case FONTES_RENDA.SALARIO:
                return salario
            case FONTES_RENDA.ALUGUEIS:
                return alugueis
            case FONTES_RENDA.CONJUGE:
                return conjuge
            case FONTES_RENDA.OUTRO_FAMILIAR:
                return outro_familiar
            default:
                return outras_rendas
        }
    }

    async function submitForm() {
        const etapa = PASSOS.step4.etapa
        const formChangedAndCheckedValues = getFormChangedValues(state)
        let data: { etapa: string, [FormField.FONTES_DE_RENDA_CLIENTE]: FonteRendaCheckbox[] | undefined, [FormField.FAMILIARES_CLIENTE]: FonteRendaCheckbox[] | undefined } = { etapa, ...formChangedAndCheckedValues as any }
        if (data[FormField.FONTES_DE_RENDA_CLIENTE]) data = { ...data, [FormField.FONTES_DE_RENDA_CLIENTE]: removeZerovalues(data[FormField.FONTES_DE_RENDA_CLIENTE]) }
        if (data[FormField.FAMILIARES_CLIENTE]) data = { ...data, [FormField.FAMILIARES_CLIENTE]: removeZerovalues(data[FormField.FAMILIARES_CLIENTE]) }

        try {
            const response = await updateSuperendividamentoTicket(ticketId, data)

        } catch (error) {

        }
    }

    function removeZerovalues(data: FonteRendaCheckbox[]) {
        return data.filter(d => d.valor_bruto != 0 && d.valor_liquido != 0)
    }

    function getErrorInitialState(): ErrorStep4 {
        const erros: ErrorStep4 = {
            fontes_renda_cliente: false,
            familiares_cliente: false
        }

        return erros
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state[FormField.FONTES_DE_RENDA_CLIENTE].value.filter(f => f.checked))
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.FONTES_DE_RENDA_CLIENTE].value.filter(f => f.checked))) setError(prev => { return { ...prev, fontes_renda_cliente: true } })
        else setError(prev => { return { ...prev, fontes_renda_cliente: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step4: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step4: { error: false, show: false } } })
    }
}