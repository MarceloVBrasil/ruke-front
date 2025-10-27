import ProcessNumberField from '@/presentation/components/ProcessNumberField';
import { Close, Search } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import { Drawer, Typography, IconButton, Grid, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { ptBR } from 'date-fns/locale';
import React, { Dispatch } from 'react'
import { StyledDatePickerWrapper } from '../helpers/styles';
import { CustomInput } from '../ProcessosPage';
import GridTextField from '@/presentation/components/GridTextField';
import { formatNumeroProcesso } from '@/app/utils/Formater';
import { Btn } from '@/presentation/components/Button';

interface IDrawerFiltros {
    open: boolean,
    setOpen: Dispatch<boolean>
    filtros: any
    setFiltros: Dispatch<any>
    filtrar: () => Promise<void>
    limparFiltros: (e: any) => Promise<void>
}

export default function DrawerFiltros(props: IDrawerFiltros) {

    const {
        open,
        setOpen,
        filtros,
        setFiltros,
        filtrar,
        limparFiltros
    } = props

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => {
                setFiltros({ numero_processo: "" });
                setOpen(false)
            }}
        >
            <div style={{ width: 400, padding: 20, backgroundColor: 'white', color: '#000', height: '100%', position: 'relative' }}>
                <br /><br /><br /><Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" style={{ color: '#1976D2' }}>
                        Filtrar <a style={{ marginLeft: 10 }} href='' onClick={(e) => limparFiltros(e)}>Limpar Filtros</a>
                    </Typography>
                    <IconButton onClick={() => setOpen(false)} style={{ color: '#1976D2' }}>
                        <Close />
                    </IconButton>
                </Box>

                <Grid container spacing={2} style={{ marginTop: 20 }}>

                    <GridTextField
                        xs={12}
                        fullWidth
                        value={formatNumeroProcesso(filtros.numero_processo)}
                        onChange={(e) => setFiltros({ ...filtros, numero_processo: e.target.value })}
                        label='Número do processo'
                        variant='filled'
                        name='numero_processo'
                    />

                    <GridTextField
                        xs={12}
                        label="Órgão julgador"
                        fullWidth
                        value={filtros.orgao_julgador}
                        onChange={(e) => setFiltros({ ...filtros, orgao_julgador: e.target.value })}
                        variant="filled"
                        style={{ marginLeft: "-10px" }}
                        name=''
                        InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                    />

                    <Grid item xs={12}>
                        <StyledDatePickerWrapper>
                            <DatePicker
                                selected={filtros.data_ajuizamento}
                                onChange={(date: any) => setFiltros({ ...filtros, data_ajuizamento: date })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="Pp"
                                locale={ptBR}
                                customInput={<CustomInput label="Data de ajuizamento" />}
                                wrapperClassName='datepicker'
                                popperPlacement="bottom-start"
                            />
                        </StyledDatePickerWrapper>

                    </Grid>

                    <GridTextField
                        xs={12}
                        name='classe'
                        label="Classe"
                        fullWidth
                        value={filtros.classe}
                        onChange={(e) => setFiltros({ ...filtros, classe: e.target.value })}
                        variant="filled"
                        style={{ marginLeft: "-10px" }}
                        InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                    />

                    <GridTextField
                        xs={12}
                        name='Cliente Principal'
                        label="Cliente principal"
                        fullWidth
                        value={filtros.cliente_principal}
                        onChange={(e) => setFiltros({ ...filtros, cliente_principal: e.target.value })}
                        variant="filled"
                        style={{ marginLeft: "-10px" }}
                        InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                    />

                    <GridTextField
                        xs={12}
                        name='contrario_principal'
                        label="Contrário principal"
                        fullWidth
                        value={filtros.contrario_principal}
                        onChange={(e) => setFiltros({ ...filtros, contrario_principal: e.target.value })}
                        variant="filled"
                        style={{ marginLeft: "-10px" }}
                        InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                    />

                    <Grid item xs={12} style={{ paddingTop: 17, paddingBottom: 17 }}>
                        <Btn
                            variant='contained'
                            color='primary'
                            text='Buscar'
                            style={{ height: "100%", marginTop: 5 }}
                            onClick={() => filtrar()}
                        />
                    </Grid>


                </Grid>
            </div>
        </Drawer>
    )
}
