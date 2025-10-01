"use server";

import axios from "axios";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const req = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API,
    headers: {
        "content-type": "application/json",
    },
});

req.interceptors.response.use(
    async (response) => {
        return response;
    },
    async (error) => {
        if (error.response) {
            let errorMessage = error.response.data.error || "";

            if (errorMessage === "jwt expired") {
                await resetToken();
                return null;
            }

            if (errorMessage === "login") {
                redirect("/logout");
            }

            if (errorMessage === "jwt malformed") {
                await resetToken();
            }

            if (errorMessage === "invalid signature") {
                redirect("/logout");
            }
        }
        return Promise.reject(error);
    }
);

async function resetToken() {
    const refreshToken = getCookie("refreshToken", { cookies });
    if (!refreshToken) {
        return redirect("/login");
    }
    const response = await req.post("/auth/refresh_token", {
        refreshToken,
    });

    const token = response.data.token;
    const regras = JSON.stringify(response.data.regras);

    redirect(`/refreshToken?token=${token}&regras=${regras}`);
}