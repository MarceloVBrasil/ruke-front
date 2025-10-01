
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
import { getPedidoNextStep, getPedidosStep, getPedidoPreviousStep } from '../helper/pedidos';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import { ErrorStep13, FormField, PEDIDO_FERIAS, situacao_ferias_reclamante, SITUACAO_FERIAS_RECLAMANTE_VALUE } from './helper/FormTypesAndFields';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import GridTextField from '@/presentation/components/GridTextField';
import { opcoes_situacao_ferias_reclamante } from './helper/situacao_ferias_reclamante_opcoes';
import FeriasNaoGozadas from './components/FeriasNaoGozadas';
import FeriasInterrompidasInjustamente from './components/FeriasInterrompidasInjustamente';
import PagamentoIntempestivo from './components/PagamentoIntempestivo';
import FeriasPagasNaoGozadas from './components/FeriasPagasNaoGozadas';
import AusenciaPagamento from './components/AusenciaPagamento';
import { isFieldEmpty, isPositive, someTruthyValue } from '@/app/utils/validators';
import { AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL } from './helper/AusenciaPagamentoTercoConstitucional/types';
import { PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE } from './helper/FeriasInterrompidasInjustamente/types';
import { PEDIDO_FERIAS_NAO_GOZADAS } from './helper/FeriasNaoGozadas/types';
import { FERIAS_PAGAS_NAO_GOZADAS } from './helper/FeriasPagasNaoGozadas/types';
import { PAGAMENTO_INTEMPESTIVO_FERIAS } from './helper/PagamentoIntempestivoFerias/types';
import { differenceInMonths } from 'date-fns';
import "../../../../css/Ferias.css"


