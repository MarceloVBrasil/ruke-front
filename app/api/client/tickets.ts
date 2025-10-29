import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";

export const addTicket = async () => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post(
            "/rmc",
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const deleteTicket = async (id: string) => {
    const token = getCookie("ruke_token");
    try {
        await req.delete(`/rmc/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        return error.response.data;
    }
};