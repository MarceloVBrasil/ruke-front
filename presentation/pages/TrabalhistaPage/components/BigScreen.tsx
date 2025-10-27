import { processSteps } from '@/domain/RukeFlex'
import { Grid, Typography, Button } from '@mui/material'
import Link from 'next/link'
import React, { Dispatch } from 'react'
import { handleDelete } from '../helpers/Swal'
import { TicketProgress } from './TicketProgress'
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { getPassoFromEtapa } from '../helpers/getPassosFromEtapa'
import { Btn } from '@/presentation/components/Button'

interface IBigScreen {
    ticket: any
    regraDominio: any
    onTicketDelete: (id: string) => Promise<void>
    setLoading: Dispatch<boolean>
}

export function BigScreenHeader() {
    return (
        <Grid item xs={12} container spacing={2} sx={{ padding: "10px", borderBottom: '1px solid #ddd' }}>
            <Grid item xs={12} sm={6} sx={{ color: 'black' }}>
                Nome do Cliente
            </Grid>

            <Grid item xs={12} sm={6} sx={{ textAlign: "center", color: 'black' }}>
                Ações
            </Grid>
        </Grid>
    )
}

export default function BigScreen(props: IBigScreen) {
    const {
        ticket,
        regraDominio,
        onTicketDelete,
        setLoading
    } = props

    return (
        <Grid item xs={12} container spacing={0} key={ticket.id} sx={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            {/* Nome do Cliente */}
            <Grid item xs={12} sm={6} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" color={'black'} sx={{ fontSize: 16 }}>{ticket.nome_reclamante}</Typography>
            </Grid>

            {/* Ações */}
            <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                {regraDominio?.permissoes?.includes("getById") && (
                    <Link onClick={() => setLoading(true)} href={`trabalhista/${ticket.id}?step=${getPassoFromEtapa(ticket.etapa)}`}>
                        <Btn
                            width={'120px'}
                            text='Ver'
                            variant="contained"
                            color="primary"
                        />
                    </Link>
                )}
                {regraDominio?.permissoes?.includes("delete") && (
                    <Btn
                        width={'120px'}
                        text='Excluir'
                        variant="contained"
                        color="primary"
                        onClick={() => handleDelete(ticket.id, onTicketDelete)}
                    />
                )}
            </Grid>
        </Grid>
    )
}
