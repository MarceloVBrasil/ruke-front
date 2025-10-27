import { processSteps } from '@/domain/RukeFlex'
import { Grid, Button } from '@mui/material'
import Link from 'next/link'
import React, { Dispatch } from 'react'
import { handleDelete } from '../helpers/Swal'
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
                {ticket.nome_cliente}
            </Grid>

            <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                <Link onClick={() => setLoading(true)} href={`/bpc/${ticket.id}`}>
                    <Btn
                        text='Ver'
                        variant="contained"
                        color="primary"
                        width={'200px'}
                    />
                </Link>
                <Btn
                    text='Excluir'
                    variant="contained"
                    color="primary"
                    onClick={() => handleDelete(ticket.id, onTicketDelete)}
                    width={'200px'}
                />
            </Grid>
        </Grid>
    )
}
