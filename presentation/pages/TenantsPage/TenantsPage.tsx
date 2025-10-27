"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EventIcon from "@mui/icons-material/Event";

import { useLoading } from "@/presentation/hook/useLoading";
import { Tenant } from "@/app/types/tenant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";;
import { Add, BuildCircle, CreditCard, Leaderboard, PlayArrow, Remove, SupervisedUserCircleSharp } from "@mui/icons-material";
import { resetToken } from "../../components/ResetToken";
import { CurrencyInputOld } from "@/presentation/components/CurrencyInputOld";
import { contratarAgendaAPI } from "@/app/api/client/agenda";
import { getAddressByCep, getCnpjData } from "@/app/api/client/outros";
import { contratarRukeLeadsAPI } from "@/app/api/client/rukeleads";
import { TenantFormSchema } from "./helpers/Zod";
import { atualizarAssinaturaAgenda, cancelarPlanoRukeLeads, handleFormSubmit, removerAssinaturaAgenda } from "./helpers/Swal";
import ModalCadastrarEmpresa from "./components/ModalCadastrarEmpresa";
import DrawerAlterarAssinaturaAgendaJuridica from "./components/DrawerAlterarAssinaturaAgendaJuridica";
import DrawerContratarRukeLeads from "./components/DrawerContratarRukeLeads";
import DrawerContratarAgendaJuridica from "./components/DrawerContratarAgendaJuridica";
import { Btn } from "@/presentation/components/Button";

type TenantsProps = {
  tenantsList: Tenant[];
  regraDominio: any;
  menus: any;
  planosContratados: any;
};

