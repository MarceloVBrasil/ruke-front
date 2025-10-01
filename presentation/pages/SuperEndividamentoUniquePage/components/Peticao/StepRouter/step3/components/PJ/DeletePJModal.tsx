import { PJ } from "@/app/types/pj";
import DeleteModal from "@/presentation/components/ModalDelete";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    PJ: PJ
}

export default function DeletePJModal(props: IModal) {
    const { open, onClose, onDeleteClick, PJ } = props
    return (
        <DeleteModal
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
            label={PJ.nome}
        >

        </DeleteModal>
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(PJ.id as string)
    }
}