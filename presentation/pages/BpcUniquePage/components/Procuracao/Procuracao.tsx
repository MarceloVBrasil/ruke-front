import { onlyNumber, formatCpf, formatCepInput } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, FormControl, Select, MenuItem, FormHelperText, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { setDate } from 'date-fns';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";

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
                            fontWeight: "bold",
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
                            fontWeight: "bold",
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
                        <Grid item xs={12} sm={6} md={4}>
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
                                fullWidth
                                id="outlined-basic"
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
                                placeholder="Nome"
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
                                Estado Civil
                            </Typography>
                            <FormControl
                                fullWidth
                                variant="filled"
                                error={errorsProcuracao.estadoCivil ? true : false}
                            >
                                <Select
                                    variant="outlined"
                                    displayEmpty
                                    fullWidth
                                    value={estadoCivil}
                                    style={{
                                        borderRadius: "10px",
                                    }}
                                    {...registerProcuracao("estadoCivil")}
                                    onChange={(e) => {
                                        setEstadoCivil(e.target.value);
                                        resetProcuracao({
                                            estadoCivil: e.target.value,
                                        });
                                    }}
                                >
                                    <MenuItem selected value="" disabled>
                                        Selecione o estado civil
                                    </MenuItem>
                                    <MenuItem value={"Solteiro(a)"}>Solteiro(a)</MenuItem>
                                    <MenuItem value={"Casado(a)"}>Casado(a)</MenuItem>
                                    <MenuItem value={"Divorciado(a)"}>Divorciado(a)</MenuItem>
                                    <MenuItem value={"Viuvo(a)"}>Viúvo(a)</MenuItem>
                                    <MenuItem value={"Separado(a) Judicialmente"}>
                                        Separado(a) Judicialmente
                                    </MenuItem>
                                    <MenuItem value={"em União Estável"}>
                                        em União Estável
                                    </MenuItem>
                                </Select>
                                {errorsProcuracao.estadoCivil ? (
                                    <FormHelperText>
                                        {errorsProcuracao.estadoCivil?.message?.toString()}
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                Profissão
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Profissão"
                                variant="outlined"
                                error={errorsProcuracao.profissao ? true : false}
                                helperText={errorsProcuracao.profissao?.message?.toString()}
                                InputLabelProps={{ shrink: true }}
                                value={profissao}
                                {...registerProcuracao("profissao")}
                                onChange={(e) => {
                                    setProfissao(e.target.value);
                                    resetProcuracao({
                                        profissao: e.target.value,
                                    });
                                }}
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
                                fullWidth
                                placeholder="CPF do cliente"
                                variant="outlined"
                                error={errorsProcuracao.cpfClient ? true : false}
                                helperText={errorsProcuracao.cpfClient?.message?.toString()}
                                InputLabelProps={{ shrink: true }}
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
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
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
                                id="outlined-basic"
                                fullWidth
                                placeholder="CEP"
                                variant="outlined"
                                value={cep}
                                error={errorsProcuracao.cep ? true : false}
                                helperText={errorsProcuracao.cep?.message?.toString()}
                                {...registerProcuracao("cep")}
                                onChange={(e) => {
                                    const value = onlyNumber(e.target.value);
                                    setCep(formatCepInput(value));
                                    resetProcuracao({
                                        cep: formatCepInput(value),
                                    });
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
                                Endereço
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Endereço do cliente"
                                variant="outlined"
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
                                Número
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Endereço do cliente"
                                variant="outlined"
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
                                Bairro
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Endereço do cliente"
                                variant="outlined"
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
                                Complemento
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Endereço do cliente"
                                variant="outlined"
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
                                Cidade
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Endereço do cliente"
                                variant="outlined"
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
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl
                                error={errorsProcuracao.estado ? true : false}
                                fullWidth
                                variant="filled"
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
                                    sx={{ borderRadius: "10px" }}
                                    id="estado"
                                    value={estado}
                                    {...registerProcuracao("estado")}
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
                                {errorsProcuracao.estado ? (
                                    <FormHelperText>
                                        {errorsProcuracao.estado?.message?.toString()}
                                    </FormHelperText>
                                ) : null}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                Data
                            </Typography>
                            <TextField
                                id="date"
                                fullWidth
                                type="date"
                                variant="outlined"
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
                            type="submit"
                            color="success"
                            variant="contained"
                            disabled={loadingProxy}
                            form="form-procuracao"
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
            </AccordionDetails>
        </Accordion>
    )
}
