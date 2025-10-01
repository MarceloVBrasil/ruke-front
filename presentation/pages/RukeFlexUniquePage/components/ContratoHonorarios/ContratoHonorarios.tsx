import { onlyNumber, formatCnpj, formatCpf, formatCepInput } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, FormControl, Select, MenuItem, FormHelperText, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";

import { criarContrato } from '../../helpers/Swal';

interface IContratoHonorarios {
    ticket: any
    errorsContrato: any
    personChoose: string
    cnpjClient: string
    razaoSocial: string
    nameClient: string
    cpfClient: string
    estadoCivil: string
    cep: string
    enderecoCompleto: string
    numero: string
    bairro: string
    complemento: string
    cidade: string
    estado: string
    profissao: string
    representanteLegal: string
    date: string
    escopo: string
    regraDominio: any
    loadingContract: boolean
    percentualExito: string
    valorMensal: string
    handleSubmitContrato: (value: any) => any
    setCnpjClient: (value: string) => void
    resetProcuracao: (value: any) => any
    setRazaoSocial: (value: string) => void
    setNameClient: (value: string) => void
    setCPFClient: (value: string) => void
    setEstadoCivil: (value: any) => void
    setCep: (value: string) => void
    setEnderecoCompleto: (value: string) => void
    setNumero: (value: string) => void
    setBairro: (value: string) => void
    setComplemento: (value: string) => void
    setCidade: (value: string) => void
    setEstado: (value: any) => void
    setProfissao: (value: string) => void
    setRepresentanteLegal: (value: string) => void
    registerContrato: (value: any) => any
    resetContrato: (value: any) => any
    setDate: (value: string) => void
    setEscopo: (value: string) => void
    setPercentualExito: (value: string) => void
    setValorMensal: (value: string) => void
    setLoadingContract: (value: boolean) => void
    getRukeFlexTickets: (value: any) => any
}

