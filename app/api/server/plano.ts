"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";


export const getPlanos = async (id_produto: string) => {
    const token = cookies().get("ruke_token");
    try {
        const json = await req.get(`/planos/produto/${id_produto}`, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const getPlanoById = async (plano_id: string) => {
    const token = cookies().get("ruke_token");
    try {
        const json = await req.get(`/planos/${plano_id}`, {
            headers: { Authorization: `Bearer ${token?.value}` }
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export const getPlanosContratados = async () => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get(`/planos-contratados`, {
            headers: { Authorization: `Bearer ${token?.value}` }
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
}