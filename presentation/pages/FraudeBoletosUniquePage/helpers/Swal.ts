import {
    createHipossuficienciaFraudeBoletos,
    criarContratoFraudeBoletos,
    criarPeticaoFraudeBoletos,
    criarProcuracaoFraudeBoleto,
} from "@/app/api/client/fraudeboleto";
import { getFraudeBoletoById } from "@/app/api/server/fraudeboleto";
import { formatarDataParaFormatoBr } from "@/domain/services/Date";
import Swal from "sweetalert2";

export const criarProcuracao = async (props: {
    idTicket: string,
    ticket: any,
    nameClient: string,
    tipoPessoa: string,
    cpf: string,
    estadoCivil: string,
    profissao: string,
    cep: string,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    cnpj: string,
    setLoadingProxy: (value: boolean) => void,
    setLoading: (value: boolean) => void,
    getTickets: (value: any) => any

}) => {
    const {
        idTicket,
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
        setLoadingProxy,
        setLoading,
        getTickets,
    } = props

    try {
        setLoadingProxy(true);

        const adicionarProcuracao: any = {};
        adicionarProcuracao.nome_cliente = nameClient;
        if (
            tipoPessoa === "pf" &&
            nameClient &&
            cpf &&
            estadoCivil &&
            profissao
        ) {
            adicionarProcuracao.cpf = cpf;
            adicionarProcuracao.estado_civil = estadoCivil;
            adicionarProcuracao.profissao = profissao;
        } else {
            if (tipoPessoa !== "pj") {
                throw "Preencha todos os campos obrigatórios!";
            }
        }

        if (tipoPessoa === "pj" && !cnpj) {

            throw "O CNPJ é obrigatório!";
        } else if (tipoPessoa === "pj") adicionarProcuracao.cnpj = cnpj

        if (cep && rua && numero && bairro && cidade && estado) {
            adicionarProcuracao.cep = cep;
            adicionarProcuracao.rua = rua;
            adicionarProcuracao.numero = numero;
            adicionarProcuracao.bairro = bairro;
            adicionarProcuracao.cidade = cidade;
            adicionarProcuracao.estado = estado;
        } else {
            throw "Preencha todos os campos obrigatório de endereço!";
        }

        const response = await criarProcuracaoFraudeBoleto(
            idTicket,
            adicionarProcuracao
        );

        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: response.error,
            });
            setLoading(false);
            setLoadingProxy(false);
        } else {
            await getTickets(await getFraudeBoletoById(ticket.id));
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Procuração gerada com sucesso!",
            });
        }

        setLoadingProxy(false);
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response ? error.response.data.error : error,
        });
        setLoading(false);
        setLoadingProxy(false);
    }
};

export const criarContrato = async (props: {
    idTicket: string,
    ticket: any,
    nameClient: string,
    tipoPessoa: string,
    cpf: string,
    estadoCivil: string,
    profissao: string,
    cep: string,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    cnpj: string,
    setLoadingContract: (value: boolean) => void,
    setLoadingProxy: (value: boolean) => void,
    setLoading: (value: boolean) => void,
    getTickets: (value: any) => any

}) => {
    const {
        idTicket,
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
        setLoadingContract,
        setLoadingProxy,
        setLoading,
        getTickets,
    } = props

    try {
        setLoadingContract(true);

        const adicionarContrato: any = {};
        adicionarContrato.nome_cliente = nameClient;
        if (
            tipoPessoa === "pf" &&
            nameClient &&
            cpf &&
            estadoCivil &&
            profissao
        ) {
            adicionarContrato.cpf = cpf;
            adicionarContrato.estado_civil = estadoCivil;
            adicionarContrato.profissao = profissao;
        } else {
            if (tipoPessoa !== "pj") {
                throw "Preencha todos os campos obrigatórios!";
            }
        }

        if (tipoPessoa === "pj" && !cnpj) {
            throw "O CNPJ é obrigatório!";
        }

        if (cep && rua && numero && bairro && cidade && estado) {
            adicionarContrato.cep = cep;
            adicionarContrato.rua = rua;
            adicionarContrato.numero = numero;
            adicionarContrato.bairro = bairro;
            adicionarContrato.cidade = cidade;
            adicionarContrato.estado = estado;
        } else {
            throw "Preencha todos os campos obrigatório de endereço!";
        }

        const response = await criarContratoFraudeBoletos(
            idTicket,
            adicionarContrato
        );

        if (response.error) {
            setLoadingContract(false);
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: response.error,
            });
        } else {
            await getTickets(await getFraudeBoletoById(ticket.id));

            setLoadingContract(false);
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Contrato gerado com sucesso!",
            });
        }
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response ? error.response.data.error : error,
        });
        setLoading(false);
        setLoadingProxy(false);
    }
};

