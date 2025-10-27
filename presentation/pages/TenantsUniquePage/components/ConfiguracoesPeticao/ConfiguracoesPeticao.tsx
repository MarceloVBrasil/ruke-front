import { Tenant } from '@/app/types/tenant';
import { onlyNumber, formatCnpj, formatCpfCnpj, formatCepInput } from '@/app/utils/Formater';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'
import { CADASTRAR_COM } from '../../TenantUniquePage';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { zod_tenant_schema } from '../../helpers/Zod';
import GridTextField from '@/presentation/components/GridTextField';
import GridSelectField from '@/presentation/components/GridSelectField';
import { estados_brasileiros } from '@/app/utils/EstadosBrasileiros';

interface IConfiguracoesPeticao {
    errors: FieldErrors<zod_tenant_schema>
    tenantChoose: Tenant
    cnpj: string
    cep: string
    cadastrarCom: CADASTRAR_COM.CNPJ | CADASTRAR_COM.CPF
    setCep: (v: string) => void
    setCnpj: (v: string) => void
    register: UseFormRegister<zod_tenant_schema>
    setTenantChoose: Dispatch<SetStateAction<Tenant>>
}

export default function ConfiguracoesPeticao(props: IConfiguracoesPeticao) {

    const {
        errors,
        tenantChoose,
        cnpj,
        cep,
        cadastrarCom,
        setCep,
        setCnpj,
        register,
        setTenantChoose,
    } = props

    return (
        <>
            <GridTextField
                xs={12}
                sm={cadastrarCom == CADASTRAR_COM.CNPJ ? 6 : 12}
                label='Nome'
                register={register}
                {...register('nome')}
                placeholder='Digite o nome da Empresa'
                value={tenantChoose ? tenantChoose.nome : ""}
                onChange={(e) => setTenantChoose((prev: Tenant) => { return { ...prev, nome: e.target.value } })}
                variant={'filled'}
                error={errors.nome ? true : false}
                helperText={errors.nome?.message?.toString() || ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                containerStyle={{ display: cadastrarCom === CADASTRAR_COM.CNPJ ? 'block' : 'none' }}
                label='CNPJ'
                register={register}
                {...register('cnpj')}
                placeholder='Digite o CNPJ'
                value={cnpj}
                onChange={(e) => {
                    const value = onlyNumber(e.target.value);
                    setTenantChoose(prev => { return { ...prev, cnpj: value } })
                    setCnpj(formatCnpj(value));
                }}
                variant={'filled'}
                error={errors.cnpj ? true : false}
                helperText={errors.cnpj?.message?.toString() || ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                containerStyle={{ display: cadastrarCom === CADASTRAR_COM.CPF ? 'block' : 'none' }}
                label='CPF'
                register={register}
                {...register('cpf')}
                placeholder='Digite o CPF'
                value={tenantChoose.cpf}
                onChange={(e) => {
                    const value = onlyNumber(e.target.value);
                    setTenantChoose({
                        ...tenantChoose,
                        cpf: formatCpfCnpj(value)
                    });
                }}
                variant={'filled'}
                error={errors.cpf ? true : false}
                helperText={errors.cpf?.message?.toString() || ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                containerStyle={{ display: cadastrarCom === CADASTRAR_COM.CNPJ ? 'block' : 'none' }}
                label='Razão Social'
                register={register}
                {...register('razao_social')}
                placeholder='Digite a Razão Social'
                value={`${tenantChoose.razao_social}`}
                onChange={(e) => setTenantChoose((prev: Tenant) => { return { ...prev, razao_social: e.target.value } })}
                variant={'filled'}
                error={errors.razao_social ? true : false}
                helperText={errors.razao_social?.message?.toString() || ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                label='CEP'
                register={register}
                {...register('cep')}
                placeholder='Digite o CEP'
                value={cep}
                onChange={(e) => setCep(formatCepInput(e.target.value))}
                variant={'filled'}
                error={errors.cep ? true : false}
                helperText={errors.cep?.message?.toString() || ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                label='Rua'
                register={register}
                {...register('rua')}
                placeholder='Digite a Rua'
                value={tenantChoose.rua}
                onChange={(e) =>
                    setTenantChoose({
                        ...tenantChoose,
                        rua: e.target.value,
                    })
                }
                variant={'filled'}
                error={errors.rua ? true : false}
                helperText={errors.rua?.message?.toString() || ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                label='Número'
                register={register}
                {...register('numero')}
                placeholder='Digite o número'
                defaultValue={tenantChoose ? tenantChoose.numero : ""}
                variant={'filled'}
                error={errors.numero ? true : false}
                helperText={errors.numero?.message?.toString() || ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                label='Complemento'
                register={register}
                {...register("complemento")}
                placeholder='Digite o complemento'
                value={tenantChoose.complemento}
                onChange={(e) => setTenantChoose(prev => { return { ...prev, complemento: e.target.value } })}
                variant={'filled'}
                error={errors.complemento ? true : false}
                helperText={errors.complemento?.message?.toString() || ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                label='Bairro'
                register={register}
                id='bairro'
                placeholder='Digite o Bairro'
                value={tenantChoose.bairro}
                {...register("bairro")}
                onChange={(e) =>
                    setTenantChoose({
                        ...tenantChoose,
                        bairro: e.target.value,
                    })
                }
                variant={'filled'}
                error={errors.bairro ? true : false}
                helperText={errors.bairro?.message?.toString() || ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                label='Cidade'
                register={register}
                placeholder='Digite a Cidade'
                value={tenantChoose.cidade}
                {...register("cidade")}
                onChange={(e) =>
                    setTenantChoose({
                        ...tenantChoose,
                        cidade: e.target.value,
                    })
                }
                variant={'filled'}
                error={errors.cidade ? true : false}
                helperText={errors.cidade?.message?.toString() || ' '}
            />

            <GridSelectField
                xs={12}
                sm={6}
                label='Estado'
                placeholder='Estado'
                error={errors.estado ? true : false}
                helperText={errors.estado?.message?.toString() || ' '}
                fullWidth
                name='estado'
                value={tenantChoose?.estado ? tenantChoose?.estado : ""}
                onChange={(e) => setTenantChoose({ ...tenantChoose, estado: e.target.value })}
                variant="filled"
                options={estados_brasileiros}
            />

            <GridTextField
                xs={12}
                sm={6}
                multiline
                label='Dados da Procuração'
                register={register}
                placeholder="Digite a procuração"
                defaultValue={tenantChoose ? tenantChoose.dados_ourtorgado_procuracao_rmc : ""}
                {...register("dados_ourtorgado_procuracao_rmc")}
                variant={'filled'}
                error={errors.dados_ourtorgado_procuracao_rmc ? true : false}
                helperText={errors.dados_ourtorgado_procuracao_rmc?.message?.toString() || ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                multiline
                label='Contrato de Honorários'
                register={register}
                placeholder="Digite os dados do Contrato de Honorários"
                defaultValue={tenantChoose ? tenantChoose.dados_contratado_contrato_honorarios_rmc : ""}
                {...register("dados_contratado_contrato_honorarios_rmc")}
                variant={'filled'}
                error={errors.dados_contratado_contrato_honorarios_rmc ? true : false}
                helperText={errors.dados_contratado_contrato_honorarios_rmc?.message?.toString() || ' '}
            />
        </>
    )
}
