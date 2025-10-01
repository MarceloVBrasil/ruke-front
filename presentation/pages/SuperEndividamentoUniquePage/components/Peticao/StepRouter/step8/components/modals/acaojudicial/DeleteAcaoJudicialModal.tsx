import { acao_judicial } from "@/app/types/acao_judicial";
import DeleteModal from "@/presentation/components/ModalDelete";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    acao_judicial: acao_judicial
}

export default function DeleteDividaModal(props: IModal) {
    const { open, onClose, onDeleteClick, acao_judicial } = props
    return (
        <DeleteModal
            label={`ação judicial: ${acao_judicial}`}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        />
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(acao_judicial as acao_judicial)
    }
}