import React, { ChangeEvent, Dispatch, useEffect, useRef, useState } from 'react'
import { intervalo } from './modais/intervalos/DesviosFormAndFields';
import CustomBox from '@/presentation/components/CustomBox';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import LabeledCustomBox from '@/presentation/components/LabeledCustomBox';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { Action, FormField, FormState } from '../../helper/FormTypesAndFields';
import { AddDesviosModal } from './modais/intervalos/AddIntervalosModal';
import DeleteDesvioModal from './modais/intervalos/DeleteIntervalosModal';
import { EditDesviosModal } from './modais/intervalos/EditIntervalosModal';
import GridCheckbox from '@/presentation/components/GridCheckbox';
import GridTextField from '@/presentation/components/GridTextField';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import { DesvioFuncaoError, fundamento, FUNDAMENTOS, PEDIDO_DESVIO_FUNCAO } from '../../helper/DesvioFuncao/types';

interface IDesvioFuncao {
    intervalos: intervalo[]
    selectedIntervalo: intervalo | null
    setIsAddIntervaloModalOpened: (value: boolean) => void
    setIsEditIntervaloModalOpened: (value: boolean) => void
    setIsDeleteIntervaloModalOpened: (value: boolean) => void
    setSelectedIntervalo: (intervalo: intervalo | null) => void
    isAddIntervaloModalOpened: boolean
    isEditIntervaloModalOpened: boolean
    isDeleteIntervaloModalOpened: boolean

    setFormHasChanged: (value: boolean) => void
    state: FormState
    dispatch: Dispatch<Action>

    error: DesvioFuncaoError
}

