import { setCookie } from "cookies-next";
import Swal from "sweetalert2";
import * as api from '../../../api/client/auth';

export const handleProcessarPagamento = async (props: {
    token_seguro: string,
    metodo_pagamento: string,
    goToLogin: () => void
    onError: () => void

}) => {
    const {
        token_seguro,
        metodo_pagamento,
        goToLogin,
        onError,
    } = props

    const response = await api.processarPagamento(token_seguro, metodo_pagamento);
    if (response.error) {
        Swal.fire({
            icon: 'error',
            html: `
                    <h2 style="font-family: 'Gilroy Bold', sans-serif; margin-bottom:10px">Erro!</h2>
                    <p style="font-family: 'Gilroy Bold', sans-serif;">${response.message}</p>
                    `,
        }).then((result) => {
            if (result.isConfirmed) onError()
        })

    } else {
        setCookie('ruke_token', response.token)
        setCookie('regras', JSON.stringify(response.regras))
        setCookie('refreshToken', response.refreshToken)
        setCookie('menusPermitidos', JSON.stringify(response.menus))
        setCookie('quantidade_usuarios_agenda', response.quantidade_usuarios_agenda)
        setCookie('from_signin', 'true')
        setCookie('ruke_drawer_open', 'true')

        window.open(response.invoiceUrl)
        return goToLogin() //router.push(`/login`)
    }
}