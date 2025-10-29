import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";

export const contratarRukeLeadsAPI = async () => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post("/tenants/contratar-rukeleads", {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const visualizarContatoRukeLeadsAPI = async (id_duvida: string) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.get(`/rukeleads/${id_duvida}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const removerAssinaturaRukeLeadsAPI = async () => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.delete(`/tenants/remover-rukeleads`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
}
