import React, { Dispatch, useRef } from 'react'
import { ACIDENTE_TRABALHO, acidente_trabalho, AcidenteTrabalhoActions, AcidenteTrabalhoError } from '../../helper/AcidenteTrabalho/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridTextField from '@/presentation/components/GridTextField'

interface IAcidenteTrabalho {
  acidente_trabalho: acidente_trabalho | undefined | null,
  setFormHasChanged: (value: boolean) => void
  dispatch: Dispatch<AcidenteTrabalhoActions>
  error: AcidenteTrabalhoError
}

export default function AcidenteTrabalho(props: IAcidenteTrabalho) {
  const { acidente_trabalho, setFormHasChanged, dispatch, error } = props
  const valorEstimadoRef = useRef<HTMLDivElement>(null)

  return (
    <Grid rowSpacing={2} container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

      <FormSectionTitle sectionTitle='Sobre o Acidente de Trabalho' style={{ textTransform: 'uppercase', color: '#00479d' }} />

      <GridTextField
        xs={12}
        fullWidth
        name={ACIDENTE_TRABALHO.DATA_ACIDENTE}
        defaultValue={acidente_trabalho?.[ACIDENTE_TRABALHO.DATA_ACIDENTE] as string}
        onBlur={handleDataAcidenteChange}
        label='Qual foi a data do acidente?'
        variant='outlined'
        type='date'
        error={error.data_acidente}
        helperText={error.data_acidente ? 'Campo obrigatório' : ' '}
        className='danos_morais'
        fixLabel

      />

      <GridTextField
        xs={12}
        fullWidth
        name={ACIDENTE_TRABALHO.DESCRICAO_ACIDENTE}
        defaultValue={acidente_trabalho?.[ACIDENTE_TRABALHO.DESCRICAO_ACIDENTE] as string}
        onBlur={handleAcidenteDescricao}
        label='Descreva o acidente'
        variant='outlined'
        error={error.descricao_acidente}
        helperText={error.descricao_acidente ? 'Campo obrigatório' : ' '}
        className='danos_morais'
        fixLabel
      />

      <GridCurrencyInput
        xs={12}
        ref={valorEstimadoRef}
        onBlur={handleValorEstimadoChange}
        name={ACIDENTE_TRABALHO.VALOR_ESTIMADO}
        defaultValue={acidente_trabalho?.[ACIDENTE_TRABALHO.VALOR_ESTIMADO] ?? 0}
        label='Qual foi o valor solicitado a título de indenização por danos morais'
        error={error.valor_estimado}
        helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
        className='danos_morais'
        fixLabel
      />

    </Grid>
  )

  function handleDataAcidenteChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
    const { value } = e.target
    setFormHasChanged(true)

    dispatch({
      type: 'SET_DATA_ACIDENTE',
      field: PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO,
      value
    })
  }

  function handleAcidenteDescricao(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
    const { value } = e.target
    setFormHasChanged(true)

    dispatch({
      type: 'SET_DESCRICAO_ACIDENTE',
      field: PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO,
      value
    })
  }

  function handleValorEstimadoChange() {
    setFormHasChanged(true)

    dispatch({
      type: 'SET_VALOR_ESTIMADO',
      field: PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO,
      value: getGridCurrencyInputValue(valorEstimadoRef, ACIDENTE_TRABALHO.VALOR_ESTIMADO)
    })
  }
}
