
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
import { ErrorStep15, FormField, PEDIDO_GRATUIDADE_JUSTICA } from './helper/FormTypesAndFields';
import NaoDesempregado from './components/NaoDesempregado/NaoDesempregado';
import { isFieldEmpty, someTruthyValue } from '@/app/utils/validators';


export default function Step15({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 15

    const [error, setError] = useState<ErrorStep15>(getErrorsInitialState())

    useEffect(() => {
        validateStep()
        if (stepsError.step15.show) checkErrors()
    }, [stepsError.step15])

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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step15.titulo} />

            <Grid container spacing={1} sx={{ pl: 2 }}>
                <GridRadioGroup
                    xs={12}
                    sectionTitle='O reclamante está atualmente desempregado?'
                    options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    value={state[FormField.PEDIDO_GRATUIDADE_JUSTICA].value?.[PEDIDO_GRATUIDADE_JUSTICA.RECLAMANTE_DESEMPREGADO] as boolean}
                    onChange={handleReclamanteDesempregadoChange}
                    name={PEDIDO_GRATUIDADE_JUSTICA.RECLAMANTE_DESEMPREGADO}
                    error={error.demais_campos.reclamante_desempregado}
                    helperText={error.demais_campos.reclamante_desempregado ? 'Campo obrigatório' : ' '}
                />

                <NaoDesempregado
                    state={state[FormField.PEDIDO_GRATUIDADE_JUSTICA].value}
                    show={state[FormField.PEDIDO_GRATUIDADE_JUSTICA].value?.[PEDIDO_GRATUIDADE_JUSTICA.RECLAMANTE_DESEMPREGADO] === false}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                />
            </Grid>

            <FormButtons
                type={'back-next'}
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handleReclamanteDesempregadoChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RECLAMANTE_DESEMPREGADO',
            field: FormField.PEDIDO_GRATUIDADE_JUSTICA,
            value: value == 'true'
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step15.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    function getErrorsInitialState(): ErrorStep15 {
        const erros: ErrorStep15 = {
            demais_campos: {
                reclamante_desempregado: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep15 = {
            demais_campos: {
                reclamante_desempregado: false
            }
        }

        const demais_campos = state[FormField.PEDIDO_GRATUIDADE_JUSTICA].value

        if (demais_campos || true) {
            erros.demais_campos.reclamante_desempregado =
                isFieldEmpty(demais_campos?.[PEDIDO_GRATUIDADE_JUSTICA.RECLAMANTE_DESEMPREGADO] as boolean)
        }

        return (
            false
            || someTruthyValue(erros.demais_campos)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.PEDIDO_GRATUIDADE_JUSTICA].value?.[PEDIDO_GRATUIDADE_JUSTICA.RECLAMANTE_DESEMPREGADO] as boolean)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, reclamante_desempregado: true } } })
        else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, reclamante_desempregado: false } } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step15: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step15: { error: false, show: false } } })
    }
}
