import { Grid, Paper, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React, { Dispatch } from 'react'
import { handleDelete } from '../helpers/Swal'
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { getPassoFromEtapa } from '../helpers/getPassosFromEtapa'
import { Btn } from '@/presentation/components/Button'

interface ISmallScreen {
    ticket: any
    regraDominio: any
    onTicketDelete: (id: string) => Promise<void>
    setLoading: Dispatch<boolean>
}

export default function SmallScreen(props: ISmallScreen) {
    const {
        ticket,
        regraDominio,
        onTicketDelete,
        setLoading
    } = props
    return (
        <Grid item xs={12} key={ticket.id}>
            <Paper sx={{ padding: "10px", marginBottom: "10px", marginTop: '10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Typography variant="h6" sx={{ textAlign: 'center', pt: 1 }}>{ticket.nome_reclamante}</Typography>
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
                    {regraDominio?.permissoes?.includes("getById") && (
                        <Link
                            onClick={() => setLoading(true)}
                            href={`trabalhista/${ticket.id}?step=${getPassoFromEtapa(ticket.etapa)}`}>
                            <Btn
                                variant="contained"
                                color="primary"
                                text='Ver'
                                sx={{ width: '100%' }}
                            />
                        </Link>
                    )}
                    {regraDominio?.permissoes?.includes("delete") && (
                        <Btn
                            text='Excluir'
                            variant="contained"
                            color="primary"
                            onClick={() => handleDelete(ticket.id, onTicketDelete)}
                            sx={{ width: '100%' }}
                        />
                    )}
                </Box>
            </Paper>
        </Grid>
    )
}