export default function DesvioFuncao(props: IDesvioFuncao) {
    const {
        intervalos,
        selectedIntervalo,
        setIsAddIntervaloModalOpened,
        setIsEditIntervaloModalOpened,
        setIsDeleteIntervaloModalOpened,
        setSelectedIntervalo,
        isAddIntervaloModalOpened,
        isEditIntervaloModalOpened,
        isDeleteIntervaloModalOpened,
        state,
        dispatch,
        setFormHasChanged,
        error
    } = props
    const [outrosFundamentosChecked, setOutrosFundamentosChecked] = React.useState(state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.OUTROS_FUNDAMENTOS] != null)
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    const openAddIntervaloModal = () => {
        setIsAddIntervaloModalOpened(true)
    }

    const closeAddIntervaloModal = () => {
        setIsAddIntervaloModalOpened(false)
    }

    const openEditIntervaloModal = (intervalo: intervalo) => {
        setIsEditIntervaloModalOpened(true)
        setSelectedIntervalo(intervalo)
    }

    const closeEditIntervaloModal = () => {
        setIsEditIntervaloModalOpened(false)
        setSelectedIntervalo(null)
    }

    const openDeleteIntervaloModal = (intervalo: intervalo) => {
        setIsDeleteIntervaloModalOpened(true)
        setSelectedIntervalo(intervalo)
    }

    const closeDeleteIntervaloModal = () => {
        setIsDeleteIntervaloModalOpened(false)
        setSelectedIntervalo(null)
    }

    return (
        <React.Fragment>
            <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: 2, width: '100%', pr: 2, ml: 3, pb: 2, mt: 2, mr: 2 }}>
                <FormSectionTitle style={{ textTransform: 'uppercase', paddingBottom: 0 }} sectionTitle='Desvio de Função' />
                <GridRadioGroup
                    xs={12}
                    sectionTitle='Indicar especificamente em que período houve intervalo de função (detalhar cada período, casa haja mais de um)'
                    options={[{ descricao: 'Todo o contrato de trabalho;', value: true }, { descricao: 'Definir intervalo de datas', value: false }]}
                    value={state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO] as boolean}
                    onChange={handleTodoContratoChange}
                    name={PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO}
                />
                <LabeledCustomBox
                    hideCondition={state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO] !== false}
                    label='intervalos de função'
                    onAdicionarButtonClick={openAddIntervaloModal}>
                    {
                        intervalos?.map(intervalo => (
                            <CustomBox
                                key={intervalo.id}
                                titulo={intervalo.cargo_que_ocupava as string}
                                subtitulo={intervalo.data_final && intervalo.data_inicial ? `de ${intervalo.data_inicial} a ${intervalo.data_final}` : ''}
                                onEditButtonClick={() => openEditIntervaloModal(intervalo)}
                                onDeleteButtonClick={() => openDeleteIntervaloModal(intervalo)}
                            />
                        ))
                    }
                </LabeledCustomBox>

                <Box sx={{ width: '100%', marginLeft: 2, display: 'flex', flexDirection: 'column', gap: 0 }}>
                    <FormSectionTitle sectionTitle='Fundamento para o pedido:' pl={0} />

                    <GridCheckbox
                        readableOptionSm
                        xs={12}
                        checked={state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.FUNDAMENTO]?.includes(FUNDAMENTOS.PISO_LEI) as boolean}
                        name={'fundamento'}
                        value={FUNDAMENTOS.PISO_LEI}
                        label={'Piso da função previsto em Lei;'}
                        onChange={handleFundamentoChange}
                    />
                    <GridCheckbox
                        readableOptionSm
                        xs={12}
                        checked={state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.FUNDAMENTO]?.includes(FUNDAMENTOS.PISO_PCS) as boolean}
                        name={'fundamento'}
                        value={FUNDAMENTOS.PISO_PCS}
                        label={'Piso da função previsto em Plano de Cargos e Salários;'}
                        onChange={handleFundamentoChange}
                    />
                    <GridCheckbox
                        readableOptionSm
                        xs={12}
                        checked={state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.FUNDAMENTO]?.includes(FUNDAMENTOS.PISO_CCT) as boolean}
                        name={'fundamento'}
                        value={FUNDAMENTOS.PISO_CCT}
                        label={'Comparação salários de outros empregados não identificáveis (obs: se for possível individualizar o empregado, sugerir usar o pedido de "equiparação salarial");'}
                        onChange={handleFundamentoChange}
                    />
                    <GridCheckbox
                        readableOptionSm
                        xs={12}
                        checked={state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.FUNDAMENTO]?.includes(FUNDAMENTOS.MEDIA_MERCADO) as boolean}
                        name={'fundamento'}
                        value={FUNDAMENTOS.MEDIA_MERCADO}
                        label={'Média de mercado;'}
                        onChange={handleFundamentoChange}
                    />
                    <GridCheckbox
                        readableOptionSm
                        xs={12}
                        checked={outrosFundamentosChecked}
                        name={'fundamento'}
                        value={FUNDAMENTOS.OUTROS}
                        label={'Outros'}
                        onChange={() => setOutrosFundamentosChecked(prev => !prev)}
                    />
                    <GridTextField
                        xs={12}
                        fullWidth
                        style={{ visibility: outrosFundamentosChecked ? 'visible' : 'hidden' }}
                        label='Defina aqui outros fundamentos'
                        defaultValue={state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.OUTROS_FUNDAMENTOS] as string}
                        name={state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.OUTROS_FUNDAMENTOS] as string}
                        variant={'standard'}
                        onBlur={handleOutroFundamentoChange}
                        containerStyle={{ paddingRight: 20 }}
                    />
                </Box>

                <GridCurrencyInput
                    xs={12}
                    ref={valorEstimadoPedidoRef}
                    onBlur={handleValorEstimadoPedidoChange}
                    name={PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO}
                    defaultValue={state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO] ?? 0}
                    label={'Qual o valor estimado pedido?'}
                    variant='standard'
                    sx={{ marginTop: 3, ml: 2 }}
                    error={error.valor_estimado}
                    helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                />
            </Grid>

            {
                isAddIntervaloModalOpened &&
                <AddDesviosModal
                    open={isAddIntervaloModalOpened}
                    onClose={closeAddIntervaloModal}
                    onAdicionarClick={handleAddDesvioChange}
                />
            }

            {
                isEditIntervaloModalOpened &&
                <EditDesviosModal
                    open={isEditIntervaloModalOpened}
                    onClose={closeEditIntervaloModal}
                    onEditarClick={handleEditDesvioChange}
                    intervalo={selectedIntervalo as intervalo}
                />
            }


            {
                isDeleteIntervaloModalOpened &&
                <DeleteDesvioModal
                    open={isDeleteIntervaloModalOpened}
                    onClose={closeDeleteIntervaloModal}
                    onDeleteClick={handleDeleteDesvioChange}
                    intervalo={selectedIntervalo as intervalo}
                />
            }
        </React.Fragment>
    )

    function handleTodoContratoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_TODO_CONTRATO',
            field: FormField.PEDIDO_DESVIO_FUNCAO,
            value: value == 'true'
        })
    }

    function handleAddDesvioChange(intervalo: intervalo) {

        setFormHasChanged(true)
        intervalo.id = crypto.randomUUID()

        dispatch({
            type: 'ADD_INTERVALO',
            field: FormField.PEDIDO_DESVIO_FUNCAO,
            value: intervalo
        })
    }

    function handleEditDesvioChange(id_intervalo: string, intervalo: intervalo) {
        setFormHasChanged(true)
        const intervalos = state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.INTERVALOS] || []
        const intervalo_index = intervalos.findIndex(p => p.id == id_intervalo)
        intervalos[intervalo_index] = intervalo

        dispatch({
            type: 'EDIT_INTERVALO',
            field: FormField.PEDIDO_DESVIO_FUNCAO,
            value: intervalos
        })
    }

    function handleDeleteDesvioChange(id_intervalo: string) {
        setFormHasChanged(true)
        const intervalos = state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.INTERVALOS] || []
        const novos_intervalos = intervalos.filter(p => p.id != id_intervalo)

        dispatch({
            type: 'DELETE_INTERVALO',
            field: FormField.PEDIDO_DESVIO_FUNCAO,
            value: novos_intervalos
        })
    }

    function handleFundamentoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string> | { target: { name: string, value: string } }
    ) {
        const { name, value } = e.target;
        setFormHasChanged(true)
        dispatch({
            type: 'SET_FUNDAMENTO',
            field: FormField.PEDIDO_DESVIO_FUNCAO,
            value: { checked: !state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.FUNDAMENTO]?.includes(value as fundamento), value: value as fundamento },
        });
    }

    function handleOutroFundamentoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string> | { target: { name: string, value: string } }
    ) {
        const { name, value } = e.target;
        setFormHasChanged(true)
        dispatch({
            type: 'SET_OUTRO_FUNDAMENTO',
            field: FormField.PEDIDO_DESVIO_FUNCAO,
            value,
        });
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.PEDIDO_DESVIO_FUNCAO,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
