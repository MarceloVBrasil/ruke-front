import { onlyNumber, formatCpf } from '@/app/utils/Formater';
import { estado_civil } from '@/domain/data/estado_civil';
import { formatarDataParaFormatoAmericano } from '@/domain/services/Date';
import { Btn } from '@/presentation/components/Button';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import GridSelectField from '@/presentation/components/GridSelectField';
import GridTextField from '@/presentation/components/GridTextField';
import ModalComponent from '@/presentation/components/Modal';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import { Box, padding } from '@mui/system';
import React from 'react'

interface IPessoaModal {
    pessoaId: string
    pessoaModal: boolean
    pessoaNome: string
    cpfPessoa: string
    errorsPessoa: any
    estadoCivilPessoa: string
    rendaPessoa: string
    parentesco: string
    fonteDeRendaPessoa: string
    dataNascimentoPessoa: string
    pessoaSelecionada: string | undefined
    cpfClient: string
    rgPessoa: string
    profissaoPessoa: string
    setPessoaModal: (value: boolean) => void
    setPessoaNome: (value: string) => void
    handleSubmitPessoa: (value: any) => any
    handleAddPessoaSubmit: () => Promise<void>
    registerPessoa: (value: string) => any
    setCpfPessoa: (value: string) => void
    setEstadoCivilPessoa: (value: any) => void
    resetPessoa: (value: any) => void
    setRendaPessoa: (value: string) => void
    ContractValueMemo: (value: any) => JSX.Element
    setParentesco: (value: string) => void
    setFonteDeRendaPessoa: (value: string) => void
    setDataNascimentoPessoa: (value: string) => void
    calculateIdade: (value: string) => void
    setRgPessoa: (value: string) => void
    setProfissaoPessoa: (value: string) => void
}