export const criarHipossuficiencia = async (props: {
    idTicket: string,
    ticket: any,
    nameClient: string,
    tipoPessoa: string,
    cpf: string,
    estadoCivil: string,
    profissao: string,
    cep: string,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    cnpj: string,
    setLoadingHipossuficiencia: (value: boolean) => void,
    setLoadingProxy: (value: boolean) => void,
    setLoading: (value: boolean) => void,
    getTickets: (value: any) => any

}) => {
    const {
        idTicket,
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
        setLoadingHipossuficiencia,
        setLoadingProxy,
        setLoading,
        getTickets,
    } = props

    try {
        setLoadingHipossuficiencia(true);

        const adicionarHipossuficiencia: any = {};
        adicionarHipossuficiencia.nome_cliente = nameClient;
        if (
            tipoPessoa === "pf" &&
            nameClient &&
            cpf &&
            estadoCivil &&
            profissao
        ) {
            adicionarHipossuficiencia.cpf = cpf;
            adicionarHipossuficiencia.estado_civil = estadoCivil;
            adicionarHipossuficiencia.profissao = profissao;
        } else {
            if (tipoPessoa !== "pj") {
                throw "Preencha todos os campos obrigatórios!";
            }
        }

        if (tipoPessoa === "pj" && !cnpj) {
            throw "O CNPJ é obrigatório!";
        }

        if (cep && rua && numero && bairro && cidade && estado) {
            adicionarHipossuficiencia.cep = cep;
            adicionarHipossuficiencia.rua = rua;
            adicionarHipossuficiencia.numero = numero;
            adicionarHipossuficiencia.bairro = bairro;
            adicionarHipossuficiencia.cidade = cidade;
            adicionarHipossuficiencia.estado = estado;
        } else {
            throw "Preencha todos os campos obrigatório de endereço!";
        }

        const response = await createHipossuficienciaFraudeBoletos(
            idTicket,
            adicionarHipossuficiencia
        );

        if (response.error) {
            setLoadingHipossuficiencia(false);
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: response.error,
            });
        } else {
            await getTickets(await getFraudeBoletoById(ticket.id));

            setLoadingHipossuficiencia(false);
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Declaração de hipossuficiencia gerada com sucesso!",
            });
        }
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response ? error.response.data.error : error,
        });
        setLoadingHipossuficiencia(false);
    }
};

