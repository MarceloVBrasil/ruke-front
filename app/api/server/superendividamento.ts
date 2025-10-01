"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getSuperendividamentoTickets = async () => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get("/superendividamento", {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const getSuperendividamentoTicketById = async (ticket_id: string) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get(`/superendividamento/${ticket_id}`, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const updateSuperendividamentoTicket = async (ticket_id: string, data: any) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.put(`/superendividamento/${ticket_id}`, data, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const gerarPeticaoSuperendividamento = async (ticket_id: string, data: any) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.post(`/superendividamento/gerar-peticao/${ticket_id}`, data, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const addSuperendividamentoTicket = async () => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.post(`/superendividamento`, {}, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const deleteSuperendividamentoTicket = async (id: string) => {
    const token = cookies().get("ruke_token");

    try {
        await req.delete(`/superendividamento/${id}`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });
    } catch (error: any) {
        throw error;
    }
};