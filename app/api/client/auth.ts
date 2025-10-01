import { server_error } from "@/app/types/server_error";
import { req } from "./client.axiosInstance";

export const login = async (email: string, senha: string) => {
    try {
        const json = await req.post("/auth/login", { email, senha });
        return json.data;
    } catch (error: any) {
        const err: server_error = { error: true, message: error.response.data.error, data: error.response.data }
        return err
    }
};

export const loginComCodigo = async (email: string, codigo: string) => {
    try {
        const json = await req.post("/auth/login-com-codigo", { email, codigo });
        return json.data;
    } catch (error: any) {
        const err: server_error = { error: true, message: error.response.data.error, data: error.response.data }
        return err
    }
};

export const refreshTokenAPI = async (refreshToken: string) => {
    try {
        const response = await req.post("/auth/refresh_token", { refreshToken });
        return response.data;
    } catch (error: any) {
        return { error: error.response?.data?.error };
    }
};


export const forgotPassword = async (email: string) => {
    try {
        const response = await req.post("/auth/esqueci-minha-senha", { email });
        return response.data;
    } catch (error: any) {
        return { error: error.response?.data?.error };
    }
};

export const resetPassword = async (codigo: string, senha: string) => {
    try {
        const response = await req.post("/auth/trocar-minha-senha", { codigo, senha });
        return response.data;
    } catch (error: any) {
        return { error: error.response?.data?.error };
    }
};

export const changePassword = async (codigo: string, senha: string) => {
    try {
        const json = await req.post("/auth/trocar-minha-senha", { codigo, senha });
        return json.data.token ?? false;
    } catch (error: any) {
        return false;
    }
};

export const completarAssinaturaAgenda = async (
    tenant_id: string,
    quantidade_usuarios: number,
    id_plano: string
) => {
    try {
        const json = await req.post(`/auth/completar-assinatura-agenda/${tenant_id}`, {
            quantidade_usuarios,
            id_plano
        });
        return json.data;
    } catch (error: any) {
        return { error: error.response?.data?.error };
    }
};

export const inscrever = async (
    id_plano: string,
    nome: string,
    oab: string,
    oab_estado: string,
    cpf_cnpj: string,
    email: string,
    telefone: string,
    senha: string,
    tipo?: string | null,
    cupom?: string | null,
    partner?: string | null
) => {
    try {
        const json = await req.post(
            `/auth/inscrever-se/${id_plano}?type=${tipo}&coupon=${cupom}&partner=${partner}`,
            { nome, oab, oab_estado, cpf: cpf_cnpj, email, telefone, cupom, senha }
        );
        return json.data;
    } catch (error: any) {
        return { error: error.response?.data?.error };
    }
};

export const solicitarCodigo = async (email: string) => {
    try {
        const json = await req.post("/auth/solicitar-codigo", { email });
        return json.data.token;
    } catch (error: any) {
        return false;
    }
};

export const processarPagamento = async (token_seguro: string, metodo_pagamento: string) => {
    try {
        const json = await req.post("/auth/processar-pagamento", { tokenSeguro: token_seguro, metodo_pagamento });
        return json.data;
    } catch (error: any) {
        const err: server_error = { error: true, message: error.response.data.error, data: error.response.data }
        return err

    }
};