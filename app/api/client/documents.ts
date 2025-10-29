import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";

export const criarPeticao = async (
    idTicket: string,
    data: {
        name_client: string;
        calculation_base: string;
        committed_value: string;
        bank_name: string;
        cpf_client: string;
        address_client: string;
        city_client: string;
        inclusion_date: string;
        contract_value: string;
        installment_value: string;
        contract_number: string;
        type_process: string;
    }
) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post(`/documents/petition/${idTicket}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const createProxy = async (
    id_ticket: string,
    name_client: string,
    cpf_client: string,
    address_client: string
) => {
    const token = getCookie("ruke_token");
    try {
        const data = {
            name_client: name_client,
            cpf_client: cpf_client,
            address_client: address_client,
        };
        const response = await req.post(`documents/proxy/${id_ticket}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const createContract = async (
    id_ticket: string,
    name_client: string,
    cpf_client: string,
    address_client: string,
    bank_name: string
) => {
    const token = getCookie("ruke_token");
    try {
        const data = {
            name_client: name_client,
            cpf_client: cpf_client,
            address_client: address_client,
            bank_name: bank_name,
        };

        const response = await req.post(`documents/contract/${id_ticket}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const createHipossuficiencia = async (
    id_ticket: string,
    name_client: string,
    cpf_client: string,
    address_client: string
) => {
    const token = getCookie("ruke_token");
    try {
        const data = {
            name_client: name_client,
            cpf_client: cpf_client,
            address_client: address_client,
        };

        const response = await req.post(
            `documents/hipossuficiencia/${id_ticket}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};