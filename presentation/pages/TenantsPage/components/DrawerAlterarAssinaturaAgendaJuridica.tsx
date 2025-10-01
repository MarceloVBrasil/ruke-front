import { Remove, Add } from '@mui/icons-material';
import { Drawer, Typography, Divider, FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch } from 'react'
import { atualizarAssinaturaAgenda } from '../helpers/Swal';
import { Tenant } from '@/app/types/tenant';
import { FieldErrors, FieldValues } from 'react-hook-form';

interface IDrawerAlterarAssinaturaAgendaJuridica {
    drawerUpdateAgenda: boolean
    tenantsList: Tenant[]
    dadosAlteracaoAgenda: any
    errors: FieldErrors<FieldValues>
    setDrawerUpdateAgenda: Dispatch<boolean>
    getValorTotalAgenda: (dados: any) => string | undefined
    setDadosAlteracaoAgenda: Dispatch<any>
    setQuantidade: Dispatch<number>
}

export default function DrawerAlterarAssinaturaAgendaJuridica(props: IDrawerAlterarAssinaturaAgendaJuridica) {
    const {
        drawerUpdateAgenda,
        tenantsList,
        dadosAlteracaoAgenda,
        errors,
        setDrawerUpdateAgenda,
        getValorTotalAgenda,
        setDadosAlteracaoAgenda,
        setQuantidade
    } = props

    return (
        <Drawer
            anchor="right"
            open={drawerUpdateAgenda}
            onClose={() => setDrawerUpdateAgenda(false)}
        >
            <div style={{
                width: 400,
                padding: 20,
                backgroundColor: 'white',
                color: '#000',
                height: '100%',
                position: 'relative'
            }}>
                <br /><br /><br />
                <Typography style={{ fontWeight: "bold" }}>ALTERAR ASSINATURA DA AGENDA JURÍDICA</Typography>

                <br />

                <Typography style={{ fontWeight: "bold" }}>{tenantsList[0].quantidade_usuarios_agenda} usuários contratados</Typography>
                <Typography style={{ fontWeight: "bold" }}>{getValorTotalAgenda(dadosAlteracaoAgenda)}/mês</Typography>

                <br />
                <Divider />
                <br />

                <Typography variant="body1" component="label" gutterBottom style={{ display: 'block', marginBottom: '8px' }}>
                    Redimensione a quantidade de usuários que usarão a agenda jurídica da Ruke
                </Typography>

                <FormControl variant="outlined" fullWidth error={!!errors.quantidade}>
                    <OutlinedInput
                        id="quantidade"
                        type="number"
                        value={dadosAlteracaoAgenda.quantidade_usuarios}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="decrement quantity"
                                    onClick={() => {
                                        setDadosAlteracaoAgenda({ ...dadosAlteracaoAgenda, quantidade_usuarios: (dadosAlteracaoAgenda.quantidade_usuarios - 1) > 0 ? dadosAlteracaoAgenda.quantidade_usuarios - 1 : 1 })
                                    }}
                                    edge="end"
                                    sx={{ padding: '10px' }}
                                >
                                    <Remove />
                                </IconButton>
                                <IconButton
                                    aria-label="increment quantity"
                                    onClick={() => {
                                        setDadosAlteracaoAgenda({ ...dadosAlteracaoAgenda, quantidade_usuarios: dadosAlteracaoAgenda.quantidade_usuarios + 1 })
                                    }}
                                    edge="end"
                                    sx={{ padding: '10px' }}
                                >
                                    <Add />
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            setQuantidade(value);
                        }}
                        sx={{ paddingRight: '96px' }}
                    />
                </FormControl>

                <Typography variant="h6" component="p" sx={{ marginTop: 2, textAlign: 'center' }}>
                    <b>Valor total por mês:</b> {getValorTotalAgenda(dadosAlteracaoAgenda)}
                </Typography>
                <center><p style={{ fontSize: 12 }}>* O valor da parcela mudará a partir da próxima cobrança</p></center>

                <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Button onClick={() => atualizarAssinaturaAgenda(dadosAlteracaoAgenda)} style={{ width: '100%', fontWeight: '800', padding: '15px', backgroundColor: '#006BED' }} variant="contained" color="primary">
                        ATUALIZAR ASSINATURA
                    </Button>
                </Box>

            </div>
        </Drawer>
    )
}
