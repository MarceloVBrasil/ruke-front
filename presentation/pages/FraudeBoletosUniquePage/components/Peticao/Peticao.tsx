import { onlyNumber, formatCpf, formatCnpj, formatCepInput, capitalizeFirstLetter } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Divider, Autocomplete, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import ListAltIcon from "@mui/icons-material/ListAlt";

interface IPeticao {
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
    loading: boolean
    tipoPessoa: string
    cpf: string
    cnpj: string
    dataNascimento: string
    rua: string
    quantidadeBancos: string
    banks: string[]
    inputBancoBoletoFalso: string
    dataVencimentoBoletoFalso: string
    dataVencimentoBoletoVerdadeiro: string
    valorBoletoFalso: string
    inputBancoBoletoVerdadeiro: string
    valorBoletoVerdadeiro: string
    boletimDeOcorrencia: string
    danosMorais: string
    municipioEEstadoAcao: string
    valorDanosMorais: string
    saveAndCreatePetition: (value?: any) => any
    setNameClient: (value: string) => void
    setEstadoCivil: (value: any) => void
    setProfissao: (value: string) => void
    setCEP: (value: string) => void
    setNumero: (value: string) => void
    setComplemento: (value: string) => void
    setBairro: (value: string) => void
    setCidade: (value: string) => void
    setEstado: (value: any) => void
    ContractValueMemo: (value: any) => JSX.Element
    setCPF: (value: string) => void
    setCNPJ: (value: string) => void
    setDataNascimento: (value: string) => void
    setRua: (value: string) => void
    setQuantidadeBancos: (value: string) => void
    setInputBancoBoletoFalso: (value: string) => void
    setBancoBoletoFalso: (value: string) => void
    setDataVencimentoBoletoFalso: (value: string) => void
    setDataVencimentoBoletoVerdadeiro: (value: string) => void
    setValorBoletoFalso: (value: string) => void
    setInputBancoBoletoVerdadeiro: (value: string) => void
    setBancoBoletoVerdadeiro: (value: string) => void
    setValorBoletoVerdadeiro: (value: string) => void
    setBoletimDeOcorrencia: (value: string) => void
    setDanosMorais: (value: string) => void
    setMunicipioEEstadoAcao: (value: string) => void
    setValorDanosMorais: (value: string) => void
}

