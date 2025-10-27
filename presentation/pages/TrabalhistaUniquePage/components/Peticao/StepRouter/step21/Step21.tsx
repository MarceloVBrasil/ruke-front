
"üse client"

import { Grid } from '@mui/material'
import React, { ChangeEvent, useEffect, useMemo, useReducer, useRef, useState } from 'react'
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
import { ErrorStep21, FormField, PEDIDO_INTEGRACAO_SALARIAL, RAZOES_LABELS, RAZOES_VALUES } from './helper/FormTypesAndFields';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import GridCheckbox from '@/presentation/components/GridCheckbox';
import SalarioPorFora from './components/SalarioPorFora';
import IntegracaoPremiosBonus from './components/IntegracaoPremiosBonus';
import AuxilioAlimentacao from './components/AuxilioAlimentacao';
import { isFieldEmpty, isPositive, someTruthyValue } from '@/app/utils/validators';
import { SALARIO_POR_FORA } from './helper/SalarioPorFora/types';
import { INTEGRACAO_PREMIOS } from './helper/IntegracaoPremiosBonus/types';
import { AUXILIO_ALIMENTACAO } from './helper/AuxilioAlimentacao/types';


export default function Step21({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)
    const [razoes, setRazoes] = useState<string[]>(getRazoesInitialValue(api_data))

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 21

    const [error, setError] = useState<ErrorStep21>(getErrorsInitialState())


    useEffect(() => {
        validateStep()
        if (stepsError.step21.show) checkErrors()
    }, [stepsError.step21])

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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step20.titulo} />

            <Grid container spacing={1} sx={{ pl: 4, pr: 2 }}>
                <FormSectionTitle sectionTitle='Por que razão o reclamante tem direito a integração de parcelas pagas em dinheiro?'
                />

                <GridCheckbox
                    xs={12}
                    readableOptionSm
                    name={PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA}
                    onChange={handleRazoesChange}
                    value={RAZOES_VALUES.SALARIO_POR_FORA}
                    label={RAZOES_LABELS.SALARIO_POR_FORA}
                    checked={razoes.includes(RAZOES_VALUES.SALARIO_POR_FORA)}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionSm
                    name={PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS}
                    onChange={handleRazoesChange}
                    value={RAZOES_VALUES.INTEGRACAO_PREMIOS}
                    label={RAZOES_LABELS.INTEGRACAO_PREMIOS}
                    checked={razoes.includes(RAZOES_VALUES.INTEGRACAO_PREMIOS)}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionSm
                    name={PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO}
                    onChange={handleRazoesChange}
                    value={RAZOES_VALUES.AUXILIO_ALIMENTACAO}
                    label={RAZOES_LABELS.AUXILIO_ALIMENTACAO}
                    checked={razoes.includes(RAZOES_VALUES.AUXILIO_ALIMENTACAO)}
                />


                {
                    razoes.map((r, i) => {
                        if (r === RAZOES_VALUES.SALARIO_POR_FORA) return (
                            <SalarioPorFora
                                key={i}
                                error={error.salario_por_fora}
                                dispatch={dispatch}
                                salario_por_fora={state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA]}
                                setFormHasChanged={setFormHasChanged}
                            />
                        )

                        if (r === RAZOES_VALUES.INTEGRACAO_PREMIOS) return (
                            <IntegracaoPremiosBonus
                                key={i}
                                error={error.integracao_premios}
                                dispatch={dispatch}
                                integracao_premios={state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS]}
                                setFormHasChanged={setFormHasChanged}
                            />
                        )

                        if (r === RAZOES_VALUES.AUXILIO_ALIMENTACAO) return (
                            <AuxilioAlimentacao
                                key={i}
                                error={error.auxilio_alimentacao}
                                dispatch={dispatch}
                                auxilio_alimentacao={state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO]}
                                setFormHasChanged={setFormHasChanged}
                            />
                        )
                    })
                }

            </Grid>

            <FormButtons
                type={'back-next'}
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handleRazoesChange(e: ChangeEvent<HTMLInputElement>) {
        const { checked, value } = e.target
        setFormHasChanged(true)

        if (checked) {
            setRazoes(prev => [...prev, value])
        } else {
            setRazoes(prev => prev.filter(razao => razao != value))
        }

        dispatch({
            type: 'SET_RAZAO',
            field: 'FUNCAO_AUXILIAR',
            value: true
        })
    }

    function getRazoesInitialValue(api_data: any) {
        const pedido_integracao_salarial: any = api_data[FormField.PEDIDO_INTEGRACAO_SALARIAL]
        const razoes_checked: string[] = []

        if (!!pedido_integracao_salarial?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA]) razoes_checked.push(RAZOES_VALUES.SALARIO_POR_FORA)
        if (!!pedido_integracao_salarial?.[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS]) razoes_checked.push(RAZOES_VALUES.INTEGRACAO_PREMIOS)
        if (!!pedido_integracao_salarial?.[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO]) razoes_checked.push(RAZOES_VALUES.AUXILIO_ALIMENTACAO)

        return razoes_checked
    }

    async function submitForm() {
        const etapa = PASSOS.step21.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }

        if (!razoes.includes(RAZOES_VALUES.SALARIO_POR_FORA)) {
            (data[FormField.PEDIDO_INTEGRACAO_SALARIAL] as any)[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA] = null
        }

        if (!razoes.includes(RAZOES_VALUES.INTEGRACAO_PREMIOS)) {
            (data[FormField.PEDIDO_INTEGRACAO_SALARIAL] as any)[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS] = null
        }

        if (!razoes.includes(RAZOES_VALUES.AUXILIO_ALIMENTACAO)) {
            (data[FormField.PEDIDO_INTEGRACAO_SALARIAL] as any)[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO] = null
        }

        try {
            const updateResponse = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    function getErrorsInitialState(): ErrorStep21 {
        const erros: ErrorStep21 = {
            salario_por_fora: {
                data_inicio: false,
                data_fim: false,
                valor_mensal_medio: false,
                rubrica_por_fora: false,
                forma_pagamento: false,
                valor_estimado_pedido: false
            },
            integracao_premios: {
                data_fim: false,
                data_inicio: false,
                valor_mensal_medio: false,
                valor_estimado_pedido: false
            },
            auxilio_alimentacao: {
                data_fim: false,
                data_inicio: false,
                valor_mensal_medio: false,
                valor_estimado_pedido: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {

        const erros: ErrorStep21 = {
            salario_por_fora: {
                data_inicio: false,
                data_fim: false,
                valor_mensal_medio: false,
                valor_estimado_pedido: false,
                rubrica_por_fora: false,
                forma_pagamento: false
            },
            integracao_premios: {
                data_inicio: false,
                data_fim: false,
                valor_mensal_medio: false,
                valor_estimado_pedido: false
            },
            auxilio_alimentacao: {
                data_inicio: false,
                data_fim: false,
                valor_mensal_medio: false,
                valor_estimado_pedido: false
            }
        }

        const salario_por_fora = state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA]
        const integracao_premios = state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS]
        const auxilio_alimentacao = state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO]

        if (razoes.includes(RAZOES_VALUES.SALARIO_POR_FORA)) {
            erros.salario_por_fora.data_fim =
                isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.DATA_FIM] as string)
            erros.salario_por_fora.data_inicio =
                isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.DATA_INICIO] as string)
            erros.salario_por_fora.forma_pagamento =
                isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.FORMA_PAGAMENTO] as string)
            erros.salario_por_fora.rubrica_por_fora =
                isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.RUBRICA_POR_FORA] as string)
            erros.salario_por_fora.valor_estimado_pedido =
                !isPositive(salario_por_fora?.[SALARIO_POR_FORA.VALOR_ESTIMADO_PEDIDO] as number)
            erros.salario_por_fora.valor_mensal_medio =
                !isPositive(salario_por_fora?.[SALARIO_POR_FORA.VALOR_MENSAL_MEDIO] as number)
        }

        if (razoes.includes(RAZOES_VALUES.INTEGRACAO_PREMIOS)) {
            erros.integracao_premios.data_fim =
                isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.DATA_FIM] as string)
            erros.integracao_premios.data_inicio =
                isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.DATA_INICIO] as string)
            erros.integracao_premios.valor_estimado_pedido =
                !isPositive(integracao_premios?.[INTEGRACAO_PREMIOS.VALOR_ESTIMADO_PEDIDO] as number)
            erros.integracao_premios.valor_mensal_medio =
                !isPositive(integracao_premios?.[INTEGRACAO_PREMIOS.VALOR_MENSAL_MEDIO] as number)
        }


        if (razoes.includes(RAZOES_VALUES.AUXILIO_ALIMENTACAO)) {
            erros.auxilio_alimentacao.data_fim =
                isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.DATA_FIM] as string)
            erros.auxilio_alimentacao.data_inicio =
                isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.DATA_INICIO] as string)
            erros.auxilio_alimentacao.valor_estimado_pedido =
                !isPositive(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.VALOR_ESTIMADO_PEDIDO] as number)
            erros.auxilio_alimentacao.valor_mensal_medio =
                !isPositive(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.VALOR_MENSAL_MEDIO] as number)
        }

        return (
            false
            || someTruthyValue(erros.auxilio_alimentacao)
            || someTruthyValue(erros.integracao_premios)
            || someTruthyValue(erros.salario_por_fora)
        )
    }

    function checkErrors() {
        const salario_por_fora = state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA]
        const integracao_premios = state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS]
        const auxilio_alimentacao = state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO]

        if (razoes.includes(RAZOES_VALUES.SALARIO_POR_FORA)) {
            if (isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.DATA_FIM] as string)) setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, data_fim: true } } })
            else setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, data_fim: false } } })

            if (isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.DATA_INICIO] as string)) setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, data_inicio: true } } })
            else setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, data_inicio: false } } })

            if (isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.FORMA_PAGAMENTO] as string)) setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, forma_pagamento: true } } })
            else setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, forma_pagamento: false } } })

            if (isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.RUBRICA_POR_FORA] as string)) setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, rubrica_por_fora: true } } })
            else setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, rubrica_por_fora: false } } })

            if (isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, valor_estimado_pedido: false } } })

            if (isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.VALOR_MENSAL_MEDIO] as number)) setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, valor_mensal_medio: true } } })
            else setError(prev => { return { ...prev, salario_por_fora: { ...prev.salario_por_fora, valor_mensal_medio: false } } })
        }

        if (razoes.includes(RAZOES_VALUES.INTEGRACAO_PREMIOS)) {
            if (isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.DATA_FIM] as string)) setError(prev => { return { ...prev, integracao_premios: { ...prev.integracao_premios, data_fim: true } } })
            else setError(prev => { return { ...prev, integracao_premios: { ...prev.integracao_premios, data_fim: false } } })

            if (isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.DATA_INICIO] as string)) setError(prev => { return { ...prev, integracao_premios: { ...prev.integracao_premios, data_inicio: true } } })
            else setError(prev => { return { ...prev, integracao_premios: { ...prev.integracao_premios, data_inicio: false } } })

            if (isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, integracao_premios: { ...prev.integracao_premios, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, integracao_premios: { ...prev.integracao_premios, valor_estimado_pedido: false } } })

            if (isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.VALOR_MENSAL_MEDIO] as number)) setError(prev => { return { ...prev, integracao_premios: { ...prev.integracao_premios, valor_mensal_medio: true } } })
            else setError(prev => { return { ...prev, integracao_premios: { ...prev.integracao_premios, valor_mensal_medio: false } } })
        }

        if (razoes.includes(RAZOES_VALUES.AUXILIO_ALIMENTACAO)) {
            if (isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.DATA_FIM] as string)) setError(prev => { return { ...prev, auxilio_alimentacao: { ...prev.auxilio_alimentacao, data_fim: true } } })
            else setError(prev => { return { ...prev, auxilio_alimentacao: { ...prev.auxilio_alimentacao, data_fim: false } } })

            if (isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.DATA_INICIO] as string)) setError(prev => { return { ...prev, auxilio_alimentacao: { ...prev.auxilio_alimentacao, data_inicio: true } } })
            else setError(prev => { return { ...prev, auxilio_alimentacao: { ...prev.auxilio_alimentacao, data_inicio: false } } })

            if (isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, auxilio_alimentacao: { ...prev.auxilio_alimentacao, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, auxilio_alimentacao: { ...prev.auxilio_alimentacao, valor_estimado_pedido: false } } })

            if (isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.VALOR_MENSAL_MEDIO] as number)) setError(prev => { return { ...prev, auxilio_alimentacao: { ...prev.auxilio_alimentacao, valor_mensal_medio: true } } })
            else setError(prev => { return { ...prev, auxilio_alimentacao: { ...prev.auxilio_alimentacao, valor_mensal_medio: false } } })
        }
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step21: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step21: { error: false, show: false } } })
    }
}
