import React, { ChangeEvent, Dispatch, useEffect } from 'react'
import { funcao } from './modais/funcoes/FuncaoFormAndFields';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import CustomBox from '@/presentation/components/CustomBox';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import LabeledCustomBox from '@/presentation/components/LabeledCustomBox';
import { Grid, SelectChangeEvent } from '@mui/material';
import { Action, ErrorStep10, FormField, FormState } from '../../helper/FormTypesAndFields';
import AddFuncaoModal from './modais/funcoes/AddFuncaoModal';
import DeleteFuncaoModal from './modais/funcoes/DeleteFuncaoModal';
import EditFuncaoModal from './modais/funcoes/EditFuncaoModal';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import { ActCctError, PEDIDO_ACT_CCT } from '../../helper/CCTACT/types';

interface ICCTACT {
    valorEstimadoPedidoRef: React.RefObject<HTMLDivElement>
    selectedFuncao: funcao | null
    setSelectedFuncao: (funcao: funcao | null) => void
    setIsAddFuncaoModalOpened: (value: boolean) => void
    setIsEditFuncaoModalOpened: (value: boolean) => void
    setIsDeleteFuncaoModalOpened: (value: boolean) => void
    isAddFuncaoModalOpened: boolean
    isEditFuncaoModalOpened: boolean
    isDeleteFuncaoModalOpened: boolean

    setFormHasChanged: (value: boolean) => void
    state: FormState
    dispatch: Dispatch<Action>

    error: ActCctError
}

export default function CCTACT(props: ICCTACT) {

    const {
        selectedFuncao,
        valorEstimadoPedidoRef,
        setIsAddFuncaoModalOpened,
        setIsEditFuncaoModalOpened,
        setIsDeleteFuncaoModalOpened,
        setSelectedFuncao,
        setFormHasChanged,
        state,
        dispatch,
        isAddFuncaoModalOpened,
        isEditFuncaoModalOpened,
        isDeleteFuncaoModalOpened,
        error

    } = props

    const openAddFuncaoModal = () => {
        setIsAddFuncaoModalOpened(true)
    }

    const closeAddFuncaoModal = () => {
        setIsAddFuncaoModalOpened(false)
    }

    const openEditFuncaoModal = (funcao: funcao) => {
        setIsEditFuncaoModalOpened(true)
        setSelectedFuncao(funcao)
    }

    const closeEditFuncaoModal = () => {
        setIsEditFuncaoModalOpened(false)
        setSelectedFuncao(null)
    }

    const openDeleteFuncaoModal = (funcao: funcao) => {
        setIsDeleteFuncaoModalOpened(true)
        setSelectedFuncao(funcao)
    }

    const closeDeleteFuncaoModal = () => {
        setIsDeleteFuncaoModalOpened(false)
        setSelectedFuncao(null)
    }

    return (
        <React.Fragment>
            <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: 2, width: '100%', pr: 3.5, ml: 3, pb: 2, mt: 2, mr: 2 }}>
                <FormSectionTitle style={{ textTransform: 'uppercase', paddingBottom: 0 }} sectionTitle='CCT ACT' />
                <FormSectionTitle sectionTitle='Indicar especificamente cada função que deveria ser melhor remunerada, com base em CCT ou ACT' />
                <LabeledCustomBox
                    label='Funções'
                    onAdicionarButtonClick={openAddFuncaoModal}>
                    {
                        state[FormField.PEDIDO_ACT_CCT].value?.[PEDIDO_ACT_CCT.CARGOS]?.map(cargo => (
                            <CustomBox
                                key={cargo.id}
                                titulo={cargo.cargo}
                                subtitulo={Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(cargo.salario_devido)}
                                onEditButtonClick={() => openEditFuncaoModal(cargo)}
                                onDeleteButtonClick={() => openDeleteFuncaoModal(cargo)}
                            />
                        ))
                    }
                </LabeledCustomBox>

                <GridCurrencyInput
                    defaultValue={state[FormField.PEDIDO_ACT_CCT].value?.[PEDIDO_ACT_CCT.VALOR_ESTIMADO_PEDIDO] || 0}
                    ref={valorEstimadoPedidoRef}
                    sx={{ marginTop: 4, ml: 1, width: '100%' }}
                    label='Qual o valor estimado do pedido? (CCT/ACT)'
                    onBlur={handleActCctValorEstimadoPedidoChange}
                    name={PEDIDO_ACT_CCT.VALOR_ESTIMADO_PEDIDO}
                    variant={'filled'}
                    xs={12}
                    error={error.valor_estimado}
                    helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                    className='cct_act'
                />

            </Grid>

            {
                isAddFuncaoModalOpened &&
                <AddFuncaoModal
                    open={isAddFuncaoModalOpened}
                    onClose={closeAddFuncaoModal}
                    onAdicionarClick={handleAdiocionarFuncao}
                />
            }

            {
                isEditFuncaoModalOpened &&
                <EditFuncaoModal
                    open={isEditFuncaoModalOpened}
                    onClose={closeEditFuncaoModal}
                    onEditarClick={handleEditFuncao}
                    funcao={selectedFuncao as funcao}
                />
            }

            {
                isDeleteFuncaoModalOpened &&
                <DeleteFuncaoModal
                    open={isDeleteFuncaoModalOpened}
                    onClose={closeDeleteFuncaoModal}
                    onDeleteClick={handleDeleteFuncao}
                    funcao={selectedFuncao as funcao} />
            }
        </React.Fragment>
    )

    function handleActCctValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.PEDIDO_ACT_CCT,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, PEDIDO_ACT_CCT.VALOR_ESTIMADO_PEDIDO)
        })
    }

    function handleAdiocionarFuncao(funcao: funcao) {
        setFormHasChanged(true)
        funcao.id = crypto.randomUUID()

        dispatch({
            type: 'ADD_FUNCAO',
            field: FormField.PEDIDO_ACT_CCT,
            value: funcao
        })
    }

    function handleEditFuncao(id_funcao: string, funcao: funcao) {
        setFormHasChanged(true)
        const funcoes = state[FormField.PEDIDO_ACT_CCT].value?.[PEDIDO_ACT_CCT.CARGOS] || []
        const funcao_index = funcoes.findIndex(p => p.id == id_funcao)
        funcoes[funcao_index] = funcao

        dispatch({
            type: 'EDIT_FUNCAO',
            field: FormField.PEDIDO_ACT_CCT,
            value: funcoes
        })
    }

    function handleDeleteFuncao(id_funcao: string) {
        setFormHasChanged(true)

        const funcoes = state[FormField.PEDIDO_ACT_CCT].value?.[PEDIDO_ACT_CCT.CARGOS] || []
        const novas_funcoes = funcoes.filter(f => f.id != id_funcao)

        dispatch({
            type: 'DELETE_FUNCAO',
            field: FormField.PEDIDO_ACT_CCT,
            value: novas_funcoes
        })
    }
}
