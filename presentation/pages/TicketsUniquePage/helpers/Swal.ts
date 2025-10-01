import { createContract, createHipossuficiencia, createProxy, criarPeticao } from "@/app/api/client/documents";
import { getTicketById } from "@/app/api/server/ticket";
import Swal from "sweetalert2";

export const criarProxy = async (props: {
    ticket: any,
    id_do_ticket: string
    nameClient: string
    cpfClient: string
    addressClient: string
    setLoading: (value: boolean) => void
    setLoadingProxy: (value: boolean) => void
    getTickets: (value: any) => any
}) => {
    const {
        ticket,
        id_do_ticket,
        nameClient,
        cpfClient,
        addressClient,
        setLoading,
        setLoadingProxy,
        getTickets
    } = props

    try {
        setLoadingProxy(true);
        const response = await createProxy(
            id_do_ticket,
            nameClient,
            cpfClient,
            addressClient
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
            await getTickets(await getTicketById(ticket.id));
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "petição gerada com sucesso.",
            });
        }

        setLoadingProxy(false);
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
        setLoading(false);
        setLoadingProxy(false);
    }
};

export const criarContrato = async (props: {
    ticket: any
    id_do_ticket: string
    nameClient: string
    cpfClient: string
    addressClient: string
    inputBank: string
    setLoading: (value: boolean) => void
    setLoadingContract: (value: boolean) => void
    getTickets: (value: any) => any
}) => {
    const {
        ticket,
        id_do_ticket,
        nameClient,
        cpfClient,
        addressClient,
        inputBank,
        setLoading,
        setLoadingContract,
        getTickets
    } = props

    try {
        setLoadingContract(true);
        const response = await createContract(
            id_do_ticket,
            nameClient,
            cpfClient,
            addressClient,
            inputBank
        );
        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: response.error,
            });
            setLoading(false);
        } else {
            await getTickets(await getTicketById(ticket.id));
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "contrato gerado com sucesso.",
            });
        }
        setLoadingContract(false);
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
        setLoading(false);
        setLoadingContract(false);
    }
};

export const criarHipossuficiencia = async (props: {
    ticket: any
    id_do_ticket: string
    nameClient: string
    cpfClient: string
    addressClient: string
    getTickets: (value: any) => any
    setLoading: (value: boolean) => void
    setLoadingHipossuficiencia: (value: boolean) => void
}) => {
    const {
        ticket,
        id_do_ticket,
        nameClient,
        cpfClient,
        addressClient,
        getTickets,
        setLoading,
        setLoadingHipossuficiencia
    } = props

    try {
        setLoadingHipossuficiencia(true);
        const response = await createHipossuficiencia(
            id_do_ticket,
            nameClient,
            cpfClient,
            addressClient
        );
        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: response.error,
            });
        } else {
            await getTickets(await getTicketById(ticket.id));
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "hipossuficiência gerada com sucesso.",
            });
        }

        setLoadingHipossuficiencia(false);
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
        setLoading(false);
        setLoadingHipossuficiencia(false);
    }
};

export const saveAndCreatePetition = async (props: {
    ticket: any
    nameClient: string
    calculationBase: string
    committedValue: string
    cpfClient: string
    addressClient: string
    cityClient: string
    inclusionDate: string
    contractValue: string
    installmentValue: string
    contractNumber: string
    inputBank: string
    typeProcess: string
    setLoading: (value: boolean) => void
    getTickets: (value: any) => any
}) => {
    const {
        ticket,
        nameClient,
        calculationBase,
        committedValue,
        cpfClient,
        addressClient,
        cityClient,
        inclusionDate,
        contractNumber,
        contractValue,
        installmentValue,
        inputBank,
        typeProcess,
        setLoading,
        getTickets
    } = props

    try {
        if (
            nameClient &&
            calculationBase &&
            committedValue &&
            cpfClient &&
            addressClient &&
            cityClient &&
            inclusionDate &&
            contractValue &&
            installmentValue &&
            contractNumber
        ) {
            const [day, month, year] = inclusionDate.split('/')
            if (day.length == 2 && month.length == 2 && year.length == 2) {
                setLoading(true);

                const response = await criarPeticao(ticket.id, {
                    name_client: nameClient,
                    calculation_base: calculationBase,
                    committed_value: committedValue,
                    bank_name: inputBank,
                    cpf_client: cpfClient,
                    address_client: addressClient,
                    city_client: cityClient,
                    inclusion_date: inclusionDate,
                    contract_value: contractValue,
                    installment_value: installmentValue,
                    contract_number: contractNumber,
                    type_process: typeProcess,
                });
                if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: response.error,
                    });
                    setLoading(false);
                } else {
                    const ticketEdited = await getTicketById(ticket.id);
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
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "O formato da data de inclusão deve ser DD/MM/YY.",
                });
                setLoading(false);
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Preencha todos os campos obrigatorios!",
            });
            setLoading(false);
        }
    } catch (error: any) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
        setLoading(false);
    }
};