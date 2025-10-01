import { advogado_assinante } from "@/app/types/advogados_assinantes";
import DeleteModal from "@/presentation/components/ModalDelete";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    assinante: advogado_assinante
}

export default function DeleteAssinanteModal(props: IModal) {
    const { open, onClose, onDeleteClick, assinante } = props
    return (
        <DeleteModal
            label={`${assinante.nome} - OAB: ${assinante.oab} - ${assinante.estado_oab}`}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        />
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(assinante.id as string)
    }
}