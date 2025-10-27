import { StyledTableCell, StyledTableRow } from '@/presentation/styles/TablesStyles'
import { Edit, Delete } from '@mui/icons-material'
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, Checkbox, Button, Typography } from '@mui/material'
import React from 'react'
import { Usuarios } from '../UsuariosPage'
import { handleDelete, vincularUsuarioAgenda } from '../helpers/Swal'
import { CheckBox } from '@/presentation/components/Checkbox'
import { Btn } from '@/presentation/components/Button'

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
                    <TableRow sx={{ whiteSpace: 'nowrap', fontWeight: 200 }}>
                        <StyledTableCell><Typography>Acesso Agenda</Typography></StyledTableCell>
                        <StyledTableCell><Typography>Nome</Typography></StyledTableCell>
                        <StyledTableCell><Typography>Email</Typography></StyledTableCell>
                        <StyledTableCell><Typography>Telefone</Typography></StyledTableCell>
                        <StyledTableCell align='center'><Typography>Ações</Typography></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios && usuarios.map((usuario) => (
                        <StyledTableRow key={usuario.id}>
                            <StyledTableCell>
                                <CheckBox
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
                            <StyledTableCell style={{ fontSize: 15 }}>{usuario.nome}</StyledTableCell>
                            <StyledTableCell style={{ fontSize: 15 }}>{usuario.email}</StyledTableCell>
                            <StyledTableCell style={{ fontSize: 15 }}>{usuario.telefone}</StyledTableCell>
                            <StyledTableCell sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: '20px', gap: '10px' }}>
                                {regraDominio?.permissoes?.includes('update') && (
                                    <Btn
                                        text='Editar'
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleGetUser(usuario.id)}
                                    />
                                )}
                                {regraDominio?.permissoes?.includes('delete') && (
                                    <Btn
                                        text='Excluir'
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleDelete({
                                            id: usuario.id,
                                            setUsuarios,
                                            usuarios
                                        })}
                                    />
                                )}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
