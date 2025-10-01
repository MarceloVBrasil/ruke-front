"use client";
import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import {
  getAddressByCep,
  getCnpjData,
} from "@/app/api/client/outros";
import {
  formatCpf,
} from "@/app/utils/Formater";
import {
  formatarDataParaFormatoAmericano,
} from "@/domain/services/Date";
import Peticao from "./components/Peticao/Peticao";
import Procuracao from "./components/Procuracao/Procuracao";
import ContratoHonorarios from "./components/ContratoHonorarios/ContratoHonorarios";
import Hipossuficiencia from "./components/Hipossuficiencia/Hipossuficiencia";
import { criarPeticao } from "./helpers/Swal";
import { CurrencyInputOld } from "@/presentation/components/CurrencyInputOld";
import { getBancos } from "@/app/api/client/bancos";

// ==============================|| SAMPLE PAGE ||============================== //

type TicketProps = {
  ticketUnique: any;
  regraDominio: any;
};

const Ticket = ({ ticketUnique, regraDominio }: TicketProps) => {
  const [ticket, setTicket] = useState<any>(ticketUnique);

  const [nameClient, setNameClient] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [committedValue, setCommittedValue] = useState("");
  const [bankName, setBankName] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [profissao, setProfissao] = useState("");
  const [cep, setCEP] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [estado, setEstado] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cpf, setCPF] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [addressClient, setAddressClient] = useState("");
  const [cityClient, setCityClient] = useState("");
  const [bancoBoletoFalso, setBancoBoletoFalso] = useState("");
  const [valorBoletoFalso, setValorBoletoFalso] = useState("");
  const [dataVencimentoBoletoFalso, setDataVencimentoBoletoFalso] =
    useState("");

  const [municipioEEstadoAcao, setMunicipioEEstadoAcao] = useState("");
  const [boletimDeOcorrencia, setBoletimDeOcorrencia] = useState("");
  const [danosMorais, setDanosMorais] = useState("");
  const [valorDanosMorais, setValorDanosMorais] = useState("");
  const [bancoBoletoVerdadeiro, setBancoBoletoVerdadeiro] = useState("");
  const [valorBoletoVerdadeiro, setValorBoletoVerdadeiro] = useState("");
  const [dataVencimentoBoletoVerdadeiro, setDataVencimentoBoletoVerdadeiro] =
    useState("");
  const [quantidadeBancos, setQuantidadeBancos] = useState("");
  const [banks, setBanks] = useState([]);
  const [inputBancoBoletoFalso, setInputBancoBoletoFalso] = useState("");
  const [inputBancoBoletoVerdadeiro, setInputBancoBoletoVerdadeiro] =
    useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingContract, setLoadingContract] = useState(false);
  const [loadingProxy, setLoadingProxy] = useState(false);
  const [loadingHipossuficiencia, setLoadingHipossuficiencia] = useState(false);

  const handleChangeCep = async () => {
    if (cep && cep.replace("-", "").length === 8) {
      try {
        const data = await getAddressByCep(cep.replace("-", ""));
        if (data.logradouro) {
          setRua(data.logradouro);
        }

        if (data.uf) {
          setEstado(data.uf);
        }

        if (data.bairro) {
          setBairro(data.bairro);
        }

        if (data.localidade) {
          setCidade(data.localidade);
        }
      } catch (error) {
        console.error("Error fetching data:");
      }
    }
  };

  useEffect(() => {
    getTickets(ticketUnique);
  }, []);

  const handleChangeCnpj = async () => {
    if (cnpj && cnpj.replace(/\D/g, "").length === 14) {
      try {
        const data = await getCnpjData(cnpj.replace(/\D/g, ""));
        if (!cep && !nameClient) {
          setRua(data.logradouro);
          setEstado(data.uf);
          setBairro(data.bairro);
          setCidade(data.municipio);
          setComplemento(data.complemento);
          setCEP(data.cep);
          setNumero(data.numero);
          setNameClient(data.razao_social);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do CNPJ:", error);
      }
    }
  };

  useEffect(() => {
    handleChangeCnpj();
  }, [cnpj]);

  useEffect(() => {
    handleChangeCep();
  }, [cep]);

  const getTickets = async (ticket: any) => {
    setNameClient(ticket.nome_cliente);
    setCNPJ(ticket.cnpj);
    setCPF(formatCpf(ticket.cpf));
    setEstadoCivil(ticket.estado_civil);
    setTipoPessoa(ticket.tipo_pessoa);
    setCEP(ticket.cep);
    setRua(ticket.rua);
    setNumero(ticket.numero);
    setBairro(ticket.bairro);
    setCidade(ticket.cidade);
    setEstado(ticket.estado);
    setComplemento(ticket.complemento);
    setDataNascimento(formatarDataParaFormatoAmericano(ticket.data_nascimento));
    setCommittedValue(
      ticket.committed_value ? ticket.committed_value.replace(".", ",") : ""
    );
    setProfissao(ticket.profissao);
    setMunicipioEEstadoAcao(ticket.municipio_e_estado_acao);
    setBoletimDeOcorrencia(ticket.boletim);
    setDanosMorais(ticket.danos_morais);
    setValorDanosMorais(ticket.valor_danos_morais);
    setBancoBoletoFalso(ticket.banco_boleto_falso);
    setDataVencimentoBoletoFalso(
      formatarDataParaFormatoAmericano(ticket.data_vencimento_boleto_falso)
    );
    setQuantidadeBancos(ticket.quantidade_bancos);
    setInputBancoBoletoFalso(ticket.banco_boleto_falso);
    setInputBancoBoletoVerdadeiro(ticket.banco_boleto_verdadeiro);
    setValorBoletoFalso(ticket.valor_boleto_falso);
    setBancoBoletoVerdadeiro(ticket.banco_boleto_falso);
    setDataVencimentoBoletoVerdadeiro(
      formatarDataParaFormatoAmericano(ticket.data_vencimento_boleto_verdadeiro)
    );
    setValorBoletoVerdadeiro(ticket.valor_boleto_verdadeiro);

    setBankName(ticket.bank_name);
    setContractNumber(ticket.contract_number);
    setAddressClient(ticket.address_client);
    setCityClient(ticket.city_client);

    const banksAPI = await getBancos();

    setBanks(banksAPI);
    setTicket(ticket);
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: "600",
            marginBottom: "30px",
            color: "#00479D",
            borderBottom: "3px solid #006BED",
          }}
        >
          Informações da ação de Fraude em Boletos
        </Typography>
      </Box>

      <Peticao
        ticket={ticket}
        nameClient={nameClient}
        estadoCivil={estadoCivil}
        profissao={profissao}
        cep={cep}
        numero={numero}
        complemento={complemento}
        bairro={bairro}
        cidade={cidade}
        estado={estado}
        regraDominio={regraDominio}
        loading={loading}
        tipoPessoa={tipoPessoa}
        cpf={cpf}
        cnpj={cnpj}
        dataNascimento={dataNascimento}
        rua={rua}
        quantidadeBancos={quantidadeBancos}
        banks={banks}
        inputBancoBoletoFalso={inputBancoBoletoFalso}
        inputBancoBoletoVerdadeiro={inputBancoBoletoVerdadeiro}
        valorBoletoFalso={valorBoletoFalso}
        valorBoletoVerdadeiro={valorBoletoVerdadeiro}
        danosMorais={danosMorais}
        dataVencimentoBoletoFalso={dataVencimentoBoletoFalso}
        dataVencimentoBoletoVerdadeiro={dataVencimentoBoletoVerdadeiro}
        boletimDeOcorrencia={boletimDeOcorrencia}
        municipioEEstadoAcao={municipioEEstadoAcao}
        valorDanosMorais={valorDanosMorais}
        saveAndCreatePetition={() => criarPeticao({
          ticket,
          nameClient,
          tipoPessoa,
          cpf,
          estadoCivil,
          profissao,
          cep,
          rua,
          numero,
          bairro,
          cidade,
          estado,
          cnpj,
          dataNascimento,
          quantidadeBancos,
          boletimDeOcorrencia,
          danosMorais,
          valorDanosMorais,
          inputBancoBoletoVerdadeiro,
          inputBancoBoletoFalso,
          valorBoletoFalso,
          valorBoletoVerdadeiro,
          dataVencimentoBoletoFalso,
          dataVencimentoBoletoVerdadeiro,
          municipioEEstadoAcao,
          getTickets,
          setLoading,
          bancoBoletoFalso
        })}
        setNameClient={setNameClient}
        setEstadoCivil={setEstadoCivil}
        setProfissao={setProfissao}
        setNumero={setNumero}
        setComplemento={setComplemento}
        setBairro={setBairro}
        setCEP={setCEP}
        setCNPJ={setCNPJ}
        setCidade={setCidade}
        setEstado={setEstado}
        ContractValueMemo={ContractValueMemo}
        setBancoBoletoFalso={setBancoBoletoFalso}
        setBancoBoletoVerdadeiro={setBancoBoletoVerdadeiro}
        setBoletimDeOcorrencia={setBoletimDeOcorrencia}
        setCPF={setCPF}
        setDanosMorais={setDanosMorais}
        setDataNascimento={setDataNascimento}
        setDataVencimentoBoletoFalso={setDataVencimentoBoletoFalso}
        setDataVencimentoBoletoVerdadeiro={setDataVencimentoBoletoVerdadeiro}
        setInputBancoBoletoFalso={setInputBancoBoletoFalso}
        setInputBancoBoletoVerdadeiro={setInputBancoBoletoVerdadeiro}
        setMunicipioEEstadoAcao={setMunicipioEEstadoAcao}
        setQuantidadeBancos={setQuantidadeBancos}
        setRua={setRua}
        setValorBoletoFalso={setValorBoletoFalso}
        setValorBoletoVerdadeiro={setValorBoletoVerdadeiro}
        setValorDanosMorais={setValorDanosMorais}
      />

      <Procuracao
        ticket={ticket}
        nameClient={nameClient}
        estadoCivil={estadoCivil}
        profissao={profissao}
        cep={cep}
        numero={numero}
        complemento={complemento}
        bairro={bairro}
        cidade={cidade}
        estado={estado}
        regraDominio={regraDominio}
        loadingProxy={loadingProxy}
        tipoPessoa={tipoPessoa}
        cpf={cpf}
        cnpj={cnpj}
        rua={rua}
        setNameClient={setNameClient}
        setEstado={setEstado}
        setEstadoCivil={setEstadoCivil}
        setProfissao={setProfissao}
        setCEP={setCEP}
        setNumero={setNumero}
        setComplemento={setComplemento}
        setBairro={setBairro}
        setCNPJ={setCNPJ}
        setCPF={setCPF}
        setCidade={setCidade}
        setRua={setRua}
        getTickets={getTickets}
        setLoading={setLoading}
        setLoadingProxy={setLoadingProxy}
      />

      <ContratoHonorarios
        ticket={ticket}
        nameClient={nameClient}
        estadoCivil={estadoCivil}
        profissao={profissao}
        cep={cep}
        numero={numero}
        complemento={complemento}
        bairro={bairro}
        cidade={cidade}
        estado={estado}
        regraDominio={regraDominio}
        loadingContract={loadingContract}
        tipoPessoa={tipoPessoa}
        cpf={cpf}
        cnpj={cnpj}
        rua={rua}
        setNameClient={setNameClient}
        setEstado={setEstado}
        setEstadoCivil={setEstadoCivil}
        setProfissao={setProfissao}
        setCEP={setCEP}
        setNumero={setNumero}
        setComplemento={setComplemento}
        setBairro={setBairro}
        setCNPJ={setCNPJ}
        setCPF={setCPF}
        setCidade={setCidade}
        setRua={setRua}
        setLoading={setLoading}
        setLoadingContract={setLoadingContract}
        setLoadingProxy={setLoadingProxy}
        getTickets={getTickets}
      />

      {ticket.tipo_pessoa === "pf" && (
        <Hipossuficiencia
          ticket={ticket}
          nameClient={nameClient}
          estadoCivil={estadoCivil}
          profissao={profissao}
          cep={cep}
          numero={numero}
          complemento={complemento}
          bairro={bairro}
          cidade={cidade}
          estado={estado}
          regraDominio={regraDominio}
          loadingHipossuficiencia={loadingHipossuficiencia}
          tipoPessoa={tipoPessoa}
          cpf={cpf}
          cnpj={cnpj}
          rua={rua}
          setNameClient={setNameClient}
          setEstado={setEstado}
          setEstadoCivil={setEstadoCivil}
          setProfissao={setProfissao}
          setCEP={setCEP}
          setNumero={setNumero}
          setComplemento={setComplemento}
          setBairro={setBairro}
          setCNPJ={setCNPJ}
          setCPF={setCPF}
          setCidade={setCidade}
          setRua={setRua}
        />
      )}
    </Box>
  );
};

export default Ticket;
