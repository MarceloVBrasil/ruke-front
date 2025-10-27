import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, Autocomplete, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import { criarContrato } from '../../helpers/Swal';
import GridTextField from '@/presentation/components/GridTextField';
import { AutoComplete } from '@/presentation/components/AutoComplete';
import { formatCpf, onlyNumber } from '@/app/utils/Formater';
import { Btn } from '@/presentation/components/Button';

interface IContratoHonorarios {
    ticket: any
    nameClient: string
    cpfClient: string
    regraDominio: any
    banks: string[]
    inputBank: string
    addressClient: string
    loadingContract: boolean
    setNameClient: (value: string) => void
    setCPFClient: (value: string) => void
    setInputBank: (value: string) => void
    setBank: (value: string) => void
    setAddressClient: (value: string) => void
    setLoading: (value: boolean) => void
    setLoadingContract: (value: boolean) => void
    getTickets: (value: any) => any
}

export default function ContratoHonorarios(props: IContratoHonorarios) {
    const {
        ticket,
        nameClient,
        cpfClient,
        regraDominio,
        banks,
        inputBank,
        addressClient,
        loadingContract,
        setNameClient,
        setCPFClient,
        setInputBank,
        setBank,
        setAddressClient,
        setLoading,
        setLoadingContract,
        getTickets
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
                    {ticket && ticket.contract_spaces_key && (
                        <Link
                            href={ticket.contract_spaces_key}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<PictureAsPdfIcon />}
                                label={`Download do PDF do Contrato`}
                                color="default"
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />

                            <Chip
                                icon={<PictureAsPdfIcon titleAccess='Conrtato em PDF' sx={{ position: 'relative', left: 4 }} />}
                                color="default"
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    {ticket && ticket.contract_spaces_key_word && (
                        <Link
                            href={ticket.contract_spaces_key_word}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<ArticleIcon />}
                                label={`Download do WORD do Contrato`}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />
                            <Chip
                                icon={<ArticleIcon titleAccess='Conrtato em Word' sx={{ position: 'relative', left: 4 }} />}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    <Chip
                        label={
                            ticket && ticket.contract_spaces_key ? "Gerado!" : "Não gerada!"
                        }
                        color={
                            ticket && ticket.contract_spaces_key ? "success" : "warning"
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

                        <AutoComplete
                            name={''}
                            label='Banco e Endereço'
                            placeholder='Banco e Endereço'
                            options={
                                banks
                                    ? banks.map(
                                        (bank: any) =>
                                            `${bank.NOME_INSTITUICAO}, ${bank.CEP}, ${bank.UF}, ${bank.BAIRRO}, ${bank.ENDERECO} - ${bank.COMPLEMENTO} `
                                    )
                                    : []
                            }
                            value={[]}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setBank(newValue as unknown as string);
                                }
                            }}
                        />

                    </Grid>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes("add") ||
                    regraDominio?.permissoes?.includes("update")) && (
                        <Btn
                            text='Gerar Contrato'
                            onClick={() => criarContrato({
                                ticket,
                                id_do_ticket: ticket.id,
                                nameClient,
                                cpfClient,
                                addressClient,
                                inputBank,
                                setLoading,
                                setLoadingContract,
                                getTickets
                            })}
                            width={250}
                            variant="contained"
                            disabled={loadingContract}
                        />
                    )}
            </AccordionDetails>
        </Accordion>
    )
}
