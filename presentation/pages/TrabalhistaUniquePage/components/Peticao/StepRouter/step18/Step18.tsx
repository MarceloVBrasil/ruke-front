
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
import GridTextField from '@/presentation/components/GridTextField';
import { ErrorStep18, FormField, fundamento, FUNDAMENTO_VALUE, PEDIDO_AVISO_PREVIO } from './helper/FormTypesAndFields';
import { fundamentos_options } from './helper/fundamentosOptions';
import PagamentoMenor from './components/PagamentoMenor';
import TrabalhadoPeriodoSuperior from './components/TrabalhadoPeriodoSuperior';
import AusenciaPagamento from './components/AusenciaPagamento';
import TrabalhadoSemReducaoJornadaOuDispensa from './components/TrabalhadoSemReducaoJornadaOuDispensa';
import { isFieldEmpty, isPositive, someTruthyValue } from '@/app/utils/validators';
import { AUSENCIA_PAGAMENTO } from './helper/AusenciaPagamento/types';
import { PAGAMENTO_A_MENOR } from './helper/PagamentoMenor/types';
import { TRABALHADO_PERIODO_SUPERIOR_30_DIAS } from './helper/TrabalhadoPeriodoSuperior/types';
import { TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS } from './helper/TrabalhadoSemReducaoJornadaOuDispensa/types';
import "../../../../css/AvisoPrevio.css"


