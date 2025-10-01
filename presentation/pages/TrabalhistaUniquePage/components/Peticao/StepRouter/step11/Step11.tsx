
"üse client"

import { Grid, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { PASSOS } from '../helper/passos';
import { gerarPeticaoTrabalhista, updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import FormButtons from '@/presentation/components/FormButtons';
import { IPedidos, IStep } from '../StepRouter';

import { ErrorStep11, FormField, FormState, PEDIDO_GORJETAS } from './helper/FormTypesAndFields';
import { getPedidoNextStep, getPedidosStep, getPedidoPreviousStep } from '../helper/pedidos';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import PedidoPagamentoRetido from './components/PedidoPagamentoRetido';
import PedidoPagamentoPorFora from './components/PedidoPagamentoPorFora';
import { PAGAMENTO_POR_FORA_PEDIDO } from './helper/PagamentoPorFora/types';
import { isPositive, someTruthyValue } from '@/app/utils/validators';
import { PAGAMENTO_RETIDO_PEDIDO } from './helper/PagamentoRetido/types';


export default function Step11({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)
    const valorEstimadoPedido = useRef<HTMLDivElement>(null)

    const [opcoes, setOpcoes] = useState<string[]>(getOpcoesInitialValue(state))
    enum OPCOES {
        PAGAMENTO_POR_FORA = "PAGAMENTO_POR_FORA",
        PAGAMENTO_RETIDO = "PAGAMENTO_RETIDO"
    }

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 11

    const [error, setError] = useState<ErrorStep11>(getErrorsInitialState())

    useEffect(() => {
        validateStep()
        if (stepsError.step11.show) checkErrors()
    }, [stepsError.step11])

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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step11.titulo} />

            <Grid container spacing={0} sx={{ pl: 2, pr: 2 }}>
                <GridRadioGroup
                    xs={12}
                    sectionTitle='Durante o período de trabalho o reclamante recebia gorjetas de forma separada do salário?'
                    options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    name=''
                    value={state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA] as boolean}
                    onChange={handlePagamentoPorFora}
                />

                <GridRadioGroup
                    xs={12}
                    sectionTitle='Durante o período de trabalho a reclamada retinha parte das gorjetas recebidas?'
                    options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    name={PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO}
                    value={state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO] as boolean}
                    onChange={handlePagamentoRetido}
                />

                {
                    opcoes.map(o => {
                        if (o == OPCOES.PAGAMENTO_POR_FORA) return (
                            <PedidoPagamentoPorFora
                                key={o}
                                setFormHasChanged={setFormHasChanged}
                                pedido={state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]}
                                dispatch={dispatch}
                                error={error.pagamento_por_fora_pedido}
                            />
                        )

                        if (o == OPCOES.PAGAMENTO_RETIDO) return (
                            <PedidoPagamentoRetido
                                key={o}
                                setFormHasChanged={setFormHasChanged}
                                pedido={state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO]}
                                dispatch={dispatch}
                                error={error.pagamento_retido_pedido}
                            />
                        )
                    })
                }

                <GridCurrencyInput
                    xs={12}
                    ref={valorEstimadoPedido}
                    onBlur={handleValorEstimadoPedidoChange}
                    name={`${PEDIDO_GORJETAS.VALOR_ESTIMADO_PEDIDO}`}
                    defaultValue={state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.VALOR_ESTIMADO_PEDIDO] as unknown as number || 0}
                    label={'Qual o valor estimado pedido?'}
                    sx={{ marginTop: 3 }}
                    error={error.demais_campos.valor_estimado_pedido}
                    helperText={error.demais_campos.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
                />
            </Grid>



            <FormButtons
                type={'back-next'}
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function getOpcoesInitialValue(state: FormState) {
        const pagamento_por_fora = state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA] ?? false
        const pagamento_retido = state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO] ?? false
        const opcoes: string[] = []

        if (pagamento_por_fora) opcoes.push(OPCOES.PAGAMENTO_POR_FORA)
        if (pagamento_retido) opcoes.push(OPCOES.PAGAMENTO_RETIDO)

        return opcoes
    }

    function handlePagamentoPorFora(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        const checked = value == 'true'

        if (checked) setOpcoes(prev => [...prev, OPCOES.PAGAMENTO_POR_FORA])
        else setOpcoes(prev => prev.filter(p => p != OPCOES.PAGAMENTO_POR_FORA))

        dispatch({
            type: 'SET_PAGAMENTO_POR_FORA',
            field: FormField.PEDIDO_GORJETAS,
            value: checked
        })
    }

    function handlePagamentoRetido(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        const checked = value == 'true'

        if (checked) setOpcoes(prev => [...prev, OPCOES.PAGAMENTO_RETIDO])
        else setOpcoes(prev => prev.filter(p => p != OPCOES.PAGAMENTO_RETIDO))

        dispatch({
            type: 'SET_PAGAMENTO_RETIDO',
            field: FormField.PEDIDO_GORJETAS,
            value: checked
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.PEDIDO_GORJETAS,
            value: getGridCurrencyInputValue(valorEstimadoPedido, PEDIDO_GORJETAS.VALOR_ESTIMADO_PEDIDO)
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step11.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    function getErrorsInitialState(): ErrorStep11 {
        const erros: ErrorStep11 = {
            demais_campos: {
                valor_estimado_pedido: false
            },
            pagamento_por_fora_pedido: {
                valor_total_estimado_gorjetas: false
            },
            pagamento_retido_pedido: {
                valor_total_estimado_gorjetas: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep11 = {
            demais_campos: {
                valor_estimado_pedido: false
            },
            pagamento_por_fora_pedido: {
                valor_total_estimado_gorjetas: false
            },
            pagamento_retido_pedido: {
                valor_total_estimado_gorjetas: false
            }
        }

        const pedido_pagamento_por_fora = state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]
        const pedido_pagamento_retido = state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO]
        const demais_campos = state[FormField.PEDIDO_GORJETAS].value

        if (state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA]) {
            erros.pagamento_por_fora_pedido.valor_total_estimado_gorjetas =
                !isPositive(pedido_pagamento_por_fora?.[PAGAMENTO_POR_FORA_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS] as number)
        }

        if (state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO]) {
            erros.pagamento_retido_pedido.valor_total_estimado_gorjetas =
                !isPositive(pedido_pagamento_retido?.[PAGAMENTO_RETIDO_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS] as number)
        }

        if (demais_campos || true) {
            erros.demais_campos.valor_estimado_pedido =
                !isPositive(demais_campos?.[PEDIDO_GORJETAS.VALOR_ESTIMADO_PEDIDO] as number)
        }

        return (
            false
            || someTruthyValue(erros.demais_campos)
            || someTruthyValue(erros.pagamento_por_fora_pedido)
            || someTruthyValue(erros.pagamento_retido_pedido)
        )
    }

    function checkErrors() {
        const pedido_pagamento_por_fora = state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]
        const pedido_pagamento_retido = state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO]
        const demais_campos = state[FormField.PEDIDO_GORJETAS].value

        if (state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA]) {
            if (!isPositive(pedido_pagamento_por_fora?.[PAGAMENTO_POR_FORA_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS] as number)) setError(prev => { return { ...prev, pagamento_por_fora_pedido: { ...prev.pagamento_por_fora_pedido, valor_total_estimado_gorjetas: true } } })
            else setError(prev => { return { ...prev, pagamento_por_fora_pedido: { ...prev.pagamento_por_fora_pedido, valor_total_estimado_gorjetas: false } } })
        }

        if (state[FormField.PEDIDO_GORJETAS].value?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO]) {
            if (!isPositive(pedido_pagamento_retido?.[PAGAMENTO_RETIDO_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS] as number)) setError(prev => { return { ...prev, pagamento_retido_pedido: { ...prev.pagamento_retido_pedido, valor_total_estimado_gorjetas: true } } })
            else setError(prev => { return { ...prev, pagamento_retido_pedido: { ...prev.pagamento_retido_pedido, valor_total_estimado_gorjetas: false } } })
        }

        if (demais_campos || true) {
            if (!isPositive(demais_campos?.[PEDIDO_GORJETAS.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: false } } })
        }
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step11: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step11: { error: false, show: false } } })
    }
}
