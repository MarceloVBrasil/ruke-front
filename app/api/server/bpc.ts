"use server"

import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getBpcTickets = async () => {
    const token = getCookie("ruke_token", { cookies });
    try {
        const json = await req.get(`/bpc`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const getBpcTicketById = async (id: string) => {
    const token = cookies().get("ruke_token");
    try {
        const json = await req.get(`/bpc/ticket/${id}`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const getDoencaData = async (search?: string) => {
    try {
        const response = await req.get(
            `/bpc/doencas/cid${search ? `?search=${search}` : ""}`
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar Doenca:", error);
    }
};