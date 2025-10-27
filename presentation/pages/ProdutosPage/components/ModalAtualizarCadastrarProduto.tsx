import ModalComponent from '@/presentation/components/Modal';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import { Box } from '@mui/system';
import { register } from 'module';
import React, { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { handleSubmit } from '../../BpcPage/helpers/Swal';
import { handleFormSubmit } from '../helpers/Swal';
import { Produto } from '@/app/types/produto';
import { FieldErrors, FieldValues, SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import GridTextField from '@/presentation/components/GridTextField';
import { Btn } from '@/presentation/components/Button';
import GridSelectField from '@/presentation/components/GridSelectField';
import { metodo_pagamento } from '../helpers/metodo_pagamento';

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
                    <GridTextField
                        xs={12}
                        label='Produtos'
                        error={errors.produto ? true : false}
                        helperText={errors.produto?.message?.toString()}
                        placeholder='Digite o nome do Produto'
                        {...register('produto')}
                        defaultValue={produtoChoose ? produtoChoose.nome : ''}
                        variant='filled'
                    />

                    <GridSelectField
                        xs={12}
                        label='Método de Pagamento'
                        placeholder='Método de Pagamento'
                        variant='filled'
                        value={metodoPagamento}
                        {...register('metodo_pagamento')}
                        options={metodo_pagamento}
                        onChange={(event) => {
                            setMetodoPagamento(event.target.value);
                            reset({ metodo_pagamento: event.target.value })
                        }}
                    />


                </Grid>
                <Btn
                    type="submit"
                    text={produtoChoose ? 'Atualizar' : 'Cadastrar'}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, padding: '15px', borderRadius: '15px' }}
                />
            </Box>
        </ModalComponent>
    )
}
