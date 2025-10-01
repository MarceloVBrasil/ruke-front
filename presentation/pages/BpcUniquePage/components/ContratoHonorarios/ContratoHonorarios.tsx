import { onlyNumber, formatCpf, formatCepInput } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, FormControl, Select, MenuItem, FormHelperText, Button, CircularProgress } from '@mui/material';
import { Box, width } from '@mui/system';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";

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
                            fontWeight: "bold",
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
                        id="form-contrato"
                        onSubmit={handleSubmitContrato(criarContrato)}
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
                                error={errorsContrato.nameClient ? true : false}
                                helperText={errorsContrato.nameClient?.message?.toString()}
                                value={nameClient}
                                {...registerContrato("nameClient")}
                                onChange={(e) => {
                                    const value = setNameClient(e.target.value);
                                    setNameClient(e.target.value);
                                    resetContrato({
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
                                error={errorsContrato.estadoCivil ? true : false}
                            >
                                <Select
                                    id="estadoCivil"
                                    variant="outlined"
                                    displayEmpty
                                    fullWidth
                                    value={estadoCivil}
                                    style={{
                                        borderRadius: "10px",
                                    }}
                                    {...registerContrato("estadoCivil")}
                                    onChange={(e) => {
                                        setEstadoCivil(e.target.value);
                                        resetContrato({
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
                                {errorsContrato.estadoCivil ? (
                                    <FormHelperText>
                                        {errorsContrato.estadoCivil?.message?.toString()}
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
                                id="outlined-basic"
                                fullWidth
                                placeholder="Profissão"
                                variant="outlined"
                                error={errorsContrato.profissao ? true : false}
                                helperText={errorsContrato.profissao?.message?.toString()}
                                InputLabelProps={{ shrink: true }}
                                value={profissao}
                                {...registerContrato("profissao")}
                                onChange={(e) => {
                                    setProfissao(e.target.value);
                                    resetContrato({
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
                                id="outlined-basic"
                                fullWidth
                                placeholder="CPF do cliente"
                                variant="outlined"
                                error={errorsContrato.cpfClient ? true : false}
                                helperText={errorsContrato.cpfClient?.message?.toString()}
                                InputLabelProps={{ shrink: true }}
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
                                error={errorsContrato.cep ? true : false}
                                helperText={errorsContrato.cep?.message?.toString()}
                                {...registerContrato("cep")}
                                onChange={(e) => {
                                    const value = onlyNumber(e.target.value);
                                    setCep(formatCepInput(value));
                                    resetContrato({
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
                                error={errorsContrato.enderecoCompleto ? true : false}
                                helperText={errorsContrato.enderecoCompleto?.message?.toString()}
                                {...registerContrato("enderecoCompleto")}
                                onChange={(e) => {
                                    setEnderecoCompleto(e.target.value);
                                    resetContrato({
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
                                error={errorsContrato.numero ? true : false}
                                helperText={errorsContrato.numero?.message?.toString()}
                                {...registerContrato("numero")}
                                onChange={(e) => {
                                    setNumero(e.target.value);
                                    resetContrato({
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
                                error={errorsContrato.bairro ? true : false}
                                helperText={errorsContrato.bairro?.message?.toString()}
                                {...registerContrato("bairro")}
                                onChange={(e) => {
                                    setBairro(e.target.value);
                                    resetContrato({
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
                                error={errorsContrato.complemento ? true : false}
                                helperText={errorsContrato.complemento?.message?.toString()}
                                {...registerContrato("complemento")}
                                onChange={(e) => {
                                    setComplemento(e.target.value);
                                    resetContrato({
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
                                error={errorsContrato.cidade ? true : false}
                                helperText={errorsContrato.cidade?.message?.toString()}
                                {...registerContrato("cidade")}
                                onChange={(e) => {
                                    setCidade(e.target.value);
                                    resetContrato({
                                        cidade: e.target.value,
                                    });
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl
                                error={errorsContrato.estado ? true : false}
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
                                    error={errorsContrato.estado ? true : false}
                                    {...registerContrato("estado")}
                                    onChange={(e) => {
                                        setEstado(e.target.value);
                                        resetContrato({
                                            estado: e.target.value,
                                        });
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
                                {errorsContrato.estado ? (
                                    <FormHelperText>
                                        {errorsContrato.estado?.message?.toString()}
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
                                error={errorsContrato.date ? true : false}
                                helperText={errorsContrato.date?.message?.toString()}
                                {...registerContrato("date")}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    resetContrato({
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
                            disabled={loadingContract}
                            form="form-contrato"
                        >
                            {loadingContract ? (
                                <CircularProgress
                                    size={20}
                                    style={{ color: "white", marginRight: 10 }}
                                />
                            ) : (
                                ""
                            )}{" "}
                            GERAR CONTRATO DE HONORÁRIOS
                        </Button>
                    )}
            </AccordionDetails>
        </Accordion>
    )
}
