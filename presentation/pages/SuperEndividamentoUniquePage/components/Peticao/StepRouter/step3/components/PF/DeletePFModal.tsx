import { PF } from "@/app/types/pf";
import DeleteModal from "@/presentation/components/ModalDelete";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    PF: PF
}

export default function DeletePFModal(props: IModal) {
    const { open, onClose, onDeleteClick, PF } = props
    return (
        <DeleteModal
            label={PF.nome}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        >

        </DeleteModal>
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(PF.id as string)
    }
}