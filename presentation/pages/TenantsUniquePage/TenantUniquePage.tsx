"use client";
import { Tenant } from "@/app/types/tenant";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import { Box, getValue } from "@mui/system";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLoading } from "../../hook/useLoading";
import {
  getAddressByCep,
  getCnpjData,
} from "@/app/api/client/outros";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isCNPJ, isCPF } from "validation-br";
import { converterStringBoolean, convertNumberToBrlCurrency } from "@/infra/utils/convert";
import ConfiguracoesRMC from "./components/ConfiguracoesRMC/ConfiguracoesRMC";
import ConfiguracoesBPC from "./components/ConfiguracoesBPC/ConfiguracoesBPC";
import ConfiguracoesFraudeBoletos from "./components/ConfiguracoesFraudeBoletos/ConfiguracoesFraudeBoletos";
import { handleCheckboxChange, handleCancelarAssinatura, handleFormSubmit } from "./helpers/Swal";
import { getCookie } from "cookies-next";
import ConfiguracoesPeticao from "./components/ConfiguracoesPeticao/ConfiguracoesPeticao";
import GridRadioGroup from "@/presentation/components/GridRadioGroup";
import { isFieldEmpty } from "@/app/utils/validators";
import { TenantFormSchema, zod_tenant_schema } from "./helpers/Zod";
import { CurrencyInputOld } from "@/presentation/components/CurrencyInputOld";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from 'next/navigation';
import { cancelarTodasAssinaturas } from "@/app/api/server/tenant";
import { cep } from "@/app/types/cep";
import { cnpj } from "@/app/types/cnpj";
import { formatCurrency, formatMoney } from "@/app/utils/Formater";
import { CheckBox } from "@/presentation/components/Checkbox";
import { Btn } from "@/presentation/components/Button";



type TenantProps = {
  tenant: Tenant;
  listUsers: Usuarios[];
};

interface Usuarios {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  nivel: string;
  cpf: string;
  oab: string;
  oab_estado: string;
  aparecer_em_assinaturas_rmc: boolean;
}

export enum CADASTRAR_COM {
  CNPJ = 'cnpj',
  CPF = 'cpf'
}




