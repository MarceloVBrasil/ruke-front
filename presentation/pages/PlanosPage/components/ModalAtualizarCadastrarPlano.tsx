import ModalComponent from '@/presentation/components/Modal';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import { Box } from '@mui/system';
import { register } from 'module';
import React, { Dispatch } from 'react'
import { handleSubmit } from '../../BpcPage/helpers/Swal';
import { handleFormSubmit } from '../helpers/Swal';
import { Plano } from '../helpers/interfaces';
import { FieldErrors, FieldValues, SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import GridTextField from '@/presentation/components/GridTextField';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import GridSelectField from '@/presentation/components/GridSelectField';
import { Btn } from '@/presentation/components/Button';

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
                    <GridTextField
                        xs={12}
                        sm={6}
                        label='Nome'
                        variant='filled'
                        error={errors.nome ? true : false}
                        helperText={errors.nome?.message?.toString()}
                        defaultValue={planoChoose ? planoChoose.nome : ''}
                        placeholder='Digite o nome do plano'
                        InputLabelProps={{ shrink: true }}
                        style={{ borderRadius: 40 }}
                        {...register('nome')}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        label='Descrição'
                        variant='filled'
                        error={errors.descricao ? true : false}
                        helperText={errors.descricao?.message?.toString()}
                        defaultValue={planoChoose ? planoChoose.descricao : ''}
                        placeholder='Digite a Descrição'
                        InputLabelProps={{ shrink: true }}
                        style={{ borderRadius: 40 }}
                        {...register('descricao')}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        label='Limite de Contratos'
                        variant='filled'
                        error={errors.limite_contratos ? true : false}
                        helperText={errors.limite_contratos?.message?.toString()}
                        defaultValue={planoChoose ? planoChoose.limite_contratos : ''}
                        placeholder='Digite o limite de contratos'
                        InputLabelProps={{ shrink: true }}
                        style={{ borderRadius: 40 }}
                        {...register('limite_contratos')}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        label='Limite de Petições'
                        variant='filled'
                        error={errors.limite_peticoes ? true : false}
                        helperText={errors.limite_peticoes?.message?.toString()}
                        defaultValue={planoChoose ? planoChoose.limite_peticoes : ''}
                        placeholder='Digite o limite de petições'
                        InputLabelProps={{ shrink: true }}
                        style={{ borderRadius: 40 }}
                        {...register('limite_peticoes')}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        label='Limite de Hipossuficiência'
                        variant='filled'
                        error={errors.limite_hipossuficiencia ? true : false}
                        helperText={errors.limite_hipossuficiencia?.message?.toString()}
                        defaultValue={planoChoose ? planoChoose.limite_hipossuficiencia : ''}
                        placeholder='Digite o limite de hipossuficiência'
                        InputLabelProps={{ shrink: true }}
                        style={{ borderRadius: 40 }}
                        {...register('limite_hipossuficiencia')}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        label='Limite de Procurações'
                        variant='filled'
                        error={errors.limite_procuracoes ? true : false}
                        helperText={errors.limite_procuracoes?.message?.toString()}
                        defaultValue={planoChoose ? planoChoose.limite_procuracoes : ''}
                        placeholder='Digite o limite de procurações'
                        InputLabelProps={{ shrink: true }}
                        style={{ borderRadius: 40 }}
                        {...register('limite_procuracoes')}
                    />

                    <GridCurrencyInput
                        xs={12}
                        sm={6}
                        label='Preço'
                        variant='filled'
                        error={errors.preco ? true : false}
                        helperText={errors.preco?.message?.toString()}
                        defaultValue={planoChoose?.preco || ''}
                        placeholder='Digite o preço'
                        {...register('preco')}

                    />

                    <GridSelectField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='Tipo de cobrança'
                        error={errors.tipo_cobranca ? true : false}
                        value={tipoCobranca}
                        {...register('tipo_cobranca')}
                        onChange={(event) => {
                            setTipoCobranca(event.target.value);
                            reset({ tipo_cobranca: event.target.value })
                        }}
                        options={[
                            { descricao: 'Mensal', value: 'mensal' },
                            { descricao: 'Bimensal', value: 'bimensal' },
                            { descricao: 'Semanal', value: 'semanal' },
                            { descricao: 'Quinzenal', value: 'quinzenal' },
                            { descricao: 'Trimestral', value: 'trimestral' },
                            { descricao: 'Semestral', value: 'semestral' },
                            { descricao: 'Anual', value: 'anual' },
                        ]}
                    />

                </Grid>
                <Btn
                    type="submit"
                    text={planoChoose ? 'Atualizar Plano' : 'Cadastrar Plano'}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                />
            </Box>
        </ModalComponent>
    )
}
