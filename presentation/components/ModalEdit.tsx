import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

interface IModal {
    open: boolean
    onClose: () => void
    onEditarClick: () => void
    title: string
    children: React.ReactNode
}

export function EditModal(props: IModal) {
    const { open, onClose, onEditarClick, title, children } = props
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <DialogTitle sx={{ textTransform: 'uppercase' }} color={'primary'}>{title}:</DialogTitle>
                    <Button onClick={onClose} sx={{ fontSize: '30px', color: '#000', alignSelf: 'end' }}>&times;</Button>
                </Box>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onEditarClick} type="submit">Editar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}