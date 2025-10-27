import { onlyNumber, formatCnpj, formatCpfCnpj, formatCepInput } from '@/app/utils/Formater';
import { indicesCorrecaoMonetaria } from '@/app/utils/indicesCorrecaoMonetaria';
import ModalComponent from '@/presentation/components/Modal';
import { ExpandMore } from '@mui/icons-material';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, FormHelperText, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { Box } from '@mui/system';
import { register } from 'module';
import React, { Dispatch, MutableRefObject } from 'react'
import { handleSubmit } from '../../BpcPage/helpers/Swal';
import { handleFormSubmit } from '../helpers/Swal';
import { SubmitHandler, FieldValues, SubmitErrorHandler, FieldErrors } from 'react-hook-form';
import { Tenant } from '@/app/types/tenant';
import GridTextField from '@/presentation/components/GridTextField';
import GridSelectField from '@/presentation/components/GridSelectField';
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { Btn } from '@/presentation/components/Button';

type FormDataCnpj = {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    ni: string;
    tipoEstabelecimento: string;
    nome_empresarial: string;
    nome_fantasia: string;
    razao_social: string;
}

type FormDataCep = {
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}

interface ICadastrarEmpresa {
    open: boolean
    formRef: MutableRefObject<HTMLFormElement | undefined>
    errors: FieldErrors<FieldValues>
    tenants: Tenant[]
    formDataCnpj: FormDataCnpj
    cnpj: string
    cep: string
    formDataCep: FormDataCep
    setFormDataCep: Dispatch<FormDataCep>
    setFormDataCnpj: Dispatch<FormDataCnpj>
    handleClose: Dispatch<void>
    handleOpen: Dispatch<void>
    handleSubmit: (onValid: SubmitHandler<FieldValues>, onInvalid?: SubmitErrorHandler<FieldValues> | undefined) => (e?: React.BaseSyntheticEvent) => Promise<void>
    setTenants: Dispatch<Tenant[]>
    setLoading: Dispatch<boolean>
    setOpen: Dispatch<boolean>
    register: (v: any) => any
    reset: (v: any) => any
    setCnpj: Dispatch<string>
    setCep: Dispatch<string>
    ContractValueMemo: (props: any) => JSX.Element
}

