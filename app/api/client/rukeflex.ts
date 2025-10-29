import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";

export const addRukeFlexTicket = async (tipo_cliente?: string) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post(
            `/rukeflex/ticket/${tipo_cliente}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};
export const deleteRukeFlexTicket = async (id: string) => {
    const token = getCookie("ruke_token");
    try {
        await req.delete(`/rukeflex/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        return error.response.data;
    }
};

export const rukeFlexcreateProxy = async (
    id_ticket: string,
    nome_cliente: string,
    cpf_cliente: string,
    cnpj: string,
    razao_social: string,
    cep: string,
    endereco: string,
    numero: string,
    bairro: string,
    complemento: string,
    cidade: string,
    estado: string,
    representante_legal: string,
    data: string,
    estado_civil: string,
    profissao: string,
    tipo_cliente: string,
    escopo: string
) => {
    const token = getCookie("ruke_token");
    try {
        const dataBase = {
            nome_cliente,
            cpf_cliente,
            cnpj,
            razao_social,
            cep,
            endereco,
            numero,
            bairro,
            complemento,
            cidade,
            estado,
            estado_civil,
            profissao,
            data,
            tipo_cliente,
            representante_legal,
            escopo,
        };
        const response = await req.post(
            `/rukeflex/procuracao/${id_ticket}`,
            dataBase,
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

export const rukeFlexcreateHipossuficiencia = async (
    id_ticket: string,
    nome_cliente: string,
    cpf_cliente: string,
    endereco: string,
    estado_civil: string,
    profissao: string,
    data: string
) => {
    const token = getCookie("ruke_token");
    try {
        const dataBase = {
            nome_cliente,
            cpf_cliente,
            endereco,
            estado_civil,
            profissao,
            data,
        };

        const response = await req.post(
            `/rukeflex/hipossuficiencia/${id_ticket}`,
            dataBase,
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

export const rukeFlexcreateContract = async (
    id_ticket: string,
    nome_cliente: string,
    cpf_cliente: string,
    cnpj: string,
    razao_social: string,
    cep: string,
    representante_legal: string,
    estado_civil: string,
    profissao: string,
    endereco: string,
    numero: string,
    bairro: string,
    complemento: string,
    cidade: string,
    estado: string,
    percentual_exito: string,
    data: string,
    tipo_cliente: string,
    valor_mensal: string,
    escopo: string
) => {
    const token = getCookie("ruke_token");
    try {
        const dataBase = {
            nome_cliente,
            cpf_cliente,
            cnpj,
            profissao,
            estado_civil,
            tipo_cliente,
            razao_social,
            cep,
            percentual_exito,
            valor_mensal,
            escopo,
            endereco,
            numero,
            bairro,
            complemento,
            cidade,
            estado,
            representante_legal,
            data,
        };
        const response = await req.post(
            `/rukeflex/contrato/${id_ticket}`,
            dataBase,
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