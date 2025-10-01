import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import DangerousIcon from '@mui/icons-material/Dangerous';

interface IModal {
    open: boolean
    onClose: () => void
    onActionButtonClick: () => void
    onCancelButtonClick?: () => void
    actionText: string
    cancelText?: string
    children: React.ReactNode
}

export function ErrorModal(props: IModal) {
    const { open,
        onClose,
        onActionButtonClick,
        onCancelButtonClick,
        actionText,
        cancelText,
        children
    } = props
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                        onClose();
                    }
                }}
                disableEscapeKeyDown
                onBackdropClick={undefined}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: 3 }}>
                    <DangerousIcon color='warning' fontSize='large' />
                    <Typography sx={{ position: 'relative', left: 2, fontSize: 20 }}>Erro</Typography>
                </Box>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button style={{ display: onCancelButtonClick ? 'block' : 'none' }} onClick={handleCancelButtonClick}>{cancelText}</Button>
                    <Button variant='contained' color='warning' onClick={handleActionButtonClick} type="submit">{actionText}</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );

    function handleCancelButtonClick() {
        onCancelButtonClick?.()
        onClose()
    }

    function handleActionButtonClick() {
        onActionButtonClick()
        onClose()
    }
}