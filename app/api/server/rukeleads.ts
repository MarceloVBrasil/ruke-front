"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getRukeLeads = async (page: number, limit: number, categoria: string, estado: string) => {
    const token = cookies().get("ruke_token");
    try {
        const json = await req.get(`/rukeleads?page=${page}&limit=${limit}&categoria=${categoria}&estado=${estado}`, {
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
}