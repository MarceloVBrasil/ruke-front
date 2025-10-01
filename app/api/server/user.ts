"use server"

import { cookies } from "next/headers";
import { req } from "./server.axiosInstance";

export const getUsers = async () => {
    const token = cookies().get("ruke_token");

    try {
        const response = await req.get("/users", {
            headers: { Authorization: `Bearer ${token?.value}` },
        });
        return response.data;
    } catch (error: any) {
        throw error;
    }
};