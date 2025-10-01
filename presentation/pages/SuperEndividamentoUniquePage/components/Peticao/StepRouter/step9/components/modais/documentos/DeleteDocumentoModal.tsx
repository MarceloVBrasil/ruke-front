import DeleteModal from "@/presentation/components/ModalDelete";
import { documento } from "./DocumentoFormTypesAndFields";
import { documentos_faltando } from "../../../helper/FormTypesAndFields";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (documentos_faltante: documentos_faltando) => void
    documento_faltante: documentos_faltando
}

export default function DeleteDocumentoModal(props: IModal) {
    const { open, onClose, onDeleteClick, documento_faltante } = props
    return (
        <DeleteModal
            label={`documento: ${documento_faltante.documento_faltando} referente ao credor ${documento_faltante.credor.split('-')[0]}`}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        />
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(documento_faltante as documentos_faltando)
    }
}