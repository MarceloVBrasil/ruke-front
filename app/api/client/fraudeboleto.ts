import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";
import { AxiosResponse } from "axios";

export const criarPeticaoFraudeBoletos = async (
    idTicket: string,
    data: any
) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post(
            `/fraude-boleto/gerar-peticao/${idTicket}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const criarTicketVazioFraudeBoletos = async (tipoPessoa: string) => {
    const token = getCookie("ruke_token");
    try {
        const response: AxiosResponse<any> = await req.post(
            `/fraude-boleto/${tipoPessoa}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const deleteFraudeBoletos = async (tipoPessoa: string) => {
    const token = getCookie("ruke_token");
    try {
        const response: AxiosResponse<any> = await req.delete(
            `/fraude-boleto/${tipoPessoa}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const criarProcuracaoFraudeBoleto = async (
    idTicket: string,
    adicionarProcuracao: any
) => {
    const token = getCookie("ruke_token");
    try {
        const response: AxiosResponse<any> = await req.post(
            `fraude-boleto/gerar-procuracao/${idTicket}`,
            adicionarProcuracao,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const criarContratoFraudeBoletos = async (
    idTicket: string,
    adicionarContrato: any
) => {
    const token = getCookie("ruke_token");
    try {
        const response: AxiosResponse<any> = await req.post(
            `fraude-boleto/gerar-contrato/${idTicket}`,
            adicionarContrato,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const createHipossuficienciaFraudeBoletos = async (
    idTicket: string,
    adicionarHipossuficiencia: any
) => {
    const token = getCookie("ruke_token");
    try {
        const response: AxiosResponse<any> = await req.post(
            `fraude-boleto/gerar-hipossuficiencia/${idTicket}`,
            adicionarHipossuficiencia,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};