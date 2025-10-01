import { Grid, Paper, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import React, { Dispatch } from 'react'
import { handleDelete } from '../helpers/Swal'
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

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
            <Paper sx={{ padding: "10px", marginY: "10px", display: 'flex', flexDirection: 'column', gap: 4, marginLeft: { xs: 2.5, md: 0 } }}>
                <Typography variant="h6" sx={{ textAlign: 'center', pt: 1 }}>{ticket.nome_cliente}</Typography>
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
                    <Grid item xs={12}>
                        <Link onClick={() => setLoading(true)} href={`/fraude-boleto/${ticket.id}`}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                startIcon={<VisibilityIcon />}
                            >
                                Ver
                            </Button>
                        </Link>
                    </Grid>

                    <Grid item xs={12} mt={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(ticket.id, onTicketDelete)}
                        >
                            Excluir
                        </Button>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    )
}
