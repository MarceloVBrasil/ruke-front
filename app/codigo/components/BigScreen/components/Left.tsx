import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Left() {
    const router = useRouter()

    const goToLogin = () => {
        return router.push('/login')
    }

    return (
        <article className='right_border left_border' style={{ marginTop: 0, marginBottom: 0, paddingRight: 10, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 545 }}>
            <Box sx={{ maxWidth: 390, height: 45, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 2 }}>
                <Image
                    src={'https://ruke.nyc3.cdn.digitaloceanspaces.com/logo_ruke%20(1).png'}
                    width={176}
                    height={33}
                    alt=''
                    style={{ cursor: 'pointer' }}
                    onClick={goToLogin}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 23, maxWidth: 390, minHeight: 555 }}>
                <div style={{ marginTop: 10 }}>
                    <Typography borderLeft={'2px solid #0078ED'} paddingInlineStart={1} fontSize={15} fontWeight={500}>Gestão Jurídica Inteligente</Typography>
                    <Typography fontWeight={'light'} fontSize={14} paddingInlineStart={1}>Automatize tarefas jurídicas e ganhe mais tempo pra focar nos seus clientes.</Typography>
                </div>

                <div style={{ marginTop: 10 }}>
                    <Typography borderLeft={'2px solid #0078ED'} paddingInlineStart={1} fontSize={15} fontWeight={500}>Equipes Produtivas</Typography>
                    <Typography fontWeight={'light'} fontSize={14} paddingInlineStart={1}>Organize prazos, tarefas e processos com sua equipe em um só lugar.</Typography>
                </div>

                <div style={{ marginTop: 10 }}>
                    <Typography borderLeft={'2px solid #0078ED'} paddingInlineStart={1} fontSize={15} fontWeight={500}>Relatórios Jurídicos</Typography>
                    <Typography fontWeight={'light'} fontSize={14} paddingInlineStart={1}>Tenha uma visão clara da performance do seu escritório com dados e insights</Typography>
                </div>

                <div style={{ marginTop: 10 }}>
                    <Typography borderLeft={'2px solid #0078ED'} paddingInlineStart={1} fontSize={15} fontWeight={500}>Peticionamento Automático e Inteligente</Typography>
                    <Typography fontWeight={'light'} fontSize={14} paddingInlineStart={1}>Transforme entrevistas com o cliente em petições completas, com fundamentação jurídica, pedidos e estrutura prontas para protocolar. Reduza em até 90% o tempo de produção da inicial.</Typography>
                </div>
            </Box>

            <Box className='footer_border' sx={{ position: 'absolute', bottom: { xs: -1100, sm: -70 }, width: '100%', marginInline: 'auto' }}>
                <Box sx={{ height: 45, display: 'flex', alignItems: 'center' }}>
                    <Typography marginLeft={.8} fontSize={13}>&copy; Ruke Tecnologia Jurídica - Termos e privacidade &bull;</Typography>
                </Box>
            </Box>
        </article>
    )
}