export default function ModalCadastrarEmpresa(props: ICadastrarEmpresa) {
    const {
        open,
        formRef,
        errors,
        tenants,
        formDataCnpj,
        cnpj,
        cep,
        formDataCep,
        handleClose,
        handleOpen,
        handleSubmit,
        setTenants,
        setLoading,
        setOpen,
        register,
        reset,
        setFormDataCnpj,
        setCnpj,
        setCep,
        setFormDataCep,
        ContractValueMemo
    } = props

    return (
        <ModalComponent
            nomeModal={"Cadastrar Empresa"}
            width="1000px"
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
        >
            <Box
                ref={formRef}
                component="form"
                noValidate
                onSubmit={handleSubmit(() => handleFormSubmit(formRef, tenants, setTenants, setLoading, setOpen))}
            >
                <Grid container spacing={2}>
                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='Nome'
                        placeholder='Digite o nome da empresa'
                        error={errors.nome ? true : false}
                        helperText={errors.nome?.message?.toString()}
                        value={`${formDataCnpj.nome_fantasia}`}
                        {...register("nome")}
                        onChange={(e) => {
                            setFormDataCnpj({
                                ...formDataCnpj,
                                nome_fantasia: e.target.value,
                            });
                            reset({
                                nome: e.target.value,
                            });
                        }}

                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='CNPJ'
                        placeholder='Digite o cnpj da empresa'
                        error={errors.cnpj ? true : false}
                        helperText={errors.cnpj?.message?.toString()}
                        {...register("cnpj")}
                        value={cnpj}
                        onChange={(e) => {
                            const value = onlyNumber(e.target.value);
                            setCnpj(formatCnpj(value));
                            reset({
                                cnpj: formatCpfCnpj(value),
                            });
                        }}

                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='Razão Social'
                        placeholder='Digite a razão social da empresa'
                        error={errors.razao_social ? true : false}
                        helperText={errors.razao_social?.message?.toString()}
                        value={`${formDataCnpj.razao_social}`}
                        {...register("razao_social")}
                        onChange={(e) =>
                            setFormDataCnpj({
                                ...formDataCnpj,
                                razao_social: e.target.value,
                            })}

                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='CEP'
                        placeholder='Digite o CEP'
                        error={errors.cep ? true : false}
                        helperText={errors.cep?.message?.toString()}
                        value={cep}
                        {...register("cep")}
                        onChange={(e) => setCep(formatCepInput(e.target.value))}

                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='Rua'
                        placeholder='Digite a Rua'
                        error={errors.rua ? true : false}
                        helperText={errors.rua?.message?.toString()}
                        value={`${formDataCep.logradouro}`}
                        {...register("rua")}
                        onChange={(e) =>
                            setFormDataCep({
                                ...formDataCep,
                                logradouro: e.target.value,
                            })}

                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='Número'
                        placeholder='Digite o número'
                        error={errors.numero ? true : false}
                        helperText={errors.numero?.message?.toString()}
                        {...register("numero")}

                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='Bairro'
                        placeholder='Digite o bairro'
                        error={errors.bairro ? true : false}
                        helperText={errors.bairro?.message?.toString()}
                        value={`${formDataCep.bairro}`}
                        {...register("bairro")}
                        onChange={(e) =>
                            setFormDataCep({ ...formDataCep, bairro: e.target.value })
                        }
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='Cidade'
                        placeholder='Digite a cidade'
                        error={errors.cidade ? true : false}
                        helperText={errors.cidade?.message?.toString()}
                        value={formDataCep.localidade}
                        {...register("cidade")}
                        onChange={(e) =>
                            setFormDataCep({
                                ...formDataCep,
                                localidade: e.target.value,
                            })}
                    />

                    <GridSelectField
                        xs={12}
                        sm={6}
                        label='Estado'
                        placeholder='Estado'
                        error={errors.estado ? true : false}
                        helperText={errors.estado?.message?.toString() || ' '}
                        fullWidth
                        name='estado'
                        variant="filled"
                        options={estados_brasileiros}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='Complemento'
                        placeholder='Digite o complemento'
                        error={errors.complemento ? true : false}
                        helperText={errors.complemento?.message?.toString()}
                        {...register("complemento")}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        multiline
                        variant='filled'
                        label='Contrato de Honorários'
                        placeholder='Digite o contrato de honorários'
                        error={errors.dados_contratado_contrato_honorarios_rmc ? true : false}
                        helperText={errors.dados_contratado_contrato_honorarios_rmc?.message?.toString()}
                        {...register("dados_contratado_contrato_honorarios_rmc")}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        multiline
                        variant='filled'
                        label='Procuração'
                        placeholder='Digite a procuração'
                        error={errors.dados_ourtorgado_procuracao_rmc ? true : false}
                        helperText={errors.dados_ourtorgado_procuracao_rmc?.message?.toString()}
                        {...register("dados_ourtorgado_procuracao_rmc")}
                    />

                    <Accordion
                        sx={{ width: "100%", margin: "25px", padding: "10px" }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    marginLeft: "10px",
                                }}
                            >
                                CONFIGURAÇÕES GERAIS DOS PROCESSOS RMC
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <GridCurrencyInput
                                    xs={12}
                                    sm={6}
                                    variant='filled'
                                    label={`Valor Danos Morais`}
                                    placeholder='Digite o valor de danos morais'
                                    {...register("danos_morais_rmc")}
                                    error={errors.danos_morais_rmc ? true : false}
                                    helperText={errors.danos_morais_rmc?.message?.toString()}
                                />

                                <GridTextField
                                    xs={12}
                                    sm={6}
                                    variant="filled"
                                    label="Percentual de Êxito"
                                    error={!!errors.percentual_exito_rmc}
                                    helperText={errors.percentual_exito_rmc?.message?.toString()}
                                    placeholder="Digite o Percentual de Êxito"
                                    fullWidth
                                    type="number"
                                    name="percentual_exito_rmc"
                                    endAdornment="%"
                                    {...register("percentual_exito_rmc")}
                                />

                                <GridSelectField
                                    xs={12}
                                    sm={6}
                                    label=' Índice de Correção Monetária'
                                    placeholder='Índice de correção monetária'
                                    error={errors.indice_correcao_monetaria_rmc ? true : false}
                                    helperText={errors.parcela_fixa_rmc?.message?.toString()}
                                    fullWidth
                                    name='estado'
                                    variant="filled"
                                    options={indicesCorrecaoMonetaria}
                                />

                                <GridTextField
                                    xs={12} sm={6}
                                    type='number'
                                    variant={'filled'}
                                    label='Juros de Mora'
                                    error={errors.juros_de_mora_calculo_rmc ? true : false}
                                    helperText={errors.juros_de_mora_calculo_rmc?.message?.toString()}
                                    placeholder="Digite os Juros de Mora"
                                    fullWidth
                                    name='juros_de_mora_calculo_rmc'
                                    endAdornment='%'
                                />

                                <GridCurrencyInput
                                    xs={12}
                                    variant='filled'
                                    label={`Parcela Fixa`}
                                    placeholder='Digite a Parcela Fixa'
                                    {...register("parcela_fixa_rmc")}
                                    error={errors.parcela_fixa_rmc ? true : false}
                                    helperText={errors.parcela_fixa_rmc?.message?.toString()}
                                />
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        sx={{ width: "100%", margin: "25px", padding: "10px" }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    marginLeft: "10px",
                                }}
                            >
                                CONFIGURAÇÕES GERAIS DOS PROCESSOS BPC
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <GridTextField
                                    xs={12}
                                    sm={6}
                                    variant="filled"
                                    label="Digite o Percentual de Êxito"
                                    error={errors.percentual_exito_bpc ? true : false}
                                    helperText={errors.percentual_exito_bpc?.message?.toString()}
                                    placeholder="Digite os percentual exito bpc"
                                    {...register("percentual_exito_bpc")}
                                    fullWidth
                                    type="number"
                                    name="percentual_exito_bpc"
                                    endAdornment="%"
                                />

                                <GridCurrencyInput
                                    xs={12}
                                    sm={6}
                                    variant='filled'
                                    label={`Parcela Fixa`}
                                    placeholder='Digite a Parcela Fixa'
                                    {...register("parcela_fixa_bpc")}
                                    error={errors.parcela_fixa_bpc ? true : false}
                                    helperText={errors.parcela_fixa_bpc?.message?.toString()}
                                />
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        sx={{ width: "100%", margin: "25px", padding: "10px" }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    marginLeft: "10px",
                                }}
                            >
                                CONFIGURAÇÕES GERAIS DOS PROCESSOS DE FRAUDE EM BOLETOS
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <GridCurrencyInput
                                    xs={12}
                                    sm={6}
                                    variant='filled'
                                    label={`Valor Danos Morais`}
                                    placeholder='Digite o valor de danos morais'
                                    {...register("danos_morais_rmc")}
                                    error={errors.danos_morais_rmc ? true : false}
                                    helperText={errors.danos_morais_rmc?.message?.toString()}
                                />

                                <GridTextField
                                    xs={12}
                                    sm={6}
                                    variant="filled"
                                    label="Digite o Percentual de Êxito"
                                    error={errors.percentual_exito_rmc ? true : false}
                                    helperText={errors.percentual_exito_rmc?.message?.toString()}
                                    placeholder="Digite o Percentual de Êxito"
                                    {...register("percentual_exito_rmc")}
                                    fullWidth
                                    type="number"
                                    name="percentual_exito_rmc"
                                    endAdornment="%"
                                />

                                <GridSelectField
                                    xs={12}
                                    sm={6}
                                    label=' Índice de Correção Monetária'
                                    placeholder='Índice de correção monetária'
                                    error={errors.indice_correcao_monetaria_rmc ? true : false}
                                    helperText={errors.parcela_fixa_rmc?.message?.toString()}
                                    fullWidth
                                    name='estado'
                                    variant="filled"
                                    options={indicesCorrecaoMonetaria}
                                />

                                <GridTextField
                                    xs={12} sm={6}
                                    type='number'
                                    variant={'filled'}
                                    label='Juros de Mora'
                                    error={errors.juros_de_mora_calculo_rmc ? true : false}
                                    helperText={errors.juros_de_mora_calculo_rmc?.message?.toString()}
                                    placeholder="Digite os Juros de Mora"
                                    fullWidth
                                    name='juros_de_mora_calculo_rmc'
                                    endAdornment='%'
                                />

                                <GridCurrencyInput
                                    xs={12}
                                    variant='filled'
                                    label={`Parcela Fixa`}
                                    placeholder='Digite a Parcela Fixa'
                                    {...register("parcela_fixa_rmc")}
                                    error={errors.parcela_fixa_rmc ? true : false}
                                    helperText={errors.parcela_fixa_rmc?.message?.toString()}
                                />

                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Btn
                    marginTop='10px'
                    width='200px'
                    text='Cadastrar'
                    type="submit"
                    variant="contained"
                />
            </Box>
        </ModalComponent>
    )
}
