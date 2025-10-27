import { onlyNumber, formatCpf, formatCepInput } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, FormControl, Select, MenuItem, FormHelperText, Button, CircularProgress } from '@mui/material';
import { Box, width } from '@mui/system';
import Link from 'next/link';

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import GridTextField from '@/presentation/components/GridTextField';
import GridSelectField from '@/presentation/components/GridSelectField';
import { estado_civil } from '@/domain/data/estado_civil';
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';
import { Btn } from '@/presentation/components/Button';

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
                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Nome'
                            placeholder='Nome'
                            variant='filled'
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
                        />

                        <GridSelectField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Estado Civil'
                            placeholder='Estado Civil'
                            variant='filled'
                            value={estadoCivil}
                            options={estado_civil}
                            error={!!errorsHipossuficiencia.estadoCivil}
                            helperText={errorsHipossuficiencia.estadoCivil?.message?.toString()}
                            {...registerHipossuficiencia("estadoCivil")}
                            onChange={(e) => {
                                setEstadoCivil(e.target.value);
                                resetHipossuficiencia({
                                    estadoCivil: e.target.value,
                                });
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            variant='filled'
                            label='Profissão'
                            placeholder='Profissão'
                            error={errorsHipossuficiencia.profissao ? true : false}
                            helperText={errorsHipossuficiencia.profissao?.message?.toString()}
                            value={profissao}
                            {...registerHipossuficiencia("profissao")}
                            onChange={(e) => {
                                setProfissao(e.target.value);
                                resetHipossuficiencia({
                                    profissao: e.target.value,
                                });
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='CPF do Cliente'
                            variant='filled'
                            placeholder='CPF do cliente'
                            error={errorsHipossuficiencia.cpfClient ? true : false}
                            helperText={errorsHipossuficiencia.cpfClient?.message?.toString()}
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

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='CEP'
                            variant='filled'
                            placeholder='CEP'
                            error={errorsHipossuficiencia.cep ? true : false}
                            helperText={errorsHipossuficiencia.cep?.message?.toString()}
                            value={cep}
                            {...registerHipossuficiencia("cep")}
                            onChange={(e) => {
                                const value = onlyNumber(e.target.value);
                                setCep(formatCepInput(value));
                                resetHipossuficiencia({
                                    cep: formatCepInput(value),
                                });
                            }}
                        />


                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Endereço'
                            variant='filled'
                            placeholder='Endereço'
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
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Número'
                            placeholder='Digite o número'
                            variant='filled'
                            value={numero}
                            error={errorsHipossuficiencia.numero ? true : false}
                            helperText={errorsHipossuficiencia.numero?.message?.toString()}
                            {...registerHipossuficiencia("numero")}
                            onChange={(e) => {
                                setNumero(e.target.value);
                                resetHipossuficiencia({
                                    numero: e.target.value,
                                });
                            }}
                        />


                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Bairro'
                            placeholder='Digite o bairro'
                            variant='filled'
                            value={bairro}
                            error={errorsHipossuficiencia.bairro ? true : false}
                            helperText={errorsHipossuficiencia.bairro?.message?.toString()}
                            {...registerHipossuficiencia("bairro")}
                            onChange={(e) => {
                                setBairro(e.target.value);
                                resetProcuracao({
                                    bairro: e.target.value,
                                });
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Complemento'
                            placeholder='Digite o complemento'
                            variant='filled'
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
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Cidade'
                            placeholder='Digite a cidade'
                            variant='filled'
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
                        />

                        <GridSelectField
                            xs={12}
                            sm={6}
                            md={4}
                            variant='filled'
                            label='Estado'
                            placeholder='Estado'
                            value={estado}
                            error={errorsHipossuficiencia.estado ? true : false}
                            helperText={errorsHipossuficiencia.estado?.message?.toString()}
                            options={estados_brasileiros}
                            {...registerHipossuficiencia("estado")}
                            onChange={(e) => {
                                setEstado(e.target.value);
                            }}
                        />

                        <GridTextField
                            xs={12}
                            sm={6}
                            md={4}
                            label='Data'
                            placeholder='data'
                            type='date'
                            variant='filled'
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
                        />
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes("add") ||
                    regraDominio?.permissoes?.includes("update")) && (
                        <Btn
                            type="submit"
                            width={300}
                            variant="contained"
                            disabled={loadingHipossuficiencia}
                            text='Gerar Declaração de Hipossuficiência'
                        />
                    )}
            </AccordionDetails>
        </Accordion>
    )
}
