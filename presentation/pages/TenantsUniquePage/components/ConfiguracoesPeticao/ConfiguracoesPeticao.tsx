import { Tenant } from '@/app/types/tenant';
import { onlyNumber, formatCnpj, formatCpfCnpj, formatCepInput } from '@/app/utils/Formater';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'
import { CADASTRAR_COM } from '../../TenantUniquePage';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { zod_tenant_schema } from '../../helpers/Zod';

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
            <Grid style={{ borderRadius: "30px" }} item xs={12} sm={cadastrarCom == CADASTRAR_COM.CNPJ ? 6 : 12}>
                <Typography
                    sx={{ color: "#00479d", fontWeight: "bold", marginLeft: "10px" }}
                >
                    Nome
                </Typography>
                <TextField
                    type="text"
                    autoComplete="Nome da empresa"
                    error={errors.nome ? true : false}
                    helperText={errors.nome?.message?.toString() || ' '}
                    {...register("nome")}
                    required
                    placeholder="Digite o nome da Empresa"
                    fullWidth
                    id="nome"
                    value={tenantChoose ? tenantChoose.nome : ""}
                    onChange={(e) => setTenantChoose((prev: Tenant) => { return { ...prev, nome: e.target.value } })}
                    InputLabelProps={{ shrink: true }}
                    style={{ borderRadius: 40 }}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: cadastrarCom === CADASTRAR_COM.CNPJ ? 'block' : 'none' }}>
                <Typography
                    sx={{ color: "#00479d", fontWeight: "bold", marginLeft: "10px" }}
                >
                    CNPJ
                </Typography>
                <TextField
                    autoComplete="CNPJ"
                    error={errors.cnpj ? true : false}
                    helperText={errors.cnpj?.message?.toString() || ' '}
                    {...register("cnpj")}
                    required
                    fullWidth
                    placeholder="Digite o CNPJ"
                    value={cnpj}
                    onChange={(e) => {
                        const value = onlyNumber(e.target.value);
                        setTenantChoose(prev => { return { ...prev, cnpj: value } })
                        setCnpj(formatCnpj(value));
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: cadastrarCom === CADASTRAR_COM.CPF ? 'block' : 'none' }}>
                <Typography
                    sx={{ color: "#00479d", fontWeight: "bold", marginLeft: "10px" }}
                >
                    CPF
                </Typography>
                <TextField
                    autoComplete="CPF"
                    error={errors.cpf ? true : false}
                    helperText={errors.cpf?.message?.toString() || ' '}
                    {...register("cpf")}
                    name='cpf'
                    required
                    fullWidth
                    placeholder="Digite o CPF"
                    defaultValue={tenantChoose ? tenantChoose.cpf : ""}
                    value={tenantChoose.cpf}
                    onChange={(e) => {
                        const value = onlyNumber(e.target.value);
                        setTenantChoose({
                            ...tenantChoose,
                            cpf: formatCpfCnpj(value)
                        });
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: cadastrarCom === CADASTRAR_COM.CNPJ ? 'block' : 'none' }}>
                <Typography
                    sx={{ color: "#00479d", fontWeight: "bold", marginLeft: "10px" }}
                >
                    Razão Social
                </Typography>
                <TextField
                    disabled={cadastrarCom === CADASTRAR_COM.CPF}
                    autoComplete="Razão Social"
                    error={errors.razao_social ? true : false}
                    helperText={errors.razao_social?.message?.toString() || ' '}
                    fullWidth
                    value={`${tenantChoose.razao_social}`}
                    placeholder="Digite a Razão Social"
                    {...register("razao_social")}
                    onChange={(e) => {
                        const cnpj = formatCnpj(e.target.value)
                        setCnpj(cnpj)
                        setTenantChoose((prev) => { return { ...prev, cnpj } })
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography
                    sx={{ color: "#00479d", fontWeight: "bold", marginLeft: "10px" }}
                >
                    CEP
                </Typography>
                <TextField
                    autoComplete="CEP"
                    error={errors.cep ? true : false}
                    helperText={errors.cep?.message?.toString() || ' '}
                    {...register("cep")}
                    required
                    fullWidth
                    value={cep}
                    placeholder="Digite o CEP"
                    defaultValue={cep}
                    onChange={(e) => setCep(formatCepInput(e.target.value))}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography
                    sx={{ color: "#00479d", fontWeight: "bold", marginLeft: "10px" }}
                >
                    Rua
                </Typography>
                <TextField
                    autoComplete="Rua"
                    error={errors.rua ? true : false}
                    helperText={errors.rua?.message?.toString() || ' '}
                    fullWidth
                    placeholder="Digite a Rua"
                    {...register("rua")}
                    value={tenantChoose.rua}
                    onChange={(e) =>
                        setTenantChoose({
                            ...tenantChoose,
                            rua: e.target.value,
                        })
                    }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography
                    sx={{ color: "#00479d", fontWeight: "bold", marginLeft: "10px" }}
                >
                    Número
                </Typography>
                <TextField
                    autoComplete="Número"
                    error={errors.numero ? true : false}
                    helperText={errors.numero?.message?.toString() || ' '}
                    placeholder="Digite o número"
                    fullWidth
                    defaultValue={tenantChoose ? tenantChoose.numero : ""}
                    {...register("numero")}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography
                    sx={{ color: "#00479d", fontWeight: "bold", marginLeft: "10px" }}
                >
                    Complemento
                </Typography>
                <TextField
                    autoComplete="Complemento"
                    error={errors.complemento ? true : false}
                    helperText={errors.complemento?.message?.toString() || ' '}
                    fullWidth
                    {...register("complemento")}
                    value={tenantChoose.complemento}
                    onChange={(e) => setTenantChoose(prev => { return { ...prev, complemento: e.target.value } })}
                    placeholder="Digite o Complemento"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography
                    sx={{ color: "#00479d", fontWeight: "bold", marginLeft: "10px" }}
                >
                    Bairro
                </Typography>
                <TextField
                    autoComplete="Bairro"
                    error={errors.bairro ? true : false}
                    helperText={errors.bairro?.message?.toString() || ' '}
                    fullWidth
                    placeholder="Digite o bairro"
                    defaultValue={tenantChoose.bairro || ""}
                    {...register("bairro")}
                    value={tenantChoose.bairro}
                    onChange={(e) =>
                        setTenantChoose({
                            ...tenantChoose,
                            bairro: e.target.value,
                        })
                    }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography
                    sx={{ color: "#00479d", fontWeight: "bold", marginLeft: "10px" }}
                >
                    Cidade
                </Typography>
                <TextField
                    autoComplete="Cidade"
                    error={errors.cidade ? true : false}
                    helperText={errors.cidade?.message?.toString() || ' '}
                    fullWidth
                    placeholder="Digite a Cidade"
                    defaultValue={tenantChoose.cidade || ""}
                    {...register("cidade")}
                    value={tenantChoose.cidade}
                    onChange={(e) =>
                        setTenantChoose({
                            ...tenantChoose,
                            cidade: e.target.value,
                        })
                    }
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl
                    fullWidth
                    variant="filled"
                    error={errors.estado ? true : false}
                >
                    <Typography
                        sx={{
                            color: "#00479d",
                            fontWeight: "bold",
                            marginLeft: "10px",
                        }}
                    >
                        Estado
                    </Typography>
                    <Select
                        variant="outlined"
                        sx={{ borderRadius: "10px", width: '100%' }}
                        id="estado"
                        error={errors.estado ? true : false}
                        value={tenantChoose?.estado ? tenantChoose?.estado : ""}
                        {...register("estado")}
                        onChange={(e) => {
                            setTenantChoose({ ...tenantChoose, estado: e.target.value });
                        }}
                    >
                        <MenuItem selected value="" disabled>
                            Estado
                        </MenuItem>
                        <MenuItem value="AC">AC</MenuItem>
                        <MenuItem value="AL">AL</MenuItem>
                        <MenuItem value="AP">AP</MenuItem>
                        <MenuItem value="AM">AM</MenuItem>
                        <MenuItem value="BA">BA</MenuItem>
                        <MenuItem value="CE">CE</MenuItem>
                        <MenuItem value="DF">DF</MenuItem>
                        <MenuItem value="ES">ES</MenuItem>
                        <MenuItem value="GO">GO</MenuItem>
                        <MenuItem value="MA">MA</MenuItem>
                        <MenuItem value="MT">MT</MenuItem>
                        <MenuItem value="MS">MS</MenuItem>
                        <MenuItem value="MG">MG</MenuItem>
                        <MenuItem value="PA">PA</MenuItem>
                        <MenuItem value="PB">PB</MenuItem>
                        <MenuItem value="PR">PR</MenuItem>
                        <MenuItem value="PE">PE</MenuItem>
                        <MenuItem value="PI">PI</MenuItem>
                        <MenuItem value="RJ">RJ</MenuItem>
                        <MenuItem value="RN">RN</MenuItem>
                        <MenuItem value="RS">RS</MenuItem>
                        <MenuItem value="RO">RO</MenuItem>
                        <MenuItem value="RR">RR</MenuItem>
                        <MenuItem value="SC">SC</MenuItem>
                        <MenuItem value="SP">SP</MenuItem>
                        <MenuItem value="SE">SE</MenuItem>
                        <MenuItem value="TO">TO</MenuItem>
                    </Select>
                    {errors.estado ? (
                        <FormHelperText>
                            {errors.estado?.message?.toString() || ' '}
                        </FormHelperText>
                    ) : null}
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Typography
                    sx={{
                        color: "#00479d",
                        fontWeight: "bold",
                        marginLeft: "10px",
                        marginBottom: "10px",
                    }}
                >
                    Dados da Procuração
                </Typography>
                <TextField
                    multiline
                    rows={4}
                    autoComplete="Procuração"
                    error={errors.dados_ourtorgado_procuracao_rmc ? true : false}
                    helperText={errors.dados_ourtorgado_procuracao_rmc?.message?.toString() || ' '}
                    {...register("dados_ourtorgado_procuracao_rmc")}
                    fullWidth
                    placeholder="Digite a procuração"
                    defaultValue={
                        tenantChoose ? tenantChoose.dados_ourtorgado_procuracao_rmc : ""
                    }
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography
                    sx={{
                        color: "#00479d",
                        fontWeight: "bold",
                        marginLeft: "10px",
                        marginBottom: "10px",
                    }}
                >
                    Contrato de Honorários
                </Typography>
                <TextField
                    multiline
                    rows={4}
                    autoComplete="Contrato de Honorários"
                    error={
                        errors.dados_contratado_contrato_honorarios_rmc ? true : false
                    }
                    helperText={errors.dados_contratado_contrato_honorarios_rmc?.message?.toString() || ' '}
                    {...register("dados_contratado_contrato_honorarios_rmc")}
                    fullWidth
                    placeholder="Digite os dados do Contrato de Honorários"
                    defaultValue={
                        tenantChoose
                            ? tenantChoose.dados_contratado_contrato_honorarios_rmc
                            : ""
                    }
                />
            </Grid>
        </>
    )
}
