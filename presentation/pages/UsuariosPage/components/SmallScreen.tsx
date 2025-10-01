import { Grid, Paper, Typography, Button, Checkbox } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Usuarios } from '../UsuariosPage'
import { Delete, Edit } from '@mui/icons-material'
import { handleDelete, vincularUsuarioAgenda } from '../helpers/Swal'

interface ISmallScreen {
    usuario: Usuarios
    usuarios: Usuarios[]
    regraDominio: any
    handleGetUser: (id: string) => Promise<void>
    setUsuarios: (value: Usuarios[]) => void
    updateUserAgenda: (is: string, acesso_agenda: string) => any
}

export default function SmallScreen(props: ISmallScreen) {
    const {
        usuario,
        usuarios,
        regraDominio,
        handleGetUser,
        setUsuarios,
        updateUserAgenda
    } = props

    return (
        <Grid item xs={12} key={usuario.id}>
            <Paper sx={{ padding: "10px", marginBottom: "10px", display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Typography variant="h6" sx={{ textAlign: 'center', pt: 1 }}>
                    <Checkbox
                        checked={usuario.agenda}
                        onChange={(e) => vincularUsuarioAgenda({
                            id: usuario.id,
                            acesso_agenda: e.target.value == 'true',
                            setUsuarios,
                            updateUserAgenda,
                            usuarios
                        })}
                        color="primary"
                    />{usuario.nome}
                </Typography>
                {/* <Typography variant="h6" sx={{ textAlign: 'center', pt: 1 }}>{usuario.email}</Typography> */}
                {/* <Typography variant="h6" sx={{ textAlign: 'center', pt: 1 }}>{usuario.telefone}</Typography> */}
                <Box
                    sx={{
                        display: 'flex', flexDirection: {
                            xs: 'column', md: 'row'
                        },
                        justifyContent: "center",
                        backgroundColor: "white",
                        padding: "10px",
                        gap: "10px",
                    }}
                >
                    {regraDominio?.permissoes?.includes('update') && (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Edit />}
                            onClick={() => handleGetUser(usuario.id)}
                        >
                            Editar
                        </Button>
                    )}
                    {regraDominio?.permissoes?.includes('delete') && (
                        <Button variant="contained" color="primary" startIcon={<Delete />}
                            onClick={() => handleDelete({
                                id: usuario.id,
                                setUsuarios,
                                usuarios
                            })}>
                            Excluir
                        </Button>
                    )}
                </Box>
            </Paper>
        </Grid>
    )
}
