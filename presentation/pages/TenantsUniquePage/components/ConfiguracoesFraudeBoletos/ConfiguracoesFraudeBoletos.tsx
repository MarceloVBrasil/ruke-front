import { Tenant } from '@/app/types/tenant'
import { formatarPercentualNumber, formatCurrency } from '@/app/utils/Formater'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid, TextField } from '@mui/material'
import React from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { zod_tenant_schema } from '../../helpers/Zod'

interface IConfiguracoesFraudeBoleto {
    errors: FieldErrors<zod_tenant_schema>
    tenantChoose: Tenant
    register: UseFormRegister<zod_tenant_schema>
    setTenantChoose: (value: Tenant) => void
    setValue: UseFormSetValue<zod_tenant_schema>
}

export default function ConfiguracoesFraudeBoletos(props: IConfiguracoesFraudeBoleto) {
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
                    CONFIGURAÇÕES GERAIS DOS PROCESSOS DE FRAUDE EM BOLETOS
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <GridTextField
                        xs={12} sm={6}
                        variant='outlined'
                        label={'Percentual de Êxito'}
                        type='number'
                        error={errors.percentual_exito_fraude_em_boletos ? true : false}
                        helperText={errors.percentual_exito_fraude_em_boletos?.message?.toString()}
                        fullWidth
                        placeholder="Digite o percentual êxito"
                        value={tenantChoose ? tenantChoose.percentual_exito_fraude_em_boletos : ""}
                        name='percentual_exito_fraude_em_boletos'
                        endAdornment='%'
                        onChange={(e) => {
                            const percentual_exito_fraude_em_boletos = formatarPercentualNumber(e.target.value)
                            setValue('percentual_exito_fraude_em_boletos', percentual_exito_fraude_em_boletos, { shouldValidate: true })
                            setTenantChoose({
                                ...tenantChoose,
                                percentual_exito_fraude_em_boletos,
                            });
                        }}

                    />

                    <GridCurrencyInput
                        xs={12} sm={6}
                        variant={'outlined'}
                        label='Parcela Fixa'
                        error={errors.parcela_fixa_fraude_em_boletos ? true : false}
                        placeholder="Digite os dados de parcela fixa"
                        defaultValue={tenantChoose ? tenantChoose.parcela_fixa_fraude_em_boletos : ""}
                        {...register("parcela_fixa_fraude_em_boletos")}
                    />
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}