export default function Step13({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 13

    const [error, setError] = useState<ErrorStep13>(getErrorsInitialState())

    useEffect(() => {
        validateStep()
        if (stepsError.step13.show) checkErrors()
    }, [stepsError.step13])


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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step13.titulo} />

            <Grid container spacing={1} sx={{ pl: 4, pr: 2 }}>

                <FormSectionTitle sectionTitle='Qual foi o período aquisitivo das férias?' style={{ width: '100%', paddingLeft: 0 }} />

                <GridTextField
                    xs={12}
                    sm={6}
                    variant='standard'
                    fullWidth
                    type='date'
                    label='Data de início'
                    name={PEDIDO_FERIAS.PERIODO_DATA_INICIO}
                    value={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.PERIODO_DATA_INICIO] as string}
                    onChange={handlePeriodoInicioChange}
                    error={error.demais_campos.data_inicial}
                    helperText={error.demais_campos.data_inicial ? 'Campo obrigatório' : ' '}
                />

                <GridTextField
                    xs={12}
                    sm={6}
                    variant='standard'
                    fullWidth
                    type='date'
                    label='Data de fim'
                    name={PEDIDO_FERIAS.PERIODO_DATA_INICIO}
                    value={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.PERIODO_DATA_FINAL] as string}
                    onChange={handlePeriodoFinalChange}
                />

                <GridRadioGroup
                    xs={12}
                    name={PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE}
                    sectionTitle='Qual a situação relacionada às férias do reclamante?'
                    value={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE] as string}
                    onChange={handleSituacaoFeriasReclamante}
                    options={opcoes_situacao_ferias_reclamante}
                    pl={0}
                    className='situacao_ferias_reclamante'
                />

                <FeriasNaoGozadas
                    show={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE] == SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_NAO_GOZADAS}
                    situacao={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO]}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.ferias_nao_gozadas_pedido}
                />

                <FeriasInterrompidasInjustamente
                    show={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE] == SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_INTERROMPIDAS_INJUSTAMENTE}
                    situacao={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO]}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.ferias_interrompidas_injustamente_pedido}
                />

                <PagamentoIntempestivo
                    show={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE] == SITUACAO_FERIAS_RECLAMANTE_VALUE.PAGAMENTO_INTEMPESTIVO_FERIAS}
                    situacao={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS]}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.pagamento_intempestivo_ferias}
                />

                <FeriasPagasNaoGozadas
                    show={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE] == SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_PAGAS_NAO_GOZADAS}
                    situacao={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS]}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.ferias_pagas_nao_gozadas}
                />

                <AusenciaPagamento
                    show={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE] == SITUACAO_FERIAS_RECLAMANTE_VALUE.AUSENCIA_APAGAMENTO_TERCO_CONSTITUICIONAL}
                    situacao={state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL]}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.ausencia_pagamento_terco_constitucional}
                />

                <GridTextField
                    xs={12}
                    label='Valor estimado pedido (calculado automaticamente)'
                    fullWidth
                    name={PEDIDO_FERIAS.REMUNERACAO}
                    value={Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(getSalarioProporcional(api_data) ?? 0 as number)}
                    variant='standard'
                    onBlur={() => ''}
                    error={error.demais_campos.remuneracao}
                    helperText={error.demais_campos.remuneracao ? 'Campo obrigatório. Preencher salário base e quantidade de meses trabalhados' : ' '}
                    containerStyle={{ marginTop: 10 }}
                    inputProps={{ readOnly: true, style: { fontSize: 25 } }}
                />

            </Grid>

            <FormButtons
                type={'back-next'}
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handlePeriodoInicioChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PERIODO_DATA_INICIO',
            field: FormField.PEDIDO_FERIAS,
            value
        })
    }

    function handlePeriodoFinalChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PERIODO_DATA_FINAL',
            field: FormField.PEDIDO_FERIAS,
            value
        })
    }

    function handleSituacaoFeriasReclamante(e: ChangeEvent<HTMLInputElement>) {
        const { checked, value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_SITUACAO_FERIAS_RECLAMANTE',
            field: FormField.PEDIDO_FERIAS,
            value: value as situacao_ferias_reclamante
        })
    }

    function getSituacaoFeriasReclamante(): string {
        return state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE] ?? ''
    }

    function getSalarioProporcional(api_data: any) {
        if (isFieldEmpty(api_data.remunarecao)) return 0
        return api_data.remuneracao * differenceInMonths(api_data.data_fim_contrato, api_data.data_inicio_contrato)
    }

    async function submitForm() {
        const etapa = PASSOS.step13.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }
        const situacao = getSituacaoFeriasReclamante()

        if (situacao == SITUACAO_FERIAS_RECLAMANTE_VALUE.AUSENCIA_APAGAMENTO_TERCO_CONSTITUICIONAL) {
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS] = null;
        }

        else if (situacao == SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_INTERROMPIDAS_INJUSTAMENTE) {
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL] = null;
        }

        else if (situacao == SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_NAO_GOZADAS) {
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL] = null;
        }

        else if (situacao == SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_PAGAS_NAO_GOZADAS) {
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL] = null;
        }

        else if (situacao == SITUACAO_FERIAS_RECLAMANTE_VALUE.PAGAMENTO_INTEMPESTIVO_FERIAS) {
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO] = null;
            (data[FormField.PEDIDO_FERIAS] as any)[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL] = null;
        }


        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    function getErrorsInitialState(): ErrorStep13 {
        const erros: ErrorStep13 = {
            demais_campos: {
                remuneracao: false,
                data_inicial: false
            },
            ferias_nao_gozadas_pedido: {
                valor_estimado_pagamento_em_dobro: false,
                periodos_ferias: false
            },
            ferias_interrompidas_injustamente_pedido: {
                valor_estimado_pagamento_em_dobro: false,
                data_inicial: false,
                data_final: false,
                data_interrupcao_ferias: false
            },
            pagamento_intempestivo_ferias: {
                valor_estimado_pagamento_em_dobro: false,
                data_inicio: false,
                data_pagamento_realizado: false
            },
            ferias_pagas_nao_gozadas: {
                valor_estimado_pagamento_em_dobro: false,
                data_inicio: false,
                data_final: false
            },
            ausencia_pagamento_terco_constitucional: {
                valor_estimado_pagamento_em_dobro: false,
                data_final: false,
                data_inicial: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const ausencia_pagamento = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL]
        const demais_campos = state[FormField.PEDIDO_FERIAS].value
        const ferias_interrompidas_injustamente = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO]
        const ferias_nao_gozadas = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO]
        const ferias_pagas_nao_gozadas = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS]
        const pagamento_intempestivo_ferias = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS]

        const situacao = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE]

        const erros: ErrorStep13 = {
            demais_campos: {
                remuneracao: false,
                data_inicial: false
            },
            ferias_nao_gozadas_pedido: {
                valor_estimado_pagamento_em_dobro: false,
                periodos_ferias: false
            },
            ferias_interrompidas_injustamente_pedido: {
                valor_estimado_pagamento_em_dobro: false,
                data_inicial: false,
                data_final: false,
                data_interrupcao_ferias: false
            },
            pagamento_intempestivo_ferias: {
                valor_estimado_pagamento_em_dobro: false,
                data_inicio: false,
                data_pagamento_realizado: false
            },
            ferias_pagas_nao_gozadas: {
                valor_estimado_pagamento_em_dobro: false,
                data_inicio: false,
                data_final: false
            },
            ausencia_pagamento_terco_constitucional: {
                valor_estimado_pagamento_em_dobro: false,
                data_final: false,
                data_inicial: false
            }
        }

        if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.AUSENCIA_APAGAMENTO_TERCO_CONSTITUICIONAL) {
            erros.ausencia_pagamento_terco_constitucional.valor_estimado_pagamento_em_dobro =
                !isPositive(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
            erros.ausencia_pagamento_terco_constitucional.data_final =
                isFieldEmpty(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_FINAL] as string)
            erros.ausencia_pagamento_terco_constitucional.data_inicial =
                isFieldEmpty(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_INICIO] as string)
        }

        if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_INTERROMPIDAS_INJUSTAMENTE) {
            erros.ferias_interrompidas_injustamente_pedido.valor_estimado_pagamento_em_dobro =
                !isPositive(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
            erros.ferias_interrompidas_injustamente_pedido.data_inicial =
                isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_INICIO] as string)
            erros.ferias_interrompidas_injustamente_pedido.data_final =
                isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_FINAL] as string)
            erros.ferias_interrompidas_injustamente_pedido.data_interrupcao_ferias =
                isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.INTERRUPCAO_FERIAS] as string)
        }

        if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_NAO_GOZADAS) {
            erros.ferias_nao_gozadas_pedido.valor_estimado_pagamento_em_dobro =
                !isPositive(ferias_nao_gozadas?.[PEDIDO_FERIAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
            erros.ferias_nao_gozadas_pedido.periodos_ferias =
                isFieldEmpty(ferias_nao_gozadas?.[PEDIDO_FERIAS_NAO_GOZADAS.PERIODOS_FERIAS] as string)
        }

        if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_PAGAS_NAO_GOZADAS) {
            erros.ferias_pagas_nao_gozadas.valor_estimado_pagamento_em_dobro =
                !isPositive(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
            erros.ferias_pagas_nao_gozadas.data_final =
                isFieldEmpty(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.DATA_FINAL] as string)
            erros.ferias_pagas_nao_gozadas.data_inicio =
                isFieldEmpty(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.DATA_INICIO] as string)
        }

        if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.PAGAMENTO_INTEMPESTIVO_FERIAS) {
            erros.pagamento_intempestivo_ferias.valor_estimado_pagamento_em_dobro =
                !isPositive(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
            erros.pagamento_intempestivo_ferias.data_inicio =
                isFieldEmpty(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_INICIO] as string)
            erros.pagamento_intempestivo_ferias.data_pagamento_realizado =
                isFieldEmpty(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_PAGAMENTO_REALIZADO] as string)
        }

        if (demais_campos || true) {
            erros.demais_campos.remuneracao =
                !isPositive(api_data?.[PEDIDO_FERIAS.REMUNERACAO] as number)
            erros.demais_campos.data_inicial =
                isFieldEmpty(demais_campos?.[PEDIDO_FERIAS.PERIODO_DATA_INICIO] as string)
        }

        return (
            false
            || someTruthyValue(erros.ausencia_pagamento_terco_constitucional)
            || someTruthyValue(erros.demais_campos)
            || someTruthyValue(erros.ferias_interrompidas_injustamente_pedido)
            || someTruthyValue(erros.ferias_nao_gozadas_pedido)
            || someTruthyValue(erros.ferias_pagas_nao_gozadas)
            || someTruthyValue(erros.pagamento_intempestivo_ferias)
        )
    }

    function checkErrors() {
        const ausencia_pagamento = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL]
        const demais_campos = state[FormField.PEDIDO_FERIAS].value
        const ferias_interrompidas_injustamente = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO]
        const ferias_nao_gozadas = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO]
        const ferias_pagas_nao_gozadas = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS]
        const pagamento_intempestivo_ferias = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS]
        const situacao = state[FormField.PEDIDO_FERIAS].value?.[PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE]

        if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.AUSENCIA_APAGAMENTO_TERCO_CONSTITUICIONAL) {
            if (!isPositive(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)) setError(prev => { return { ...prev, ausencia_pagamento_terco_constitucional: { ...prev.ausencia_pagamento_terco_constitucional, valor_estimado_pagamento_em_dobro: true } } })
            else setError(prev => { return { ...prev, ausencia_pagamento_terco_constitucional: { ...prev.ausencia_pagamento_terco_constitucional, valor_estimado_pagamento_em_dobro: false } } })

            if (isFieldEmpty(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_FINAL] as string)) setError(prev => { return { ...prev, ausencia_pagamento_terco_constitucional: { ...prev.ausencia_pagamento_terco_constitucional, data_final: true } } })
            else setError(prev => { return { ...prev, ausencia_pagamento_terco_constitucional: { ...prev.ausencia_pagamento_terco_constitucional, data_final: false } } })

            if (isFieldEmpty(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_INICIO] as string)) setError(prev => { return { ...prev, ausencia_pagamento_terco_constitucional: { ...prev.ausencia_pagamento_terco_constitucional, data_inicial: true } } })
            else setError(prev => { return { ...prev, ausencia_pagamento_terco_constitucional: { ...prev.ausencia_pagamento_terco_constitucional, data_inicial: false } } })
        }

        if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_INTERROMPIDAS_INJUSTAMENTE) {
            if (!isPositive(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)) setError(prev => { return { ...prev, ferias_interrompidas_injustamente_pedido: { ...prev.ferias_interrompidas_injustamente_pedido, valor_estimado_pagamento_em_dobro: true } } })
            else setError(prev => { return { ...prev, ferias_interrompidas_injustamente_pedido: { ...prev.ferias_interrompidas_injustamente_pedido, valor_estimado_pagamento_em_dobro: false } } })

            if (isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_FINAL] as string)) setError(prev => { return { ...prev, ferias_interrompidas_injustamente_pedido: { ...prev.ferias_interrompidas_injustamente_pedido, data_final: true } } })
            else setError(prev => { return { ...prev, ferias_interrompidas_injustamente_pedido: { ...prev.ferias_interrompidas_injustamente_pedido, data_final: false } } })

            if (isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_INICIO] as string)) setError(prev => { return { ...prev, ferias_interrompidas_injustamente_pedido: { ...prev.ferias_interrompidas_injustamente_pedido, data_inicial: true } } })
            else setError(prev => { return { ...prev, ferias_interrompidas_injustamente_pedido: { ...prev.ferias_interrompidas_injustamente_pedido, data_inicial: false } } })

            if (isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.INTERRUPCAO_FERIAS] as string)) setError(prev => { return { ...prev, ferias_interrompidas_injustamente_pedido: { ...prev.ferias_interrompidas_injustamente_pedido, data_interrupcao_ferias: true } } })
            else setError(prev => { return { ...prev, ferias_interrompidas_injustamente_pedido: { ...prev.ferias_interrompidas_injustamente_pedido, data_interrupcao_ferias: false } } })
        }

        if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_NAO_GOZADAS) {
            if (!isPositive(ferias_nao_gozadas?.[PEDIDO_FERIAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)) setError(prev => { return { ...prev, ferias_nao_gozadas_pedido: { ...prev.ferias_nao_gozadas_pedido, valor_estimado_pagamento_em_dobro: true } } })
            else setError(prev => { return { ...prev, ferias_nao_gozadas_pedido: { ...prev.ferias_nao_gozadas_pedido, valor_estimado_pagamento_em_dobro: false } } })

            if (isFieldEmpty(ferias_nao_gozadas?.[PEDIDO_FERIAS_NAO_GOZADAS.PERIODOS_FERIAS] as string)) setError(prev => { return { ...prev, ferias_nao_gozadas_pedido: { ...prev.ferias_nao_gozadas_pedido, periodos_ferias: true } } })
            else setError(prev => { return { ...prev, ferias_nao_gozadas_pedido: { ...prev.ferias_nao_gozadas_pedido, periodos_ferias: false } } })
        }

        if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_PAGAS_NAO_GOZADAS) {
            if (!isPositive(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)) setError(prev => { return { ...prev, ferias_pagas_nao_gozadas: { ...prev.ferias_pagas_nao_gozadas, valor_estimado_pagamento_em_dobro: true } } })
            else setError(prev => { return { ...prev, ferias_pagas_nao_gozadas: { ...prev.ferias_pagas_nao_gozadas, valor_estimado_pagamento_em_dobro: false } } })

            if (isFieldEmpty(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.DATA_FINAL] as string)) setError(prev => { return { ...prev, ferias_pagas_nao_gozadas: { ...prev.ferias_pagas_nao_gozadas, data_final: true } } })
            else setError(prev => { return { ...prev, ferias_pagas_nao_gozadas: { ...prev.ferias_pagas_nao_gozadas, data_final: false } } })

            if (isFieldEmpty(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.DATA_INICIO] as string)) setError(prev => { return { ...prev, ferias_pagas_nao_gozadas: { ...prev.ferias_pagas_nao_gozadas, data_inicio: true } } })
            else setError(prev => { return { ...prev, ferias_pagas_nao_gozadas: { ...prev.ferias_pagas_nao_gozadas, data_inicio: false } } })
        }

        if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.PAGAMENTO_INTEMPESTIVO_FERIAS) {
            if (!isPositive(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)) setError(prev => { return { ...prev, pagamento_intempestivo_ferias: { ...prev.pagamento_intempestivo_ferias, valor_estimado_pagamento_em_dobro: true } } })
            else setError(prev => { return { ...prev, pagamento_intempestivo_ferias: { ...prev.pagamento_intempestivo_ferias, valor_estimado_pagamento_em_dobro: false } } })

            if (isFieldEmpty(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_INICIO] as string)) setError(prev => { return { ...prev, pagamento_intempestivo_ferias: { ...prev.pagamento_intempestivo_ferias, data_inicio: true } } })
            else setError(prev => { return { ...prev, pagamento_intempestivo_ferias: { ...prev.pagamento_intempestivo_ferias, data_inicio: false } } })

            if (isFieldEmpty(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_PAGAMENTO_REALIZADO] as string)) setError(prev => { return { ...prev, pagamento_intempestivo_ferias: { ...prev.pagamento_intempestivo_ferias, data_pagamento_realizado: true } } })
            else setError(prev => { return { ...prev, pagamento_intempestivo_ferias: { ...prev.pagamento_intempestivo_ferias, data_pagamento_realizado: false } } })
        }

        if (demais_campos || true) {
            if (!isPositive(api_data?.[PEDIDO_FERIAS.REMUNERACAO] as number)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, remuneracao: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pagamento_em_dobro: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_FERIAS.PERIODO_DATA_INICIO] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_inicial: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_inicial: false } } })
        }
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step13: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step13: { error: false, show: false } } })
    }
}
