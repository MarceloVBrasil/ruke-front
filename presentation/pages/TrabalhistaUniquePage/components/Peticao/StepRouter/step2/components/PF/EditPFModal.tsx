import * as React from 'react';

import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { useReducer } from 'react';
import { PF } from '@/app/types/pf';
import { formatCepInput, formatCpf, formatRG } from '@/app/utils/Formater';
import { EditModal } from '@/presentation/components/ModalEdit';
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';
import GridSelectField from '@/presentation/components/GridSelectField';
import GridTextField from '@/presentation/components/GridTextField';
import axios from 'axios';
import { cep } from '@/app/types/cep';
import { Action, FormField } from './pfFormTypesAndFields';
import { formReducer, getErrorInitialState, getFormInitialEditState } from './pfReducerFunctions';
import { isCepValid, isCpfValid, isEmailValid, isFieldEmpty, isNegative, isPositive } from '@/app/utils/validators';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import { estado_civil } from '../../../helper/EstadoCivil';
import { PF_RECLAMADA, RAZAO_INCLUSAO_POLO_PASSIVO } from '../../helper/FormTypesAndFields';
import { getAddressByCep } from '@/app/api/client/outros';
import { periodo_responsabilidade, PERIODO_RESPONSABILIDADE_OPTIONS } from '../../helper/PeriodoResponsabilidade';
import GridCheckbox from '@/presentation/components/GridCheckbox';

interface IModal {
    open: boolean
    onClose: () => void
    onEditarClick: (id: string, PF: PF_RECLAMADA) => void
    PF_RECLAMADA: PF_RECLAMADA
    existem_outras_adicionadas: boolean
}

