
"üse client"

import { Box, SelectChangeEvent, Typography, Grid } from '@mui/material'
import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import axios from 'axios';
import { PASSOS } from '../helper/passos';
import { updateSuperendividamentoTicket } from '@/app/api/server/superendividamento';
import { getSuperendividamentoTicketIdFromURL } from '../helper/getSuperendividamentoTicketIdFromURL';
import { FormField, FormState } from './helper/FormTypesAndFields';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import { isFieldEmpty } from '@/app/utils/validators';
import GridSelectField from '@/presentation/components/GridSelectField';
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import { acao_ajuizada_em } from './helper/AcaoAjuizadaEm';
import FormButtons from '@/presentation/components/FormButtons';
import { IStep } from '../StepRouter';


export default function Step2({ api_data, stepsError, setStepsError }: IStep) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(false)
    const [cities, setCities] = useState<string[]>([])

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getSuperendividamentoTicketIdFromURL(pathname)

    interface ErrorStep2 {
        estado_acao: boolean
        cidade_acao: boolean
        acao_ajuizada_em: boolean
    }

    const [error, setError] = useState<ErrorStep2>(getErrorsInitialState())

    useMemo(() => {
        if (state[FormField.ESTADO_ACAO].value) {
            getCitiesFrom(state[FormField.ESTADO_ACAO].value).then(setCities);
        }
    }, [state[FormField.ESTADO_ACAO].value]);

    useEffect(() => {
        validateStep()
        if (stepsError.step2.show) checkErrors()
    }, [stepsError.step2])

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
        router.push(`${pathname}?step=3`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=1`);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='2' titulo={PASSOS.step2.titulo} />
            <Box sx={{ boxShadow: 3, py: 2, mx: 1.5, borderRadius: 2 }}>
                <Typography sx={{ p: 2 }}>
                    A Recomendação do CNJ número 125/2021 propõe aos Tribunais dos Estados a criação de Núcleo de Conciliação e Mediação de Conflitos especial para tratamento do Superendividamento.
                </Typography>

                <Typography sx={{ px: 2 }}>
                    Assim, caso o Estado já possua o referido núcleo, recomenda-se dirigir a petição ao CEJUSC. caso contrário, recomenda-se dirigir a petição ã vara especializada em consumidor: bancária ou, em última instância, ãs varas cíveis comuns.
                </Typography>

            </Box>

            <Grid container spacing={2} sx={{ pr: 2 }}>
                <GridRadioGroup
                    xs={12} pt={6} pb={1}
                    sectionTitle='Ação Ajuizada em*'
                    error={error.acao_ajuizada_em}
                    helperText={error.acao_ajuizada_em ? 'Ação Ajuizada é obrigatória' : ' '}
                    name={FormField.ACAO_AJUIZADA_EM}
                    value={state[FormField.ACAO_AJUIZADA_EM].value}
                    onChange={handleChange}
                    options={acao_ajuizada_em}
                />

                <GridSelectField
                    xs={12} sm={6}
                    error={error.estado_acao}
                    helperText={error.estado_acao ? 'Estado é obrigatório' : ' '}
                    label='Selecione o estado em que você irá propor a ação*:'
                    placeholder='Estado'
                    name={FormField.ESTADO_ACAO}
                    value={state[FormField.ESTADO_ACAO].value}
                    onChange={handleChange}
                    variant="outlined"
                    options={estados_brasileiros}
                    style={{ position: 'relative', left: 8 }}
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
                    variant="outlined"
                    style={{ position: 'relative', left: 8 }}
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


    async function submitForm() {
        const etapa = PASSOS.step2.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        try {
            const response = await updateSuperendividamentoTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    async function getCitiesFrom(uf_estado: string) {

        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf_estado}/municipios`)
            const data = response.data
            const cities = data.map((d: any) => d.nome)
            return cities

        } catch (error) {
            console.log(error)
        }
    }

    function getErrorsInitialState(): ErrorStep2 {
        const erros: ErrorStep2 = {
            estado_acao: false,
            cidade_acao: false,
            acao_ajuizada_em: false
        }

        return erros
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state[FormField.ACAO_AJUIZADA_EM].value)
            || isFieldEmpty(state[FormField.CIDADE_ACAO].value)
            || isFieldEmpty(state[FormField.ESTADO_ACAO].value)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.ACAO_AJUIZADA_EM].value)) setError(prev => { return { ...prev, acao_ajuizada_em: true } })
        else setError(prev => { return { ...prev, acao_ajuizada_em: false } })

        if (isFieldEmpty(state[FormField.CIDADE_ACAO].value)) setError(prev => { return { ...prev, cidade_acao: true } })
        else setError(prev => { return { ...prev, cidade_acao: false } })

        if (isFieldEmpty(state[FormField.ESTADO_ACAO].value)) setError(prev => { return { ...prev, estado_acao: true } })
        else setError(prev => { return { ...prev, estado_acao: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step2: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step2: { error: false, show: false } } })
    }
}
