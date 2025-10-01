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
            <Paper sx={{ padding: "10px", marginY: "10px", display: 'flex', flexDirection: 'column', gap: 4, marginLeft: { xs: 1.5, md: 0 } }}>

                <Typography variant="h6" sx={{ textAlign: 'center', pt: 1 }}>{ticket.name_client}</Typography>

                <Box sx={{
                    display: 'flex', flexDirection: {
                        xs: 'column', lg: 'row'
                    },
                    justifyContent: "center",
                    backgroundColor: "white",
                    padding: "10px",
                    gap: "10px",
                }}>
                    {regraDominio?.permissoes?.includes("getById") && (
                        <Link onClick={() => setLoading(true)} href={`tickets/${ticket.id}`}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<VisibilityIcon />}
                                sx={{ width: '100%' }}
                            >
                                Ver
                            </Button>
                        </Link>
                    )}
                    {regraDominio?.permissoes?.includes("delete") && (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(ticket.id, onTicketDelete)}
                        >
                            Excluir
                        </Button>
                    )}
                </Box>
            </Paper>
        </Grid>
    )
}
