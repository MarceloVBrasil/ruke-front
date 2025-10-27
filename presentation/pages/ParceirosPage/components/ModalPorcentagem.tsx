import ModalComponent from '@/presentation/components/Modal'
import { Grid, Typography, TextField, Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { Dispatch } from 'react'
import { handleSubmitPorcentagem } from '../helpers/Swal'
import { PorcentagemParceiros } from '../helpers/interfaces'

interface IModalPorcentagemProps {
    modalPorcent: boolean
    formRefPorcent: React.MutableRefObject<HTMLFormElement | undefined>
    porcentagemChoose: PorcentagemParceiros | null
    openModalPorcent: () => void
    closeModalPorcent: () => void
    setPorcentagemChoose: React.Dispatch<React.SetStateAction<PorcentagemParceiros | null>>
    setModalPorcent: Dispatch<boolean>
}

export default function ModalPorcentagem(props: IModalPorcentagemProps) {
    const {
        modalPorcent,
        formRefPorcent,
        porcentagemChoose,
        openModalPorcent,
        closeModalPorcent,
        setPorcentagemChoose,
        setModalPorcent
    } = props
    return (
        <ModalComponent nomeModal='Porcentagem' open={modalPorcent} handleOpen={openModalPorcent} handleClose={closeModalPorcent}>
            <Box ref={formRefPorcent} component="form"
                onSubmit={(e) => handleSubmitPorcentagem(e, porcentagemChoose, formRefPorcent, setPorcentagemChoose, setModalPorcent)}
                sx={{ mt: 3 }}>
                <Grid item xs={12} sm={12}>
                    <Typography sx={{ color: '#00479d', marginLeft: '10px' }}>
                        Porcentagem
                    </Typography>
                    <TextField
                        id="porcentagem"
                        name="porcentagem"
                        type='number'
                        fullWidth
                        placeholder='Porcentagem'
                        defaultValue={porcentagemChoose ? porcentagemChoose.porcentagem : ''}
                        InputLabelProps={{ shrink: true }}
                        style={{ borderRadius: 40 }}
                    />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, padding: '10px' }}
                >
                    Atualizar Porcentagem
                </Button>
            </Box>
        </ModalComponent>
    )
}
