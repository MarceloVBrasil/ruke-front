"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getRukeFlexTickets = async () => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get(`/rukeflex/tickets`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const getRukeFlexTicketById = async (id: string) => {
    const token = cookies().get("ruke_token");

    try {
        const json = await req.get(`/rukeflex/ticket/${id}`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });

        return json.data;
    } catch (error: any) {
        throw error;
    }
};