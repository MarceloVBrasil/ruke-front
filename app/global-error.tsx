'use client'
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  return (
    <html>
      <body style={{ padding: '0px', margin: '0px' }}>
        <Box sx={{ padding: '0px', margin: '0px', overflow: 'auto', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#00479d', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ backgroundColor: 'white', padding: '10px', borderRadius: '20px' }}>
            <Image src="https://app.ruke.com.br/_next/image?url=https%3A%2F%2Ffpsv.nyc3.cdn.digitaloceanspaces.com%2Flogo_ruke.png&w=640&q=75" width={600} height={120}
              alt="logo"
              style={{ width: '100%', objectFit: 'contain', maxWidth: '600px' }}
            />
          </Box>
          <Typography variant="h2" style={{ marginTop: '20px', color: 'white' }}>Algo deu errado!</Typography>
          <Typography variant='subtitle2' style={{ marginTop: '20px', width: '80%', color: 'white', textAlign: 'center' }}>{error.message}</Typography>
          <Link
            href="/"
            style={{ marginTop: '20px', backgroundColor: 'white', color: '#00479d', padding: '15px', borderRadius: '15px', fontWeight: 'bold', fontSize: '18px' }}
          >
            Voltar para o inicio
          </Link>
        </Box>
      </body>
    </html>
  )
}