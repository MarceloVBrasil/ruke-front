"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getBpcTickets = async () => {
    const token = cookies().get("ruke_token");
    try {
        const json = await req.get(`/bpc`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const getBpcTicketById = async (id: string) => {
    const token = cookies().get("ruke_token");
    try {
        const json = await req.get(`/bpc/${id}`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const getDoencaData = async (search?: string) => {
    const token = cookies().get("ruke_token");
    try {
        const response = await req.get(`/doencas/cid${search ? `?search=${search}` : ""}`, {
            headers: {
                Authorization: `Bearer ${token?.value}`
            }
        });
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};