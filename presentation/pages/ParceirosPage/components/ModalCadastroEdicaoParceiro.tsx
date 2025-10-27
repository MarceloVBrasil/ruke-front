import { onlyNumber, formatCnpj, formatCpf, formatPhoneNumber, formatCepInput } from '@/app/utils/Formater';
import ModalComponent from '@/presentation/components/Modal';
import { FormControlLabel, Switch, Grid, Typography, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { register } from 'module';
import React, { Dispatch } from 'react'
import { handleSubmit } from '../../BpcPage/helpers/Swal';
import { handleFormSubmit } from '../helpers/Swal';
import { Parceiro } from '../helpers/interfaces';
import { SubmitHandler, FieldValues, SubmitErrorHandler, FieldErrors } from 'react-hook-form';

type FormDataCep = {
    logradouro: string; bairro: string; localidade: string; uf: string;
}

interface IModalCadastroEdicaoParceiroProps {
    produtoId: string
    partners: Parceiro[]
    partnerChoose: Parceiro | null
    open: boolean
    formRef: React.MutableRefObject<HTMLFormElement | undefined>
    personChoose: 'juridica' | 'fisica'
    errors: FieldErrors<FieldValues>
    cnpj: string
    cpf: string
    celular: string
    cep: string
    formDataCep: FormDataCep
    handleOpen: Dispatch<void>
    handleClose: Dispatch<void>
    handleSubmit: (onValid: SubmitHandler<FieldValues>, onInvalid?: SubmitErrorHandler<FieldValues> | undefined) => (e?: React.BaseSyntheticEvent) => Promise<void>
    setLoading: Dispatch<boolean>
    setPartners: Dispatch<Parceiro[]>
    setOpen: Dispatch<boolean>
    handleChange: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined
    register: (v: any) => any
    reset: (v: any) => any
    setCnpj: Dispatch<string>
    setCpf: Dispatch<string>
    setCelular: Dispatch<string>
    setCep: Dispatch<string>
    setFormDataCep: Dispatch<FormDataCep>
}

export default function ModalCadastroEdicaoParceiro(props: IModalCadastroEdicaoParceiroProps) {
    const {
        produtoId,
        partners,
        partnerChoose,
        personChoose,
        open,
        formRef,
        errors,
        cnpj,
        cpf,
        celular,
        cep,
        formDataCep,
        handleOpen,
        handleClose,
        handleSubmit,
        setLoading,
        setPartners,
        setOpen,
        handleChange,
        register,
        reset,
        setCnpj,
        setCpf,
        setCelular,
        setCep,
        setFormDataCep
    } = props
    return (
        <ModalComponent width='1000px' nomeModal={`${partnerChoose ? 'Atualizar Parceiro' : 'Cadastrar Parceiro'}`} handleClose={handleClose} handleOpen={handleOpen} open={open}>
            <Box ref={formRef} component="form"
                onSubmit={handleSubmit(() => handleFormSubmit(produtoId, formRef, partners, partnerChoose, setLoading, setPartners, setOpen))}
                sx={{ mt: 3 }}>
                <FormControlLabel
                    style={{ padding: '5px', width: '100%' }}
                    control={
                        <Switch
                            checked={personChoose === 'juridica'}
                            onChange={handleChange}
                            name="personChoose"
                            color="primary"
                        />
                    }
                    label={personChoose === 'juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'}
                />
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                            Nome
                        </Typography>
                        <TextField
                            id='nome'
                            error={errors.nome ? true : false}
                            helperText={errors.nome?.message?.toString()}
                            defaultValue={partnerChoose ? partnerChoose.nome : ''}
                            fullWidth
                            placeholder='Digite o nome do parceiro'
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            {...register('nome')}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                            Email
                        </Typography>
                        <TextField
                            id='email'
                            error={errors.email ? true : false}
                            helperText={errors.email?.message?.toString()}
                            fullWidth
                            placeholder='Digite o email'
                            defaultValue={partnerChoose ? partnerChoose.email : ''}
                            InputLabelProps={{ shrink: true }}
                            {...register('email')}
                        />
                    </Grid>
                    {personChoose === 'juridica' &&
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                                CNPJ
                            </Typography>
                            <TextField
                                id='cnpj'
                                error={errors.cpfCnpj ? true : false}
                                helperText={errors.cpfCnpj?.message?.toString()}
                                autoComplete="CNPJ"
                                fullWidth
                                placeholder='Digite o CNPJ '
                                value={cnpj}
                                {...register('cpfCnpj')}
                                onChange={(e) => {
                                    const value = onlyNumber(e.target.value);
                                    setCnpj(formatCnpj(value));
                                    reset({
                                        cnpj: formatCnpj(value),
                                    })
                                }}

                            />
                        </Grid>
                    }
                    {personChoose === 'fisica' &&
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                                CPF
                            </Typography>
                            <TextField
                                id='cpf'
                                error={errors.cpfCnpj ? true : false}
                                helperText={errors.cpfCnpj?.message?.toString()}
                                autoComplete="CNPJ/CPF"
                                fullWidth
                                value={cpf}
                                placeholder='Digite o CPF'
                                {...register('cpfCnpj')}
                                onChange={(e) => {
                                    const value = onlyNumber(e.target.value);
                                    setCpf(formatCpf(value));
                                    reset({
                                        cpf: formatCpf(value),
                                    })
                                }}
                            />
                        </Grid>
                    }

                    {personChoose === 'fisica' && (
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                                Data de Aniversário
                            </Typography>
                            <TextField
                                type="date"
                                error={errors.data_aniversario ? true : false}
                                helperText={errors.data_aniversario?.message?.toString()}
                                fullWidth
                                defaultValue={partnerChoose ? partnerChoose.data_aniversario : ''}
                                InputLabelProps={{ shrink: true }}
                                {...register('data_aniversario')}
                            />
                        </Grid>
                    )}
                    {personChoose === 'juridica' && (
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                                Tipo de Empresa
                            </Typography>
                            <TextField
                                id='tipo_empresa'
                                error={errors.tipo_empresa ? true : false}
                                helperText={errors.tipo_empresa?.message?.toString()}
                                fullWidth
                                placeholder='Digite o tipo de empresa'
                                defaultValue={partnerChoose ? partnerChoose.tipo_empresa : ''}
                                InputLabelProps={{ shrink: true }}
                                {...register('tipo_empresa')}
                            />
                        </Grid>
                    )}

                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                            Celular
                        </Typography>
                        <TextField
                            id='celular'
                            error={errors.celular ? true : false}
                            helperText={errors.celular?.message?.toString()}
                            fullWidth
                            placeholder='Digite o celular'
                            defaultValue={partnerChoose ? partnerChoose.celular : ''}
                            InputLabelProps={{ shrink: true }}
                            {...register('celular')}
                            value={celular}
                            onChange={(e) => {
                                setCelular(formatPhoneNumber(e.target.value));
                                reset({
                                    celular: formatPhoneNumber(e.target.value),
                                })
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                            CEP
                        </Typography>
                        <TextField
                            id="cep"
                            error={errors.cep ? true : false}
                            helperText={errors.cep?.message?.toString()}
                            fullWidth
                            placeholder='Digite o CEP'
                            value={cep}
                            defaultValue={partnerChoose ? partnerChoose.cep : ''}
                            InputLabelProps={{ shrink: true }}
                            {...register('cep')}
                            onChange={(e) => setCep(formatCepInput(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                            Endereço
                        </Typography>
                        <TextField
                            id="endereco"
                            error={errors.endereco ? true : false}
                            helperText={errors.endereco?.message?.toString()}
                            fullWidth
                            placeholder='Digite o endereço'
                            defaultValue={partnerChoose ? partnerChoose.endereco : ''}
                            InputLabelProps={{ shrink: true }}
                            {...register('endereco')}
                            value={formDataCep.logradouro}
                            onChange={(e) => {
                                setFormDataCep({ ...formDataCep, logradouro: e.target.value })
                                reset({ endereco: e.target.value })
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                            Número
                        </Typography>
                        <TextField
                            id="numero"
                            error={errors.numero ? true : false}
                            helperText={errors.numero?.message?.toString()}
                            fullWidth
                            placeholder='Digite o número'
                            defaultValue={partnerChoose ? partnerChoose.numero : ''}
                            InputLabelProps={{ shrink: true }}
                            {...register('numero')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                            Bairro
                        </Typography>
                        <TextField
                            id="bairro"
                            error={errors.bairro ? true : false}
                            helperText={errors.bairro?.message?.toString()}
                            fullWidth
                            placeholder='Digite o bairro'
                            // onChange={(e) => setBairro(e.target.value)}
                            value={formDataCep.bairro}
                            defaultValue={partnerChoose ? partnerChoose.bairro : ''}
                            InputLabelProps={{ shrink: true }}
                            {...register('bairro')}
                            onChange={(e) => {
                                setFormDataCep({ ...formDataCep, bairro: e.target.value })
                                reset({ bairro: e.target.value })
                            }}

                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                            Complemento
                        </Typography>
                        <TextField
                            id="complemento"
                            error={errors.complemento ? true : false}
                            helperText={errors.complemento?.message?.toString()}
                            fullWidth
                            placeholder='Digite o complemento'
                            defaultValue={partnerChoose ? partnerChoose.complemento : ''}
                            InputLabelProps={{ shrink: true }}
                            {...register('complemento')}

                        />
                    </Grid>


                    {/* Add more fields as needed */}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, padding: '10px' }}
                >
                    {partnerChoose ? 'Atualizar Parceiro' : 'Cadastrar Parceiro'}
                </Button>
            </Box>
        </ModalComponent>
    )
}