export default function Step18({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 18

    const [error, setError] = useState<ErrorStep18>(getErrorsInitialState())

    useEffect(() => {
        validateStep()
        if (stepsError.step18.show) checkErrors()
    }, [stepsError.step18])

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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step18.titulo} />

            <Grid container spacing={1} sx={{ pl: 2, pr: 2 }}>
                <GridTextField
                    xs={12}
                    fullWidth
                    type='date'
                    label='Qual foi a data de dispensa sem justa causa?'
                    variant='outlined'
                    name={PEDIDO_AVISO_PREVIO.DATA_DISPENSA_SEM_JUSTA_CAUSA}
                    value={state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.DATA_DISPENSA_SEM_JUSTA_CAUSA] as string}
                    onChange={handleDataDispensaChange}
                    error={error.demais_campos.data_dispensa_sem_justa_causa}
                    helperText={error.demais_campos.data_dispensa_sem_justa_causa ? 'Campo obrigatório' : ' '}
                />

                <GridTextField
                    xs={12}
                    fullWidth
                    type='number'
                    label='Quantos dias de aviso prévio eram devidos ao reclamante, levando em consideração a proporcionalidade?'
                    variant='outlined'
                    name={PEDIDO_AVISO_PREVIO.QUANTIDADE_DIAS_AVISO_PREVIO_DEVIDOS}
                    defaultValue={state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.QUANTIDADE_DIAS_AVISO_PREVIO_DEVIDOS] as number}
                    onBlur={handleQauntidadeDiasAvisoPrevioDevidosChange}
                    error={error.demais_campos.quantidade_dias_aviso_previo}
                    helperText={error.demais_campos.quantidade_dias_aviso_previo ? 'Campo obrigatório' : ' '}
                />

                <GridRadioGroup
                    xs={12}
                    sectionTitle='Qual é o fundamento relacionado ao aviso prévio?'
                    options={fundamentos_options}
                    name={PEDIDO_AVISO_PREVIO.FUNDAMENTO}
                    value={state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO] as string}
                    onChange={handleFundamentoChange}
                    error={error.demais_campos.fundamento}
                    helperText={error.demais_campos.fundamento ? 'Campo obrigatório' : ' '}
                    pl={1}
                    className='fundamento'
                />

                <PagamentoMenor
                    pagamantoMenor={state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR]}
                    show={state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO] == FUNDAMENTO_VALUE.PAGAMENTO_A_MENOR}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.pagamento_a_menor}
                />

                <TrabalhadoPeriodoSuperior
                    trabalhado_periodo_superior={state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS]}
                    show={state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO] == FUNDAMENTO_VALUE.TRABALHADO_PERIODO_SUPERIOR_30_DIAS}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.trabalhado_periodo_superior_30_dias}
                />

                <AusenciaPagamento
                    ausenciaPagamento={state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO]}
                    show={state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO] == FUNDAMENTO_VALUE.AUSENCIA_PAGAMENTO}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.ausencia_pagamento}
                />

                <TrabalhadoSemReducaoJornadaOuDispensa
                    trabalhado_reducao_jornada_ultimos_7_dias={state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS]}
                    show={state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO] == FUNDAMENTO_VALUE.TRABALHADO_SEM_REDUCAO_JORNADA_OU_DISPENSA}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.trabalhado_reducao_jornada_ultimos_7_dias}
                />
            </Grid>

            <FormButtons
                type={'back-next'}
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handleDataDispensaChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_DISPENSA_SEM_JUSTA_CAUSA',
            field: FormField.PEDIDO_AVISO_PREVIO,
            value
        })
    }

    function handleQauntidadeDiasAvisoPrevioDevidosChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_DIAS_AVISO_PREVIO',
            field: FormField.PEDIDO_AVISO_PREVIO,
            value: parseInt(value)
        })
    }

    function handleFundamentoChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_FUNDAMENTO',
            field: FormField.PEDIDO_AVISO_PREVIO,
            value: value as fundamento
        })
    }

    function getFundamento() {
        return state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO]
    }

    async function submitForm() {
        const etapa = PASSOS.step18.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }

        if (getFundamento() === FUNDAMENTO_VALUE.AUSENCIA_PAGAMENTO) {
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR] = null;
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS] = null;
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS] = null;
        }

        else if (getFundamento() === FUNDAMENTO_VALUE.PAGAMENTO_A_MENOR) {
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO] = null;
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS] = null;
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS] = null;
        }

        else if (getFundamento() === FUNDAMENTO_VALUE.TRABALHADO_PERIODO_SUPERIOR_30_DIAS) {
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO] = null;
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR] = null;
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS] = null;
        }

        else if (getFundamento() === FUNDAMENTO_VALUE.TRABALHADO_SEM_REDUCAO_JORNADA_OU_DISPENSA) {
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO] = null;
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR] = null;
            (data[FormField.PEDIDO_AVISO_PREVIO] as any)[PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS] = null;
        }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    function getErrorsInitialState(): ErrorStep18 {
        const erros: ErrorStep18 = {
            ausencia_pagamento: {
                valor_estimado: false,
                quantidade_dias_deveriam_ser_pagos: false
            },
            demais_campos: {
                fundamento: false,
                data_dispensa_sem_justa_causa: false,
                quantidade_dias_aviso_previo: false
            },
            pagamento_a_menor: {
                valor_estimado: false,
                quantidade_dias_faltaram_ser_pagos: false
            },
            trabalhado_periodo_superior_30_dias: {
                valor_estimado: false,
                quantidade_dias_faltaram_ser_pagos: false,
                quantidade_dias_efetivamente_pagos: false
            },
            trabalhado_reducao_jornada_ultimos_7_dias: {
                valor_estimado: false,
                data_projecao_termino: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep18 = {
            ausencia_pagamento: {
                valor_estimado: false,
                quantidade_dias_deveriam_ser_pagos: false
            },
            demais_campos: {
                fundamento: false,
                data_dispensa_sem_justa_causa: false,
                quantidade_dias_aviso_previo: false
            },
            pagamento_a_menor: {
                valor_estimado: false,
                quantidade_dias_faltaram_ser_pagos: false
            },
            trabalhado_periodo_superior_30_dias: {
                valor_estimado: false,
                quantidade_dias_faltaram_ser_pagos: false,
                quantidade_dias_efetivamente_pagos: false
            },
            trabalhado_reducao_jornada_ultimos_7_dias: {
                valor_estimado: false,
                data_projecao_termino: false
            }
        }

        const fundamento = getFundamento()

        const demais_campos = state[FormField.PEDIDO_AVISO_PREVIO].value
        const ausencia_pagamento = state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO]
        const pagamento_a_menor = state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR]
        const trabalhado_periodo_superior_30_dias = state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS]
        const trabalhado_reducao_ultimos_7_dias = state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS]

        if (demais_campos || true) {
            erros.demais_campos.fundamento =
                isFieldEmpty(demais_campos?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO] as fundamento)
            erros.demais_campos.data_dispensa_sem_justa_causa =
                isFieldEmpty(demais_campos?.[PEDIDO_AVISO_PREVIO.DATA_DISPENSA_SEM_JUSTA_CAUSA] as string)
            erros.demais_campos.quantidade_dias_aviso_previo =
                !isPositive(demais_campos?.[PEDIDO_AVISO_PREVIO.QUANTIDADE_DIAS_AVISO_PREVIO_DEVIDOS] as number)
        }

        if (fundamento === FUNDAMENTO_VALUE.AUSENCIA_PAGAMENTO) {
            erros.ausencia_pagamento.valor_estimado =
                !isPositive(ausencia_pagamento?.[AUSENCIA_PAGAMENTO.VALOR_ESTIMADO] as number)
            erros.ausencia_pagamento.quantidade_dias_deveriam_ser_pagos =
                !isPositive(ausencia_pagamento?.[AUSENCIA_PAGAMENTO.QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS] as number)
        }

        else if (fundamento === FUNDAMENTO_VALUE.PAGAMENTO_A_MENOR) {
            erros.pagamento_a_menor.valor_estimado =
                !isPositive(pagamento_a_menor?.[PAGAMENTO_A_MENOR.VALOR_ESTIMADO] as number)
            erros.pagamento_a_menor.quantidade_dias_faltaram_ser_pagos =
                !isPositive(pagamento_a_menor?.[PAGAMENTO_A_MENOR.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS] as number)
        }

        else if (fundamento === FUNDAMENTO_VALUE.TRABALHADO_PERIODO_SUPERIOR_30_DIAS) {
            erros.trabalhado_periodo_superior_30_dias.valor_estimado =
                !isPositive(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.VALOR_ESTIMADO] as number)
            erros.trabalhado_periodo_superior_30_dias.quantidade_dias_faltaram_ser_pagos =
                !isPositive(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS] as number)
            erros.trabalhado_periodo_superior_30_dias.quantidade_dias_efetivamente_pagos =
                !isPositive(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS] as number)
        }

        else if (fundamento === FUNDAMENTO_VALUE.TRABALHADO_SEM_REDUCAO_JORNADA_OU_DISPENSA) {
            erros.trabalhado_reducao_jornada_ultimos_7_dias.valor_estimado =
                !isPositive(trabalhado_reducao_ultimos_7_dias?.[TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.VALOR_ESTIMADO] as number)
            erros.trabalhado_reducao_jornada_ultimos_7_dias.data_projecao_termino =
                isFieldEmpty(trabalhado_reducao_ultimos_7_dias?.[TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.DATA_PROJECAO_TERMINO] as string)
        }

        return (
            false
            || someTruthyValue(erros.ausencia_pagamento)
            || someTruthyValue(erros.demais_campos)
            || someTruthyValue(erros.pagamento_a_menor)
            || someTruthyValue(erros.trabalhado_periodo_superior_30_dias)
            || someTruthyValue(erros.trabalhado_reducao_jornada_ultimos_7_dias)
        )
    }

    function checkErrors() {
        const fundamento = getFundamento()

        const demais_campos = state[FormField.PEDIDO_AVISO_PREVIO].value
        const ausencia_pagamento = state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO]
        const pagamento_a_menor = state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR]
        const trabalhado_periodo_superior_30_dias = state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS]
        const trabalhado_reducao_ultimos_7_dias = state[FormField.PEDIDO_AVISO_PREVIO].value?.[PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS]

        if (demais_campos || true) {
            if (isFieldEmpty(demais_campos?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, fundamento: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, fundamento: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_AVISO_PREVIO.DATA_DISPENSA_SEM_JUSTA_CAUSA] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_dispensa_sem_justa_causa: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_dispensa_sem_justa_causa: false } } })

            if (!isPositive(demais_campos?.[PEDIDO_AVISO_PREVIO.QUANTIDADE_DIAS_AVISO_PREVIO_DEVIDOS] as number)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, quantidade_dias_aviso_previo: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, quantidade_dias_aviso_previo: false } } })
        }

        if (fundamento === FUNDAMENTO_VALUE.AUSENCIA_PAGAMENTO) {
            if (!isPositive(ausencia_pagamento?.[AUSENCIA_PAGAMENTO.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, ausencia_pagamento: { ...prev.ausencia_pagamento, valor_estimado: true } } })
            else setError(prev => { return { ...prev, ausencia_pagamento: { ...prev.ausencia_pagamento, valor_estimado: false } } })

            if (!isPositive(ausencia_pagamento?.[AUSENCIA_PAGAMENTO.QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS] as number)) setError(prev => { return { ...prev, ausencia_pagamento: { ...prev.ausencia_pagamento, quantidade_dias_deveriam_ser_pagos: true } } })
            else setError(prev => { return { ...prev, ausencia_pagamento: { ...prev.ausencia_pagamento, quantidade_dias_deveriam_ser_pagos: false } } })
        }

        else if (fundamento === FUNDAMENTO_VALUE.PAGAMENTO_A_MENOR) {
            if (!isPositive(pagamento_a_menor?.[PAGAMENTO_A_MENOR.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, pagamento_a_menor: { ...prev.pagamento_a_menor, valor_estimado: true } } })
            else setError(prev => { return { ...prev, pagamento_a_menor: { ...prev.pagamento_a_menor, valor_estimado: false } } })

            if (!isPositive(pagamento_a_menor?.[PAGAMENTO_A_MENOR.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS] as number)) setError(prev => { return { ...prev, pagamento_a_menor: { ...prev.pagamento_a_menor, quantidade_dias_faltaram_ser_pagos: true } } })
            else setError(prev => { return { ...prev, pagamento_a_menor: { ...prev.pagamento_a_menor, quantidade_dias_faltaram_ser_pagos: false } } })
        }

        else if (fundamento === FUNDAMENTO_VALUE.TRABALHADO_PERIODO_SUPERIOR_30_DIAS) {
            if (!isPositive(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, trabalhado_periodo_superior_30_dias: { ...prev.trabalhado_periodo_superior_30_dias, valor_estimado: true } } })
            else setError(prev => { return { ...prev, trabalhado_periodo_superior_30_dias: { ...prev.trabalhado_periodo_superior_30_dias, valor_estimado: false } } })

            if (!isPositive(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS] as number)) setError(prev => { return { ...prev, trabalhado_periodo_superior_30_dias: { ...prev.trabalhado_periodo_superior_30_dias, quantidade_dias_faltaram_ser_pagos: true } } })
            else setError(prev => { return { ...prev, trabalhado_periodo_superior_30_dias: { ...prev.trabalhado_periodo_superior_30_dias, quantidade_dias_faltaram_ser_pagos: false } } })

            if (!isPositive(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS] as number)) setError(prev => { return { ...prev, trabalhado_periodo_superior_30_dias: { ...prev.trabalhado_periodo_superior_30_dias, quantidade_dias_efetivamente_pagos: true } } })
            else setError(prev => { return { ...prev, trabalhado_periodo_superior_30_dias: { ...prev.trabalhado_periodo_superior_30_dias, quantidade_dias_efetivamente_pagos: false } } })
        }

        else if (fundamento === FUNDAMENTO_VALUE.TRABALHADO_SEM_REDUCAO_JORNADA_OU_DISPENSA) {
            if (!isPositive(trabalhado_reducao_ultimos_7_dias?.[TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, trabalhado_reducao_jornada_ultimos_7_dias: { ...prev.trabalhado_reducao_jornada_ultimos_7_dias, valor_estimado: true } } })
            else setError(prev => { return { ...prev, trabalhado_reducao_jornada_ultimos_7_dias: { ...prev.trabalhado_reducao_jornada_ultimos_7_dias, valor_estimado: false } } })

            if (isFieldEmpty(trabalhado_reducao_ultimos_7_dias?.[TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.DATA_PROJECAO_TERMINO] as string)) setError(prev => { return { ...prev, trabalhado_reducao_jornada_ultimos_7_dias: { ...prev.trabalhado_reducao_jornada_ultimos_7_dias, data_projecao_termino: true } } })
            else setError(prev => { return { ...prev, trabalhado_reducao_jornada_ultimos_7_dias: { ...prev.trabalhado_reducao_jornada_ultimos_7_dias, data_projecao_termino: false } } })
        }
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step18: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step18: { error: false, show: false } } })
    }
}
