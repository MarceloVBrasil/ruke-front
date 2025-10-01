import DeleteModal from "@/presentation/components/ModalDelete";
import { paradigma } from "../ParadigmasFormAndFields";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    paradigma: paradigma
}

export default function DeleteParadigmaModal(props: IModal) {
    const { open, onClose, onDeleteClick, paradigma } = props
    return (
        <DeleteModal
            label={`paradigma ${paradigma.nome}`}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        />
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(paradigma.id as string)
    }
}