export default function TenantsPage({
  tenantsList,
  regraDominio,
  menus,
  planosContratados
}: TenantsProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(TenantFormSchema),
  });
  const { setLoading } = useLoading();
  const [cnpj, setCnpj] = useState("");
  const [open, setOpen] = useState(false);
  const [cep, setCep] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [drawerUpdateAgenda, setDrawerUpdateAgenda] = useState<boolean>(false);
  const [drawerContratarAgenda, setDrawerContratarAgenda] = useState<boolean>(false);
  const [drawerContratarRukeLeads, setDrawerContratarRukeLeads] = useState<boolean>(false);

  const [dadosContratacaoAgenda, setDadosContratacaoAgenda] = useState<any>({ quantidade_usuarios: 1, valor_usuario: 39.90, id_produto: "" });

  const [dadosAlteracaoAgenda, setDadosAlteracaoAgenda] = useState<any>({ quantidade_usuarios: 1, valor_usuario: 39.90, id_produto: "" });

  const [quantidade, setQuantidade] = useState<number>(1); //TODO tirar
  const [precoPorUsuario, setPrecoPorUsuario] = useState(0); //TODO tirar

  const [tenants, setTenants] = useState<Tenant[] | []>(tenantsList);

  const handleChangeCep = async () => {
    if (cep.replace("-", "").length === 8) {
      try {
        const data = await getAddressByCep(cep.replace("-", ""));
        setFormDataCep({
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
        });
        reset({
          rua: data.rua,
          bairro: data.bairro,
          cidade: data.localidade,
        });
      } catch (error) {
        console.error("Error fetching data:");
      }
    }
  };

  useEffect(() => {
    handleChangeCep();

  }, [cep]);



  const [formDataCep, setFormDataCep] = useState({
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
  });

  const [formDataCnpj, setFormDataCnpj] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    ni: "",
    tipoEstabelecimento: "",
    nome_empresarial: "",
    nome_fantasia: "",
    razao_social: "",
    // Adicione outras chaves conforme necessário
  });

  const handleChangeCnpj = async () => {
    if (cnpj.replace(/\D/g, "").length === 14) {
      try {
        const data = await getCnpjData(cnpj.replace(/\D/g, ""));

        setFormDataCnpj({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          endereco: data.endereco,
          ni: data.ni || "",
          razao_social: data.razao_social || "",
          tipoEstabelecimento: data.tipoEstabelecimento || "",
          nome_empresarial: data.nome_empresarial || "",
          nome_fantasia: data.nome_fantasia || "",
          // Adicione outras chaves conforme necessário
        });
      } catch (error) {
        console.error("Erro ao buscar dados do CNPJ:", error);
      }
    }
  };

  useEffect(() => {
    handleChangeCnpj();
  }, [cnpj]);

  useEffect(() => {
    setDadosAlteracaoAgenda({ ...dadosAlteracaoAgenda, quantidade_usuarios: tenantsList[0].quantidade_usuarios_agenda });
    resetToken()
  }, [])

  const planoContratadoAgenda = () => {
    const plano = planosContratados.produtos_inativos.find((item: any) => item.produto.nome === "agenda");
    if (plano) {
      return plano;
    }
    return null;
  }

  const ContractValueMemo = useMemo(() => CurrencyInputOld, []);
  const formRef = useRef<HTMLFormElement>();

  const verificarExistenciaPlanoContratado = (produtosContratados: any, nome: string) => {
    const nomes = produtosContratados.produtos_ativos.map((item: any) => item.produto.nome);
    return nomes.includes(nome);
  }

  const verificarExistenciaPlanoNaoContratado = (produtosContratados: any, nome: string) => {
    const nomes = produtosContratados.produtos_inativos.map((item: any) => item.produto.nome);
    return nomes.includes(nome);
  }

  const contratarAgenda = async () => {
    if (dadosContratacaoAgenda.quantidade_usuarios === 0) {
      alert("Por favor, escolha uma quantidade de usuários!");
    } else if (dadosContratacaoAgenda.quantidade_usuarios > 0) {
      const retornoContratarAgenda = await contratarAgendaAPI(dadosContratacaoAgenda);
      if (retornoContratarAgenda.invoiceUrl) {
        await resetToken();
        window.location.href = retornoContratarAgenda.invoiceUrl;
      }
    }
  }

  const getValorTotalAgenda = (dados: any) => {

    // Só pode ser gratuito 5 usuários se o Ruke petições for assinado

    if (verificarExistenciaPlanoContratado(planosContratados, "RMC") && dados.quantidade_usuarios > 5) {
      return ((dados.quantidade_usuarios - 5) * dados.valor_usuario).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    } else if (!verificarExistenciaPlanoContratado(planosContratados, "RMC") && dados.quantidade_usuarios > 5) {
      return (((dados.quantidade_usuarios - 5) * dados.valor_usuario) + 59.90).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }

    else if (verificarExistenciaPlanoContratado(planosContratados, "RMC") && dados.quantidade_usuarios <= 5) {
      return (0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    } else if (!verificarExistenciaPlanoContratado(planosContratados, "RMC") && dados.quantidade_usuarios <= 5) {
      return (59.90).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }

  }

  const contratarRukeLeads = async () => {
    const retornoContratarRukeLeads = await contratarRukeLeadsAPI();
    if (retornoContratarRukeLeads.invoiceUrl) {
      await resetToken();
      window.location.href = retornoContratarRukeLeads.invoiceUrl;
    }
  }


  const valorPlanoAgenda = (registroPlano: any) => {
    const itemAgenda = registroPlano.map((item: any) => {
      if (item.produto.nome === "agenda") {
        setPrecoPorUsuario(item.plano?.preco);
      }
    })
  }

  const valorTotal = quantidade * precoPorUsuario;

  const handleIncrement = () => {
    setQuantidade(prev => {
      const newValue = prev + 1;
      return newValue;
    });
  };

  const handleDecrement = () => {
    setQuantidade(prev => {
      const newValue = prev > 1 ? prev - 1 : 1;
      return newValue;
    });
  };

  return (
    <Box sx={{ borderRadius: "10px", padding: "5px", margin: "10px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: 'column', md: 'row' }, }}>
        <Typography
          sx={{
            fontSize: "30px",
            width: { xs: '100%', md: '300px' },
            paddingBottom: "10px",
            marginBottom: "30px",
            color: "#00479D",
            borderBottom: "3px solid #006BED",
          }}
        >
          Área do cliente
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 1, md: 4 }, mb: 2 }}>
          <Btn
            text="Configurações"
            sxWidth={{ xs: '100%', md: '200px' }}
            onClick={() => {
              window.location.href = `/tenants/${tenantsList[0].id}`;
            }}
          />

          <Btn
            text="Usuários"
            sxWidth={{ xs: '100%', md: '200px' }}
            onClick={() => {
              window.location.href = `/usuarios`;
            }}
          />

        </Box>
        {regraDominio?.permissoes?.includes("add") && (
          <Btn
            text="Cadastrar"
            sxWidth={{ xs: '100%', md: '200px' }}
            onClick={() => {
              handleOpen();
              reset();
            }}
          />
        )}
      </Box>
      {regraDominio?.permissoes?.includes("add") && (
        <ModalCadastrarEmpresa
          open={open}
          formRef={formRef}
          errors={errors}
          tenants={tenants}
          formDataCnpj={formDataCnpj}
          cnpj={cnpj}
          cep={cep}
          formDataCep={formDataCep}
          handleClose={handleClose}
          handleOpen={handleOpen}
          handleSubmit={handleSubmit}
          setTenants={setTenants}
          setLoading={setLoading}
          setOpen={setOpen}
          register={register}
          reset={reset}
          setFormDataCnpj={setFormDataCnpj}
          setCnpj={setCnpj}
          setCep={setCep}
          setFormDataCep={setFormDataCep}
          ContractValueMemo={ContractValueMemo}
        />
      )}

      <Typography variant="h6">Produtos Contratados</Typography>



      {tenants.map((tenant) => (
        <>

          {verificarExistenciaPlanoContratado(planosContratados, "agenda") && (
            <Box
              sx={{
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                height: "80px",
                color: "black",
                marginTop: 2,
                "&:hover": {
                  backgroundColor: "white",
                },
                boxShadow: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item textAlign={"left"} xs={2}>
                  <EventIcon style={{ fontSize: "50px" }} />
                </Grid>

                <Grid item textAlign="left" xs={5}>

                  <Typography style={{ fontWeight: "bold" }} sx={{ display: { xs: 'none', sm: 'block' } }}>AGENDA JURÍDICA</Typography>
                  <Typography style={{ fontWeight: "bold", fontSize: "12px" }} sx={{ display: { xs: 'none', sm: 'block' } }}>{tenantsList[0].quantidade_usuarios_agenda} usuários ativos</Typography>

                </Grid>

                <Grid item textAlign={"right"} xs={5}>

                  <Button variant="outlined" onClick={() => setDrawerUpdateAgenda(true)} color="info" size="small">ALTERAR</Button>
                  {/* <Button variant="outlined" style={{marginLeft: 5}} color="info" size="small">HISTÓRICO DE PAGAMENTOS</Button>  */}
                  {verificarExistenciaPlanoContratado(planosContratados, "RMC") && tenantsList[0].quantidade_usuarios_agenda as number > 5 && (
                    <Button variant="outlined" onClick={() => { removerAssinaturaAgenda(setLoading) }} style={{ marginLeft: 5 }} color="error" size="small">CANCELAR</Button>
                  )}


                </Grid>
              </Grid>
            </Box>
          )}


          {/* {verificarExistenciaPlanoContratado(planosContratados, "RMC") && (
          <Box
          sx={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            height: "80px",
            color: "black",
            marginTop: 2,
            "&:hover": {
              backgroundColor: "white",
            },
            boxShadow: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item textAlign={"left"} xs={2}>
              <FaceRetouchingNatural style={{ fontSize: "50px"}} />
            </Grid>

            <Grid item textAlign="left" xs={5}>
                <Typography style={{ fontWeight: "bold" }}>IA GERADORA DE PETIÇÕES</Typography>
            </Grid>

            <Grid item textAlign={"left"} xs={5}>
                <Button variant="outlined" color="info" size="small">ALTERAR</Button> 
                <Button variant="outlined" style={{marginLeft: 5}} color="info" size="small">HISTÓRICO DE PAGAMENTOS</Button> 
                <Button variant="outlined" style={{marginLeft: 5}} color="error" size="small">CANCELAR</Button>
            </Grid>
          </Grid>
        </Box>
    )} */}



          {verificarExistenciaPlanoContratado(planosContratados, "rukeLeads") && (
            <Box
              sx={{
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                height: "80px",
                color: "black",
                marginTop: 2,
                "&:hover": {
                  backgroundColor: "white",
                },
                boxShadow: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item textAlign={"left"} xs={2}>
                  <Leaderboard style={{ fontSize: "50px" }} />
                </Grid>

                <Grid item textAlign="left" xs={5}>

                  <Typography style={{ fontWeight: "bold" }} sx={{ display: { xs: 'none', sm: 'block' } }}>RUKE LEADS</Typography>


                </Grid>

                <Grid item textAlign={"right"} xs={5}>

                  {/* <Button variant="outlined" style={{marginLeft: 5}} color="info" size="small">HISTÓRICO DE PAGAMENTOS</Button>  */}
                  <Button variant="outlined" style={{ marginLeft: 5 }} onClick={() => {
                    cancelarPlanoRukeLeads(setLoading)
                  }} color="error" size="small">CANCELAR</Button>

                </Grid>
              </Grid>
            </Box>
          )}
          <br />
          <Typography variant="h6">Produtos disponíveis para contratação</Typography>

          {verificarExistenciaPlanoNaoContratado(planosContratados, "rukeLeads") && (
            <Box
              sx={{
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                height: "80px",
                color: "black",
                marginTop: 2,
                "&:hover": {
                  backgroundColor: "white",
                },
                boxShadow: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item textAlign={"left"} xs={2}>
                  <Leaderboard style={{ fontSize: "50px" }} />
                </Grid>

                <Grid item textAlign="left" xs={4}>

                  <Typography style={{ fontWeight: "bold" }}>RUKE LEADS</Typography>


                </Grid>

                <Grid item textAlign={"right"} xs={6}>
                  <Button variant="outlined" color="error" size="small"><PlayArrow /> ASSISTIR APRESENTAÇÃO</Button>
                  <Button variant="contained" onClick={() => {
                    setDrawerContratarRukeLeads(true);
                  }} color="success" style={{ marginLeft: "10px" }} size="small">CONTRATAR</Button>

                </Grid>
              </Grid>
            </Box>
          )}

          {verificarExistenciaPlanoNaoContratado(planosContratados, "agenda") && (
            <Box
              sx={{
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                height: "80px",
                color: "black",
                marginTop: 2,
                "&:hover": {
                  backgroundColor: "white",
                },
                boxShadow: 2,
              }}
            >
              <Grid container spacing={2}>
                <Grid item textAlign={"left"} xs={2}>
                  <EventIcon style={{ fontSize: "50px" }} />
                </Grid>

                <Grid item textAlign="left" xs={4}>

                  <Typography style={{ fontWeight: "bold" }}>AGENDA JURÍDICA</Typography>
                  <Typography style={{ fontWeight: "bold", fontSize: "12px" }}>0 usuários ativos</Typography>

                </Grid>

                <Grid item textAlign={"right"} xs={6}>
                  {
                    planoContratadoAgenda() && planoContratadoAgenda().status === "INACTIVE" && planoContratadoAgenda().link_pagamento && (
                      <>
                        <a target="_blank" href={planoContratadoAgenda().link_pagamento}><Button variant="outlined" color="success" startIcon={<CreditCard />} size="small">FAZER PAGAMENTO</Button></a>
                      </>
                    )
                  }


                  {planoContratadoAgenda() && planoContratadoAgenda().status === "INACTIVE" && !planoContratadoAgenda().link_pagamento && (
                    <>
                      <Button variant="outlined" color="error" size="small"><PlayArrow /> ASSISTIR APRESENTAÇÃO</Button>
                      <Button variant="contained" color="success" style={{ marginLeft: "10px" }} onClick={() => setDrawerContratarAgenda(true)} size="small">ESCOLHER PLANO E CONTRATAR</Button>
                    </>
                  )
                  }

                </Grid>
              </Grid>
            </Box>
          )}

          {/* {verificarExistenciaPlanoNaoContratado(planosContratados, "RMC") && (
          <Box
          sx={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            height: "80px",
            color: "black",
            marginTop: 2,
            "&:hover": {
              backgroundColor: "white",
            },
            boxShadow: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item textAlign={"left"} xs={2}>
              <FaceRetouchingNatural style={{ fontSize: "50px"}} />
            </Grid>

            <Grid item textAlign="left" xs={4}>
                <Typography style={{ fontWeight: "bold" }}>IA GERADORA DE PETIÇÕES</Typography>
            </Grid>

            <Grid item textAlign={"right"} xs={6}>
                <Button variant="outlined" color="error" size="small"><PlayArrow /> ASSISTIR APRESENTAÇÃO</Button>
                <Button variant="contained" color="success" style={{ marginLeft: "10px" }} size="small">ESCOLHER PLANO E CONTRATAR</Button> 
            </Grid>
          </Grid>
        </Box>
    )} */}
        </>
      ))}



      {/* Drawers */}

      <DrawerAlterarAssinaturaAgendaJuridica
        drawerUpdateAgenda={drawerUpdateAgenda}
        tenantsList={tenantsList}
        dadosAlteracaoAgenda={dadosAlteracaoAgenda}
        errors={errors}
        setDrawerUpdateAgenda={setDrawerUpdateAgenda}
        getValorTotalAgenda={getValorTotalAgenda}
        setDadosAlteracaoAgenda={setDadosAlteracaoAgenda}
        setQuantidade={setQuantidade}
      />


      <DrawerContratarRukeLeads
        drawerContratarRukeLeads={drawerContratarAgenda}
        setDrawerContratarRukeLeads={setDrawerContratarAgenda}
        contratarRukeLeads={contratarRukeLeads}
      />

      <DrawerContratarAgendaJuridica
        drawerContratarAgenda={drawerContratarAgenda}
        dadosContratacaoAgenda={dadosContratacaoAgenda}
        errors={errors}
        setDrawerContratarAgenda={setDrawerContratarAgenda}
        setDadosContratacaoAgenda={setDadosContratacaoAgenda}
        getValorTotalAgenda={getValorTotalAgenda}
        setQuantidade={setQuantidade}
        contratarAgenda={contratarAgenda}
      />

    </Box>

  );
}

//TODO fazer verificação com os outros produtos
