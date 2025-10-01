import { inscrever } from "@/app/api/client/auth";
import Swal from "sweetalert2";
import { register_form_fields } from "./Zod";
import { setCookie } from "cookies-next";
import { payment_data } from "@/app/types/paymentData";

export type campos_do_formulario = register_form_fields

export type campos_ausentes_do_formulario = {
    idplano: string
    tipoFormulario: string | null
    coupon: string | null
    cupom: string | null
    partner: string | null
}

export interface IHandleRegisterSubmit {
    campos_do_formulario: campos_do_formulario
    campos_ausentes_do_formulario: campos_ausentes_do_formulario
    goToPagamentoPage: (id_plano: string) => any
    onError: (v?: any) => any
}

export const handleRegisterSubmit = async ({
    campos_do_formulario,
    campos_ausentes_do_formulario,
    goToPagamentoPage,
    onError
}: IHandleRegisterSubmit) => {
    const {
        idplano,
        tipoFormulario,
        coupon,
        cupom,
        partner
    } = campos_ausentes_do_formulario

    const {
        nome,
        cpfCnpj,
        oab,
        oab_estado,
        email,
        telefone,
        senha,
    } = campos_do_formulario;
    const response = await inscrever(idplano, nome, oab, oab_estado, cpfCnpj, email, telefone, senha, tipoFormulario, coupon ?? cupom, partner);

    if (response.status === 'success') {
        setCookie('ruke_token_pagamento', response.tokenSeguro)
        Swal.fire({
            icon: 'success',
            html: `
            <h2 style="font-family: 'Gilroy Bold', sans-serif; margin-bottom:10px">Sucesso!</h2>
            <p style="font-family: 'Gilroy Bold', sans-serif;">Cadastro feito com sucesso</p>
            `,
        }).then(async (result) => {
            if (result.isConfirmed) {
                goToPagamentoPage(idplano)
            }
        });
    }

    if (response.error) {
        Swal.fire({
            icon: 'error',
            html: `
            <h2 style="font-family: 'Gilroy Bold', sans-serif; margin-bottom:10px">Erro!</h2>
            <p style="font-family: 'Gilroy Bold', sans-serif;">${response.error}</p>
            `,
        });

        onError()
    }
}