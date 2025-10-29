"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getTenants = async () => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get("/tenants", {
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const getTenantById = async (id: string) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get(`/tenants/${id}`, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const cancelarTodasAssinaturas = async () => {
    const token = cookies().get("ruke_token");

    try {

        const json = await req.post(`/tenants/cancelar-todas-assinaturas`, {}, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
}