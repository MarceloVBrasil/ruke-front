import { Close } from '@mui/icons-material';
import { Drawer, Typography, IconButton, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch } from 'react'
import { convertISOForBR } from '../../AgendaPage/AgendaPage';

interface IDrawerMovimentacoesProcesso {
    open: boolean
    setMovimentacoes: Dispatch<any[]>
    setOpen: Dispatch<boolean>
    movimentacoes: any
}

export default function DrawerMovimentacoesProcesso(props: IDrawerMovimentacoesProcesso) {
    const {
        open,
        setMovimentacoes,
        setOpen,
        movimentacoes
    } = props
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => {
                setMovimentacoes([]);
                setOpen(false)
            }}
        >
            <div style={{ width: 400, padding: 20, backgroundColor: 'white', color: '#000', height: '100%', position: 'relative' }}>
                <br /><br /><br /><Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" style={{ color: '#1976D2' }}>
                        Movimentacoes do processo
                    </Typography>
                    <IconButton onClick={() => setOpen(false)} style={{ color: '#1976D2' }}>
                        <Close />
                    </IconButton>
                </Box>

                <Grid container>
                    <Grid item xs={12} container spacing={2} sx={{ padding: "10px", borderBottom: '1px solid #ddd' }}>
                        <Grid item xs={3} sm={3} sx={{ fontWeight: "bold", color: 'black' }}>
                            Código
                        </Grid>
                        <Grid item xs={5} sm={5} sx={{ fontWeight: "bold", textAlign: "center", color: 'black' }}>
                            Nome
                        </Grid>
                        <Grid item xs={4} sm={4} sx={{ fontWeight: "bold", textAlign: "center", color: 'black' }}>
                            Data e Hora
                        </Grid>
                    </Grid>
                </Grid>
                {movimentacoes && movimentacoes.map((row: any, index: number) => (
                    <Grid key={index} container spacing={0} sx={{ padding: "10px", borderBottom: "1px solid #ddd", display: 'flex' }}>
                        <Grid item xs={3} sm={3}>{row.codigo}</Grid>
                        <Grid item xs={5} sm={5} style={{ textAlign: 'center' }}>{row.nome}</Grid>
                        <Grid item xs={4} sm={4} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                            <Typography> {convertISOForBR(row.dataHora).slice(0, 10)}</Typography>
                            <Typography> {convertISOForBR(row.dataHora).slice(10, 19)}</Typography>
                        </Grid>
                    </Grid>
                ))}

            </div>
        </Drawer>
    )
}
