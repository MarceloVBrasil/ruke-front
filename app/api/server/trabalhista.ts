"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";
import { server_error } from "@/app/types/server_error";

export const getTrabalhistaTickets = async () => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get("/trabalhista", {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const getTrabalhistaTicketById = async (ticket_id: string) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get(`/trabalhista/${ticket_id}`, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const updateTrabalhistaTicket = async (ticket_id: string, data: any) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.put(`/trabalhista/${ticket_id}`, data, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        return json.data;
    } catch (error: any) {
        console.log(error.response)
        throw error;
    }
};

export const addTrabalhistaTicket = async () => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.post(`/trabalhista`, {}, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const deleteTrabalhistaTicket = async (id: string) => {
    const token = cookies().get("ruke_token");

    try {
        await req.delete(`/trabalhista/${id}`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });
    } catch (error: any) {
        throw error;
    }
};

export const gerarPeticaoTrabalhista = async (ticket_id: string, data: any) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.post(`/trabalhista/gerar-peticao/${ticket_id}`, data, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        return json.data;
    } catch (err: any) {

        const error: server_error = { error: true, message: err.response.data.error }
        return error
    }
};

export const calcularTotalCausaTrabalhista = async (ticket_id: string, data: any) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.post(`/trabalhista/calcular/${ticket_id}`, data, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const calcularSalarioProporcionalFeriasTrabalhista = async ({ salarioBase, mesesTrabalhados }: { salarioBase: number, mesesTrabalhados: number }) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.post(`/trabalhista/calcular-salario-proporcional`, { salarioBase, mesesTrabalhados }, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });

        return json.data;
    } catch (error: any) {
        throw error;
    }
};