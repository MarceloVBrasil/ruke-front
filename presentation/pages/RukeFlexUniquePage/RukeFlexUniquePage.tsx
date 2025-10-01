'use client'

import { useEffect, useState } from "react";

import {
  Box,
  Typography,
} from "@mui/material";
import { getCnpjData, getAddressByCep, } from "@/app/api/client/outros";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { isCNPJ, isCPF } from "validation-br";
import { formatarDataParaFormatoAmericano } from "@/domain/services/Date";
import Procuracao from "./components/Procuracao/Procuracao";
import ContratoHonorarios from "./components/ContratoHonorarios/ContratoHonorarios";
import Hipossuficiencia from "./components/Hipossuficiencia/Hipossuficiencia";

type TicketProps = {
  ticketUnique: any;
  regraDominio: any
}

const rukeFlexProcuracaoFormSchema = z.object({
  nameClient: z.string().optional(),
  cpfClient: z.string().refine((value) => value ? isCPF(value) : true, { message: "O cpf deve ser válido" }).optional(),
  cnpjClient: z.string().refine((value) => value ? isCNPJ(value) : true, { message: "O cnpj deve ser válido" }).optional(),
  razaoSocial: z.string().optional(),
  escopo: z.string().min(1, { message: "O escopo deve ser informado." }),
  cep: z.string().optional(),
  enderecoCompleto: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  date: z.string().min(1, { message: "A data deve ser informada." }),
  estadoCivil: z.string().optional(),
  profissao: z.string().optional(),
  representanteLegal: z.string().optional(),
})

const rukeFlexContratoFormSchema = z.object({
  nameClient: z.string().optional(),
  cpfClient: z.string().refine((value) => value ? isCPF(value) : true, { message: "O cpf deve ser válido" }).optional(),
  cnpjClient: z.string().refine((value) => value ? isCNPJ(value) : true, { message: "O cnpj deve ser válido" }).optional(),
  razaoSocial: z.string().optional(),
  escopo: z.string().min(1, { message: "O escopo deve ser informado." }),
  enderecoCompleto: z.string().optional(),
  numero: z.string().optional(),
  bairro: z.string().optional(),
  complemento: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  date: z.string().min(1, { message: "A data deve ser informada." }),
  estadoCivil: z.string().optional(),
  profissao: z.string().optional(),
  representanteLegal: z.string().optional(),
  valorMensal: z.string(),
  percentualExito: z.string(),
})

const rukeFlexHipossuficienciaFormSchema = z.object({
  nameClient: z.string().min(1, { message: "O nome do cliente deve ser informado" }),
  cpfClient: z.string().min(1, { message: "O cpf deve ser informado" }).refine((value) => value ? isCPF(value) : true, { message: "O cpf deve ser válido" }),
  enderecoCompleto: z.string().min(1, { message: "O endereço deve ser informado" }),
  date: z.string().min(1, { message: "A data deve ser informada." }),
  estadoCivil: z.string().min(1, { message: "O estado civil deve ser informado" }),
  profissao: z.string().min(1, { message: "A profissão deve ser informada" }),
})


