import { Remove, Add } from '@mui/icons-material';
import { Drawer, Typography, Divider, FormControl, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch } from 'react'
import { FieldErrors, FieldValues } from 'react-hook-form';

interface IContratarAgendaJuridica {
    drawerContratarAgenda: boolean
    dadosContratacaoAgenda: any
    errors: FieldErrors<FieldValues>
    setDrawerContratarAgenda: Dispatch<boolean>
    getValorTotalAgenda: (dados: any) => string | undefined
    setDadosContratacaoAgenda: Dispatch<any>
    setQuantidade: Dispatch<number>
    contratarAgenda: () => Promise<void>
}

export default function DrawerContratarAgendaJuridica(props: IContratarAgendaJuridica) {
    const {
        drawerContratarAgenda,
        dadosContratacaoAgenda,
        errors,
        setDrawerContratarAgenda,
        getValorTotalAgenda,
        setDadosContratacaoAgenda,
        setQuantidade,
        contratarAgenda
    } = props

    return (
        <Drawer
            anchor="right"
            open={drawerContratarAgenda}
            onClose={() => setDrawerContratarAgenda(false)}
        >
            <div style={{
                width: 600,
                padding: 20,
                backgroundColor: 'white',
                color: '#000',
                height: '100%',
                position: 'relative'
            }}>
                <br /><br /><br />
                <Typography style={{ fontWeight: "bold" }}>CONTRATAR AGENDA JURÍDICA</Typography>

                <br />

                <Typography style={{ fontWeight: "bold" }}>{dadosContratacaoAgenda.quantidade_usuarios} usuários selecionados</Typography>
                <Typography style={{ fontWeight: "bold" }}>{getValorTotalAgenda(dadosContratacaoAgenda)}/mês</Typography>

                <br />
                <Divider />
                <br />

                <Typography variant="body1" component="label" gutterBottom style={{ display: 'block', marginBottom: '8px' }}>
                    Escolha a quantidade de usuários que usarão a agenda jurídica da Ruke
                </Typography>

                <FormControl variant="outlined" fullWidth error={!!errors.quantidade}>
                    <OutlinedInput
                        id="quantidade"
                        type="number"
                        value={dadosContratacaoAgenda.quantidade_usuarios}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="decrement quantity"
                                    onClick={() => {
                                        setDadosContratacaoAgenda({ ...dadosContratacaoAgenda, quantidade_usuarios: (dadosContratacaoAgenda.quantidade_usuarios - 1) <= 0 ? 1 : dadosContratacaoAgenda.quantidade_usuarios - 1 });
                                    }}
                                    edge="end"
                                    sx={{ padding: '10px' }}
                                >
                                    <Remove />
                                </IconButton>
                                <IconButton
                                    aria-label="increment quantity"
                                    onClick={() => {
                                        setDadosContratacaoAgenda({ ...dadosContratacaoAgenda, quantidade_usuarios: dadosContratacaoAgenda.quantidade_usuarios + 1 });
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
                    <b>Valor total por mês:</b> {getValorTotalAgenda(dadosContratacaoAgenda)}
                </Typography>
                <br />

                <Box style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <Button style={{ width: '100%', fontWeight: '800', padding: '15px', backgroundColor: '#006BED' }} variant="contained"
                        onClick={() => contratarAgenda()} color="primary">
                        CONTRATAR AGENDA
                    </Button>
                </Box>

            </div>
        </Drawer>
    )
}
