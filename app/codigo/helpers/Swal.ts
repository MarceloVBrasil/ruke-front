import { setCookie } from "cookies-next";
import Swal from "sweetalert2";
import * as api from '../../api/client/auth';
import { payment_data } from "@/app/types/paymentData";

export const handleCodigoSingIn = async (props: {
    email: string,
    codigo: string,
    goToTenantsUniquePage: (tenant_id: string) => void,
    goToHomePage: () => void,
    goToPagamentosPage: (tokenSeguro: string) => void,
    onError: () => void

}) => {
    const {
        email,
        codigo,
        goToTenantsUniquePage,
        goToHomePage,
        goToPagamentosPage,
        onError
    } = props

    const response = await api.loginComCodigo(email, codigo);

    if (response.error) {
        const paymentData: payment_data = response.data.paymentData

        Swal.fire({
            icon: 'error',
            html: `
                   <h2 style="font-family: 'Gilroy Bold', sans-serif; margin-bottom:10px">Erro!</h2>
                   <p style="font-family: 'Gilroy Bold', sans-serif;">${response.message}</p>
                   `,
        }).then((result) => {
            onError()

            setCookie('ruke_token_pagamento', paymentData.tokenSeguro)
            if (!paymentData.invoiceUrl) return goToPagamentosPage(paymentData.id_plano) // redirecionar para pagina de pagamento
            else return window.open(paymentData.invoiceUrl)
        })
    } else {
        setCookie('ruke_token', response.token)
        setCookie('regras', JSON.stringify(response.regras))
        setCookie('refreshToken', response.refreshToken)
        setCookie('menusPermitidos', JSON.stringify(response.menus))
        setCookie('quantidade_usuarios_agenda', response.quantidade_usuarios_agenda)
        setCookie('from_signin', 'true')
        setCookie('ruke_drawer_open', 'true')

        if (getNivelFromToken(response.token) === 'colaborador') return goToHomePage()
        if (response.cadastroPendente) goToTenantsUniquePage(response.tenantId) //router.push(`/tenants/${response.tenantId}`)
        else goToHomePage() //router.push('/')
    }

    function getNivelFromToken(token: string) {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64); // no Node.js, use Buffer
        const payload = JSON.parse(payloadJson);

        return payload.nivel; // ou payload.role, dependendo do campo usado
    }
}
