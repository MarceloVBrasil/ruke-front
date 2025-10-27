import { onlyNumber, formatCpf, formatCepInput } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, FormControl, Select, MenuItem, FormHelperText, Button, CircularProgress } from '@mui/material';
import { Box, width } from '@mui/system';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import GridTextField from '@/presentation/components/GridTextField';
import { estado_civil } from '@/domain/data/estado_civil';
import GridSelectField from '@/presentation/components/GridSelectField';
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';
import { Btn } from '@/presentation/components/Button';

interface IContratoHonorarios {
    ticket: any
    nameClient: string
    errorsContrato: any
    estadoCivil: string
    profissao: string
    cpfClient: string
    cep: string
    enderecoCompleto: string
    numero: string
    bairro: string
    complemento: string
    cidade: string
    estado: string
    regraDominio: any
    loadingContract: boolean
    date: string
    handleSubmitContrato: (value: any) => any
    criarContrato: (value?: any) => any
    setNameClient: (value: string) => void
    registerContrato: (value: string) => any
    setEstadoCivil: (value: any) => void
    resetContrato: (value: any) => void
    setProfissao: (value: string) => void
    setCPFClient: (value: string) => void
    setCep: (value: string) => void
    setEnderecoCompleto: (value: string) => void
    setNumero: (value: string) => void
    setBairro: (value: string) => void
    setComplemento: (value: string) => void
    setCidade: (value: string) => void
    setEstado: (value: any) => void
    setDate: (value: string) => void
}

