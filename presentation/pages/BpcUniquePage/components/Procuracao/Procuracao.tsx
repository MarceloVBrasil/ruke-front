import { onlyNumber, formatCpf, formatCepInput } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, FormControl, Select, MenuItem, FormHelperText, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { setDate } from 'date-fns';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import GridTextField from '@/presentation/components/GridTextField';
import GridSelectField from '@/presentation/components/GridSelectField';
import { estado_civil } from '@/domain/data/estado_civil';
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';
import { Btn } from '@/presentation/components/Button';

interface IProcuracao {
    ticket: { procuracao_pdf: any, procuracao_word: any }
    errorsProcuracao: any
    nameClient: string
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
    loadingProxy: boolean
    date: string
    setNameClient: (value: string) => void
    criarBpcProx: (value: any | undefined) => any
    handleSubmitProcuracao: (value: any) => any
    registerProcuracao: (value: string) => any
    resetProcuracao: (value: any | undefined) => any
    setEstadoCivil: (value: any) => void
    setProfissao: (value: string) => void
    setCPFClient: (value: string) => void
    setCep: (value: string) => void
    setEnderecoCompleto: (value: string) => void
    setNumero: (value: string) => void
    setBairro: (value: string) => void
    setComplemento: (value: string) => void
    setCidade: (value: string) => void
    setEstado: (value: any) => void
    setDate: (value: any) => void
}

export default function Procuracao(props: IProcuracao) {
    const {
        ticket: api_data,
        errorsProcuracao,
        nameClient,
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
        loadingProxy,
        date,
        setNameClient,
        criarBpcProx,
        handleSubmitProcuracao,
        registerProcuracao,
        resetProcuracao,
        setEstadoCivil,
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
                        PROCURAÇÃO{" "}
                    </Typography>
                    {api_data && api_data.procuracao_pdf && (
                        <Link
                            href={api_data.procuracao_pdf}
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
                    {api_data && api_data.procuracao_word && (
                        <Link
                            href={api_data.procuracao_word}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<ArticleIcon sx={{ position: 'relative', top: 2, left: { xs: 3, lg: 0 } }} />}
                                label={`Download do WORD da Petição`}
                                color="default"
                                style={{ marginLeft: 10 }}
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
                            api_data && api_data.procuracao_pdf ? "Gerada!" : "Não gerada!"
                        }
                        color={api_data && api_data.procuracao_pdf ? "success" : "warning"}
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
                        id="form-procuracao"
                        onSubmit={handleSubmitProcuracao(criarBpcProx)}
                        spacing={2}
                    >
                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Nome'
                            placeholder='Nome'
                            variant='filled'
                            error={errorsProcuracao.nameClient ? true : false}
                            helperText={errorsProcuracao.nameClient?.message?.toString()}
                            value={nameClient}
                            {...registerProcuracao("nameClient")}
                            onChange={(e) => {
                                setNameClient(e.target.value);
                                resetProcuracao({
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
                            error={!!errorsProcuracao.estadoCivil}
                            helperText={errorsProcuracao.estadoCivil?.message?.toString()}
                            {...registerProcuracao("estadoCivil")}
                            onChange={(e) => {
                                setEstadoCivil(e.target.value);
                                resetProcuracao({
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
                            error={errorsProcuracao.profissao ? true : false}
                            helperText={errorsProcuracao.profissao?.message?.toString()}
                            value={profissao}
                            {...registerProcuracao("profissao")}
                            onChange={(e) => {
                                setProfissao(e.target.value);
                                resetProcuracao({
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
                            error={errorsProcuracao.cpfClient ? true : false}
                            helperText={errorsProcuracao.cpfClient?.message?.toString()}
                            value={cpfClient}
                            {...registerProcuracao("cpfClient")}
                            onChange={(e) => {
                                const value = onlyNumber(e.target.value);
                                setCPFClient(formatCpf(value));
                                resetProcuracao({
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
                            error={errorsProcuracao.cep ? true : false}
                            helperText={errorsProcuracao.cep?.message?.toString()}
                            value={cep}
                            {...registerProcuracao("cep")}
                            onChange={(e) => {
                                const value = onlyNumber(e.target.value);
                                setCep(formatCepInput(value));
                                resetProcuracao({
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
                            error={errorsProcuracao.enderecoCompleto ? true : false}
                            helperText={errorsProcuracao.enderecoCompleto?.message?.toString()}
                            {...registerProcuracao("enderecoCompleto")}
                            onChange={(e) => {
                                setEnderecoCompleto(e.target.value);
                                resetProcuracao({
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
                            error={errorsProcuracao.numero ? true : false}
                            helperText={errorsProcuracao.numero?.message?.toString()}
                            {...registerProcuracao("numero")}
                            onChange={(e) => {
                                setNumero(e.target.value);
                                resetProcuracao({
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
                            error={errorsProcuracao.bairro ? true : false}
                            helperText={errorsProcuracao.bairro?.message?.toString()}
                            {...registerProcuracao("bairro")}
                            onChange={(e) => {
                                setBairro(e.target.value);
                                resetProcuracao({
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
                            error={errorsProcuracao.complemento ? true : false}
                            helperText={errorsProcuracao.complemento?.message?.toString()}
                            {...registerProcuracao("complemento")}
                            onChange={(e) => {
                                setComplemento(e.target.value);
                                resetProcuracao({
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
                            error={errorsProcuracao.cidade ? true : false}
                            helperText={errorsProcuracao.cidade?.message?.toString()}
                            {...registerProcuracao("cidade")}
                            onChange={(e) => {
                                setCidade(e.target.value);
                                resetProcuracao({
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
                            error={errorsProcuracao.estado ? true : false}
                            helperText={errorsProcuracao.estado?.message?.toString()}
                            options={estados_brasileiros}
                            {...registerProcuracao("estado")}
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
                            error={errorsProcuracao.date ? true : false}
                            helperText={errorsProcuracao.date?.message?.toString()}
                            {...registerProcuracao("date")}
                            onChange={(e) => {
                                setDate(e.target.value);
                                resetProcuracao({
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
                            disabled={loadingProxy}
                            text='Gerar Procuração'
                        />

                    )}
            </AccordionDetails>
        </Accordion>
    )
}