export default function ContratoHonorarios(props: IContratoHonorarios) {

    const {
        ticket,
        errorsContrato,
        personChoose,
        cnpjClient,
        razaoSocial,
        nameClient,
        cpfClient,
        estadoCivil,
        cep,
        enderecoCompleto,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
        profissao,
        representanteLegal,
        date,
        escopo,
        regraDominio,
        loadingContract,
        percentualExito,
        valorMensal,
        handleSubmitContrato,
        setCnpjClient,
        resetProcuracao,
        setRazaoSocial,
        setNameClient,
        setCPFClient,
        setEstadoCivil,
        setCep,
        setEnderecoCompleto,
        setNumero,
        setBairro,
        setComplemento,
        setCidade,
        setEstado,
        setProfissao,
        setRepresentanteLegal,
        registerContrato,
        resetContrato,
        setDate,
        setEscopo,
        setPercentualExito,
        setValorMensal,
        getRukeFlexTickets,
        setLoadingContract
    } = props

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                    <Typography style={{ marginRight: 10, width: '100%', color: '#00479d', fontWeight: 'bold' }}>CONTRATO DE HONORÁRIOS{" "}</Typography>
                    <Chip
                        label={
                            ticket && ticket.contrato_pdf ? "Gerado!" : "Não gerada!"
                        }
                        color={
                            ticket && ticket.contrato_pdf ? "success" : "warning"
                        }
                        size="small"
                    />
                    {ticket && ticket.contrato_pdf && (
                        <Link
                            href={ticket.contrato_pdf}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <Chip
                                icon={<PictureAsPdfIcon />}
                                label={`Download do PDF do Contrato`}
                                color="default"
                                style={{ marginLeft: 10 }}
                                size="small"
                            />
                        </Link>
                    )}
                    {ticket && ticket.contrato_word && (
                        <Link
                            href={ticket.contrato_word}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <Chip
                                icon={<ArticleIcon />}
                                label={`Download do WORD do Contrato`}
                                color="default"
                                style={{ marginLeft: 10 }}
                                size="small"
                            />
                        </Link>
                    )}
                </Box>
            </AccordionSummary>
            <Accordion expanded>
                <AccordionSummary>
                    <Typography sx={{ borderBottom: '2px solid #00479d', color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>PREENCHA OS CAMPOS OBRIGATÓRIOS:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container component="form" id="form-contrato" onSubmit={handleSubmitContrato(() => criarContrato({
                        ticket,
                        nameClient,
                        numero,
                        cep,
                        cidade,
                        cnpjClient,
                        complemento,
                        cpfClient,
                        valorMensal,
                        getRukeFlexTickets,
                        enderecoCompleto,
                        escopo,
                        estado,
                        estadoCivil,
                        razaoSocial,
                        representanteLegal,
                        percentualExito,
                        personChoose,
                        profissao,
                        bairro,
                        setLoadingContract,
                        date,
                    }))} spacing={2}>
                        {personChoose === 'juridica' &&
                            <Grid item xs={6}>
                                <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                    Cnpj
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    error={errorsContrato.cnpjClient ? true : false}
                                    helperText={errorsContrato.cnpjClient?.message?.toString()}
                                    value={cnpjClient}
                                    {...registerContrato('cnpjClient')}
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setCnpjClient(formatCnpj(value));
                                        resetContrato({
                                            cnpjClient: formatCnpj(value),
                                        });

                                    }}
                                    placeholder="Cnpj"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        }

                        {personChoose === 'juridica' &&
                            <Grid item xs={6}>
                                <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                    Razão Social
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    placeholder="Razão social"
                                    fullWidth
                                    variant="outlined"
                                    error={errorsContrato.razao_social ? true : false}
                                    helperText={errorsContrato.razao_social?.message?.toString()}
                                    value={razaoSocial}
                                    InputLabelProps={{ shrink: true }}
                                    {...registerContrato('razaoSocial')}
                                    onChange={(e) => {
                                        setRazaoSocial(e.target.value)
                                        resetContrato({
                                            razaoSocial: e.target.value
                                        })
                                    }}
                                />
                            </Grid>
                        }
                        {personChoose === 'fisica' &&
                            <Grid item xs={6}>
                                <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                    Nome do Cliente
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    fullWidth
                                    placeholder="Nome do Cliente"
                                    variant="outlined"
                                    error={errorsContrato.nameClient ? true : false}
                                    helperText={errorsContrato.nameClient?.message?.toString()}
                                    InputLabelProps={{ shrink: true }}
                                    value={nameClient}
                                    {...registerContrato('nameClient')}
                                    onChange={(e) => {
                                        setNameClient(e.target.value);
                                        resetContrato({
                                            nameClient: e.target.value
                                        })
                                    }}
                                />
                            </Grid>
                        }

                        {personChoose === 'fisica' &&
                            <Grid item xs={6}>
                                <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
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
                                    {...registerContrato('cpfClient')}
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setCPFClient(formatCpf(value));
                                        resetContrato({
                                            cpfClient: formatCpf(value),
                                        });
                                    }}
                                />
                            </Grid>
                        }

                        {personChoose === 'fisica' &&
                            <Grid item xs={6}>
                                <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                    Estado Civil
                                </Typography>
                                <FormControl fullWidth variant="filled" error={errorsContrato.estadoCivil ? true : false}
                                >                     <Select
                                    id="estadoCivil"
                                    variant='outlined'
                                    displayEmpty
                                    fullWidth
                                    value={estadoCivil}
                                    style={{ borderRadius: '10px' }}
                                    {...registerContrato('estadoCivil')}
                                    onChange={e => {
                                        setEstadoCivil(e.target.value)
                                        resetContrato({
                                            estadoCivil: e.target.value
                                        })
                                    }}
                                >
                                        <MenuItem selected value="" disabled>
                                            Selecione o estado civil
                                        </MenuItem>
                                        <MenuItem value={'Solteiro(a)'}>Solteiro(a)</MenuItem>
                                        <MenuItem value={'Casado(a)'}>Casado(a)</MenuItem>
                                        <MenuItem value={'Divorciado(a)'}>Divorciado(a)</MenuItem>
                                        <MenuItem value={'Viuvo(a)'}>Viúvo(a)</MenuItem>
                                        <MenuItem value={'Separado(a) Judicialmente'}>Separado(a) Judicialmente</MenuItem>
                                        <MenuItem value={'em União Estável'}>em União Estável</MenuItem>
                                    </Select>
                                    {errorsContrato.estadoCivil ? <FormHelperText>{errorsContrato.estadoCivil?.message?.toString()}</FormHelperText> : null}

                                </FormControl>
                            </Grid>
                        }



                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
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
                                {...registerContrato('cep')}
                                onChange={(e) => {
                                    const value = onlyNumber(e.target.value);
                                    setCep(formatCepInput(value));
                                    resetProcuracao({
                                        cep: formatCepInput(value),
                                    });
                                }
                                }
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Endereço do cliente
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                placeholder="Endereço do cliente"
                                variant="outlined"
                                value={enderecoCompleto}
                                error={errorsContrato.enderecoCompleto ? true : false}
                                helperText={errorsContrato.enderecoCompleto?.message?.toString()}
                                {...registerContrato('enderecoCompleto')}
                                onChange={(e) => {
                                    setEnderecoCompleto(e.target.value)
                                    resetProcuracao({
                                        enderecoCompleto: e.target.value
                                    })
                                }
                                }
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
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
                                {...registerContrato('numero')}
                                onChange={(e) => {
                                    setNumero(e.target.value)
                                    resetProcuracao({
                                        numero: e.target.value
                                    })
                                }
                                }
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
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
                                {...registerContrato('bairro')}
                                onChange={(e) => {
                                    setBairro(e.target.value)
                                    resetProcuracao({
                                        enderecoCompleto: e.target.value
                                    })
                                }
                                }
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
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
                                {...registerContrato('complemento')}
                                onChange={(e) => {
                                    setComplemento(e.target.value)
                                    resetProcuracao({
                                        complemento: e.target.value
                                    })
                                }
                                }
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
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
                                {...registerContrato('cidade')}
                                onChange={(e) => {
                                    setCidade(e.target.value)
                                    resetContrato({
                                        enderecoCompleto: e.target.value
                                    })
                                }
                                }
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="filled"  >
                                <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                    Estado
                                </Typography>
                                <Select
                                    variant='outlined'
                                    sx={{ borderRadius: '10px' }}
                                    id="estado"
                                    value={estado}
                                    {...registerContrato('estado')}
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
                                {/* {errors.estado ? <FormHelperText>{errors.estado?.message?.toString()}</FormHelperText> : null} */}
                            </FormControl>
                        </Grid>
                        {personChoose === 'fisica' &&
                            <Grid item xs={6}>
                                <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                    Profissão
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    fullWidth
                                    placeholder=" Profissão"
                                    variant="outlined"
                                    value={profissao}
                                    error={errorsContrato.profissao ? true : false}
                                    helperText={errorsContrato.profissao?.message?.toString()}
                                    {...registerContrato('profissao')}
                                    onChange={(e) => {
                                        setProfissao(e.target.value)
                                        resetContrato({
                                            profissao: e.target.value
                                        })
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        }

                        {personChoose === 'juridica' &&
                            <Grid item xs={6}>
                                <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                    Representante Legal
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    fullWidth
                                    placeholder="Representante Legal"
                                    variant="outlined"
                                    value={representanteLegal}
                                    error={errorsContrato.representanteLegal ? true : false}
                                    helperText={errorsContrato.representanteLegal?.message?.toString()}
                                    {...registerContrato('representanteLegal')}
                                    onChange={(e) => {
                                        setRepresentanteLegal(e.target.value)
                                        resetContrato({
                                            representanteLegal: e.target.value
                                        })
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        }
                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
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
                                {...registerContrato('date')}
                                onChange={e => {
                                    setDate(e.target.value)
                                    resetContrato({
                                        date: e.target.value
                                    })
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item sm={12}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Percentual de Êxito
                            </Typography>
                            <TextField
                                autoComplete="Percentual de Êxito"
                                type='number'
                                fullWidth
                                placeholder="Digite o Percentual de Êxito"
                                value={percentualExito}
                                error={errorsContrato.percentualExito ? true : false}
                                helperText={errorsContrato.percentualExito?.message?.toString()}
                                {...registerContrato('percentualExito')}
                                onChange={e => {
                                    setPercentualExito(e.target.value)
                                    resetContrato({
                                        percentualExito: e.target.value
                                    })
                                }}
                            />
                        </Grid>

                        <Grid item xs={6}  >
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Escopo
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                autoComplete="Escopo"
                                value={escopo}
                                error={errorsContrato.escopo ? true : false}
                                helperText={errorsContrato.escopo?.message?.toString()}
                                {...registerContrato('escopo')}
                                onChange={e => {
                                    setEscopo(e.target.value)
                                    resetContrato({
                                        escopo: e.target.value
                                    })
                                }}

                            />
                        </Grid>


                        <Grid item xs={6}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Valor Mensal
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                autoComplete="valor Mensal"
                                value={valorMensal}
                                error={errorsContrato.valorMensal ? true : false}
                                helperText={errorsContrato.valorMensal?.message?.toString()}
                                {...registerContrato('valorMensal')}
                                onChange={e => {
                                    setValorMensal(e.target.value)
                                    resetContrato({
                                        valorMensal: e.target.value
                                    })
                                }}
                            />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <AccordionDetails>
                {(regraDominio?.permissoes?.includes('create') || regraDominio?.permissoes?.includes('update')) && (
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
                        GERAR CONTRATO
                    </Button>
                )}
            </AccordionDetails>
        </Accordion>
    )
}