const RukeFlex = ({ ticketUnique, regraDominio }: TicketProps) => {
  const { register: registerProcuracao, handleSubmit: handleSubmitProcuracao, formState: { errors: errorsProcuracao }, reset: resetProcuracao } = useForm({
    resolver: zodResolver(rukeFlexProcuracaoFormSchema)
  });
  const { register: registerContrato, handleSubmit: handleSubmitContrato, formState: { errors: errorsContrato }, reset: resetContrato } = useForm({
    resolver: zodResolver(rukeFlexContratoFormSchema)
  });
  const { register: registerHipossuficiencia, handleSubmit: handleSubmitHipossuficiencia, formState: { errors: errorsHipossuficiencia }, reset: resetHipossuficiencia } = useForm({
    resolver: zodResolver(rukeFlexHipossuficienciaFormSchema)
  });
  const [ticket, setTicket] = useState<any>(ticketUnique);
  const [nameClient, setNameClient] = useState("");
  const [cpfClient, setCPFClient] = useState("");
  const [cnpjClient, setCnpjClient] = useState("");
  const [valorMensal, setValorMensal] = useState('');
  const [razaoSocial, setRazaoSocial] = useState("");
  const [escopo, setEscopo] = useState('');
  const [cep, setCep] = useState('');
  const [enderecoCompleto, setEnderecoCompleto] = useState("");
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [complemento, setComplemento] = useState('');
  const [date, setDate] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [profissao, setProfissao] = useState('');
  const [representanteLegal, setRepresentanteLegal] = useState('');
  const [percentualExito, setPercentualExito] = useState('');
  const [personChoose, setPersonChoose] = useState<'juridica' | 'fisica'>(ticketUnique.tipo_cliente === 'pf' ? 'fisica' : 'juridica');
  const [loadingContract, setLoadingContract] = useState(false);
  const [loadingProxy, setLoadingProxy] = useState(false);
  const [loadingHipossuficiencia, setLoadingHipossuficiencia] = useState(false);

  useEffect(() => {
    getRukeFlexTickets(ticketUnique);
  }, []);


  const handleChangeCep = async () => {
    if (cep.replace('-', '').length === 8) {
      try {
        const data = await getAddressByCep(cep.replace('-', ''));
        setEnderecoCompleto(data.logradouro);
        setEstado(data.uf);
        setBairro(data.bairro);
        setCidade(data.localidade);
      } catch (error) {
        console.error('Error fetching data:');
      }
    }
  };
  useEffect(() => {
    handleChangeCep();
  }, [cep])

  const [formDataCnpj, setFormDataCnpj] = useState({
    nome: '',
    email: '',
    telefone: '',
    logradouro: '',
    ni: '',
    tipoEstabelecimento: '',
    nome_empresarial: '',
    nome_fantasia: '',
    razao_social: '',
  });

  const handleChangeCnpj = async () => {
    if (cnpjClient.replace(/\D/g, '').length === 14) {
      try {
        const data = await getCnpjData(cnpjClient.replace(/\D/g, ''));

        setEnderecoCompleto(data.logradouro)
        setEstado(data.uf)
        setBairro(data.bairro)
        setCidade(data.localidade);
        setRazaoSocial(data.razao_social)

        setFormDataCnpj({
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          logradouro: data.logradouro,
          ni: data.ni || '',
          razao_social: data.razao_social || '',
          tipoEstabelecimento: data.tipoEstabelecimento || '',
          nome_empresarial: data.nome_empresarial || '',
          nome_fantasia: data.nome_fantasia || '',
        });
      } catch (error) {
        console.error('Erro ao buscar dados do CNPJ:', error);
      }
    }
  };

  useEffect(() => {
    handleChangeCnpj();
  }, [cnpjClient]);

  const getRukeFlexTickets = async (ticket: any) => {
    resetProcuracao();
    resetContrato();
    resetHipossuficiencia();
    setNameClient(ticket.nome_cliente || '');
    setCPFClient(ticket.cpf_cliente || '');
    setCep(ticket.cep || '');
    setEnderecoCompleto(ticket.endereco || '');
    setBairro(ticket.bairro || '');
    setComplemento(ticket.complemento || '')
    setCidade(ticket.cidade || '');
    setEstado(ticket.estado || '');
    setNumero(ticket.numero || '');
    setCnpjClient(ticket.cnpj || '');
    setValorMensal(ticket.valor_mensal || '');
    setPercentualExito(ticket.percentual_exito || '')
    setEscopo(ticket.escopo || '');
    setRazaoSocial(ticket.razao_social || '');
    setRepresentanteLegal(ticket.representante_legal || '');
    setPersonChoose(ticket.tipo_cliente === 'pj' ? 'juridica' : 'fisica');
    setEstadoCivil(ticket.estado_civil || '');
    setProfissao(ticket.profissao || '');
    setDate(formatarDataParaFormatoAmericano(ticket.data) || '');
    setTicket(ticket);

    setFormDataCnpj({
      ...formDataCnpj,
      logradouro: ticket.endereco,
      razao_social: ticket.razao_social
    });


  };

  return (
    <Box sx={{ maxWidth: '100vw', padding: '5px', borderRadius: '10px', margin: '10px', }}>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ fontSize: '27px', fontWeight: '600', marginBottom: '30px', color: '#00479D', borderBottom: '3px solid #006BED' }}>
          Informação do Ticket
        </Typography>
      </Box>

      <Procuracao
        ticket={ticket}
        errorsProcuracao={errorsProcuracao}
        errorsContrato={errorsContrato}
        enderecoCompleto={enderecoCompleto}
        escopo={escopo}
        estado={estado}
        estadoCivil={estadoCivil}
        cep={cep}
        cidade={cidade}
        cnpjClient={cnpjClient}
        complemento={complemento}
        cpfClient={cpfClient}
        bairro={bairro}
        personChoose={personChoose}
        profissao={profissao}
        nameClient={nameClient}
        numero={numero}
        date={date}
        razaoSocial={razaoSocial}
        representanteLegal={representanteLegal}
        loadingProxy={loadingProxy}
        formDataCnpj={formDataCnpj}
        regraDominio={regraDominio}
        registerContrato={registerContrato}
        registerProcuracao={registerProcuracao}
        resetProcuracao={resetProcuracao}
        resetContrato={resetContrato}
        handleSubmitProcuracao={handleSubmitProcuracao}
        setBairro={setBairro}
        setCPFClient={setCPFClient}
        setCep={setCep}
        setCidade={setCidade}
        setCnpjClient={setCnpjClient}
        setComplemento={setComplemento}
        setDate={setDate}
        setEnderecoCompleto={setEnderecoCompleto}
        setEscopo={setEscopo}
        setEstado={setEstado}
        setEstadoCivil={setEstadoCivil}
        setNameClient={setNameClient}
        setNumero={setNumero}
        setProfissao={setProfissao}
        setRazaoSocial={setRazaoSocial}
        setRepresentanteLegal={setRepresentanteLegal}
        getRukeFlexTickets={getRukeFlexTickets}
        setLoadingProxy={setLoadingProxy}
      />

      <ContratoHonorarios
        ticket={ticket}
        errorsContrato={errorsContrato}
        enderecoCompleto={enderecoCompleto}
        escopo={escopo}
        estado={estado}
        estadoCivil={estadoCivil}
        cep={cep}
        cidade={cidade}
        cnpjClient={cnpjClient}
        complemento={complemento}
        cpfClient={cpfClient}
        bairro={bairro}
        personChoose={personChoose}
        profissao={profissao}
        nameClient={nameClient}
        numero={numero}
        date={date}
        razaoSocial={razaoSocial}
        representanteLegal={representanteLegal}
        loadingContract={loadingContract}
        percentualExito={percentualExito}
        valorMensal={valorMensal}
        regraDominio={regraDominio}
        setValorMensal={setValorMensal}
        setPercentualExito={setPercentualExito}
        registerContrato={registerContrato}
        resetProcuracao={resetProcuracao}
        resetContrato={resetContrato}
        handleSubmitContrato={handleSubmitContrato}
        setBairro={setBairro}
        setCPFClient={setCPFClient}
        setCep={setCep}
        setCidade={setCidade}
        setCnpjClient={setCnpjClient}
        setComplemento={setComplemento}
        setDate={setDate}
        setEnderecoCompleto={setEnderecoCompleto}
        setEscopo={setEscopo}
        setEstado={setEstado}
        setEstadoCivil={setEstadoCivil}
        setNameClient={setNameClient}
        setNumero={setNumero}
        setProfissao={setProfissao}
        setRazaoSocial={setRazaoSocial}
        setRepresentanteLegal={setRepresentanteLegal}
        setLoadingContract={setLoadingContract}
        getRukeFlexTickets={getRukeFlexTickets}
      />

      {personChoose === 'fisica' &&
        <Hipossuficiencia
          ticket={ticket}
          enderecoCompleto={enderecoCompleto}
          estadoCivil={estadoCivil}
          cpfClient={cpfClient}
          profissao={profissao}
          nameClient={nameClient}
          date={date}
          regraDominio={regraDominio}
          errorsHipossuficiencia={errorsHipossuficiencia}
          loadingHipossuficiencia={loadingHipossuficiencia}
          personChoose={personChoose}
          numero={numero}
          cep={cep}
          cidade={cidade}
          cnpjClient={cnpjClient}
          complemento={complemento}
          percentualExito={percentualExito}
          escopo={escopo}
          bairro={bairro}
          estado={estado}
          razaoSocial={razaoSocial}
          representanteLegal={representanteLegal}
          valorMensal={valorMensal}
          setValorMensal={setValorMensal}
          setPercentualExito={setPercentualExito}
          setCPFClient={setCPFClient}
          setDate={setDate}
          setEnderecoCompleto={setEnderecoCompleto}
          setEstadoCivil={setEstadoCivil}
          setNameClient={setNameClient}
          setProfissao={setProfissao}
          handleSubmitHipossuficiencia={handleSubmitHipossuficiencia}
          registerHipossuficiencia={registerHipossuficiencia}
          resetHipossuficiencia={resetHipossuficiencia}
          setLoadingHipossuficiencia={setLoadingHipossuficiencia}
          getRukeFlexTickets={getRukeFlexTickets}
        />
      }


    </Box>
  )
}

export default RukeFlex;