export function EditPFModal(props: IModal) {
    const { open, onClose, existem_outras_adicionadas, PF_RECLAMADA } = props
    const [state, dispatch] = useReducer((state: PF_RECLAMADA, action: Action) => formReducer(state, action, existem_outras_adicionadas), getFormInitialEditState(PF_RECLAMADA))
    const [edited, setEdited] = React.useState(false)

    const [error, setError] = React.useState(getErrorInitialState())

    const responsavel_subsidiario_checked = state.razao_inclusao_polo_passivo ? state.razao_inclusao_polo_passivo[RAZAO_INCLUSAO_POLO_PASSIVO.RESPONSAVEL_SUBSIDIARIO] : false
    const responsavel_solidario_checked = state.razao_inclusao_polo_passivo ? state.razao_inclusao_polo_passivo[RAZAO_INCLUSAO_POLO_PASSIVO.RESPONSAVEL_SOLIDARIO] : false
    const sucessao_empresarial_checked = state.razao_inclusao_polo_passivo ? state.razao_inclusao_polo_passivo[RAZAO_INCLUSAO_POLO_PASSIVO.SUCESSAO_EMPRESARIAL] : false

    React.useEffect(() => {

        if (isCepValid(state[FormField.CEP]) && edited) {
            getEnderecoByCep(state[FormField.CEP])
        }

    }, [state[FormField.CEP]])

    return (
        <EditModal
            title='Editar reclamada pessoa física'
            open={open}
            onClose={onClose}
            onEditarClick={handleEditarClick}
        >
            <Grid container spacing={1}>
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.NOME}
                    fullWidth
                    error={error.nome}
                    helperText={error.nome ? 'Nome é obrigatório' : ' '}
                    label='Nome*'
                    value={state[FormField.NOME]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    error={error.cpf}
                    helperText={error.cpf ? 'CPF é obrigatório' : ' '}
                    value={formatCpf(state[FormField.CPF])}
                    name={FormField.CPF}
                    label="CPF*"
                    onChange={handleChange}
                    variant='standard'

                />
                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    error={error.rg}
                    helperText={error.rg ? 'RG é obrigatório' : ' '}
                    value={formatRG(state[FormField.RG])}
                    name={FormField.RG}
                    label="RG*"
                    onChange={handleChange}
                    variant='standard'

                />
                <GridSelectField
                    xs={12} sm={6}
                    fullWidth
                    error={error.estado_civil}
                    helperText={error.estado_civil ? 'Estado Civil é obrigatório' : ' '}
                    value={state[FormField.ESTADO_CIVIL]}
                    name={FormField.ESTADO_CIVIL}
                    label="Estado Civil*"
                    onChange={handleChange}
                    variant='standard'
                    options={estado_civil}
                    style={{ position: 'relative', bottom: 8 }}
                />
                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    error={error.email}
                    helperText={error.email ? 'Email é obrigatório' : ' '}
                    value={(state[FormField.EMAIL])}
                    name={FormField.EMAIL}
                    label="Email"
                    onChange={handleChange}
                    variant='standard'

                />
                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    error={error.cep}
                    helperText={error.cep ? 'CEP é obrigatório' : ' '}
                    value={formatCepInput(state[FormField.CEP])}
                    name={FormField.CEP}
                    label='CEP*'
                    onChange={handleChange}
                    variant='standard'

                />
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.RUA}
                    fullWidth
                    error={error.rua}
                    helperText={error.rua ? 'Rua é obrigatório' : ' '}
                    label='Rua*'
                    value={state[FormField.RUA]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12} sm={6}
                    type='number'
                    name={FormField.NUMERO}
                    fullWidth
                    error={error.numero}
                    helperText={error.numero ? 'Número é obrigatório' : ' '}
                    label='Número*'
                    value={state[FormField.NUMERO]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.COMPLEMENTO}
                    fullWidth
                    label='Complemento'
                    value={state[FormField.COMPLEMENTO]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12} sm={6}
                    name={FormField.BAIRRO}
                    fullWidth
                    error={error.bairro}
                    helperText={error.bairro ? 'Bairro é obrigatório' : ' '}
                    label='Bairro*'
                    value={state[FormField.BAIRRO]}
                    onChange={handleChange}
                    variant='standard'
                />
                <GridTextField
                    xs={12}
                    name={FormField.CIDADE}
                    fullWidth
                    error={error.cidade}
                    helperText={error.cidade ? 'Cidade é obrigatório' : ' '}
                    label='Cidade*'
                    value={state[FormField.CIDADE]}
                    onChange={handleChange}
                    variant='standard'
                />

                <GridSelectField
                    xs={12}
                    fullWidth
                    error={error.estado}
                    helperText={error.estado ? 'Estado é obrigatório' : ' '}
                    name={FormField.ESTADO}
                    label="Estado*"
                    value={state[FormField.ESTADO]}
                    onChange={handleChange}
                    variant="standard"
                    options={estados_brasileiros}
                />

                <GridRadioGroup
                    xs={12}
                    sectionTitle={'Reclamada Principal? '}
                    pl={0}
                    name={FormField.RECLAMADA_PRINCIPAL}
                    value={state.principal}
                    onChange={handleReclamadaPrincipalChange}
                    options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                />

                <GridCheckbox
                    xs={12}
                    pl={2}
                    style={{ display: state.principal ? 'none' : 'block' }}
                    checked={sucessao_empresarial_checked}
                    name={FormField.RAZAO_INCLUSAO_POLO_PASSIVO}
                    value={RAZAO_INCLUSAO_POLO_PASSIVO.RESPONSAVEL_SUBSIDIARIO}
                    label={'Sucessão empresarial'}
                    onChange={handleSucessaoEmpresarialChange}
                />

                <GridCheckbox
                    xs={12}
                    pl={2}
                    style={{ display: state.principal ? 'none' : 'block' }}
                    checked={responsavel_solidario_checked}
                    name={FormField.RAZAO_INCLUSAO_POLO_PASSIVO}
                    value={RAZAO_INCLUSAO_POLO_PASSIVO.RESPONSAVEL_SUBSIDIARIO}
                    label={'Responsável solidário: grupo econômico'}
                    onChange={handleResponsavelSolidarioChange}
                />

                <Box sx={{ boxShadow: 3, borderRadius: 2, p: 2, width: '100%', display: state.principal ? 'none' : 'block' }}>
                    <GridCheckbox
                        xs={12}
                        checked={responsavel_subsidiario_checked}
                        name={FormField.RAZAO_INCLUSAO_POLO_PASSIVO}
                        value={RAZAO_INCLUSAO_POLO_PASSIVO.RESPONSAVEL_SUBSIDIARIO}
                        label={'Responsável subsidiário: tomador de serviços'}
                        onChange={handleResponsavelSubsidiarioChange}
                    />

                    <GridRadioGroup
                        xs={12}
                        pl={0}
                        style={{ visibility: state.razao_inclusao_polo_passivo?.[RAZAO_INCLUSAO_POLO_PASSIVO.RESPONSAVEL_SUBSIDIARIO] ? 'visible' : 'hidden' }}
                        sectionTitle={'Período de Responsabilidade '}
                        name={FormField.RAZAO_INCLUSAO_POLO_PASSIVO}
                        value={state.razao_inclusao_polo_passivo?.[RAZAO_INCLUSAO_POLO_PASSIVO.PERIODO_RESPONSABILIDADE] as periodo_responsabilidade | ''}
                        onChange={handlePeriodoResponsabilidadeChange}
                        options={PERIODO_RESPONSABILIDADE_OPTIONS}
                    />
                </Box>

            </Grid>
        </EditModal>
    );

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;
        setEdited(true)

        dispatch({
            type: 'SET_FIELD',
            field: name as keyof PF,
            value,
        });
    }

    function handleReclamadaPrincipalChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, checked } = e.target;
        setEdited(true)

        dispatch({
            type: 'SET_RECLAMADA_PRINCIPAL_FIELD',
            field: FormField.RECLAMADA_PRINCIPAL,
            value: value == 'true'
        });
    }

    function handleResponsavelSubsidiarioChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, checked } = e.target;
        setEdited(true)

        dispatch({
            type: 'SET_RESPONSAVEL_SUBSIDIARIO_FIELD',
            field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO,
            value: checked
        });
    }

    function handleResponsavelSolidarioChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, checked } = e.target;
        setEdited(true)

        dispatch({
            type: 'SET_RESPONSAVEL_SOLIDARIO_FIELD',
            field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO,
            value: checked
        });
    }

    function handleSucessaoEmpresarialChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, checked } = e.target;
        setEdited(true)

        dispatch({
            type: 'SET_SUCESSAO_EMPRESARIAL_FIELD',
            field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO,
            value: checked
        });
    }

    function handlePeriodoResponsabilidadeChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, checked } = e.target;
        setEdited(true)

        dispatch({
            type: 'SET_PERIODO_RESPONSABILIDADE_FIELD',
            field: FormField.RAZAO_INCLUSAO_POLO_PASSIVO,
            value: value as periodo_responsabilidade
        });
    }

    function handleEditarClick() {
        checkErrors()
        if (isFormInvalid()) return

        props.onEditarClick(state.id as string, state)
        onClose()
    }

    async function getEnderecoByCep(cep: string) {

        try {
            const data: cep = await getAddressByCep(cep)

            const filteredData = {
                [FormField.RUA]: data.logradouro,
                [FormField.BAIRRO]: data.bairro,
                [FormField.CIDADE]: data.localidade,
                [FormField.ESTADO]: data.uf
            }

            dispatch({
                type: 'SET_FIELD',
                field: FormField.RUA,
                value: filteredData[FormField.RUA]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.BAIRRO,
                value: filteredData[FormField.BAIRRO]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.CIDADE,
                value: filteredData[FormField.CIDADE]
            })

            dispatch({
                type: 'SET_FIELD',
                field: FormField.ESTADO,
                value: filteredData[FormField.ESTADO]
            })

        } catch (error) {

        }
    }

    function isFormInvalid(): boolean {
        return (
            !isCpfValid(state.cpf)
            || !isCepValid(state.cep)
            || !isPositive(state.numero)
            || isFieldEmpty(state.numero)
            || isFieldEmpty(state.nome)
            || isFieldEmpty(state.rua)
            || isFieldEmpty(state.bairro)
            || isFieldEmpty(state.cidade)
            || isFieldEmpty(state.estado)
            || isFieldEmpty(state.rg)
            // || !isEmailValid(state.email)
            || isFieldEmpty(state.estado_civil)
        )
    }

    function checkErrors() {
        if (!isCpfValid(state.cpf)) setError(prev => { return { ...prev, cpf: true } })
        else setError(prev => { return { ...prev, cpf: false } })

        if (!isCepValid(state.cep)) setError(prev => { return { ...prev, cep: true } })
        else setError(prev => { return { ...prev, cep: false } })

        if (!isPositive(state.numero) || isFieldEmpty(state.numero)) setError(prev => { return { ...prev, numero: true } })
        else setError(prev => { return { ...prev, numero: false } })

        if (isFieldEmpty(state.nome)) setError(prev => { return { ...prev, nome: true } })
        else setError(prev => { return { ...prev, nome: false } })

        if (isFieldEmpty(state.rua)) setError(prev => { return { ...prev, rua: true } })
        else setError(prev => { return { ...prev, rua: false } })

        if (isFieldEmpty(state.bairro)) setError(prev => { return { ...prev, bairro: true } })
        else setError(prev => { return { ...prev, bairro: false } })

        if (isFieldEmpty(state.cidade)) setError(prev => { return { ...prev, cidade: true } })
        else setError(prev => { return { ...prev, cidade: false } })

        if (isFieldEmpty(state.estado)) setError(prev => { return { ...prev, estado: true } })
        else setError(prev => { return { ...prev, estado: false } })

        if (isFieldEmpty(state.rg)) setError(prev => { return { ...prev, rg: true } })
        else setError(prev => { return { ...prev, rg: false } })

        // if (!isEmailValid(state.email)) setError(prev => { return { ...prev, email: true } })
        // else setError(prev => { return { ...prev, email: false } })

        if (isFieldEmpty(state.estado_civil)) setError(prev => { return { ...prev, estado_civil: true } })
        else setError(prev => { return { ...prev, estado_civil: false } })
    }
}