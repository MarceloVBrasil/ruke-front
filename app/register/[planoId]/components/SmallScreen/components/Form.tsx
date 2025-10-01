import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';
import { onlyNumber, formatPhoneNumber, formatCpfCnpj } from '@/app/utils/Formater';
import { Btn } from '@/presentation/components/Button';
import GridSelectField from '@/presentation/components/GridSelectField';
import GridTextField from '@/presentation/components/GridTextField';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch, Fragment, MutableRefObject, SetStateAction } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { campos_ausentes_do_formulario, campos_do_formulario, IHandleRegisterSubmit } from '../../../helpers/Swal';
import { useRouter } from 'next/navigation';

interface IForm {
    formRef: MutableRefObject<HTMLFormElement | undefined>
    errors: FieldErrors<FieldValues>
    telefone: string
    cpfCnpj: string
    loadingCadastrarButton: boolean
    campos_ausentes_formulario_cadastro: campos_ausentes_do_formulario
    setLoadingCadastrarButton: Dispatch<boolean>
    handleSubmit: (v: any) => any
    handleRegisterSubmit: (props: IHandleRegisterSubmit) => Promise<void>
    setValue: (a: string, b: string, c: any) => void
    setTelefone: Dispatch<SetStateAction<string>>
    setCpfCnpj: Dispatch<SetStateAction<string>>
    register: UseFormRegister<FieldValues>
}

