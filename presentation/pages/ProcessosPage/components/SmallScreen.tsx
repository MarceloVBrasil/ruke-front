import { FormatListNumbered } from '@mui/icons-material'
import { Grid, Button } from '@mui/material'
import React from 'react'
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ISmallScreen {
    processo: any
    handleDadosProcesso: (processo: any) => Promise<void>
    handleMovimentacoes: (id_processo: string) => Promise<void>
}

export default function SmallScreen(props: ISmallScreen) {
    const {
        processo,
        handleDadosProcesso,
        handleMovimentacoes
    } = props

    return (
        <Grid xs={12} container spacing={2} sx={{ padding: "10px", borderBottom: "1px solid #ddd", boxShadow: 3, borderRadius: 2, mt: 2, ml: 'auto' }}>
            <Grid item xs={12} style={{ fontWeight: 600, textAlign: 'center' }}>
                CLIENTE
                {processo.cliente_principal}
            </Grid>

            <Grid item xs={12} style={{ fontWeight: 600, textAlign: 'center' }}>
                {processo.numero_processo}
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleDadosProcesso(processo)}
                    fullWidth
                >
                    Dados
                </Button>

            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<FormatListNumbered />}
                    onClick={() => handleMovimentacoes(processo.id)}
                    fullWidth
                >
                    Movimentações
                </Button>
            </Grid>

        </Grid>
    )
}
