import Swal from "sweetalert2";

export const onAlterarOpcaoCtpsParaNaoAnotada = async (onConfirmPromise: () => Promise<void>, onCancelPromise: () => Promise<void>) => {
    try {
        await Swal.fire({
            title: "Alterar opção de anotação de CTPS para `Não Anotada`?",
            text: " Você selecionou o pedido de vínculo de emprego, mas é obrigatório selecionar nos dados do contrato que a carteira de trabalho não foi anotada para que o pedido seja aceito!!",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, alterar!",
            cancelButtonText: "Cancelar",
            allowOutsideClick: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                await onConfirmPromise()
                Swal.fire("Alterado! A carteira de trabalho foi alterada com sucesso", ".", "success");
            } else if (result.isDismissed) {
                await onCancelPromise()
                Swal.fire("Cancelado! O pedido de vínculo empregatício foi cancelado", ".", "info");
            }
        });
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });

    }
};

export const onAlterarOpcaoVamosPedirReversaoDeJustaCausaParaNao = async (onConfirmPromise: () => Promise<void>, onCancelPromise: () => Promise<void>) => {
    try {
        await Swal.fire({
            title: "Alterar opção de pedir reversão de justa causa para `Não`?",
            text: " Você deselecionou o pedido de reversão de justa causa, mas é obrigatório selecionar nos dados do contrato que o pedido de reversão não será feito!!",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, alterar!",
            cancelButtonText: "Cancelar",
            allowOutsideClick: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                await onConfirmPromise()
                Swal.fire("Alterado! O pedido de reversão de justa causa foi alterado com sucesso", ".", "success");
            } else if (result.isDismissed) {
                await onCancelPromise()
                Swal.fire("Cancelado! O pedido de reversão de justa causa foi mantido", ".", "info");
            }
        });
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });

    }
};

export const onAlterarOpcaoIncluirPedidoMultaArt477ParaNao = async (onConfirmPromise: () => Promise<void>, onCancelPromise: () => Promise<void>) => {
    try {
        await Swal.fire({
            title: "Alterar opção de pedir multa art. 477 para `Não`?",
            text: " Você deselecionou o pedido de multa art. 477, mas é obrigatório selecionar nos dados do contrato que o pedido da multa não será feito!!",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, alterar!",
            cancelButtonText: "Cancelar",
            allowOutsideClick: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                await onConfirmPromise()
                Swal.fire("Alterado! O pedido de multa art. 477 foi alterado com sucesso", ".", "success");
            } else if (result.isDismissed) {
                await onCancelPromise()
                Swal.fire("Cancelado! O pedido de multa art. 477 foi mantido", ".", "info");
            }
        });
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });

    }
};