import Swal from "sweetalert2";

export function showError(props: {
    message: string,
    cb: () => void
}) {
    const {
        message,
        cb
    } = props
    Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: message,
    }).then((result) => {
        if (result.isConfirmed) cb()
    })
}