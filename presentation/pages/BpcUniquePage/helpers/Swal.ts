import {
    gerarBpcContrato,
    gerarBpcHipossuficiencia,
    gerarBpcPeticao,
    gerarBpcProcuracao,
} from "@/app/api/client/bpc";
import { getBpcTicketById } from "@/app/api/server/bpc";
import { formatarDataParaFormatoBr } from "@/domain/services/Date";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

export const criarBpcProcuracao = async (props: {
    setLoadingProxy: (value: boolean) => void,
    getBpcTickets: (ticket: any) => void,
    ticket: any,
    nameClient: string,
    estadoCivil: string,
    profissao: string,
    cpfClient: string,
    enderecoCompleto: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
    complemento: string,
    date: string
}) => {
    const {
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
        date
    } = props

    try {
        setLoadingProxy(true);
        const response = await gerarBpcProcuracao(ticket.id, {
            nome_cliente: nameClient,
            estado_civil: estadoCivil,
            profissao: profissao,
            cpf_cliente: cpfClient,
            endereco: enderecoCompleto,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            cep: cep,
            complemento: complemento,
            data: formatarDataParaFormatoBr(date) || "",
        });

        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: response.error,
            });
            setLoadingProxy(false);
        } else {
            const ticketEdited = await getBpcTicketById(ticket.id);
            await getBpcTickets(ticketEdited);
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Procuração gerada com sucesso.",
            });
        }

        setLoadingProxy(false);
    } catch (error: any) {

        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
        setLoadingProxy(false);
    }
};

export const criarPeticao = async (props: {
    ticket: any,
    nameClient: string,
    estadoCivil: string,
    profissao: string,
    rendaParteAutora: string,
    fonteDeRendaParteAutora: string,
    cpfClient: string,
    rgClient: string,
    enderecoCompleto: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
    complemento: string,
    dataRequerimento: string,
    numeroBeneficio: string,
    dataNascimentoAutora: string,
    idadeClienteAutora: string,
    secaoJudiciariaEstado: string,
    pessoas: any[],
    doencas: string[],
    setLoading: (value: boolean) => void,
    verificarInformacoesObrigatoriasPessoas: () => any,
    getBpcTickets: (ticket: any) => void
}) => {
    const {
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
    } = props

    try {
        setLoading(true);
        if (verificarInformacoesObrigatoriasPessoas()) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Há pessoas que não foram preenchidas as informações obrigatórias, verifique e tente novamente.",
            });
            setLoading(false);

            return;
        }
        await gerarBpcPeticao(ticket.id, {
            nome_cliente: nameClient,
            estado_civil: estadoCivil,
            profissao: profissao,
            renda_parte_autora: rendaParteAutora.replace("R$", "").trim(),
            fonte_renda_parte_autora: fonteDeRendaParteAutora
                .replace("R$", "")
                .trim(),
            cpf_cliente: cpfClient,
            rg_cliente: rgClient,
            endereco: enderecoCompleto,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            cep: cep,
            complemento: complemento,
            data_requerimento: formatarDataParaFormatoBr(dataRequerimento) || "",
            numero_beneficio: numeroBeneficio,
            data_nascimento_cliente_parte_autora:
                formatarDataParaFormatoBr(dataNascimentoAutora) || "",
            idade_cliente_parte_autora: idadeClienteAutora,
            secao_judiciaria_estado: secaoJudiciariaEstado,
            pessoas: pessoas.map((pessoa) => {
                delete pessoa.id;
                pessoa.data_nascimento = formatarDataParaFormatoBr(
                    pessoa.data_nascimento
                );
                return pessoa;
            }),
            doencas: doencas,
        });

        const ticketEdited = await getBpcTicketById(ticket.id);
        if (ticketEdited) {
            getBpcTickets(ticketEdited);
            setLoading(false);

            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Petição gerada com sucesso",
            });
        }
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });

        setLoading(false);
    }
};

export const criarContrato = async (props: {
    setLoadingContract: (value: boolean) => void,
    getBpcTickets: (ticket: any) => void,
    ticket: any,
    nameClient: string,
    estadoCivil: string,
    profissao: string,
    cpfClient: string,
    enderecoCompleto: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
    complemento: string,
    date: string
}) => {
    const {
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
        date
    } = props
    try {
        setLoadingContract(true);
        const response = await gerarBpcContrato(ticket.id, {
            nome_cliente: nameClient,
            estado_civil: estadoCivil,
            profissao: profissao,
            cpf_cliente: cpfClient,
            endereco: enderecoCompleto,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            cep: cep,
            complemento: complemento,
            data: formatarDataParaFormatoBr(date) || "",
        });

        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: response.error,
            });
        } else {
            const ticketEdited = await getBpcTicketById(ticket.id);
            await getBpcTickets(ticketEdited);
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Contrato gerado com sucesso.",
            });
        }
        setLoadingContract(false);
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });

        setLoadingContract(false);
    }
};

