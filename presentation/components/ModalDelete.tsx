import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: () => void
    label: string
}

export default function DeleteModal(props: IModal) {
    const { open, onClose, onDeleteClick, label } = props
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{ width: '500px', textWrap: 'balance' }}>
                Deseja deletar {label}?
            </DialogTitle>
            <DialogActions>
                <Button onClick={onClose}>NÃO</Button>
                <Button onClick={onDeleteClick} autoFocus>
                    SIM
                </Button>
            </DialogActions>
        </Dialog>
    )
}