import { imovel } from "@/app/types/imovel";
import DeleteModal from "@/presentation/components/ModalDelete";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    imovel: imovel
}

export default function DeleteImovelModal(props: IModal) {
    const { open, onClose, onDeleteClick, imovel } = props
    return (
        <DeleteModal
            label={`imóvel: ${imovel.rua}, ${imovel.cidade} - ${imovel.estado}`}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        />
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(imovel.id as string)
    }
}