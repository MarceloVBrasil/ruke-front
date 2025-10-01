import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";

export const addTicket = async () => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post(
            "/tickets",
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const deleteTicket = async (id: string) => {
    const token = getCookie("ruke_token");
    try {
        await req.delete(`/tickets/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        throw error;
    }
};