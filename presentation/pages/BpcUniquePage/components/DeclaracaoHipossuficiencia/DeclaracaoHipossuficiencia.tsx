import { onlyNumber, formatCpf, formatCepInput } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, FormControl, Select, MenuItem, FormHelperText, Button, CircularProgress } from '@mui/material';
import { Box, width } from '@mui/system';
import Link from 'next/link';

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";

interface IDeclaracaoHipossuficiencia {
    ticket: any
    errorsHipossuficiencia: any
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
    loadingHipossuficiencia: boolean
    dataRequerimento: string
    setNameClient: (value: string) => void
    criarHipossuficiencia: (value: any | undefined) => any
    handleSubmitHipossuficiencia: (value: any) => any
    registerHipossuficiencia: (value: string) => any
    resetHipossuficiencia: (value: any | undefined) => any
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
    setDataRequerimento: (value: any) => void
}

export default function DeclaracaoHipossuficiencia(props: IDeclaracaoHipossuficiencia) {
    const {
        ticket: api_data,
        errorsHipossuficiencia,
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
        loadingHipossuficiencia,
        dataRequerimento,
        setNameClient,
        criarHipossuficiencia,
        handleSubmitHipossuficiencia,
        registerHipossuficiencia,
        resetHipossuficiencia,
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
        setDataRequerimento
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
                        justifyContent: "space-between",
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
                            textWrap: 'wrap'
                        }}
                    >
                        DECLARAÇÃO DE HIPOSSUFICIÊNCIA{" "}
                    </Typography>
                    {api_data && api_data.hipossuficiencia_pdf && (
                        <Link
                            href={api_data.hipossuficiencia_pdf}
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
                    {api_data && api_data.hipossuficiencia_word && (
                        <Link
                            href={api_data.hipossuficiencia_word}
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
                            api_data && api_data.hipossuficiencia_pdf ? "Gerada!" : "Não gerada!"
                        }
                        color={api_data && api_data.hipossuficiencia_pdf ? "success" : "warning"}
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
                        id="form-hipossuficiencia"
                        container
                        component="form"
                        onSubmit={handleSubmitHipossuficiencia(criarHipossuficiencia)}
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
                                error={errorsHipossuficiencia.nameClient ? true : false}
                                helperText={errorsHipossuficiencia.nameClient?.message?.toString()}
                                value={nameClient}
                                {...registerHipossuficiencia("nameClient")}
                                onChange={(e) => {
                                    setNameClient(e.target.value);
                                    resetHipossuficiencia({
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
                                error={errorsHipossuficiencia.estadoCivil ? true : false}
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
                                    {...registerHipossuficiencia("estadoCivil")}
                                    onChange={(e) => {
                                        setEstadoCivil(e.target.value);
                                        resetHipossuficiencia({
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
                                {errorsHipossuficiencia.estadoCivil ? (
                                    <FormHelperText>
                                        {errorsHipossuficiencia.estadoCivil?.message?.toString()}
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
                                error={errorsHipossuficiencia.profissao ? true : false}
                                helperText={errorsHipossuficiencia.profissao?.message?.toString()}
                                InputLabelProps={{ shrink: true }}
                                value={profissao}
                                {...registerHipossuficiencia("profissao")}
                                onChange={(e) => {
                                    setProfissao(e.target.value);
                                    resetHipossuficiencia({
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
                                error={errorsHipossuficiencia.cpfClient ? true : false}
                                helperText={errorsHipossuficiencia.cpfClient?.message?.toString()}
                                InputLabelProps={{ shrink: true }}
                                value={cpfClient}
                                {...registerHipossuficiencia("cpfClient")}
                                onChange={(e) => {
                                    const value = onlyNumber(e.target.value);
                                    setCPFClient(formatCpf(value));
                                    resetHipossuficiencia({
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
                                error={errorsHipossuficiencia.cep ? true : false}
                                helperText={errorsHipossuficiencia.cep?.message?.toString()}
                                {...registerHipossuficiencia("cep")}
                                onChange={(e) => {
                                    const value = onlyNumber(e.target.value);
                                    setCep(formatCepInput(value));
                                    resetHipossuficiencia({
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
                                error={errorsHipossuficiencia.enderecoCompleto ? true : false}
                                helperText={errorsHipossuficiencia.enderecoCompleto?.message?.toString()}
                                {...registerHipossuficiencia("enderecoCompleto")}
                                onChange={(e) => {
                                    setEnderecoCompleto(e.target.value);
                                    resetHipossuficiencia({
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
                                error={errorsHipossuficiencia.numero ? true : false}
                                helperText={errorsHipossuficiencia.numero?.message?.toString()}
                                {...registerHipossuficiencia("numero")}
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
                                error={errorsHipossuficiencia.bairro ? true : false}
                                helperText={errorsHipossuficiencia.bairro?.message?.toString()}
                                {...registerHipossuficiencia("bairro")}
                                onChange={(e) => {
                                    setBairro(e.target.value);
                                    resetHipossuficiencia({
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
                                error={errorsHipossuficiencia.complemento ? true : false}
                                helperText={errorsHipossuficiencia.complemento?.message?.toString()}
                                {...registerHipossuficiencia("complemento")}
                                onChange={(e) => {
                                    setComplemento(e.target.value);
                                    resetHipossuficiencia({
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
                                error={errorsHipossuficiencia.cidade ? true : false}
                                helperText={errorsHipossuficiencia.cidade?.message?.toString()}
                                {...registerHipossuficiencia("cidade")}
                                onChange={(e) => {
                                    setCidade(e.target.value);
                                    resetHipossuficiencia({
                                        cidade: e.target.value,
                                    });
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl
                                error={errorsHipossuficiencia.estado ? true : false}
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
                                    {...registerHipossuficiencia("estado")}
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
                                {errorsHipossuficiencia.estado ? (
                                    <FormHelperText>
                                        {errorsHipossuficiencia.estado?.message?.toString()}
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
                                value={dataRequerimento}
                                error={errorsHipossuficiencia.date ? true : false}
                                helperText={errorsHipossuficiencia.date?.message?.toString()}
                                {...registerHipossuficiencia("date")}
                                onChange={(e) => {
                                    setDataRequerimento(e.target.value);
                                    resetHipossuficiencia({
                                        dataRequerimento: e.target.value,
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
                            GERAR DECLARAÇÃO DE HIPOSSUFICIÊNCIA
                        </Button>
                    )}
            </AccordionDetails>
        </Accordion>
    )
}
