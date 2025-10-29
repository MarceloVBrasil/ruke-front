import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";

export const getUser = async (id: string) => {
    const token = getCookie("ruke_token");
    try {
        const response = await req.get(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const insertUser = async (userData: any) => {
    const token = getCookie("ruke_token");
    try {
        const response = await req.post("/users", userData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const updateUser = async (
    id: string,
    userData: {
        nome: string;
        email: string;
        telefone: string;
        nivel: string;
        cpf: string;
        oab: string;
        oab_estado: string;
    }
) => {
    const token = getCookie("ruke_token");
    try {
        const response = await req.put(`/users/${id}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const deleteUser = async (id: string) => {
    const token = getCookie("ruke_token");
    try {
        await req.delete(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error: any) {
        return error.response.data;
    }
};

export const assinaturaUsuario = async (
    id: string,
    aparecer_em_assinaturas_rmc: string
) => {
    const token = getCookie("ruke_token");

    try {
        const response = await req.put(
            `/users/assinaturas/${id}`,
            { aparecer_em_assinaturas_rmc },
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