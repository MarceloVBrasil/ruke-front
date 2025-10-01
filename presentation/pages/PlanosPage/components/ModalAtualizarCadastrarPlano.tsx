import ModalComponent from '@/presentation/components/Modal';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import { Box } from '@mui/system';
import { register } from 'module';
import React, { Dispatch } from 'react'
import { handleSubmit } from '../../BpcPage/helpers/Swal';
import { handleFormSubmit } from '../helpers/Swal';
import { Plano } from '../helpers/interfaces';
import { FieldErrors, FieldValues, SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

interface IModalAtualizarCadastrarPlano {
    planoChoose: Plano | null
    formRef: React.MutableRefObject<HTMLFormElement | undefined>
    produtoId: string
    planos: Plano[]
    open: boolean
    errors: FieldErrors<FieldValues>
    tipoCobranca: string
    handleClose: Dispatch<void>
    handleOpen: Dispatch<void>
    handleSubmit: (onValid: SubmitHandler<FieldValues>, onInvalid?: SubmitErrorHandler<FieldValues> | undefined) => (e?: React.BaseSyntheticEvent) => Promise<void>
    setOpen: Dispatch<boolean>
    setPlanos: Dispatch<Plano[]>
    setPlanoChoose: Dispatch<Plano | null>
    setLoading: Dispatch<boolean>
    register: (v: any) => any
    reset: (v: any) => any
    ContractValueMemo: (props: any) => React.JSX.Element
    setTipoCobranca: (value: any) => void
}

export default function ModalAtualizarCadastrarPlano(props: IModalAtualizarCadastrarPlano) {
    const {
        planoChoose,
        formRef,
        produtoId,
        planos,
        open,
        errors,
        tipoCobranca,
        handleClose,
        handleOpen,
        handleSubmit,
        setOpen,
        setPlanos,
        setPlanoChoose,
        setLoading,
        register,
        reset,
        ContractValueMemo,
        setTipoCobranca
    } = props

    return (
        <ModalComponent nomeModal={planoChoose ? 'Atualizar Plano' : 'Cadastrar Plano'} handleClose={handleClose} handleOpen={handleOpen} open={open}>
            <Box ref={formRef} component="form"
                onSubmit={handleSubmit(() => handleFormSubmit(produtoId, formRef, planoChoose, planos, setOpen, setPlanos, setPlanoChoose, setLoading))}
                sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            Nome
                        </Typography>
                        <TextField
                            id='nome'
                            error={errors.nome ? true : false}
                            helperText={errors.nome?.message?.toString()}
                            defaultValue={planoChoose ? planoChoose.nome : ''}
                            fullWidth
                            placeholder='Digite o nome do plano'
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            {...register('nome')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            Descrição
                        </Typography>
                        <TextField
                            id='descricao'
                            error={errors.descricao ? true : false}
                            helperText={errors.descricao?.message?.toString()}
                            defaultValue={planoChoose ? planoChoose.descricao : ''}
                            fullWidth
                            placeholder='Digite a Descrição'
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            {...register('descricao')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            Limite Contratos
                        </Typography>
                        <TextField
                            id='limite_contratos'
                            type='number'
                            error={errors.limite_contratos ? true : false}
                            helperText={errors.limite_contratos?.message?.toString()}
                            defaultValue={planoChoose ? planoChoose.limite_contratos : ''}
                            fullWidth
                            placeholder='Digite o limite de contratos'
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            {...register('limite_contratos')}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            Limite  de Peticoes
                        </Typography>
                        <TextField
                            id='limite_peticoes'
                            type='number'
                            error={errors.limite_peticoes ? true : false}
                            helperText={errors.limite_peticoes?.message?.toString()}
                            {...register('limite_peticoes')}
                            defaultValue={planoChoose ? planoChoose.limite_peticoes : ''}
                            fullWidth
                            placeholder='Digite o limite de petições'
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            Limite  de Hipossuficiencia
                        </Typography>
                        <TextField
                            id='limite_hipossuficiencia'
                            type='number'
                            error={errors.limite_hipossuficiencia ? true : false}
                            helperText={errors.limite_hipossuficiencia?.message?.toString()}
                            {...register('limite_hipossuficiencia')}
                            defaultValue={planoChoose ? planoChoose.limite_hipossuficiencia : ''}
                            fullWidth
                            placeholder='Digite o limite de petições'
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            Limite  de Procurações
                        </Typography>
                        <TextField
                            id='limite_procuracoes'
                            error={errors.limite_procuracoes ? true : false}
                            helperText={errors.limite_procuracoes?.message?.toString()}
                            {...register('limite_procuracoes')}
                            defaultValue={planoChoose ? planoChoose.limite_peticoes : ''}
                            fullWidth
                            placeholder='Digite o limite de procurações'
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            Preço
                        </Typography>
                        <TextField
                            id='preco'
                            error={errors.preco ? true : false}
                            helperText={errors.preco?.message?.toString()}
                            defaultValue={planoChoose ? planoChoose.preco.replace('.', ',') : ''}
                            fullWidth
                            placeholder='Digite o preço'
                            InputProps={{
                                inputComponent: ContractValueMemo,
                            }}
                            InputLabelProps={{ shrink: true }}
                            {...register('preco')}
                            style={{ borderRadius: 40 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="filled" error={errors.tipo_cobranca ? true : false} >
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Tipo de cobrança
                            </Typography>
                            <Select
                                variant='outlined'
                                sx={{ ml: 1, mt: 1, borderRadius: '10px' }}
                                id="tipo_cobranca"
                                displayEmpty
                                fullWidth
                                error={errors.tipo_cobranca ? true : false}
                                value={tipoCobranca}
                                {...register('tipo_cobranca')}
                                onChange={(event) => {
                                    setTipoCobranca(event.target.value);
                                    reset({ tipo_cobranca: event.target.value })
                                }}

                            >
                                <MenuItem selected value="" disabled>
                                    Selecione o Tipo de cobrança
                                </MenuItem>
                                <MenuItem value="MONTHLY">Mensal</MenuItem>
                                <MenuItem value="BIMONTHLY">Bimestral</MenuItem>
                                <MenuItem value="WEEKLY">Semanal</MenuItem>
                                <MenuItem value="BIWEEKLY">Quinzenal</MenuItem>
                                <MenuItem value="QUARTERLY">Trimestral</MenuItem>
                                <MenuItem value="SEMIANNUALY">Semestral</MenuItem>
                                <MenuItem value="YEARLY">Anual</MenuItem>
                            </Select>
                            {errors.tipo_cobranca ? <FormHelperText>{errors.tipo_cobranca?.message?.toString()}</FormHelperText> : null}

                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {planoChoose ? 'Atualizar Plano' : 'Cadastrar Plano'}
                </Button>
            </Box>
        </ModalComponent>
    )
}
