import Swal from "sweetalert2";
import { resetPassword } from "../../api/client/auth";


export const handleResetSenha = async (props: {
    codigo: string,
    senha: string,
    goToLogin: () => void,
    onError: () => void
}) => {
    const {
        codigo,
        senha,
        goToLogin,
        onError
    } = props
    const response = await resetPassword(codigo, senha);

    if (!response.error) {
        Swal.fire({
            icon: 'success',
            html: `
                   <h2 style="font-family: 'Gilroy Bold', sans-serif; margin-bottom:10px">Sucesso!</h2>
                   <p style="font-family: 'Gilroy Bold', sans-serif;">Senha alterada com sucesso.</p>
                   `,
        }).then((result) => {
            if (result.isConfirmed) {
            } goToLogin()
        });
    }

    else {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: response.message
        }).then(() => {
            onError()
        });
    }
};