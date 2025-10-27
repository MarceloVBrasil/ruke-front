
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
import { formReducer, getFormStateFromApi } from './helper/FormReducer';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import { ErrorStep16, FormField, PEDIDO_FALTA_DEPOSITO_FGTS } from './helper/FormTypesAndFields';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import NaoHouveDepositoFGTS from './components/NaoHouveDepositoFGTS';
import { isFieldEmpty, isPositive, someTruthyValue } from '@/app/utils/validators';
import "../../../../css/FaltaDepositoFGTS.css"


export default function Step16({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 16

    const [error, setError] = useState<ErrorStep16>(getErrorsInitialState())
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        validateStep()
        if (stepsError.step16.show) checkErrors()
    }, [stepsError.step16])

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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step16.titulo} />

            <Grid container spacing={1} sx={{ pl: 4, pr: 2 }}>

                <GridRadioGroup
                    xs={12}
                    sectionTitle='Durante o período de trabalho, a reclamada efetuou todos os depósitos de FGTS devidos?'
                    name={PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS}
                    value={state[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS] as boolean}
                    onChange={handleReclamadaEfetuouDepositosChange}
                    options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    error={error.demais_campos.reclamada_efetuou_depositos}
                    helperText={error.demais_campos.reclamada_efetuou_depositos ? 'Campo obriagtório' : ' '}
                    pl={0}
                    className='reclamada_efetuou_depositos'
                />

                <NaoHouveDepositoFGTS
                    show={state[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS] === false}
                    state={state}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.demais_campos}
                />

                <GridCurrencyInput
                    xs={12}
                    ref={valorEstimadoPedidoRef}
                    onBlur={handleValorEstimadoPedidoChange}
                    name={PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_PEDIDO}
                    defaultValue={state[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value?.[PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_PEDIDO] ?? 0}
                    label={'Qual o valor estimado pedido?'}
                    sx={{ marginTop: 3, ml: -2 }}
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

    function handleReclamadaEfetuouDepositosChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RECLAMADA_EFETUOU_DEPOSITOS',
            field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS,
            value: value == 'true'
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_PEDIDO)
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step16.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    function getErrorsInitialState(): ErrorStep16 {
        const erros: ErrorStep16 = {
            demais_campos: {
                valor_estimado_pedido: false,
                reclamada_efetuou_depositos: false,
                data_inicio: false,
                data_termino: false,
                valor_estimado_fgts_nao_depositado: false,
                reclamante_demitido_sem_justa_causa: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep16 = {
            demais_campos: {
                valor_estimado_pedido: false,
                reclamada_efetuou_depositos: false,
                data_inicio: false,
                data_termino: false,
                valor_estimado_fgts_nao_depositado: false,
                reclamante_demitido_sem_justa_causa: false
            }
        }

        const demais_campos = state[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value

        if (demais_campos || true) {
            erros.demais_campos.valor_estimado_pedido =
                !isPositive(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_PEDIDO] as number)
            erros.demais_campos.reclamada_efetuou_depositos =
                isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS] as boolean)

            if (demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS] === false) {
                erros.demais_campos.data_inicio =
                    isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.DATA_INICIO] as string)
                erros.demais_campos.data_termino =
                    isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.DATA_TERMINO] as string)
                erros.demais_campos.valor_estimado_fgts_nao_depositado =
                    !isPositive(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO] as number)
                erros.demais_campos.reclamante_demitido_sem_justa_causa =
                    isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA] as boolean)
            }
        }

        return (
            false
            || someTruthyValue(erros.demais_campos)
        )
    }

    function checkErrors() {
        const demais_campos = state[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value

        if (!isPositive(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: true } } })
        else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: false } } })

        if (isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS] as boolean)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, reclamada_efetuou_depositos: true } } })
        else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, reclamada_efetuou_depositos: false } } })

        if (demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS] === false) {
            if (isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.DATA_INICIO] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_inicio: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_inicio: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.DATA_TERMINO] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_termino: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, data_termino: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA] as boolean)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, reclamante_demitido_sem_justa_causa: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, reclamante_demitido_sem_justa_causa: false } } })

            if (!isPositive(demais_campos?.[PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO] as number)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_fgts_nao_depositado: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_fgts_nao_depositado: false } } })
        }
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step16: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step16: { error: false, show: false } } })
    }
}
