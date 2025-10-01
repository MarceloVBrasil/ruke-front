"use client";

import { useEffect, useMemo, useState } from "react";
import { differenceInYears } from "date-fns";

import {
  Box,
  Typography,
} from "@mui/material";

import {
  getCnpjData,
  getAddressByCep,
} from "@/app/api/client/outros";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  formatarDataParaFormatoAmericano,
} from "@/domain/services/Date";

import PessoaModal from "./components/ModalPessoa/PessoaModal";
import DoencaModal from "./components/ModalDoenca/DoencaModal";
import Peticao from "./components/Peticao/Peticao";
import Procuracao from "./components/Procuracao/Procuracao";
import ContratoHonorarios from "./components/ContratoHonorarios/ContratoHonorarios";
import DeclaracaoHipossuficiencia from "./components/DeclaracaoHipossuficiencia/DeclaracaoHipossuficiencia";

import { bpcPeticaoFormSchema } from "./helpers/schemas/PeticaoFormSchema";
import { bpcProcuracaoFormSchema } from "./helpers/schemas/ProcuracaoFormSchema";
import { bpcContratoFormSchema } from "./helpers/schemas/ContratoSchema";
import { bpcHipossuficienciaFormSchema } from "./helpers/schemas/HipossuficienciaSchema";
import { bpcDoencaFormSchema } from "./helpers/schemas/DoencaSchema";
import { bpcPessoaFormSchema } from "./helpers/schemas/PessoaSchema";
import {
  criarBpcProcuracao,
  criarContrato,
  criarHipossuficiencia,
  handleAddPessoaSubmit,
  handleDeleteDoenca,
  handleDeletePessoa,
  criarPeticao
} from "./helpers/Swal";
import { CurrencyInputOld } from "@/presentation/components/CurrencyInputOld";

type TicketProps = {
  ticketUnique: any;
  regraDominio: any;
  listDoencas: any[];
};



