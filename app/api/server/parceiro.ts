"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getParceiros = async (id_produto: string) => {
    const token = cookies().get("ruke_token");
    try {
        const json = await req.get(`/parceiros/produto/${id_produto}`, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};