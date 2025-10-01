import { Grid, Button } from '@mui/material'
import Link from 'next/link'
import React, { Dispatch } from 'react'
import { processSteps } from './ProcessSteps'
import { TicketProgress } from './TicketProgress'
import VisibilityIcon from "@mui/icons-material/Visibility";

interface IBigScreen {
    ticket: any
    setLoading: Dispatch<boolean>

}

export default function BigScreen(props: IBigScreen) {
    const {
        ticket,
        setLoading
    } = props
    return (
        <Grid item xs={12} container spacing={0} sx={{ padding: "10px", borderBottom: "1px solid #ddd" }}>

            <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                {ticket.nome_cliente}
            </Grid>

            <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
                <TicketProgress
                    currentStep={processSteps(ticket).pontuacao}
                    texto={processSteps(ticket).texto}
                    totalSteps={4}
                />
            </Grid>

            <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                <Link onClick={() => setLoading(true)} href={`rukeflex/${ticket.id}`}>
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
        </Grid>
    )
}
