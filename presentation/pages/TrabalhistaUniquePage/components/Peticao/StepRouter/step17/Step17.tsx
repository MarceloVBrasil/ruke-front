
"üse client"

import { Grid, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { PASSOS } from '../helper/passos';
import { updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import FormButtons from '@/presentation/components/FormButtons';
import { IPedidos, IStep } from '../StepRouter';
import { getPedidoNextStep, getPedidosStep, getPedidoPreviousStep, existeProximoPedido } from '../helper/pedidos';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import GridTextField from '@/presentation/components/GridTextField';
import { ErrorStep17, FormField, PEDIDO_GARANTIA_PROVISORIA_EMPREGO } from './helper/FormTypesAndFields';
import { isFieldEmpty, isPositive, someTruthyValue } from '@/app/utils/validators';
import "../../../../css/GarantiaProvisoriaEmprego.css"


export default function Step17({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 17

    const [error, setError] = useState<ErrorStep17>(getErrorsInitialState())
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        validateStep()
        if (stepsError.step17.show) checkErrors()
    }, [stepsError.step17])

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
        router.push(`${pathname}?step=${getPedidoNextStep(pedido_atual, getPedidosStep(pedidos))}`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=${getPedidoPreviousStep(pedido_atual, getPedidosStep(pedidos))}`);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step17.titulo} />

            <Grid container spacing={1} sx={{ pl: 2, pr: 2 }}>
                <GridTextField
                    xs={12}
                    fullWidth
                    name={PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RAZAO_ESTABILIDADE}
                    value={state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RAZAO_ESTABILIDADE] as string}
                    label='Qual a razão da estabilidade provisória (ex: gestação, acidente de trabalho, dirigente sindical)?'
                    onChange={handleRazaoEstabilidadeChange}
                    variant='filled'
                    error={error.demais_campos.razao_estabilidade}
                    helperText={error.demais_campos.razao_estabilidade ? 'Campo obrigatório' : ' '}
                />

                <GridTextField
                    xs={12}
                    fullWidth
                    type='date'
                    name={PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_INICIO}
                    value={state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_INICIO] as string}
                    label='Qual foi a data de início do período de estabilidade?'
                    onChange={handleDataInicioChange}
                    variant='filled'
                    error={error.demais_campos.data_inicio}
                    helperText={error.demais_campos.data_inicio ? 'Campo obrigatório' : ' '}
                />

                <GridRadioGroup
                    xs={12}
                    sectionTitle='O reclamante ainda está dentro do período de estabilidade?'
                    options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    name={PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RECLAMANTE_ESTA_PERIODO_ESTABILIDADE}
                    value={state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RECLAMANTE_ESTA_PERIODO_ESTABILIDADE] as boolean}
                    onChange={handlePeriodoEstabilidadeChange}
                    error={error.demais_campos.reclamante_esta_periodo_estabilidade}
                    helperText={error.demais_campos.reclamante_esta_periodo_estabilidade ? 'Campo obrigatório' : ' '}
                    pl={1}
                    className='reclamante_esta_periodo_estabilidade'
                />

                <GridTextField
                    xs={12}
                    fullWidth
                    type='date'
                    name={PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_TERMINO}
                    value={state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_TERMINO] as string}
                    label='Quando terminará o período de estabilidade?'
                    onChange={handleDataTerminoChange}
                    variant='filled'
                    containerStyle={{ display: state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RECLAMANTE_ESTA_PERIODO_ESTABILIDADE] === true ? 'block' : 'none' }}
                    error={error.demais_campos.data_termino}
                    helperText={error.demais_campos.data_termino ? 'Campo obrigatório' : ' '}
                />

                <GridTextField
                    xs={12}
                    fullWidth
                    type='date'
                    name={PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_TERMINO}
                    value={state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_TERMINO] as string}
                    label='Quando terminou o período de estabilidade?'
                    onChange={handleDataTerminoChange}
                    variant='filled'
                    containerStyle={{ display: state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RECLAMANTE_ESTA_PERIODO_ESTABILIDADE] === false ? 'block' : 'none' }}
                    error={error.demais_campos.data_termino}
                    helperText={error.demais_campos.data_termino ? 'Campo obrigatório' : ' '}
                />

                <GridCurrencyInput
                    xs={12}
                    ref={valorEstimadoPedidoRef}
                    onBlur={handleValorEstimadoPedidoChange}
                    name={PEDIDO_GARANTIA_PROVISORIA_EMPREGO.VALOR_ESTIMADO_PEDIDO}
                    defaultValue={state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.VALOR_ESTIMADO_PEDIDO] ?? 0}
                    label={'Qual o valor estimado pedido?'}
                    sx={{ marginTop: 3, ml: -0 }}
                    error={error.demais_campos.valor_estimado_pedido}
                    helperText={error.demais_campos.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
                    variant='filled'
                />
            </Grid>

            <FormButtons
                type={'back-next'}
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handleRazaoEstabilidadeChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            field: FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO,
            type: 'SET_RAZAO_ESTABILIDADE',
            value
        })
    }

    function handleDataInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            field: FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO,
            type: 'SET_DATA_INICIO',
            value
        })
    }

    function handleDataTerminoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            field: FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO,
            type: 'SET_DATA_TERMINO',
            value
        })
    }

    function handlePeriodoEstabilidadeChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            field: FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO,
            type: 'SET_RECLAMANTE_ESTA_PERIODO_ESTABILIDADE',
            value: value == 'true'
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, PEDIDO_GARANTIA_PROVISORIA_EMPREGO.VALOR_ESTIMADO_PEDIDO)
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step17.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    function getErrorsInitialState(): ErrorStep17 {
        const erros: ErrorStep17 = {
            demais_campos: {
                valor_estimado_pedido: false,
                data_inicio: false,
                reclamante_esta_periodo_estabilidade: false,
                data_termino: false,
                razao_estabilidade: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep17 = {
            demais_campos: {
                valor_estimado_pedido: false,
                data_inicio: false,
                reclamante_esta_periodo_estabilidade: false,
                data_termino: false,
                razao_estabilidade: false
            }
        }

        const demais_campos = state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value

        if (demais_campos || true) {
            erros.demais_campos.valor_estimado_pedido =
                !isPositive(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.VALOR_ESTIMADO_PEDIDO] as number)
            erros.demais_campos.data_inicio =
                isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_INICIO] as string)
            erros.demais_campos.data_termino =
                isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_TERMINO] as string)
            erros.demais_campos.reclamante_esta_periodo_estabilidade =
                isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RECLAMANTE_ESTA_PERIODO_ESTABILIDADE] as boolean)
            erros.demais_campos.razao_estabilidade =
                isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RAZAO_ESTABILIDADE] as string)
        }

        return (
            false
            || someTruthyValue(erros.demais_campos)
        )
    }

    function checkErrors() {
        const demais_campos = state[FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO].value

        if (demais_campos || true) {
            if (!isPositive(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_INICIO] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_inicio: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_inicio: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_TERMINO] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_termino: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_termino: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RECLAMANTE_ESTA_PERIODO_ESTABILIDADE] as boolean)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, reclamante_esta_periodo_estabilidade: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, reclamante_esta_periodo_estabilidade: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RAZAO_ESTABILIDADE] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, razao_estabilidade: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, razao_estabilidade: false } } })
        }

    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step17: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step17: { error: false, show: false } } })
    }
}
