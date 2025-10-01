import { onlyNumber, formatCpf } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, Autocomplete, FormControl, Select, MenuItem, Button, CircularProgress } from '@mui/material';
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
    cpfClient: string
    regraDominio: any
    calculationBase: string
    installmentValue: string
    committedValue: string
    contractValue: string
    inclusionDate: string
    banks: string[]
    inputBank: string
    contractNumber: string
    addressClient: string
    cityClient: string
    typeProcess: string
    loading: boolean
    setNameClient: (value: string) => void
    setCPFClient: (value: string) => void
    setCalculationBase: (value: string) => void
    setInstallmentValue: (value: string) => void
    ContractValueMemo: (props: any) => JSX.Element
    setCommittedValue: (value: string) => void
    setContractValue: (value: string) => void
    setInclusionDate: (value: string) => void
    setInputBank: (value: string) => void
    setBank: (value: string) => void
    setContractNumber: (value: string) => void
    setAddressClient: (value: string) => void
    setCityClient: (value: string) => void
    setTypeProcess: (value: string) => void
    saveAndCreatePetition: () => void
}

export default function Peticao(props: IPeticao) {
    const {
        ticket: api_data,
        nameClient,
        cpfClient,
        regraDominio,
        calculationBase,
        installmentValue,
        committedValue,
        contractValue,
        inclusionDate,
        banks,
        inputBank,
        contractNumber,
        addressClient,
        cityClient,
        typeProcess,
        loading,
        setNameClient,
        setCPFClient,
        setCalculationBase,
        ContractValueMemo,
        setInstallmentValue,
        setCommittedValue,
        setContractValue,
        setInclusionDate,
        setInputBank,
        setBank,
        setContractNumber,
        setAddressClient,
        setCityClient,
        setTypeProcess,
        saveAndCreatePetition
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
                    {api_data && api_data.petition_spaces_key && (
                        <Link
                            href={api_data.petition_spaces_key}
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
                                icon={<PictureAsPdfIcon titleAccess='Planilha em PDF' sx={{ position: 'relative', top: 2, left: { xs: 3, lg: 0 } }} />}
                                color="default"
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    {api_data && api_data.petition_spaces_key_word && (
                        <Link
                            href={api_data.petition_spaces_key_word}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<ArticleIcon />}
                                label={`Download do WORD da Petição`}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />

                            <Chip
                                icon={<ListAltIcon titleAccess='Planilha em Word' sx={{ position: 'relative', left: 2 }} />}
                                color="default"
                                style={{ marginInline: '10px' }}
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    {api_data && api_data.installment_document_spaces_key && (
                        <Link
                            href={api_data.installment_document_spaces_key}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<ListAltIcon />}
                                label={`Planilha RMC Soma`}
                                color="default"
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />
                            <Chip
                                icon={<ListAltIcon titleAccess='Planilha RMC Soma' sx={{ position: 'relative', left: 3 }} />}
                                color="default"
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    {api_data && api_data.installment_diference_document_spaces_key && (
                        <Link
                            href={api_data.installment_diference_document_spaces_key}
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: 'none' }}
                        >
                            <Chip
                                icon={<ListAltIcon sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }} />}
                                label={`Planilha RMC Diferença`}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'none', lg: 'flex' } }}
                                size="small"
                            />
                            <Chip
                                icon={<ListAltIcon titleAccess='Planilha RMC Diferença' sx={{ position: 'relative', left: 2 }} />}
                                color="default"
                                style={{ marginInline: 10 }}
                                sx={{ display: { xs: 'flex', lg: 'none' } }}
                                size="small"
                            />
                        </Link>
                    )}
                    <Chip
                        label={
                            api_data && api_data.installment_diference_document_spaces_key ? "Gerada!" : "Não gerada!"
                        }
                        color={
                            api_data && api_data.installment_diference_document_spaces_key ? "success" : "warning"
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
                                Base de Cálculo
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={calculationBase}
                                placeholder="Base de Cálculo"
                                onChange={(e) => {
                                    setCalculationBase(e.target.value);
                                }}
                                variant="outlined"
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
                                Valor da parcela RMC
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={installmentValue}
                                placeholder="Valor da parcela RMC"
                                onChange={(e) => {
                                    setInstallmentValue(e.target.value);
                                }}
                                variant="outlined"
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
                                Valor comprometido
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={committedValue}
                                placeholder="Valor comprometido"
                                onChange={(e) => {
                                    setCommittedValue(e.target.value);
                                }}
                                variant="outlined"
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
                                Limite do cartão
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={contractValue}
                                placeholder="Limite do cartão"
                                onChange={(e) => {
                                    setContractValue(e.target.value);
                                }}
                                variant="outlined"
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
                                Data de inclusão do RMC
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={inclusionDate}
                                inputProps={{
                                    pattern: "^\\d{2}/\\d{2}/\\d{2}$",
                                }}
                                onChange={(e) => setInclusionDate(e.target.value)}
                                placeholder="Data de inclusão do RMC"
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

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                sx={{
                                    color: "#00479d",
                                    fontWeight: "bold",
                                    marginLeft: "10px",
                                }}
                            >
                                Número do contrato
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={contractNumber}
                                onChange={(e) => setContractNumber(e.target.value)}
                                placeholder="Número do contrato"
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
                                onChange={(e) => {
                                    const value = onlyNumber(e.target.value);
                                    setCPFClient(formatCpf(value));
                                }}
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
                                Cidade do cliente
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="outlined-basic"
                                value={cityClient}
                                onChange={(e) => setCityClient(e.target.value)}
                                placeholder="Cidade do cliente"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth variant="filled">
                                <Typography
                                    sx={{
                                        color: "#00479d",
                                        fontWeight: "bold",
                                        marginLeft: "12px",
                                    }}
                                >
                                    A parte autora é:
                                </Typography>
                                <Select
                                    id="metodo_pagamento"
                                    variant="outlined"
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "8px",
                                        width: '100%',
                                    }}
                                    value={typeProcess ? typeProcess : "aposentada"}
                                    onChange={(e: any) => {
                                        setTypeProcess(e.target.value);
                                    }}
                                >
                                    <MenuItem value="aposentada">Aposentada</MenuItem>
                                    <MenuItem value="pensionista">Pensionista</MenuItem>
                                    <MenuItem value="beneficiária do INSS">
                                        Beneficiária do INSS
                                    </MenuItem>
                                    <MenuItem value="servidora pública">
                                        Servidora Pública
                                    </MenuItem>
                                    <MenuItem value="militar">Militar</MenuItem>
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
            </AccordionDetails>
        </Accordion>
    )
}
