import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { onlyNumber, formatCpf, formatCepInput } from '@/app/utils/Formater';
import { formatarDataParaFormatoBr, formatarDataParaFormatoAmericano } from '@/domain/services/Date';
import { StyledTableCell, StyledTableRow } from '@/presentation/styles/TablesStyles';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Button, TableContainer, Paper, Table, TableHead, TableRow, TableBody, Radio, Grid, TextField, FormControl, Select, MenuItem, FormHelperText, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react'

interface IPeticao {
    ticket: any
    pessoas: any[]
    pessoaSelecionada: string | undefined
    nameClient: string
    errorsPeticao: any
    estadoCivil: string
    profissao: string
    cpfClient: string
    rgClient: string
    cep: string
    enderecoCompleto: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
    rendaParteAutora: string
    fonteDeRendaParteAutora: string
    dataRequerimento: string
    dataNascimentoAutora: string
    numeroBeneficio: string
    idadeClienteAutora: string
    secaoJudiciariaEstado: string
    doencas: string[]
    regraDominio: any
    loading: boolean
    setPessoaModal: (value: boolean) => void
    setPessoaId: (value: string) => void
    setPessoaNome: (value: string) => void
    setCpfPessoa: (value: string) => void
    setDataNascimentoPessoa: (value: string) => void
    setRendaPessoa: (value: string) => void
    setFonteDeRendaPessoa: (value: string) => void
    setRgPessoa: (value: string) => void
    setProfissaoPessoa: (value: string) => void
    setParentesco: (value: string) => void
    setEstadoCivilPessoa: (value: string) => void
    resetPessoa: (value?: any) => any
    preencherInformacoesPeticao: (value: any) => any
    handleDeletePessoa: (index: number) => any
    handleSubmitPeticao: (value: any) => any
    saveAndCreatePetition: (value?: any) => any
    registerPeticao: (value: string) => any
    setNameClient: (value: string) => void
    resetPeticao: (value: any) => any
    setPessoas: (value: any[]) => void
    setEstadoCivil: (value: any) => void
    setProfissao: (value: string) => void
    setCPFClient: (value: string) => void
    resetProcuracao: (value: any) => void
    setRGClient: (value: string) => void
    setCep: (value: string) => void
    setEnderecoCompleto: (value: string) => void
    setNumero: (value: string) => void
    setComplemento: (value: string) => void
    setBairro: (value: string) => void
    setCidade: (value: string) => void
    setEstado: (value: any) => void
    setRendaParteAutora: (value: string) => void
    ContractValueMemo: (value: any) => JSX.Element
    setFonteRendaParteAutora: (value: string) => void
    setDataRequerimento: (value: string) => void
    setDataNascimentoAutora: (value: string) => void
    setNumeroBeneficio: (value: string) => void
    calculateIdade: (value: string) => any
    setIdadeClienteAutora: (value: string) => void
    setSecaoJudiciariaEstado: (value: string) => void
    setDoencaModal: (value: boolean) => void
    resetDoenca: (value?: any) => any
    handleDeleteDoenca: (index: number) => void
}

