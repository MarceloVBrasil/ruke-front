"use client";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import {
  Box,
  Typography,
} from "@mui/material";

import Peticao from "./components/Peticao/Peticao";
import Procuracao from "./components/Procuracao/Procuracao";
import ContratoHonorarios from "./components/ContratoHonorarios/ContratoHonorarios";
import Hipossuficiencia from "./components/Hipossuficiencia/Hipossuficiencia";
import { criarProxy, saveAndCreatePetition } from "./helpers/Swal";

// ==============================|| SAMPLE PAGE ||============================== //

type TicketProps = {
  ticketUnique: any;
  regraDominio: any;
};

const Ticket = ({ ticketUnique, regraDominio }: TicketProps) => {
  const [ticket, setTicket] = useState<any>(ticketUnique);

  const [nameClient, setNameClient] = useState("");
  const [calculationBase, setCalculationBase] = useState("");
  const [committedValue, setCommittedValue] = useState("");
  const [bankName, setBankName] = useState("");
  const [cpfClient, setCPFClient] = useState("");
  const [contractNumber, setContractNumber] = useState("");
  const [addressClient, setAddressClient] = useState("");
  const [cityClient, setCityClient] = useState("");
  const [banks, setBanks] = useState([]);
  const [inclusionDate, setInclusionDate] = useState("");
  const [bank, setBank] = useState("");
  const [inputBank, setInputBank] = useState("");
  const [installmentValue, setInstallmentValue] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [typeProcess, setTypeProcess] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingContract, setLoadingContract] = useState(false);
  const [loadingProxy, setLoadingProxy] = useState(false);
  const [loadingHipossuficiencia, setLoadingHipossuficiencia] = useState(false);

  useEffect(() => {
    getTickets(ticketUnique);
  }, []);

  const getTickets = async (ticket: any) => {
    setNameClient(ticket.name_client);
    setCalculationBase(
      formatarValorParaMoedaBrasileira(ticket.calculation_base)
    );
    setCommittedValue(
      ticket.committed_value ? ticket.committed_value.replace(".", ",") : ""
    );

    setBankName(ticket.bank_name);
    setContractNumber(ticket.contract_number);
    setInstallmentValue(String(ticket.installment_value).replace(".", ","));
    setCPFClient(ticket.cpf_client);
    setAddressClient(ticket.address_client);
    setCityClient(ticket.city_client);
    setContractValue(ticket.contract_value);
    setInclusionDate(ticket.inclusion_date);
    setTypeProcess(ticket.type_process || "aposentada");

    const banksAPI = await axios.get(
      `https://olinda.bcb.gov.br/olinda/servico/Instituicoes_em_funcionamento/versao/v1/odata/SedesBancoComMultCE?%24format=json`
    );

    function searchBanks(bancoProcurado: string, enderecos: string[]) {
      if (bancoProcurado && enderecos) {
        let nomeBancoProcurado = bancoProcurado
          .replace(/BANCO|S\.?A\.?|SA|\d+|\-|\s+/g, "")
          .trim();

        enderecos.forEach((endereco: any) => {
          let regex = /BANCO\s+(.*?)\s+(S\.?A\.?|SA)/;

          let match = endereco.NOME_INSTITUICAO.match(regex);
          let nomeBancoEndereco = match ? match[1].replace(/\s+/g, " ") : null;

          if (
            nomeBancoEndereco &&
            nomeBancoProcurado.includes(nomeBancoEndereco)
          ) {
            setInputBank(
              `${endereco.NOME_INSTITUICAO}, ${endereco.CEP}, ${endereco.UF}, ${endereco.BAIRRO}, ${endereco.ENDERECO} - ${endereco.COMPLEMENTO} `
            );
          }
        });
      }
    }

    searchBanks(ticket.bank_name, banksAPI.data.value);
    setBanks(banksAPI.data.value);
    setTicket(ticket);
  };

  const CurrencyInput = (props: any) => {
    const currencyMask = createNumberMask({
      prefix: "R$ ",
      includeThousandsSeparator: true,
      thousandsSeparatorSymbol: ".",
      allowDecimal: true,
      decimalSymbol: ",",
      requireDecimal: false, // NÃ£o exigir casas decimais
      decimalLimit: 2, // Quantparams.idade de casas decimais
      allowNegative: false,
    });

    return <MaskedInput mask={currencyMask} {...props} />;
  };

  const ContractValueMemo = useMemo(() => CurrencyInput, []);

  const formatarValorParaMoedaBrasileira = (valor: string) => {
    const valorFormatado = Number(valor).toFixed(2);
    return `R$ ${valorFormatado.replace(".", ",")}`;
  };

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
            fontSize: "30px",
            fontWeight: "600",
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
        nameClient={nameClient}
        cpfClient={cpfClient}
        regraDominio={regraDominio}
        calculationBase={calculationBase}
        installmentValue={installmentValue}
        committedValue={committedValue}
        contractValue={contractValue}
        inclusionDate={inclusionDate}
        banks={banks}
        inputBank={inputBank}
        contractNumber={contractNumber}
        addressClient={addressClient}
        cityClient={cityClient}
        typeProcess={typeProcess}
        loading={loading}
        setNameClient={setNameClient}
        setCPFClient={setCPFClient}
        setCalculationBase={setCalculationBase}
        setInstallmentValue={setInstallmentValue}
        ContractValueMemo={ContractValueMemo}
        setCommittedValue={setCommittedValue}
        setContractValue={setContractValue}
        setInclusionDate={setInclusionDate}
        setInputBank={setInputBank}
        setBank={setBank}
        setContractNumber={setContractNumber}
        setAddressClient={setAddressClient}
        setCityClient={setCityClient}
        setTypeProcess={setTypeProcess}
        saveAndCreatePetition={() => saveAndCreatePetition({
          ticket,
          nameClient,
          calculationBase,
          cityClient,
          committedValue,
          contractNumber,
          contractValue,
          cpfClient,
          setLoading,
          getTickets,
          addressClient,
          typeProcess,
          installmentValue,
          inclusionDate,
          inputBank
        })}
      />

      <Procuracao
        ticket={ticket}
        nameClient={nameClient}
        cpfClient={cpfClient}
        regraDominio={regraDominio}
        addressClient={addressClient}
        loadingProxy={loadingProxy}
        setNameClient={setNameClient}
        setCPFClient={setCPFClient}
        setAddressClient={setAddressClient}
        criarProxy={() => criarProxy({
          ticket,
          id_do_ticket: ticket.id,
          nameClient,
          cpfClient,
          addressClient,
          setLoading,
          setLoadingProxy,
          getTickets
        })}
      />

      <ContratoHonorarios
        ticket={ticket}
        nameClient={nameClient}
        cpfClient={cpfClient}
        regraDominio={regraDominio}
        banks={banks}
        inputBank={inputBank}
        addressClient={addressClient}
        loadingContract={loadingContract}
        setNameClient={setNameClient}
        setCPFClient={setCPFClient}
        setInputBank={setInputBank}
        setBank={setBank}
        setAddressClient={setAddressClient}
        setLoading={setLoading}
        setLoadingContract={setLoadingContract}
        getTickets={getTickets}
      />

      <Hipossuficiencia
        ticket={ticket}
        nameClient={nameClient}
        cpfClient={cpfClient}
        regraDominio={regraDominio}
        banks={banks}
        addressClient={addressClient}
        inputBank={inputBank}
        loadingHipossuficiencia={loadingHipossuficiencia}
        setNameClient={setNameClient}
        setCPFClient={setCPFClient}
        setInputBank={setInputBank}
        setBank={setBank}
        setAddressClient={setAddressClient}
        getTickets={getTickets}
        setLoading={setLoading}
        setLoadingHipossuficiencia={setLoadingHipossuficiencia}
      />

    </Box>
  );
};

export default Ticket;
