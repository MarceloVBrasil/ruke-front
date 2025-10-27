import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Image from 'next/image';
import { plano } from '@/app/types/plano';
import { useRouter } from 'next/navigation';

interface ILeft {
    plano: plano
}

export default function Left(props: ILeft) {
    const { plano } = props
    const router = useRouter()

    const goToLogin = () => {
        return router.push('/login')
    }

    return (
        <article className='right_border left_border' style={{ marginTop: 0, marginBottom: 0, paddingRight: 10, display: 'flex', flexDirection: 'column', maxWidth: 545, width: '100%' }}>
            <Box sx={{ maxWidth: 390, height: 45, display: 'flex', justifyContent: 'start', alignItems: 'center', padding: 2 }}>
                <Image
                    src={'https://ruke.nyc3.cdn.digitaloceanspaces.com/logo_ruke%20(1).png'}
                    width={200}
                    height={35}
                    alt=''
                    style={{ cursor: 'pointer' }}
                    onClick={goToLogin}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 14.7, maxWidth: 390 }}>
                <div style={{ marginTop: 10 }}>
                    <Typography borderLeft={'1px solid #0078ED'} paddingInlineStart={1} fontSize={16} fontWeight={500}>Gestão Jurídica Inteligente</Typography>
                    <Typography fontWeight={'light'} fontSize={16} paddingInlineStart={1}>Automatize tarefas jurídicas e ganhe mais tempo pra focar nos seus clientes.</Typography>
                </div>

                <div style={{ marginTop: 10 }}>
                    <Typography borderLeft={'1px solid #0078ED'} paddingInlineStart={1} fontSize={16} fontWeight={500}>Equipes Produtivas</Typography>
                    <Typography fontWeight={'light'} fontSize={16} paddingInlineStart={1}>Organize prazos, tarefas e processos com sua equipe em um só lugar.</Typography>
                </div>

                <div style={{ marginTop: 10 }}>
                    <Typography borderLeft={'1px solid #0078ED'} paddingInlineStart={1} fontSize={16} fontWeight={500}>Relatórios Jurídicos</Typography>
                    <Typography fontWeight={'light'} fontSize={16} paddingInlineStart={1}>Tenha uma visão clara da performance do seu escritório com dados e insights</Typography>
                </div>

                <div style={{ marginTop: 10 }}>
                    <Typography borderLeft={'1px solid #0078ED'} paddingInlineStart={1} fontSize={16} fontWeight={500}>Peticionamento Automático e Inteligente</Typography>
                    <Typography fontWeight={'light'} fontSize={16} paddingInlineStart={1}>Transforme entrevistas com o cliente em petições completas, com fundamentação jurídica, pedidos e estrutura prontas para protocolar. Reduza em até 90% o tempo de produção da inicial.</Typography>
                </div>
            </Box>

            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 523,
                    height: '161px',
                    marginBottom: 8,
                    marginTop: 7,
                    alignSelf: 'center',
                    marginLeft: 1,
                    padding: '33px',
                    boxSizing: 'border-box'
                }}>
                <Box>
                    <Typography fontSize={13} mb={1}>Plano escolhido:</Typography>
                    <Typography fontWeight={600} fontSize={22}>{plano ? `R$ ${plano.preco.replace('.', ',')}/mês` : 'R$ ---/mês'}</Typography>
                    <Typography fontSize={13}>{plano ? `${plano.limite_peticoes} petições por mês` : '--- petições por mês'}</Typography>
                </Box>

                <Box>
                    <Typography fontSize={13}>&bull; Implantação gratuita</Typography>
                    <Typography fontSize={13}>&bull; Sem multas de rescisão</Typography>
                </Box>
            </Box>

            <Box className='footer_border' sx={{ position: 'absolute', bottom: { xs: -1100, sm: -70 }, width: '100%', marginInline: 'auto' }}>
                <Box sx={{ height: 45, display: 'flex', alignItems: 'center' }}>
                    <Typography marginLeft={.8} fontSize={13}>&copy; Ruke Tecnologia Jurídica - Termos e privacidade &bull;</Typography>
                </Box>
            </Box>
        </article>
    )
}
