"use client";

import { Grid, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PASSOS } from '../helper/passos';
import { calcularTotalCausaTrabalhista, gerarPeticaoTrabalhista, updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { formReducer, getErrorInitialState, getStateFromApi } from './helper/ReducerFunctions';
import { FormField, FormState } from './helper/FormTypesAndFields';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import { isFieldEmpty, isPositive } from '@/app/utils/validators';
import GridTextField from '@/presentation/components/GridTextField';
import FormButtons from '@/presentation/components/FormButtons';
import { IPedidos, IStep, IStepError } from '../StepRouter';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import { getLastPedidoStep, getPedidosStep } from '../helper/pedidos';
import { advogado_assinante } from '@/app/types/advogados_assinantes';
import { showError } from './helper/Swal';

export default function Step22({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const router = useRouter();
    const pathname = usePathname();
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)

    const [state, dispatch] = useReducer(formReducer, getStateFromApi(api_data));
    const [gerandoPeticao, setGerandoPeticao] = useState(false)
    const [formHasChanged, setFormHasChanged] = useState(false)
    const [valorTotalCausaRetrieved, setValorTotalCausaRetrieved] = useState(false)

    const [error, setError] = useState(getErrorInitialState())

    const valorInputRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const calcularValorTotalCausa = async () => {
            try {
                const response = await calcularTotalCausaTrabalhista(ticketId, api_data)
                const valor = response.resultado
                handleRetrieveValorTotalCausaFromApi(valor)

            } catch (error) {
            }
            setValorTotalCausaRetrieved(true)
        }
        calcularValorTotalCausa()
    }, [])

    useEffect(() => {
        validateStep()
        if (stepsError.step22.show) checkErrors()
    }, [stepsError.step22])

    useEffect(() => {
        checkErrors()
    }, [state[FormField.VALOR_TOTAL_CAUSA]])

    const handleNextClick = () => {
        const FINAL_STEP_KEY = 'step22'
        validateStep()
        if (Object.entries(stepsError).filter(([key, value]) => key != FINAL_STEP_KEY).some(([stepKey, stepErrorValue]: [string, IStepError]) => stepErrorValue.error) || isFormInvalid()) showErrorsInEveryStep()
        else gerarPeticao();
    };

    const handleBackClick = () => {
        validateStep()

        if (formHasChanged) salvarForm();
        goToPreviousStep();
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=${getLastPedidoStep(getPedidosStep(pedidos))}`);
    };

    return (
        <React.Fragment>
            <FormPageTitle passo='22' titulo={PASSOS.step22.titulo} />

            <Grid container spacing={6} rowSpacing={6} sx={{ px: 2 }}>

                {
                    valorTotalCausaRetrieved && <GridCurrencyInput
                        xs={12}
                        label='Valor total da causa'
                        variant='standard'
                        error={error.valor_total_causa}
                        helperText={error.valor_total_causa ? 'Valor total da causa é obrigatória' : ' '}
                        name={FormField.VALOR_TOTAL_CAUSA}
                        defaultValue={state[FormField.VALOR_TOTAL_CAUSA].value}
                        onBlur={() => handleMoneyValueChange(FormField.VALOR_TOTAL_CAUSA)}
                        ref={valorInputRef}
                    />
                }

                {
                    !valorTotalCausaRetrieved && <GridCurrencyInput
                        xs={12}
                        disabled
                        label='Valor total da causa'
                        variant='standard'
                        error={error.valor_total_causa}
                        helperText={error.valor_total_causa ? 'Valor total da causa é obrigatória' : ' '}
                        name={FormField.VALOR_TOTAL_CAUSA}
                        defaultValue={state[FormField.VALOR_TOTAL_CAUSA].value}
                        onBlur={() => handleMoneyValueChange(FormField.VALOR_TOTAL_CAUSA)}
                        ref={valorInputRef}
                    />
                }

                <GridTextField
                    xs={12} sm={6}
                    label='Advogado que receberá as intimações*'
                    variant='standard'
                    error={error.advogado}
                    helperText={error.advogado ? 'Advogado é obrigatório' : ' '}
                    fullWidth
                    name={FormField.ADVOGADO}
                    value={(state[FormField.ADVOGADO].value)}
                    onChange={handleChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    label='Número OAB*'
                    variant='standard'
                    error={error.oab_advogado}
                    helperText={error.oab_advogado ? 'Número da oab é obrigatório' : ' '}
                    fullWidth
                    name={FormField.OAB_ADVOGADO}
                    value={(state[FormField.OAB_ADVOGADO].value)}
                    onChange={handleChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    label='Local que aparecerá na petição*'
                    variant='standard'
                    error={error.local_peticao}
                    helperText={error.local_peticao ? 'Local que aparecerá na causa é obrigatório' : ' '}
                    fullWidth
                    name={FormField.LOCAL_PETICAO}
                    value={(state[FormField.LOCAL_PETICAO].value)}
                    onChange={handleChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    label='Data que aparecerá na petição*'
                    fullWidth
                    error={error.data_peticao}
                    helperText={error.data_peticao ? 'Data da petição é obrigatória' : ' '}
                    variant='standard'
                    type='date'
                    name={FormField.DATA_PETICAO}
                    value={state[FormField.DATA_PETICAO].value}
                    onChange={handleChange}
                />
            </Grid>


            <FormButtons
                type='back-finish'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
                loading={gerandoPeticao}
                disabled={gerandoPeticao}
            />

        </React.Fragment>
    );

    function handleMoneyValueChange(fieldname: keyof FormState) {
        const valor = getGridCurrencyInputValue(valorInputRef, fieldname)
        setFormHasChanged(true)

        dispatch({
            type: 'SET_MONEY_FIELD',
            field: FormField.VALOR_TOTAL_CAUSA,
            value: valor
        })
    }

    function handleRetrieveValorTotalCausaFromApi(valor: number) {
        dispatch({
            type: 'SET_MONEY_FIELD',
            field: FormField.VALOR_TOTAL_CAUSA,
            value: valor || 0
        })
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent) {
        const { name, value } = e.target;
        setFormHasChanged(true)
        dispatch({
            type: 'SET_FIELD',
            field: name as keyof FormState,
            value
        });
    }

    function handleAdicionarAssinante(assinante: advogado_assinante) {
        assinante.id = crypto.randomUUID()
        setFormHasChanged(true)
        dispatch({
            type: 'ADD_ASSINANTE',
            field: FormField.ASSINANTES,
            value: assinante
        })
    }

    async function salvarForm() {
        const etapa = PASSOS.step22.etapa;
        const formChangedValues = getFormChangedValues(state);
        const data = { etapa, ...formChangedValues };

        try {
            const updateResponse = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    async function gerarPeticao() {
        const etapa = PASSOS.step22.etapa;
        const formChangedValues = getFormChangedValues(state);
        const data = { etapa, ...formChangedValues };

        setGerandoPeticao(true)
        try {
            const updateResponse = await updateTrabalhistaTicket(ticketId, data)
            const postResponse = await gerarPeticaoTrabalhista(ticketId, updateResponse)
            setGerandoPeticao(false)
            if (!postResponse.error) router.push(`/trabalhista/${ticketId}?step=1`)
            else showError({ message: postResponse.message, cb: () => router.push(`/tenants/${api_data.tenant_id}`) })
        } catch (error) {

        }
    }

    function isFormInvalid(): boolean {

        return (
            isFieldEmpty(state[FormField.VALOR_TOTAL_CAUSA].value)
            || !isPositive(state[FormField.VALOR_TOTAL_CAUSA].value)
            || isFieldEmpty(state[FormField.ADVOGADO].value)
            || isFieldEmpty(state[FormField.LOCAL_PETICAO].value)
            || isFieldEmpty(state[FormField.DATA_PETICAO].value)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.VALOR_TOTAL_CAUSA].value) || !isPositive(state[FormField.VALOR_TOTAL_CAUSA].value)) setError(prev => { return { ...prev, valor_total_causa: true } })
        else setError(prev => { return { ...prev, valor_total_causa: false } })

        if (isFieldEmpty(state[FormField.ADVOGADO].value)) setError(prev => { return { ...prev, advogado: true } })
        else setError(prev => { return { ...prev, advogado: false } })

        if (isFieldEmpty(state[FormField.LOCAL_PETICAO].value)) setError(prev => { return { ...prev, local_peticao: true } })
        else setError(prev => { return { ...prev, local_peticao: false } })

        if (isFieldEmpty(state[FormField.DATA_PETICAO].value)) setError(prev => { return { ...prev, data_peticao: true } })
        else setError(prev => { return { ...prev, data_peticao: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step22: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step22: { error: false, show: false } } })
    }

    function showErrorsInEveryStep() {
        setStepsError(prev => { return { ...prev, step1: { ...prev.step1, show: true } } })
        setStepsError(prev => { return { ...prev, step2: { ...prev.step2, show: true } } })
        setStepsError(prev => { return { ...prev, step3: { ...prev.step3, show: true } } })
        setStepsError(prev => { return { ...prev, step4: { ...prev.step4, show: true } } })
        setStepsError(prev => { return { ...prev, step5: { ...prev.step5, show: true } } })

        setStepsError(prev => { return { ...prev, step6: { ...prev.step6, show: true } } })
        setStepsError(prev => { return { ...prev, step7: { ...prev.step7, show: true } } })
        setStepsError(prev => { return { ...prev, step8: { ...prev.step8, show: true } } })
        setStepsError(prev => { return { ...prev, step9: { ...prev.step9, show: true } } })
        setStepsError(prev => { return { ...prev, step10: { ...prev.step10, show: true } } })
        setStepsError(prev => { return { ...prev, step11: { ...prev.step11, show: true } } })
        setStepsError(prev => { return { ...prev, step12: { ...prev.step12, show: true } } })
        setStepsError(prev => { return { ...prev, step13: { ...prev.step13, show: true } } })
        setStepsError(prev => { return { ...prev, step14: { ...prev.step14, show: true } } })
        setStepsError(prev => { return { ...prev, step15: { ...prev.step15, show: true } } })
        setStepsError(prev => { return { ...prev, step16: { ...prev.step16, show: true } } })
        setStepsError(prev => { return { ...prev, step17: { ...prev.step17, show: true } } })
        setStepsError(prev => { return { ...prev, step18: { ...prev.step18, show: true } } })
        setStepsError(prev => { return { ...prev, step19: { ...prev.step19, show: true } } })
        setStepsError(prev => { return { ...prev, step20: { ...prev.step20, show: true } } })
        setStepsError(prev => { return { ...prev, step21: { ...prev.step21, show: true } } })

        setStepsError(prev => { return { ...prev, step22: { ...prev.step22, show: true } } })
    }
}
