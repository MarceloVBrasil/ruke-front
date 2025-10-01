import {
    rukeFlexcreateContract,
    rukeFlexcreateHipossuficiencia,
    rukeFlexcreateProxy
} from "@/app/api/client/rukeflex";
import { getRukeFlexTicketById } from "@/app/api/server/rukeflex";
import { formatarDataParaFormatoBr } from "@/domain/services/Date";
import Swal from "sweetalert2";

export const criarRukeFlexProx = async (props: {
    ticket: any,
    nameClient: string,
    cpfClient: string,
    cnpjClient: string,
    formDataCnpj: any,
    cep: string,
    enderecoCompleto: string,
    numero: string,
    bairro: string,
    complemento: string,
    cidade: string,
    estado: string,
    representanteLegal: string,
    date: string,
    estadoCivil: string,
    profissao: string,
    personChoose: string,
    escopo: string,
    setLoadingProxy: (value: boolean) => void,
    getRukeFlexTickets: (value: any) => any,
}) => {
    const {
        ticket,
        nameClient,
        cpfClient,
        cnpjClient,
        formDataCnpj,
        cep,
        enderecoCompleto,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
        representanteLegal,
        date,
        estadoCivil,
        profissao,
        personChoose,
        escopo,
        setLoadingProxy,
        getRukeFlexTickets
    } = props
    try {
        setLoadingProxy(true);
        const response = await rukeFlexcreateProxy(
            ticket.id,
            nameClient,
            cpfClient,
            cnpjClient,
            formDataCnpj.razao_social,
            cep,
            enderecoCompleto,
            numero,
            bairro,
            complemento,
            cidade,
            estado,
            representanteLegal,
            formatarDataParaFormatoBr(date) || '',
            estadoCivil,
            profissao,
            personChoose === 'juridica' ? 'pj' : 'pf',
            escopo
        );


        if (response.error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: response.error
            })

            setLoadingProxy(false);
        } else {
            await getRukeFlexTickets(await getRukeFlexTicketById(ticket.id));

            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'petição gerada com sucesso.'
            });
        }

        setLoadingProxy(false);
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.response.data.error
        })
        setLoadingProxy(false);
    }
};

export const criarContrato = async (props: {
    ticket: any,
    nameClient: string,
    cpfClient: string,
    cnpjClient: string,
    cep: string,
    enderecoCompleto: string,
    numero: string,
    bairro: string,
    complemento: string,
    cidade: string,
    estado: string,
    representanteLegal: string,
    date: string,
    estadoCivil: string,
    profissao: string,
    personChoose: string,
    escopo: string,
    razaoSocial: string,
    percentualExito: string,
    valorMensal: string,
    setLoadingContract: (value: boolean) => void,
    getRukeFlexTickets: (value: any) => any,
}) => {
    const {
        ticket,
        nameClient,
        cpfClient,
        cnpjClient,
        cep,
        enderecoCompleto,
        numero,
        bairro,
        complemento,
        cidade,
        estado,
        representanteLegal,
        date,
        estadoCivil,
        profissao,
        personChoose,
        escopo,
        razaoSocial,
        percentualExito,
        valorMensal,
        setLoadingContract,
        getRukeFlexTickets
    } = props

    try {
        setLoadingContract(true);
        const response = await rukeFlexcreateContract(
            ticket.id,
            nameClient,
            cpfClient,
            cnpjClient,
            razaoSocial,
            cep,
            representanteLegal,
            estadoCivil,
            profissao,
            enderecoCompleto,
            numero,
            bairro,
            complemento,
            cidade,
            estado,
            percentualExito,
            formatarDataParaFormatoBr(date) || '',
            personChoose === 'juridica' ? 'pj' : 'pf',
            valorMensal,
            escopo,
        );
        if (response.error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: response.error
            })

        } else {
            await getRukeFlexTickets(await getRukeFlexTicketById(ticket.id));

            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'contrato gerado com sucesso.'
            });
        }
        setLoadingContract(false);
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.response.data.error
        })

        setLoadingContract(false);
    }
}

export const criarHipossuficiencia = async (props: {
    ticket: any,
    nameClient: string,
    cpfClient: string,
    cnpjClient: string,
    cep: string,
    enderecoCompleto: string,
    numero: string,
    bairro: string,
    complemento: string,
    cidade: string,
    estado: string,
    representanteLegal: string,
    date: string,
    estadoCivil: string,
    profissao: string,
    personChoose: string,
    escopo: string,
    razaoSocial: string,
    percentualExito: string,
    valorMensal: string,
    setLoadingHipossuficiencia: (value: boolean) => void,
    getRukeFlexTickets: (value: any) => any,
}) => {
    const {
        ticket,
        nameClient,
        cpfClient,
        enderecoCompleto,
        date,
        estadoCivil,
        profissao,
        setLoadingHipossuficiencia,
        getRukeFlexTickets
    } = props

    try {
        setLoadingHipossuficiencia(true);
        const response = await rukeFlexcreateHipossuficiencia(
            ticket.id,
            nameClient,
            cpfClient,
            enderecoCompleto,
            estadoCivil,
            profissao,
            formatarDataParaFormatoBr(date) || ''
        );
        if (response.error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: response.error
            })
        } else {
            await getRukeFlexTickets(await getRukeFlexTicketById(ticket.id));

            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'hipossuficiência gerada com sucesso.'
            });
        }

        setLoadingHipossuficiencia(false);
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.response.data.error
        })

        setLoadingHipossuficiencia(false);
    }
}