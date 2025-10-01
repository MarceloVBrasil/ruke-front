import { onlyNumber, formatCpf } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, FormControl, Select, MenuItem, FormHelperText, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { setDate } from 'date-fns';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import { criarHipossuficiencia } from '../../helpers/Swal';

interface IHipossuficiencia {
    ticket: any
    errorsHipossuficiencia: any
    nameClient: string
    cpfClient: string
    estadoCivil: string
    enderecoCompleto: string
    profissao: string
    bairro: string
    complemento: string
    estado: string
    date: string
    regraDominio: any
    loadingHipossuficiencia: boolean
    cep: string
    cidade: string
    numero: string
    representanteLegal: string
    razaoSocial: string
    cnpjClient: string
    valorMensal: string
    escopo: string
    personChoose: string
    percentualExito: string
    handleSubmitHipossuficiencia: (value: any) => any
    setNameClient: (value: string) => void
    setCPFClient: (value: string) => void
    setEstadoCivil: (value: any) => void
    setEnderecoCompleto: (value: string) => void
    setProfissao: (value: string) => void
    registerHipossuficiencia: (value: any) => any
    resetHipossuficiencia: (value: any) => any
    setDate: (value: string) => void
    setPercentualExito: (value: string) => void
    setValorMensal: (value: string) => void
    setLoadingHipossuficiencia: (value: boolean) => void
    getRukeFlexTickets: (value: any) => any
}

