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
    onAdicionarClick: () => void
    title: string
    children: React.ReactNode
    adjust?: boolean
    fullWidth?: boolean
}

export function AddModal(props: IModal) {
    const { open, onClose, onAdicionarClick, title, children, adjust, fullWidth } = props
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth={fullWidth}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row', overflow: 'hidden' } }}>
                    <DialogTitle sx={{ textTransform: 'uppercase' }} color={'primary'}>{title}:</DialogTitle>
                    <Button onClick={onClose} sx={{ fontSize: '30px', color: '#000', alignSelf: 'end', position: 'relative', right: adjust ? 7 : 0 }}>&times;</Button>
                </Box>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onAdicionarClick} type="submit">Adicionar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}