const Bpc = ({ ticketUnique, regraDominio, listDoencas }: TicketProps) => {
  const {
    register: registerPeticao,
    handleSubmit: handleSubmitPeticao,
    formState: { errors: errorsPeticao },
    reset: resetPeticao,
  } = useForm({
    resolver: zodResolver(bpcPeticaoFormSchema),
  });
  const {
    register: registerProcuracao,
    handleSubmit: handleSubmitProcuracao,
    formState: { errors: errorsProcuracao },
    reset: resetProcuracao,
  } = useForm({
    resolver: zodResolver(bpcProcuracaoFormSchema),
  });
  const {
    register: registerContrato,
    handleSubmit: handleSubmitContrato,
    formState: { errors: errorsContrato },
    reset: resetContrato,
  } = useForm({
    resolver: zodResolver(bpcContratoFormSchema),
  });
  const {
    register: registerHipossuficiencia,
    handleSubmit: handleSubmitHipossuficiencia,
    formState: { errors: errorsHipossuficiencia },
    reset: resetHipossuficiencia,
  } = useForm({
    resolver: zodResolver(bpcHipossuficienciaFormSchema),
  });

  const {
    register: registerDoenca,
    handleSubmit: handleSubmitDoenca,
    formState: { errors: errorsDoenca },
    reset: resetDoenca,
  } = useForm({
    resolver: zodResolver(bpcDoencaFormSchema),
  });
  const {
    register: registerPessoa,
    handleSubmit: handleSubmitPessoa,
    formState: { errors: errorsPessoa },
    reset: resetPessoa,
  } = useForm({
    resolver: zodResolver(bpcPessoaFormSchema),
  });

  const [ticket, setTicket] = useState<any>(ticketUnique);
  const [nameClient, setNameClient] = useState("");
  const [cpfClient, setCPFClient] = useState("");
  const [rgClient, setRGClient] = useState("");
  const [cnpjClient, setCnpjClient] = useState("");
  const [cep, setCep] = useState("");
  const [enderecoCompleto, setEnderecoCompleto] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");
  const [date, setDate] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [profissao, setProfissao] = useState("");
  const [dataRequerimento, setDataRequerimento] = useState("");
  const [numeroBeneficio, setNumeroBeneficio] = useState("");
  const [dataNascimentoAutora, setDataNascimentoAutora] = useState("");
  const [idadeClienteAutora, setIdadeClienteAutora] = useState("");
  const [secaoJudiciariaEstado, setSecaoJudiciariaEstado] = useState("");
  const [loadingContract, setLoadingContract] = useState(false);
  const [loadingProxy, setLoadingProxy] = useState(false);
  const [loadingHipossuficiencia, setLoadingHipossuficiencia] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doencaModal, setDoencaModal] = useState(false);
  const [doencaNome, setDoencaNome] = useState("");
  const [doencaCod, setDoencaCod] = useState("");
  const [pessoaModal, setPessoaModal] = useState(false);
  const [pessoaNome, setPessoaNome] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [cpfPessoa, setCpfPessoa] = useState("");
  const [estadoCivilPessoa, setEstadoCivilPessoa] = useState("");
  const [rendaPessoa, setRendaPessoa] = useState("");
  const [fonteDeRendaPessoa, setFonteDeRendaPessoa] = useState("");

  const [dataNascimentoPessoa, setDataNascimentoPessoa] = useState("");
  const [rgPessoa, setRgPessoa] = useState("");
  const [profissaoPessoa, setProfissaoPessoa] = useState("");
  const [rendaParteAutora, setRendaParteAutora] = useState("");
  const [fonteDeRendaParteAutora, setFonteRendaParteAutora] = useState("");
  const [pessoaId, setPessoaId] = useState("");
  const [doencas, setDoencas] = useState<any[]>([]);
  const [pessoas, setPessoas] = useState<any[]>([]);
  const [pessoaSelecionada, setPessoaSelecionada] = useState();

  const handleChangeCep = async () => {
    if (cep.replace("-", "").length === 8) {
      try {
        const data = await getAddressByCep(cep.replace("-", ""));
        setEnderecoCompleto(data.logradouro);
        setEstado(data.uf);
        setBairro(data.bairro);
        setCidade(data.localidade);
      } catch (error) {
        console.error("Error fetching data: ");
      }
    }
  };

  const calculateIdade = (data_nascimento_parte_autora: string) => {
    const dataAtual = new Date();
    if (
      data_nascimento_parte_autora &&
      data_nascimento_parte_autora.length >= 10
    ) {
      setIdadeClienteAutora(
        String(differenceInYears(dataAtual, data_nascimento_parte_autora))
      );
    }
  };

  useEffect(() => {
    getBpcTickets(ticketUnique);
  }, []);

  useEffect(() => {
    handleChangeCep()
  }, [cep]);

  const [formDataCnpj, setFormDataCnpj] = useState({
    nome: "",
    email: "",
    telefone: "",
    logradouro: "",
    ni: "",
    tipoEstabelecimento: "",
    nome_empresarial: "",
    nome_fantasia: "",
    razao_social: "",
  });

  const handleChangeCnpj = async () => {
    if (cnpjClient.replace(/\D/g, "").length === 14) {
      try {
        const data = await getCnpjData(cnpjClient.replace(/\D/g, ""));
        setEnderecoCompleto(data.logradouro);
        setEstado(data.uf);
        setBairro(data.bairro);
        setCidade(data.localidade);

        setFormDataCnpj({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          logradouro: data.logradouro,
          ni: data.ni || "",
          razao_social: data.razao_social || "",
          tipoEstabelecimento: data.tipoEstabelecimento || "",
          nome_empresarial: data.nome_empresarial || "",
          nome_fantasia: data.nome_fantasia || "",
        });
      } catch (error) {

      }
    }
  };

  useEffect(() => {
    handleChangeCnpj();
  }, [cnpjClient]);

  const preencherInformacoesPeticao = (pessoa: any) => {
    setPessoaSelecionada(pessoa.id);
    setNameClient(pessoa.nome_cliente || "");
    setCPFClient(pessoa.cpf_cliente || "");
    setRGClient(pessoa.rg_cliente || "");
    setEstadoCivil(pessoa.estado_civil || "");
    setRendaParteAutora(pessoa.renda || "");
    setFonteRendaParteAutora(pessoa.fonte_de_renda || "");
    setDataNascimentoAutora(
      formatarDataParaFormatoAmericano(pessoa.data_nascimento) || ""
    );
    calculateIdade(pessoa.data_nascimento);
    setProfissao(pessoa.profissao || "");

    resetPeticao({
      nameClient: pessoa.nome_cliente || "",
      cpfClient: pessoa.cpf_cliente || "",
      rgPessoa: pessoa.rg_pessoa || "",
      estadoCivil: pessoa.estado_civil || "",
      fonteRendaParteAutora: pessoa.renda || "",
      dataNascimentoAutora: pessoa.data_nascimento || "",
      idadeAutora: pessoa.idade || "",
      profissao: pessoa.profissao || "",
      rendaParteAutora: pessoa.renda || "",
    });
  };

  const handleAddDoencaSubmit = async () => {
    setDoencas([
      ...doencas,
      {
        nome: doencaNome,
        codigo: doencaCod,
      },
    ]);
    setDoencaModal(false);
    setDoencaCod("");
    setDoencaNome("");
    resetDoenca({
      nome: "",
      codigo: "",
    });
  };

  const verificarInformacoesObrigatoriasPessoas = () => {
    let camposObrigatoriosNaoPreenchidos = false;
    for (const pessoa of pessoas) {
      if (
        !pessoa.nome_cliente ||
        !pessoa.cpf_cliente ||
        !pessoa.data_nascimento ||
        !pessoa.renda ||
        !pessoa.fonte_de_renda ||
        !pessoa.estado_civil ||
        !pessoa.rg_cliente ||
        !pessoa.profissao
      ) {
        camposObrigatoriosNaoPreenchidos = true;
      }
    }

    return camposObrigatoriosNaoPreenchidos;
  };

  const getBpcTickets = async (ticket: any) => {
    resetPeticao();
    resetProcuracao();
    resetContrato();
    resetHipossuficiencia();
    setNameClient(ticket.nome_cliente || "");
    setCPFClient(ticket.cpf_cliente || "");
    setRGClient(ticket.rg_cliente || "");
    setCep(ticket.cep || "");
    setEnderecoCompleto(ticket.endereco || "");
    setBairro(ticket.bairro || "");
    setComplemento(ticket.complemento || "");
    setCidade(ticket.cidade || "");
    setEstado(ticket.estado || "");
    setNumero(ticket.numero || "");
    setCnpjClient(ticket.cnpj || "");
    setEstadoCivil(ticket.estado_civil || "");
    setProfissao(ticket.profissao || "");
    setRendaParteAutora(ticket.renda_parte_autora || "");
    setNumeroBeneficio(ticket.numero_beneficio || "");
    setSecaoJudiciariaEstado(ticket.secao_judiciaria_estado || "");
    setIdadeClienteAutora(ticket.idade_cliente_parte_autora);
    setDataNascimentoAutora(
      formatarDataParaFormatoAmericano(
        ticket.data_nascimento_cliente_parte_autora
      ) || ""
    );
    setDataRequerimento(
      formatarDataParaFormatoAmericano(ticket.data_requerimento) || ""
    );
    setDoencas(
      ticket.doencas.map((doenca: any) => {
        delete doenca.id;
        delete doenca.id_bpc;
        delete doenca.created_at;
        delete doenca.updated_at;
        return doenca;
      }) || []
    );
    setPessoas(
      ticket.pessoas.map((pessoa: any) => {
        delete pessoa.id_bpc;
        delete pessoa.created_at;
        delete pessoa.updated_at;
        pessoa.data_nascimento = formatarDataParaFormatoAmericano(
          pessoa.data_nascimento
        );
        return pessoa;
      }) || []
    );

    setTicket(ticket);
    const pessoa = ticket.pessoas.find(
      (pessoaItem: any) =>
        pessoaItem.cpf_cliente === ticket.cpf_cliente &&
        pessoaItem.cpf_cliente !== null
    );
    if (pessoa) {
      setPessoaSelecionada(pessoa.id);
      preencherInformacoesPeticao(pessoa);
    }

    setFormDataCnpj({
      ...formDataCnpj,
      logradouro: ticket.endereco,
      razao_social: ticket.razao_social,
    });
  };

  const ContractValueMemo = useMemo(() => CurrencyInputOld, []);

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        padding: "5px",
        borderRadius: "10px",
        margin: "10px",
      }}
    >
      <Box sx={{ display: "flex", gap: "20px" }}>

        <DoencaModal
          doencaModal={doencaModal}
          listDoencas={listDoencas}
          doencas={doencas}
          doencaCod={doencaCod}
          errorsDoenca={errorsDoenca}
          doencaNome={doencaNome}
          setDoencaModal={setDoencaModal}
          setDoencaNome={setDoencaNome}
          setDoencaCod={setDoencaCod}
          resetDoenca={resetDoenca}
          registerDoenca={registerDoenca}
          handleSubmitDoenca={handleSubmitDoenca}
          handleAddDoencaSubmit={handleAddDoencaSubmit}
        />

        <PessoaModal
          pessoaId={pessoaId}
          pessoaModal={pessoaModal}
          pessoaNome={pessoaNome}
          cpfPessoa={cpfPessoa}
          errorsPessoa={errorsPessoa}
          estadoCivilPessoa={estadoCivilPessoa}
          rendaPessoa={rendaPessoa}
          parentesco={parentesco}
          fonteDeRendaPessoa={fonteDeRendaPessoa}
          dataNascimentoPessoa={dataNascimentoPessoa}
          pessoaSelecionada={pessoaSelecionada}
          cpfClient={cpfClient}
          rgPessoa={rgPessoa}
          profissaoPessoa={profissaoPessoa}
          setPessoaModal={setPessoaModal}
          setPessoaNome={setPessoaNome}
          handleSubmitPessoa={handleSubmitPessoa}
          handleAddPessoaSubmit={() => handleAddPessoaSubmit({
            pessoaId,
            pessoas,
            cpfPessoa,
            pessoaNome,
            estadoCivilPessoa,
            rendaPessoa,
            fonteDeRendaPessoa,
            dataNascimentoPessoa,
            rgPessoa,
            profissaoPessoa,
            parentesco,
            pessoaSelecionada,
            preencherInformacoesPeticao,
            setPessoaModal,
            setPessoas,
            resetPessoa,
            setCpfPessoa,
            setRgPessoa,
            setFonteDeRendaPessoa,
          })}
          registerPessoa={registerPessoa}
          setCpfPessoa={setCpfPessoa}
          setEstadoCivilPessoa={setEstadoCivilPessoa}
          resetPessoa={resetPessoa}
          setRendaPessoa={setRendaPessoa}
          setParentesco={setParentesco}
          setFonteDeRendaPessoa={setFonteDeRendaPessoa}
          setDataNascimentoPessoa={setDataNascimentoPessoa}
          calculateIdade={calculateIdade}
          setRgPessoa={setRgPessoa}
          setProfissaoPessoa={setProfissaoPessoa}
          ContractValueMemo={ContractValueMemo}
        />

      </Box>

      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{
            fontSize: "27px",
            marginBottom: "30px",
            color: "#00479D",
            borderBottom: "3px solid #006BED",
          }}
        >
          Informação do Ticket
        </Typography>
      </Box>


      <Peticao
        ticket={ticket}
        pessoas={pessoas}
        pessoaSelecionada={pessoaSelecionada}
        nameClient={nameClient}
        errorsPeticao={errorsPeticao}
        estadoCivil={estadoCivil}
        profissao={profissao}
        cpfClient={cpfClient}
        rgClient={rgClient}
        cep={cep}
        enderecoCompleto={enderecoCompleto}
        numero={numero}
        complemento={complemento}
        bairro={bairro}
        cidade={cidade}
        estado={estado}
        rendaParteAutora={rendaParteAutora}
        fonteDeRendaParteAutora={fonteDeRendaParteAutora}
        dataRequerimento={dataRequerimento}
        dataNascimentoAutora={dataNascimentoAutora}
        numeroBeneficio={numeroBeneficio}
        idadeClienteAutora={idadeClienteAutora}
        secaoJudiciariaEstado={secaoJudiciariaEstado}
        doencas={doencas}
        regraDominio={regraDominio}
        loading={loading}
        setPessoaModal={setPessoaModal}
        setPessoaId={setPessoaId}
        setPessoaNome={setPessoaNome}
        setCpfPessoa={setCpfPessoa}
        setDataNascimentoPessoa={setDataNascimentoPessoa}
        setRendaPessoa={setRendaPessoa}
        setFonteDeRendaPessoa={setFonteDeRendaPessoa}
        setRgPessoa={setRgPessoa}
        setProfissaoPessoa={setProfissaoPessoa}
        setParentesco={setParentesco}
        setEstadoCivilPessoa={setEstadoCivilPessoa}
        resetPessoa={resetPessoa}
        preencherInformacoesPeticao={preencherInformacoesPeticao}
        handleDeletePessoa={(index) => handleDeletePessoa({
          id: index,
          pessoas,
          setPessoas
        })}
        handleSubmitPeticao={handleSubmitPeticao}
        saveAndCreatePetition={() => criarPeticao({
          ticket,
          nameClient,
          estadoCivil,
          profissao,
          rendaParteAutora,
          fonteDeRendaParteAutora,
          cpfClient,
          rgClient,
          enderecoCompleto,
          numero,
          bairro,
          cidade,
          estado,
          cep,
          complemento,
          dataRequerimento,
          numeroBeneficio,
          dataNascimentoAutora,
          idadeClienteAutora,
          secaoJudiciariaEstado,
          pessoas,
          doencas,
          setLoading,
          verificarInformacoesObrigatoriasPessoas,
          getBpcTickets
        })}
        registerPeticao={registerPeticao}
        setNameClient={setNameClient}
        resetPeticao={resetPeticao}
        setPessoas={setPessoas}
        setEstadoCivil={setEstadoCivil}
        setProfissao={setProfissao}
        setCPFClient={setCPFClient}
        resetProcuracao={resetProcuracao}
        setRGClient={setRGClient}
        setCep={setCep}
        setEnderecoCompleto={setEnderecoCompleto}
        setNumero={setNumero}
        setComplemento={setComplemento}
        setBairro={setBairro}
        setCidade={setCidade}
        setEstado={setEstado}
        setRendaParteAutora={setRendaParteAutora}
        ContractValueMemo={ContractValueMemo}
        setFonteRendaParteAutora={setFonteRendaParteAutora}
        setDataRequerimento={setDataRequerimento}
        setDataNascimentoAutora={setDataNascimentoAutora}
        setNumeroBeneficio={setNumeroBeneficio}
        calculateIdade={calculateIdade}
        setIdadeClienteAutora={setIdadeClienteAutora}
        setSecaoJudiciariaEstado={setSecaoJudiciariaEstado}
        setDoencaModal={setDoencaModal}
        resetDoenca={resetDoenca}
        handleDeleteDoenca={(index) => handleDeleteDoenca({
          id: index,
          doencas,
          setDoencas,
          setDoencaCod,
          setDoencaNome,
          resetDoenca
        })}
      />

      <Procuracao
        ticket={ticket}
        errorsProcuracao={errorsProcuracao}
        nameClient={nameClient}
        estadoCivil={estadoCivil}
        profissao={profissao}
        cpfClient={cpfClient}
        cep={cep}
        enderecoCompleto={enderecoCompleto}
        numero={numero}
        bairro={bairro}
        complemento={complemento}
        cidade={cidade}
        estado={estado}
        regraDominio={regraDominio}
        loadingProxy={loadingProxy}
        date={dataRequerimento}
        setNameClient={setNameClient}
        criarBpcProx={() => criarBpcProcuracao({
          setLoadingProxy,
          getBpcTickets,
          ticket,
          nameClient,
          estadoCivil,
          profissao,
          cpfClient,
          enderecoCompleto,
          numero,
          bairro,
          cidade,
          estado,
          cep,
          complemento,
          date: dataRequerimento
        })}
        handleSubmitProcuracao={handleSubmitProcuracao}
        registerProcuracao={registerProcuracao}
        resetProcuracao={resetProcuracao}
        setEstadoCivil={setEstadoCivil}
        setProfissao={setProfissao}
        setCPFClient={setCPFClient}
        setCep={setCep}
        setEnderecoCompleto={setEnderecoCompleto}
        setNumero={setNumero}
        setBairro={setBairro}
        setComplemento={setComplemento}
        setCidade={setCidade}
        setEstado={setEstado}
        setDate={setDataRequerimento}
      />

      <ContratoHonorarios
        ticket={ticket}
        nameClient={nameClient}
        errorsContrato={errorsContrato}
        estadoCivil={estadoCivil}
        profissao={profissao}
        cpfClient={cpfClient}
        cep={cep}
        enderecoCompleto={enderecoCompleto}
        numero={numero}
        bairro={bairro}
        complemento={complemento}
        cidade={cidade}
        estado={estado}
        regraDominio={regraDominio}
        loadingContract={loadingContract}
        date={dataRequerimento}
        handleSubmitContrato={handleSubmitContrato}
        criarContrato={() => criarContrato({
          setLoadingContract,
          getBpcTickets,
          ticket,
          nameClient,
          estadoCivil,
          profissao,
          cpfClient,
          enderecoCompleto,
          numero,
          bairro,
          cidade,
          estado,
          cep,
          complemento,
          date: dataRequerimento
        })}
        setNameClient={setNameClient}
        registerContrato={registerContrato}
        setEstadoCivil={setEstadoCivil}
        resetContrato={resetContrato}
        setProfissao={setProfissao}
        setCPFClient={setCPFClient}
        setCep={setCep}
        setEnderecoCompleto={setEnderecoCompleto}
        setNumero={setNumero}
        setBairro={setBairro}
        setComplemento={setComplemento}
        setCidade={setCidade}
        setEstado={setEstado}
        setDate={setDataRequerimento}
      />

      <DeclaracaoHipossuficiencia
        ticket={ticket}
        errorsHipossuficiencia={errorsHipossuficiencia}
        nameClient={nameClient}
        estadoCivil={estadoCivil}
        profissao={profissao}
        cpfClient={cpfClient}
        cep={cep}
        enderecoCompleto={enderecoCompleto}
        numero={numero}
        bairro={bairro}
        complemento={complemento}
        cidade={cidade}
        estado={estado}
        regraDominio={regraDominio}
        loadingHipossuficiencia={loadingHipossuficiencia}
        dataRequerimento={dataRequerimento}
        setNameClient={setNameClient}
        criarHipossuficiencia={() => criarHipossuficiencia({
          setLoadingHipossuficiencia,
          getBpcTickets,
          ticket,
          nameClient,
          estadoCivil,
          profissao,
          cpfClient,
          enderecoCompleto,
          numero,
          bairro,
          cidade,
          estado,
          cep,
          complemento,
          dataRequerimento
        }
        )}
        handleSubmitHipossuficiencia={handleSubmitHipossuficiencia}
        registerHipossuficiencia={registerHipossuficiencia}
        resetHipossuficiencia={resetHipossuficiencia}
        resetProcuracao={resetProcuracao}
        setEstadoCivil={setEstadoCivil}
        setProfissao={setProfissao}
        setCPFClient={setCPFClient}
        setCep={setCep}
        setEnderecoCompleto={setEnderecoCompleto}
        setNumero={setNumero}
        setBairro={setBairro}
        setComplemento={setComplemento}
        setCidade={setCidade}
        setEstado={setEstado}
        setDataRequerimento={setDataRequerimento}
      />

    </Box>
  );
};

export default Bpc;
