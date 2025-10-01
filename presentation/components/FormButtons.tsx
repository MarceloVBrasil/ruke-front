import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { LoadingButton } from '@mui/lab';

interface IFormButtons {
    onBackButtonClick?: () => void
    onNextButtonClick?: () => void
    onFinishButtonClick?: () => void
    type: 'next' | 'back-next' | 'back-finish'
    loading?: boolean
    disabled?: boolean
    disabledNextButton?: boolean
}

export default function FormButtons(props: IFormButtons) {
    switch (props.type) {
        case 'next':
            return (
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={props.onNextButtonClick} disabled={props.disabled || props.disabledNextButton}>
                        SALVAR E IR PARA O PRÓXIMO PASSO
                        <SkipNextIcon />
                    </Button>
                </Box>
            )
        case 'back-next':
            return (
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>

                    <Button onClick={props.onBackButtonClick} disabled={props.disabled}>
                        <SkipPreviousIcon />
                        SALVAR E IR PARA O PASSO ANTERIOR
                    </Button>

                    <Button onClick={props.onNextButtonClick} disabled={props.disabled || props.disabledNextButton}>
                        SALVAR E IR PARA O PRÓXIMO PASSO
                        <SkipNextIcon />
                    </Button>
                </Box>
            )
        case 'back-finish':
            return (
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2, pr: 2, pb: 1 }}>

                    <Button disabled={props.disabled} onClick={props.onBackButtonClick}>
                        <SkipPreviousIcon />
                        SALVAR E IR PARA O PASSO ANTERIOR
                    </Button>

                    <LoadingButton
                        onClick={props.onNextButtonClick}
                        endIcon={<SkipNextIcon />}
                        loading={props.loading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        SALVAR E GERAR PETIÇÃO
                    </LoadingButton>
                </Box>
            )
    }
}
