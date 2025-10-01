import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, Autocomplete, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import { criarContrato } from '../../helpers/Swal';

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
                            fontWeight: "bold",
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
                                onChange={(e) => setCPFClient(e.target.value)}
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

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                Banco e Endereço
                            </Typography>
                            <Autocomplete
                                id="free-solo-demo"
                                freeSolo
                                options={
                                    banks
                                        ? banks.map(
                                            (bank: any) =>
                                                `${bank.NOME_INSTITUICAO}, ${bank.CEP}, ${bank.UF}, ${bank.BAIRRO}, ${bank.ENDERECO} - ${bank.COMPLEMENTO} `
                                        )
                                        : []
                                }
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        variant="outlined"
                                        {...params}
                                        placeholder="Banco e Endereco"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                                inputValue={inputBank}
                                onInputChange={(event, newInputValue) => {
                                    setInputBank(newInputValue);
                                }}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setBank(newValue);
                                    }
                                }}
                            />
                        </Grid>

                    </Grid>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes("create") ||
                    regraDominio?.permissoes?.includes("update")) && (
                        <Button
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
                            color="success"
                            variant="contained"
                            disabled={loadingContract}
                        >
                            {loadingContract ? (
                                <CircularProgress
                                    size={20}
                                    style={{ color: "white", marginRight: 10 }}
                                />
                            ) : (
                                ""
                            )}{" "}
                            GERAR CONTRATO
                        </Button>
                    )}
            </AccordionDetails>
        </Accordion>
    )
}
