"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getProcessos = async () => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get(`/processos`, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return json.data;
    } catch (err: any) {
        throw err;
    }
}

export const getMovimentacoes = async (id_processo: string) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get(`/processos/movimentacoes/${id_processo}`, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return json.data;
    } catch (err: any) {
        throw err;
    }
}

export const salvarProcessoAPI = async (dados: any) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.post("/processos", dados, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (err: any) {
        throw err;
    }
}

export const filtrarProcessosAPI = async (dados: any) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.post("/processos/filtrar", dados, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (err: any) {
        throw err;
    }
}