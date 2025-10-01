import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";

export const getBancos = async () => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.get(`/bancos`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(json.data);
        return json.data;
    } catch (error: any) {
        throw error;
    }
};