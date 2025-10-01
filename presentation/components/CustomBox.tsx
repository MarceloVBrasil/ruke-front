import { Typography, Button, Card, CardActions, CardContent } from '@mui/material'
import React from 'react'

interface IBox {
    cabecalho?: string
    titulo: string
    subtitulo?: string
    cabecalhoError?: boolean
    onEditButtonClick: (value?: any) => void
    onDeleteButtonClick: (value?: any) => void
}

export default function CustomBox(props: IBox) {

    return (
        <Card sx={{ minWidth: { xs: 200, sm: 275 }, mx: 1, width: { xs: '100%', sm: 'auto' } }}>
            <CardContent>
                <Typography sx={{ fontSize: 14, textTransform: 'uppercase' }} color={props.cabecalhoError ? 'error.main' : "text.secondary"} gutterBottom>
                    {props.cabecalho}
                </Typography>
                <Typography variant='h5' color="primary" gutterBottom>
                    {props.titulo}
                </Typography>
                <Typography sx={{ mb: 1.5, minHeight: 25 }} color={"text.secondary"}>
                    {props.subtitulo}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={props.onEditButtonClick} size="small">Editar</Button>
                <Button onClick={props.onDeleteButtonClick} size="small">Deletar</Button>
            </CardActions>
        </Card>
    )
}
