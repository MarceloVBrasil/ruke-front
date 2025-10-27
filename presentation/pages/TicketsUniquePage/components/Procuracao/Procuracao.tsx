import { onlyNumber, formatCpf } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import GridTextField from '@/presentation/components/GridTextField';
import { Btn } from '@/presentation/components/Button';

interface IProcuracao {
    ticket: any
    nameClient: string
    cpfClient: string
    regraDominio: any
    addressClient: string
    loadingProxy: boolean
    setNameClient: (value: string) => void
    setCPFClient: (value: string) => void
    setAddressClient: (value: string) => void
    criarProxy: (value: string) => any
}

export default function Procuracao(props: IProcuracao) {
    const {
        ticket,
        nameClient,
        cpfClient,
        regraDominio,
        addressClient,
        loadingProxy,
        setNameClient,
        setCPFClient,
        setAddressClient,
        criarProxy
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
                    {ticket && ticket.proxy_spaces_key && (
                        <Link
                            href={ticket.proxy_spaces_key}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<PictureAsPdfIcon />}
                                label={`Download do PDF da Procuração`}
                                color="default"
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />

                            <Chip
                                icon={<PictureAsPdfIcon titleAccess='Procuração em PDF' sx={{ position: 'relative', left: 4 }} />}
                                color="default"
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    {ticket && ticket.proxy_spaces_key_word && (
                        <Link
                            href={ticket.proxy_spaces_key_word}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<ArticleIcon />}
                                label={`Download do WORD da Procuração`}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />
                            <Chip
                                icon={<ArticleIcon titleAccess='Procuração em word' sx={{ position: 'relative', left: 4 }} />}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    <Chip
                        label={
                            ticket && ticket.proxy_spaces_key ? "Gerada!" : "Não gerada!"
                        }
                        color={ticket && ticket.proxy_spaces_key ? "success" : "warning"}
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
                    <Grid container spacing={2}>

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            value={nameClient}
                            placeholder="Nome do Cliente"
                            label='Nome'
                            variant='filled'
                            onChange={(e) => setNameClient(e.target.value)}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            placeholder="CPF"
                            label=' CPF'
                            variant='filled'
                            value={cpfClient}
                            onChange={(e) => {
                                const value = onlyNumber(e.target.value);
                                setCPFClient(formatCpf(value));
                            }}
                        />
                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            placeholder="Endereço"
                            label=' Endereço'
                            variant='filled'
                            value={addressClient}
                            onChange={(e) => setAddressClient(e.target.value)}
                        />


                    </Grid>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes("add") ||
                    regraDominio?.permissoes?.includes("update")) && (
                        <Btn
                            onClick={() => criarProxy(ticket.id)}
                            variant="contained"
                            disabled={loadingProxy}
                            text='Gerar Procuração'
                            width={250}
                        />
                    )}
            </AccordionDetails>
        </Accordion>
    )
}
