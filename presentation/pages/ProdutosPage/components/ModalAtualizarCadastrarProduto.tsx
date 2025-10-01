import ModalComponent from '@/presentation/components/Modal';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import { Box } from '@mui/system';
import { register } from 'module';
import React, { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { handleSubmit } from '../../BpcPage/helpers/Swal';
import { handleFormSubmit } from '../helpers/Swal';
import { Produto } from '@/app/types/produto';
import { FieldErrors, FieldValues, SubmitErrorHandler, SubmitHandler } from 'react-hook-form';

interface IModalAtualizarCadastrarProduto {
    formRef: MutableRefObject<HTMLFormElement | undefined>,
    produtoChoose: Produto | null
    produtos: Produto[]
    errors: FieldErrors<FieldValues>
    metodoPagamento: string
    open: boolean
    setProdutos: Dispatch<Produto[]>
    setLoading: Dispatch<boolean>
    setOpen: Dispatch<boolean>
    handleClose: Dispatch<void>
    handleOpen: Dispatch<void>
    handleSubmit: (onValid: SubmitHandler<FieldValues>, onInvalid?: SubmitErrorHandler<FieldValues> | undefined) => (e?: React.BaseSyntheticEvent) => Promise<void>
    register: (v: any) => any
    reset: (v: any) => any
    setMetodoPagamento: (value: any) => void
}

export default function ModalAtualizarCadastrarProduto(props: IModalAtualizarCadastrarProduto) {
    const {
        formRef,
        produtoChoose,
        produtos,
        errors,
        metodoPagamento,
        open,
        setProdutos,
        setLoading,
        setOpen,
        handleClose,
        handleOpen,
        handleSubmit,
        register,
        reset,
        setMetodoPagamento
    } = props

    return (
        <ModalComponent nomeModal={produtoChoose ? 'Atualizar Produto' : 'Cadastrar Produto'} handleClose={handleClose} handleOpen={handleOpen} open={open}>
            <Box ref={formRef} component="form" onSubmit={handleSubmit(() => handleFormSubmit(formRef, produtoChoose, produtos, setProdutos, setLoading, setOpen))} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                            Produtos
                        </Typography>
                        <TextField
                            autoComplete="produto"
                            error={errors.produto ? true : false}
                            helperText={errors.produto?.message?.toString()}
                            fullWidth
                            placeholder='Digite o nome do Produto'
                            id="produto"
                            {...register('produto')}
                            defaultValue={produtoChoose ? produtoChoose.nome : ''}
                            InputLabelProps={{ shrink: true }}

                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth variant="filled" error={errors.metodo_pagamento ? true : false} >
                            <Typography sx={{ color: '#00479d', fontWeight: 'bold', marginLeft: '10px' }}>
                                Metodo Pagamento
                            </Typography>
                            <Select
                                id="metodo_pagamento"
                                variant='outlined'
                                sx={{ ml: 1, mt: 1, borderRadius: '10px' }}
                                value={metodoPagamento}
                                {...register('metodo_pagamento')}
                                onChange={(event) => {
                                    setMetodoPagamento(event.target.value);
                                    reset({ metodo_pagamento: event.target.value })
                                }}
                            >
                                <MenuItem selected value="" disabled>
                                    Selecione o metodo de pagamento
                                </MenuItem>
                                <MenuItem value="CREDIT_CARD">
                                    Cartão de Credito
                                </MenuItem>
                                <MenuItem value="PIX">PIX</MenuItem>
                                <MenuItem value="BOLETO">Boleto</MenuItem>
                            </Select>
                            {errors.metodo_pagamento ? <FormHelperText>{errors.metodo_pagamento?.message?.toString()}</FormHelperText> : null}
                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, padding: '15px', borderRadius: '15px' }}
                >
                    {produtoChoose ? 'Atualizar' : 'Cadastrar'}
                </Button>
            </Box>
        </ModalComponent>
    )
}
