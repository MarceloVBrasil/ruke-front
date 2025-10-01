"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getTicketById = async (id: string) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get(`/tickets/${id}`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });

        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const getTickets = async () => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get(`/tickets`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};