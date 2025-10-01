// "use client";

import { Grid, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cep } from '@/app/types/cep';
import { PASSOS } from '../helper/passos';
import { updateSuperendividamentoTicket } from '@/app/api/server/superendividamento';
import { getSuperendividamentoTicketIdFromURL } from '../helper/getSuperendividamentoTicketIdFromURL';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import { FormField, FormState } from './helper/FormTypesAndFields';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { formatCepInput, formatCpf } from '@/app/utils/Formater';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import { isCepValid, isCpfValid, isEmailValid, isFieldEmpty, isStringNumberNegative } from '@/app/utils/validators';
import GridTextField from '@/presentation/components/GridTextField';
import GridSelectField from '@/presentation/components/GridSelectField';
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';
import { estado_civil } from './helper/EstadoCivil';
import FormButtons from '@/presentation/components/FormButtons';
import { getAddressByCep } from '@/app/api/client/outros';
import { IStep } from '../StepRouter';

export default function Step1({ api_data, setStepsError, stepsError }: IStep) {
    const router = useRouter();
    const pathname = usePathname();
    const ticketId = getSuperendividamentoTicketIdFromURL(pathname)

    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(false)

    interface ErrorStep1 {
        nome_cliente: boolean
        cpf_cliente: boolean
        data_nascimento_cliente: boolean
        estado_civil_cliente: boolean
        profissao_cliente: boolean
        cep_cliente: boolean
        rua_cliente: boolean
        numero_cliente: boolean
        complemento_cliente: boolean
        bairro_cliente: boolean
        cidade_cliente: boolean
        estado_cliente: boolean
        rg_cliente: boolean
        email_cliente: boolean
    }

    const [error, setError] = useState<ErrorStep1>(getErrorsInitialState());

    const handleNextClick = () => {
        validateStep()

        if (formHasChanged) submitForm();
        goToNextStep();
    };

    const goToNextStep = () => {
        router.push(`${pathname}?step=2`);
    };

    useEffect(() => {

        if (formHasChanged && isCepValid(state[FormField.CEP_CLIENTE].value)) {
            getEnderecoByCep(state[FormField.CEP_CLIENTE].value);
        }
    }, [state[FormField.CEP_CLIENTE].value]);

    useEffect(() => {
        validateStep()
        if (stepsError.step1.show) checkErrors()
    }, [stepsError.step1])

    return (
        <React.Fragment>
            <FormPageTitle passo='1' titulo={PASSOS.step1.titulo} />
            <Grid container spacing={2} sx={{ pt: 4, pl: 1, pr: 2.5 }}>

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Nome do Cliente*'
                    error={error.nome_cliente}
                    helperText={error.nome_cliente ? 'Nome do cliente é obrigatório' : ' '}
                    name={FormField.NOME_CLIENTE}
                    value={state[FormField.NOME_CLIENTE].value}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Nome do Cliente"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />


                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='CPF do Cliente*'
                    placeholder='CPF do cliente'
                    error={error.cpf_cliente}
                    helperText={error.cpf_cliente ? 'CPF do cliente é obrigatório' : ' '}
                    fullWidth
                    name={FormField.CPF_CLIENTE}
                    value={formatCpf(state[FormField.CPF_CLIENTE].value)}
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='RG do Cliente*'
                    placeholder='RG do cliente'
                    error={error.rg_cliente}
                    helperText={error.rg_cliente ? 'RG do cliente é obrigatório' : ' '}
                    fullWidth
                    name={FormField.RG_CLIENTE}
                    value={(state[FormField.RG_CLIENTE].value)}
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Email do Cliente*'
                    placeholder='Email do cliente'
                    error={error.email_cliente}
                    helperText={error.email_cliente ? 'Email do cliente é obrigatório' : ' '}
                    fullWidth
                    name={FormField.EMAIL_CLIENTE}
                    value={state[FormField.EMAIL_CLIENTE].value}
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Data de Nascimento*'
                    error={error.nome_cliente}
                    helperText={error.nome_cliente ? 'Data de Nascimento do cliente é obrigatório' : ' '}
                    name={FormField.DATA_NASCIMENTO_CLIENTE}
                    fullWidth
                    type="date"
                    placeholder="Digite a data Requerimento"
                    variant="outlined"
                    value={state[FormField.DATA_NASCIMENTO_CLIENTE].value}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />

                <GridSelectField
                    xs={12} sm={6} lg={4}
                    label='Estado Civil*'
                    placeholder='Estado Civil'
                    error={error.estado_civil_cliente}
                    helperText={error.estado_civil_cliente ? 'Estado Civil do cliente é obrigatório' : ' '}
                    name={FormField.ESTADO_CIVIL_CLIENTE}
                    value={state[FormField.ESTADO_CIVIL_CLIENTE].value}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    options={estado_civil}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Profissão*'
                    error={error.profissao_cliente}
                    helperText={error.profissao_cliente ? 'Profissão do cliente é obrigatória' : ' '}
                    name={FormField.PROFISSAO_CLIENTE}
                    value={state[FormField.PROFISSAO_CLIENTE].value}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Profissão"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='CEP*'
                    placeholder='CEP'
                    error={error.cep_cliente}
                    helperText={error.cep_cliente ? 'CEP do cliente é obrigatório' : ' '}
                    fullWidth
                    name={FormField.CEP_CLIENTE}
                    value={formatCepInput(state[FormField.CEP_CLIENTE].value)}
                    onChange={handleChange}
                    variant={'outlined'}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Rua*'
                    error={error.rua_cliente}
                    helperText={error.rua_cliente ? 'Rua do cliente é obrigatório' : ' '}
                    name={FormField.RUA_CLIENTE}
                    value={state[FormField.RUA_CLIENTE].value}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Rua"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Número*'
                    error={error.numero_cliente}
                    helperText={error.numero_cliente ? 'Número do endereço do cliente é obrigatório' : ' '}
                    type='number'
                    name={FormField.NUMERO_CLIENTE}
                    value={state[FormField.NUMERO_CLIENTE].value}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Número"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Complemento'
                    name={FormField.COMPLEMENTO_CLIENTE}
                    value={state[FormField.COMPLEMENTO_CLIENTE].value}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Complemento"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Bairro*'
                    error={error.bairro_cliente}
                    helperText={error.bairro_cliente ? 'Bairro do cliente é obrigatório' : ' '}
                    name={FormField.BAIRRO_CLIENTE}
                    value={state[FormField.BAIRRO_CLIENTE].value}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Bairro"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Cidade*'
                    error={error.cidade_cliente}
                    helperText={error.cidade_cliente ? 'Cidade do cliente é obrigatória' : ' '}
                    name={FormField.CIDADE_CLIENTE}
                    value={state[FormField.CIDADE_CLIENTE].value}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Cidade"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridSelectField
                    xs={12} sm={6} lg={4}
                    label='Estado*'
                    placeholder='Estado'
                    error={error.estado_cliente}
                    helperText={error.estado_cliente ? 'Estado do cliente é obrigatório' : ' '}
                    fullWidth
                    name={FormField.ESTADO}
                    value={state[FormField.ESTADO].value}
                    onChange={handleChange}
                    variant="outlined"
                    options={estados_brasileiros}
                />
            </Grid>

            <FormButtons
                type='next'
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    );

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

        const etapa = PASSOS.step1.etapa;
        const formChangedValues = getFormChangedValues(state);
        const data = { etapa, ...formChangedValues };

        try {
            const response = await updateSuperendividamentoTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    async function getEnderecoByCep(cep: string) {

        try {
            const data: cep = await getAddressByCep(cep)

            const filteredData = {
                [FormField.RUA_CLIENTE]: data.logradouro,
                [FormField.BAIRRO_CLIENTE]: data.bairro,
                [FormField.CIDADE_CLIENTE]: data.localidade,
                [FormField.ESTADO]: data.uf
            }

            dispatch({
                type: 'SET_FIELD',
                field: FormField.RUA_CLIENTE,
                value: filteredData[FormField.RUA_CLIENTE]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.BAIRRO_CLIENTE,
                value: filteredData[FormField.BAIRRO_CLIENTE]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.CIDADE_CLIENTE,
                value: filteredData[FormField.CIDADE_CLIENTE]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.ESTADO,
                value: filteredData[FormField.ESTADO]
            })

            setFormHasChanged(true)

        } catch (error) {
            console.log(error)
        }
    }

    function getErrorsInitialState(): ErrorStep1 {
        const erros: ErrorStep1 = {
            nome_cliente: false,
            cpf_cliente: false,
            data_nascimento_cliente: false,
            estado_civil_cliente: false,
            profissao_cliente: false,
            cep_cliente: false,
            rua_cliente: false,
            numero_cliente: false,
            complemento_cliente: false,
            bairro_cliente: false,
            cidade_cliente: false,
            estado_cliente: false,
            rg_cliente: false,
            email_cliente: false
        }

        return erros
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state[FormField.BAIRRO_CLIENTE].value)
            || isFieldEmpty(state[FormField.CIDADE_CLIENTE].value)
            || isFieldEmpty(state[FormField.DATA_NASCIMENTO_CLIENTE].value)
            || isFieldEmpty(state[FormField.ESTADO].value)
            || isFieldEmpty(state[FormField.ESTADO_CIVIL_CLIENTE].value)
            || isFieldEmpty(state[FormField.NOME_CLIENTE].value)
            || isFieldEmpty(state[FormField.NUMERO_CLIENTE].value)
            || isStringNumberNegative(state[FormField.NUMERO_CLIENTE].value)
            || isFieldEmpty(state[FormField.PROFISSAO_CLIENTE].value)
            || isFieldEmpty(state[FormField.RUA_CLIENTE].value)
            || !isCepValid(state[FormField.CEP_CLIENTE].value)
            || !isCpfValid(state[FormField.CPF_CLIENTE].value)
            || !isEmailValid(state[FormField.EMAIL_CLIENTE].value)
            || isFieldEmpty(state[FormField.RG_CLIENTE].value)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.BAIRRO_CLIENTE].value)) setError(prev => { return { ...prev, bairro_cliente: true } })
        else setError(prev => { return { ...prev, bairro_cliente: false } })

        if (!isCepValid(state[FormField.CEP_CLIENTE].value)) setError(prev => { return { ...prev, cep_cliente: true } })
        else setError(prev => { return { ...prev, cep_cliente: false } })

        if (!isCpfValid(state[FormField.CPF_CLIENTE].value)) setError(prev => { return { ...prev, cpf_cliente: true } })
        else setError(prev => { return { ...prev, cpf_cliente: false } })

        if (!isEmailValid(state[FormField.EMAIL_CLIENTE].value)) setError(prev => { return { ...prev, email_cliente: true } })
        else setError(prev => { return { ...prev, email_cliente: false } })

        if (isFieldEmpty(state[FormField.RG_CLIENTE].value)) setError(prev => { return { ...prev, rg_cliente: true } })
        else setError(prev => { return { ...prev, rg_cliente: false } })

        if (isFieldEmpty(state[FormField.CIDADE_CLIENTE].value)) setError(prev => { return { ...prev, cidade_cliente: true } })
        else setError(prev => { return { ...prev, cidade_cliente: false } })

        if (isFieldEmpty(state[FormField.DATA_NASCIMENTO_CLIENTE].value)) setError(prev => { return { ...prev, data_nascimento_cliente: true } })
        else setError(prev => { return { ...prev, data_nascimento_cliente: false } })

        if (isFieldEmpty(state[FormField.ESTADO].value)) setError(prev => { return { ...prev, estado_cliente: true } })
        else setError(prev => { return { ...prev, estado_cliente: false } })

        if (isFieldEmpty(state[FormField.ESTADO_CIVIL_CLIENTE].value)) setError(prev => { return { ...prev, estado_civil_cliente: true } })
        else setError(prev => { return { ...prev, estado_civil_cliente: false } })


        if (isFieldEmpty(state[FormField.NOME_CLIENTE].value)) setError(prev => { return { ...prev, nome_cliente: true } })
        else setError(prev => { return { ...prev, nome_cliente: false } })


        if (isFieldEmpty(state[FormField.NUMERO_CLIENTE].value)) setError(prev => { return { ...prev, numero_cliente: true } })
        else if (isStringNumberNegative(state[FormField.NUMERO_CLIENTE].value)) setError(prev => { return { ...prev, numero_cliente: true } })
        else setError(prev => { return { ...prev, numero_cliente: false } })

        if (isFieldEmpty(state[FormField.PROFISSAO_CLIENTE].value)) setError(prev => { return { ...prev, profissao_cliente: true } })
        else setError(prev => { return { ...prev, profissao_cliente: false } })

        if (isFieldEmpty(state[FormField.RUA_CLIENTE].value)) setError(prev => { return { ...prev, rua_cliente: true } })
        else setError(prev => { return { ...prev, rua_cliente: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step1: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step1: { error: false, show: false } } })
    }
}