export default function Peticao(props: IPeticao) {
    const {
        ticket: api_data,
        pessoas,
        pessoaSelecionada,
        nameClient,
        errorsPeticao,
        estadoCivil,
        profissao,
        cpfClient,
        rgClient,
        cep,
        enderecoCompleto,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        rendaParteAutora,
        fonteDeRendaParteAutora,
        dataRequerimento,
        dataNascimentoAutora,
        numeroBeneficio,
        idadeClienteAutora,
        secaoJudiciariaEstado,
        doencas,
        regraDominio,
        loading,
        setPessoaModal,
        setPessoaId,
        setPessoaNome,
        setCpfPessoa,
        setDataNascimentoPessoa,
        setRendaPessoa,
        setFonteDeRendaPessoa,
        setRgPessoa,
        setProfissaoPessoa,
        setParentesco,
        setEstadoCivilPessoa,
        resetPessoa,
        preencherInformacoesPeticao,
        handleDeletePessoa,
        handleSubmitPeticao,
        saveAndCreatePetition,
        registerPeticao,
        setNameClient,
        resetPeticao,
        setPessoas,
        setEstadoCivil,
        setProfissao,
        setCPFClient,
        resetProcuracao,
        setRGClient,
        setCep,
        setEnderecoCompleto,
        setNumero,
        setComplemento,
        setBairro,
        setCidade,
        setEstado,
        setRendaParteAutora,
        ContractValueMemo,
        setFonteRendaParteAutora,
        setDataRequerimento,
        setDataNascimentoAutora,
        setNumeroBeneficio,
        calculateIdade,
        setIdadeClienteAutora,
        setSecaoJudiciariaEstado,
        setDoencaModal,
        resetDoenca,
        handleDeleteDoenca
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
                    {api_data && api_data.peticao_pdf && (
                        <Link
                            href={api_data.peticao_pdf}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<PictureAsPdfIcon sx={{ position: 'relative', top: 2, left: { xs: 3, md: 0 } }} />}
                                label={`Download do PDF da Petição`}
                                color="default"
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />
                            <Chip
                                icon={<PictureAsPdfIcon sx={{ position: 'relative', top: 2, left: { xs: 3, md: 0 } }} />}
                                color="default"
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    {api_data && api_data.peticao_word && (
                        <Link
                            href={api_data.peticao_word}
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
                        label={api_data && api_data.peticao_pdf ? "Gerada!" : "Não gerada!"}
                        color={api_data && api_data.peticao_pdf ? "success" : "warning"}
                        size="small"
                    />
                </Box>
            </AccordionSummary>

            <br />

            <Accordion expanded>
                <Accordion expanded>
                    <AccordionDetails>
                        <Accordion expanded>
                            <AccordionSummary
                                sx={{ backgroundColor: "" }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                            >
                                <Typography
                                    style={{
                                        marginRight: 10,
                                        width: "100%",
                                        color: "black",
                                        fontWeight: "bold",
                                    }}
                                >
                                    PARTE AUTORA E DEMAIS MEMBROS DA FAMÍLIA
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ width: "250px" }}
                                    style={{ fontWeight: "bold" }}
                                    startIcon={<FamilyRestroomIcon />}
                                    onClick={() => {
                                        setPessoaModal(true), setPessoaId(""), setPessoaNome("");
                                        setCpfPessoa("");
                                        setDataNascimentoPessoa("");
                                        setRendaPessoa("");
                                        setFonteDeRendaPessoa("");
                                        setRgPessoa("");
                                        setProfissaoPessoa("");
                                        setParentesco("");
                                        setEstadoCivilPessoa("");
                                        resetPessoa();
                                    }}
                                >
                                    Adicionar Pessoa
                                </Button>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer
                                    style={{
                                        boxShadow:
                                            "0px -8px 10px -5px rgba(0, 0, 0, 0.2), 0px 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                    }}
                                    component={Paper}
                                >
                                    <Table
                                        sx={{ minWidth: 1000 }}
                                        aria-label="customized table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell
                                                    style={{
                                                        backgroundColor: "white",
                                                        color: "black",
                                                        fontWeight: "bold",
                                                        padding: "25px",
                                                    }}
                                                >
                                                    ESCOLHA A PARTE AUTORA
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    style={{
                                                        backgroundColor: "white",
                                                        color: "black",
                                                        fontWeight: "bold",
                                                        padding: "25px",
                                                    }}
                                                >
                                                    NOME
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    style={{
                                                        width: "280px",
                                                        backgroundColor: "white",
                                                        color: "black",
                                                        fontWeight: "bold",
                                                        padding: "25px",
                                                    }}
                                                >
                                                    CPF
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    style={{
                                                        backgroundColor: "white",
                                                        color: "black",
                                                        fontWeight: "bold",
                                                        padding: "25px",
                                                    }}
                                                >
                                                    DATA DE NASCIMENTO
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    style={{
                                                        width: "280px",
                                                        backgroundColor: "white",
                                                        color: "black",
                                                        fontWeight: "bold",
                                                        padding: "25px",
                                                    }}
                                                >
                                                    OPÇÕES
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {pessoas.map((pessoa: any, index: number) => {
                                                return (
                                                    <StyledTableRow key={pessoa.id}>
                                                        <StyledTableCell>
                                                            <Radio
                                                                checked={pessoaSelecionada === pessoa.id}
                                                                onChange={() => {
                                                                    preencherInformacoesPeticao(pessoa);
                                                                }}
                                                                name="pessoaSelecionada"
                                                                value={pessoaSelecionada}
                                                            />
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {pessoa.nome_cliente}
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {pessoa.cpf_cliente}
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {formatarDataParaFormatoBr(
                                                                pessoa.data_nascimento
                                                            )}
                                                        </StyledTableCell>
                                                        <StyledTableCell sx={{ gap: 2 }}>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                startIcon={<EditIcon />}
                                                                onClick={() => {
                                                                    setPessoaModal(true);
                                                                    setPessoaId(pessoa.id);
                                                                    setPessoaNome(pessoa.nome_cliente);
                                                                    setParentesco(pessoa.parentesco);
                                                                    setCpfPessoa(pessoa.cpf_cliente);
                                                                    setRgPessoa(pessoa.rg_pessoa);
                                                                    setDataNascimentoPessoa(
                                                                        pessoa.data_nascimento
                                                                    );
                                                                    setRendaPessoa(pessoa.renda);
                                                                    setFonteDeRendaPessoa(
                                                                        pessoa.fonte_de_renda
                                                                    );
                                                                    setRgPessoa(pessoa.rg_cliente);
                                                                    setProfissaoPessoa(pessoa.profissao);
                                                                    setEstadoCivilPessoa(pessoa.estado_civil);
                                                                    resetPessoa({
                                                                        pessoaNome: pessoa.nome_cliente,
                                                                        cpfPessoa: pessoa.cpf_pessoa,
                                                                        estadoCivilPessoa: pessoa.estado_civil,
                                                                        rendaPessoa: pessoa.renda,
                                                                        fonteDeRendaPessoa: pessoa.fonte_renda,
                                                                        dataNascimentoPessoa:
                                                                            pessoa.data_nascimento,
                                                                        rgPessoa: pessoa.rg_cliente,
                                                                        profissaoPessoa: pessoa.profissao,
                                                                    });
                                                                }}
                                                            >
                                                                Editar
                                                            </Button>
                                                            <Button
                                                                disabled={pessoaSelecionada === pessoa.id}
                                                                variant="contained"
                                                                color="primary"
                                                                startIcon={<DeleteIcon />}
                                                                sx={{ ml: 1 }}
                                                                onClick={() => handleDeletePessoa(index)}
                                                            >
                                                                Excluir
                                                            </Button>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    </AccordionDetails>
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
                            id="form-peticao"
                            container
                            component="form"
                            onSubmit={handleSubmitPeticao(saveAndCreatePetition)}
                            spacing={2}
                        >
                            <Grid item style={{ borderRadius: "30px" }} xs={12} sm={6} md={4}>
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
                                    fullWidth
                                    placeholder="Digite seu nome completo"
                                    value={nameClient}
                                    error={errorsPeticao.nameClient ? true : false}
                                    helperText={errorsPeticao.nameClient?.message?.toString()}
                                    {...registerPeticao("nameClient")}
                                    onChange={(e: any) => {
                                        setNameClient(e.target.value);
                                        resetPeticao({
                                            nameClient: e.target.value,
                                        });
                                        const index = pessoas.findIndex(
                                            (pessoa) =>
                                                pessoa.nome_cliente.toLowerCase() ===
                                                e.target.value.toLowerCase()
                                        );
                                        if (index > -1) {
                                            preencherInformacoesPeticao(pessoas[index]);
                                        }

                                        if (pessoaSelecionada) {
                                            const index = pessoas.findIndex(
                                                (pessoa) => pessoa.id === pessoaSelecionada
                                            );
                                            const clonePessoasArray = [...pessoas];
                                            clonePessoasArray[index].nome_cliente = e.target.value;
                                            setPessoas(clonePessoasArray);
                                        }
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
                                    Estado Civil
                                </Typography>
                                <FormControl
                                    fullWidth
                                    variant="filled"
                                    error={errorsPeticao.estadoCivil ? true : false}
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
                                        {...registerPeticao("estadoCivil")}
                                        onChange={(e) => {
                                            setEstadoCivil(e.target.value);
                                            resetPeticao({
                                                estadoCivil: e.target.value,
                                            });
                                            if (pessoaSelecionada) {
                                                const index = pessoas.findIndex(
                                                    (pessoa) => pessoa.id === pessoaSelecionada
                                                );
                                                const clonePessoasArray = [...pessoas];
                                                clonePessoasArray[index].estado_civil =
                                                    e.target.value;
                                                setPessoas(clonePessoasArray);
                                            }
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
                                    {errorsPeticao.estadoCivil ? (
                                        <FormHelperText>
                                            {errorsPeticao.estadoCivil?.message?.toString()}
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
                                    placeholder="Digite sua profissão"
                                    variant="outlined"
                                    value={profissao}
                                    error={errorsPeticao.profissao ? true : false}
                                    helperText={errorsPeticao.profissao?.message?.toString()}
                                    {...registerPeticao("profissao")}
                                    onChange={(e) => {
                                        setProfissao(e.target.value);
                                        resetPeticao({
                                            profissao: e.target.value,
                                        });
                                        if (pessoaSelecionada) {
                                            const index = pessoas.findIndex(
                                                (pessoa) => pessoa.id === pessoaSelecionada
                                            );
                                            const clonePessoasArray = [...pessoas];
                                            clonePessoasArray[index].profissao = e.target.value;
                                            setPessoas(clonePessoasArray);
                                        }
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
                                    CPF do cliente
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={cpfClient}
                                    error={errorsPeticao.cpfClient ? true : false}
                                    helperText={errorsPeticao.cpfClient?.message?.toString()}
                                    {...registerPeticao("cpfClient")}
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setCPFClient(formatCpf(value));
                                        resetProcuracao({
                                            cpfClient: formatCpf(value),
                                        });
                                        const pessoa = pessoas.find(
                                            (pessoa) =>
                                                pessoa?.cpf_cliente?.toLowerCase() ===
                                                formatCpf(value)
                                        );
                                        if (pessoa) {
                                            preencherInformacoesPeticao(pessoa);
                                        }
                                        if (pessoaSelecionada) {
                                            const index = pessoas.findIndex(
                                                (pessoa) => pessoa.id === pessoaSelecionada
                                            );
                                            const clonePessoasArray = [...pessoas];
                                            clonePessoasArray[index].cpf_cliente = formatCpf(value);
                                            setPessoas(clonePessoasArray);
                                        }
                                    }}
                                    placeholder="Digite seu CPF"
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
                                    RG
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={rgClient}
                                    error={errorsPeticao.rg ? true : false}
                                    helperText={errorsPeticao.rg?.message?.toString()}
                                    {...registerPeticao("rg")}
                                    onChange={(e) => {
                                        setRGClient(e.target.value);
                                        resetPeticao({
                                            rgClient: e.target.value,
                                        });
                                        const index = pessoas.findIndex(
                                            (pessoa) =>
                                                pessoa.rg_cliente.toLowerCase() ===
                                                e.target.value.toLowerCase()
                                        );
                                        if (index > -1) {
                                            preencherInformacoesPeticao(pessoas[index]);
                                        }

                                        if (pessoaSelecionada) {
                                            const index = pessoas.findIndex(
                                                (pessoa) => pessoa.id === pessoaSelecionada
                                            );
                                            const clonePessoasArray = [...pessoas];
                                            clonePessoasArray[index].rg_cliente = e.target.value;
                                            setPessoas(clonePessoasArray);
                                        }
                                    }}
                                    placeholder="Digite o RG da parte autora"
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
                                    CEP
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    fullWidth
                                    placeholder="Digite seu CEP"
                                    variant="outlined"
                                    value={cep}
                                    error={errorsPeticao.cep ? true : false}
                                    helperText={errorsPeticao.cep?.message?.toString()}
                                    {...registerPeticao("cep")}
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setCep(formatCepInput(value));
                                        resetPeticao({
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
                                    Endereço do cliente
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={enderecoCompleto}
                                    error={errorsPeticao.enderecoCompleto ? true : false}
                                    helperText={errorsPeticao.enderecoCompleto?.message?.toString()}
                                    {...registerPeticao("enderecoCompleto")}
                                    onChange={(e) => {
                                        setEnderecoCompleto(e.target.value);
                                        resetPeticao({
                                            enderecoCompleto: e.target.value,
                                        });
                                    }}
                                    placeholder="Digite seu endereço"
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
                                    Número
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Digite o número..."
                                    variant="outlined"
                                    value={numero}
                                    error={errorsPeticao.numero ? true : false}
                                    helperText={errorsPeticao.numero?.message?.toString()}
                                    {...registerPeticao("numero")}
                                    onChange={(e) => {
                                        setNumero(e.target.value);
                                        resetPeticao({
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
                                    Complemento
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    fullWidth
                                    placeholder="Digite o complemento"
                                    variant="outlined"
                                    value={complemento}
                                    error={errorsPeticao.complemento ? true : false}
                                    helperText={errorsPeticao.complemento?.message?.toString()}
                                    {...registerPeticao("complemento")}
                                    onChange={(e) => {
                                        setComplemento(e.target.value);
                                        resetPeticao({
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
                                    Bairro
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    fullWidth
                                    placeholder="Digite  seu Bairro "
                                    variant="outlined"
                                    value={bairro}
                                    error={errorsPeticao.bairro ? true : false}
                                    helperText={errorsPeticao.bairro?.message?.toString()}
                                    {...registerPeticao("bairro")}
                                    onChange={(e) => {
                                        setBairro(e.target.value);
                                        resetPeticao({
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
                                    Cidade
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={cidade}
                                    error={errorsPeticao.cidade ? true : false}
                                    helperText={errorsPeticao.cidade?.message?.toString()}
                                    {...registerPeticao("cidade")}
                                    onChange={(e) => setCidade(e.target.value)}
                                    placeholder="Digite a sua cidade"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl
                                    error={errorsPeticao.estado ? true : false}
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
                                        sx={{ borderRadius: "10px", width: '100%' }}
                                        id="estado"
                                        value={estado}
                                        {...registerPeticao("estado")}
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
                                    {errorsPeticao.estado ? (
                                        <FormHelperText>
                                            {errorsPeticao.estado?.message?.toString()}
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
                                    Renda Parte Autora
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Digite a renda da parte autora"
                                    variant="outlined"
                                    value={rendaParteAutora}
                                    error={errorsPeticao.rendaParteAutora ? true : false}
                                    helperText={errorsPeticao.rendaParteAutora?.message?.toString()}
                                    {...registerPeticao("rendaParteAutora")}
                                    onChange={(e) => {
                                        setRendaParteAutora(e.target.value);
                                        if (pessoaSelecionada) {
                                            const index = pessoas.findIndex(
                                                (pessoa) => pessoa.id === pessoaSelecionada
                                            );
                                            const clonePessoasArray = [...pessoas];
                                            clonePessoasArray[index].renda = e.target.value;
                                            setPessoas(clonePessoasArray);
                                        }
                                    }}
                                    InputProps={{
                                        inputComponent: ContractValueMemo,
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
                                    Fonte de Renda Parte Autora
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Digite a Fonte de renda da parte autora"
                                    variant="outlined"
                                    value={fonteDeRendaParteAutora}
                                    error={errorsPeticao.fonteDeRendaParteAutora ? true : false}
                                    helperText={errorsPeticao.fonteDeRendaParteAutora?.message?.toString()}
                                    {...registerPeticao("fonteDeRendaParteAutora")}
                                    onChange={(e) => {
                                        setFonteRendaParteAutora(e.target.value);
                                        resetPeticao({
                                            fonteDeRendaParteAutora: e.target.value,
                                        });
                                        if (pessoaSelecionada) {
                                            const index = pessoas.findIndex(
                                                (pessoa) => pessoa.id === pessoaSelecionada
                                            );
                                            const clonePessoasArray = [...pessoas];
                                            clonePessoasArray[index].fonte_de_renda =
                                                e.target.value;
                                            setPessoas(clonePessoasArray);
                                        }
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
                                    Data Requerimento
                                </Typography>
                                <TextField
                                    id="date"
                                    fullWidth
                                    type="date"
                                    placeholder="Digite a data Requerimento"
                                    variant="outlined"
                                    value={dataRequerimento}
                                    error={errorsPeticao.dataRequerimento ? true : false}
                                    helperText={errorsPeticao.dataRequerimento?.message?.toString()}
                                    {...registerPeticao("dataRequerimento")}
                                    onChange={(e) => {
                                        setDataRequerimento(e.target.value);
                                        resetPeticao({
                                            dataRequerimento: e.target.value,
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
                                    Número Benefício
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    fullWidth
                                    placeholder="Digite o número Benefício"
                                    variant="outlined"
                                    value={numeroBeneficio}
                                    error={errorsPeticao.numeroBeneficio ? true : false}
                                    helperText={errorsPeticao.numeroBeneficio?.message?.toString()}
                                    {...registerPeticao("numeroBeneficio")}
                                    onChange={(e) => {
                                        setNumeroBeneficio(e.target.value);
                                        resetPeticao({
                                            numeroBeneficio: e.target.value,
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
                                    Data de nascimento da parte autora
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    fullWidth
                                    placeholder="Insira a data de nascimento..."
                                    variant="outlined"
                                    type="date"
                                    value={formatarDataParaFormatoAmericano(
                                        dataNascimentoAutora
                                    )}
                                    error={
                                        errorsPeticao.dataNascimentoParteAutora ? true : false
                                    }
                                    helperText={errorsPeticao.dataNascimentoParteAutora?.message?.toString()}
                                    {...registerPeticao("dataNascimentoParteAutora")}
                                    onChange={(e) => {
                                        setDataNascimentoAutora(e.target.value);
                                        calculateIdade(e.target.value);
                                        resetPeticao({
                                            dataNascimentoAutora: e.target.value,
                                        });
                                        if (pessoaSelecionada) {
                                            const index = pessoas.findIndex(
                                                (pessoa) => pessoa.id === pessoaSelecionada
                                            );
                                            const clonePessoasArray = [...pessoas];
                                            clonePessoasArray[index].data_nascimento =
                                                e.target.value;
                                            setPessoas(clonePessoasArray);
                                        }
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
                                    Idade parte autora
                                </Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Digite a idade da parte autora"
                                    variant="outlined"
                                    disabled
                                    value={idadeClienteAutora}
                                    error={errorsPeticao.idadeParteAutora ? true : false}
                                    helperText={errorsPeticao.idadeParteAutora?.message?.toString()}
                                    {...registerPeticao("idadeParteAutora")}
                                    onChange={(e) => {
                                        setIdadeClienteAutora(e.target.value);
                                        resetPeticao({
                                            idadeClienteAutora: e.target.value,
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
                                    Seção Judiciária
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    fullWidth
                                    placeholder="Seção Judiciária"
                                    variant="outlined"
                                    value={secaoJudiciariaEstado}
                                    error={errorsPeticao.secaoJudiciariaEstado ? true : false}
                                    helperText={errorsPeticao.secaoJudiciariaEstado?.message?.toString()}
                                    {...registerPeticao("secaoJudiciariaEstado")}
                                    onChange={(e) => {
                                        setSecaoJudiciariaEstado(e.target.value);
                                        resetPeticao({
                                            secaoJudiciariaEstado: e.target.value,
                                        });
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <AccordionDetails>
                    <Accordion expanded>
                        <AccordionSummary
                            sx={{ backgroundColor: "white" }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                        >
                            <Typography
                                style={{
                                    marginRight: 10,
                                    width: "100%",
                                    color: "black",
                                    fontWeight: "bold",
                                }}
                            >
                                DOENÇAS ( CID ) ADICIONADAS
                            </Typography>
                            <Button
                                variant="contained"
                                style={{ fontWeight: "bold", marginLeft: "" }}
                                sx={{ width: "250px" }}
                                startIcon={<MedicalServicesIcon />}
                                onClick={() => {
                                    setDoencaModal(true), resetDoenca();
                                }}
                            >
                                Adicionar Doença
                            </Button>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer
                                style={{
                                    boxShadow:
                                        "0px -8px 10px -5px rgba(0, 0, 0, 0.2), 0px 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                }}
                                component={Paper}
                            >
                                <Table sx={{ minWidth: 1000 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell
                                                style={{
                                                    backgroundColor: "white",
                                                    color: "black",
                                                    fontWeight: "bold",
                                                    padding: "25px",
                                                }}
                                            >
                                                Código
                                            </StyledTableCell>
                                            <StyledTableCell
                                                style={{
                                                    backgroundColor: "white",
                                                    color: "black",
                                                    fontWeight: "bold",
                                                    padding: "25px",
                                                }}
                                            >
                                                Nome Doença
                                            </StyledTableCell>
                                            <StyledTableCell
                                                style={{
                                                    backgroundColor: "white",
                                                    color: "black",
                                                    fontWeight: "bold",
                                                    padding: "25px",
                                                }}
                                            >
                                                Ações
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {doencas.map((doenca: any, index: number) => (
                                            <StyledTableRow key={doenca.id}>
                                                <StyledTableCell>{doenca.codigo}</StyledTableCell>
                                                <StyledTableCell>{doenca.nome}</StyledTableCell>
                                                <StyledTableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={<DeleteIcon />}
                                                        onClick={() => handleDeleteDoenca(index)}
                                                    >
                                                        Excluir
                                                    </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes("create") ||
                    regraDominio?.permissoes?.includes("update")) && (
                        <Button
                            type="submit"
                            color="success"
                            variant="contained"
                            disabled={loading}
                            form="form-peticao"
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

            </AccordionDetails>
        </Accordion>
    )
}
