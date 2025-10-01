"use client"

import { onlyNumber, formatCpf } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React, { useState } from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import { createProxy } from '@/app/api/client/documents';
import Swal from "sweetalert2";
import axios from 'axios';
import { TrabalhistaProps } from '@/presentation/pages/TrabalhistaUniquePage/TrabalhistaUniquePage';
import { getTicketById } from '@/app/api/server/ticket';

export default function Procuracao({ ticketUnique: api_data, regraDominio }: TrabalhistaProps) {
    const [ticketUnique, setTicket] = useState<any>(api_data);
    const [nameClient, setNameClient] = useState("");
    const [calculationBase, setCalculationBase] = useState("");
    const [committedValue, setCommittedValue] = useState("");
    const [bankName, setBankName] = useState("");
    const [cpfClient, setCPFClient] = useState("");
    const [contractNumber, setContractNumber] = useState("");
    const [addressClient, setAddressClient] = useState("");
    const [cityClient, setCityClient] = useState("");
    const [banks, setBanks] = useState([]);
    const [inclusionDate, setInclusionDate] = useState("");
    const [bank, setBank] = useState("");
    const [inputBank, setInputBank] = useState("");
    const [installmentValue, setInstallmentValue] = useState("");
    const [contractValue, setContractValue] = useState("");
    const [typeProcess, setTypeProcess] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingContract, setLoadingContract] = useState(false);
    const [loadingProxy, setLoadingProxy] = useState(false);
    const [loadingHipossuficiencia, setLoadingHipossuficiencia] = useState(false);

    const getTickets = async (ticketUnique: any) => {
        setNameClient(ticketUnique.nome_cliente);
        setCalculationBase(
            formatarValorParaMoedaBrasileira(ticketUnique.calculation_base)
        );
        setCommittedValue(
            ticketUnique.committed_value ? ticketUnique.committed_value.replace(".", ",") : ""
        );

        setBankName(ticketUnique.bank_name);
        setContractNumber(ticketUnique.contract_number);
        setInstallmentValue(String(ticketUnique.installment_value).replace(".", ","));
        setCPFClient(ticketUnique.cpf_cliente);
        setAddressClient(`${ticketUnique.rua_cliente}, ${ticketUnique.cidade_cliente} - ${ticketUnique.estado_cliente}`);
        setCityClient(ticketUnique.cidade_cliente);
        setContractValue(ticketUnique.contract_value);
        setInclusionDate(ticketUnique.inclusion_date);
        setTypeProcess(ticketUnique.type_process || "aposentada");

        const banksAPI = await axios.get(
            `https://olinda.bcb.gov.br/olinda/servico/Instituicoes_em_funcionamento/versao/v1/odata/SedesBancoComMultCE?%24format=json`
        );

        function searchBanks(bancoProcurado: string, enderecos: string[]) {
            if (bancoProcurado && enderecos) {
                let nomeBancoProcurado = bancoProcurado
                    .replace(/BANCO|S\.?A\.?|SA|\d+|\-|\s+/g, "")
                    .trim();

                enderecos.forEach((endereco: any) => {
                    let regex = /BANCO\s+(.*?)\s+(S\.?A\.?|SA)/;

                    let match = endereco.NOME_INSTITUICAO.match(regex);
                    let nomeBancoEndereco = match ? match[1].replace(/\s+/g, " ") : null;

                    if (
                        nomeBancoEndereco &&
                        nomeBancoProcurado.includes(nomeBancoEndereco)
                    ) {
                        setInputBank(
                            `${endereco.NOME_INSTITUICAO}, ${endereco.CEP}, ${endereco.UF}, ${endereco.BAIRRO}, ${endereco.ENDERECO} - ${endereco.COMPLEMENTO} `
                        );
                    }
                });
            }
        }

        searchBanks(ticketUnique.bank_name, banksAPI.data.value);
        setBanks(banksAPI.data.value);
        setTicket(ticketUnique);
    };

    const criarProxy = async (id_do_ticketUnique: string) => {
        try {
            setLoadingProxy(true);
            const response = await createProxy(
                id_do_ticketUnique,
                nameClient,
                cpfClient,
                addressClient
            );

            if (response.error) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: response.error,
                });
                setLoading(false);
                setLoadingProxy(false);
            } else {
                await getTickets(await getTicketById(ticketUnique.id));
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    title: "Sucesso!",
                    text: "petição gerada com sucesso.",
                });
            }

            setLoadingProxy(false);
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: error.response.data.error,
            });
            setLoading(false);
            setLoadingProxy(false);
        }
    };

    const formatarValorParaMoedaBrasileira = (valor: string) => {
        const valorFormatado = Number(valor).toFixed(2);
        return `R$ ${valorFormatado.replace(".", ",")}`;
    };

    return (
        <Accordion disabled>
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
                        PROCURAÇÃO{" "}
                    </Typography>
                    {api_data && api_data.proxy_spaces_key && (
                        <Link
                            href={api_data.proxy_spaces_key}
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
                                icon={<PictureAsPdfIcon />}
                                color="default"
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    {api_data && api_data.proxy_spaces_key_word && (
                        <Link
                            href={api_data.proxy_spaces_key_word}
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
                                icon={<ArticleIcon />}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    <Chip
                        label={
                            "Em Breve"
                            // api_data && api_data.proxy_spaces_key ? "Gerada!" : "Não gerada!"
                        }
                        color={
                            "success"
                            //api_data && api_data.proxy_spaces_key ? "success" : "warning"
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
                        <Grid item xs={4}>
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

                        <Grid item xs={4}>
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

                        <Grid item xs={4}>
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
                            onClick={() => criarProxy(api_data.id)}
                            color="success"
                            variant="contained"
                            disabled={loadingProxy}
                        >
                            {loadingProxy ? (
                                <CircularProgress
                                    size={20}
                                    style={{ color: "white", marginRight: 10 }}
                                />
                            ) : (
                                ""
                            )}{" "}
                            GERAR PROCURAÇÃO
                        </Button>
                    )}
                {api_data && api_data.proxy_spaces_key && (
                    <Button
                        style={{ marginLeft: 5 }}
                        color="success"
                        variant="contained"
                    >
                        ENVIAR PARA ASSINATURA
                    </Button>
                )}
            </AccordionDetails>
        </Accordion>
    )
}
