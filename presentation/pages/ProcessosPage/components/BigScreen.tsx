import { FormatListNumbered } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import VisibilityIcon from "@mui/icons-material/Visibility";

interface IBigScreen {
    processo: any
    handleDadosProcesso: (processo: any) => Promise<void>
    handleMovimentacoes: (id_processo: string) => Promise<void>
    converterDataParaBrasileiro: (horario: string) => string
}

export function BigScreenHeader() {
    return (
        <Grid item xs={12} container spacing={2} sx={{ padding: "10px", borderBottom: '1px solid #ddd' }}>
            <Grid item xs={12} sm={3} sx={{ fontWeight: "bold", color: 'black' }}>
                Número do processo
            </Grid>
            <Grid item xs={12} sm={3} sx={{ fontWeight: "bold", color: 'black' }}>
                Data de ajuizamento
            </Grid>
            <Grid item xs={12} sm={3} sx={{ fontWeight: "bold", textAlign: "center", color: 'black' }}>
                Cliente principal
            </Grid>
            <Grid item xs={12} sm={3} sx={{ fontWeight: "bold", textAlign: "center", color: 'black' }}>
                Ações
            </Grid>
        </Grid>
    )
}

export default function BigScreen(props: IBigScreen) {
    const {
        processo,
        handleDadosProcesso,
        handleMovimentacoes,
        converterDataParaBrasileiro
    } = props

    return (
        <Grid item xs={12} container spacing={0} sx={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
            <Grid item xs={12} sm={3} sx={{ display: "flex", alignItems: "center" }}>
                {processo.numero_processo}
            </Grid>

            <Grid item xs={12} sm={3} style={{ display: "flex", flexDirection: 'column', gap: 5, position: 'relative', left: 30, top: 15, width: 'auto' }}>
                <Typography style={{}}>{converterDataParaBrasileiro(processo.data_ajuizamento)?.slice(0, 10)}</Typography>
                <Typography style={{ position: 'relative', left: 8 }}>{converterDataParaBrasileiro(processo.data_ajuizamento)?.slice(10, 19)}</Typography>
            </Grid>

            <Grid item xs={12} sm={3} sx={{ display: "flex", alignItems: "center", justifyContent: 'center' }}>
                {processo.cliente_principal}
                MARCELO BRASIL
            </Grid>

            <Grid item xs={12} sm={3} style={{ display: "flex", alignItems: "center", flexDirection: 'column', gap: 5 }}>

                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleDadosProcesso(processo)}
                    fullWidth
                >
                    Dados
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<FormatListNumbered />}
                    onClick={() => handleMovimentacoes(processo.id)}
                >
                    Movimentações
                </Button>

            </Grid>
        </Grid>
    )
}