export default function TenantUniquePage({ tenant, listUsers }: TenantProps) {
  const [users, setUsers] = useState<Usuarios[]>(listUsers);
  const router = useRouter()

  const default_values = {
    nome: tenant.nome || "",
    cep: tenant.cep || "",
    rua: tenant.rua || "",
    cidade: tenant.cidade || "",
    estado: tenant.estado || "",
    numero: tenant.numero || "",
    complemento: tenant.complemento || "",
    bairro: tenant.bairro || "",
    dados_ourtorgado_procuracao_rmc: tenant.dados_ourtorgado_procuracao_rmc || "",
    dados_contratado_contrato_honorarios_rmc: tenant.dados_contratado_contrato_honorarios_rmc || "",

    percentual_exito_rmc: tenant.percentual_exito_rmc || 35,
    danos_morais_rmc: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(tenant.danos_morais_rmc || 10_000),
    parcela_fixa_rmc: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(tenant.parcela_fixa_rmc || 1_000),
    indice_correcao_monetaria_rmc: "ipca",
    juros_de_mora_calculo_rmc: tenant.juros_de_mora_calculo_rmc || 1,

    percentual_exito_bpc: tenant.percentual_exito_bpc || 0,
    parcela_fixa_bpc: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(tenant.parcela_fixa_bpc || 1_375),

    percentual_exito_fraude_em_boletos: tenant.parcela_fixa_fraude_em_boletos as unknown as number || 0,
    parcela_fixa_fraude_em_boletos: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(tenant.parcela_fixa_fraude_em_boletos || 250),

    termo_uso_sistema: tenant.termo_uso_sistema || false,
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
    getValues,
  } = useForm<zod_tenant_schema>({
    mode: 'all',
    defaultValues: default_values,
    resolver: zodResolver(TenantFormSchema),
  });

  const { setLoading } = useLoading();
  const formRef = useRef<HTMLFormElement>(null);
  const [cnpj, setCnpj] = useState(tenant.cnpj || "");
  const [tenantChoose, setTenantChoose] = useState<Tenant>(tenant);
  const [cadastrarCom, setCadastrarCom] = useState(isFieldEmpty(tenantChoose.cnpj) ? CADASTRAR_COM.CPF : CADASTRAR_COM.CNPJ)
  const [cep, setCep] = useState(tenant.cep || "");
  const [termosUsoSistema, setTermosUsoSitema] = useState<boolean>(tenant.termo_uso_sistema || false)

  async function onCancelarAssinatura(): Promise<void> {
    await cancelarTodasAssinaturas();
  }

  const handleChangeCep = async () => {
    if (cep.replace("-", "").length === 8) {
      try {
        const data: cep = await getAddressByCep(cep.replace("-", ""));
        setValue('rua', data.logradouro)
        setValue('bairro', data.bairro)
        setValue('cidade', data.localidade)
        setValue('estado', data.uf)

        setTenantChoose({
          ...tenantChoose,
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    handleChangeCep();
  }, [cep]);

  const handleChangeCnpj = async () => {
    if (cnpj.replace(/\D/g, "").length === 14) {
      try {
        const data: cnpj = await getCnpjData(cnpj.replace(/\D/g, ""));
        setValue('razao_social', data.razao_social, { shouldValidate: true })
        setTenantChoose((prev) => { return { ...prev, razao_social: data.razao_social || '' } })
      } catch (error) {
        console.error("Erro ao buscar dados do CNPJ:", error);
      }
    }
  };

  useEffect(() => {
    handleChangeCnpj();
  }, [cnpj]);

  const handleCadastrarComChange = () => {
    if (cadastrarCom === CADASTRAR_COM.CNPJ) setCadastrarCom(CADASTRAR_COM.CPF)
    else setCadastrarCom(CADASTRAR_COM.CNPJ)
  }
  return (
    <Box
      sx={{
        maxWidth: "100vw",
        padding: "5px",
        margin: "10px",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "30px",
            width: { xs: '100%', sm: '360px' },
            marginBottom: "30px",
            color: "#00479D",
            borderBottom: "3px solid #006BED",
          }}
        >
          Informação do Cliente
        </Typography>
      </Box>

      <Alert severity="info">
        Atenção: para gerar as petições, é preciso fazer as respectivas configurações.
      </Alert>

      <Box>
        <GridRadioGroup
          options={[{ descricao: 'CNPJ', value: CADASTRAR_COM.CNPJ }, { descricao: 'CPF', value: CADASTRAR_COM.CPF }]}
          name="cpf_ou_cnpj"
          value={cadastrarCom}
          onChange={handleCadastrarComChange}
          sectionTitle="Cadastrar com"
          sectionTitleStyles={{ textTransform: 'uppercase', color: '#00479d' }}
          style={{ borderBottom: '1px solid #ccc' }}
          row
          width={{ xs: '100%', sm: 'auto' }}
        />
      </Box>
      <Box
        ref={formRef}
        component="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault()
          // peticao
          if (cadastrarCom === CADASTRAR_COM.CPF && !isCPF(getValues('cpf') as string)) setError('cpf', { message: 'cpf inválido' })
          if (cadastrarCom === CADASTRAR_COM.CNPJ && !isCNPJ(getValues('cnpj') as string)) setError('cnpj', { message: 'cnpj inválido' })

          if (cadastrarCom === CADASTRAR_COM.CPF) {
            // setValue('cnpj', '')
            // setValue('razao_social', '')
          }
          // else if (cadastrarCom === CADASTRAR_COM.CNPJ) setValue('cpf', '')

          handleSubmit((data) =>
            handleFormSubmit({
              data,
              cadastrarCom,
              tenantChoose,
              setLoading,
              setTenantChoose
            }))(e)

        }}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>

          <ConfiguracoesPeticao
            cep={cep}
            cnpj={cnpj}
            errors={errors}
            tenantChoose={tenantChoose}
            cadastrarCom={cadastrarCom}
            setCep={setCep}
            setCnpj={setCnpj}
            setTenantChoose={setTenantChoose}
            register={register}
          />

          <ConfiguracoesRMC
            errors={errors}
            tenantChoose={tenantChoose}
            setTenantChoose={setTenantChoose}
            register={register}
            reset={reset}
            setValue={setValue}
          />

          <ConfiguracoesBPC
            errors={errors}
            tenantChoose={tenantChoose}
            register={register}
            setTenantChoose={setTenantChoose}
            setValue={setValue}
          />

          <ConfiguracoesFraudeBoletos
            errors={errors}
            tenantChoose={tenantChoose}
            register={register}
            setTenantChoose={setTenantChoose}
            setValue={setValue}
          />

          <Grid container
            sx={{
              display: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #ccc',
            }}>

            <FormControl>
              <Grid
                sx={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}

              >

                <CheckBox
                  register={register}
                  {...register('termo_uso_sistema')}
                  checked={termosUsoSistema}
                  onChange={() => setTermosUsoSitema(prev => !prev)}
                  sx={{ marginLeft: 2 }}

                />
                <Button
                  onClick={() => window.open("/docs/termousopeticao.pdf")}
                  sx={{
                    position: 'relative', right: 10, top: 2, color: "#00479d", height: 22,
                    "&:hover": { cursor: 'pointer' }
                  }}>
                  Li e concordo com os termos de uso do sistema</Button>

              </Grid>
              <FormHelperText
                sx={{ marginLeft: 3.5 }}
                error={errors.termo_uso_sistema ? true : false}>
                {errors.termo_uso_sistema?.message?.toString() || ' '}
              </FormHelperText>
            </FormControl>

            <Grid
              sx={{ display: "flex", flexDirection: "column", marginRight: 2, marginLeft: { xs: 3, md: 0 } }}
            >
              <Typography
                sx={{ color: "#00479d" }}
              >
                Quem assinará a petição:
              </Typography>
              {users.map((user) => (
                <Box
                  key={user.id}
                  sx={{
                    height: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <FormControlLabel
                    onChange={(e) => {
                      handleCheckboxChange({ event: e, idUser: user.id, users, setUsers });
                    }}
                    control={<CheckBox />}
                    label={user.nome}
                    checked={converterStringBoolean(
                      user?.aparecer_em_assinaturas_rmc as unknown as string
                    )}
                  />
                </Box>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Btn
          type="submit"
          text="Atualizar Informações"
          variant="contained"
          sxWidth={{ xs: '100%', sm: "250px" }}
          marginTop={5}
          marginRight={2}
        />

        <Btn
          sxWidth={{ xs: '100%', sm: "250px" }}
          text="Cancelar Assinatura"
          variant="contained"
          color="primary"
          onClick={() => handleCancelarAssinatura(tenant.id, onCancelarAssinatura, () => router.push('/logout'))}
          marginTop={5}
        />
      </Box>
    </Box>
  );
}