export const criarPeticao = async (props: {
    ticket: any,
    nameClient: string,
    tipoPessoa: string,
    cpf: string,
    estadoCivil: string,
    profissao: string,
    cep: string,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    cnpj: string,
    dataNascimento: string,
    quantidadeBancos: string,
    boletimDeOcorrencia: string,
    danosMorais: string,
    valorDanosMorais: string,
    inputBancoBoletoVerdadeiro: string,
    inputBancoBoletoFalso: string,
    valorBoletoFalso: string,
    valorBoletoVerdadeiro: string,
    dataVencimentoBoletoFalso: string,
    dataVencimentoBoletoVerdadeiro: string,
    municipioEEstadoAcao: string,
    bancoBoletoFalso: string,
    setLoading: (value: boolean) => void,
    getTickets: (value: any) => any

}) => {
    const {
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
        bancoBoletoFalso,
        setLoading,
        getTickets,
    } = props

    setLoading(true);
    try {
        const adicionarPeticao: any = {};
        adicionarPeticao.nome_cliente = nameClient;
        if (
            tipoPessoa === "pf" &&
            nameClient &&
            cpf &&
            dataNascimento &&
            estadoCivil &&
            profissao
        ) {
            adicionarPeticao.cpf = cpf;
            adicionarPeticao.data_nascimento =
                formatarDataParaFormatoBr(dataNascimento);
            adicionarPeticao.estado_civil = estadoCivil;
            adicionarPeticao.profissao = profissao;
        } else {
            if (tipoPessoa !== "pj") {
                throw "Preencha todos os campos obrigatorios!";
            }
        }

        if (tipoPessoa === "pj" && !cnpj) {
            throw "O CNPJ é obrigatório!";
        } else if (tipoPessoa == "pj") adicionarPeticao.cnpj = cnpj

        if (cep && rua && numero && bairro && cidade && estado) {
            adicionarPeticao.cep = cep;
            adicionarPeticao.rua = rua;
            adicionarPeticao.numero = numero;
            adicionarPeticao.bairro = bairro;
            adicionarPeticao.cidade = cidade;
            adicionarPeticao.estado = estado;
        } else {
            throw "Preencha todos os campos obrigatório de endereço!";
        }

        if (!quantidadeBancos) {
            throw "É obrigatório informar se irá adicionar ou não a instituição bancária emissora do boleto original!";
        }

        adicionarPeticao.quantidade_bancos = quantidadeBancos;

        if (!boletimDeOcorrencia) {
            throw "É obrigatório informar se foi confeccionado ou não um boletim de ocorrência!";
        }

        adicionarPeticao.boletim = boletimDeOcorrencia;

        if (!danosMorais) {
            throw "É obrigatório informar se quer incluir um pedido de danos morais.";
        }

        adicionarPeticao.danos_morais = danosMorais;

        if (
            danosMorais === "true" &&
            (!valorDanosMorais || valorDanosMorais.length === 0)
        ) {
            throw "É obrigatório informar o valor dos danos morais.";
        }

        adicionarPeticao.valor_danos_morais = valorDanosMorais;

        if (
            quantidadeBancos === "2" &&
            (!inputBancoBoletoVerdadeiro ||
                !inputBancoBoletoFalso ||
                !valorBoletoFalso ||
                !valorBoletoVerdadeiro ||
                !dataVencimentoBoletoFalso ||
                !dataVencimentoBoletoVerdadeiro)
        ) {
            throw "Se você escolher adicionar também a instituição bancária emissora do boleto original deve preencher todos os dados sobre o boleto original e o boleto falso! Por favor, preencha todos os campos obrigatórios!";
        }

        if (quantidadeBancos === "2") {
            adicionarPeticao.valor_boleto_verdadeiro = valorBoletoVerdadeiro
                .replace("R$", "")
                .trim();
        }

        if (!municipioEEstadoAcao) {
            throw "É obrigatório informar o munípio e estado onde você quer propor a ação.";
        }

        adicionarPeticao.municipio_e_estado_acao = municipioEEstadoAcao;

        if (
            quantidadeBancos === "1" &&
            (!bancoBoletoFalso || !valorBoletoFalso || !dataVencimentoBoletoFalso)
        ) {
            throw "Por favor, preencha todos os dados obrigatórios do banco emissor do boleto falso!";
        }

        adicionarPeticao.banco_boleto_falso = inputBancoBoletoFalso;

        adicionarPeticao.banco_boleto_verdadeiro = inputBancoBoletoVerdadeiro;
        adicionarPeticao.valor_boleto_falso = valorBoletoFalso
            .replace("R$", "")
            .trim();

        adicionarPeticao.data_vencimento_boleto_falso = formatarDataParaFormatoBr(
            dataVencimentoBoletoFalso
        );

        adicionarPeticao.data_vencimento_boleto_verdadeiro =
            formatarDataParaFormatoBr(dataVencimentoBoletoVerdadeiro);

        const response = await criarPeticaoFraudeBoletos(
            ticket.id,
            adicionarPeticao
        );
        if (response.error) {
            throw response.error;
        } else {
            const ticketEdited = await getFraudeBoletoById(ticket.id);
            if (ticketEdited) {
                await getTickets(ticketEdited);
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    title: "Sucesso!",
                    text: "Petição gerada com sucesso.",
                });
            }
        }

    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response ? error.response.data.error : error,

        });
        setLoading(false);
    }
};