import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";

export const procurarProcesso = async (link: string, numero_processo: string) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post(`/buscar-processo`, { link, numero_processo }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
}