export default function Peticao(props: IPeticao) {
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
        loading,
        tipoPessoa,
        cpf,
        cnpj,
        dataNascimento,
        rua,
        quantidadeBancos,
        banks,
        inputBancoBoletoFalso,
        dataVencimentoBoletoFalso,
        valorBoletoFalso,
        inputBancoBoletoVerdadeiro,
        dataVencimentoBoletoVerdadeiro,
        valorBoletoVerdadeiro,
        boletimDeOcorrencia,
        danosMorais,
        municipioEEstadoAcao,
        valorDanosMorais,
        saveAndCreatePetition,
        setNameClient,
        setEstadoCivil,
        setProfissao,
        setNumero,
        setComplemento,
        setBairro,
        setCidade,
        setEstado,
        ContractValueMemo,
        setCPF,
        setCNPJ,
        setDataNascimento,
        setCEP,
        setRua,
        setQuantidadeBancos,
        setInputBancoBoletoFalso,
        setBancoBoletoFalso,
        setDataVencimentoBoletoFalso,
        setValorBoletoFalso,
        setInputBancoBoletoVerdadeiro,
        setBancoBoletoVerdadeiro,
        setDataVencimentoBoletoVerdadeiro,
        setValorBoletoVerdadeiro,
        setBoletimDeOcorrencia,
        setDanosMorais,
        setMunicipioEEstadoAcao,
        setValorDanosMorais
    } = props

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
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
                        PETIÇÃO{" "}
                    </Typography>
                    {ticket && ticket.peticao_pdf && (
                        <Link
                            href={ticket.peticao_pdf}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<PictureAsPdfIcon />}
                                label={`Download do PDF da Petição`}
                                color="default"
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />

                            <Chip
                                icon={<PictureAsPdfIcon titleAccess='Petição em PDF' />}
                                color="default"
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    {ticket && ticket.peticao_word && (
                        <Link
                            href={ticket.peticao_word}
                            style={{ textDecoration: 'none' }}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <Chip
                                icon={<ArticleIcon />}
                                label={`Download do WORD da Petição`}
                                color="default"
                                style={{ marginInline: '10px' }}
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />

                            <Chip
                                icon={<ArticleIcon titleAccess='Petição em Word' />}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    <Chip
                        label={ticket && ticket.peticao_pdf ? "Gerada!" : "Não gerada!"}
                        color={ticket && ticket.peticao_pdf ? "success" : "warning"}
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
                        VERIFIQUE OS CAMPOS BÁSICOS SOBRE O SEU CLIENTE:
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
                                {tipoPessoa === "pf" && <>Nome do Cliente *</>}
                                {tipoPessoa === "pj" && <>Razão Social *</>}
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

                        {tipoPessoa === "pf" && (
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
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    value={cpf}
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setCPF(formatCpf(value));
                                    }}
                                    placeholder="CPF do cliente"
                                    variant="outlined"
                                />
                            </Grid>
                        )}

                        {tipoPessoa === "pj" && (
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
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    value={cnpj}
                                    placeholder="CNPJ do cliente"
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setCNPJ(formatCnpj(value));
                                    }}
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
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
                                    Data de Nascimento *
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    type="date"
                                    id="outlined-basic"
                                    value={dataNascimento}
                                    onChange={(e) => {
                                        setDataNascimento(e.target.value);
                                    }}
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
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
                                    Estado Civil *
                                </Typography>
                                <Select
                                    id="estadoCivil"
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
                                    <MenuItem value={"Divorciado(a)"}>Divorciado(a)</MenuItem>
                                    <MenuItem value={"Viuvo(a)"}>Viúvo(a)</MenuItem>
                                    <MenuItem value={"Separado(a) Judicialmente"}>
                                        Separado(a) Judicialmente
                                    </MenuItem>
                                    <MenuItem value={"em União Estável"}>
                                        em União Estável
                                    </MenuItem>
                                </Select>
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
                                    Profissão do cliente *
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    value={profissao}
                                    onChange={(e) => {
                                        setProfissao(e.target.value);
                                    }}
                                    placeholder="Insira a profissão do cliente..."
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
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
                                required
                                fullWidth
                                id="outlined-basic"
                                value={cep}
                                placeholder="Digite o CEP do seu cliente"
                                onChange={(e) => {
                                    setCEP(formatCepInput(e.target.value));
                                }}
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
                                Rua *
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={rua}
                                onChange={(e) => setRua(e.target.value)}
                                placeholder="Insira a rua do cliente..."
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
                                Número *
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                placeholder="Insira o número da residência do cliente..."
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
                                Complemento
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)}
                                placeholder="Insira o complemento..."
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
                                Bairro *
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                placeholder="Insira o bairro do cliente..."
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
                                Cidade *
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                placeholder="Insira a cidade do cliente..."
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
                                Estado *
                            </Typography>
                            <Select
                                variant="outlined"
                                sx={{ borderRadius: "10px" }}
                                id="estado"
                                value={estado}
                                fullWidth
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
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    borderBottom: "2px solid #00479d",
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                    width: "100%",
                                }}
                            >
                                INSIRA INFORMAÇÕES SOBRE A AÇÃO PARA A IA ANALISAR:
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    color: "black",
                                    marginLeft: "10px",
                                }}
                            >
                                A Inteligência Artificial insere automaticamente a instituição
                                bancária emissora do boleto falso no polo passivo da demanda.
                                Adicionar também a instituição bancária emissora do boleto
                                original?
                            </Typography>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={quantidadeBancos}
                                style={{ marginLeft: "10px", color: "black" }}
                                onChange={(e) => setQuantidadeBancos(e.target.value)}
                            >
                                <FormControlLabel value="2" control={<Radio />} label="Sim" />
                                <FormControlLabel value="1" control={<Radio />} label="Não" />
                            </RadioGroup>

                            <br />

                            <Divider />
                        </Grid>

                        <Grid
                            item
                            style={{ padding: 10 }}
                            xs={12}
                        >
                            <Typography
                                sx={{
                                    color: "black",
                                    marginLeft: quantidadeBancos === "2" ? "20px" : "10px",
                                    marginTop: "15px",
                                }}
                            >
                                Revise os dados da instituição bancária que emitiu o boleto
                                falso:
                            </Typography>

                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: quantidadeBancos === "2" ? "20px" : "10px",
                                    fontSize: 15,
                                    marginTop: 3,
                                }}
                            >
                                Banco e endereço do emissor do boleto falso *
                            </Typography>
                            <Autocomplete
                                id="free-solo-demo"
                                fullWidth
                                freeSolo
                                options={
                                    banks
                                        ? banks.map(
                                            (bank: any) =>
                                                `${capitalizeFirstLetter(
                                                    bank.NOME_INSTITUICAO as string
                                                )}, inscrito no CNPJ sob o nº ${bank.CNPJ
                                                }, com endereço em ${capitalizeFirstLetter(
                                                    bank.ENDERECO as string
                                                )}, ${bank.COMPLEMENTO
                                                    ? `${capitalizeFirstLetter(
                                                        bank.COMPLEMENTO as string
                                                    )}, `
                                                    : ""
                                                } ${capitalizeFirstLetter(
                                                    bank.BAIRRO as string
                                                )}, ${capitalizeFirstLetter(
                                                    bank.MUNICIPIO as string
                                                )}/${bank.UF}, CEP: ${bank.CEP}`
                                        )
                                        : []
                                }
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        variant="outlined"
                                        {...params}
                                        style={{
                                            marginLeft: "0px",
                                        }}
                                        placeholder="Banco e Endereco"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                                inputValue={
                                    inputBancoBoletoFalso ? inputBancoBoletoFalso : ""
                                }
                                onInputChange={(event, newInputValue) => {
                                    setInputBancoBoletoFalso(newInputValue);
                                }}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setBancoBoletoFalso(newValue);
                                    }
                                }}
                                style={{
                                    marginLeft: quantidadeBancos === "2" ? "20px" : "10px",
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: quantidadeBancos === "2" ? "20px" : "10px",
                                    fontSize: 15,
                                    marginTop: 1,
                                }}
                            >
                                Data de vencimento do boleto falso *
                            </Typography>

                            <TextField
                                required
                                fullWidth
                                type="date"
                                id="outlined-basic"
                                value={dataVencimentoBoletoFalso}
                                onChange={(e) => setDataVencimentoBoletoFalso(e.target.value)}
                                placeholder="Insira a data de vencimento..."
                                variant="outlined"
                                style={{
                                    marginLeft: quantidadeBancos === "2" ? "10px" : "0px",
                                }}
                                InputLabelProps={{ shrink: true }}
                            />

                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: quantidadeBancos === "2" ? "20px" : "10px",
                                    fontSize: 15,
                                    marginTop: 1,
                                }}
                            >
                                Valor do boleto falso *
                            </Typography>

                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={valorBoletoFalso}
                                onChange={(e) => setValorBoletoFalso(e.target.value)}
                                placeholder="Insira o valor do boleto..."
                                variant="outlined"
                                style={{
                                    marginLeft: quantidadeBancos === "2" ? "10px" : "0px",
                                }}
                                InputProps={{
                                    inputComponent: ContractValueMemo,
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        {quantidadeBancos === "2" && (
                            <Grid style={{ padding: 10 }} xs={12}>
                                <Typography
                                    sx={{
                                        color: "black",
                                        marginLeft: quantidadeBancos === "2" ? "20px" : "10px",
                                        marginTop: "15px",
                                    }}
                                >
                                    Revise os dados da instituição bancária que emitiu o boleto
                                    verdadeiro:
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#00479d",
                                        fontWeight: "bold",
                                        marginLeft: quantidadeBancos === "2" ? "20px" : "10px",
                                        fontSize: 15,
                                        marginTop: 3,
                                    }}
                                >
                                    Banco e endereço do emissor do boleto verdadeiro *
                                </Typography>
                                <Autocomplete
                                    id="free-solo-demo"
                                    fullWidth
                                    freeSolo
                                    options={
                                        banks
                                            ? banks.map(
                                                (bank: any) =>
                                                    `${capitalizeFirstLetter(
                                                        bank.NOME_INSTITUICAO as string
                                                    )}, inscrito no CNPJ sob o nº ${bank.CNPJ
                                                    }, com endereço em ${capitalizeFirstLetter(
                                                        bank.ENDERECO as string
                                                    )}, ${bank.COMPLEMENTO
                                                        ? `${capitalizeFirstLetter(
                                                            bank.COMPLEMENTO as string
                                                        )}, `
                                                        : ""
                                                    } ${capitalizeFirstLetter(
                                                        bank.BAIRRO as string
                                                    )}, ${capitalizeFirstLetter(
                                                        bank.MUNICIPIO as string
                                                    )}/${bank.UF}, CEP: ${bank.CEP}`
                                            )
                                            : []
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            variant="outlined"
                                            {...params}
                                            style={{
                                                marginLeft: "0px",
                                            }}
                                            placeholder="Banco e Endereco"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}
                                    inputValue={
                                        inputBancoBoletoVerdadeiro
                                            ? inputBancoBoletoVerdadeiro
                                            : ""
                                    }
                                    onInputChange={(event, newInputValue) => {
                                        setInputBancoBoletoVerdadeiro(newInputValue);
                                    }}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setBancoBoletoVerdadeiro(newValue);
                                        }
                                    }}
                                    style={{
                                        marginLeft: quantidadeBancos === "2" ? "20px" : "10px",
                                    }}
                                />

                                <Typography
                                    sx={{
                                        color: "#00479d",
                                        fontWeight: "bold",
                                        marginLeft: quantidadeBancos === "2" ? "20px" : "10px",
                                        fontSize: 15,
                                        marginTop: 1,
                                    }}
                                >
                                    Data de vencimento do boleto verdadeiro *
                                </Typography>

                                <TextField
                                    required
                                    fullWidth
                                    type="date"
                                    id="outlined-basic"
                                    value={dataVencimentoBoletoVerdadeiro}
                                    onChange={(e) =>
                                        setDataVencimentoBoletoVerdadeiro(e.target.value)
                                    }
                                    placeholder="Insira a data de vencimento..."
                                    variant="outlined"
                                    style={{
                                        marginLeft: quantidadeBancos === "2" ? "10px" : "0px",
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                />

                                <Typography
                                    sx={{
                                        color: "#00479d",
                                        fontWeight: "bold",
                                        marginLeft: quantidadeBancos === "2" ? "20px" : "10px",
                                        fontSize: 15,
                                        marginTop: 1,
                                    }}
                                >
                                    Valor do boleto verdadeiro *
                                </Typography>

                                <TextField
                                    required
                                    fullWidth
                                    id="outlined-basic"
                                    value={valorBoletoVerdadeiro}
                                    onChange={(e) => setValorBoletoVerdadeiro(e.target.value)}
                                    placeholder="Insira o valor do boleto..."
                                    variant="outlined"
                                    style={{
                                        marginLeft: quantidadeBancos === "2" ? "10px" : "0px",
                                    }}
                                    InputProps={{
                                        inputComponent: ContractValueMemo,
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <Divider />
                            <br />
                            <Typography
                                sx={{
                                    color: "black",
                                    marginLeft: "10px",
                                }}
                            >
                                Foi confeccionado boletim de ocorrência?
                            </Typography>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={boletimDeOcorrencia}
                                style={{ marginLeft: "10px", color: "black" }}
                                onChange={(e) => setBoletimDeOcorrencia(e.target.value)}
                            >
                                <FormControlLabel
                                    value="true"
                                    control={<Radio />}
                                    label="Sim"
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio />}
                                    label="Não"
                                />
                            </RadioGroup>

                            <br />

                            <Divider />
                        </Grid>

                        <Box sx={{ borderBottom: '1px solid #ccc', width: '100%', paddingInline: 1.5, marginInline: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                            <Grid item xs={danosMorais === "true" ? 6 : 12}>
                                <Typography
                                    sx={{
                                        color: "black",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Incluir pedido de danos morais?
                                </Typography>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    value={danosMorais}
                                    style={{ marginLeft: "10px", color: "black" }}
                                    onChange={(e) => setDanosMorais(e.target.value)}
                                >
                                    <FormControlLabel
                                        value="true"
                                        control={<Radio />}
                                        label="Sim"
                                    />
                                    <FormControlLabel
                                        value="false"
                                        control={<Radio />}
                                        label="Não"
                                    />
                                </RadioGroup>

                                <br />

                                {/* <Divider /> */}
                            </Grid>

                            {danosMorais === "true" && (
                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        sx={{
                                            color: "#00479d",
                                            fontWeight: "bold",
                                            marginLeft: quantidadeBancos === "2" ? "20px" : "10px",
                                            fontSize: 15,
                                            marginTop: 1.7,
                                        }}
                                    >
                                        Valor de danos morais *
                                    </Typography>

                                    <TextField
                                        required
                                        fullWidth
                                        id="outlined-basic"
                                        value={valorDanosMorais}
                                        onChange={(e) => setValorDanosMorais(e.target.value)}
                                        placeholder="Insira o valor de danos morais..."
                                        variant="outlined"
                                        InputProps={{
                                            inputComponent: ContractValueMemo,
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            )}
                        </Box>

                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    color: "black",
                                    marginLeft: "10px",
                                }}
                            >
                                Em qual cidade/estado você quer propor a ação?
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={municipioEEstadoAcao}
                                onChange={(e) => setMunicipioEEstadoAcao(e.target.value)}
                                placeholder="Ex: Florianópolis/SC"
                                variant="outlined"
                                style={{
                                    marginLeft: "0px",
                                }}
                                InputLabelProps={{ shrink: true }}
                            />

                            <br />

                            <Divider />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes("create") ||
                    regraDominio?.permissoes?.includes("update")) && (
                        <Button
                            onClick={() => saveAndCreatePetition()}
                            color="success"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={20}
                                    style={{ color: "white", marginRight: 10 }}
                                />
                            ) : (
                                ""
                            )}{" "}
                            SALVAR E GERAR PETIÇÃO
                        </Button>
                    )}
                {/* {ticket && ticket.petition_spaces_key && (
            <Button
              style={{ marginLeft: 5 }}
              color="success"
              variant="contained"
            >
              ENVIAR PARA ASSINATURA
            </Button>
          )} */}
            </AccordionDetails>
        </Accordion>
    )
}
