import { StyledTableCell, StyledTableRow } from '@/presentation/styles/TablesStyles'
import { Edit, Delete } from '@mui/icons-material'
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, Checkbox, Button } from '@mui/material'
import React from 'react'
import { Usuarios } from '../UsuariosPage'
import { handleDelete, vincularUsuarioAgenda } from '../helpers/Swal'

interface IBigScreen {
    usuarios: Usuarios[]
    regraDominio: any
    handleGetUser: (id: string) => Promise<void>
    setUsuarios: (value: Usuarios[]) => void
    updateUserAgenda: (is: string, acesso_agenda: string) => any
}

export default function BigScreen(props: IBigScreen) {
    const {
        usuarios,
        regraDominio,
        handleGetUser,
        setUsuarios,
        updateUserAgenda
    } = props

    return (
        <TableContainer sx={{ width: '100%', maxWidth: 2000, minHeight: '100vh', gap: 10, border: '1px solid #eee', borderRadius: '10px' }} component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow style={{ whiteSpace: 'nowrap' }}>
                        <StyledTableCell>Acesso Agenda</StyledTableCell>
                        <StyledTableCell>Nome</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Telefone</StyledTableCell>
                        <StyledTableCell align='center'>Ações</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios && usuarios.map((usuario) => (
                        <StyledTableRow key={usuario.id}>
                            <StyledTableCell>
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
                                />
                            </StyledTableCell>
                            <StyledTableCell>{usuario.nome}</StyledTableCell>
                            <StyledTableCell>{usuario.email}</StyledTableCell>
                            <StyledTableCell>{usuario.telefone}</StyledTableCell>
                            <StyledTableCell sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: '20px', gap: '10px' }}>
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
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
