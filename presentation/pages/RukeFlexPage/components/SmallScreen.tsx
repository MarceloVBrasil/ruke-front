import { Grid, Button } from '@mui/material'
import Link from 'next/link'
import React, { Dispatch } from 'react'
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ISmallScreen {
    ticket: any
    setLoading: Dispatch<boolean>
}

export default function SmallScreen(props: ISmallScreen) {

    const {
        ticket,
        setLoading
    } = props

    return (
        <Grid xs={12} container spacing={2} sx={{ padding: "10px", borderBottom: "1px solid #ddd", boxShadow: 3, borderRadius: 2 }}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: 'center' }}>
                {ticket.nome_cliente}
            </Grid>

            <Grid item xs={12} >
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
