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
import { Btn } from "@/presentation/components/Button";
import GridTextField from "@/presentation/components/GridTextField";
import GridSelectField from "@/presentation/components/GridSelectField";
import { estado_civil } from "@/domain/data/estado_civil";
import { estados_brasileiros } from "@/app/utils/EstadosBrasileiros";
import GridCurrencyInput from "@/presentation/components/GridCurrencyInput";

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
    saveAndaddPetition: (value?: any) => any
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
        saveAndaddPetition,
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
                                    }}
                                >
                                    PARTE AUTORA E DEMAIS MEMBROS DA FAMÍLIA
                                </Typography>
                                <Btn
                                    text="Adicionar Pessoa"
                                    variant="contained"
                                    width={'250px'}
                                    marginRight={1}
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
                                />
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
                                                        padding: "25px",
                                                    }}
                                                >
                                                    ESCOLHA A PARTE AUTORA
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    style={{
                                                        backgroundColor: "white",
                                                        color: "black",
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
                                                        padding: "25px",
                                                    }}
                                                >
                                                    CPF
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    style={{
                                                        backgroundColor: "white",
                                                        color: "black",
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
                                                            <Btn
                                                                variant="contained"
                                                                color="primary"
                                                                text="Editar"
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
                                                            />
                                                            <Btn
                                                                disabled={pessoaSelecionada === pessoa.id}
                                                                variant="contained"
                                                                color="primary"
                                                                text="Excluir"
                                                                sx={{ ml: 1 }}
                                                                onClick={() => handleDeletePessoa(index)}
                                                            />
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
                            onSubmit={handleSubmitPeticao(saveAndaddPetition)}
                            spacing={2}
                        >

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                label="Nome"
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
                                variant="filled"

                            />

                            <GridSelectField
                                xs={12}
                                sm={6}
                                md={4}
                                label="Estado Civil"
                                variant="filled"
                                placeholder="Estado Civil"
                                value={estadoCivil}
                                options={estado_civil}
                                error={errorsPeticao.estadoCivil ? true : false}
                                helperText={errorsPeticao.estadoCivil?.message?.toString()}
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
                                name={"estado_civil"}
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                label="Profissão"
                                variant="filled"
                                placeholder="Profissão"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="CPF"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="RG"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                label="CEP"
                                placeholder="CEP"
                                variant="filled"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                label="Endereço"
                                variant="filled"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="Número"
                                placeholder="Digite o número"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="Complemento"
                                placeholder="Digite o complemento"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="Bairro"
                                placeholder="Bairro"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="Cidade"
                                value={cidade}
                                error={errorsPeticao.cidade ? true : false}
                                helperText={errorsPeticao.cidade?.message?.toString()}
                                {...registerPeticao("cidade")}
                                onChange={(e) => setCidade(e.target.value)}
                                placeholder="Digite a sua cidade"
                            />

                            <GridSelectField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="Estado"
                                placeholder="Estado"
                                error={errorsPeticao.estado ? true : false}
                                helperText={errorsPeticao.estado?.message?.toString()}
                                options={estados_brasileiros}
                                value={estado}
                                {...registerPeticao("estado")}
                                onChange={(e) => {
                                    setEstado(e.target.value);
                                }}
                            />

                            <GridCurrencyInput
                                xs={12}
                                sm={6}
                                md={4}
                                label="Renda Parte Autora"
                                placeholder="Digite a renda da parte autora"
                                variant="filled"
                                value={rendaParteAutora}
                                error={errorsPeticao.rendaParteAutora ? true : false}
                                helperText={errorsPeticao.rendaParteAutora?.message?.toString()}
                                {...registerPeticao("rendaParteAutora")}
                                onChange={(e: { target: { value: string; }; }) => {
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="Fonte de Renda Parte Autora"
                                placeholder="Digite a Fonte de renda da parte autora"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="Data Requerimento"
                                type="date"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="Número do Benefício"
                                placeholder="Número do Benefício"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="  Data de Nascimento"
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
                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                label="Idade"
                                variant="filled"
                                placeholder="Idade"
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

                            />

                            <GridTextField
                                xs={12}
                                sm={6}
                                md={4}
                                variant="filled"
                                label="Seção Judiciária"
                                placeholder="Seção Judiciária"
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
                            />

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
                                }}
                            >
                                DOENÇAS ( CID ) ADICIONADAS
                            </Typography>
                            <Btn
                                variant="contained"
                                width={'250px'}
                                marginRight={1}
                                text="Adicionar Doença"
                                onClick={() => {
                                    setDoencaModal(true), resetDoenca();
                                }}
                            />
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
                                                    padding: "25px",
                                                }}
                                            >
                                                Código
                                            </StyledTableCell>
                                            <StyledTableCell
                                                style={{
                                                    backgroundColor: "white",
                                                    color: "black",
                                                    padding: "25px",
                                                }}
                                            >
                                                Nome Doença
                                            </StyledTableCell>
                                            <StyledTableCell
                                                style={{
                                                    backgroundColor: "white",
                                                    color: "black",
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
                {(regraDominio?.permissoes?.includes("add") ||
                    regraDominio?.permissoes?.includes("update")) && (
                        <Btn
                            type="submit"
                            text="Gerar Petição"
                            variant="contained"
                            disabled={loading}
                            width={250}
                        />
                    )}

            </AccordionDetails>
        </Accordion>
    )
}
