import { onlyNumber, formatCnpj, formatCpf, formatCepInput } from '@/app/utils/Formater';
import { Accordion, AccordionSummary, Typography, Chip, AccordionDetails, Grid, TextField, FormControl, Select, MenuItem, FormHelperText, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import { criarRukeFlexProx } from '../../helpers/Swal';

interface IProcuracao {
    ticket: any
    errorsProcuracao: any
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
    loadingProxy: boolean
    formDataCnpj: any
    handleSubmitProcuracao: (value: any) => any
    registerProcuracao: (value: string) => any
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
    setLoadingProxy: (value: boolean) => void
    getRukeFlexTickets: (value: any) => any
}

export default function Procuracao(props: IProcuracao) {
    const {
        ticket,
        errorsProcuracao,
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
        loadingProxy,
        formDataCnpj,
        handleSubmitProcuracao,
        registerProcuracao,
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
        setLoadingProxy,
        getRukeFlexTickets
    } = props

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 5 }}>
                    <Typography style={{ marginRight: 10, width: '100%', color: '#00479d', fontWeight: 'bold' }}>PROCURAÇÃO{" "}</Typography>
                    <Chip
                        label={
                            ticket && ticket.procuracao_pdf ? "Gerada!" : "Não gerada!"
                        }
                        color={ticket && ticket.procuracao_pdf ? "success" : "warning"}
                        size="small"
                    />
                    {ticket && ticket.procuracao_pdf && (
                        <Link
                            href={ticket.procuracao_pdf}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <Chip
                                icon={<PictureAsPdfIcon />}
                                label={`Download do PDF da Procuração`}
                                color="default"
                                style={{ marginLeft: 10 }}
                                size="small"
                            />
                        </Link>
                    )}
                    {ticket && ticket.procuracao_word && (
                        <Link
                            href={ticket.procuracao_word}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <Chip
                                icon={<ArticleIcon />}
                                label={`Download do WORD da Procuração`}
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
                    <Grid container component="form" id="form-procuracao" onSubmit={handleSubmitProcuracao(() => criarRukeFlexProx({
                        ticket,
                        nameClient,
                        cpfClient,
                        cnpjClient,
                        formDataCnpj,
                        cep,
                        enderecoCompleto,
                        numero,
                        bairro,
                        complemento,
                        cidade,
                        estado,
                        representanteLegal,
                        date,
                        estadoCivil,
                        profissao,
                        personChoose,
                        escopo,
                        setLoadingProxy,
                        getRukeFlexTickets
                    }))} spacing={2}>
                        {personChoose === 'juridica' &&
                            <Grid item xs={6}>
                                <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                    Cnpj
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    error={errorsProcuracao.cnpjClient ? true : false}
                                    helperText={errorsProcuracao.cnpjClient?.message?.toString()}
                                    value={cnpjClient}
                                    {...registerProcuracao('cnpjClient')}
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setCnpjClient(formatCnpj(value));
                                        resetProcuracao({
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
                                    error={errorsProcuracao.razao_social ? true : false}
                                    helperText={errorsProcuracao.razao_social?.message?.toString()}
                                    value={razaoSocial}
                                    InputLabelProps={{ shrink: true }}

                                    {...registerProcuracao('razaoSocial')}
                                    onChange={(e) => {
                                        setRazaoSocial(e.target.value)
                                        resetProcuracao({
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
                                    error={errorsProcuracao.nameClient ? true : false}
                                    helperText={errorsProcuracao.nameClient?.message?.toString()}
                                    InputLabelProps={{ shrink: true }}
                                    value={nameClient}
                                    {...registerProcuracao('nameClient')}
                                    onChange={(e) => {
                                        setNameClient(e.target.value);
                                        resetProcuracao({
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
                                    error={errorsProcuracao.cpfClient ? true : false}
                                    helperText={errorsProcuracao.cpfClient?.message?.toString()}
                                    InputLabelProps={{ shrink: true }}
                                    value={cpfClient}
                                    {...registerProcuracao('cpfClient')}
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setCPFClient(formatCpf(value));
                                        resetProcuracao({
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
                                <FormControl fullWidth variant="filled" error={errorsProcuracao.estadoCivil ? true : false}
                                >
                                    <Select
                                        id="estadoCivil"
                                        variant='outlined'
                                        displayEmpty
                                        fullWidth
                                        value={estadoCivil}
                                        style={{ borderRadius: '10px' }}
                                        {...registerProcuracao('estadoCivil')}
                                        onChange={e => {
                                            setEstadoCivil(e.target.value)
                                            resetProcuracao({
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
                                    {errorsProcuracao.estadoCivil ? <FormHelperText>{errorsProcuracao.estadoCivil?.message?.toString()}</FormHelperText> : null}

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
                                error={errorsProcuracao.cep ? true : false}
                                helperText={errorsProcuracao.cep?.message?.toString()}
                                {...registerProcuracao('cep')}
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
                                {...registerProcuracao('enderecoCompleto')}
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
                                error={errorsProcuracao.numero ? true : false}
                                helperText={errorsProcuracao.numero?.message?.toString()}
                                {...registerProcuracao('numero')}
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
                                error={errorsProcuracao.bairro ? true : false}
                                helperText={errorsProcuracao.bairro?.message?.toString()}
                                {...registerProcuracao('bairro')}
                                onChange={(e) => {
                                    setBairro(e.target.value)
                                    resetProcuracao({
                                        bairro: e.target.value
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
                                error={errorsProcuracao.complemento ? true : false}
                                helperText={errorsProcuracao.complemento?.message?.toString()}
                                {...registerProcuracao('complemento')}
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
                                error={errorsProcuracao.cidade ? true : false}
                                helperText={errorsProcuracao.cidade?.message?.toString()}
                                {...registerProcuracao('cidade')}
                                onChange={(e) => {
                                    setCidade(e.target.value)
                                    resetProcuracao({
                                        cidade: e.target.value
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
                                    {...registerProcuracao('estado')}
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
                                    placeholder="Profissão"
                                    variant="outlined"
                                    value={profissao}
                                    error={errorsProcuracao.profissao ? true : false}
                                    helperText={errorsProcuracao.profissao?.message?.toString()}
                                    {...registerProcuracao('profissao')}
                                    onChange={(e) => {
                                        setProfissao(e.target.value)
                                        resetProcuracao({
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
                                    helperText={errorsProcuracao.representanteLegal?.message?.toString()}
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
                                error={errorsProcuracao.date ? true : false}
                                helperText={errorsProcuracao.date?.message?.toString()}
                                {...registerProcuracao('date')}
                                onChange={e => {
                                    setDate(e.target.value)
                                    resetProcuracao({
                                        date: e.target.value
                                    })
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12}  >
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Escopo
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                autoComplete="Escopo"
                                value={escopo}
                                error={errorsProcuracao.escopo ? true : false}
                                helperText={errorsProcuracao.escopo?.message?.toString()}
                                {...registerProcuracao('escopo')}
                                onChange={e => {
                                    setEscopo(e.target.value)
                                    resetProcuracao({
                                        escopo: e.target.value
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