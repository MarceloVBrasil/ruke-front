import Swal from "sweetalert2";
import { forgotPassword } from "../../api/client/auth";

export const handleForgotPassword = async (props: {
    email: string,
    goToResetPassword: () => void,
    onError: () => void
}) => {
    const {
        email,
        goToResetPassword,
        onError
    } = props
    const response = await forgotPassword(email);

    if (response.status === "send") {
        Swal.fire({
            icon: 'success',
            html: `
                   <h2 style="font-family: 'Gilroy Bold', sans-serif; margin-bottom:10px">Sucesso!</h2>
                   <p style="font-family: 'Gilroy Bold', sans-serif;">Um código para redefinir sua senha foi enviado para seu e-mail</p>
                   `,
        }).then((result) => {
            if (result.isConfirmed) {
                goToResetPassword()
            }
        })
    }
    if (response.error) {
        Swal.fire({
            icon: 'error',
            html: `
                    <h2 style="font-family: 'Gilroy Bold', sans-serif; margin-bottom:10px">Erro!</h2>
                    <p style="font-family: 'Gilroy Bold', sans-serif;">${response.error}</p>
                    `,
        }).then(() => {
            onError()
        })
    }
}
