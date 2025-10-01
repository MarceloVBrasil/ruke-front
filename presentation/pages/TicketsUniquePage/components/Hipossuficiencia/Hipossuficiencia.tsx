import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import { onlyNumber, formatCpf } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, Button, CircularProgress } from '@mui/material';
import { Box, width } from '@mui/system';
import Link from 'next/link';
import { criarHipossuficiencia } from '../../helpers/Swal';

interface IHipossuficiencia {
    ticket: any
    nameClient: string
    cpfClient: string
    regraDominio: any
    banks: string[]
    inputBank: string
    addressClient: string
    loadingHipossuficiencia: boolean
    getTickets: (value: any) => any
    setNameClient: (value: string) => void
    setCPFClient: (value: string) => void
    setInputBank: (value: string) => void
    setBank: (value: string) => void
    setAddressClient: (value: string) => void
    setLoadingHipossuficiencia: (value: boolean) => void
    setLoading: (value: boolean) => void
}

export default function Hipossuficiencia(props: IHipossuficiencia) {
    const {
        ticket,
        nameClient,
        cpfClient,
        regraDominio,
        addressClient,
        loadingHipossuficiencia,
        getTickets,
        setNameClient,
        setCPFClient,
        setAddressClient,
        setLoadingHipossuficiencia,
        setLoading
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
                            fontWeight: "bold",
                        }}
                    >
                        DOCUMENTO DE HIPOSSUFICIENCIA{" "}
                    </Typography>
                    {ticket && ticket.hipossuficiencia_spaces_key && (
                        <Link
                            href={ticket.hipossuficiencia_spaces_key}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<PictureAsPdfIcon />}
                                label={`Download do PDF de Hipossuficiencia`}
                                color="default"
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />

                            <Chip
                                icon={<PictureAsPdfIcon titleAccess='Hipossuficiência em PDF' sx={{ position: 'relative', left: 3 }} />}
                                color="default"
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    {ticket && ticket.hipossuficiencia_spaces_key_word && (
                        <Link
                            href={ticket.hipossuficiencia_spaces_key_word}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<ArticleIcon />}
                                label={`Download do WORD de Hipossuficiencia`}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />

                            <Chip
                                icon={<ArticleIcon titleAccess='Hipossuficiência em Word' sx={{ position: 'relative', left: 3 }} />}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    <Chip
                        label={
                            ticket && ticket.hipossuficiencia_spaces_key
                                ? "Gerado!"
                                : "Não gerado!"
                        }
                        color={
                            ticket && ticket.hipossuficiencia_spaces_key
                                ? "success"
                                : "warning"
                        }
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
                            fontWeight: "bold",
                            marginLeft: "10px",
                        }}
                    >
                        PREENCHA OS CAMPOS OBRIGATÓRIOS:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                Nome do Cliente
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                onChange={(e) => setNameClient(e.target.value)}
                                id="outlined-basic"
                                value={nameClient}
                                placeholder="Nome do Cliente"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                CPF do cliente
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={cpfClient}
                                onChange={(e) => {
                                    const value = onlyNumber(e.target.value);
                                    setCPFClient(formatCpf(value));
                                }}
                                placeholder="CPF do cliente"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                Endereço do cliente
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={addressClient}
                                onChange={(e) => setAddressClient(e.target.value)}
                                placeholder="Endereço do cliente"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes("create") ||
                    regraDominio?.permissoes?.includes("update")) && (
                        <Button
                            onClick={() => criarHipossuficiencia({
                                ticket,
                                id_do_ticket: ticket.id,
                                setLoadingHipossuficiencia,
                                nameClient,
                                cpfClient,
                                addressClient,
                                setLoading,
                                getTickets
                            })}
                            color="success"
                            variant="contained"
                            disabled={loadingHipossuficiencia}
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