export default function PessoaModal(props: IPessoaModal) {
    const {
        pessoaId,
        pessoaModal,
        pessoaNome,
        errorsPessoa,
        cpfPessoa,
        estadoCivilPessoa,
        rendaPessoa,
        parentesco,
        fonteDeRendaPessoa,
        dataNascimentoPessoa,
        pessoaSelecionada,
        cpfClient,
        rgPessoa,
        profissaoPessoa,
        handleSubmitPessoa,
        setPessoaNome,
        setPessoaModal,
        handleAddPessoaSubmit,
        registerPessoa,
        setCpfPessoa,
        setEstadoCivilPessoa,
        resetPessoa,
        setRendaPessoa,
        ContractValueMemo,
        setParentesco,
        setFonteDeRendaPessoa,
        setDataNascimentoPessoa,
        calculateIdade,
        setRgPessoa,
        setProfissaoPessoa
    } = props

    return (
        <ModalComponent
            nomeModal={pessoaId ? "Editar Pessoa" : "Cadastrar Pessoa"}
            width="1000px"
            handleClose={() => setPessoaModal(false)}
            handleOpen={() => setPessoaModal(true)}
            open={pessoaModal}
        >
            <Box
                style={{ marginTop: "30px", }}
                component="form"
                noValidate
                onSubmit={handleSubmitPessoa(handleAddPessoaSubmit)}
            >
                <Grid container style={{}}>
                    <GridTextField
                        xs={12}
                        sm={6}
                        containerStyle={{ padding: 2 }}
                        variant='filled'
                        label='Nome'
                        placeholder='Nome'
                        error={errorsPessoa.pessoaNome ? true : false}
                        helperText={errorsPessoa.pessoaNome?.message?.toString()}
                        {...registerPessoa("pessoaNome")}
                        defaultValue={pessoaNome}
                        onBlur={(e) => setPessoaNome(e.target.value)}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        containerStyle={{ padding: 2 }}
                        variant='filled'
                        label='CPF'
                        placeholder='CPF'
                        error={errorsPessoa.cpfPessoa ? true : false}
                        helperText={errorsPessoa.cpfPessoa?.message?.toString()}
                        {...registerPessoa("cpfPessoa")}
                        value={cpfPessoa}
                        onChange={(e) => {
                            const defaultValue = onlyNumber(e.target.value);
                            setCpfPessoa(formatCpf(defaultValue));
                            resetPessoa({
                                cpfPessoa: formatCpf(defaultValue),
                            });
                        }}
                    />

                    <GridSelectField
                        xs={12}
                        sm={6}
                        style={{ padding: 2 }}
                        variant='filled'
                        label='Estado Civil'
                        name='estado_civil'
                        placeholder='Estado Civil'
                        options={estado_civil}
                        value={estadoCivilPessoa}
                        onChange={(e) => {
                            setEstadoCivilPessoa(e.target.value);
                            resetPessoa({
                                estadoCivilPessoa: e.target.value,
                            });
                        }}
                    />

                    <GridCurrencyInput
                        xs={12}
                        sm={6}
                        label='Renda'
                        variant='filled'
                        error={errorsPessoa.rendaPessoa ? true : false}
                        helperText={errorsPessoa.rendaPessoa?.message?.toString()}
                        {...registerPessoa("rendaPessoa")}
                        placeholder="Digite a Renda"
                        containerStyles={{ padding: 2 }}
                        defaultValue={rendaPessoa}
                        onBlur={(e: any) => {
                            setRendaPessoa(e.target.value);
                            resetPessoa({
                                rendaPessoa: e.target.value,
                            });
                        }}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='Grau de Parentesco'
                        containerStyle={{ padding: 2 }}
                        error={errorsPessoa.parentesco ? true : false}
                        helperText={errorsPessoa.parentesco?.message?.toString()}
                        {...registerPessoa("parentesco")}
                        placeholder="Digite o grau de parentesco"
                        value={parentesco}
                        onChange={(e) => {
                            setParentesco(e.target.value);
                            resetPessoa({
                                parentesco: e.target.value,
                            });
                        }}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='Fonte de Renda'
                        containerStyle={{ padding: 2 }}
                        error={errorsPessoa.fonteDeRendaPessoa ? true : false}
                        helperText={errorsPessoa.fonteDeRendaPessoa?.message?.toString()}
                        {...registerPessoa("fonteDeRendaPessoa")}
                        placeholder="Digite a fonte de renda"
                        value={fonteDeRendaPessoa}
                        onChange={(e) => {
                            setFonteDeRendaPessoa(e.target.value);
                            resetPessoa({
                                fonteDeRendaPessoa: e.target.value,
                            });
                        }}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        type='date'
                        label='Data de Nascimento'
                        error={errorsPessoa.dataNascimentoPessoa ? true : false}
                        helperText={errorsPessoa.dataNascimentoPessoa?.message?.toString()}
                        {...registerPessoa("dataNascimentoPessoa")}
                        placeholder="Digite a Renda"
                        containerStyle={{ padding: 2 }}
                        defaultValue={formatarDataParaFormatoAmericano(dataNascimentoPessoa)}
                        onBlur={(e) => {
                            setDataNascimentoPessoa(e.target.value);
                            resetPessoa({
                                dataNascimentoPessoa: e.target.value,
                            });
                            if (pessoaSelecionada === cpfClient) {
                                calculateIdade(e.target.value);
                            }
                        }}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        variant='filled'
                        label='RG'
                        placeholder='Digite o RG'
                        containerStyle={{ padding: 2 }}
                        error={errorsPessoa.rgPessoa ? true : false}
                        helperText={errorsPessoa.rgPessoa?.message?.toString()}
                        {...registerPessoa("rgPessoa")}
                        defaultValue={rgPessoa}
                        onBlur={(e) => {
                            setRgPessoa(e.target.value);
                            resetPessoa({
                                rgPessoa: e.target.value,
                            });
                        }}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        label='Profissão'
                        variant='filled'
                        placeholder='Digite a Profissão'
                        error={errorsPessoa.profissaoPessoa ? true : false}
                        helperText={errorsPessoa.profissaoPessoa?.message?.toString()}
                        {...registerPessoa("profissaoPessoa")}
                        containerStyle={{ padding: 2 }}
                        defaultValue={profissaoPessoa}
                        onBlur={(e) => {
                            setProfissaoPessoa(e.target.value);
                            resetPessoa({
                                profissaoPessoa: e.target.value,
                            });
                        }}
                    />

                </Grid>

                <Btn
                    type="submit"
                    text={pessoaId ? "Atualizar" : "Adicionar"}
                    marginTop={2}

                />
            </Box>
        </ModalComponent>
    )
}