export default function Form(props: IForm) {
    const {
        formRef,
        errors,
        telefone,
        cpfCnpj,
        loadingCadastrarButton,
        campos_ausentes_formulario_cadastro,
        setLoadingCadastrarButton,
        handleSubmit,
        handleRegisterSubmit,
        setValue,
        setTelefone,
        setCpfCnpj,
        register
    } = props

    const router = useRouter()

    const goToPagamentoPage = (id_plano: string) => {
        return router.push(`/pagamento/${id_plano}`)
    }

    const startLoading = () => {
        setLoadingCadastrarButton(true)
    }

    const stopLoading = () => {
        setLoadingCadastrarButton(false)
    }

    return (
        <Grid item xs={12} style={{ display: 'flex', marginBottom: 80 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'end',
                    maxWidth: 600,
                    width: '100%',
                    paddingInline: 2,
                    position: 'relative',
                    bottom: 25

                }}>
                <Fragment>
                    <Box ref={formRef}
                        sx={{
                            boxShadow: 3,
                            background: '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        style={{
                            maxWidth: 538,
                            width: '100%',
                            minHeight: 300,
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '10px',
                            padding: '28px 33px',
                            position: 'relative',
                        }}
                        component='form'
                        onSubmit={(e) => {
                            e.preventDefault()

                            handleSubmit((data: campos_do_formulario) => {
                                startLoading()
                                handleRegisterSubmit({
                                    campos_do_formulario: data,
                                    campos_ausentes_do_formulario: campos_ausentes_formulario_cadastro,
                                    goToPagamentoPage: goToPagamentoPage,
                                    onError: stopLoading
                                })
                            })(e)
                        }}>
                        <Typography style={{ fontWeight: 'bold', fontSize: 20, marginTop: '15px', alignSelf: 'start' }}>
                            Crie sua conta
                        </Typography>
                        <Typography style={{ fontSize: 15, marginBottom: '20px', alignSelf: 'start', color: "#6b7280" }}>
                            Insira suas credenciais para se cadastrar no sistema
                        </Typography>
                        <Grid container columnSpacing={2}>
                            <Fragment>
                                <GridTextField
                                    xs={12}
                                    error={errors.nome ? true : false}
                                    helperText={errors.nome?.message?.toString() ?? ' '}
                                    fullWidth
                                    variant="filled"
                                    register={() => register('nome')}
                                    label='Nome Completo'
                                    name='nome'
                                    onChange={(e) => {
                                        setValue('nome', e.target.value, { shouldValidate: true });
                                    }}
                                />

                                <GridTextField
                                    xs={12} sm={6}
                                    id="email"
                                    error={errors.email ? true : false}
                                    helperText={errors.email?.message?.toString() ?? ' '}
                                    label="Email"
                                    fullWidth
                                    variant="filled"
                                    register={() => register('email')}
                                    name='email'
                                    onChange={(e) => {
                                        setValue('email', e.target.value, { shouldValidate: true });
                                    }}
                                />
                                <GridTextField
                                    xs={12} sm={6}
                                    id="telefone"
                                    error={errors.telefone ? true : false}
                                    helperText={errors.telefone?.message?.toString() ?? ' '}
                                    label="Telefone"
                                    variant="filled"
                                    type='text'
                                    value={telefone}
                                    fullWidth
                                    register={() => register('telefone')}
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setTelefone(formatPhoneNumber(value));
                                        setValue('telefone', formatPhoneNumber(value), { shouldValidate: true });
                                    }}
                                />

                                <GridTextField
                                    xs={12} sm={6}
                                    error={errors.oab ? true : false}
                                    helperText={errors.oab?.message?.toString() ?? ' '}
                                    fullWidth
                                    variant="filled"
                                    register={() => register('oab')}
                                    label='Número da OAB'
                                    type='text'
                                    onChange={(e) => {
                                        setValue('oab', e.target.value, { shouldValidate: true });
                                    }}
                                />

                                <GridSelectField
                                    xs={12} sm={6}
                                    options={estados_brasileiros}
                                    label='Estado da OAB'
                                    error={errors.oab_estado ? true : false}
                                    helperText={errors.oab_estado?.message?.toString() ?? ' '}
                                    register={() => register('oab_estado')}
                                    name='oab_estado'
                                    variant='filled'
                                    onChange={(e) => {
                                        setValue('oab_estado', e.target.value, { shouldValidate: true });
                                    }}

                                />

                                <GridTextField
                                    xs={12}
                                    id="cpfCnpj"
                                    error={errors.cpfCnpj ? true : false}
                                    helperText={errors.cpfCnpj?.message?.toString() ?? ' '}
                                    label="CPF ou CNPJ"
                                    type='text'
                                    variant="filled"
                                    fullWidth
                                    value={cpfCnpj}
                                    register={() => register('cpfCnpj')}
                                    onChange={(e) => {
                                        const value = onlyNumber(e.target.value);
                                        setCpfCnpj(formatCpfCnpj(value));
                                        setValue('cpfCnpj', value, { shouldValidate: true });
                                    }}
                                />

                                <GridTextField
                                    xs={12} sm={6}
                                    id="senha"
                                    error={errors.senha ? true : false}
                                    helperText={errors.senha?.message?.toString() || ' '}
                                    fullWidth
                                    label="Senha"
                                    variant="filled"
                                    password
                                    register={() => register('senha')}
                                    onChange={(e) => {
                                        setValue('senha', e.target.value, { shouldValidate: true });
                                    }}
                                />

                                <GridTextField
                                    xs={12} sm={6}
                                    id="confirmar_senha"
                                    error={errors.confirmar_senha ? true : false}
                                    helperText={errors.confirmar_senha?.message?.toString() ?? ' '}
                                    fullWidth
                                    label="Confirmar Senha"
                                    variant="filled"
                                    password
                                    register={() => register('confirmar_senha')}
                                    onChange={(e) => {
                                        setValue('confirmar_senha', e.target.value, { shouldValidate: true });
                                    }}
                                />

                                <GridTextField
                                    xs={12}
                                    id="cupom"
                                    label="Cupom"
                                    fullWidth
                                    variant="filled"
                                    register={() => register('cupom')}
                                />
                            </Fragment>
                        </Grid>

                        <Box style={{ width: "100%", display: "flex", justifyContent: "center", paddingTop: 4 }}>
                            <Btn
                                loading={loadingCadastrarButton}
                                text='Cadastrar'
                                type='submit'
                                marginTop='20px'
                            />
                        </Box>

                    </Box>
                </Fragment>
            </Box>
        </Grid>
    )
}
