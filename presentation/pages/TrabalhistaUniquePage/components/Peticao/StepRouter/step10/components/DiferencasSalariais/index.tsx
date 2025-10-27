import CustomBox from '@/presentation/components/CustomBox'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import LabeledCustomBox from '@/presentation/components/LabeledCustomBox'
import { Grid, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent, Dispatch, useEffect, useRef } from 'react'
import { Action, FormField, FormState } from '../../helper/FormTypesAndFields'
import { paradigma } from './modais/paradigmas/ParadigmasFormAndFields';
import { AddParadigmaModal } from './modais/paradigmas/Add/AddParadigmaModal'
import DeleteParadigmaModal from './modais/paradigmas/Delete/DeleteParadigmaModal'
import { EditParadigmaModal } from './modais/paradigmas/Edit/EditParadigmaModal'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { DiferencasSalariaisError, PEDIDO_DIFERENCA_SALARIAL } from '../../helper/DiferencasSalariais/types'
import "../../../../../../../../styles/DiferencasSalariais.css"

interface IDiferencasSalariais {
    paradigmas: paradigma[]
    setIsAddParadigmaModalOpened: (value: boolean) => void
    setIsEditParadigmaModalOpened: (value: boolean) => void
    setSelectedParadigma: (paradigma: paradigma | null) => void
    setIsDeleteParadigmaModalOpened: (value: boolean) => void
    isAddParadigmaModalOpened: boolean
    isEditParadigmaModalOpened: boolean
    isDeleteParadigmaModalOpened: boolean
    selectedParadigma: paradigma | null

    setFormHasChanged: (value: boolean) => void
    state: FormState
    dispatch: Dispatch<Action>

    error: DiferencasSalariaisError

}

export default function DiferencasSalariais(props: IDiferencasSalariais) {
    const {
        paradigmas,
        setIsAddParadigmaModalOpened,
        setIsEditParadigmaModalOpened,
        setSelectedParadigma,
        setIsDeleteParadigmaModalOpened,
        isAddParadigmaModalOpened,
        isEditParadigmaModalOpened,
        isDeleteParadigmaModalOpened,
        selectedParadigma,
        setFormHasChanged,
        state,
        dispatch,
        error
    } = props

    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    const openAddParadigmaModal = () => {
        setIsAddParadigmaModalOpened(true)
    }

    const closeAddParadigmaModal = () => {
        setIsAddParadigmaModalOpened(false)
    }

    const openEditParadigmaModal = (paradigma: paradigma) => {
        setIsEditParadigmaModalOpened(true)
        setSelectedParadigma(paradigma)
    }

    const closeEditParadigmaModal = () => {
        setIsEditParadigmaModalOpened(false)
        setSelectedParadigma(null)
    }

    const openDeleteParadigmaModal = (paradigma: paradigma) => {
        setIsDeleteParadigmaModalOpened(true)
        setSelectedParadigma(paradigma)
    }

    const closeDeleteParadigmaModal = () => {
        setIsDeleteParadigmaModalOpened(false)
        setSelectedParadigma(null)
    }


    return (
        <React.Fragment>
            <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: 2, width: '100%', pr: 3.5, ml: 3, pb: 2, mt: 2, mr: 2 }}>
                <FormSectionTitle style={{ textTransform: 'uppercase', paddingBottom: 0 }} sectionTitle='Equiparação Salarial' />
                <GridCurrencyInput
                    xs={12}
                    ref={valorEstimadoPedidoRef}
                    onBlur={handleValorEstimadoPedidoChange}
                    name={PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO}
                    defaultValue={state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value?.[PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO] ?? 0}
                    label={'Qual o valor estimado pedido?'}
                    sx={{ marginTop: 3, ml: 1, width: '100%' }}
                    error={error.valor_estimado}
                    helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                    className='equiparacao_salarial'
                    variant='filled'
                />
                <LabeledCustomBox
                    label='paradigmas'
                    onAdicionarButtonClick={openAddParadigmaModal}
                    error={error.paradigmas}
                    helperText={error.paradigmas ? 'Adicoine pelo menos 1 paradigma' : ' '}
                >
                    {
                        paradigmas?.map(paradigma => (
                            <CustomBox
                                key={paradigma.id}
                                titulo={paradigma.nome}
                                subtitulo={paradigma.atividades}
                                onEditButtonClick={() => openEditParadigmaModal(paradigma)}
                                onDeleteButtonClick={() => openDeleteParadigmaModal(paradigma)}
                            />
                        ))
                    }
                </LabeledCustomBox>
            </Grid>

            {
                isAddParadigmaModalOpened &&
                <AddParadigmaModal
                    open={isAddParadigmaModalOpened}
                    onClose={closeAddParadigmaModal}
                    onAdicionarClick={handleAddParadimaChange}
                    primeiroCadastro={state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value ? state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS]?.length == 0 : true}
                    paradigmas={paradigmas || []}
                />
            }

            {
                isEditParadigmaModalOpened &&
                <EditParadigmaModal
                    open={isEditParadigmaModalOpened}
                    onClose={closeEditParadigmaModal}
                    onEditarClick={handleEditParadigmaChange}
                    paradigma={selectedParadigma as paradigma}
                    primeiroCadastro={state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value ? state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS]?.length == 1 : false}
                    paradigmas={paradigmas || []}
                />
            }

            {
                isDeleteParadigmaModalOpened &&
                <DeleteParadigmaModal
                    open={isDeleteParadigmaModalOpened}
                    onClose={closeDeleteParadigmaModal}
                    onDeleteClick={handleDeleteParadigmaChange}
                    paradigma={selectedParadigma as paradigma}
                />
            }
        </React.Fragment>
    )

    function handleAddParadimaChange(paradigma: paradigma) {
        setFormHasChanged(true)
        paradigma.id = crypto.randomUUID()

        dispatch({
            type: 'ADD_PARADIGMA',
            field: FormField.PEDIDO_DIFERENCAS_SALARIAIS,
            value: paradigma
        })
    }

    function handleEditParadigmaChange(id_paradigma: string, paradigma: paradigma) {
        setFormHasChanged(true)
        const _paradigmas = paradigmas || []
        const paradigma_index = _paradigmas.findIndex(p => p.id == id_paradigma)
        _paradigmas[paradigma_index] = paradigma

        dispatch({
            type: 'EDIT_PARADIGMA',
            field: FormField.PEDIDO_DIFERENCAS_SALARIAIS,
            value: paradigmas
        })
    }

    function handleDeleteParadigmaChange(id_paradigma: string) {
        setFormHasChanged(true)
        const _paradigmas = paradigmas || []
        const novos_paradigmas = _paradigmas.filter(p => p.id != id_paradigma)

        dispatch({
            type: 'DELETE_PARADIGMA',
            field: FormField.PEDIDO_DIFERENCAS_SALARIAIS,
            value: novos_paradigmas
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.PEDIDO_DIFERENCAS_SALARIAIS,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
