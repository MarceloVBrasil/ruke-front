"use client";

import { Autocomplete, Button, FormControl, FormHelperText, Grid, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React, { useEffect, useReducer, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cep } from '@/app/types/cep';
import { PASSOS } from '../helper/passos';
import { getTrabalhistaTicketById, updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import { formReducer, getFormInitialState, getFormStateFromApi } from './helper/ReducerFunctions';
import { FormField, FormState } from './helper/FormTypesAndFields';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { formatCepInput, formatCpf } from '@/app/utils/Formater';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import { isCepValid, isCpfValid, isFieldEmpty, isStringNumberNegative } from '@/app/utils/validators';
import GridTextField from '@/presentation/components/GridTextField';
import GridSelectField from '@/presentation/components/GridSelectField';
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';
import { estado_civil } from '../helper/EstadoCivil';
import FormButtons from '@/presentation/components/FormButtons';
import { getAddressByCep } from '@/app/api/client/outros';
import { IStep } from '../StepRouter';
import { DOENCAS } from './helper/Doencas';

export default function Step1({ api_data, stepsError, setStepsError }: IStep) {
    const router = useRouter();
    const pathname = usePathname();
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)

    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(false)

    interface ErrorStep1 {
        nome_reclamante: boolean
        nacionalidade_reclamante: boolean
        cpf_reclamante: boolean
        data_nascimento_reclamante: boolean
        estado_civil_reclamante: boolean
        profissao_reclamante: boolean
        cep_reclamante: boolean
        rua_reclamante: boolean
        numero_reclamante: boolean
        complemento_reclamante: boolean
        bairro_reclamante: boolean
        cidade_reclamante: boolean
        estado_reclamante: boolean
        doenca_reclamante: boolean
    }

    const [error, setError] = useState<ErrorStep1>(getErrorsInitialState())

    const handleNextClick = () => {
        validateStep()

        if (formHasChanged) submitForm();
        goToNextStep();
    };

    const goToNextStep = () => {
        router.push(`${pathname}?step=2`);
    };

    useEffect(() => {

        if (isCepValid(state[FormField.CEP_RECLAMANTE].value)) {
            getEnderecoByCep(state[FormField.CEP_RECLAMANTE].value);
        }
    }, [state[FormField.CEP_RECLAMANTE].value]);

    useEffect(() => {
        validateStep()
        if (stepsError.step1.show) checkErrors()
    }, [stepsError.step1])

    return (
        <React.Fragment>
            <FormPageTitle passo='1' titulo={PASSOS.step1.titulo} />

            <Grid container spacing={2} sx={{ pt: 4, pr: 2, pl: 1 }}>

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Nome do Reclamante*'
                    error={error.nome_reclamante}
                    helperText={error.nome_reclamante ? 'Nome do reclamante é obrigatório' : ' '}
                    name={FormField.NOME_RECLAMANTE}
                    value={state[FormField.NOME_RECLAMANTE].value}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Nome do Reclamante"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Nacionalidade do Reclamante*'
                    error={error.nacionalidade_reclamante}
                    helperText={error.nacionalidade_reclamante ? 'Nacionalidade do reclamante é obrigatório' : ' '}
                    name={FormField.NACIONALIDADE_RECLAMENTE}
                    value={state[FormField.NACIONALIDADE_RECLAMENTE].value}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Nacionalidade do Reclamante"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />


                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='CPF do Reclamante*'
                    placeholder='CPF do reclamante'
                    error={error.cpf_reclamante}
                    helperText={error.cpf_reclamante ? 'CPF do reclamante é obrigatório' : ' '}
                    fullWidth
                    name={FormField.CPF_RECLAMANTE}
                    value={formatCpf(state[FormField.CPF_RECLAMANTE].value)}
                    onChange={handleChange}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Data de Nascimento*'
                    error={error.data_nascimento_reclamante}
                    helperText={error.data_nascimento_reclamante ? 'Data de Nascimento do reclamante é obrigatório' : ' '}
                    name={FormField.DATA_NASCIMENTO_RECLAMANTE}
                    fullWidth
                    type="date"
                    placeholder="Digite a data Requerimento"
                    variant="outlined"
                    value={state[FormField.DATA_NASCIMENTO_RECLAMANTE].value}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                />

                <GridSelectField
                    xs={12} sm={6} lg={4}
                    label='Estado Civil*'
                    placeholder='Estado Civil'
                    error={error.estado_civil_reclamante}
                    helperText={error.estado_civil_reclamante ? 'Estado Civil do reclamante é obrigatório' : ' '}
                    name={FormField.ESTADO_CIVIL_RECLAMANTE}
                    value={state[FormField.ESTADO_CIVIL_RECLAMANTE].value}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    options={estado_civil}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Profissão*'
                    error={error.profissao_reclamante}
                    helperText={error.profissao_reclamante ? 'Profissão do reclamante é obrigatória' : ' '}
                    name={FormField.PROFISSAO_RECLAMANTE}
                    value={state[FormField.PROFISSAO_RECLAMANTE].value}
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
                    error={error.cep_reclamante}
                    helperText={error.cep_reclamante ? 'CEP do reclamante é obrigatório' : ' '}
                    fullWidth
                    name={FormField.CEP_RECLAMANTE}
                    value={formatCepInput(state[FormField.CEP_RECLAMANTE].value)}
                    onChange={handleChange}
                    variant={'outlined'}
                />

                <GridTextField
                    xs={12} sm={6} lg={4}
                    label='Rua*'
                    error={error.rua_reclamante}
                    helperText={error.rua_reclamante ? 'Rua do reclamante é obrigatório' : ' '}
                    name={FormField.RUA_RECLAMANTE}
                    value={state[FormField.RUA_RECLAMANTE].value}
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
                    error={error.numero_reclamante}
                    helperText={error.numero_reclamante ? 'Número do endereço do reclamante é obrigatório' : ' '}
                    type='number'
                    name={FormField.NUMERO_RECLAMANTE}
                    value={state[FormField.NUMERO_RECLAMANTE].value}
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
                    name={FormField.COMPLEMENTO_RECLAMANTE}
                    value={state[FormField.COMPLEMENTO_RECLAMANTE].value}
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
                    error={error.bairro_reclamante}
                    helperText={error.bairro_reclamante ? 'Bairro do reclamante é obrigatório' : ' '}
                    name={FormField.BAIRRO_RECLAMANTE}
                    value={state[FormField.BAIRRO_RECLAMANTE].value}
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
                    error={error.cidade_reclamante}
                    helperText={error.cidade_reclamante ? 'Cidade do reclamante é obrigatória' : ' '}
                    name={FormField.CIDADE_RECLAMANTE}
                    value={state[FormField.CIDADE_RECLAMANTE].value}
                    onChange={handleChange}
                    required
                    fullWidth
                    placeholder="Cidade"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />

                <GridSelectField
                    xs={12}
                    label='Estado*'
                    placeholder='Estado'
                    error={error.estado_reclamante}
                    helperText={error.estado_reclamante ? 'Estado do reclamante é obrigatório' : ' '}
                    fullWidth
                    name={FormField.ESTADO}
                    value={state[FormField.ESTADO].value}
                    onChange={handleChange}
                    variant="outlined"
                    options={estados_brasileiros}
                />
            </Grid>

            <FormControl fullWidth error={false}>
                <Autocomplete
                    clearText='limpar'
                    sx={{ pr: 1.5, pl: 1 }}
                    multiple
                    id="tags-standard"
                    options={DOENCAS}
                    getOptionLabel={(option) => option}
                    disableCloseOnSelect
                    onChange={handleDoencasReclamanteChange}
                    value={state[FormField.DOENCA_RECLAMANTE].value}
                    renderOption={(props, option, { selected }) => (
                        <MenuItem
                            value={option}
                            sx={{ justifyContent: "space-between" }}
                            {...props}
                        >
                            {selected ? <CheckIcon color="info" /> : null}
                            {option}
                        </MenuItem>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            fullWidth
                            name={FormField.DOENCA_RECLAMANTE}
                            placeholder={isFieldEmpty(state[FormField.DOENCA_RECLAMANTE].value) ? 'Doença do Reclamante' : ''}
                        />
                    )}
                />
                <FormHelperText>{error.doenca_reclamante ? 'Campo doença do reclamante é obrigatório' : ' '}</FormHelperText>
            </FormControl>

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

    function handleDoencasReclamanteChange(event: React.ChangeEvent<{}>, selectedDoencas: string[]) {

        setFormHasChanged(true)

        dispatch({
            type: 'DOENCA_RECLAMANTE_SET_FIELD',
            field: FormField.DOENCA_RECLAMANTE,
            value: selectedDoencas
        })
    }

    async function submitForm() {

        const etapa = PASSOS.step1.etapa;
        const formChangedValues = getFormChangedValues(state);
        const data = { etapa, ...formChangedValues };

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    async function getEnderecoByCep(cep: string) {

        try {
            const data: cep = await getAddressByCep(cep)

            const filteredData = {
                [FormField.RUA_RECLAMANTE]: data.logradouro,
                [FormField.BAIRRO_RECLAMANTE]: data.bairro,
                [FormField.CIDADE_RECLAMANTE]: data.localidade,
                [FormField.ESTADO]: data.uf
            }

            dispatch({
                type: 'SET_FIELD',
                field: FormField.RUA_RECLAMANTE,
                value: filteredData[FormField.RUA_RECLAMANTE]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.BAIRRO_RECLAMANTE,
                value: filteredData[FormField.BAIRRO_RECLAMANTE]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.CIDADE_RECLAMANTE,
                value: filteredData[FormField.CIDADE_RECLAMANTE]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.ESTADO,
                value: filteredData[FormField.ESTADO]
            })

        } catch (error) {
            console.log(error)
        }
    }

    function getErrorsInitialState(): ErrorStep1 {
        const erros: ErrorStep1 = {
            nome_reclamante: false,
            cpf_reclamante: false,
            data_nascimento_reclamante: false,
            estado_civil_reclamante: false,
            profissao_reclamante: false,
            cep_reclamante: false,
            rua_reclamante: false,
            numero_reclamante: false,
            complemento_reclamante: false,
            bairro_reclamante: false,
            cidade_reclamante: false,
            estado_reclamante: false,
            nacionalidade_reclamante: false,
            doenca_reclamante: false
        }

        return erros
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state[FormField.BAIRRO_RECLAMANTE].value)
            || isFieldEmpty(state[FormField.CIDADE_RECLAMANTE].value)
            || isFieldEmpty(state[FormField.DATA_NASCIMENTO_RECLAMANTE].value)
            || isFieldEmpty(state[FormField.ESTADO].value)
            || isFieldEmpty(state[FormField.ESTADO_CIVIL_RECLAMANTE].value)
            || isFieldEmpty(state[FormField.NOME_RECLAMANTE].value)
            || isFieldEmpty(state[FormField.NUMERO_RECLAMANTE].value)
            || isStringNumberNegative(state[FormField.NUMERO_RECLAMANTE].value)
            || isFieldEmpty(state[FormField.NUMERO_RECLAMANTE].value)
            || isFieldEmpty(state[FormField.PROFISSAO_RECLAMANTE].value)
            || isFieldEmpty(state[FormField.RUA_RECLAMANTE].value)
            || !isCepValid(state[FormField.CEP_RECLAMANTE].value)
            || !isCpfValid(state[FormField.CPF_RECLAMANTE].value)
            || isFieldEmpty(state[FormField.NACIONALIDADE_RECLAMENTE].value)
            // || isFieldEmpty(state[FormField.DOENCA_RECLAMANTE].value)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.BAIRRO_RECLAMANTE].value)) setError(prev => { return { ...prev, bairro_reclamante: true } })
        else setError(prev => { return { ...prev, bairro_reclamante: false } })

        if (!isCepValid(state[FormField.CEP_RECLAMANTE].value)) setError(prev => { return { ...prev, cep_reclamante: true } })
        else setError(prev => { return { ...prev, cep_reclamante: false } })

        if (!isCpfValid(state[FormField.CPF_RECLAMANTE].value)) setError(prev => { return { ...prev, cpf_reclamante: true } })
        else setError(prev => { return { ...prev, cpf_reclamante: false } })

        if (isFieldEmpty(state[FormField.CIDADE_RECLAMANTE].value)) setError(prev => { return { ...prev, cidade_reclamante: true } })
        else setError(prev => { return { ...prev, cidade_reclamante: false } })

        if (isFieldEmpty(state[FormField.DATA_NASCIMENTO_RECLAMANTE].value)) setError(prev => { return { ...prev, data_nascimento_reclamante: true } })
        else setError(prev => { return { ...prev, data_nascimento_reclamante: false } })

        if (isFieldEmpty(state[FormField.ESTADO].value)) setError(prev => { return { ...prev, estado_reclamante: true } })
        else setError(prev => { return { ...prev, estado_reclamante: false } })

        if (isFieldEmpty(state[FormField.ESTADO_CIVIL_RECLAMANTE].value)) setError(prev => { return { ...prev, estado_civil_reclamante: true } })
        else setError(prev => { return { ...prev, estado_civil_reclamante: false } })


        if (isFieldEmpty(state[FormField.NOME_RECLAMANTE].value)) setError(prev => { return { ...prev, nome_reclamante: true } })
        else setError(prev => { return { ...prev, nome_reclamante: false } })


        if (isFieldEmpty(state[FormField.NUMERO_RECLAMANTE].value)) setError(prev => { return { ...prev, numero_reclamante: true } })
        else if (isStringNumberNegative(state[FormField.NUMERO_RECLAMANTE].value)) setError(prev => { return { ...prev, numero_reclamante: true } })
        else setError(prev => { return { ...prev, numero_reclamante: false } })

        if (isFieldEmpty(state[FormField.PROFISSAO_RECLAMANTE].value)) setError(prev => { return { ...prev, profissao_reclamante: true } })
        else setError(prev => { return { ...prev, profissao_reclamante: false } })

        if (isFieldEmpty(state[FormField.RUA_RECLAMANTE].value)) setError(prev => { return { ...prev, rua_reclamante: true } })
        else setError(prev => { return { ...prev, rua_reclamante: false } })

        if (isFieldEmpty(state[FormField.NACIONALIDADE_RECLAMENTE].value)) setError(prev => { return { ...prev, nacionalidade_reclamante: true } })
        else setError(prev => { return { ...prev, nacionalidade_reclamante: false } })

        // if (isFieldEmpty(state[FormField.DOENCA_RECLAMANTE].value)) setError(prev => { return { ...prev, doenca_reclamante: true } })
        // else setError(prev => { return { ...prev, doenca_reclamante: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step1: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step1: { error: false, show: false } } })
    }
}
