import { onlyNumber, formatCpf, formatCnpj, formatCepInput } from '@/app/utils/Formater';
import { criarHipossuficiencia } from '@/presentation/pages/BpcUniquePage/helpers/Swal';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, FormControl, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";


interface IHipossuficiencia {
    ticket: any
    nameClient: string
    estadoCivil: string
    profissao: string
    cep: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    regraDominio: any
    loadingHipossuficiencia: boolean
    tipoPessoa: string
    cpf: string
    cnpj: string
    rua: string
    setNameClient: (value: string) => void
    setEstadoCivil: (value: any) => void
    setProfissao: (value: string) => void
    setCEP: (value: string) => void
    setNumero: (value: string) => void
    setComplemento: (value: string) => void
    setBairro: (value: string) => void
    setCidade: (value: string) => void
    setEstado: (value: any) => void
    setCPF: (value: string) => void
    setCNPJ: (value: string) => void
    setRua: (value: string) => void
}

export default function Hipossuficiencia(props: IHipossuficiencia) {
    const {
        ticket,
        nameClient,
        estadoCivil,
        profissao,
        cep,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        regraDominio,
        loadingHipossuficiencia,
        tipoPessoa,
        cpf,
        cnpj,
        rua,
        setNameClient,
        setEstadoCivil,
        setProfissao,
        setNumero,
        setComplemento,
        setBairro,
        setCidade,
        setEstado,
        setCPF,
        setCNPJ,
        setCEP,
        setRua,
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
                                style={{ marginInline: 10 }}
                                size="small"
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                            />

                            <Chip
                                icon={<ArticleIcon />}
                                color="default"
                                style={{ marginInline: 10 }}
                                size="small"
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                            />
                        </Link>
                    )}
                    <Chip
                        label={
                            ticket && ticket.hipossuficiencia_pdf
                                ? "Gerada!"
                                : "Não gerado!"
                        }
                        color={
                            ticket && ticket.hipossuficiencia_pdf ? "success" : "warning"
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
                                Nome *
                            </Typography>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                value={nameClient}
                                onChange={(e) => {
                                    setNameClient(e.target.value);
                                }}
                                placeholder="Nome"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        {tipoPessoa === "pf" && (
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography
                                    sx={{
                                        color: "#00479d",
                                        fontWeight: "bold",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Estado Civil *
                                </Typography>
                                <FormControl fullWidth variant="filled">
                                    <Select
                                        variant="outlined"
                                        displayEmpty
                                        fullWidth
                                        value={estadoCivil}
                                        style={{
                                            borderRadius: "10px",
                                        }}
                                        onChange={(e) => {
                                            setEstadoCivil(e.target.value);
                                        }}
                                    >
                                        <MenuItem selected value="" disabled>
                                            Selecione o estado civil
                                        </MenuItem>
                                        <MenuItem value={"Solteiro(a)"}>Solteiro(a)</MenuItem>
                                        <MenuItem value={"Casado(a)"}>Casado(a)</MenuItem>
                                        <MenuItem value={"Divorciado(a)"}>
                                            Divorciado(a)
                                        </MenuItem>
                                        <MenuItem value={"Viuvo(a)"}>Viúvo(a)</MenuItem>
                                        <MenuItem value={"Separado(a) Judicialmente"}>
                                            Separado(a) Judicialmente
                                        </MenuItem>
                                        <MenuItem value={"em União Estável"}>
                                            em União Estável
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}

                        {tipoPessoa === "pf" && (
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography
                                    sx={{
                                        color: "#00479d",
                                        fontWeight: "bold",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Profissão *
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Profissão"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    value={profissao}
                                    onChange={(e) => {
                                        setProfissao(e.target.value);
                                    }}
                                />
                            </Grid>
                        )}

                        {tipoPessoa && tipoPessoa === "pf" && (
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography
                                    sx={{
                                        color: "#00479d",
                                        fontWeight: "bold",
                                        marginLeft: "10px",
                                    }}
                                >
                                    CPF do cliente *
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="CPF do cliente"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    value={cpf}
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setCPF(formatCpf(value));
                                    }}
                                />
                            </Grid>
                        )}

                        {tipoPessoa && tipoPessoa === "pj" && (
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography
                                    sx={{
                                        color: "#00479d",
                                        fontWeight: "bold",
                                        marginLeft: "10px",
                                    }}
                                >
                                    CNPJ *
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="CNPJ do cliente"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    value={cnpj}
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setCNPJ(formatCnpj(value));
                                    }}
                                />
                            </Grid>
                        )}

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                CEP *
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="CEP"
                                variant="outlined"
                                value={cep}
                                onChange={(e) => {
                                    const value = onlyNumber(e.target.value);
                                    setCEP(formatCepInput(value));
                                }}
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
                                Rua *
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Rua do cliente"
                                variant="outlined"
                                value={rua}
                                onChange={(e) => {
                                    setRua(e.target.value);
                                }}
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
                                Número *
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Endereço do cliente"
                                variant="outlined"
                                value={numero}
                                onChange={(e) => {
                                    setNumero(e.target.value);
                                }}
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
                                Bairro *
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Endereço do cliente"
                                variant="outlined"
                                value={bairro}
                                onChange={(e) => {
                                    setBairro(e.target.value);
                                }}
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
                                Complemento *
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Endereço do cliente"
                                variant="outlined"
                                value={complemento}
                                onChange={(e) => {
                                    setComplemento(e.target.value);
                                }}
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
                                Cidade *
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Endereço do cliente"
                                variant="outlined"
                                value={cidade}
                                onChange={(e) => {
                                    setCidade(e.target.value);
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth variant="filled">
                                <Typography
                                    sx={{
                                        color: "#00479d",
                                        fontWeight: "bold",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Estado *
                                </Typography>
                                <Select
                                    variant="outlined"
                                    sx={{ borderRadius: "10px" }}
                                    id="estado"
                                    value={estado}
                                    onChange={(e) => {
                                        setEstado(e.target.value);
                                    }}
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
                            </FormControl>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes("create") ||
                    regraDominio?.permissoes?.includes("update")) && (
                        <Button
                            onClick={() => criarHipossuficiencia(ticket.id)}
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
