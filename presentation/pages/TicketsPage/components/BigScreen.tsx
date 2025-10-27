import { Grid, Button } from '@mui/material'
import Link from 'next/link'
import React, { Dispatch } from 'react'
import { handleDelete } from '../helpers/Swal'
import { processSteps } from './ProcessSteps'
import { TicketProgress } from './TicketProgress'
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
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
                {ticket.name_client}
            </Grid>

            {/* AÇÕES */}
            <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                {regraDominio?.permissoes?.includes("getById") && (
                    <Link onClick={() => setLoading(true)} href={`tickets/${ticket.id}`}>
                        <Btn
                            variant="contained"
                            color="primary"
                            text='Ver'
                            width={'200px'}
                        />
                    </Link>
                )}
                {regraDominio?.permissoes?.includes("delete") && (
                    <Btn
                        variant="contained"
                        color="primary"
                        text='Excluir'
                        onClick={() => handleDelete(ticket.id, onTicketDelete)}
                        width={'200px'}
                    />
                )}
            </Grid>
        </Grid>
    )
}
