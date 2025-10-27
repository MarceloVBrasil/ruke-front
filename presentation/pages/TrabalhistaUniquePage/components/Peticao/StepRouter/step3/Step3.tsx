
"üse client"

import { Box, SelectChangeEvent, Typography, Grid } from '@mui/material'
import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import axios from 'axios';
import { PASSOS } from '../helper/passos';
import { updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import { FormField, FormState } from './helper/FormTypesAndFields';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import { isFieldEmpty } from '@/app/utils/validators';
import GridSelectField from '@/presentation/components/GridSelectField';
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import FormButtons from '@/presentation/components/FormButtons';
import { IStep } from '../StepRouter';


export default function Step3({ api_data, stepsError, setStepsError }: IStep) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(true)
    const [cities, setCities] = useState<string[]>([])
    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)

    interface ErrorStep3 {
        estado_acao: boolean
        cidade_acao: boolean
        local_selecionado_corresponde: boolean
        local_selecionado: boolean
    }

    const [error, setError] = useState<ErrorStep3>(getErrorsInitialState())

    useMemo(() => {
        if (state[FormField.ESTADO_ACAO].value) {
            getCitiesFrom(state[FormField.ESTADO_ACAO].value).then(setCities);
        }
    }, [state[FormField.ESTADO_ACAO].value]);

    useEffect(() => {
        validateStep()
        if (stepsError.step3.show) checkErrors()
    }, [stepsError.step3])

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
        router.push(`${pathname}?step=4`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=2`);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='3' titulo={PASSOS.step3.titulo} />

            <Grid container spacing={2} sx={{ pr: 2, pl: 1 }}>

                <GridSelectField
                    xs={12} sm={6}
                    error={error.estado_acao}
                    helperText={error.estado_acao ? 'Estado é obrigatório' : ' '}
                    label='Selecione o estado em que você irá propor a ação*:'
                    placeholder='Estado'
                    name={FormField.ESTADO_ACAO}
                    value={state[FormField.ESTADO_ACAO].value}
                    onChange={handleChange}
                    variant="filled"
                    options={estados_brasileiros}
                />

                <GridSelectField
                    xs={12} sm={6}
                    label='Selecione a cidade em que você irá propor a ação*'
                    error={error.cidade_acao}
                    helperText={error.cidade_acao ? 'Cidade é obrigatória' : ' '}
                    placeholder='Cidade'
                    options={cities.map(city => { return { descricao: city, value: city } })}
                    fullWidth
                    name={FormField.CIDADE_ACAO}
                    value={state[FormField.CIDADE_ACAO].value}
                    onChange={handleChange}
                    variant="filled"
                />

                <GridRadioGroup
                    sectionTitle={'O local selecionado corresponde à jurisdição do local da prestação de serviços?* '}
                    xs={12}
                    error={error.local_selecionado_corresponde}
                    helperText={error.local_selecionado_corresponde ? 'Campo Local Selecionado Corresponde é obrigatório' : ' '}
                    name={FormField.LOCAL_SELECIONADO_CORRESPONDE}
                    value={state[FormField.LOCAL_SELECIONADO_CORRESPONDE].value}
                    onChange={handleBooleanField}
                    options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                />

                <GridRadioGroup
                    sectionTitle=''
                    xs={12}
                    error={error.local_selecionado}
                    helperText={error.local_selecionado ? 'Local Selecionado é obrigatório' : ' '}
                    name={FormField.LOCAL_SELECIONADO}
                    value={state[FormField.LOCAL_SELECIONADO].value}
                    onChange={handleChange}
                    options={[{ descricao: 'Escolhi o local da contratação', value: 'local_contratacao' }, { descricao: 'Quero ajuizar no domicílio do reclamante', value: 'domicilio_reclamante' }]}
                    style={{
                        paddingLeft: 40, paddingTop: 0, marginTop: -25,
                        visibility: state[FormField.LOCAL_SELECIONADO_CORRESPONDE].value ? 'hidden' : 'visible'
                    }}

                />
            </Grid>

            <FormButtons
                type='back-next'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_FIELD',
            field: name as keyof FormState,
            value,
        });
    }

    function handleBooleanField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_BOOLEAN_FIELD',
            field: name as keyof FormState,
            value: value == 'true',
        });
    }

    async function submitForm() {
        const etapa = PASSOS.step3.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    async function getCitiesFrom(uf_estado: string) {

        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf_estado}/municipios`)
            const data = response.data
            const cities = data.map((d: any) => d.nome)
            return cities

        } catch (error) {

        }
    }

    function getErrorsInitialState(): ErrorStep3 {
        const erros: ErrorStep3 = {
            estado_acao: false,
            cidade_acao: false,
            local_selecionado_corresponde: false,
            local_selecionado: false
        }

        return erros
    }

    function isFormInvalid(): boolean {

        return (
            isFieldEmpty(state[FormField.LOCAL_SELECIONADO_CORRESPONDE].value)
            || isFieldEmpty(state[FormField.CIDADE_ACAO].value)
            || isFieldEmpty(state[FormField.ESTADO_ACAO].value)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.LOCAL_SELECIONADO_CORRESPONDE].value)) setError(prev => { return { ...prev, local_selecionado_corresponde: true } })
        else setError(prev => { return { ...prev, local_selecionado_corresponde: false } })

        if (isFieldEmpty(state[FormField.CIDADE_ACAO].value)) setError(prev => { return { ...prev, cidade_acao: true } })
        else setError(prev => { return { ...prev, cidade_acao: false } })

        if (isFieldEmpty(state[FormField.ESTADO_ACAO].value)) setError(prev => { return { ...prev, estado_acao: true } })
        else setError(prev => { return { ...prev, estado_acao: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step3: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step3: { error: false, show: false } } })
    }
}