export const criarHipossuficiencia = async (props: {
    setLoadingHipossuficiencia: (value: boolean) => void,
    getBpcTickets: (ticket: any) => void,
    ticket: any,
    nameClient: string,
    estadoCivil: string,
    profissao: string,
    cpfClient: string,
    enderecoCompleto: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: string,
    complemento: string,
    dataRequerimento: string
}) => {
    const {
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
    } = props

    try {
        setLoadingHipossuficiencia(true);
        const response = await gerarBpcHipossuficiencia(ticket.id, {
            nome_cliente: nameClient,
            estado_civil: estadoCivil,
            profissao: profissao,
            cpf_cliente: cpfClient,
            endereco: enderecoCompleto,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            cep: cep,
            complemento: complemento,
            data: formatarDataParaFormatoBr(dataRequerimento) || "",
        });
        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: response.error,
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Hipossuficiência gerada com sucesso.",
            });
        }

        setLoadingHipossuficiencia(false);
    } catch (error: any) {
        const ticketEdited = await getBpcTicketById(ticket.id);
        getBpcTickets(ticketEdited);

        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });

        setLoadingHipossuficiencia(false);
    }
};

export const handleDeleteDoenca = async (props: {
    id: number,
    doencas: string[],
    setDoencas: (value: string[]) => void,
    setDoencaCod: (value: string) => void,
    setDoencaNome: (value: string) => void,
    resetDoenca: (value: any) => void
}) => {
    const {
        id,
        doencas,
        setDoencas,
        setDoencaCod,
        setDoencaNome,
        resetDoenca
    } = props

    try {
        await Swal.fire({
            title: "Tem certeza que deseja excluir esta doença?",
            text: "Esta ação não pode ser revertida!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setDoencas(doencas.filter((_, index: number) => index !== id));
                setDoencaCod("");
                setDoencaNome("");
                resetDoenca({
                    nome: "",
                    codigo: "",
                });
            }
        });
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
    }
};

export const handleDeletePessoa = async (props: {
    id: number,
    pessoas: string[],
    setPessoas: (value: string[]) => void
}) => {
    const {
        id,
        pessoas,
        setPessoas
    } = props

    try {
        await Swal.fire({
            title: "Tem certeza que deseja excluir esta pessoa?",
            text: "Esta ação não pode ser revertida!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setPessoas(pessoas.filter((_, index) => index !== id));
            }
        });
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
    }
};

export const handleAddPessoaSubmit = async (props: {
    pessoaId: string,
    pessoas: any[],
    cpfPessoa: string,
    pessoaNome: string,
    estadoCivilPessoa: string,
    rendaPessoa: string,
    fonteDeRendaPessoa: string,
    dataNascimentoPessoa: string,
    rgPessoa: string,
    profissaoPessoa: string,
    parentesco: string
    pessoaSelecionada: string | undefined,
    preencherInformacoesPeticao: (value: any) => any
    setPessoaModal: (value: boolean) => void,
    setPessoas: (value: any) => void,
    resetPessoa: (value: any) => any
    setCpfPessoa: (value: string) => void
    setRgPessoa: (value: string) => void
    setFonteDeRendaPessoa: (value: string) => void
}) => {
    const {
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
        resetPessoa,
        setPessoaModal,
        setPessoas,
        setCpfPessoa,
        setRgPessoa,
        setFonteDeRendaPessoa
    } = props

    setPessoaModal(true);
    try {
        if (pessoaId === "") {
            const pessoaFinded = pessoas.find(
                (pessoa) => pessoa.cpf_cliente === cpfPessoa
            );
            if (pessoaFinded) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Ja existe uma pessoa com este CPF",
                });
                return;
            }
            setPessoas([
                ...pessoas,
                {
                    id: uuidv4(),
                    nome_cliente: pessoaNome,
                    cpf_cliente: cpfPessoa,
                    estado_civil: estadoCivilPessoa,
                    renda: rendaPessoa,
                    fonte_de_renda: fonteDeRendaPessoa,
                    data_nascimento: dataNascimentoPessoa,
                    rg_cliente: rgPessoa,
                    profissao: profissaoPessoa,
                    parentesco,
                },
            ]);
        } else {
            let newPessoasArray = [...pessoas];
            const index = newPessoasArray.findIndex(
                (pessoa) => pessoa.id === pessoaId
            );

            if (pessoaSelecionada === newPessoasArray[Number(index)].id) {
                const pessoaFinded = pessoas.find(
                    (pessoa) =>
                        pessoa.id !== pessoaId && pessoa.cpf_cliente === cpfPessoa
                );

                if (pessoaFinded) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Ja existe uma pessoa com este CPF",
                    });
                    return;
                }
            }
            newPessoasArray[Number(index)] = {
                id: pessoaId,
                nome_cliente: pessoaNome,
                cpf_cliente: cpfPessoa,
                estado_civil: estadoCivilPessoa,
                renda: rendaPessoa,
                fonte_de_renda: fonteDeRendaPessoa,
                data_nascimento: dataNascimentoPessoa,
                rg_cliente: rgPessoa,
                profissao: profissaoPessoa,
                parentesco,
            };
            setPessoas(newPessoasArray);

            if (pessoaSelecionada === newPessoasArray[Number(index)].id) {
                preencherInformacoesPeticao(newPessoasArray[Number(index)]);
            }
        }
        resetPessoa({
            pessoaNome: "",
            cpfPessoa: "",
            estadoCivilPessoa: "",
            rendaPessoa: "",
            fonteDeRendaPessoa: "",
            dataNascimentoPessoa: "",
            rgPessoa: "",
            profissaoPessoa: "",
            parentesco: "",
        });
        setCpfPessoa("");
        setRgPessoa("");
        setFonteDeRendaPessoa("");
        setPessoaModal(false);
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error,
        });
    }
};
