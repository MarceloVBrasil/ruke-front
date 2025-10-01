import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";


export const addProduto = async (nome: string, metodo_pagamento: string) => {
    const token = getCookie("ruke_token");

    try {
        const json = await req.post(
            "/produtos",
            {
                nome,
                metodo_pagamento,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const updateProduto = async (id: string, nome: string) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.put(
            `/produtos/${id}`,
            { nome },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const deleteProduto = async (id: string) => {
    const token = getCookie("ruke_token");
    try {
        await req.delete(`/produtos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        throw error;
    }
};