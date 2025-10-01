import { Tenant } from '@/app/types/tenant'
import { formatarPercentualNumber, formatCurrency } from '@/app/utils/Formater'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid, TextField, InputAdornment } from '@mui/material'
import React from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { zod_tenant_schema } from '../../helpers/Zod'

interface IConfiguracoesBPC {
    errors: FieldErrors<zod_tenant_schema>
    tenantChoose: Tenant
    register: UseFormRegister<zod_tenant_schema>
    setTenantChoose: (value: Tenant) => void
    setValue: UseFormSetValue<zod_tenant_schema>
}

export default function ConfiguracoesBPC(props: IConfiguracoesBPC) {
    const {
        errors,
        tenantChoose,
        register,
        setTenantChoose,
        setValue
    } = props

    return (
        <Accordion sx={{ width: "100%", margin: "25px", padding: "10px" }}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography
                    sx={{
                        color: "#00479d",
                        fontWeight: "bold",
                        marginLeft: "10px",
                    }}
                >
                    CONFIGURAÇÕES GERAIS DOS PROCESSOS BPC
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <GridTextField
                        xs={12} sm={6}
                        variant='outlined'
                        label='Percentual de Êxito'
                        type='number'
                        placeholder='Digite o percentual de êxito bpc'
                        value={tenantChoose ? tenantChoose.percentual_exito_bpc : ""}
                        error={errors.percentual_exito_bpc ? true : false}
                        helperText={errors.percentual_exito_bpc?.message?.toString()}
                        fullWidth
                        name='percentual_exito_bpc'
                        endAdornment='%'
                        onChange={(e) => {
                            const percentual_exito_bpc = formatarPercentualNumber(e.target.value)
                            setValue('percentual_exito_bpc', percentual_exito_bpc, { shouldValidate: true })
                            setTenantChoose({
                                ...tenantChoose,
                                percentual_exito_bpc
                            })
                        }}
                    />

                    <GridCurrencyInput
                        xs={12} sm={6}
                        label={`Parcela Fixa`}
                        placeholder='Digite a parcela fixa BPC'
                        defaultValue={tenantChoose ? formatCurrency(tenantChoose.parcela_fixa_bpc || '') : 0}
                        {...register("parcela_fixa_bpc")}
                        error={errors.parcela_fixa_bpc ? true : false}
                        helperText={errors.parcela_fixa_bpc?.message?.toString()}
                    />
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}