export default function ContratoHonorarios(props: IContratoHonorarios) {
    const {
        ticket: api_data,
        nameClient,
        errorsContrato,
        estadoCivil,
        profissao,
        cpfClient,
        cep,
        enderecoCompleto,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
        regraDominio,
        loadingContract,
        date,
        handleSubmitContrato,
        criarContrato,
        setNameClient,
        registerContrato,
        setEstadoCivil,
        resetContrato,
        setProfissao,
        setCPFClient,
        setCep,
        setEnderecoCompleto,
        setNumero,
        setBairro,
        setComplemento,
        setCidade,
        setEstado,
        setDate
    } = props

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingBottom: 5,
                        width: '100%'
                    }}
                >
                    <Typography
                        style={{
                            marginRight: 10,
                            width: "100%",
                            color: "#00479d",
                        }}
                    >
                        CONTRATO DE HONORÁRIOS{" "}
                    </Typography>
                    {api_data && api_data.contrato_pdf && (
                        <Link
                            href={api_data.contrato_pdf}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<PictureAsPdfIcon sx={{ position: 'relative', top: 2, left: { xs: 3, lg: 0 } }} />}
                                label={`Download do PDF da Petição`}
                                color="default"
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />
                            <Chip
                                icon={<PictureAsPdfIcon sx={{ position: 'relative', top: 2, left: { xs: 3, lg: 0 } }} />}
                                color="default"
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    {api_data && api_data.contrato_word && (
                        <Link
                            href={api_data.contrato_word}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<ArticleIcon sx={{ position: 'relative', top: 2, left: { xs: 3, lg: 0 } }} />}
                                label={`Download do WORD da Petição`}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />
                            <Chip
                                icon={<ArticleIcon sx={{ position: 'relative', top: 2, left: { xs: 3, lg: 0 } }} />}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    <Chip
                        label={
                            api_data && api_data.contrato_pdf ? "Gerado!" : "Não gerada!"
                        }
                        color={api_data && api_data.contrato_pdf ? "success" : "warning"}
                        size="small"
                    />
                </Box>
            </AccordionSummary>
            <Accordion expanded>
                <AccordionSummary>
                    <Typography
                        sx={{
                            borderBottom: "2px solid #00479d",
                            color: "#00479d",
                            marginLeft: "10px",
                        }}
                    >
                        PREENCHA OS CAMPOS OBRIGATÓRIOS:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid
                        container
                        component="form"
                        id="form-contrato"
                        onSubmit={handleSubmitContrato(criarContrato)}
                        spacing={2}
                    >

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Nome'
                            placeholder='Nome'
                            variant='filled'
                            error={errorsContrato.nameClient ? true : false}
                            helperText={errorsContrato.nameClient?.message?.toString()}
                            value={nameClient}
                            {...registerContrato("nameClient")}
                            onChange={(e: any) => {
                                setNameClient(e.target.value);
                                resetContrato({
                                    nomeCliente: e.target.value,
                                });
                            }}
                        />

                        <GridSelectField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Estado Civil'
                            placeholder='Estado Civil'
                            variant='filled'
                            value={estadoCivil}
                            options={estado_civil}
                            error={!!errorsContrato.estadoCivil}
                            helperText={errorsContrato.estadoCivil?.message?.toString()}
                            {...registerContrato("estadoCivil")}
                            onChange={(e: any) => {
                                setEstadoCivil(e.target.value);
                                resetContrato({
                                    estadoCivil: e.target.value,
                                });
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            variant='filled'
                            label='Profissão'
                            placeholder='Profissão'
                            error={errorsContrato.profissao ? true : false}
                            helperText={errorsContrato.profissao?.message?.toString()}
                            value={profissao}
                            {...registerContrato("profissao")}
                            onChange={(e) => {
                                setProfissao(e.target.value);
                                resetContrato({
                                    profissao: e.target.value,
                                });
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='CPF do Cliente'
                            variant='filled'
                            placeholder='CPF do cliente'
                            error={errorsContrato.cpfClient ? true : false}
                            helperText={errorsContrato.cpfClient?.message?.toString()}
                            value={cpfClient}
                            {...registerContrato("cpfClient")}
                            onChange={(e) => {
                                const value = onlyNumber(e.target.value);
                                setCPFClient(formatCpf(value));
                                resetContrato({
                                    cpfClient: formatCpf(value),
                                });
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='CEP'
                            variant='filled'
                            placeholder='CEP'
                            error={errorsContrato.cep ? true : false}
                            helperText={errorsContrato.cep?.message?.toString()}
                            value={cep}
                            {...registerContrato("cep")}
                            onChange={(e) => {
                                const value = onlyNumber(e.target.value);
                                setCep(formatCepInput(value));
                                resetContrato({
                                    cep: formatCepInput(value),
                                });
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Endereço'
                            variant='filled'
                            placeholder='Endereço'
                            value={enderecoCompleto}
                            error={errorsContrato.enderecoCompleto ? true : false}
                            helperText={errorsContrato.enderecoCompleto?.message?.toString()}
                            {...registerContrato("enderecoCompleto")}
                            onChange={(e) => {
                                setEnderecoCompleto(e.target.value);
                                resetContrato({
                                    enderecoCompleto: e.target.value,
                                });
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Número'
                            placeholder='Digite o número'
                            variant='filled'
                            value={numero}
                            error={errorsContrato.numero ? true : false}
                            helperText={errorsContrato.numero?.message?.toString()}
                            {...registerContrato("numero")}
                            onChange={(e) => {
                                setNumero(e.target.value);
                                resetContrato({
                                    numero: e.target.value,
                                });
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Bairro'
                            placeholder='Digite o bairro'
                            variant='filled'
                            value={bairro}
                            error={errorsContrato.bairro ? true : false}
                            helperText={errorsContrato.bairro?.message?.toString()}
                            {...registerContrato("bairro")}
                            onChange={(e) => {
                                setBairro(e.target.value);
                                resetContrato({
                                    bairro: e.target.value,
                                });
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Complemento'
                            placeholder='Digite o complemento'
                            variant='filled'
                            value={complemento}
                            error={errorsContrato.complemento ? true : false}
                            helperText={errorsContrato.complemento?.message?.toString()}
                            {...registerContrato("complemento")}
                            onChange={(e) => {
                                setComplemento(e.target.value);
                                resetContrato({
                                    complemento: e.target.value,
                                });
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Cidade'
                            placeholder='Digite a cidade'
                            variant='filled'
                            value={cidade}
                            error={errorsContrato.cidade ? true : false}
                            helperText={errorsContrato.cidade?.message?.toString()}
                            {...registerContrato("cidade")}
                            onChange={(e) => {
                                setCidade(e.target.value);
                                resetContrato({
                                    cidade: e.target.value,
                                });
                            }}
                        />

                        <GridSelectField
                            xs={12}
                            sm={6}
                            md={4}
                            variant='filled'
                            label='Estado'
                            placeholder='Estado'
                            value={estado}
                            error={errorsContrato.estado ? true : false}
                            helperText={errorsContrato.estado?.message?.toString()}
                            options={estados_brasileiros}
                            {...registerContrato("estado")}
                            onChange={(e) => {
                                setEstado(e.target.value);
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Data'
                            placeholder='data'
                            type='date'
                            variant='filled'
                            value={date}
                            error={errorsContrato.date ? true : false}
                            helperText={errorsContrato.date?.message?.toString()}
                            {...registerContrato("date")}
                            onChange={(e) => {
                                setDate(e.target.value);
                                resetContrato({
                                    date: e.target.value,
                                });
                            }}
                        />
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes("add") ||
                    regraDominio?.permissoes?.includes("update")) && (
                        <Btn
                            type="submit"
                            width={250}
                            variant="contained"
                            disabled={loadingContract}
                            text='Gerar Contrato'
                        />
                    )}
            </AccordionDetails>
        </Accordion>
    )
}
