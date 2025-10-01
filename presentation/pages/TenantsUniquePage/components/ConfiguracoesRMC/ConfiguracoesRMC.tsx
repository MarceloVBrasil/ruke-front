import { Tenant } from '@/app/types/tenant';
import { formatarPercentualNumber, formatCurrency } from '@/app/utils/Formater';
import { indicesCorrecaoMonetaria } from '@/domain/data/indicesCorrecaoMonetaria';
import { converterMoneyToString } from '@/infra/utils/convert';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import GridTextField from '@/presentation/components/GridTextField';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid, TextField, MenuItem } from '@mui/material';
import React from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { zod_tenant_schema } from '../../helpers/Zod';

interface IConfiguracoesRMC {
    errors: FieldErrors<zod_tenant_schema>
    tenantChoose: Tenant
    register: UseFormRegister<zod_tenant_schema>
    setValue: UseFormSetValue<zod_tenant_schema>
    setTenantChoose: (value: Tenant) => void
    reset: (value: any) => any
}

export default function ConfiguracoesRMC(props: IConfiguracoesRMC) {

    const {
        errors,
        tenantChoose,
        register,
        setValue,
        setTenantChoose,
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
                    CONFIGURAÇÕES GERAIS DOS PROCESSOS RMC
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>

                    <GridCurrencyInput
                        xs={12} sm={6}
                        label={`Valor Danos Morais`}
                        placeholder='Digite o valor de Danos Morais'
                        defaultValue={tenantChoose ? tenantChoose.danos_morais_rmc : '2000'}
                        {...register('danos_morais_rmc')}
                        error={errors.danos_morais_rmc ? true : false}
                        helperText={errors.danos_morais_rmc?.message?.toString()}
                        name='danos_morais_rmc'
                        onBlur={(e: any) => {
                            const money_string = converterMoneyToString(e.target.value)

                            setValue('danos_morais_rmc',
                                Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(Number(money_string))
                                , { shouldValidate: true })

                            setTenantChoose({
                                ...tenantChoose,
                                danos_morais_rmc: Number(Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(Number(money_string)))
                            })
                        }}
                    />

                    <GridTextField
                        xs={12}
                        sm={6}
                        zodRegister={register('percentual_exito_rmc')}
                        variant="outlined"
                        label="Percentual de Êxito"
                        error={!!errors.percentual_exito_rmc}
                        helperText={errors.percentual_exito_rmc?.message?.toString()}
                        placeholder="Digite o Percentual de Êxito"
                        fullWidth
                        type="number"
                        defaultValue={tenantChoose ? tenantChoose.percentual_exito_rmc : 35}
                        name="percentual_exito_rmc"
                        endAdornment="%"
                    />


                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Índice de Correção Monetária
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            error={errors.indice_correcao_monetaria_rmc ? true : false}
                            helperText={errors.parcela_fixa_rmc?.message?.toString()}
                            {...register("indice_correcao_monetaria_rmc")}
                            value={
                                tenantChoose
                                    ? tenantChoose.indice_correcao_monetaria_rmc
                                    : "correção com IPCA"
                            }
                            onChange={(e) => {
                                setTenantChoose({
                                    ...tenantChoose,
                                    indice_correcao_monetaria_rmc: e.target.value,
                                });
                            }}
                        >
                            {indicesCorrecaoMonetaria.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <GridTextField
                        xs={12} sm={6}
                        type='number'
                        variant={'outlined'}
                        label='Juros de Mora'
                        error={errors.juros_de_mora_calculo_rmc ? true : false}
                        helperText={errors.juros_de_mora_calculo_rmc?.message?.toString()}
                        placeholder="Digite os Juros de Mora"
                        fullWidth
                        value={tenantChoose ? tenantChoose.juros_de_mora_calculo_rmc : 1}
                        name='juros_de_mora_calculo_rmc'
                        onChange={(e) => {
                            const juros_de_mora_calculo_rmc = formatarPercentualNumber(e.target.value)
                            setValue('juros_de_mora_calculo_rmc', juros_de_mora_calculo_rmc, { shouldValidate: true })
                            setTenantChoose({
                                ...tenantChoose,
                                juros_de_mora_calculo_rmc
                            });
                        }}
                        endAdornment='%'
                    />

                    <GridCurrencyInput
                        xs={12}
                        label={`Parcela Fixa`}
                        placeholder='Digite a parcela fixa rmc'
                        defaultValue={tenantChoose ? formatCurrency(tenantChoose.parcela_fixa_rmc || '') : 0}
                        {...register("parcela_fixa_rmc")}
                        error={errors.parcela_fixa_rmc ? true : false}
                        helperText={errors.parcela_fixa_rmc?.message?.toString()}
                    />
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}
