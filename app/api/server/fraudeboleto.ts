"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getFraudeBoletoById = async (id: string) => {
    const token = cookies().get("ruke_token");
    try {
        const json = await req.get(`/fraude-boleto/${id}`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });

        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const getTicketsFraudeBoleto = async () => {
    const token = cookies().get("ruke_token");
    try {
        const json = await req.get(`/fraude-boleto`, {
            headers: {
                Authorization: `Bearer ${token?.value}`,
            },
        });

        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};