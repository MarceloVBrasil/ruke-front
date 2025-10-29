import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";

export const gerarBpcPeticao = async (
    idTicket: string,
    data: {
        nome_cliente: string;
        estado_civil: string;
        profissao: string;
        renda_parte_autora: string;
        fonte_renda_parte_autora: string;
        cpf_cliente: string;
        endereco: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
        complemento: string;
        data_requerimento: string;
        numero_beneficio: string;
        rg_cliente: string;
        data_nascimento_cliente_parte_autora: string;
        idade_cliente_parte_autora: string;
        secao_judiciaria_estado: string;
        pessoas: any[];
        doencas: any[];
    }
) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post(`/bpc/gerar_peticao/${idTicket}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const gerarBpcProcuracao = async (
    id_ticket: string,
    data: {
        nome_cliente: string;
        estado_civil: string;
        profissao: string;
        cpf_cliente: string;
        cep: string;
        endereco: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        complemento: string;
        data: string;
    }
) => {
    const token = getCookie("ruke_token");

    try {
        const response = await req.post(
            `/bpc/gerar_procuracao/${id_ticket}`,
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

export const gerarBpcHipossuficiencia = async (
    id_ticket: string,
    data: {
        nome_cliente: string;
        estado_civil: string;
        profissao: string;
        cpf_cliente: string;
        cep: string;
        endereco: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        complemento: string;
        data: string;
    }
) => {
    const token = getCookie("ruke_token");
    try {
        const response = await req.post(
            `/bpc/gerar_hipossuficiencia/${id_ticket}`,
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

export const gerarBpcContrato = async (
    id_ticket: string,
    data: {
        nome_cliente: string;
        estado_civil: string;
        profissao: string;
        cpf_cliente: string;
        cep: string;
        endereco: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
        complemento: string;
        data: string;
    }
) => {
    const token = getCookie("ruke_token");
    try {
        const response = await req.post(`/bpc/gerar_contrato/${id_ticket}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const addbpcTicket = async () => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post(
            `/bpc/`,
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

export const deleteBpcTicket = async (id_ticket: string) => {
    const token = getCookie("ruke_token");
    try {
        await req.delete(`/bpc/${id_ticket}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        return error.response.data;
    }
};

export const addDoenca = async (
    id_bpc: string,
    nome: string,
    codigo: string
) => {
    const token = getCookie("ruke_token");
    try {
        const response = await req.post(
            `/doencas/${id_bpc}`,
            { nome, codigo },
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

export const deleteDoenca = async (id: string) => {
    const token = getCookie("ruke_token");
    try {
        const response = await req.delete(`/doencas/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const addPessoa = async (
    idTicket: string,
    pessoa: {
        nome_cliente: string;
        cpf_cliente: string;
        estado_civil: string;
        renda: string;
        fonte_de_renda: string;
        data_nascimento: string;
        rg_cliente: string;
        profissao: string;
    }
) => {
    const token = getCookie("ruke_token");

    try {
        const json = await req.post(`/pessoas/${idTicket}`, pessoa, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const updatePessoa = async (
    id_pessoa: string,
    pessoa: {
        nome_cliente: string;
        cpf_cliente: string;
        estado_civil: string;
        renda: string;
        fonte_de_renda: string;
        data_nascimento: string;
        rg_cliente: string;
        profissao: string;
    }
) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.put(`/pessoas/${id_pessoa}`, pessoa, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const deletePessoa = async (id_pessoa: string) => {
    const token = getCookie("ruke_token");
    try {
        await req.delete(`/pessoas/${id_pessoa}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        return error.response.data;
    }
};