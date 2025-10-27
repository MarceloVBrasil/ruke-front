
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
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import { ErrorStep12, FormField, INTERROMPEU_AS_ATIVIDADES_OU_CONTINUA_TRABALHANDO, PEDIDO_RESCISAO_INDIRETA } from './helper/FormTypesAndFields';
import PedidoInterrupcaoAtividades from './components/PedidoInterrupcaoAtividades';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import PedidoContinuaTrabalhando from './components/PedidoContinuaTrabalhando';
import { isFieldEmpty, isPositive, someTruthyValue } from '@/app/utils/validators';
import { INTERRUPCAO_ATIVIDADES_PEDIDO } from './helper/InterrupcaoAtividades/types';
import { CONTINUA_TRABALHANDO_PEDIDO } from './helper/ContinuaTrabalhando/types';


export default function Step12({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)
    const valorEstimadoPedido = useRef<HTMLDivElement>(null)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 12

    const [error, setError] = useState<ErrorStep12>(getErrorsInitialState())

    useEffect(() => {
        validateStep()
        if (stepsError.step12.show) checkErrors()
    }, [stepsError.step12])

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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step12.titulo} />

            <Grid container spacing={0} sx={{ pl: 2, pr: 2 }}>

                <GridRadioGroup
                    xs={12}
                    sectionTitle='O reclamante interrompeu as atividades ou continua trabalhando?'
                    name={PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO}
                    value={getInterrompeuTrabalhoOuContinuaTrabalhandoValue()}
                    options={[{ descricao: 'Interrompeu as atividades', value: INTERROMPEU_AS_ATIVIDADES_OU_CONTINUA_TRABALHANDO.INTERROMPEU_ATIVIDADES }, { descricao: 'Continua trabalhando', value: INTERROMPEU_AS_ATIVIDADES_OU_CONTINUA_TRABALHANDO.CONTINUA_TRABALHANDO }]}
                    onChange={handleInterrompeuAtividadesOuContinuaTrabalhandoChange}
                    error={error.demais_campos.continua_trabalhando_ou_interrompeu_atividades}
                    helperText={error.demais_campos.continua_trabalhando_ou_interrompeu_atividades ? 'Campo obrigatório' : ' '}
                />

                <PedidoInterrupcaoAtividades
                    pedido={state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    show={state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERROMPEU_AS_ATIVIDADES] as boolean}
                    error={error.interrupcao_atividades}
                />

                <PedidoContinuaTrabalhando
                    pedido={state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    show={state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO] as boolean}
                    error={error.continua_trabalhando}
                />

                <GridCurrencyInput
                    xs={12}
                    ref={valorEstimadoPedido}
                    onBlur={handleValorEstimadoPedidoChange}
                    name={PEDIDO_RESCISAO_INDIRETA.VALOR_ESTIMADO_PEDIDO}
                    defaultValue={state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.VALOR_ESTIMADO_PEDIDO] ?? 0}
                    label={'Qual o valor estimado pedido?'}
                    sx={{ marginTop: 3, paddingRight: 1 }}
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

    function getInterrompeuTrabalhoOuContinuaTrabalhandoValue() {
        const interrompeu_as_atividades = state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.INTERROMPEU_AS_ATIVIDADES] ?? false
        const continua_trabalhando = state[FormField.PEDIDO_RESCISAO_INDIRETA].value?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO] ?? false

        if (interrompeu_as_atividades) return INTERROMPEU_AS_ATIVIDADES_OU_CONTINUA_TRABALHANDO.INTERROMPEU_ATIVIDADES
        else if (continua_trabalhando) return INTERROMPEU_AS_ATIVIDADES_OU_CONTINUA_TRABALHANDO.CONTINUA_TRABALHANDO

        return ''
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.PEDIDO_RESCISAO_INDIRETA,
            value: getGridCurrencyInputValue(valorEstimadoPedido, PEDIDO_RESCISAO_INDIRETA.VALOR_ESTIMADO_PEDIDO)
        })
    }

    function handleInterrompeuAtividadesOuContinuaTrabalhandoChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        if (value == INTERROMPEU_AS_ATIVIDADES_OU_CONTINUA_TRABALHANDO.INTERROMPEU_ATIVIDADES) {

            dispatch({
                type: 'SET_INTERROMPEU_ATIVIDADES',
                field: FormField.PEDIDO_RESCISAO_INDIRETA,
                value: true
            })
        }
        else if (value == INTERROMPEU_AS_ATIVIDADES_OU_CONTINUA_TRABALHANDO.CONTINUA_TRABALHANDO) {

            dispatch({
                type: 'SET_CONTINUA_TRABALHANDO',
                field: FormField.PEDIDO_RESCISAO_INDIRETA,
                value: true
            })
        }
    }

    async function submitForm() {
        const etapa = PASSOS.step12.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }

        if (getInterrompeuTrabalhoOuContinuaTrabalhandoValue() == INTERROMPEU_AS_ATIVIDADES_OU_CONTINUA_TRABALHANDO.CONTINUA_TRABALHANDO) {
            (data[FormField.PEDIDO_RESCISAO_INDIRETA] as any)[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]! = null
        }

        else if (getInterrompeuTrabalhoOuContinuaTrabalhandoValue() == INTERROMPEU_AS_ATIVIDADES_OU_CONTINUA_TRABALHANDO.INTERROMPEU_ATIVIDADES) {
            (data[FormField.PEDIDO_RESCISAO_INDIRETA] as any)[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]! = null
        }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    function getErrorsInitialState(): ErrorStep12 {
        const erros: ErrorStep12 = {
            demais_campos: {
                valor_estimado_pedido: false,
                continua_trabalhando_ou_interrompeu_atividades: false
            },
            interrupcao_atividades: {
                alineas: false,
                data_interrupcao: false,
                data_projecao_aviso_previo: false,
                falta_grave: false
            },
            continua_trabalhando: {
                alineas: false,
                falta_grave: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep12 = {
            demais_campos: {
                valor_estimado_pedido: false,
                continua_trabalhando_ou_interrompeu_atividades: false
            },
            interrupcao_atividades: {
                alineas: false,
                data_interrupcao: false,
                data_projecao_aviso_previo: false,
                falta_grave: false
            },
            continua_trabalhando: {
                alineas: false,
                falta_grave: false
            }
        }

        const demais_campos = state[FormField.PEDIDO_RESCISAO_INDIRETA].value

        if (demais_campos || true) {
            erros.demais_campos.valor_estimado_pedido =
                !isPositive(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.VALOR_ESTIMADO_PEDIDO] as number)
            erros.demais_campos.continua_trabalhando_ou_interrompeu_atividades =
                isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO] as boolean)
                || isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERROMPEU_AS_ATIVIDADES] as boolean)

            if (demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERROMPEU_AS_ATIVIDADES]) {
                erros.interrupcao_atividades.alineas =
                    isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS] as string[])
                erros.interrupcao_atividades.data_interrupcao =
                    isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.DATA_INTERRUPCAO] as string)
                erros.interrupcao_atividades.data_projecao_aviso_previo =
                    isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.PROJECAO_AVISO_PREVIO] as string)
                erros.interrupcao_atividades.falta_grave =
                    isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.FALTA_GRAVE] as string)
            }

            if (demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO]) {
                erros.continua_trabalhando.alineas =
                    isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS] as string[])
                erros.continua_trabalhando.falta_grave =
                    isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]?.[CONTINUA_TRABALHANDO_PEDIDO.FALTA_GRAVE] as string)
            }
        }

        return (
            false
            || someTruthyValue(erros.demais_campos)
            || someTruthyValue(erros.interrupcao_atividades)
            || someTruthyValue(erros.continua_trabalhando)
        )
    }

    function checkErrors() {
        const demais_campos = state[FormField.PEDIDO_RESCISAO_INDIRETA].value

        if (demais_campos || true) {
            if (!isPositive(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO] as boolean)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, continua_trabalhando_ou_interrompeu_atividades: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, continua_trabalhando_ou_interrompeu_atividades: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERROMPEU_AS_ATIVIDADES] as boolean)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, continua_trabalhando_ou_interrompeu_atividades: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, continua_trabalhando_ou_interrompeu_atividades: false } } })

            if (demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERROMPEU_AS_ATIVIDADES]) {
                if (isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS] as string[])) setError(prev => { return { ...prev, interrupcao_atividades: { ...prev.interrupcao_atividades, alineas: true } } })
                else setError(prev => { return { ...prev, interrupcao_atividades: { ...prev.interrupcao_atividades, alineas: false } } })

                if (isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.DATA_INTERRUPCAO] as string)) setError(prev => { return { ...prev, interrupcao_atividades: { ...prev.interrupcao_atividades, data_interrupcao: true } } })
                else setError(prev => { return { ...prev, interrupcao_atividades: { ...prev.interrupcao_atividades, data_interrupcao: false } } })

                if (isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.PROJECAO_AVISO_PREVIO] as string)) setError(prev => { return { ...prev, interrupcao_atividades: { ...prev.interrupcao_atividades, data_projecao_aviso_previo: true } } })
                else setError(prev => { return { ...prev, interrupcao_atividades: { ...prev.interrupcao_atividades, data_projecao_aviso_previo: false } } })

                if (isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]?.[INTERRUPCAO_ATIVIDADES_PEDIDO.FALTA_GRAVE] as string)) setError(prev => { return { ...prev, interrupcao_atividades: { ...prev.interrupcao_atividades, falta_grave: true } } })
                else setError(prev => { return { ...prev, interrupcao_atividades: { ...prev.interrupcao_atividades, falta_grave: false } } })
            }

            if (demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO]) {
                if (isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS] as string[])) setError(prev => { return { ...prev, continua_trabalhando: { ...prev.continua_trabalhando, alineas: true } } })
                else setError(prev => { return { ...prev, continua_trabalhando: { ...prev.continua_trabalhando, alineas: false } } })

                if (isFieldEmpty(demais_campos?.[PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]?.[CONTINUA_TRABALHANDO_PEDIDO.FALTA_GRAVE] as string)) setError(prev => { return { ...prev, continua_trabalhando: { ...prev.continua_trabalhando, falta_grave: true } } })
                else setError(prev => { return { ...prev, continua_trabalhando: { ...prev.continua_trabalhando, falta_grave: false } } })
            }
        }
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step12: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step12: { error: false, show: false } } })
    }
}
