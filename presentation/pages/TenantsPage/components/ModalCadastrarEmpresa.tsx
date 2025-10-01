import { onlyNumber, formatCnpj, formatCpfCnpj, formatCepInput } from '@/app/utils/Formater';
import { indicesCorrecaoMonetaria } from '@/domain/data/indicesCorrecaoMonetaria';
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
                    <Grid style={{ borderRadius: "30px" }} item xs={12} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Nome
                        </Typography>
                        <TextField
                            type="text"
                            autoComplete="Nome da empresa"
                            error={errors.nome ? true : false}
                            helperText={errors.nome?.message?.toString()}
                            required
                            placeholder="Digite o nome da Empresa"
                            fullWidth
                            id="nome"
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            CNPJ
                        </Typography>
                        <TextField
                            autoComplete="CNPJ"
                            error={errors.cnpj ? true : false}
                            helperText={errors.cnpj?.message?.toString()}
                            {...register("cnpj")}
                            required
                            fullWidth
                            placeholder="Digite o CNPJ"
                            value={cnpj}
                            onChange={(e) => {
                                const value = onlyNumber(e.target.value);
                                setCnpj(formatCnpj(value));
                                reset({
                                    cnpj: formatCpfCnpj(value),
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Razão Social
                        </Typography>
                        <TextField
                            autoComplete="Razão Social"
                            error={errors.razao_social ? true : false}
                            helperText={errors.razao_social?.message?.toString()}
                            fullWidth
                            placeholder="Digite a Razão Social"
                            value={`${formDataCnpj.razao_social}`}
                            {...register("razao_social")}
                            onChange={(e) =>
                                setFormDataCnpj({
                                    ...formDataCnpj,
                                    razao_social: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            CEP
                        </Typography>
                        <TextField
                            autoComplete="CEP"
                            required
                            error={errors.cep ? true : false}
                            helperText={errors.cep?.message?.toString()}
                            {...register("cep")}
                            fullWidth
                            value={cep}
                            placeholder="Digite o CEP"
                            onChange={(e) => setCep(formatCepInput(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Rua
                        </Typography>
                        <TextField
                            autoComplete="Rua"
                            error={errors.rua ? true : false}
                            helperText={errors.rua?.message?.toString()}
                            fullWidth
                            placeholder="Digite a Rua"
                            value={`${formDataCep.logradouro}`}
                            {...register("rua")}
                            onChange={(e) =>
                                setFormDataCep({
                                    ...formDataCep,
                                    logradouro: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Número
                        </Typography>
                        <TextField
                            autoComplete="Número"
                            error={errors.numero ? true : false}
                            helperText={errors.numero?.message?.toString()}
                            fullWidth
                            placeholder="Digite o Número"
                            {...register("numero")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Bairro
                        </Typography>
                        <TextField
                            autoComplete="Bairro"
                            error={errors.bairro ? true : false}
                            helperText={errors.bairro?.message?.toString()}
                            fullWidth
                            placeholder="Digite o Bairro"
                            value={`${formDataCep.bairro}`}
                            {...register("bairro")}
                            onChange={(e) =>
                                setFormDataCep({ ...formDataCep, bairro: e.target.value })
                            }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Cidade
                        </Typography>
                        <TextField
                            autoComplete="Cidade"
                            error={errors.cidade ? true : false}
                            helperText={errors.cidade?.message?.toString()}
                            fullWidth
                            placeholder="Digite a Cidade"
                            value={formDataCep.localidade}
                            {...register("cidade")}
                            onChange={(e) =>
                                setFormDataCep({
                                    ...formDataCep,
                                    localidade: e.target.value,
                                })
                            }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl
                            fullWidth
                            variant="filled"
                            error={errors.estado ? true : false}
                        >
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                Estado
                            </Typography>
                            <Select
                                variant="outlined"
                                sx={{ ml: 1, mt: 1, borderRadius: "10px" }}
                                id="estado"
                                error={errors.estado ? true : false}
                                {...register("estado")}
                            >
                                <MenuItem selected value="" disabled>
                                    Estado
                                </MenuItem>
                                <MenuItem value="AC">AC</MenuItem>
                                <MenuItem value="AL">AL</MenuItem>
                                <MenuItem value="AP">AP</MenuItem>
                                <MenuItem value="AM">AM</MenuItem>
                                <MenuItem value="BA">BA</MenuItem>
                                <MenuItem value="CE">CE</MenuItem>
                                <MenuItem value="DF">DF</MenuItem>
                                <MenuItem value="ES">ES</MenuItem>
                                <MenuItem value="GO">GO</MenuItem>
                                <MenuItem value="MA">MA</MenuItem>
                                <MenuItem value="MT">MT</MenuItem>
                                <MenuItem value="MS">MS</MenuItem>
                                <MenuItem value="MG">MG</MenuItem>
                                <MenuItem value="PA">PA</MenuItem>
                                <MenuItem value="PB">PB</MenuItem>
                                <MenuItem value="PR">PR</MenuItem>
                                <MenuItem value="PE">PE</MenuItem>
                                <MenuItem value="PI">PI</MenuItem>
                                <MenuItem value="RJ">RJ</MenuItem>
                                <MenuItem value="RN">RN</MenuItem>
                                <MenuItem value="RS">RS</MenuItem>
                                <MenuItem value="RO">RO</MenuItem>
                                <MenuItem value="RR">RR</MenuItem>
                                <MenuItem value="SC">SC</MenuItem>
                                <MenuItem value="SP">SP</MenuItem>
                                <MenuItem value="SE">SE</MenuItem>
                                <MenuItem value="TO">TO</MenuItem>
                            </Select>
                            {errors.estado ? (
                                <FormHelperText>
                                    {errors.estado?.message?.toString()}
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Complemento
                        </Typography>
                        <TextField
                            autoComplete="Complemento"
                            error={errors.complemento ? true : false}
                            helperText={errors.complemento?.message?.toString()}
                            {...register("complemento")}
                            required
                            fullWidth
                            placeholder="Digite o Complemento"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Contrato de Honorários
                        </Typography>
                        <TextField
                            multiline
                            rows={4}
                            autoComplete="Contrato de Honorários"
                            error={
                                errors.dados_contratado_contrato_honorarios_rmc
                                    ? true
                                    : false
                            }
                            helperText={errors.dados_contratado_contrato_honorarios_rmc?.message?.toString()}
                            {...register("dados_contratado_contrato_honorarios_rmc")}
                            fullWidth
                            placeholder="Digite os dados do Contrato de Honorários"
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Procuração
                        </Typography>
                        <TextField
                            multiline
                            rows={4}
                            autoComplete="Procuração"
                            error={errors.dados_ourtorgado_procuracao_rmc ? true : false}
                            helperText={errors.dados_ourtorgado_procuracao_rmc?.message?.toString()}
                            {...register("dados_ourtorgado_procuracao_rmc")}
                            fullWidth
                            placeholder="Digite os dados da Procuração"
                        />
                    </Grid>
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
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                CONFIGURAÇÕES GERAIS DOS PROCESSOS RMC
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Valor Danos Morais
                                    </Typography>
                                    <TextField
                                        autoComplete="Valor Danos Morais"
                                        error={errors.danos_morais_rmc ? true : false}
                                        helperText={errors.danos_morais_rmc?.message?.toString()}
                                        fullWidth
                                        placeholder="Digite o Valor dos Danos Morais"
                                        InputProps={{
                                            inputComponent: ContractValueMemo,
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        {...register("danos_morais_rmc")}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Percentual de Êxito
                                    </Typography>
                                    <TextField
                                        autoComplete="Percentual de Êxito"
                                        error={errors.percentual_exito_rmc ? true : false}
                                        helperText={errors.percentual_exito_rmc?.message?.toString()}
                                        {...register("percentual_exito_rmc")}
                                        fullWidth
                                        type="number"
                                        placeholder="Digite o Percentual de Êxito"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Índice de Correção Monetária
                                    </Typography>
                                    <TextField
                                        select
                                        autoComplete="Índice de Correção Monetária"
                                        error={
                                            errors.indice_correcao_monetaria_rmc ? true : false
                                        }
                                        helperText={errors.parcela_fixa_rmc?.message?.toString()}
                                        fullWidth
                                        {...register("indice_correcao_monetaria_rmc")}
                                    >
                                        {indicesCorrecaoMonetaria.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Juros de Mora
                                    </Typography>
                                    <TextField
                                        autoComplete="Juros de Mora"
                                        error={errors.juros_de_mora_calculo_rmc ? true : false}
                                        helperText={errors.juros_de_mora_calculo_rmc?.message?.toString()}
                                        fullWidth
                                        type="number"
                                        placeholder="Digite os Juros de Mora"
                                        {...register("juros_de_mora_calculo_rmc")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Parcela Fixa
                                    </Typography>
                                    <TextField
                                        multiline
                                        rows={4}
                                        autoComplete="Parcela Fixa"
                                        error={errors.parcela_fixa_rmc ? true : false}
                                        helperText={errors.parcela_fixa_rmc?.message?.toString()}
                                        fullWidth
                                        placeholder="Digite a Parcela Fixa"
                                        {...register("parcela_fixa_rmc")}
                                    />
                                </Grid>
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
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                CONFIGURAÇÕES GERAIS DOS PROCESSOS BPC
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Digite o Percentual de Êxito
                                    </Typography>
                                    <TextField
                                        type="number"
                                        autoComplete="Percentual de Êxito BPC"
                                        error={errors.percentual_exito_bpc ? true : false}
                                        helperText={errors.percentual_exito_bpc?.message?.toString()}
                                        fullWidth
                                        placeholder="Digite os percentual exito bpc"
                                        {...register("percentual_exito_bpc")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Parcela Fixa
                                    </Typography>
                                    <TextField
                                        multiline
                                        rows={4}
                                        type="text"
                                        autoComplete="Parcela fixa BPC"
                                        error={errors.parcela_fixa_bpc ? true : false}
                                        helperText={errors.parcela_fixa_bpc?.message?.toString()}
                                        fullWidth
                                        placeholder="Digite os parcela fixa bpc"
                                        {...register("parcela_fixa_bpc")}
                                    />
                                </Grid>
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
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                CONFIGURAÇÕES GERAIS DOS PROCESSOS DE FRAUDE EM BOLETOS
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Valor Danos Morais
                                    </Typography>
                                    <TextField
                                        autoComplete="Valor Danos Morais"
                                        error={errors.danos_morais_rmc ? true : false}
                                        helperText={errors.danos_morais_rmc?.message?.toString()}
                                        fullWidth
                                        placeholder="Digite o Valor dos Danos Morais"
                                        InputProps={{
                                            inputComponent: ContractValueMemo,
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        {...register("danos_morais_rmc")}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Percentual de Êxito
                                    </Typography>
                                    <TextField
                                        autoComplete="Percentual de Êxito"
                                        error={errors.percentual_exito_rmc ? true : false}
                                        helperText={errors.percentual_exito_rmc?.message?.toString()}
                                        {...register("percentual_exito_rmc")}
                                        fullWidth
                                        type="number"
                                        placeholder="Digite o Percentual de Êxito"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Índice de Correção Monetária
                                    </Typography>
                                    <TextField
                                        select
                                        autoComplete="Índice de Correção Monetária"
                                        error={
                                            errors.indice_correcao_monetaria_rmc ? true : false
                                        }
                                        helperText={errors.parcela_fixa_rmc?.message?.toString()}
                                        fullWidth
                                        {...register("indice_correcao_monetaria_rmc")}
                                    >
                                        {indicesCorrecaoMonetaria.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Juros de Mora
                                    </Typography>
                                    <TextField
                                        autoComplete="Juros de Mora"
                                        error={errors.juros_de_mora_calculo_rmc ? true : false}
                                        helperText={errors.juros_de_mora_calculo_rmc?.message?.toString()}
                                        fullWidth
                                        type="number"
                                        placeholder="Digite os Juros de Mora"
                                        {...register("juros_de_mora_calculo_rmc")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        Parcela Fixa
                                    </Typography>
                                    <TextField
                                        multiline
                                        rows={4}
                                        autoComplete="Parcela Fixa"
                                        error={errors.parcela_fixa_rmc ? true : false}
                                        helperText={errors.parcela_fixa_rmc?.message?.toString()}
                                        fullWidth
                                        placeholder="Digite a Parcela Fixa"
                                        {...register("parcela_fixa_rmc")}
                                    />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        padding: "15px",
                        borderRadius: "15px",
                        fontWeight: "bold",
                        fontSize: "18px",
                    }}
                >
                    Cadastrar
                </Button>
            </Box>
        </ModalComponent>
    )
}
