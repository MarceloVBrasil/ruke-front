import axios from "axios";
import { getCookie } from "cookies-next";

export const req = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    headers: {
        "content-type": "application/json",
    },
});

req.interceptors.response.use(
    async (response) => response,
    async (error) => {
        let errorMessage = error.response?.data?.error;
        if (error.response) {
            if (errorMessage === "jwt expired") {
                await resetToken();
                return null;
            }
            if (["login", "invalid signature"].includes(errorMessage)) {
                window.location.replace("/logout");
                return null;
            }
            if (errorMessage === "jwt malformed") {
                resetToken();
                return null;
            }
        }
        return Promise.reject(error);
    }
);

export async function resetToken() {
    const refreshToken = getCookie("refreshToken");
    const response = await req.post("/auth/refresh_token", { token: `Bearer ${refreshToken}` });
    const token = response.data.token;
    const regras = JSON.stringify(response.data.regras);
    window.location.replace(`/refreshToken?token=${token}&regras=${regras}`);
}