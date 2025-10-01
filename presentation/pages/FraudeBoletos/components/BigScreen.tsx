import { Grid, Typography, Button } from '@mui/material'
import Link from 'next/link'
import React, { Dispatch } from 'react'
import { handleDelete } from '../helpers/Swal'
import { processSteps } from './ProcessSteps'
import { TicketProgress } from './TicketProgress'
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";


interface IBigScreen {
    ticket: any
    regraDominio: any
    onTicketDelete: (id: string) => Promise<void>
    setLoading: Dispatch<boolean>
}

export function BigScreenHeader() {
    return (
        <Grid item xs={12} container spacing={2} sx={{ padding: "10px", borderBottom: '1px solid #ddd' }}>
            <Grid item xs={12} sm={4} sx={{ fontWeight: "bold", color: 'black' }}>
                Nome do Cliente
            </Grid>
            <Grid item xs={12} sm={4} sx={{ fontWeight: "bold", color: 'black' }}>
                Documentos Gerados
            </Grid>
            <Grid item xs={12} sm={4} sx={{ fontWeight: "bold", textAlign: "center", color: 'black' }}>
                Ações
            </Grid>
        </Grid>
    )
}

export default function BigScreen(props: IBigScreen) {

    const {
        ticket,
        onTicketDelete,
        regraDominio,
        setLoading
    } = props

    return (
        <Grid item xs={12} container spacing={0} key={ticket.id} sx={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            {/* Nome do Cliente */}
            <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" color={'black'} sx={{ fontSize: 16 }}>{ticket.nome_cliente}</Typography>
            </Grid>

            {/* Documentos Gerados */}
            <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                <TicketProgress
                    currentStep={processSteps(ticket).pontuacao}
                    texto={processSteps(ticket).texto}
                    totalSteps={ticket.tipo_pessoa === "pf" ? 4 : 3}
                />
            </Grid>

            {/* Ações */}
            <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                {regraDominio?.permissoes?.includes("getById") && (
                    <Link onClick={() => setLoading(true)} href={`fraude-boleto/${ticket.id}`}>
                        <Button variant="contained" color="primary" startIcon={<VisibilityIcon />}>
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
            </Grid>
        </Grid>
    )
}
