import { onlyNumber, formatPhoneNumber, formatCpf } from '@/app/utils/Formater';
import ModalComponent from '@/presentation/components/Modal';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { handleUserFormSubmit } from '../helpers/Swal';
import { Usuarios } from '../UsuariosPage';

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
        handleOpen
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
                    <Grid style={{ borderRadius: '30px' }} item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            Nome
                        </Typography>
                        <TextField
                            id="nome"
                            type='text'
                            autoComplete="Nome do usuário"
                            error={!!errors.nome}
                            helperText={errors.nome?.message?.toString()}
                            placeholder='Digite o nome do Usuário'
                            fullWidth
                            defaultValue={userChoose ? userChoose.nome : ''}
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            {...register('nome')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            E-mail
                        </Typography>
                        <TextField
                            error={!!errors.email}
                            helperText={errors.email?.message?.toString()}
                            fullWidth
                            placeholder='Digite o e-mail do Usuário'
                            id="email"
                            defaultValue={userChoose ? userChoose.email : ''}
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            {...register('email')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            Telefone
                        </Typography>
                        <TextField
                            error={!!errors.telefone}
                            helperText={errors.telefone?.message?.toString()}
                            required
                            fullWidth
                            placeholder='Digite o telefone do Usuário'
                            id="telefone"
                            value={telefone}
                            {...register('telefone')}
                            onChange={(e) => {
                                const value = onlyNumber(e.target.value);
                                setTelefone(formatPhoneNumber(value));
                                reset({ telefone: formatPhoneNumber(value) });
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="filled" error={!!errors.oab_estado}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Nível do Usuário
                            </Typography>
                            <Select
                                id="nivel"
                                variant='outlined'
                                displayEmpty
                                sx={{ borderRadius: '10px' }}
                                error={!!errors.nivel}
                                fullWidth
                                value={nivelUsuario}
                                {...register('nivel')}
                                onChange={(event) => {
                                    setNivelUsuario(event.target.value);
                                    reset({ nivel: event.target.value });
                                }}
                            >
                                <MenuItem selected value="" disabled>Selecione o Nível</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="colaborador">Colaborador</MenuItem>
                            </Select>
                            {errors.nivel && <FormHelperText>{errors.nivel.message?.toString()}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            CPF
                        </Typography>
                        <TextField
                            id="cpf"
                            error={!!errors.cpf}
                            helperText={errors.cpf?.message?.toString()}
                            fullWidth
                            placeholder='Digite o CPF do Usuário'
                            value={cpf}
                            {...register('cpf')}
                            onChange={(e) => {
                                const value = onlyNumber(e.target.value);
                                setCpf(formatCpf(value));
                                reset({ cpf: formatCpf(value) });
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            OAB
                        </Typography>
                        <TextField
                            id="oab"
                            autoComplete="OAB"
                            error={!!errors.oab}
                            helperText={errors.oab?.message?.toString()}
                            fullWidth
                            placeholder='Digite o OAB do Usuário'
                            defaultValue={userChoose ? userChoose.oab : ''}
                            InputLabelProps={{ shrink: true }}
                            {...register('oab')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="filled" error={!!errors.oab_estado}>
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Estado da OAB
                            </Typography>
                            <Select
                                variant='outlined'
                                sx={{ borderRadius: '10px' }}
                                id="oab_estado"
                                displayEmpty
                                error={!!errors.oab_estado}
                                value={estadoOab}
                                {...register('oab_estado')}
                                onChange={(event) => {
                                    setEstadoOab(event.target.value);
                                    reset({ oab_estado: event.target.value });
                                }}
                            >
                                <MenuItem selected value="" disabled>Selecione o estado da OAB</MenuItem>
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
                            {errors.oab_estado && <FormHelperText>{errors.oab_estado.message?.toString()}</FormHelperText>}
                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        mb: 2,
                        padding: "15px",
                        width: { xs: '100%', sm: "250px" },
                    }}
                >
                    {userChoose ? 'Atualizar' : 'Cadastrar'}
                </Button>
            </Box>
        </ModalComponent>
    )
}
