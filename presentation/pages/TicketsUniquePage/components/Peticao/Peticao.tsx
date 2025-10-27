import { onlyNumber, formatCpf } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, Autocomplete, FormControl, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GridTextField from '@/presentation/components/GridTextField';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { AutoComplete } from '@/presentation/components/AutoComplete';
import GridSelectField from '@/presentation/components/GridSelectField';
import { Btn } from '@/presentation/components/Button';

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
    saveAndaddPetition: () => void
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
        saveAndaddPetition
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
                            marginLeft: "10px",
                        }}
                    >
                        PREENCHA OS CAMPOS OBRIGATÓRIOS:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            value={nameClient}
                            placeholder="Nome do Cliente"
                            label='Nome'
                            variant='filled'
                            onChange={(e) => setNameClient(e.target.value)}
                        />

                        <GridCurrencyInput
                            xs={12}
                            sm={6}
                            md={4}
                            label='Base de Cálculo'
                            variant='filled'
                            name='base_de_calculo'
                            placeholder="Base de Cálculo"
                            defaultValue={calculationBase}
                            onBlur={(e: any) => {
                                setCalculationBase(e.target.value);
                            }}
                        />

                        <GridCurrencyInput
                            xs={12}
                            sm={6}
                            md={4}
                            label='Valor da parcela RMC'
                            variant='filled'
                            name='parcela_rmc'
                            placeholder="Valor da parcela RMC"
                            defaultValue={installmentValue}
                            onBlur={(e: any) => {
                                setInstallmentValue(e.target.value);
                            }}
                        />

                        <GridCurrencyInput
                            xs={12}
                            sm={6}
                            md={4}
                            label='Valor Comprometido'
                            variant='filled'
                            name='valor_comprometido'
                            placeholder="Valor comprometido"
                            defaultValue={committedValue}
                            onBlur={(e: any) => {
                                setCommittedValue(e.target.value);
                            }}
                        />

                        <GridCurrencyInput
                            xs={12}
                            sm={6}
                            md={4}
                            label='Limite do cartão'
                            variant='filled'
                            name='limite_cartao'
                            placeholder="Limite do cartão"
                            defaultValue={contractValue}
                            onBlur={(e: any) => {
                                setContractValue(e.target.value);
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            value={inclusionDate}
                            type='date'
                            placeholder="Data de inclusão do RMC"
                            label='Data de inclusão do RMC'
                            variant='filled'
                            onChange={(e) => setInclusionDate(e.target.value)}
                        />

                        <AutoComplete
                            name={''}
                            label='Banco e Endereço'
                            placeholder='Banco e Endereço'
                            options={
                                banks
                                    ? banks.map(
                                        (bank: any) =>
                                            `${bank.NOME_INSTITUICAO}, ${bank.CEP}, ${bank.UF}, ${bank.BAIRRO}, ${bank.ENDERECO} - ${bank.COMPLEMENTO} `
                                    )
                                    : []
                            }
                            value={[]}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    setBank(newValue as unknown as string);
                                }
                            }}
                        />

                        {/* <Grid item xs={12} sm={6} md={4}>
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
                        </Grid> */}

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            value={contractNumber}
                            placeholder=" Número do contrato"
                            label=' Número do contrato'
                            variant='filled'
                            onChange={(e) => setContractNumber(e.target.value)}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            placeholder="CPF"
                            label=' CPF'
                            variant='filled'
                            value={cpfClient}
                            onChange={(e) => {
                                const value = onlyNumber(e.target.value);
                                setCPFClient(formatCpf(value));
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            placeholder="Endereço"
                            label=' Endereço'
                            variant='filled'
                            value={addressClient}
                            onChange={(e) => setAddressClient(e.target.value)}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            placeholder="Cidade"
                            label=' Cidade'
                            variant='filled'
                            value={cityClient}
                            onChange={(e) => setCityClient(e.target.value)}
                        />

                        <GridSelectField
                            xs={12}
                            sm={6}
                            md={4}
                            label='A parte autora é'
                            variant='filled'
                            name='type_process'
                            value={typeProcess ? typeProcess : "aposentada"}
                            onChange={(e: any) => {
                                setTypeProcess(e.target.value);
                            }}
                            options={[
                                { descricao: "Aposentada", value: "aposentada" },
                                { descricao: "Pensionista", value: "pensionista" },
                                { descricao: "Beneficiária do INSS", value: "beneficiaria_do_inss" },
                                { descricao: "Servidora Pública", value: "servidora_publica" },
                                { descricao: "Militar", value: "militar" },
                            ]}
                        />

                    </Grid>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes("add") ||
                    regraDominio?.permissoes?.includes("update")) && (
                        <Btn
                            onClick={() => saveAndaddPetition()}
                            variant="contained"
                            disabled={loading}
                            text='Gerar Petição'
                            width={250}
                        />
                    )}
            </AccordionDetails>
        </Accordion>
    )
}
