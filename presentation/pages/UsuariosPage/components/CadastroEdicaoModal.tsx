import { onlyNumber, formatPhoneNumber, formatCpf } from '@/app/utils/Formater';
import ModalComponent from '@/presentation/components/Modal';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react'
import { handleUserFormSubmit } from '../helpers/Swal';
import { Usuarios } from '../UsuariosPage';
import GridTextField from '@/presentation/components/GridTextField';
import GridSelectField from '@/presentation/components/GridSelectField';
import { niveis_usuarios } from '@/app/utils/NiveisUsuarios';
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';
import { Btn } from '@/presentation/components/Button';
import { FieldValues, UseFormGetValues, UseFormSetValue } from 'react-hook-form';

interface ICadastroEdicaoModal {
    formRef: React.Ref<unknown> | undefined
    userChoose: any
    open: boolean
    errors: any
    telefone: string
    nivelUsuario: string
    cpf: string
    estadoOab: string
    usuarios: Usuarios[]
    setUsuarios: (usuarios: Usuarios[]) => void
    setLoading: (value: boolean) => void
    setUserChoose: (value: any) => any
    setOpen: (value: boolean) => void
    register: (value: string) => any
    reset: (value: any) => any
    setTelefone: (value: string) => void
    setNivelUsuario: (value: any) => void
    setEstadoOab: (value: any) => void
    setCpf: (value: string) => void
    handleSubmit: (value: any) => any
    handleClose: () => any
    handleOpen: () => any
    getValues: UseFormGetValues<FieldValues>
}

export default function CadastroEdicaoModal(props: ICadastroEdicaoModal) {
    const {
        formRef,
        userChoose,
        open,
        errors,
        telefone,
        nivelUsuario,
        cpf,
        estadoOab,
        usuarios,
        setUsuarios,
        setUserChoose,
        setLoading,
        setOpen,
        setCpf,
        register,
        reset,
        setTelefone,
        setNivelUsuario,
        handleSubmit,
        setEstadoOab,
        handleClose,
        handleOpen,
        getValues,
    } = props

    return (
        <ModalComponent nomeModal={`${userChoose ? 'Atualizar Usuário' : 'Cadastrar Usuário'}`} handleClose={handleClose} handleOpen={handleOpen} open={open}>
            <Box ref={formRef} component="form" noValidate onSubmit={handleSubmit(() => handleUserFormSubmit({
                formRef,
                userChoose,
                usuarios,
                setLoading,
                setOpen,
                setUserChoose,
                setUsuarios,
            }))} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <GridTextField
                        xs={12} sm={6}
                        variant='filled'
                        label='Nome'
                        placeholder='Digite o nome do Usuário'
                        register={register}
                        {...register('nome')}
                        defaultValue={userChoose ? userChoose.nome : ''}
                        error={!!errors.nome}
                        helperText={errors.nome?.message?.toString()}

                    />

                    <GridTextField
                        xs={12} sm={6}
                        variant='filled'
                        label='Email'
                        placeholder='Digite o e-mail do Usuário'
                        defaultValue={userChoose ? userChoose.email : ''}
                        register={register}
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message?.toString()}
                    />

                    <GridTextField
                        xs={12} sm={6}
                        variant='filled'
                        label='Telefone'
                        placeholder='Digite o telefone do Usuário'
                        defaultValue={userChoose ? userChoose.telefone : ''}
                        register={register}
                        {...register('telefone')}
                        error={!!errors.telefone}
                        helperText={errors.telefone?.message?.toString()}
                    />

                    <GridSelectField
                        xs={12} sm={6}
                        variant='filled'
                        name={'nivel'}
                        label={'Nível do Usuário'}
                        value={nivelUsuario}
                        options={niveis_usuarios}
                        onChange={(event) => {
                            setNivelUsuario(event.target.value);
                        }}
                    />

                    <GridTextField
                        xs={12} sm={6}
                        variant='filled'
                        label='CPF'
                        placeholder='Digite o CPF do Usuário'
                        defaultValue={userChoose ? userChoose.numero_documento : ''}
                        register={register}
                        {...register('cpf')}
                        error={!!errors.cpf}
                        helperText={errors.cpf?.message?.toString()}
                    />

                    <GridTextField
                        xs={12} sm={6}
                        variant='filled'
                        label='OAB'
                        placeholder='Digite o OAB do Usuário'
                        defaultValue={userChoose ? userChoose.oab : ''}
                        register={register}
                        {...register('oab')}
                        error={!!errors.oab}
                        helperText={errors.oab?.message?.toString()}
                    />

                    <GridSelectField
                        xs={12}
                        variant='filled'
                        name={'oab_estado'}
                        label={'Estado da OAB'}
                        value={estadoOab}
                        options={estados_brasileiros}
                        onChange={(event) => {
                            setEstadoOab(event.target.value);
                        }}
                    />

                </Grid>
                <Btn
                    text={userChoose ? 'Atualizar' : 'Cadastrar'}
                    type="submit"
                    variant="contained"
                />
            </Box>
        </ModalComponent>
    )
}
