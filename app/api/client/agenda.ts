import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";

export const contratarAgendaAPI = async (dadosContratacao: any) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post(`/tenants/contratar-agenda`, dadosContratacao, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (err: any) {
        throw err;
    }
};

export const adicionarEventoAgenda = async (dadosEvento: any) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post("/agenda", dadosEvento, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const buscarEventosAgenda = async () => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.get("/agenda", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const buscarTipos = async () => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.get("/agenda/prazos", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const buscarUsuariosAgenda = async () => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.get("/users/agenda", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const updateUserAgenda = async (id_usuario: string, agenda: string) => {
    const token = getCookie("ruke_token");

    try {
        const response = await req.put(`/users/update-agenda/${id_usuario}`, {
            agenda
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (err: any) {
        throw err;
    }
}

export const atualizarAssinaturaAgendaAPI = async (dadosAlteracao: any) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.put(`/tenants/atualizar-agenda`, { ...dadosAlteracao }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return json.data;
    } catch (err: any) {
        throw err;
    }
}

export const removerAssinaturaAgendaAPI = async () => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.delete(`/tenants/remover-agenda`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return json.data;
    } catch (err: any) {
        throw err;
    }
}

export const filtrarAgenda = async (filtros: any) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post('/agenda/filtros', filtros, { headers: { Authorization: `Bearer ${token}` } },);
        return json.data;
    } catch (error: any) {
        return {
            error: error.response.data.error
        }
    }
}