import ProcessNumberField from '@/presentation/components/ProcessNumberField';
import { Close, Search, Done } from '@mui/icons-material';
import { DatePicker } from '@mui/lab';
import { Drawer, Typography, IconButton, Grid, Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { ptBR } from 'date-fns/locale';
import React, { Dispatch } from 'react'
import { StyledDatePickerWrapper } from '../helpers/styles';
import { CustomInput } from '../ProcessosPage';
import GridTextField from '@/presentation/components/GridTextField';
import { formatNumeroProcesso } from '@/app/utils/Formater';
import { Btn } from '@/presentation/components/Button';

interface IDrawerDadosProcesso {
    open: boolean,
    setOpen: Dispatch<boolean>
    dadosProcesso: any
    setDadosProcesso: Dispatch<any>
    pesquisarProcesso: () => Promise<void>
    salvarProcesso: () => Promise<void>
}

export default function DrawerDadosProcesso(props: IDrawerDadosProcesso) {

    const {
        open,
        setOpen,
        dadosProcesso,
        setDadosProcesso,
        pesquisarProcesso,
        salvarProcesso
    } = props

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => {
                setDadosProcesso({});
                setOpen(false)
            }}
        >
            <div style={{ width: 400, padding: 20, backgroundColor: 'white', color: '#000', height: '100%', position: 'relative' }}>
                <br /><br /><br /><Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" style={{ color: '#1976D2' }}>
                        Dados do processo
                    </Typography>
                    <IconButton onClick={() => setOpen(false)} style={{ color: '#1976D2' }}>
                        <Close />
                    </IconButton>
                </Box>


                <Grid container spacing={2} style={{ marginTop: 20 }} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} style={{ paddingTop: 17, paddingBottom: 17 }}>
                        <Btn
                            variant='outlined'
                            color='primary'
                            text='Pesquisar Processo'
                            style={{ height: "100%", marginTop: 5 }}
                            onClick={() => pesquisarProcesso()}
                        />
                    </Grid>

                    <GridTextField
                        xs={12}
                        fullWidth
                        value={formatNumeroProcesso(dadosProcesso.numero_processo)}
                        onChange={(e) => setDadosProcesso({ ...dadosProcesso, numero_processo: e.target.value })}
                        label='Número do processo'
                        variant='filled'
                        name='numero_processo'
                    />

                    <GridTextField
                        xs={12}
                        name='orgao_julgador'
                        label="Órgão julgador"
                        fullWidth
                        value={dadosProcesso.orgao_julgador}
                        onChange={(e) => setDadosProcesso({ ...dadosProcesso, orgao_julgador: e.target.value })}
                        variant="filled"
                        InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                    />

                    {/* <Grid item xs={12}>
                        <StyledDatePickerWrapper>
                            <DatePicker
                                selected={dadosProcesso.data_ajuizamento}
                                onChange={(date: any) => setDadosProcesso({ ...dadosProcesso, data_ajuizamento: date })}
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

                    </Grid> */}

                    <GridTextField
                        xs={12}
                        name='classe'
                        label="Classe"
                        fullWidth
                        value={dadosProcesso.classe}
                        onChange={(e) => setDadosProcesso({ ...dadosProcesso, classe: e.target.value })}
                        variant="filled"
                        // style={{ marginLeft: "-10px" }}
                        InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                    />

                    <GridTextField
                        xs={12}
                        name='cliente_principal'
                        label="Cliente principal"
                        fullWidth
                        value={dadosProcesso.cliente_principal}
                        onChange={(e) => setDadosProcesso({ ...dadosProcesso, cliente_principal: e.target.value })}
                        variant="filled"
                        // style={{ marginLeft: "-10px" }}
                        InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                    />

                    <GridTextField
                        xs={12}
                        name='contrario_principal'
                        label="Contrário principal"
                        fullWidth
                        value={dadosProcesso.contrario_principal}
                        onChange={(e) => setDadosProcesso({ ...dadosProcesso, contrario_principal: e.target.value })}
                        variant="filled"
                        // style={{ marginLeft: "-10px" }}
                        InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
                    />

                    <Grid item xs={12} style={{ paddingTop: 17, paddingBottom: 17 }}>
                        <Btn
                            variant='contained'
                            color='primary'
                            text='Salvar'
                            style={{ height: "100%", marginTop: 5 }}
                            onClick={() => salvarProcesso()}
                        />
                    </Grid>


                </Grid>

            </div>
        </Drawer>
    )
}
