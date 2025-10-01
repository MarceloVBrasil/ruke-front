"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getProdutos = async () => {
    const token = cookies().get("ruke_token");
    try {
        const json = await req.get("/produtos", {
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const cancelarAssinaturaProduto = async (produto_id: string) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.post(`/tenants/cancelar-assinatura-produto`, {
            data: { produto_id },
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
}