export default function Hipossuficiencia(props: IHipossuficiencia) {
    const {
        ticket,
        errorsHipossuficiencia,
        nameClient,
        cpfClient,
        estadoCivil,
        enderecoCompleto,
        profissao,
        date,
        regraDominio,
        loadingHipossuficiencia,
        cep,
        cidade,
        estado,
        complemento,
        numero,
        razaoSocial,
        representanteLegal,
        cnpjClient,
        bairro,
        valorMensal,
        escopo,
        personChoose,
        percentualExito,
        setLoadingHipossuficiencia,
        handleSubmitHipossuficiencia,
        setNameClient,
        setCPFClient,
        setEstadoCivil,
        setEnderecoCompleto,
        setProfissao,
        registerHipossuficiencia,
        resetHipossuficiencia,
        setDate,
        getRukeFlexTickets,
    } = props

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                    <Typography style={{ marginRight: 10, width: '100%', color: '#00479d', fontWeight: 'bold' }}>DOCUMENTO DE HIPOSSUFICIENCIA{" "}</Typography>
                    <Chip
                        label={
                            ticket && ticket.hipossuficiencia_pdf
                                ? "Gerada!"
                                : "Não gerado!"
                        }
                        color={
                            ticket && ticket.hipossuficiencia_pdf
                                ? "success"
                                : "warning"
                        }
                        size="small"
                    />
                    {ticket && ticket.hipossuficiencia_pdf && (
                        <Link
                            href={ticket.hipossuficiencia_pdf}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <Chip
                                icon={<PictureAsPdfIcon />}
                                label={`Download do PDF de Hipossuficiencia`}
                                color="default"
                                style={{ marginLeft: 10 }}
                                size="small"
                            />
                        </Link>
                    )}
                    {ticket && ticket.hipossuficiencia_word && (
                        <Link
                            href={ticket.hipossuficiencia_word}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <Chip
                                icon={<ArticleIcon />}
                                label={`Download do WORD de Hipossuficiencia`}
                                color="default"
                                style={{ marginLeft: 10 }}
                                size="small"
                            />
                        </Link>
                    )}
                </Box>
            </AccordionSummary>
            <Accordion expanded>
                <AccordionSummary>
                    <Typography sx={{ borderBottom: '2px solid #00479d', color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>PREENCHA OS CAMPOS OBRIGATÓRIOS:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid id="form-hipossuficiencia" container component="form" onSubmit={handleSubmitHipossuficiencia(() => criarHipossuficiencia({
                        ticket,
                        nameClient,
                        cpfClient,
                        cnpjClient,
                        cep,
                        cidade,
                        enderecoCompleto,
                        numero,
                        bairro,
                        complemento,
                        setLoadingHipossuficiencia,
                        valorMensal,
                        getRukeFlexTickets,
                        percentualExito,
                        personChoose,
                        profissao,
                        escopo,
                        estado,
                        estadoCivil,
                        razaoSocial,
                        representanteLegal,
                        date
                    }))} spacing={2}>
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Nome do Cliente
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Nome do Cliente"
                                variant="outlined"
                                value={nameClient}
                                error={errorsHipossuficiencia.nameClient ? true : false}
                                helperText={errorsHipossuficiencia.nameClient?.message?.toString()}
                                {...registerHipossuficiencia('nameClient')}
                                onChange={(e) => {
                                    setNameClient(e.target.value)
                                    resetHipossuficiencia({
                                        nameClient: e.target.value
                                    })
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                CPF do cliente
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                value={cpfClient}
                                error={errorsHipossuficiencia.cpfClient ? true : false}
                                helperText={errorsHipossuficiencia.cpfClient?.message?.toString()}
                                {...registerHipossuficiencia('cpfClient')}
                                onChange={(e) => {
                                    const value = onlyNumber(e.target.value);
                                    setCPFClient(formatCpf(value));
                                    resetHipossuficiencia({
                                        cpfClient: formatCpf(value),
                                    })
                                }}
                                placeholder="CPF do cliente"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Endereço do cliente
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Endereço do cliente"
                                variant="outlined"
                                error={errorsHipossuficiencia.enderecoCompleto ? true : false}
                                helperText={errorsHipossuficiencia.enderecoCompleto?.message?.toString()}
                                {...registerHipossuficiencia('enderecoCompleto')}
                                value={enderecoCompleto}
                                onChange={(e) => {
                                    setEnderecoCompleto(e.target.value)
                                    resetHipossuficiencia({
                                        enderecoCompleto: e.target.value
                                    })
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Estado Civil
                            </Typography>
                            <FormControl fullWidth variant="filled" error={errorsHipossuficiencia.estadoCivil ? true : false}
                            >                 <Select
                                id="estadoCivil"
                                variant='outlined'
                                displayEmpty
                                fullWidth
                                value={estadoCivil}
                                style={{ borderRadius: '10px' }}
                                {...registerHipossuficiencia('estadoCivil')}
                                onChange={e => {
                                    setEstadoCivil(e.target.value)
                                    resetHipossuficiencia({
                                        estadoCivil: e.target.value
                                    })
                                }}
                            >
                                    <MenuItem selected value="" disabled>
                                        Selecione o estado civil
                                    </MenuItem>
                                    <MenuItem value={'Solteiro(a)'}>Solteiro(a)</MenuItem>
                                    <MenuItem value={'Casado(a)'}>Casado(a)</MenuItem>
                                    <MenuItem value={'Divorciado(a)'}>Divorciado(a)</MenuItem>
                                    <MenuItem value={'Viuvo(a)'}>Viúvo(a)</MenuItem>
                                    <MenuItem value={'Separado(a) Judicialmente'}>Separado(a) Judicialmente</MenuItem>
                                    <MenuItem value={'em União Estável'}>em União Estável</MenuItem>
                                </Select>
                                {errorsHipossuficiencia.estadoCivil ? <FormHelperText>{errorsHipossuficiencia.estadoCivil?.message?.toString()}</FormHelperText> : null}

                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Profissão
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder=" Profissão"
                                variant="outlined"
                                value={profissao}
                                error={errorsHipossuficiencia.profissao ? true : false}
                                helperText={errorsHipossuficiencia.profissao?.message?.toString()}
                                {...registerHipossuficiencia('profissao')}
                                onChange={(e) => {
                                    setProfissao(e.target.value)
                                    resetHipossuficiencia({
                                        profissao: e.target.value
                                    })
                                }}

                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Data
                            </Typography>
                            <TextField
                                id="date"
                                fullWidth
                                value={date}
                                error={errorsHipossuficiencia.date ? true : false}
                                helperText={errorsHipossuficiencia.date?.message?.toString()}
                                {...registerHipossuficiencia('date')}
                                onChange={(e) => {
                                    setDate(e.target.value)
                                    resetHipossuficiencia({
                                        date: e.target.value
                                    })
                                }}
                                type="date"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes('create') || regraDominio?.permissoes?.includes('update')) && (
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={loadingHipossuficiencia}
                        form="form-hipossuficiencia"
                    >
                        {loadingHipossuficiencia ? (
                            <CircularProgress
                                size={20}
                                style={{ color: "white", marginRight: 10 }}
                            />
                        ) : (
                            ""
                        )}{" "}
                        GERAR DOCUMENTO
                    </Button>
                )}
            </AccordionDetails>
        </Accordion>
    )
}
